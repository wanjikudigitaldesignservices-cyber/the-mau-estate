import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Clock, Users, Sparkles, Wine, Flame, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { hotelDataService } from '../../services/hotelDataService';
import { DiningOption } from '../../types';

export const DiningPage: React.FC = () => {
  const [venues, setVenues] = useState<DiningOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelDataService.getDiningOptions().then((data) => {
      setVenues(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Farm-to-Table Highland Dining"
        description="Experience exceptional gastronomy at The Mau Estate. The Forest Hearth, The Cedar Lounge, and private lantern-lit bush dinners in Mau Narok, Kenya."
        canonicalPath="/dining"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Utensils className="w-3.5 h-3.5" />
              <span>Epicurean Philosophy</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              Highland Farm-to-Table Gastronomy
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Volcanic soil harvests, rare estate honey, wild herbs, and wood-fired cedar hearths create an evocative culinary landscape.
            </p>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl text-forest font-normal">Our Dining Venues</h2>
            <p className="text-stone text-xs sm:text-sm font-light">
              Each dining room offers distinct sensory atmospheres, from intimate cedar fireplaces to sun-filled botanical glasshouses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white rounded-sm border border-ivory-dark overflow-hidden shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-forest-surface">
                    <img
                      src={venue.image_url}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-forest-deep/90 text-gold text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-sm border border-gold/40">
                      {venue.cuisine_type}
                    </div>
                  </div>

                  <div className="p-7 space-y-3">
                    <h3 className="font-serif text-2xl text-forest">{venue.name}</h3>
                    <p className="text-stone text-xs leading-relaxed font-light">
                      {venue.description}
                    </p>
                    {venue.dress_code && (
                      <div className="text-[11px] text-stone-light pt-2">
                        Dress code: <span className="font-medium text-forest">{venue.dress_code}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-7 pt-4 border-t border-ivory-cream flex items-center justify-between text-xs text-stone">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="truncate max-w-[200px]">{venue.opening_hours}</span>
                  </div>
                  {venue.seating_capacity && (
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{venue.seating_capacity} seats</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bush Dining Highlight Banner */}
          <div className="relative rounded-sm overflow-hidden bg-forest text-white p-8 sm:p-14 border border-forest-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold flex items-center justify-center md:justify-start gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Signature Resident Experience</span>
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                Private Lantern-Lit Bush Dining
              </h3>
              <p className="text-stone-light text-xs sm:text-sm leading-relaxed font-light">
                Enjoy a 4-course bespoke menu prepared by your private chef beneath an ancient cedar canopy, warmed by open braziers under the starry African night.
              </p>
            </div>

            <Link
              to="/contact?type=dining"
              className="px-8 py-3.5 bg-gold hover:bg-gold-light text-forest-deep text-xs font-semibold uppercase tracking-[0.18em] rounded-sm whitespace-nowrap transition-all shadow-sm"
            >
              Reserve Private Dinner
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
