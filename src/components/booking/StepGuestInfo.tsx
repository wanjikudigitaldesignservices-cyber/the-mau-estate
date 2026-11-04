import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Globe, Clock, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const guestSchema = z.object({
  fullName: z.string().min(3, 'Please enter your full name as on passport/ID'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid telephone number with country code'),
  country: z.string().min(2, 'Please specify your country of residence'),
  estimatedArrival: z.string().optional(),
  specialRequests: z.string().max(500, 'Requests cannot exceed 500 characters').optional(),
});

export type GuestFormData = z.infer<typeof guestSchema>;

interface StepGuestInfoProps {
  initialData?: Partial<GuestFormData>;
  onSubmit: (data: GuestFormData) => void;
  onBack: () => void;
}

export const StepGuestInfo: React.FC<StepGuestInfoProps> = ({
  initialData,
  onSubmit,
  onBack,
}) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      fullName: initialData?.fullName || user?.full_name || '',
      email: initialData?.email || user?.email || '',
      phone: initialData?.phone || user?.telephone || '',
      country: initialData?.country || user?.country || 'Kenya',
      estimatedArrival: initialData?.estimatedArrival || '14:00 - 16:00',
      specialRequests: initialData?.specialRequests || '',
    },
  });

  return (
    <div className="bg-white p-6 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle max-w-3xl mx-auto">
      <div className="mb-8 space-y-1">
        <h3 className="font-serif text-2xl sm:text-3xl text-forest font-normal">Guest Particulars</h3>
        <p className="text-stone text-xs font-light">
          Please provide the primary resident contact details for reservation confirmations and concierge communications.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold" />
              <span>Full Name (as on Passport / ID) *</span>
            </label>
            <input
              type="text"
              {...register('fullName')}
              placeholder="e.g. Dr. Alistair Vance"
              className="w-full bg-ivory-light/50 border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
            />
            {errors.fullName && (
              <span className="text-[11px] text-red-600 block">{errors.fullName.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="e.g. guest@example.com"
              className="w-full bg-ivory-light/50 border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
            />
            {errors.email && (
              <span className="text-[11px] text-red-600 block">{errors.email.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Telephone Number *</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="e.g. +254 712 345 678"
              className="w-full bg-ivory-light/50 border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
            />
            {errors.phone && (
              <span className="text-[11px] text-red-600 block">{errors.phone.message}</span>
            )}
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>Country of Residence *</span>
            </label>
            <input
              type="text"
              {...register('country')}
              placeholder="e.g. Kenya, United Kingdom, United States"
              className="w-full bg-ivory-light/50 border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
            />
            {errors.country && (
              <span className="text-[11px] text-red-600 block">{errors.country.message}</span>
            )}
          </div>
        </div>

        {/* Estimated Arrival */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>Estimated Arrival Time at The Mau Estate</span>
          </label>
          <select
            {...register('estimatedArrival')}
            className="w-full bg-ivory-light/50 border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
          >
            <option value="12:00 - 14:00 (Early Arrival)">12:00 - 14:00 (Early Arrival Request)</option>
            <option value="14:00 - 16:00 (Standard Check-in)">14:00 - 16:00 (Standard Check-in)</option>
            <option value="16:00 - 19:00 (Late Afternoon)">16:00 - 19:00 (Late Afternoon)</option>
            <option value="After 19:00 (Evening Arrival)">After 19:00 (Evening Arrival)</option>
            <option value="Helicopter Transfer Arrival">Helicopter Charter Arrival (Wilson Airport)</option>
          </select>
        </div>

        {/* Special Requests */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-forest font-semibold flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            <span>Special Requests, Dietary Preferences or Occasion</span>
          </label>
          <textarea
            rows={3}
            {...register('specialRequests')}
            placeholder="e.g. Celebrating wedding anniversary; strict vegetarian dietary preferences; require airport 4x4 transfer; prefer cedar valley-facing suite."
            className="w-full bg-ivory-light/50 border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors resize-none"
          />
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-ivory-dark flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-stone-light/40 text-stone hover:text-forest text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-forest hover:bg-forest-deep text-gold font-semibold text-xs tracking-[0.18em] uppercase rounded-sm transition-all shadow-sm"
          >
            <span>Proceed to Summary</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      </form>
    </div>
  );
};
