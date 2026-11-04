import React, { useEffect, useState } from 'react';
import { Sliders, Plus, Edit2, Save, X, Info, Check } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { hotelDataService } from '../../services/hotelDataService';
import { RoomType } from '../../types';
import { formatCurrency, formatKes } from '../../utils/formatters';
import { DemonstrationBadge } from '../../components/common/DemonstrationBadge';

export const AdminRoomTypes: React.FC = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [editingRoom, setEditingRoom] = useState<RoomType | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = () => {
    hotelDataService.getRoomTypes().then(setRoomTypes);
  };

  const handleEdit = (room: RoomType) => {
    setEditingRoom({ ...room });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;
    setSaving(true);
    await hotelDataService.updateRoomType(editingRoom);
    setSaving(false);
    setEditingRoom(null);
    loadRooms();
  };

  return (
    <AdminLayout
      title="Room Types & Categories"
      subtitle="Configure luxury room categories, rates per night, total inventory limits, and demonstration verification status"
    >
      <div className="space-y-6">
        <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
          <div className="p-5 border-b border-ivory-cream flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-forest">Configured Categories</h3>
            <span className="text-xs text-stone-light">{roomTypes.length} Categories Defined</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-stone-light uppercase tracking-wider text-[10px] border-b border-ivory-cream">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Category Name</th>
                  <th className="py-3.5 px-4 font-semibold">Base Rate / Night</th>
                  <th className="py-3.5 px-4 font-semibold">KES Equivalent</th>
                  <th className="py-3.5 px-4 font-semibold">Size</th>
                  <th className="py-3.5 px-4 font-semibold">Capacity</th>
                  <th className="py-3.5 px-4 font-semibold">Inventory</th>
                  <th className="py-3.5 px-4 font-semibold">Status / Verification</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-cream text-stone">
                {roomTypes.map((rt) => (
                  <tr key={rt.id} className="hover:bg-ivory-light/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-forest text-sm">{rt.name}</div>
                      <div className="text-[10px] text-stone-light">{rt.bed_type}</div>
                    </td>
                    <td className="py-3.5 px-4 font-serif text-base font-bold text-forest">
                      {formatCurrency(rt.base_rate_per_night, rt.currency)}
                    </td>
                    <td className="py-3.5 px-4 text-gold font-medium">
                      ≈ {formatKes(rt.base_rate_per_night * 128.50)}
                    </td>
                    <td className="py-3.5 px-4">{rt.room_size_sqm} m²</td>
                    <td className="py-3.5 px-4">
                      {rt.max_adults} Adults{rt.max_children > 0 ? `, ${rt.max_children} Child` : ''}
                    </td>
                    <td className="py-3.5 px-4 font-semibold">{rt.total_inventory} Units</td>
                    <td className="py-3.5 px-4">
                      {rt.is_demonstration ? (
                        <DemonstrationBadge />
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-wider">
                          Verified Facility
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleEdit(rt)}
                        className="px-3 py-1.5 rounded-sm bg-ivory-light hover:bg-ivory text-forest text-xs font-medium border border-ivory-dark transition-colors inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-gold" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-sm border border-ivory-dark shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-forest text-white p-5 flex items-center justify-between border-b border-forest-border">
              <h3 className="font-serif text-xl font-medium">Edit Suite Category: {editingRoom.name}</h3>
              <button onClick={() => setEditingRoom(null)} className="text-stone-light hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5 text-xs text-stone">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRoom.name}
                    onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Base Rate per Night (USD)
                  </label>
                  <input
                    type="number"
                    required
                    min={50}
                    value={editingRoom.base_rate_per_night}
                    onChange={(e) => setEditingRoom({ ...editingRoom, base_rate_per_night: Number(e.target.value) })}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Room Size (m²)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingRoom.room_size_sqm}
                    onChange={(e) => setEditingRoom({ ...editingRoom, room_size_sqm: Number(e.target.value) })}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Total Inventory Units
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingRoom.total_inventory}
                    onChange={(e) => setEditingRoom({ ...editingRoom, total_inventory: Number(e.target.value) })}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Main Photograph URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editingRoom.main_image_url}
                    onChange={(e) => setEditingRoom({ ...editingRoom, main_image_url: e.target.value })}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingRoom.short_description}
                    onChange={(e) => setEditingRoom({ ...editingRoom, short_description: e.target.value })}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                    Detailed Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingRoom.description}
                    onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-xs p-2.5 rounded-sm focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-ivory-cream flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingRoom.is_demonstration}
                      onChange={(e) => setEditingRoom({ ...editingRoom, is_demonstration: e.target.checked })}
                      className="rounded border-ivory-dark text-gold focus:ring-gold"
                    />
                    <span className="text-xs text-forest font-medium">
                      Tag as Demonstration Concept (Pending on-site verification)
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-ivory-cream flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingRoom(null)}
                  className="px-4 py-2 border border-ivory-dark text-stone text-xs font-semibold uppercase tracking-wider rounded-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-gold" />
                  <span>{saving ? 'Updating...' : 'Save Category Details'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
