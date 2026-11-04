import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Compass } from 'lucide-react';
import { ReservationSearchWidget } from './ReservationSearchWidget';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-forest-deep text-white">
      {/* Background Photography with Luxury Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="The Mau Estate highland sanctuary nestled in misty Mau Narok mountains"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/40" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* Hero Center Text Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto pt-16 pb-8">
        {/* Subtle Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-deep/80 backdrop-blur-md border border-gold/40 text-gold text-xs tracking-[0.25em] uppercase font-medium mb-6">
          <Compass className="w-3.5 h-3.5" />
          <span>Mau Narok, Kenya • 2,840m Elevation</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.06em] text-white leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-md">
          WHERE LUXURY MEETS THE QUIET BEAUTY OF NATURE.
        </h1>

        {/* Supporting Copy */}
        <p className="text-ivory/90 text-base sm:text-lg md:text-xl font-light tracking-[0.04em] max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover a refined escape in the heart of Mau Narok, Kenya. A world away. A feeling apart.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/booking"
            className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold-light text-forest-deep text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-luxury hover:shadow-gold-glow active:scale-98"
          >
            Reserve Your Stay
          </Link>
          <Link
            to="/accommodation"
            className="w-full sm:w-auto px-8 py-3.5 bg-forest-surface/80 hover:bg-forest-light text-ivory hover:text-white border border-ivory/30 text-xs font-medium tracking-[0.2em] uppercase rounded-sm backdrop-blur-sm transition-all duration-300 active:scale-98"
          >
            Discover Our Rooms
          </Link>
        </div>
      </div>

      {/* Bottom Reservation Search Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <ReservationSearchWidget variant="hero" />

        <div className="flex items-center justify-center mt-6 text-stone-light text-xs tracking-widest uppercase">
          <a
            href="#story"
            className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <span>Explore The Estate</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
