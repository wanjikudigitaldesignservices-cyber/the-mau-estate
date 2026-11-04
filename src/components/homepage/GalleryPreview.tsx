import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../../types';
import { hotelDataService } from '../../services/hotelDataService';

export const GalleryPreview: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    hotelDataService.getGalleryImages(activeTab).then(setImages);
  }, [activeTab]);

  const categories = [
    { key: 'all', label: 'All Perspectives' },
    { key: 'estate', label: 'The Estate' },
    { key: 'accommodation', label: 'Suites' },
    { key: 'dining', label: 'Dining' },
    { key: 'wellness', label: 'Wellness' },
    { key: 'experiences', label: 'Experiences' },
  ];

  return (
    <section className="py-24 bg-forest-deep text-ivory border-t border-forest-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Archive</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-wide">
              Moments of light, stillness, and architectural grace.
            </h2>
          </div>

          <div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-ivory hover:text-gold transition-colors pb-1 border-b border-ivory/30 hover:border-gold"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveTab(c.key)}
              className={`px-4 py-2 rounded-sm text-xs uppercase tracking-[0.15em] transition-all duration-300 font-medium ${
                activeTab === c.key
                  ? 'bg-gold text-forest-deep shadow-sm'
                  : 'bg-forest-surface text-stone-light hover:text-white hover:bg-forest-light border border-forest-border/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.slice(0, 6).map((img) => (
            <div
              key={img.id}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-forest-surface border border-forest-border/60 shadow-subtle cursor-pointer"
            >
              <img
                src={img.image_url}
                alt={img.alt_text}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] tracking-widest uppercase text-gold font-medium mb-1">{img.category}</span>
                <h4 className="font-serif text-lg text-white">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
