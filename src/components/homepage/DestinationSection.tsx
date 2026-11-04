import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plane, Compass, CloudRain, Sun, ArrowRight } from 'lucide-react';

export const DestinationSection: React.FC = () => {
  return (
    <section className="py-24 bg-ivory-cream text-forest relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>The Destination</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest font-normal tracking-wide">
            Mau Narok: Kenya’s highland crown.
          </h2>
          <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
            Situated on the high-altitude western escarpment of the Great Rift Valley, Mau Narok offers dramatic panoramic topography, fertile dark loam, and cool mountain weather untouched by tourist crowds.
          </p>
        </div>

        {/* 3 Destination Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-sm border border-ivory-dark/70 shadow-subtle space-y-4">
            <div className="w-10 h-10 rounded-sm bg-ivory-light flex items-center justify-center text-gold">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-forest font-medium">Highland Microclimate</h3>
            <p className="text-stone text-xs sm:text-sm leading-relaxed font-light">
              Crisp mornings filled with mountain mist, sun-drenched midday hours averaging 22°C (72°F), and bracing starlit nights hovering at 10°C (50°F) where open cedar hearths bring comforting warmth.
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm border border-ivory-dark/70 shadow-subtle space-y-4">
            <div className="w-10 h-10 rounded-sm bg-ivory-light flex items-center justify-center text-gold">
              <CloudRain className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-forest font-medium">Volcanic Agro-Forestry</h3>
            <p className="text-stone text-xs sm:text-sm leading-relaxed font-light">
              Surrounded by rolling barley and wheat fields that turn molten gold at harvest, alongside organic tea terraces and protected indigenous cedar and olive forest corridors.
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm border border-ivory-dark/70 shadow-subtle space-y-4">
            <div className="w-10 h-10 rounded-sm bg-ivory-light flex items-center justify-center text-gold">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-forest font-medium">Seamless Accessibility</h3>
            <p className="text-stone text-xs sm:text-sm leading-relaxed font-light">
              A 3-hour scenic drive from Nairobi through the Great Rift Valley, 50 minutes from Lake Nakuru, or a discreet 35-minute direct helicopter flight from Wilson Airport to our private crest helipad.
            </p>
          </div>
        </div>

        {/* Banner with CTA */}
        <div className="relative rounded-sm overflow-hidden bg-forest text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-2xl sm:text-3xl font-medium">Planning your highland journey?</h4>
            <p className="text-stone-light text-xs sm:text-sm font-light max-w-xl">
              Our concierge team arranges bespoke 4x4 executive transfers, private air charters, and curated regional safari itineraries.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 bg-gold hover:bg-gold-light text-forest-deep text-xs font-semibold tracking-[0.16em] uppercase rounded-sm whitespace-nowrap transition-colors"
          >
            Contact Estate Concierge
          </Link>
        </div>
      </div>
    </section>
  );
};
