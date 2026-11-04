import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Home, Search, ArrowRight } from 'lucide-react';
import { addDays, format } from 'date-fns';

interface ReservationSearchWidgetProps {
  className?: string;
  variant?: 'hero' | 'bar' | 'compact';
}

export const ReservationSearchWidget: React.FC<ReservationSearchWidgetProps> = ({
  className = '',
  variant = 'hero',
}) => {
  const navigate = useNavigate();
  const today = new Date();
  const defaultCheckIn = format(addDays(today, 7), 'yyyy-MM-dd');
  const defaultCheckOut = format(addDays(today, 10), 'yyyy-MM-dd');

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      roomsCount: roomsCount.toString(),
    }).toString();

    navigate(`/booking?${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-forest-deep/95 backdrop-blur-md border border-forest-border p-5 lg:p-6 rounded-md shadow-luxury text-ivory ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-end">
        {/* Check In */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Arrival</span>
          </label>
          <input
            type="date"
            required
            value={checkIn}
            min={format(today, 'yyyy-MM-dd')}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-forest-surface border border-forest-border text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Check Out */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Departure</span>
          </label>
          <input
            type="date"
            required
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-forest-surface border border-forest-border text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Adults & Children */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Guests</span>
          </label>
          <div className="flex gap-2">
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-1/2 bg-forest-surface border border-forest-border text-white text-xs px-2 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
            >
              {[1, 2, 3, 4, 6, 8].map((n) => (
                <option key={n} value={n} className="bg-forest-deep text-white">
                  {n} Adult{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-1/2 bg-forest-surface border border-forest-border text-white text-xs px-2 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-forest-deep text-white">
                  {n} Child{n > 1 ? 'ren' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rooms */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5" />
            <span>Suites</span>
          </label>
          <select
            value={roomsCount}
            onChange={(e) => setRoomsCount(Number(e.target.value))}
            className="w-full bg-forest-surface border border-forest-border text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n} className="bg-forest-deep text-white">
                {n} Suite{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-light text-forest-deep font-semibold text-xs tracking-[0.18em] uppercase py-3 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-gold-glow active:scale-98"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Check Rates</span>
          </button>
        </div>
      </div>
    </form>
  );
};
