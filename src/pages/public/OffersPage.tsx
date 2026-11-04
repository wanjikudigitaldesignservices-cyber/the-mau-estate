import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Check, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { hotelDataService } from '../../services/hotelDataService';
import { SpecialOffer } from '../../types';

export const OffersPage: React.FC = () => {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelDataService.getSpecialOffers().then((data) => {
      setOffers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Curated Highland Offers & Packages"
        description="Exclusive seasonal packages at The Mau Estate. Romantic escapes, holistic wellness weekends, and extended private sanctuary stays in Mau Narok."
        canonicalPath="/offers"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Tag className="w-3.5 h-3.5" />
              <span>Tailored Journeys</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              Special Offers & Packages
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Curated experiences crafted for romance, restoration, and extended high-altitude retreats.
            </p>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-sm border border-ivory-dark overflow-hidden shadow-subtle hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-forest-surface">
                    <img
                      src={offer.image_url}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-forest-deep/90 text-gold text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm border border-gold/40 shadow-sm">
                      {offer.discount_percentage}% Exclusive Savings
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
                      Min. {offer.min_nights} Nights Stay &bull; Valid {offer.valid_from} to {offer.valid_until}
                    </div>

                    <h2 className="font-serif text-3xl text-forest font-medium">{offer.title}</h2>
                    <p className="text-stone text-xs sm:text-sm leading-relaxed font-light">
                      {offer.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-ivory-cream">
                      <span className="text-[11px] font-semibold text-forest uppercase tracking-wider block">
                        Package Inclusions:
                      </span>
                      <ul className="space-y-1.5 text-xs text-stone-dark">
                        {offer.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-4 border-t border-ivory-cream flex items-center justify-between gap-4">
                  <Link
                    to={`/offers/${offer.slug}`}
                    className="text-xs text-stone hover:text-forest underline underline-offset-4 font-medium"
                  >
                    View Package Details
                  </Link>

                  <Link
                    to={`/booking?offerSlug=${offer.slug}`}
                    className="px-6 py-3 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold tracking-wider uppercase rounded-sm transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Calendar className="w-4 h-4 text-gold" />
                    <span>Reserve Package</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
