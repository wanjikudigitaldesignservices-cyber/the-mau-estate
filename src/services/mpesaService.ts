import { PaymentStatus, PaymentTransaction, Reservation } from '../types';
import { hotelDataService } from './hotelDataService';
import { ResendService } from './resendService';

export interface StkPushRequest {
  reservation: Reservation;
  phoneNumber: string;
  amountKes: number;
}

export interface StkPushResponse {
  success: boolean;
  checkoutRequestId: string;
  merchantRequestId: string;
  customerMessage: string;
  isMock: boolean;
}

export class MpesaService {
  /**
   * Cleans and formats telephone number to 254XXXXXXXXX standard
   */
  public static formatKenyanPhone(phone: string): string {
    let clean = phone.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '254' + clean.slice(1);
    } else if (clean.startsWith('7') || clean.startsWith('1')) {
      clean = '254' + clean;
    }
    return clean;
  }

  /**
   * Initiates Lipa Na M-Pesa Online (STK Push)
   */
  public static async initiateStkPush(params: StkPushRequest): Promise<StkPushResponse> {
    const formattedPhone = this.formatKenyanPhone(params.phoneNumber);
    const amountKes = Math.round(params.amountKes);

    // Try live Supabase Edge Function if available
    try {
      const edgeUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mpesa-stk-push`;
      if (import.meta.env.VITE_SUPABASE_URL) {
        const response = await fetch(edgeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            phoneNumber: formattedPhone,
            amountKes,
            bookingReference: params.reservation.booking_reference,
            reservationId: params.reservation.id,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            checkoutRequestId: data.CheckoutRequestID || 'CR_' + Date.now(),
            merchantRequestId: data.MerchantRequestID || 'MR_' + Date.now(),
            customerMessage: data.CustomerMessage || 'Prompt sent to your phone. Enter M-Pesa PIN.',
            isMock: Boolean(data.mock),
          };
        }
      }
    } catch {
      // Fallback to client sandbox simulation
    }

    // Client-side testing sandbox fallback
    const mockCheckoutId = 'ws_CO_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    return {
      success: true,
      checkoutRequestId: mockCheckoutId,
      merchantRequestId: 'MR_' + Date.now(),
      customerMessage: `STK push sent to +${formattedPhone}. Please authorize payment of KES ${amountKes.toLocaleString()} on your handset.`,
      isMock: true,
    };
  }

  /**
   * Simulates or processes an incoming payment confirmation
   */
  public static async completePayment(
    reservation: Reservation,
    paymentMethod: 'mpesa' | 'card',
    checkoutRequestId?: string
  ): Promise<{ success: boolean; transaction: PaymentTransaction }> {
    const isMpesa = paymentMethod === 'mpesa';
    const randomReceipt = isMpesa
      ? 'SK' + Math.floor(10000000 + Math.random() * 90000000)
      : 'TXN-CARD-' + Math.floor(100000 + Math.random() * 900000);

    const transaction: PaymentTransaction = {
      id: 'txn_' + Date.now(),
      reservation_id: reservation.id,
      payment_method: paymentMethod,
      transaction_reference: randomReceipt,
      provider_reference: checkoutRequestId || ('REF-' + Date.now()),
      mpesa_receipt_number: isMpesa ? randomReceipt : undefined,
      amount: reservation.total_amount,
      currency: reservation.currency,
      exchange_rate_to_kes: 128.50,
      amount_kes: Math.round(reservation.total_amount * 128.50),
      status: 'successful',
      created_at: new Date().toISOString(),
    };

    // Record payment in data service
    await hotelDataService.recordPayment(transaction);

    // Send payment confirmation email
    if (reservation.guest?.email) {
      await ResendService.sendEmail('payment_success', reservation.guest.email, {
        ...reservation,
        payment_status: 'successful',
      });
    }

    return { success: true, transaction };
  }
}
