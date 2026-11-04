import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Check, Calendar, ArrowRight } from 'lucide-react';
import { SpecialOffer } from '../../types';
import { hotelDataService } from '../../services/hotelDataService';

export const OffersSection: React.FC = () => {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);

  useEffect(() => {
    hotelDataService.getSpecialOffers().then(setOffers);
  }, []);

  return (
    <section className="py-24 bg-ivory-light text-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
              <Tag className="w-3.5 h-3.5" />
              <span>Curated Highland Escapes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest font-normal tracking-wide">
              Special offers for thoughtful, unhurried journeys.
            </h2>
          </div>

          <div>
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-forest hover:text-gold transition-colors pb-1 border-b border-forest/30 hover:border-gold"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group bg-white rounded-sm overflow-hidden border border-ivory-dark/80 shadow-subtle hover:shadow-luxury transition-all duration-300 flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 relative overflow-hidden bg-forest-surface min-h-[240px]">
                <img
                  src={offer.image_url}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-forest-deep/90 text-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm border border-gold/40">
                  {offer.discount_percentage}% Savings
                </div>
              </div>

              <div className="sm:w-3/5 p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                    Min. {offer.min_nights} Nights Stay
                  </div>
                  <h3 className="font-serif text-2xl text-forest group-hover:text-gold transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-stone text-xs leading-relaxed font-light">
                    {offer.description}
                  </p>

                  {/* Inclusions */}
                  <div className="pt-2 space-y-1.5">
                    {offer.inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-dark">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-ivory-cream flex items-center justify-between gap-4">
                  <Link
                    to={`/offers/${offer.slug}`}
                    className="text-xs text-stone hover:text-forest underline underline-offset-4 font-medium"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/booking?offerSlug=${offer.slug}`}
                    className="px-5 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold tracking-wider uppercase rounded-sm transition-all flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve Package</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
