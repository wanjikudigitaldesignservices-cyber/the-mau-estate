import React, { useState } from 'react';
import { Calendar, Users, ShieldCheck, Info, Check, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { PriceCalculationResult, Reservation, RoomType, SpecialOffer } from '../../types';
import { formatCurrency, formatKes } from '../../utils/formatters';
import { DemonstrationBadge } from '../common/DemonstrationBadge';

interface StepPriceSummaryProps {
  room: RoomType;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomsCount: number;
  pricing: PriceCalculationResult;
  appliedOffer?: SpecialOffer;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry: string;
  specialRequests?: string;
  onBack: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export const StepPriceSummary: React.FC<StepPriceSummaryProps> = ({
  room,
  checkIn,
  checkOut,
  adults,
  children,
  roomsCount,
  pricing,
  appliedOffer,
  guestName,
  guestEmail,
  guestPhone,
  guestCountry,
  specialRequests,
  onBack,
  onConfirm,
  loading,
}) => {
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Room & Stay Summary */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
            <div className="flex items-start gap-4">
              <img
                src={room.main_image_url}
                alt={room.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-sm border border-ivory-dark flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-2xl text-forest font-medium">{room.name}</h3>
                </div>
                <p className="text-xs text-stone-light font-light line-clamp-2">
                  {room.short_description}
                </p>
                <div className="text-[11px] text-stone pt-1">
                  <span>{room.room_size_sqm} m²</span> &bull; <span>{room.bed_type}</span>
                </div>
                {room.is_demonstration && <DemonstrationBadge className="mt-1" />}
              </div>
            </div>

            {/* Stay Dates & Specs */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-ivory-cream text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-light block">Check-In</span>
                <span className="font-semibold text-forest text-sm">{checkIn}</span>
                <span className="text-[10px] text-stone-light block">From 14:00</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-light block">Check-Out</span>
                <span className="font-semibold text-forest text-sm">{checkOut}</span>
                <span className="text-[10px] text-stone-light block">Until 11:00</span>
              </div>
            </div>

            {/* Resident Particulars */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">
                Lead Resident Information
              </span>
              <div className="p-3 bg-ivory-light/60 rounded border border-ivory-dark text-stone space-y-1">
                <div className="font-semibold text-forest">{guestName}</div>
                <div>{guestEmail} &bull; {guestPhone}</div>
                <div>Country: {guestCountry}</div>
                {specialRequests && (
                  <div className="pt-1 text-[11px] text-stone-dark italic border-t border-ivory-dark/40 mt-1">
                    "{specialRequests}"
                  </div>
                )}
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">
                Complimentary Resident Inclusions
              </span>
              <ul className="space-y-1.5 text-stone-dark">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Artisanal farm-to-table breakfast served in suite or The Forest Hearth</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Evening cedar fireplace lighting and aromatic turndown service</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Guided indigenous forest walking trail with resident naturalist</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>High-speed optical fiber Wi-Fi throughout sanctuary grounds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
            <h4 className="font-serif text-xl text-forest font-normal pb-3 border-b border-ivory-cream">
              Investment Breakdown
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-stone">
                <span>
                  {formatCurrency(pricing.baseRatePerNight, pricing.currency)} &times; {pricing.nights} Night{pricing.nights > 1 ? 's' : ''} &times; {roomsCount} Suite
                </span>
                <span className="font-medium text-forest">
                  {formatCurrency(pricing.subtotal, pricing.currency)}
                </span>
              </div>

              {pricing.discountAmount > 0 && (
                <div className="flex justify-between items-center text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded">
                  <span>Special Offer Discount ({appliedOffer?.title || 'Promotional'})</span>
                  <span className="font-semibold">
                    -{formatCurrency(pricing.discountAmount, pricing.currency)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-stone">
                <span>Kenya Value Added Tax (16% VAT)</span>
                <span>{formatCurrency(pricing.vatTaxAmount, pricing.currency)}</span>
              </div>

              <div className="flex justify-between items-center text-stone">
                <span>Kenya Tourism Training Levy (2%)</span>
                <span>{formatCurrency(pricing.tourismLevyAmount, pricing.currency)}</span>
              </div>

              <div className="flex justify-between items-center text-stone">
                <span>Luxury Hospitality Service Charge (5%)</span>
                <span>{formatCurrency(pricing.serviceChargeAmount, pricing.currency)}</span>
              </div>

              {/* Total Banner */}
              <div className="pt-4 border-t border-forest/20 mt-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-semibold text-forest uppercase tracking-wider">
                    Total Payable
                  </span>
                  <span className="font-serif text-3xl font-bold text-forest">
                    {formatCurrency(pricing.totalAmount, pricing.currency)}
                  </span>
                </div>
                <div className="text-right text-xs font-semibold text-gold">
                  ≈ {formatKes(pricing.totalAmountKes)}
                </div>
                <span className="text-[10px] text-stone-light block text-right mt-1">
                  All statutory taxes and levies inclusive
                </span>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-2 border-t border-ivory-cream">
              <label className="flex items-start gap-2.5 text-xs text-stone cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-ivory-dark text-gold focus:ring-gold"
                />
                <span className="leading-relaxed">
                  I agree to the <a href="/terms-and-conditions" target="_blank" className="text-gold underline">Terms of Stay</a> and <a href="/cancellation-policy" target="_blank" className="text-gold underline">Cancellation Policy</a> (Complimentary cancellation up to 14 days before arrival).
                </span>
              </label>
            </div>

            {/* Confirm Button */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={onConfirm}
                disabled={!agreed || loading}
                className="w-full py-4 bg-forest hover:bg-forest-deep text-gold font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-luxury hover:shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                    <span>Confirming Sanctuary...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gold" />
                    <span>Confirm Reservation</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-light text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Instant reservation confirmation & automated email dispatch</span>
              </div>
            </div>
          </div>

          <div className="text-left">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs text-stone hover:text-forest transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Modify Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
