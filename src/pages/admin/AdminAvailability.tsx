import React, { useState, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { RoomType, Reservation } from '../../types';

export const AdminAvailability: React.FC = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(2026, 10, 1)); // November 2026
  const [blockedDays, setBlockedDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    Promise.all([
      hotelDataService.getRoomTypes(),
      hotelDataService.getReservations(),
    ]).then(([rooms, res]) => {
      setRoomTypes(rooms);
      setReservations(res);
    });
  }, []);

  const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
  const monthName = selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const toggleBlockDay = (dateStr: string) => {
    setBlockedDays((prev) => ({
      ...prev,
      [dateStr]: !prev[dateStr],
    }));
  };

  return (
    <AdminLayout
      title="Availability & Blackout Calendar"
      subtitle="Inspect inventory allocation across the property, monitor overlapping stays, and toggle maintenance closures"
    >
      <div className="space-y-6">
        {/* Month Selector Bar */}
        <div className="bg-white p-4 rounded-sm border border-ivory-dark shadow-subtle flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-gold" />
            <span className="font-serif text-xl font-medium text-forest">{monthName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))}
              className="p-1.5 rounded border border-ivory-dark text-stone hover:text-forest"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))}
              className="p-1.5 rounded border border-ivory-dark text-stone hover:text-forest"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-[#FAF9F6] text-stone-light uppercase text-[10px] border-b border-ivory-cream">
              <tr>
                <th className="py-3 px-4 font-semibold w-48">Suite Category</th>
                <th className="py-3 px-2 font-semibold text-center w-16">Units</th>
                {[...Array(daysInMonth)].map((_, i) => (
                  <th key={i} className="py-3 px-1 text-center font-medium">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-cream text-stone">
              {roomTypes.map((room) => (
                <tr key={room.id} className="hover:bg-ivory-light/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-forest whitespace-nowrap">
                    {room.name}
                  </td>
                  <td className="py-3 px-2 text-center text-stone font-semibold">
                    {room.total_inventory}
                  </td>
                  {[...Array(daysInMonth)].map((_, dayIdx) => {
                    const dayNum = dayIdx + 1;
                    const dateStr = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                    const isBlocked = blockedDays[dateStr];

                    // Count confirmed bookings for this day
                    const booked = reservations.filter(
                      (r) =>
                        r.room_type_id === room.id &&
                        r.status === 'confirmed' &&
                        new Date(dateStr) >= new Date(r.check_in_date) &&
                        new Date(dateStr) < new Date(r.check_out_date)
                    ).length;

                    const remaining = room.total_inventory - booked;

                    return (
                      <td
                        key={dayIdx}
                        onClick={() => toggleBlockDay(dateStr)}
                        className={`py-2 px-1 text-center cursor-pointer transition-colors text-[10px] ${
                          isBlocked
                            ? 'bg-red-100 text-red-800 font-bold'
                            : booked > 0
                            ? 'bg-amber-100 text-amber-900 font-semibold'
                            : 'bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100'
                        }`}
                        title={`${dateStr}: ${booked} booked, ${remaining} remaining. Click to toggle blackout.`}
                      >
                        {isBlocked ? 'X' : remaining}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-6 text-xs text-stone-light">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-emerald-100 border border-emerald-300 rounded-sm" />
            <span>Available Capacity</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-amber-100 border border-amber-300 rounded-sm" />
            <span>Partial / Confirmed Stay</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-red-100 border border-red-300 rounded-sm" />
            <span>Blackout / Closed</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
