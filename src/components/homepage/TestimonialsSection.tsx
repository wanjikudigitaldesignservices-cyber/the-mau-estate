import React, { useEffect, useState } from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { Testimonial } from '../../types';
import { hotelDataService } from '../../services/hotelDataService';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);

  useEffect(() => {
    hotelDataService.getTestimonials().then(setReviews);
  }, []);

  return (
    <section className="py-24 bg-forest-surface text-ivory border-t border-forest-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Verified Resident Reflections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-wide">
            Words from those who found silence here.
          </h2>
          <p className="text-stone-light text-xs sm:text-sm font-light">
            Genuine experiences shared by verified resident guests of The Mau Estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-forest-deep/80 border border-forest-border p-8 rounded-sm relative flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-gold/40" />
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-lg text-white font-normal leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-forest-border/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-medium text-ivory">{rev.guest_name}</h4>
                  <p className="text-[11px] text-stone-light font-light">{rev.guest_origin}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gold uppercase tracking-wider block font-medium">
                    {rev.room_stayed}
                  </span>
                  <span className="text-[10px] text-stone-light">{rev.stay_date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
