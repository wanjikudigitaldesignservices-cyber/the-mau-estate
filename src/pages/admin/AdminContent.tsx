import React, { useEffect, useState } from 'react';
import { FileText, Save, Check, Sparkles } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { HotelSiteSettings } from '../../types';

export const AdminContent: React.FC = () => {
  const [settings, setSettings] = useState<HotelSiteSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelDataService.getSiteSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await hotelDataService.updateSiteSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading || !settings) {
    return (
      <AdminLayout title="Content Management">
        <div className="p-8 text-xs text-stone">Loading site content...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Hotel Copy & Content Management"
      subtitle="Modify announcement banner notices, brand taglines, contact information, and coordinates in real-time"
    >
      <div className="max-w-3xl space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Site content and announcement configurations updated.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-6 text-xs text-stone">
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-forest font-medium pb-2 border-b border-ivory-cream">
              Homepage Announcement Bar
            </h3>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                Announcement Message
              </label>
              <input
                type="text"
                value={settings.announcement_bar}
                onChange={(e) => setSettings({ ...settings, announcement_bar: e.target.value })}
                className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="announcement_active"
                checked={settings.announcement_active}
                onChange={(e) => setSettings({ ...settings, announcement_active: e.target.checked })}
                className="rounded border-ivory-dark text-gold focus:ring-gold"
              />
              <label htmlFor="announcement_active" className="text-xs text-forest cursor-pointer">
                Display announcement banner on public homepage
              </label>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-ivory-cream">
            <h3 className="font-serif text-xl text-forest font-medium pb-2 border-b border-ivory-cream">
              Brand & Contact Particulars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Property Name
                </label>
                <input
                  type="text"
                  value={settings.hotel_name}
                  onChange={(e) => setSettings({ ...settings, hotel_name: e.target.value })}
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Reservations Phone
                </label>
                <input
                  type="text"
                  value={settings.phone_primary}
                  onChange={(e) => setSettings({ ...settings, phone_primary: e.target.value })}
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Reservations Email
                </label>
                <input
                  type="email"
                  value={settings.email_reservations}
                  onChange={(e) => setSettings({ ...settings, email_reservations: e.target.value })}
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-ivory-cream flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm"
            >
              Save Content Changes
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
