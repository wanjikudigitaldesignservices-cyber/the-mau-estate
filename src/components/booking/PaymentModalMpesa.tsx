import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Reservation } from '../../types';
import { MpesaService } from '../../services/mpesaService';
import { siteConfig } from '../../config/siteConfig';
import { formatKes } from '../../utils/formatters';

interface PaymentModalMpesaProps {
  reservation: Reservation;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModalMpesa: React.FC<PaymentModalMpesaProps> = ({
  reservation,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [phone, setPhone] = useState(reservation.guest?.telephone || '0712345678');
  const [status, setStatus] = useState<'idle' | 'initiating' | 'waiting' | 'success' | 'failed'>('idle');
  const [receipt, setReceipt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const amountKes = Math.round(reservation.total_amount * siteConfig.taxes.kesExchangeRate);

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('initiating');
    setErrorMessage('');

    try {
      const res = await MpesaService.initiateStkPush({
        reservation,
        phoneNumber: phone,
        amountKes,
      });

      if (res.success) {
        setStatus('waiting');
      } else {
        setStatus('failed');
        setErrorMessage('Failed to initiate M-Pesa prompt. Please verify phone number.');
      }
    } catch (err: any) {
      setStatus('failed');
      setErrorMessage(err.message || 'Payment initiation error.');
    }
  };

  const handleSimulatePinEntered = async (simulateSuccess: boolean) => {
    if (!simulateSuccess) {
      setStatus('failed');
      setErrorMessage('Payment cancelled by user or insufficient M-Pesa balance.');
      return;
    }

    setStatus('initiating');
    const res = await MpesaService.completePayment(reservation, 'mpesa');
    if (res.success) {
      setReceipt(res.transaction.mpesa_receipt_number || 'SK88210099');
      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-sm border border-ivory-dark shadow-2xl max-w-md w-full overflow-hidden text-forest">
        {/* Header */}
        <div className="bg-forest text-white p-5 flex items-center justify-between border-b-2 border-emerald-500">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
              M
            </div>
            <div>
              <h3 className="font-serif text-lg leading-tight">Lipa Na M-Pesa Online</h3>
              <p className="text-[10px] text-stone-light">Safaricom Daraja 2.0 Direct STK</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-light hover:text-white p-1"
            aria-label="Close M-Pesa modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-2xl text-forest">Payment Confirmed</h4>
                <p className="text-xs text-stone">
                  M-Pesa Receipt: <span className="font-mono font-bold text-forest">{receipt}</span>
                </p>
                <p className="text-xs text-emerald-700 font-medium">
                  {formatKes(amountKes)} received. Reservation updated.
                </p>
              </div>
            </div>
          ) : status === 'waiting' ? (
            <div className="text-center py-6 space-y-5">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-emerald-600 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-xl text-forest">Check Your Handset</h4>
                <p className="text-xs text-stone leading-relaxed px-4">
                  An M-Pesa prompt has been sent to <span className="font-semibold text-forest">+{phone}</span> for <span className="font-bold text-forest">{formatKes(amountKes)}</span>.
                </p>
                <p className="text-[11px] text-stone-light">
                  Please enter your M-Pesa PIN on your phone to complete your booking.
                </p>
              </div>

              {/* Development & Sandbox simulation harness buttons */}
              <div className="pt-4 border-t border-ivory-cream space-y-2">
                <div className="text-[10px] text-stone-light uppercase tracking-wider font-semibold">
                  Sandbox Test Triggers
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSimulatePinEntered(true)}
                    className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-sm transition-colors"
                  >
                    Simulate PIN Success
                  </button>
                  <button
                    onClick={() => handleSimulatePinEntered(false)}
                    className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold rounded-sm transition-colors"
                  >
                    Simulate Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInitiate} className="space-y-4">
              <div className="p-3.5 bg-ivory-light rounded border border-ivory-dark text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone">Reservation Reference:</span>
                  <span className="font-mono font-semibold text-forest">{reservation.booking_reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Total Payable (KES):</span>
                  <span className="font-bold text-emerald-700 text-sm">{formatKes(amountKes)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-light">
                  <span>Paybill Number:</span>
                  <span className="font-mono font-medium">{siteConfig.payments.mpesaPaybill}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Safaricom M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0712345678 or 254712345678"
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-emerald-600 font-mono transition-colors"
                />
                <span className="text-[10px] text-stone-light block">
                  A push request will be delivered to this Safaricom line immediately.
                </span>
              </div>

              <button
                type="submit"
                disabled={status === 'initiating'}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-[0.16em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {status === 'initiating' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Initiating STK Push...</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4" />
                    <span>Send M-Pesa Prompt ({formatKes(amountKes)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-light pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-bit Safaricom Daraja API connection</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
