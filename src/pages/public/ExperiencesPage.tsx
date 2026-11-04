import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Clock, Activity, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { hotelDataService } from '../../services/hotelDataService';
import { HotelExperience } from '../../types';

export const ExperiencesPage: React.FC = () => {
  const [experiences, setExperiences] = useState<HotelExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelDataService.getExperiences().then((data) => {
      setExperiences(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Highland Experiences & Pursuits"
        description="Immerse in nature with signature pursuits at The Mau Estate. Forest canopy treks, equestrian trails, artisanal tea tastings, and escarpment stargazing."
        canonicalPath="/experiences"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Sanctuary Pursuits</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              Highland Experiences
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Curated encounters that immerse you in the afro-montane beauty and rich agricultural tapestry of Mau Narok.
            </p>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-sm border border-ivory-dark overflow-hidden shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-forest-surface">
                    <img
                      src={exp.image_url}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-forest-deep/90 text-gold text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-sm border border-gold/40">
                      {exp.category}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <h3 className="font-serif text-2xl sm:text-3xl text-forest font-medium">{exp.title}</h3>
                    <p className="text-stone text-xs sm:text-sm leading-relaxed font-light">
                      {exp.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-ivory-cream text-xs text-stone">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>Duration: {exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>Level: {exp.activity_level}</span>
                      </div>
                    </div>

                    <div className="text-xs text-stone font-medium">
                      Pricing: <span className="text-forest font-semibold">{exp.pricing_info}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-4 border-t border-ivory-cream flex items-center justify-between">
                  <Link
                    to="/contact?type=experiences"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold transition-colors"
                  >
                    <span>Enquire with Concierge</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </Link>

                  <Link
                    to="/booking"
                    className="px-5 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                  >
                    Reserve Stay
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
