import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { Reservation, Enquiry, RoomType } from '../../types';
import { formatCurrency, formatKes, formatDate } from '../../utils/formatters';

export const AdminOverview: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      hotelDataService.getReservations(),
      hotelDataService.getEnquiries(),
      hotelDataService.getRoomTypes(),
    ]).then(([res, enq, rm]) => {
      setReservations(res);
      setEnquiries(enq);
      setRooms(rm);
      setLoading(false);
    });
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  // Compute operational statistics
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter((r) => r.status === 'confirmed').length;
  const pendingReservations = reservations.filter((r) => r.status === 'pending_confirmation' || r.payment_status === 'pending').length;

  const arrivalsToday = reservations.filter((r) => r.check_in_date === todayStr).length;
  const departuresToday = reservations.filter((r) => r.check_out_date === todayStr).length;

  // Verified revenue (only payments with successful status)
  const verifiedRevenue = reservations
    .filter((r) => r.payment_status === 'successful')
    .reduce((sum, r) => sum + Number(r.total_amount), 0);

  // Overall Occupancy estimate (booked suites / total capacity)
  const totalAvailableSuites = rooms.reduce((sum, r) => sum + r.total_inventory, 0) || 14;
  const occupiedCount = reservations.filter(
    (r) => r.status === 'confirmed' || r.status === 'checked_in'
  ).length;
  const occupancyPercentage = Math.min(100, Math.round((occupiedCount / totalAvailableSuites) * 100));

  return (
    <AdminLayout
      title="Management Overview"
      subtitle="The Mau Estate executive console &bull; Real-time operational intelligence"
    >
      <div className="space-y-8">
        {/* KPI Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Revenue */}
          <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-stone-light">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Verified Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-forest">
              {formatCurrency(verifiedRevenue, 'USD')}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium block">
              ≈ {formatKes(verifiedRevenue * 128.50)} confirmed
            </span>
          </div>

          {/* Occupancy */}
          <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-stone-light">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Current Occupancy</span>
              <TrendingUp className="w-4 h-4 text-gold" />
            </div>
            <div className="font-serif text-3xl font-bold text-forest">{occupancyPercentage}%</div>
            <span className="text-[11px] text-stone-light block">
              {occupiedCount} of {totalAvailableSuites} Suites allocated
            </span>
          </div>

          {/* Today's Movements */}
          <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-stone-light">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Today's Movements</span>
              <Clock className="w-4 h-4 text-forest" />
            </div>
            <div className="font-serif text-3xl font-bold text-forest">
              {arrivalsToday} <span className="text-sm font-normal text-stone-light">in</span> / {departuresToday} <span className="text-sm font-normal text-stone-light">out</span>
            </div>
            <span className="text-[11px] text-stone-light block">Resident arrivals & departures</span>
          </div>

          {/* Pending Confirmations */}
          <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-stone-light">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Pending Attention</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-forest">{pendingReservations}</div>
            <span className="text-[11px] text-amber-700 font-medium block">
              Awaiting payment or room assignment
            </span>
          </div>
        </div>

        {/* Two-column operational section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Recent Reservations */}
          <div className="lg:col-span-8 bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
            <div className="p-5 border-b border-ivory-cream flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-lg font-medium text-forest">Recent Resident Reservations</h3>
              </div>
              <Link
                to="/admin/reservations"
                className="text-xs text-gold hover:text-gold-dark font-medium uppercase tracking-wider flex items-center gap-1"
              >
                <span>View All ({totalReservations})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F6] text-stone-light uppercase tracking-wider text-[10px] border-b border-ivory-cream">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Reference</th>
                    <th className="py-3 px-4 font-semibold">Resident</th>
                    <th className="py-3 px-4 font-semibold">Suite</th>
                    <th className="py-3 px-4 font-semibold">Dates</th>
                    <th className="py-3 px-4 font-semibold">Total</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-cream text-stone">
                  {reservations.slice(0, 5).map((r) => (
                    <tr key={r.id} className="hover:bg-ivory-light/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-forest">
                        {r.booking_reference}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-forest">
                        {r.guest?.full_name || 'Guest'}
                      </td>
                      <td className="py-3.5 px-4">{r.room_type?.name || 'Suite'}</td>
                      <td className="py-3.5 px-4 text-[11px] whitespace-nowrap">
                        {r.check_in_date} &rarr; {r.check_out_date}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-forest">
                        {formatCurrency(r.total_amount, r.currency)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                            r.payment_status === 'successful'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {r.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Recent Inquiries */}
          <div className="lg:col-span-4 bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-ivory-cream flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gold" />
                  <h3 className="font-serif text-lg font-medium text-forest">Recent Inquiries</h3>
                </div>
                <Link
                  to="/admin/enquiries"
                  className="text-xs text-gold hover:underline font-medium uppercase tracking-wider text-[11px]"
                >
                  Manage
                </Link>
              </div>

              <div className="divide-y divide-ivory-cream">
                {enquiries.slice(0, 4).map((enq) => (
                  <div key={enq.id} className="p-4 space-y-1 text-xs hover:bg-ivory-light/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-forest">{enq.full_name}</span>
                      <span className="text-[10px] bg-ivory-cream px-2 py-0.5 rounded text-stone uppercase tracking-wider">
                        {enq.enquiry_type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-stone-light text-[11px] line-clamp-2 font-light">
                      {enq.message}
                    </p>
                    <span className="text-[10px] text-stone-light block">{formatDate(enq.created_at)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#FAF9F6] border-t border-ivory-cream text-center">
              <Link
                to="/admin/enquiries"
                className="text-xs text-forest hover:text-gold font-semibold uppercase tracking-wider"
              >
                Review All Inquiries &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
