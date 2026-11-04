import React from 'react';
import { MapPin, Navigation, Compass, Plane, Car, ExternalLink } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const LocationSection: React.FC = () => {
  const { coordinates, address } = siteConfig.contact;

  return (
    <section className="py-24 bg-ivory-light text-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Coordinates & Driving Directions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location & Access</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest font-normal tracking-wide">
              High on the Mau Narok ridge, secluded yet accessible.
            </h2>

            <p className="text-stone text-sm leading-relaxed font-light">
              The Mau Estate is situated at an elevation of 2,840 metres in Nakuru County, overlooking the sweeping expanses of the Great Rift Valley.
            </p>

            {/* Coordinates Badge */}
            <div className="p-4 bg-white rounded-sm border border-ivory-dark flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-gold" />
                <span className="font-mono text-forest">
                  {coordinates.lat.toFixed(4)}° S, {coordinates.lng.toFixed(4)}° E
                </span>
              </div>
              <span className="text-[11px] text-stone-light tracking-wider uppercase font-medium">
                2,840m Elevation
              </span>
            </div>

            {/* Transit Options */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 text-xs">
                <Car className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-forest uppercase tracking-wider text-[11px]">Scenic Road Journey</h4>
                  <p className="text-stone leading-relaxed font-light">
                    3 hours from Nairobi via the Mai Mahiu / Naivasha scenic escarpment highway; 50 minutes from Nakuru City via Njoro. 4x4 or SUV recommended for highland terrain.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs">
                <Plane className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-forest uppercase tracking-wider text-[11px]">Private Air Charter & Helipad</h4>
                  <p className="text-stone leading-relaxed font-light">
                    Direct 35-minute helicopter transfer from Wilson Airport (HKNW) landed on the private estate crest helipad, with private concierge and luggage handling.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-forest hover:text-gold transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>
          </div>

          {/* Right Interactive Map Frame */}
          <div className="lg:col-span-7">
            <div className="relative rounded-sm overflow-hidden border border-ivory-dark shadow-luxury aspect-[16/10] bg-forest-surface">
              <iframe
                title="The Mau Estate Location Map"
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[105%]"
              />

              {/* Map Overlay Badge */}
              <div className="absolute bottom-4 left-4 bg-forest-deep/95 backdrop-blur-md p-4 rounded-sm border border-gold/40 text-white shadow-xl max-w-xs hidden sm:block">
                <span className="text-[10px] tracking-widest uppercase text-gold font-semibold block mb-0.5">
                  The Mau Estate
                </span>
                <p className="text-[11px] text-stone-light">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
