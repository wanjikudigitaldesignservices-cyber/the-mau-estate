import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { RoomType } from '../../types';
import { RoomCard } from '../accommodation/RoomCard';
import { hotelDataService } from '../../services/hotelDataService';

export const RoomsShowcase: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelDataService.getRoomTypes().then((data) => {
      setRooms(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24 bg-ivory-cream/50 text-forest border-y border-ivory-dark/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sanctuaries & Lodges</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest font-normal tracking-wide">
              Elegantly appointed suites for peaceful highland slumber.
            </h2>
          </div>

          <div>
            <Link
              to="/accommodation"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-forest hover:text-gold transition-colors pb-1 border-b border-forest/30 hover:border-gold"
            >
              <span>Explore All Suites</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>

        {/* Room Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white h-96 rounded-sm border border-ivory-dark" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rooms.slice(0, 4).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
