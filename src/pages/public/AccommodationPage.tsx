import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Filter } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { RoomCard } from '../../components/accommodation/RoomCard';
import { DemonstrationBadge } from '../../components/common/DemonstrationBadge';
import { hotelDataService } from '../../services/hotelDataService';
import { RoomType } from '../../types';

export const AccommodationPage: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOccupancy, setFilterOccupancy] = useState<number>(0);

  useEffect(() => {
    hotelDataService.getRoomTypes().then((data) => {
      setRooms(data);
      setLoading(false);
    });
  }, []);

  const filteredRooms = filterOccupancy > 0 
    ? rooms.filter((r) => r.max_occupancy >= filterOccupancy)
    : rooms;

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Luxury Suites & Sanctuaries"
        description="Discover our private highland suites at The Mau Estate. Custom cedar fireplaces, rainfall showers, and panoramic Great Rift Valley views."
        canonicalPath="/accommodation"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 pt-24 pb-24">
        {/* Hero Header */}
        <div className="bg-forest text-white py-16 sm:py-20 border-b border-forest-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Highland Residences</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide">
              Suites & Private Sanctuaries
            </h1>
            <p className="text-stone-light text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Thoughtfully positioned across the forest ridge for utmost privacy, uninterrupted silence, and evocative morning mist.
            </p>
            <div className="pt-2">
              <DemonstrationBadge />
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-ivory-dark pb-6">
          <div className="text-xs text-stone">
            Showing <span className="font-semibold text-forest">{filteredRooms.length}</span> curated sanctuaries
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-stone-light flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gold" />
              <span>Filter by Guests:</span>
            </span>
            <select
              value={filterOccupancy}
              onChange={(e) => setFilterOccupancy(Number(e.target.value))}
              className="bg-white border border-ivory-dark text-forest text-xs px-3 py-1.5 rounded-sm focus:outline-none focus:border-gold"
            >
              <option value={0}>All Capacities</option>
              <option value={2}>Up to 2 Guests</option>
              <option value={3}>Up to 3 Guests</option>
              <option value={6}>Families & Groups (Up to 6)</option>
            </select>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white h-96 rounded-sm border border-ivory-dark" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
