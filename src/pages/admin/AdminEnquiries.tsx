import React, { useEffect, useState } from 'react';
import { MessageSquare, Check, Mail, Phone, Calendar, Clock, Edit2 } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { Enquiry } from '../../types';
import { formatDate } from '../../utils/formatters';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnq, setSelectedEnq] = useState<Enquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [status, setStatus] = useState<Enquiry['status']>('new');

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = () => {
    hotelDataService.getEnquiries().then(setEnquiries);
  };

  const handleSelect = (enq: Enquiry) => {
    setSelectedEnq(enq);
    setAdminNotes(enq.admin_notes || '');
    setStatus(enq.status);
  };

  const handleSaveNotes = async () => {
    if (!selectedEnq) return;
    await hotelDataService.updateEnquiryStatus(selectedEnq.id, status, adminNotes);
    setSelectedEnq(null);
    loadEnquiries();
  };

  return (
    <AdminLayout
      title="Guest Inquiries & Event Leads"
      subtitle="Review incoming wedding briefs, corporate retreat requests, and general concierge inquiries"
    >
      <div className="space-y-6">
        <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
          <div className="p-5 border-b border-ivory-cream flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-forest">Inbox Leads</h3>
            <span className="text-xs text-stone-light">{enquiries.length} Inquiries Received</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-stone-light uppercase tracking-wider text-[10px] border-b border-ivory-cream">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Sender Name</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Message Teaser</th>
                  <th className="py-3.5 px-4 font-semibold">Event Date / Guests</th>
                  <th className="py-3.5 px-4 font-semibold">Date Received</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-cream text-stone">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-ivory-light/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-forest">{enq.full_name}</div>
                      <div className="text-[11px] text-stone-light">{enq.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-ivory-cream text-stone">
                        {enq.enquiry_type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate">{enq.message}</td>
                    <td className="py-3.5 px-4 text-[11px]">
                      {enq.event_date ? `${enq.event_date} (${enq.estimated_guests || 0} pax)` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-stone-light text-[11px]">{formatDate(enq.created_at)}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider ${
                          enq.status === 'new'
                            ? 'bg-amber-50 text-amber-800'
                            : enq.status === 'responded'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-blue-50 text-blue-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleSelect(enq)}
                        className="px-3 py-1.5 rounded-sm bg-ivory-light hover:bg-ivory text-forest text-xs font-medium border border-ivory-dark transition-colors inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-gold" />
                        <span>Respond</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedEnq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-sm border border-ivory-dark shadow-2xl max-w-lg w-full p-6 space-y-5 text-xs text-stone">
            <div className="flex items-start justify-between border-b border-ivory-cream pb-3">
              <div>
                <span className="text-[10px] uppercase text-gold font-semibold block">
                  {selectedEnq.enquiry_type.replace(/_/g, ' ')}
                </span>
                <h3 className="font-serif text-2xl text-forest font-medium">{selectedEnq.full_name}</h3>
              </div>
              <button onClick={() => setSelectedEnq(null)} className="text-stone hover:text-forest">
                &times;
              </button>
            </div>

            <div className="space-y-1">
              <div>Email: <a href={`mailto:${selectedEnq.email}`} className="text-gold underline">{selectedEnq.email}</a></div>
              <div>Telephone: {selectedEnq.telephone || 'Not provided'}</div>
              {selectedEnq.event_date && (
                <div>Preferred Event Date: {selectedEnq.event_date} ({selectedEnq.estimated_guests} guests)</div>
              )}
            </div>

            <div className="p-4 bg-ivory-light rounded border border-ivory-dark text-stone-dark leading-relaxed">
              "{selectedEnq.message}"
            </div>

            <div className="space-y-3 pt-2 border-t border-ivory-cream">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Lead Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Enquiry['status'])}
                  className="w-full bg-white border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="responded">Responded</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Concierge Notes & Follow-Up Log
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call summary or proposal quote reference..."
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedEnq(null)}
                className="px-4 py-2 border border-ivory-dark text-stone text-xs font-semibold uppercase tracking-wider rounded-sm"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-6 py-2 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
