import React, { useEffect, useState } from 'react';
import { Users, Mail, Phone, Calendar, Search, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { Reservation } from '../../types';

interface GuestProfileSummary {
  name: string;
  email: string;
  phone: string;
  country: string;
  totalBookings: number;
  lastStay: string;
  totalSpent: number;
  notes?: string;
}

export const AdminGuests: React.FC = () => {
  const [guests, setGuests] = useState<GuestProfileSummary[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    hotelDataService.getReservations().then((resList) => {
      // Group by guest email
      const map = new Map<string, GuestProfileSummary>();

      for (const r of resList) {
        if (!r.guest?.email) continue;
        const email = r.guest.email.toLowerCase();
        if (map.has(email)) {
          const existing = map.get(email)!;
          existing.totalBookings += 1;
          existing.totalSpent += Number(r.total_amount);
        } else {
          map.set(email, {
            name: r.guest.full_name,
            email: r.guest.email,
            phone: r.guest.telephone,
            country: r.guest.country,
            totalBookings: 1,
            lastStay: r.check_in_date,
            totalSpent: Number(r.total_amount),
            notes: r.internal_admin_notes || 'VIP resident.',
          });
        }
      }

      setGuests(Array.from(map.values()));
    });
  }, []);

  const filtered = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      title="Guest & Resident Directory"
      subtitle="Resident profiles, lifetime stay history, contact particulars, and personalized concierge notes"
    >
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-sm border border-ivory-dark shadow-subtle flex items-center justify-between">
          <div className="relative w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resident name or country..."
              className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:border-gold"
            />
            <Search className="w-3.5 h-3.5 text-stone-light absolute left-3 top-2.5" />
          </div>

          <span className="text-xs text-stone-light font-medium">
            {filtered.length} Registered Residents
          </span>
        </div>

        <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-stone-light uppercase tracking-wider text-[10px] border-b border-ivory-cream">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Resident Name</th>
                  <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                  <th className="py-3.5 px-4 font-semibold">Country</th>
                  <th className="py-3.5 px-4 font-semibold">Stays</th>
                  <th className="py-3.5 px-4 font-semibold">Lifetime Spend</th>
                  <th className="py-3.5 px-4 font-semibold">Last Stay</th>
                  <th className="py-3.5 px-4 font-semibold">Concierge Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-cream text-stone">
                {filtered.map((g, i) => (
                  <tr key={i} className="hover:bg-ivory-light/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-forest text-sm">
                      {g.name}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{g.email}</div>
                      <div className="text-[11px] text-stone-light">{g.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">{g.country}</td>
                    <td className="py-3.5 px-4 font-semibold text-forest">
                      {g.totalBookings} Stay{g.totalBookings > 1 ? 's' : ''}
                    </td>
                    <td className="py-3.5 px-4 font-serif text-sm font-bold text-forest">
                      ${g.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-stone-light text-[11px]">{g.lastStay}</td>
                    <td className="py-3.5 px-4 text-xs italic text-stone-dark">
                      {g.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
