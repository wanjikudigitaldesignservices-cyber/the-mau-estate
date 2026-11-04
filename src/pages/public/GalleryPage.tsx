import React, { useEffect, useState } from 'react';
import { Camera, X, Maximize2, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { hotelDataService } from '../../services/hotelDataService';
import { GalleryItem } from '../../types';

export const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    hotelDataService.getGalleryImages(category).then(setImages);
  }, [category]);

  const categories = [
    { key: 'all', label: 'All Perspectives' },
    { key: 'estate', label: 'The Estate & Grounds' },
    { key: 'accommodation', label: 'Suites & Interiors' },
    { key: 'dining', label: 'Gastronomy' },
    { key: 'wellness', label: 'Spa & Wellness' },
    { key: 'experiences', label: 'Highland Pursuits' },
    { key: 'events', label: 'Celebrations' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Visual Archive & Photographic Gallery"
        description="Explore the visual archive of The Mau Estate. Photographic perspectives of our highland suites, grounds, cuisine, and cedar forests."
        canonicalPath="/gallery"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero */}
        <div className="bg-forest text-white py-16 sm:py-24 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Archive</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              The Photographic Gallery
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              An evocative visual chronicle of high-altitude stillness, handcrafted timber architecture, and dramatic rift horizons.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-4 py-2 rounded-sm text-xs uppercase tracking-[0.15em] transition-all duration-300 font-medium ${
                category === c.key
                  ? 'bg-gold text-forest-deep shadow-sm'
                  : 'bg-white text-stone hover:text-forest border border-ivory-dark hover:border-gold/50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-forest-surface border border-ivory-dark shadow-subtle cursor-pointer"
              >
                <img
                  src={img.image_url}
                  alt={img.alt_text}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-forest-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-forest-surface/80 text-gold">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-gold font-medium mb-1 block">
                      {img.category}
                    </span>
                    <h3 className="font-serif text-lg text-white font-normal">{img.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/95 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gold p-2 transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.alt_text}
              className="max-w-full max-h-[75vh] object-contain rounded-sm border border-gold/40 shadow-2xl"
            />
            <div className="mt-4 text-center space-y-1">
              <span className="text-[10px] tracking-widest uppercase text-gold block font-medium">
                {selectedImage.category}
              </span>
              <h4 className="font-serif text-2xl text-white font-normal">{selectedImage.title}</h4>
              <p className="text-xs text-stone-light max-w-md mx-auto">{selectedImage.alt_text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
