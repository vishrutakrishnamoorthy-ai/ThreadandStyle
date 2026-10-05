import React, { useState } from 'react';
import {
  Scissors,
  Plus,
  Phone,
  Award,
  Clock,
  X,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Tailor, TailoringOrder } from '../../types';

interface TailorManagerProps {
  tailors: Tailor[];
  orders: TailoringOrder[];
  onAddTailor: (tailor: Omit<Tailor, 'id' | 'activeWorkload'>) => void;
  onUpdateTailor: (id: string, updates: Partial<Tailor>) => void;
  onAssignOrderToTailor: (orderId: string, tailorId: string) => void;
}

export const TailorManager: React.FC<TailorManagerProps> = ({
  tailors,
  orders,
  onAddTailor,
  onUpdateTailor,
  onAssignOrderToTailor,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTailor, setEditingTailor] = useState<Tailor | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [specializations, setSpecializations] = useState<string[]>(['Blouse stitching']);
  const [experienceYears, setExperienceYears] = useState(12);
  const [status, setStatus] = useState<Tailor['status']>('available');
  const [rating, setRating] = useState(4.9);

  // Quick Assignment Modal
  const [assignTargetTailor, setAssignTargetTailor] = useState<Tailor | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');

  const unassignedOrders = orders.filter((o) => !o.tailorId && o.status !== 'delivered');

  const openAddModal = () => {
    setName('');
    setPhone('+91 ');
    setSpecializations(['Blouse stitching']);
    setExperienceYears(10);
    setStatus('available');
    setRating(4.8);
    setEditingTailor(null);
    setShowAddModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTailor) {
      onUpdateTailor(editingTailor.id, {
        name,
        phone,
        specialization: specializations,
        experienceYears,
        status,
        rating,
      });
    } else {
      onAddTailor({
        name,
        phone,
        specialization: specializations,
        experienceYears,
        status,
        rating,
      });
    }
    setShowAddModal(false);
  };

  const handleQuickAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignTargetTailor && selectedOrderId) {
      onAssignOrderToTailor(selectedOrderId, assignTargetTailor.id);
      setAssignTargetTailor(null);
    }
  };

  const toggleSpecialization = (spec: string) => {
    if (specializations.includes(spec)) {
      if (specializations.length > 1) {
        setSpecializations(specializations.filter((s) => s !== spec));
      }
    } else {
      setSpecializations([...specializations, spec]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
            Artisan Craft Guild
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
            Master Tailors & Craftsmen
          </h1>
          <p className="text-sm text-[#554C41] mt-1">
            Manage master cutters, bridal zari embroiderers, workload balances, and order dispatches.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Master Tailor</span>
        </button>
      </div>

      {/* Tailor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tailors.map((tailor) => {
          const assignedOrdersForTailor = orders.filter(
            (o) => o.tailorId === tailor.id && o.status !== 'delivered'
          );

          return (
            <div
              key={tailor.id}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7] flex flex-col justify-between hover:shadow-md transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1A1716]">
                      {tailor.name}
                    </h3>
                    <p className="text-xs text-[#7C7164] flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      <span>{tailor.phone}</span>
                    </p>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                      tailor.status === 'available'
                        ? 'bg-[#EFF8F2] text-[#2E6B4A] border border-[#CDE5D5]'
                        : tailor.status === 'busy'
                        ? 'bg-[#FFF6E9] text-[#A0601B] border border-[#F2D7B3]'
                        : 'bg-[#FBEBEB] text-[#8B2626] border border-[#E9C3C3]'
                    }`}
                  >
                    {tailor.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#554C41]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7C7164]">Experience:</span>
                    <span className="font-semibold text-[#1A1716]">{tailor.experienceYears} Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7C7164]">Artisan Rating:</span>
                    <span className="font-semibold text-[#1A1716] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#C5A059] fill-current" />
                      <span>{tailor.rating}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7C7164]">Active Queue:</span>
                    <span className="font-bold text-[#6B1D2F] tabular-nums">
                      {assignedOrdersForTailor.length} Commissioned Outfits
                    </span>
                  </div>
                </div>

                {/* Specializations list */}
                <div className="mt-4 pt-3 border-t border-[#EAE3D7]">
                  <span className="text-[10px] uppercase font-bold text-[#7C7164] block mb-1.5">
                    Specializations
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {tailor.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#F1ECE1] text-[#3D372F] border border-[#E1D8CA]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-[#EAE3D7] flex items-center justify-between">
                <button
                  onClick={() => {
                    setEditingTailor(tailor);
                    setName(tailor.name);
                    setPhone(tailor.phone);
                    setSpecializations([...tailor.specialization]);
                    setExperienceYears(tailor.experienceYears);
                    setStatus(tailor.status);
                    setRating(tailor.rating);
                    setShowAddModal(true);
                  }}
                  className="text-xs text-[#6B1D2F] font-semibold hover:underline"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => {
                    setAssignTargetTailor(tailor);
                    setSelectedOrderId(unassignedOrders[0]?.id || orders[0]?.id || '');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5CABE] text-xs font-semibold text-[#1A1716] hover:bg-[#F3EFEA]"
                >
                  Dispatch Order
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Dispatch Order Modal */}
      {assignTargetTailor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-md w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
              <h3 className="font-serif font-bold text-lg text-[#1A1716]">
                Dispatch Order to {assignTargetTailor.name}
              </h3>
              <button onClick={() => setAssignTargetTailor(null)} className="p-1 text-[#7C7164]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickAssign} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Select Active Order to Assign</label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-medium"
                >
                  {orders
                    .filter((o) => o.status !== 'delivered')
                    .map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.orderNumber} – {o.designName} ({o.customerName})
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1D5]">
                <button
                  type="button"
                  onClick={() => setAssignTargetTailor(null)}
                  className="px-4 py-2 rounded-xl border border-[#D5CABE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6B1D2F] text-white font-semibold hover:bg-[#521322]"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Tailor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-lg w-full shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-[#6B1D2F]" />
                <h3 className="font-serif font-bold text-xl text-[#1A1716]">
                  {editingTailor ? 'Edit Master Craftsman' : 'Register Master Tailor'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Tailor Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Master Rameshwar Mistri"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1.5">Specializations</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Blouse stitching',
                    'Bridal wear',
                    'Embroidery',
                    'Zardozi',
                    'Maggam work',
                    'Gown tailoring',
                    'Salwar Suit',
                    'Alteration',
                    'Kids wear',
                    'Kurti',
                  ].map((spec) => (
                    <button
                      type="button"
                      key={spec}
                      onClick={() => toggleSpecialization(spec)}
                      className={`px-3 py-1 rounded-lg border text-xs cursor-pointer ${
                        specializations.includes(spec)
                          ? 'bg-[#6B1D2F] text-white border-[#6B1D2F] font-semibold'
                          : 'bg-white border-[#DDD3C4] text-[#4A4237]'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Availability Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-semibold"
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy / High Load</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Mastery Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value) || 5)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs tabular-nums font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#D5CABE] text-[#4A4237]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6B1D2F] text-white font-semibold hover:bg-[#521322]"
                >
                  {editingTailor ? 'Update Craftsman' : 'Register Craftsman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
