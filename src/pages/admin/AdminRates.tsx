import React, { useState } from 'react';
import { DollarSign, Percent, Calendar, Check, Save } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { formatCurrency } from '../../utils/formatters';

export const AdminRates: React.FC = () => {
  const [seasonalMultiplier, setSeasonalMultiplier] = useState(1.25);
  const [weekendMultiplier, setWeekendMultiplier] = useState(1.15);
  const [saved, setSaved] = useState(false);

  const rateRules = [
    {
      name: 'Standard Baseline Rate',
      type: 'Direct Regular',
      multiplier: '1.0x',
      appliesTo: 'Sunday through Thursday (Off-peak dates)',
      active: true,
    },
    {
      name: 'Highland Peak Season Multiplier',
      type: 'Seasonal',
      multiplier: `${seasonalMultiplier}x (+${Math.round((seasonalMultiplier - 1) * 100)}%)`,
      appliesTo: 'July - October & Dec 15 - Jan 10 (Dry harvest season)',
      active: true,
    },
    {
      name: 'Weekend Getaway Pricing',
      type: 'Weekend',
      multiplier: `${weekendMultiplier}x (+${Math.round((weekendMultiplier - 1) * 100)}%)`,
      appliesTo: 'Friday and Saturday overnight stays',
      active: true,
    },
    {
      name: 'Resident Long Stay Privilege',
      type: 'Promotional',
      multiplier: '0.85x (-15%)',
      appliesTo: 'Reservations of 4 nights or greater',
      active: true,
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout
      title="Rate & Dynamic Pricing Management"
      subtitle="Configure standard base rates, seasonal surge rules, weekend yields, and promotional discounts"
    >
      <div className="space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Pricing rules and rate multipliers updated successfully.</span>
          </div>
        )}

        <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
          <div className="p-5 border-b border-ivory-cream flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-forest">Configured Rate Rules</h3>
            <span className="text-xs text-stone-light">Dynamic Yield Engine</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-stone-light uppercase tracking-wider text-[10px] border-b border-ivory-cream">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Rule Name</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Adjustment Multiplier</th>
                  <th className="py-3.5 px-4 font-semibold">Application Schedule</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-cream text-stone">
                {rateRules.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-ivory-light/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-forest">{rule.name}</td>
                    <td className="py-3.5 px-4">{rule.type}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-forest">{rule.multiplier}</td>
                    <td className="py-3.5 px-4 text-stone-light">{rule.appliesTo}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-wider">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Multiplier Adjustment Form */}
        <div className="bg-white p-6 sm:p-8 rounded-sm border border-ivory-dark shadow-subtle max-w-xl space-y-6">
          <h3 className="font-serif text-xl text-forest font-medium">Adjust Yield Multipliers</h3>
          <form onSubmit={handleSave} className="space-y-4 text-xs text-stone">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                Peak Season Multiplier
              </label>
              <input
                type="number"
                step="0.05"
                min="1.0"
                max="2.5"
                value={seasonalMultiplier}
                onChange={(e) => setSeasonalMultiplier(Number(e.target.value))}
                className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
              />
              <span className="text-[10px] text-stone-light">Example: 1.25 equals a 25% surge over base rates.</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                Weekend Stay Multiplier (Fri & Sat)
              </label>
              <input
                type="number"
                step="0.05"
                min="1.0"
                max="2.0"
                value={weekendMultiplier}
                onChange={(e) => setWeekendMultiplier(Number(e.target.value))}
                className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
              />
              <span className="text-[10px] text-stone-light">Example: 1.15 equals a 15% weekend premium.</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-sm"
            >
              Update Yield Rules
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
