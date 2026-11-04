import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Droplets, Sun, Wind, ArrowRight } from 'lucide-react';

export const WellnessShowcase: React.FC = () => {
  const treatments = [
    {
      icon: Droplets,
      title: 'Cedar Thermal Soaking',
      description: 'Handcrafted outdoor cedar plunge tubs heated by wood fire, overlooking the mist-filled valley.',
    },
    {
      icon: Wind,
      title: 'Indigenous Herbal Steam',
      description: 'Infused with highland wild sage, organic eucalyptus, and harvested local lavender blossoms.',
    },
    {
      icon: Sparkles,
      title: 'Botanical Body Rituals',
      description: 'Restorative deep-tissue therapies using cold-pressed Kenyan marula, baobab, and frankincense balms.',
    },
    {
      icon: Sun,
      title: 'Ridge Sunrise Yoga',
      description: 'Guided morning breathwork and gentle flows atop the 2,840-metre panoramic meditation pavilion.',
    },
  ];

  return (
    <section className="py-24 bg-forest-surface text-ivory relative border-t border-forest-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-sm overflow-hidden border border-forest-border shadow-luxury aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                  alt="Highland wellness sanctuary at The Mau Estate"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-forest-deep p-6 rounded-sm border border-gold/40 shadow-xl max-w-xs hidden sm:block">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold block mb-1">
                  High-Altitude Restoration
                </span>
                <p className="text-xs text-stone-light font-light leading-relaxed">
                  The crisp montane air accelerates pulmonary regeneration and deep muscular relaxation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Narrative & Treatment Grid */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
              <Heart className="w-3.5 h-3.5" />
              <span>Highland Holistic Wellness</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-wide">
              Restore your balance in nature’s quiet embrace.
            </h2>

            <p className="text-stone-light text-sm sm:text-base leading-relaxed font-light">
              Rooted in ancient African herbal lore and contemporary restorative physiology, our spa sanctuary harnesses the soothing silence of Mau Narok to melt away fatigue.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {treatments.map((t, idx) => {
                const IconComponent = t.icon;
                return (
                  <div key={idx} className="p-5 rounded-sm bg-forest-deep/60 border border-forest-border/60 space-y-2">
                    <div className="w-8 h-8 rounded-full bg-forest-surface flex items-center justify-center text-gold">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif text-lg text-white font-medium">{t.title}</h4>
                    <p className="text-stone-light text-xs leading-relaxed font-light">{t.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Link
                to="/experiences"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gold hover:text-gold-light transition-colors"
              >
                <span>Discover All Spa & Wellness Rituals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
