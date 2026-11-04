import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  AlertCircle, 
  X, 
  Save 
} from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { Reservation, ReservationStatus, PaymentStatus } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { exportReservationsToCsv } from '../../utils/exportCsv';

export const AdminReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState<ReservationStatus>('confirmed');
  const [editPayment, setEditPayment] = useState<PaymentStatus>('pending');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = () => {
    hotelDataService.getReservations().then(setReservations);
  };

  const handleOpenModal = (res: Reservation) => {
    setSelectedRes(res);
    setEditNotes(res.internal_admin_notes || '');
    setEditStatus(res.status);
    setEditPayment(res.payment_status);
  };

  const handleSaveModal = async () => {
    if (!selectedRes) return;
    setSaving(true);
    await hotelDataService.updateReservationStatus(
      selectedRes.id,
      editStatus,
      editNotes,
      editPayment
    );
    setSaving(false);
    setSelectedRes(null);
    loadReservations();
  };

  const filtered = reservations.filter((r) => {
    const matchesSearch =
      r.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.guest?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.guest?.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout
      title="Reservation Management"
      subtitle="Inspect guest itineraries, update confirmation statuses, record notes, and export records"
    >
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-sm border border-ivory-dark shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reference or guest..."
                className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:border-gold"
              />
              <Search className="w-3.5 h-3.5 text-stone-light absolute left-3 top-2.5" />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-ivory-light border border-ivory-dark text-forest text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold"
            >
              <option value="all">All Reservation Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending_confirmation">Pending Attention</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={() => exportReservationsToCsv(filtered)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-ivory-light border border-ivory-dark text-stone hover:text-forest text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Table of Reservations */}
        <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-stone-light uppercase tracking-wider text-[10px] border-b border-ivory-cream">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Reference</th>
                  <th className="py-3.5 px-4 font-semibold">Guest Particulars</th>
                  <th className="py-3.5 px-4 font-semibold">Sanctuary</th>
                  <th className="py-3.5 px-4 font-semibold">Check-In / Out</th>
                  <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                  <th className="py-3.5 px-4 font-semibold">Res. Status</th>
                  <th className="py-3.5 px-4 font-semibold">Payment</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-cream text-stone">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-ivory-light/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-forest">
                      {r.booking_reference}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-forest">{r.guest?.full_name || 'Resident'}</div>
                      <div className="text-[11px] text-stone-light">{r.guest?.email}</div>
                    </td>
                    <td className="py-3.5 px-4">{r.room_type?.name || 'Suite'}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-[11px]">
                      <div>In: {r.check_in_date}</div>
                      <div className="text-stone-light">Out: {r.check_out_date} ({r.total_nights}n)</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-forest">
                      {formatCurrency(r.total_amount, r.currency)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-forest-surface text-gold border border-gold/30">
                        {r.status.replace(/_/g, ' ')}
                      </span>
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
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(r)}
                        className="px-3 py-1.5 rounded-sm bg-ivory-light hover:bg-ivory text-forest text-xs font-medium border border-ivory-dark transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-gold" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reservation Management Modal */}
      {selectedRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-sm border border-ivory-dark shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-forest text-white p-5 flex items-center justify-between border-b border-forest-border">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                  Manage Resident Booking
                </span>
                <h3 className="font-serif text-xl font-medium">{selectedRes.booking_reference}</h3>
              </div>
              <button
                onClick={() => setSelectedRes(null)}
                className="text-stone-light hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-stone">
              {/* Guest details summary */}
              <div className="p-4 bg-ivory-light rounded border border-ivory-dark space-y-1">
                <div className="font-semibold text-forest text-sm">{selectedRes.guest?.full_name}</div>
                <div>Email: {selectedRes.guest?.email} &bull; Phone: {selectedRes.guest?.telephone}</div>
                <div>Country: {selectedRes.guest?.country}</div>
                <div>
                  Suite: <span className="font-medium text-forest">{selectedRes.room_type?.name}</span> ({selectedRes.rooms_count} Suite)
                </div>
                <div>Dates: {selectedRes.check_in_date} to {selectedRes.check_out_date} ({selectedRes.total_nights} Nights)</div>
                <div>Total Payable: <span className="font-bold text-forest">{formatCurrency(selectedRes.total_amount, selectedRes.currency)}</span></div>
              </div>

              {/* Status Update */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Reservation Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ReservationStatus)}
                    className="w-full bg-white border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                  >
                    <option value="pending_confirmation">Pending Confirmation</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="checked_in">Checked In</option>
                    <option value="checked_out">Checked Out</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No Show</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Payment Status
                  </label>
                  <select
                    value={editPayment}
                    onChange={(e) => setEditPayment(e.target.value as PaymentStatus)}
                    className="w-full bg-white border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                  >
                    <option value="pending">Pending</option>
                    <option value="partially_paid">Partially Paid</option>
                    <option value="successful">Successful / Confirmed</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Internal Administrative & Concierge Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record dietary reminders, helicopter transfer time, VIP preferences..."
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-3 rounded-sm focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="pt-4 border-t border-ivory-cream flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedRes(null)}
                  className="px-4 py-2 border border-ivory-dark text-stone text-xs font-semibold uppercase tracking-wider rounded-sm"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveModal}
                  disabled={saving}
                  className="px-6 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-gold" />
                  <span>{saving ? 'Saving...' : 'Save Updates'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
