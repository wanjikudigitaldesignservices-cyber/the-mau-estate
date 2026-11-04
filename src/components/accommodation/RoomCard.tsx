import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize2, Bed, ArrowRight, Calendar } from 'lucide-react';
import { RoomType } from '../../types';
import { formatCurrency, formatKes } from '../../utils/formatters';
import { DemonstrationBadge } from '../common/DemonstrationBadge';
import { siteConfig } from '../../config/siteConfig';

interface RoomCardProps {
  room: RoomType;
  featured?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, featured = false }) => {
  const rateKes = Math.round(room.base_rate_per_night * siteConfig.taxes.kesExchangeRate);

  return (
    <article className="group bg-white rounded-sm overflow-hidden border border-ivory-dark/70 shadow-subtle hover:shadow-luxury transition-all duration-500 flex flex-col h-full">
      {/* Photograph Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-surface">
        <img
          src={room.main_image_url}
          alt={`${room.name} interior at The Mau Estate`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Demonstration badge indicator */}
        {room.is_demonstration && <DemonstrationBadge variant="overlay" />}

        {/* Category Tag */}
        <div className="absolute bottom-3 right-3 backdrop-blur-md bg-forest-deep/80 text-white text-[11px] tracking-[0.16em] uppercase px-3 py-1 rounded-sm border border-forest-border">
          {room.room_size_sqm} m² • {room.max_adults} Adults
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-2xl text-forest group-hover:text-gold transition-colors font-medium">
              <Link to={`/accommodation/${room.slug}`}>{room.name}</Link>
            </h3>
          </div>

          <p className="text-stone text-xs leading-relaxed line-clamp-2 font-light">
            {room.short_description}
          </p>

          {/* Key Attributes */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-ivory-cream text-stone text-[11px]">
            <div className="flex items-center gap-1.5" title="Room Size">
              <Maximize2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>{room.room_size_sqm} m²</span>
            </div>
            <div className="flex items-center gap-1.5" title="Bed Configuration">
              <Bed className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span className="truncate">{room.bed_type.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Max Occupancy">
              <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>Up to {room.max_occupancy}</span>
            </div>
          </div>
        </div>

        {/* Pricing and Action CTAs */}
        <div className="pt-6 mt-4 border-t border-ivory-cream flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-stone-light">From / Night</div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-bold text-forest">
                {formatCurrency(room.base_rate_per_night, room.currency)}
              </span>
              <span className="text-[10px] text-stone-light">excl. taxes</span>
            </div>
            <div className="text-[10px] text-gold font-medium">
              ≈ {formatKes(rateKes)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/accommodation/${room.slug}`}
              className="p-2.5 rounded-sm border border-stone-light/40 text-forest hover:border-gold hover:text-gold transition-colors text-xs"
              title="Explore Suite Details"
              aria-label={`View details for ${room.name}`}
            >
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`/booking?roomTypeId=${room.id}`}
              className="px-4 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
