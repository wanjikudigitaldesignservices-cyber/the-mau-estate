// Supabase Edge Function: Resend Email Notification Dispatcher
// Location: supabase/functions/resend-email/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const HOTEL_ADMIN_EMAIL = Deno.env.get("HOTEL_ADMIN_EMAIL") || "reservations@themauestate.com";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "The Mau Estate <reservations@themauestate.com>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailPayload {
  template: "guest_acknowledgement" | "admin_alert" | "confirmation" | "cancellation" | "payment_success";
  to: string;
  reservation: {
    reference: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    adults: number;
    children: number;
    totalAmount: number;
    currency: string;
    paymentMethod?: string;
    receiptNumber?: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: EmailPayload = await req.json();

    if (!payload.template || !payload.to || !payload.reservation) {
      return new Response(
        JSON.stringify({ error: "Missing required template, recipient, or reservation details." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!RESEND_API_KEY) {
      // Graceful degraded mode when Resend key is not configured in edge environment
      return new Response(
        JSON.stringify({
          success: true,
          mock: true,
          message: "Resend API key not configured. Mock acknowledgement recorded for preview mode.",
          deliveredTo: payload.to,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { subject, html } = generateEmailContent(payload);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [payload.to],
        subject,
        html,
      }),
    });

    const resData = await res.json();

    return new Response(JSON.stringify(resData), {
      status: res.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function generateEmailContent(payload: EmailPayload) {
  const { reservation } = payload;
  const logoUrl = "https://themauestate.com/icons/social-avatar.svg";

  let subject = `The Mau Estate | Reservation ${reservation.reference}`;
  let title = "Reservation Details";
  let greeting = `Dear ${reservation.guestName},`;
  let leadText = "Thank you for choosing The Mau Estate. Below are your reservation details.";

  if (payload.template === "guest_acknowledgement") {
    subject = `Reservation Received • ${reservation.reference} | The Mau Estate`;
    title = "Reservation Acknowledgement";
    leadText = "We have received your reservation request and are preparing your arrival at our high-altitude sanctuary.";
  } else if (payload.template === "admin_alert") {
    subject = `[NEW RESERVATION] ${reservation.reference} - ${reservation.guestName} (${reservation.roomName})`;
    title = "New Guest Reservation Alert";
    greeting = "Hello Reservations Team,";
    leadText = `A new reservation has been placed by ${reservation.guestName}. Details below:`;
  } else if (payload.template === "confirmation") {
    subject = `Confirmed Stay • ${reservation.reference} | The Mau Estate, Kenya`;
    title = "Your Stay is Confirmed";
    leadText = "We look forward to welcoming you to Mau Narok. Your stay has been confirmed.";
  } else if (payload.template === "cancellation") {
    subject = `Reservation Cancellation • ${reservation.reference} | The Mau Estate`;
    title = "Reservation Cancelled";
    leadText = `Your reservation ${reservation.reference} has been cancelled in accordance with our cancellation policy.`;
  } else if (payload.template === "payment_success") {
    subject = `Payment Confirmed • ${reservation.reference} | The Mau Estate`;
    title = "Payment Receipt & Confirmation";
    leadText = `Your payment of ${reservation.currency} ${reservation.totalAmount.toLocaleString()} has been verified. Receipt: ${reservation.receiptNumber || "Verified"}.`;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F6F1; margin: 0; padding: 30px; color: #202B26; }
        .wrapper { max-width: 620px; margin: 0 auto; background: #FFFFFF; border-radius: 4px; overflow: hidden; border: 1px solid #E9E2D5; }
        .header { background-color: #202B26; padding: 36px 30px; text-align: center; border-bottom: 3px solid #B69A70; }
        .header h1 { font-family: 'Georgia', serif; color: #FFFFFF; letter-spacing: 4px; margin: 10px 0 0 0; font-size: 24px; }
        .header p { color: #B69A70; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; margin: 6px 0 0 0; }
        .content { padding: 35px 30px; }
        .badge { display: inline-block; background-color: #F2EDE4; color: #B69A70; padding: 6px 14px; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px; margin-bottom: 20px; }
        .title { font-family: 'Georgia', serif; font-size: 22px; color: #202B26; margin: 0 0 15px 0; }
        .details-table { width: 100%; border-collapse: collapse; margin: 25px 0; }
        .details-table td { padding: 12px 14px; font-size: 14px; border-bottom: 1px solid #F0EDE8; }
        .details-table td.label { color: #5C6258; width: 40%; font-weight: 500; }
        .details-table td.value { color: #202B26; font-weight: 600; text-align: right; }
        .total-row td { border-top: 2px solid #202B26; border-bottom: 2px solid #202B26; font-size: 16px; font-weight: bold; color: #202B26; padding: 16px 14px; }
        .footer { background-color: #F8F6F1; padding: 25px 30px; text-align: center; font-size: 12px; color: #5C6258; border-top: 1px solid #E9E2D5; }
        .footer a { color: #B69A70; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>THE MAU ESTATE</h1>
          <p>Mau Narok, Kenya &bull; A world away. A feeling apart.</p>
        </div>
        <div class="content">
          <div class="badge">Reference: ${reservation.reference}</div>
          <h2 class="title">${title}</h2>
          <p><strong>${greeting}</strong></p>
          <p>${leadText}</p>

          <table class="details-table">
            <tr>
              <td class="label">Accommodation</td>
              <td class="value">${reservation.roomName}</td>
            </tr>
            <tr>
              <td class="label">Check-In Date</td>
              <td class="value">${reservation.checkIn} (From 14:00)</td>
            </tr>
            <tr>
              <td class="label">Check-Out Date</td>
              <td class="value">${reservation.checkOut} (Until 11:00)</td>
            </tr>
            <tr>
              <td class="label">Duration of Stay</td>
              <td class="value">${reservation.nights} Night${reservation.nights > 1 ? 's' : ''}</td>
            </tr>
            <tr>
              <td class="label">Guests</td>
              <td class="value">${reservation.adults} Adult${reservation.adults > 1 ? 's' : ''}${reservation.children > 0 ? `, ${reservation.children} Child` : ''}</td>
            </tr>
            <tr>
              <td class="label">Primary Contact</td>
              <td class="value">${reservation.guestName} (${reservation.guestPhone})</td>
            </tr>
            <tr class="total-row">
              <td class="label">Total Payable</td>
              <td class="value">${reservation.currency} ${reservation.totalAmount.toLocaleString()}</td>
            </tr>
          </table>

          <p style="font-size: 13px; color: #5C6258; line-height: 1.6;">
            If you require private helicopter transfers from Nairobi, dietary arrangements, or tailored safari excursions, please contact our concierge team at <a href="mailto:concierge@themauestate.com" style="color: #B69A70;">concierge@themauestate.com</a>.
          </p>
        </div>
        <div class="footer">
          <p>The Mau Estate &bull; Highland Ridge, Mau Narok, Nakuru County, Kenya</p>
          <p>Direct: +254 (0) 700 882 100 &bull; <a href="https://themauestate.com">themauestate.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
}
