import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Clock, Activity, ArrowRight } from 'lucide-react';
import { HotelExperience } from '../../types';
import { hotelDataService } from '../../services/hotelDataService';

export const ExperiencesShowcase: React.FC = () => {
  const [experiences, setExperiences] = useState<HotelExperience[]>([]);

  useEffect(() => {
    hotelDataService.getExperiences().then(setExperiences);
  }, []);

  return (
    <section className="py-24 bg-forest text-ivory relative overflow-hidden">
      {/* Background subtle watermark texture */}
      <div className="absolute right-0 top-0 w-96 h-96 opacity-5 pointer-events-none">
        <Compass className="w-full h-full text-gold" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Signature Highland Pursuits</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-wide">
              Adventures shaped by altitude, forest trails, and endless skies.
            </h2>
          </div>

          <div>
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-ivory hover:text-gold transition-colors pb-1 border-b border-ivory/30 hover:border-gold"
            >
              <span>View All Experiences</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group bg-forest-surface/80 border border-forest-border/80 rounded-sm overflow-hidden flex flex-col justify-between hover:border-gold/50 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={exp.image_url}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-forest-deep/80 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-wider uppercase text-gold font-medium rounded-sm border border-gold/30">
                    {exp.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-stone-light text-xs leading-relaxed font-light line-clamp-3">
                    {exp.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-forest-border/50 mt-4 flex items-center justify-between text-[11px] text-stone-light">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-gold" />
                  <span>{exp.activity_level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
