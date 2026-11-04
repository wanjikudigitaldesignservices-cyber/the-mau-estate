import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag, Check, Calendar, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { hotelDataService } from '../../services/hotelDataService';
import { SpecialOffer } from '../../types';

export const OfferDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!slug) return;

    hotelDataService.getSpecialOfferBySlug(slug).then((found) => {
      if (found) setOffer(found);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light">
        <Navbar transparentOnTop={false} />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light text-center py-32 space-y-4">
        <h2 className="font-serif text-3xl text-forest">Special Offer Not Found</h2>
        <Link to="/offers" className="text-gold underline text-xs">
          View All Offers
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title={`${offer.title} | Special Offers`}
        description={offer.description}
        canonicalPath={`/offers/${offer.slug}`}
        image={offer.image_url}
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/offers"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone hover:text-forest transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Back to All Offers</span>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Visual */}
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-forest-surface shadow-luxury border border-ivory-dark">
            <img src={offer.image_url} alt={offer.title} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 bg-forest-deep/90 text-gold text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-sm border border-gold/40">
              {offer.discount_percentage}% Exclusive Savings
            </div>
          </div>

          {/* Details Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold block">
                Curated Package Itinerary
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-forest font-normal">{offer.title}</h1>
              <p className="text-stone text-base leading-relaxed font-light">{offer.description}</p>

              <div className="space-y-3 pt-4 border-t border-ivory-cream">
                <h3 className="font-serif text-2xl text-forest">What is Included in Your Stay</h3>
                <ul className="grid grid-cols-1 gap-2.5 text-xs text-stone-dark">
                  {offer.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-white rounded border border-ivory-dark/60">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sticky Booking CTA */}
            <div className="lg:col-span-4 bg-white p-7 rounded-sm border border-ivory-dark shadow-subtle space-y-6 h-fit sticky top-28">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-light">Terms & Validity</span>
                <div className="text-xs text-stone space-y-1 pt-1">
                  <div>Min. Stay: <span className="font-semibold text-forest">{offer.min_nights} Nights</span></div>
                  <div>Valid From: <span className="font-semibold text-forest">{offer.valid_from}</span></div>
                  <div>Valid Until: <span className="font-semibold text-forest">{offer.valid_until}</span></div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/booking?offerSlug=${offer.slug}`}
                  className="w-full py-4 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all flex items-center justify-center gap-2 shadow-luxury"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Reserve Package Now</span>
                </Link>
              </div>

              <div className="text-[10px] text-stone-light text-center leading-relaxed">
                Subject to suite category availability. Direct booking rate automatically applies savings.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
