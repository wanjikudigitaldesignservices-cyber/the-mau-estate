// Supabase Edge Function: Safaricom M-Pesa Daraja STK Push Initiation
// Location: supabase/functions/mpesa-stk-push/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MPESA_CONSUMER_KEY = Deno.env.get("MPESA_CONSUMER_KEY");
const MPESA_CONSUMER_SECRET = Deno.env.get("MPESA_CONSUMER_SECRET");
const MPESA_PASSKEY = Deno.env.get("MPESA_PASSKEY");
const MPESA_SHORTCODE = Deno.env.get("MPESA_SHORTCODE") || "174379"; // Sandbox default
const MPESA_ENV = Deno.env.get("MPESA_ENV") || "sandbox"; // 'sandbox' or 'production'
const CALLBACK_URL = Deno.env.get("MPESA_CALLBACK_URL") || "https://your-project.supabase.co/functions/v1/mpesa-callback";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { phoneNumber, amountKes, bookingReference, reservationId } = await req.json();

    if (!phoneNumber || !amountKes || !bookingReference) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: phoneNumber, amountKes, bookingReference." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format Kenyan phone number to 254XXXXXXXXX
    let formattedPhone = phoneNumber.replace(/\s+/g, "").replace(/\+/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.slice(1);
    }

    // If Safaricom credentials are not provided, return an educational sandbox mock response
    if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET || !MPESA_PASSKEY) {
      const mockCheckoutId = "ws_CO_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
      return new Response(
        JSON.stringify({
          success: true,
          mock: true,
          CheckoutRequestID: mockCheckoutId,
          MerchantRequestID: "MR_" + Date.now(),
          ResponseCode: "0",
          ResponseDescription: "Success. Request accepted for processing in test environment.",
          CustomerMessage: `Success! Prompt sent to ${formattedPhone}. Please authorize payment of KES ${amountKes} on your phone.`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Get OAuth Access Token from Safaricom Daraja
    const authUrl =
      MPESA_ENV === "production"
        ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const authHeader = btoa(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`);
    const tokenRes = await fetch(authUrl, {
      headers: { Authorization: `Basic ${authHeader}` },
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Generate Timestamp and Base64 Password
    const date = new Date();
    const timestamp =
      date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0") +
      String(date.getHours()).padStart(2, "0") +
      String(date.getMinutes()).padStart(2, "0") +
      String(date.getSeconds()).padStart(2, "0");

    const password = btoa(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`);

    // 3. Initiate STK Push
    const stkUrl =
      MPESA_ENV === "production"
        ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const stkRes = await fetch(stkUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amountKes),
        PartyA: formattedPhone,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: CALLBACK_URL,
        AccountReference: bookingReference.slice(0, 12),
        TransactionDesc: `Stay at The Mau Estate - ${bookingReference}`,
      }),
    });

    const stkData = await stkRes.json();

    return new Response(JSON.stringify(stkData), {
      status: stkRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
