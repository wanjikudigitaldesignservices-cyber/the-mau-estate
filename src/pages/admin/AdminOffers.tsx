import React, { useEffect, useState } from 'react';
import { Tag, Plus, Check, Edit2 } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { SpecialOffer } from '../../types';

export const AdminOffers: React.FC = () => {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);

  useEffect(() => {
    hotelDataService.getSpecialOffers().then(setOffers);
  }, []);

  return (
    <AdminLayout
      title="Special Offers & Packages"
      subtitle="Manage promotional retreat packages, inclusions, seasonal discounts, and validity schedules"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-sm border border-ivory-dark shadow-subtle p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">
                    {offer.discount_percentage}% Savings
                  </span>
                  <h3 className="font-serif text-2xl text-forest font-medium">{offer.title}</h3>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-wider">
                  Active
                </span>
              </div>

              <p className="text-stone text-xs leading-relaxed font-light">{offer.description}</p>

              <div className="p-3 bg-ivory-light rounded text-xs text-stone space-y-1">
                <div>Min Stay: <span className="font-semibold text-forest">{offer.min_nights} Nights</span></div>
                <div>Validity: {offer.valid_from} &rarr; {offer.valid_until}</div>
              </div>

              <div className="space-y-1 pt-2 border-t border-ivory-cream text-xs text-stone">
                <span className="font-semibold text-forest text-[11px] uppercase tracking-wider block">Inclusions:</span>
                <ul className="space-y-1">
                  {offer.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
