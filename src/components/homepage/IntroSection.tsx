import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mountain, ShieldCheck, Sparkles, Wind } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-ivory-light text-forest relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Rare African Highland Sanctuary</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest leading-[1.15] font-normal tracking-wide">
              Perched high above the Great Rift Valley, where mist meets cedar.
            </h2>

            <div className="w-16 h-[2px] bg-gold" />

            <p className="text-stone text-base leading-relaxed font-light">
              Mau Narok has long remained Kenya’s best-kept secret—a high-altitude fertile plateau where rich volcanic soils yield golden wheat fields, crisp highland air, and ancient indigenous cedar forests.
            </p>

            <p className="text-stone text-base leading-relaxed font-light">
              At The Mau Estate, luxury is redefined not by ostentation, but by profound silence, bespoke architecture, crackling stone fireplaces, and an intimate reverence for the natural world. Here, time decelerates, allowing body and spirit to breathe anew.
            </p>

            {/* Highland Highlights Pillars */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-ivory-dark">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-forest font-serif text-lg">
                  <Mountain className="w-4 h-4 text-gold" />
                  <span>2,840 Metres</span>
                </div>
                <p className="text-xs text-stone-light">High-altitude restorative climate & pure mountain air.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-forest font-serif text-lg">
                  <Wind className="w-4 h-4 text-gold" />
                  <span>Private Seclusion</span>
                </div>
                <p className="text-xs text-stone-light">Spacious suites framed by uninterrupted forest vistas.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-forest hover:text-gold transition-colors group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-gold" />
              </Link>
            </div>
          </div>

          {/* Right Photographic Composition */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-sm overflow-hidden shadow-luxury border border-ivory-dark aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
                  alt="Highland estate architecture overlooking misty forest"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Offset Decorative Image */}
              <div className="hidden sm:block absolute -bottom-10 -left-10 w-3/5 rounded-sm overflow-hidden shadow-2xl border-4 border-ivory-light aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                  alt="Warm cedar tub and botanical spa"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Verified Emblem Stamp */}
              <div className="absolute top-6 right-6 backdrop-blur-md bg-forest/90 text-ivory border border-gold/40 p-4 rounded-sm shadow-lg text-center hidden md:block">
                <span className="block font-serif text-2xl text-gold font-medium">EST. 2026</span>
                <span className="block text-[9px] tracking-[0.2em] uppercase text-stone-light mt-0.5">Mau Narok Sanctuary</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
