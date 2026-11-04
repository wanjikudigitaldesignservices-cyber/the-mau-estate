import React, { useState } from 'react';
import { BedDouble, Plus, CheckCircle2, Wrench, Ban, AlertCircle } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { PhysicalRoom } from '../../types';

export const AdminRooms: React.FC = () => {
  const [rooms, setRooms] = useState<PhysicalRoom[]>([
    { id: 'rm_101', room_type_id: '11111111-1111-1111-1111-111111111101', room_number: 'Suite 101', floor_level: 'Ground Floor', view_type: 'Cedar Forest & Valley', status: 'available' },
    { id: 'rm_102', room_type_id: '11111111-1111-1111-1111-111111111101', room_number: 'Suite 102', floor_level: 'Ground Floor', view_type: 'Cedar Forest View', status: 'occupied' },
    { id: 'rm_103', room_type_id: '11111111-1111-1111-1111-111111111101', room_number: 'Suite 103', floor_level: 'First Floor', view_type: 'Forest & Valley View', status: 'available' },
    { id: 'rm_201', room_type_id: '11111111-1111-1111-1111-111111111102', room_number: 'Suite 201', floor_level: 'Second Floor', view_type: 'Panoramic Highland Vista', status: 'available' },
    { id: 'rm_202', room_type_id: '11111111-1111-1111-1111-111111111102', room_number: 'Suite 202', floor_level: 'Second Floor', view_type: 'Panoramic Highland Vista', status: 'maintenance', notes: 'Cedar fireplace flue scheduled inspection' },
    { id: 'rm_301', room_type_id: '11111111-1111-1111-1111-111111111103', room_number: 'Family Residence 301', floor_level: 'Garden Wing', view_type: 'Private Lawn & Forest', status: 'available' },
    { id: 'rm_401', room_type_id: '11111111-1111-1111-1111-111111111104', room_number: 'Presidential Sanctuary PH-01', floor_level: 'Crest Peak', view_type: '360° Great Rift Escarpment', status: 'available' },
  ]);

  const handleStatusChange = (roomId: string, newStatus: PhysicalRoom['status']) => {
    setRooms(rooms.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r)));
  };

  return (
    <AdminLayout
      title="Physical Room Units & Inventory"
      subtitle="Track individual suite operational status, housekeeping maintenance, and active resident assignments"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-sm border border-ivory-dark shadow-subtle flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-stone-light font-semibold block">Total Configured Units</span>
              <span className="font-serif text-3xl font-bold text-forest">{rooms.length}</span>
            </div>
            <BedDouble className="w-6 h-6 text-gold" />
          </div>

          <div className="bg-white p-5 rounded-sm border border-ivory-dark shadow-subtle flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-stone-light font-semibold block">Available for Stay</span>
              <span className="font-serif text-3xl font-bold text-emerald-700">
                {rooms.filter((r) => r.status === 'available').length}
              </span>
            </div>
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>

          <div className="bg-white p-5 rounded-sm border border-ivory-dark shadow-subtle flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-stone-light font-semibold block">Currently Occupied</span>
              <span className="font-serif text-3xl font-bold text-forest">
                {rooms.filter((r) => r.status === 'occupied').length}
              </span>
            </div>
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>

          <div className="bg-white p-5 rounded-sm border border-ivory-dark shadow-subtle flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-stone-light font-semibold block">Maintenance / Blocked</span>
              <span className="font-serif text-3xl font-bold text-stone">
                {rooms.filter((r) => r.status === 'maintenance' || r.status === 'blocked').length}
              </span>
            </div>
            <Wrench className="w-6 h-6 text-stone" />
          </div>
        </div>

        {/* Room Units Table */}
        <div className="bg-white rounded-sm border border-ivory-dark shadow-subtle overflow-hidden">
          <div className="p-5 border-b border-ivory-cream flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-forest">Configured Physical Suites</h3>
            <span className="text-xs text-stone-light">Real-time status controls</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-stone-light uppercase tracking-wider text-[10px] border-b border-ivory-cream">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Unit Number</th>
                  <th className="py-3.5 px-4 font-semibold">Floor / Wing</th>
                  <th className="py-3.5 px-4 font-semibold">Orientation View</th>
                  <th className="py-3.5 px-4 font-semibold">Current Status</th>
                  <th className="py-3.5 px-4 font-semibold">Operational Status Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-cream text-stone">
                {rooms.map((rm) => (
                  <tr key={rm.id} className="hover:bg-ivory-light/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-forest">
                      {rm.room_number}
                    </td>
                    <td className="py-3.5 px-4">{rm.floor_level}</td>
                    <td className="py-3.5 px-4">{rm.view_type}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          rm.status === 'available'
                            ? 'bg-emerald-50 text-emerald-700'
                            : rm.status === 'occupied'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {rm.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={rm.status}
                        onChange={(e) => handleStatusChange(rm.id, e.target.value as PhysicalRoom['status'])}
                        className="bg-ivory-light border border-ivory-dark text-forest text-xs px-2.5 py-1.5 rounded-sm focus:outline-none focus:border-gold"
                      >
                        <option value="available">Mark Available</option>
                        <option value="occupied">Mark Occupied</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="blocked">Blocked</option>
                      </select>
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
