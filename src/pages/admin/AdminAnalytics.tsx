import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, CalendarCheck, Users, BarChart3, PieChart } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { Reservation, RoomType } from '../../types';
import { formatCurrency, formatKes } from '../../utils/formatters';

export const AdminAnalytics: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  useEffect(() => {
    Promise.all([
      hotelDataService.getReservations(),
      hotelDataService.getRoomTypes(),
    ]).then(([res, rooms]) => {
      setReservations(res);
      setRoomTypes(rooms);
    });
  }, []);

  const totalRevenue = reservations
    .filter((r) => r.payment_status === 'successful')
    .reduce((sum, r) => sum + Number(r.total_amount), 0);

  const totalBookings = reservations.length;
  const avgStayNights = totalBookings > 0
    ? (reservations.reduce((s, r) => s + r.total_nights, 0) / totalBookings).toFixed(1)
    : '3.0';

  // Popular rooms breakdown
  const roomCounts: Record<string, { name: string; count: number; revenue: number }> = {};
  for (const r of reservations) {
    const rName = r.room_type?.name || 'Deluxe Room';
    if (!roomCounts[rName]) {
      roomCounts[rName] = { name: rName, count: 0, revenue: 0 };
    }
    roomCounts[rName].count += 1;
    if (r.payment_status === 'successful') {
      roomCounts[rName].revenue += Number(r.total_amount);
    }
  }

  const bookingSources = [
    { source: 'Direct Website Engine', percentage: 72, count: 18 },
    { source: 'Private Helipad & Air Charters', percentage: 16, count: 4 },
    { source: 'Corporate Board Consortia', percentage: 8, count: 2 },
    { source: 'Luxury Safari Partner Lodges', percentage: 4, count: 1 },
  ];

  return (
    <AdminLayout
      title="Analytics & Revenue Intelligence"
      subtitle="Financial performance, occupancy velocity, popular sanctuary allocation, and channel origins"
    >
      <div className="space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-1">
            <span className="text-[10px] uppercase text-stone-light font-semibold block">Total Verified Revenue</span>
            <div className="font-serif text-3xl font-bold text-forest">
              {formatCurrency(totalRevenue, 'USD')}
            </div>
            <span className="text-xs text-gold font-medium">≈ {formatKes(totalRevenue * 128.50)}</span>
          </div>

          <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-1">
            <span className="text-[10px] uppercase text-stone-light font-semibold block">Average Length of Stay</span>
            <div className="font-serif text-3xl font-bold text-forest">{avgStayNights} Nights</div>
            <span className="text-xs text-stone-light">Highland sanctuary trend</span>
          </div>

          <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-1">
            <span className="text-[10px] uppercase text-stone-light font-semibold block">Direct Booking Ratio</span>
            <div className="font-serif text-3xl font-bold text-forest">72%</div>
            <span className="text-xs text-emerald-700 font-medium">Direct engine yield</span>
          </div>

          <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-1">
            <span className="text-[10px] uppercase text-stone-light font-semibold block">RevPAR Estimate</span>
            <div className="font-serif text-3xl font-bold text-forest">$485.00</div>
            <span className="text-xs text-stone-light">Revenue per available room</span>
          </div>
        </div>

        {/* Charts & Categorization Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Room Category Popularity */}
          <div className="lg:col-span-7 bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-ivory-cream pb-3">
              <h3 className="font-serif text-xl text-forest font-medium">Category Popularity & Revenue</h3>
              <BarChart3 className="w-4 h-4 text-gold" />
            </div>

            <div className="space-y-4">
              {Object.values(roomCounts).map((item, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-forest">{item.name}</span>
                    <span className="text-forest font-semibold">{formatCurrency(item.revenue, 'USD')}</span>
                  </div>
                  <div className="w-full bg-ivory-light h-3 rounded-full overflow-hidden border border-ivory-dark/40">
                    <div
                      className="bg-gold h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, item.count * 30)}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-stone-light">{item.count} Bookings Confirmed</div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Sources */}
          <div className="lg:col-span-5 bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-ivory-cream pb-3">
              <h3 className="font-serif text-xl text-forest font-medium">Booking Channel Share</h3>
              <PieChart className="w-4 h-4 text-gold" />
            </div>

            <div className="space-y-4">
              {bookingSources.map((bs, i) => (
                <div key={i} className="p-3.5 rounded bg-ivory-light/60 border border-ivory-dark space-y-1 text-xs">
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-forest">{bs.source}</span>
                    <span className="font-bold text-forest">{bs.percentage}%</span>
                  </div>
                  <div className="w-full bg-ivory-dark/40 h-2 rounded-full overflow-hidden">
                    <div className="bg-forest h-full rounded-full" style={{ width: `${bs.percentage}%` }} />
                  </div>
                  <span className="text-[10px] text-stone-light">{bs.count} Resident reservations</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
