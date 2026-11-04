import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Mountain, ShieldCheck, Heart, TreePine, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { siteConfig } from '../../config/siteConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Our Story & Heritage"
        description="The story of The Mau Estate. Nestled at 2,840 metres in Mau Narok, Kenya. Contemporary African luxury, afro-montane nature conservation, and serene hospitality."
        canonicalPath="/about"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Rare Highland Heritage</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              A World Away. A Feeling Apart.
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Founded on principles of mindful architecture, environmental reverence, and authentic Kenyan warmth.
            </p>
          </div>
        </div>

        {/* Story Section 1: The Highland Calling */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                The Geography of Stillness
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest font-normal leading-tight">
                Where the Great Rift Valley rises to touch the mist.
              </h2>
              <div className="w-16 h-[2px] bg-gold" />
              <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
                Perched high on the western shoulder of the Great Rift Valley at 2,840 metres above sea level, Mau Narok has nurtured travelers, farmers, and naturalists for centuries. The volcanic highlands offer crystal-clear mountain atmosphere, deep volcanic soils, and a cooling climate reminiscent of alpine retreats.
              </p>
              <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
                The Mau Estate was conceived as a private sanctuary—an escape where urban noise vanishes into cedar forest whispers and open hearth fires crackle beneath starlit African skies.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-sm overflow-hidden shadow-luxury border border-ivory-dark aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                  alt="Highland cedar forest in morning mist at The Mau Estate"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="bg-forest-surface text-ivory py-20 border-y border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.22em] text-gold font-semibold block">
                Our Foundational Pillars
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Mindful Luxury, Rooted in Earth
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-forest-deep p-8 rounded-sm border border-forest-border space-y-4">
                <div className="w-10 h-10 rounded bg-forest-surface text-gold flex items-center justify-center">
                  <TreePine className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-white">Ecological Stewardship</h4>
                <p className="text-xs text-stone-light leading-relaxed font-light">
                  We actively protect indigenous cedar corridors, reforest endemic tree species, and operate comprehensive solar hydro-thermal systems.
                </p>
              </div>

              <div className="bg-forest-deep p-8 rounded-sm border border-forest-border space-y-4">
                <div className="w-10 h-10 rounded bg-forest-surface text-gold flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-white">Community Partnership</h4>
                <p className="text-xs text-stone-light leading-relaxed font-light">
                  From hand-spun highland wool textiles to organic farm produce, over 80% of our daily hospitality provisions are sourced directly within Mau Narok and Nakuru County.
                </p>
              </div>

              <div className="bg-forest-deep p-8 rounded-sm border border-forest-border space-y-4">
                <div className="w-10 h-10 rounded bg-forest-surface text-gold flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-white">Discreet Hospitality</h4>
                <p className="text-xs text-stone-light leading-relaxed font-light">
                  Unobtrusive service that respects resident privacy, paired with dedicated private butlers, bespoke dining, and tailored concierge excursions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl text-forest font-normal">
            Experience the highland magic for yourself.
          </h3>
          <p className="text-stone text-sm font-light max-w-xl mx-auto">
            Whether for contemplation, celebration, or romantic restoration, our doors are open to welcome you.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all shadow-luxury"
            >
              <span>Reserve Your Stay</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
