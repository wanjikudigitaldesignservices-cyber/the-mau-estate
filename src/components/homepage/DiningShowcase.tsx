import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Clock, Users, ArrowRight } from 'lucide-react';
import { DiningOption } from '../../types';
import { hotelDataService } from '../../services/hotelDataService';

export const DiningShowcase: React.FC = () => {
  const [dining, setDining] = useState<DiningOption[]>([]);

  useEffect(() => {
    hotelDataService.getDiningOptions().then(setDining);
  }, []);

  return (
    <section className="py-24 bg-ivory-light text-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
              <Utensils className="w-3.5 h-3.5" />
              <span>Epicurean Journeys</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest font-normal tracking-wide">
              Highland farm-to-table cuisine, warmed by open cedar hearths.
            </h2>
          </div>

          <div>
            <Link
              to="/dining"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-forest hover:text-gold transition-colors pb-1 border-b border-forest/30 hover:border-gold"
            >
              <span>Explore Menus & Venues</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>

        {/* Dining Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {dining.map((venue) => (
            <div
              key={venue.id}
              className="group bg-white rounded-sm overflow-hidden border border-ivory-dark/70 shadow-subtle hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-forest-surface">
                  <img
                    src={venue.image_url}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-forest-deep/80 backdrop-blur-md px-3 py-1 text-[10px] tracking-wider uppercase text-gold font-medium rounded-sm border border-gold/30">
                    {venue.cuisine_type}
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <h3 className="font-serif text-2xl text-forest group-hover:text-gold transition-colors">
                    {venue.name}
                  </h3>
                  <p className="text-stone text-xs leading-relaxed font-light">
                    {venue.description}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-4 border-t border-ivory-cream flex items-center justify-between text-[11px] text-stone-light">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="truncate max-w-[180px]">{venue.opening_hours}</span>
                </div>
                {venue.seating_capacity && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{venue.seating_capacity} Seats</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
