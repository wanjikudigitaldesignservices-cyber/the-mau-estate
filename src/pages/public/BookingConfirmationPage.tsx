import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Printer, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { PaymentModalMpesa } from '../../components/booking/PaymentModalMpesa';
import { PaymentModalCard } from '../../components/booking/PaymentModalCard';
import { hotelDataService } from '../../services/hotelDataService';
import { Reservation } from '../../types';
import { formatCurrency, formatKes, formatDate } from '../../utils/formatters';
import { siteConfig } from '../../config/siteConfig';

export const BookingConfirmationPage: React.FC = () => {
  const { reference } = useParams<{ reference: string }>();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  useEffect(() => {
    if (!reference) return;

    hotelDataService.getReservationByReference(reference).then((res) => {
      if (res) {
        setReservation(res);
        // Trigger celebratory confetti
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B69A70', '#202B26', '#E9E2D5', '#D4C1A3'],
        });
      }
      setLoading(false);
    });
  }, [reference]);

  const handlePaymentSuccess = async () => {
    if (!reference) return;
    const updated = await hotelDataService.getReservationByReference(reference);
    if (updated) {
      setReservation({ ...updated });
    }
    setIsMpesaModalOpen(false);
    setIsCardModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
        <Navbar transparentOnTop={false} />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-lg text-forest">Retrieving Sanctuary Confirmation...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
        <Navbar transparentOnTop={false} />
        <div className="flex-1 flex items-center justify-center py-32 px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-sm border border-ivory-dark text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-stone mx-auto" />
            <h2 className="font-serif text-2xl text-forest">Reservation Reference Not Found</h2>
            <p className="text-xs text-stone leading-relaxed">
              We could not locate reference <span className="font-mono font-semibold">{reference}</span>. Please verify the code or contact our reservations desk.
            </p>
            <Link
              to="/booking"
              className="inline-block px-6 py-2.5 bg-forest text-gold text-xs font-semibold uppercase tracking-wider rounded-sm"
            >
              Start New Reservation
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isPaid = reservation.payment_status === 'successful';
  const amountKes = Math.round(reservation.total_amount * siteConfig.taxes.kesExchangeRate);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title={`Confirmed: ${reservation.booking_reference}`}
        description="Reservation confirmation and itinerary voucher for The Mau Estate, Mau Narok."
        canonicalPath={`/booking/confirmation/${reservation.booking_reference}`}
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-28 pb-20 print:p-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Banner */}
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-dark shadow-subtle text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-forest text-gold flex items-center justify-center mx-auto border-2 border-gold/40 shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold block">
                Sanctuary Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-forest font-normal">
                Your Highland Stay is Secured
              </h1>
              <p className="text-stone text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-forest">{reservation.guest?.full_name}</span>. We are honored to welcome you to the tranquility of Mau Narok.
              </p>
            </div>

            <div className="pt-2 inline-flex items-center gap-3 bg-ivory-light px-5 py-2.5 rounded border border-ivory-dark">
              <span className="text-xs uppercase tracking-wider text-stone-light">Reservation Reference:</span>
              <span className="font-mono text-base font-bold text-forest tracking-wider">
                {reservation.booking_reference}
              </span>
            </div>

            {/* Email Dispatch Notice */}
            <p className="text-[11px] text-stone-light">
              An official itinerary acknowledgement has been dispatched to <span className="font-medium text-forest">{reservation.guest?.email}</span>.
            </p>
          </div>

          {/* Payment Status & Action Card */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-ivory-dark shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-wider text-stone-light block">Payment Status</span>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${
                    isPaid ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span className="font-serif text-xl font-semibold capitalize text-forest">
                  {isPaid ? 'Fully Paid & Verified' : 'Payment Pending'}
                </span>
              </div>
              <p className="text-xs text-stone-light font-light">
                {isPaid
                  ? 'Your transaction has been confirmed by our payment provider.'
                  : 'You may secure your reservation with M-Pesa or card now, or settle at check-in.'}
              </p>
            </div>

            {!isPaid && (
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsMpesaModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Pay via M-Pesa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCardModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay with Card</span>
                </button>
              </div>
            )}
          </div>

          {/* Detailed Printable Itinerary Card */}
          <div className="bg-white p-6 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-ivory-cream">
              <div>
                <h3 className="font-serif text-2xl text-forest font-medium">Itinerary Voucher</h3>
                <span className="text-xs text-stone-light font-light">The Mau Estate &bull; Mau Narok, Nakuru County, Kenya</span>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-ivory-dark text-stone hover:text-forest text-xs font-medium transition-colors print:hidden"
              >
                <Printer className="w-3.5 h-3.5 text-gold" />
                <span>Print Voucher</span>
              </button>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-stone-light uppercase text-[10px] tracking-wider block">Sanctuary</span>
                <span className="font-semibold text-forest text-sm block">
                  {reservation.room_type?.name || 'Luxury Suite'}
                </span>
                <span className="text-stone-light">{reservation.rooms_count} Suite</span>
              </div>

              <div className="space-y-1">
                <span className="text-stone-light uppercase text-[10px] tracking-wider block">Arrival</span>
                <span className="font-semibold text-forest text-sm block">
                  {formatDate(reservation.check_in_date)}
                </span>
                <span className="text-stone-light">Check-in from 14:00</span>
              </div>

              <div className="space-y-1">
                <span className="text-stone-light uppercase text-[10px] tracking-wider block">Departure</span>
                <span className="font-semibold text-forest text-sm block">
                  {formatDate(reservation.check_out_date)}
                </span>
                <span className="text-stone-light">Check-out by 11:00</span>
              </div>

              <div className="space-y-1">
                <span className="text-stone-light uppercase text-[10px] tracking-wider block">Residents</span>
                <span className="font-semibold text-forest text-sm block">
                  {reservation.adults_count} Adult{reservation.adults_count > 1 ? 's' : ''}
                  {reservation.children_count > 0 ? `, ${reservation.children_count} Children` : ''}
                </span>
                <span className="text-stone-light">{reservation.total_nights} Nights</span>
              </div>
            </div>

            {/* Resident & Notes Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-ivory-cream text-xs">
              <div className="space-y-2">
                <span className="text-gold font-semibold uppercase tracking-wider text-[10px] block">
                  Lead Guest
                </span>
                <div className="text-stone leading-relaxed">
                  <div className="font-medium text-forest">{reservation.guest?.full_name}</div>
                  <div>Email: {reservation.guest?.email}</div>
                  <div>Phone: {reservation.guest?.telephone}</div>
                  <div>Country: {reservation.guest?.country}</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-gold font-semibold uppercase tracking-wider text-[10px] block">
                  Special Arrangements & Requests
                </span>
                <p className="text-stone italic leading-relaxed">
                  {reservation.special_requests || 'No special dietary or arrival arrangements specified.'}
                </p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="pt-6 border-t border-ivory-cream bg-ivory-light/40 p-5 rounded space-y-2 text-xs">
              <div className="flex justify-between text-stone">
                <span>Room Subtotal ({reservation.total_nights} nights):</span>
                <span>{formatCurrency(reservation.subtotal_rate, reservation.currency)}</span>
              </div>
              <div className="flex justify-between text-stone">
                <span>Kenya VAT (16%) & Tourism Levy (2%):</span>
                <span>{formatCurrency(reservation.vat_tax_amount + reservation.tourism_levy_amount, reservation.currency)}</span>
              </div>
              <div className="flex justify-between text-stone">
                <span>Service Charge (5%):</span>
                <span>{formatCurrency(reservation.service_charge_amount, reservation.currency)}</span>
              </div>
              <div className="flex justify-between text-forest font-bold text-base pt-2 border-t border-ivory-dark">
                <span>Total Amount:</span>
                <div className="text-right">
                  <span>{formatCurrency(reservation.total_amount, reservation.currency)}</span>
                  <span className="text-xs text-gold font-medium block">≈ {formatKes(amountKes)}</span>
                </div>
              </div>
            </div>

            {/* Next Steps Guide */}
            <div className="space-y-3 pt-4 border-t border-ivory-cream text-xs text-stone">
              <h4 className="font-serif text-lg text-forest font-medium">Important Arrival & Travel Information</h4>
              <ul className="space-y-2 list-disc list-inside leading-relaxed font-light">
                <li>
                  <strong>Highland Climate:</strong> Mau Narok elevation is 2,840m. Evening temperatures dip to 10°C. Warm clothing and layered woollens are strongly recommended.
                </li>
                <li>
                  <strong>Transfers:</strong> If you requested 4x4 road transfers from Nairobi or helicopter charter landing on our crest helipad, our concierge team will reach out via telephone 48 hours prior to arrival.
                </li>
                <li>
                  <strong>Concierge Inquiries:</strong> Direct lines: <span className="font-medium">{siteConfig.contact.phones.primary}</span> &bull; <a href={`mailto:${siteConfig.contact.emails.concierge}`} className="text-gold underline">{siteConfig.contact.emails.concierge}</a>.
                </li>
              </ul>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <Link
              to="/account/reservations"
              className="text-xs font-semibold text-stone hover:text-forest transition-colors uppercase tracking-wider"
            >
              &larr; View in Customer Account
            </Link>

            <Link
              to="/"
              className="px-6 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Payment Modals */}
      <PaymentModalMpesa
        reservation={reservation}
        isOpen={isMpesaModalOpen}
        onClose={() => setIsMpesaModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      <PaymentModalCard
        reservation={reservation}
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
