// Supabase Edge Function: Safaricom M-Pesa Daraja Callback Webhook
// Location: supabase/functions/mpesa-callback/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  try {
    const body = await req.json();
    console.log("M-Pesa Webhook Callback received:", JSON.stringify(body));

    const stkCallback = body?.Body?.stkCallback;
    if (!stkCallback) {
      return new Response(JSON.stringify({ ResultCode: 1, ResultDesc: "Invalid payload format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    // Check for duplicate callback processing (Idempotency)
    const { data: existingPayment } = await supabase
      .from("payments")
      .select("id, status")
      .eq("provider_reference", CheckoutRequestID)
      .maybeSingle();

    if (existingPayment && existingPayment.status === "successful") {
      console.log("Duplicate successful callback ignored for CheckoutRequestID:", CheckoutRequestID);
      return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Duplicate acknowledged" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (ResultCode === 0) {
      // Payment Successful
      let amount: number | null = null;
      let receiptNumber = "";
      let transactionDate = "";
      let phoneNumber = "";

      if (CallbackMetadata?.Item) {
        for (const item of CallbackMetadata.Item) {
          if (item.Name === "Amount") amount = item.Value;
          if (item.Name === "MpesaReceiptNumber") receiptNumber = item.Value;
          if (item.Name === "TransactionDate") transactionDate = String(item.Value);
          if (item.Name === "PhoneNumber") phoneNumber = String(item.Value);
        }
      }

      // Update payment record in database
      const { data: updatedPayment, error: pError } = await supabase
        .from("payments")
        .update({
          status: "successful",
          mpesa_receipt_number: receiptNumber,
          transaction_reference: receiptNumber,
          amount_kes: amount,
          provider_raw_response: body,
          updated_at: new Date().toISOString(),
        })
        .eq("provider_reference", CheckoutRequestID)
        .select("reservation_id")
        .single();

      if (updatedPayment?.reservation_id) {
        // Mark reservation as paid and confirmed
        await supabase
          .from("reservations")
          .update({
            payment_status: "successful",
            status: "confirmed",
            updated_at: new Date().toISOString(),
          })
          .eq("id", updatedPayment.reservation_id);

        console.log(`Reservation ${updatedPayment.reservation_id} confirmed via M-Pesa receipt ${receiptNumber}`);
      }
    } else {
      // Payment Failed or Cancelled by User
      await supabase
        .from("payments")
        .update({
          status: "failed",
          provider_raw_response: body,
          updated_at: new Date().toISOString(),
        })
        .eq("provider_reference", CheckoutRequestID);

      console.warn(`M-Pesa payment failed with code ${ResultCode}: ${ResultDesc}`);
    }

    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error processing callback:", error);
    return new Response(JSON.stringify({ ResultCode: 1, ResultDesc: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
