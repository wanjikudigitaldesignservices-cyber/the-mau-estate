import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, 
  Maximize2, 
  Bed, 
  Check, 
  Calendar, 
  ArrowLeft, 
  ShieldCheck, 
  Info, 
  Coffee, 
  Flame, 
  Wifi, 
  Sparkles 
} from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { DemonstrationBadge } from '../../components/common/DemonstrationBadge';
import { RoomCard } from '../../components/accommodation/RoomCard';
import { hotelDataService } from '../../services/hotelDataService';
import { RoomType } from '../../types';
import { formatCurrency, formatKes } from '../../utils/formatters';
import { siteConfig } from '../../config/siteConfig';

export const RoomDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [room, setRoom] = useState<RoomType | null>(null);
  const [allRooms, setAllRooms] = useState<RoomType[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!slug) return;

    Promise.all([
      hotelDataService.getRoomTypeBySlug(slug),
      hotelDataService.getRoomTypes(),
    ]).then(([found, rooms]) => {
      if (found) {
        setRoom(found);
        setActiveImage(found.main_image_url);
      }
      setAllRooms(rooms);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light">
        <Navbar transparentOnTop={false} />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-light">
        <Navbar transparentOnTop={false} />
        <div className="flex-1 flex items-center justify-center py-32 px-4 text-center space-y-4">
          <h2 className="font-serif text-3xl text-forest">Sanctuary Not Found</h2>
          <p className="text-stone text-xs">The requested room category does not exist or is unpublished.</p>
          <Link
            to="/accommodation"
            className="inline-block px-6 py-2.5 bg-forest text-gold text-xs font-semibold uppercase tracking-wider rounded-sm"
          >
            View All Suites
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedRooms = allRooms.filter((r) => r.id !== room.id).slice(0, 3);
  const rateKes = Math.round(room.base_rate_per_night * siteConfig.taxes.kesExchangeRate);
  const gallery = room.gallery_images && room.gallery_images.length > 0
    ? room.gallery_images
    : [room.main_image_url];

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title={`${room.name} | Suites & Sanctuaries`}
        description={room.short_description}
        canonicalPath={`/accommodation/${room.slug}`}
        image={room.main_image_url}
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Breadcrumb Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/accommodation"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone hover:text-forest transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Back to All Suites</span>
          </Link>
        </div>

        {/* Hero Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Interactive Gallery Viewer */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-forest-surface shadow-luxury border border-ivory-dark">
                <img
                  src={activeImage}
                  alt={room.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {room.is_demonstration && <DemonstrationBadge variant="overlay" />}
              </div>

              {/* Thumbnail Selector */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-14 sm:w-24 sm:h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all ${
                        activeImage === img ? 'border-gold shadow-sm scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${room.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Reservation Sticky Card */}
            <div className="lg:col-span-4 sticky top-28 bg-white p-7 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                  Guaranteed Direct Rate
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                    {formatCurrency(room.base_rate_per_night, room.currency)}
                  </span>
                  <span className="text-xs text-stone-light">/ night</span>
                </div>
                <div className="text-xs text-gold font-medium">
                  ≈ {formatKes(rateKes)} <span className="text-stone-light font-normal">(excl. 16% VAT & 2% levy)</span>
                </div>
              </div>

              {/* Key Quick Specs */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-ivory-cream text-xs text-stone">
                <div>
                  <span className="text-[10px] text-stone-light uppercase block">Size</span>
                  <span className="font-semibold text-forest">{room.room_size_sqm} m²</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-light uppercase block">Capacity</span>
                  <span className="font-semibold text-forest">{room.max_occupancy} Guests</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-light uppercase block">Bed</span>
                  <span className="font-semibold text-forest truncate block">{room.bed_type.split(' ')[0]}</span>
                </div>
              </div>

              {/* Inclusions Highlights */}
              <div className="space-y-2 text-xs text-stone-dark">
                <span className="font-semibold text-forest text-[11px] uppercase tracking-wider block">
                  Always Included:
                </span>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Farm-to-table breakfast in suite or restaurant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Evening cedar fireplace hearth lighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Naturalist-guided afro-montane forest walks</span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  to={`/booking?roomTypeId=${room.id}`}
                  className="w-full py-4 bg-forest hover:bg-forest-deep text-gold font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-luxury flex items-center justify-center gap-2 active:scale-98"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Reserve This Suite</span>
                </Link>

                <p className="text-[10px] text-stone-light text-center">
                  Direct booking guarantee &bull; Flexible cancellation up to 14 days prior
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Room Story & Full Amenities */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Story */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl text-forest font-normal">
                {room.tagline || 'A serene highland residence.'}
              </h2>
              <div className="w-12 h-[2px] bg-gold" />
              <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-2xl text-forest font-normal">Suite Inclusions & Amenities</h3>
              <ul className="grid grid-cols-1 gap-3 text-xs text-stone-dark">
                {room.amenities?.map((amenity, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded bg-white border border-ivory-dark/60">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Rooms */}
          <div className="pt-16 border-t border-ivory-dark space-y-8">
            <h3 className="font-serif text-3xl text-forest font-normal">Explore Other Sanctuaries</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedRooms.map((r) => (
                <RoomCard key={r.id} room={r} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
