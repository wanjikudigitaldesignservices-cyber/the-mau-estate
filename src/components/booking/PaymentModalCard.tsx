import React, { useState } from 'react';
import { X, CreditCard, Lock, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { Reservation } from '../../types';
import { MpesaService } from '../../services/mpesaService';
import { formatCurrency } from '../../utils/formatters';

interface PaymentModalCardProps {
  reservation: Reservation;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModalCard: React.FC<PaymentModalCardProps> = ({
  reservation,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [cardName, setCardName] = useState(reservation.guest?.full_name || '');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('882');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [receipt, setReceipt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await MpesaService.completePayment(reservation, 'card');
      if (res.success) {
        setReceipt(res.transaction.transaction_reference || 'TXN-CARD-984210');
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2200);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-sm border border-ivory-dark shadow-2xl max-w-md w-full overflow-hidden text-forest">
        {/* Header */}
        <div className="bg-forest text-white p-5 flex items-center justify-between border-b-2 border-gold">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-gold" />
            <div>
              <h3 className="font-serif text-lg leading-tight">Card Payment</h3>
              <p className="text-[10px] text-stone-light">Visa &bull; MasterCard &bull; American Express</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-light hover:text-white p-1"
            aria-label="Close card payment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-2xl text-forest">Payment Authorised</h4>
                <p className="text-xs text-stone">
                  Authorisation Code: <span className="font-mono font-bold text-forest">{receipt}</span>
                </p>
                <p className="text-xs text-emerald-700 font-medium">
                  {formatCurrency(reservation.total_amount, reservation.currency)} charged successfully.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-ivory-light rounded border border-ivory-dark text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone">Booking Reference:</span>
                  <span className="font-mono font-semibold text-forest">{reservation.booking_reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Total Amount Due:</span>
                  <span className="font-serif font-bold text-forest text-base">
                    {formatCurrency(reservation.total_amount, reservation.currency)}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Name as printed on card"
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="•••• •••• •••• ••••"
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold font-mono transition-colors"
                  />
                  <CreditCard className="w-4 h-4 text-stone-light absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold font-mono transition-colors text-center"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    CVC / CVV
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="•••"
                      className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold font-mono transition-colors text-center"
                    />
                    <Lock className="w-3.5 h-3.5 text-stone-light absolute right-3 top-3.5" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-forest hover:bg-forest-deep text-gold font-semibold text-xs tracking-[0.16em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-gold" />
                    <span>Pay {formatCurrency(reservation.total_amount, reservation.currency)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-light pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>PCI-DSS Level 1 Compliant Encrypted Vault</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
