import React, { useState } from 'react';
import {
  Ruler,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  HelpCircle,
  Bookmark,
  Check,
  X
} from 'lucide-react';
import { MeasurementProfile, ClothingTypeKey } from '../../types';
import { MeasurementGuideModal } from '../measurements/MeasurementGuideModal';

interface MeasurementsPageProps {
  profiles: MeasurementProfile[];
  onSaveProfile: (profile: Omit<MeasurementProfile, 'id' | 'updatedAt'> & { id?: string }) => void;
  onDeleteProfile: (id: string) => void;
  customerId: string;
  customerName: string;
}

export const MeasurementsPage: React.FC<MeasurementsPageProps> = ({
  profiles,
  onSaveProfile,
  onDeleteProfile,
  customerId,
  customerName,
}) => {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<MeasurementProfile | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form State
  const [name, setName] = useState('Personal Fit – 2026');
  const [clothingType, setClothingType] = useState<ClothingTypeKey>('blouse');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [isDefault, setIsDefault] = useState(false);
  const [notes, setNotes] = useState('');
  const [measurements, setMeasurements] = useState<Record<string, number>>({
    bust: 36,
    waist: 29,
    shoulder: 14.5,
    armhole: 16.5,
    sleeveLength: 10.5,
    blouseLength: 14,
    frontNeckDepth: 7,
    backNeckDepth: 9.5,
  });

  const openCreateModal = () => {
    setName(`Bespoke Profile – ${new Date().getFullYear()}`);
    setClothingType('blouse');
    setUnit('inches');
    setIsDefault(profiles.length === 0);
    setNotes('');
    setMeasurements({
      bust: 36,
      waist: 29,
      shoulder: 14.5,
      armhole: 16.5,
      sleeveLength: 10.5,
      blouseLength: 14,
      frontNeckDepth: 7,
      backNeckDepth: 9.5,
    });
    setEditingProfile(null);
    setIsCreatingNew(true);
  };

  const openEditModal = (p: MeasurementProfile) => {
    setEditingProfile(p);
    setName(p.name);
    setClothingType(p.clothingType);
    setUnit(p.unit);
    setIsDefault(p.isDefault);
    setNotes(p.notes || '');
    setMeasurements({ ...p.measurements });
    setIsCreatingNew(true);
  };

  const handleTypeChange = (newType: ClothingTypeKey) => {
    setClothingType(newType);
    if (newType === 'blouse') {
      setMeasurements({
        bust: 36,
        waist: 29,
        shoulder: 14.5,
        armhole: 16.5,
        sleeveLength: 10.5,
        blouseLength: 14,
        frontNeckDepth: 7,
        backNeckDepth: 9.5,
      });
    } else if (newType === 'kurti' || newType === 'gown' || newType === 'salwar') {
      setMeasurements({
        bust: 36.5,
        waist: 30,
        hip: 40,
        shoulder: 14.5,
        sleeveLength: 18,
        dressLength: 46,
        neckDepth: 6.5,
      });
    } else {
      setMeasurements({
        bust: 38,
        waist: 32,
        shoulder: 15,
        blouseLength: 15,
        lehengaWaist: 31,
        lehengaLength: 42,
        hip: 41,
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      id: editingProfile?.id,
      customerId,
      customerName,
      name,
      clothingType,
      isDefault,
      measurements,
      unit,
      notes,
    });
    setIsCreatingNew(false);
    setEditingProfile(null);
  };

  const handleMeasurementChange = (key: string, val: string) => {
    const num = parseFloat(val);
    setMeasurements((prev) => ({
      ...prev,
      [key]: isNaN(num) ? 0 : num,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
            Anatomical Vault
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
            Measurement Profiles
          </h1>
          <p className="text-sm text-[#554C41] mt-2 max-w-2xl">
            Save unique fit measurements for blouses, kurtis, lehengas, and gowns. Once saved, you can apply them to any tailoring order in a single click.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGuideModal(true)}
            className="px-4 py-2.5 rounded-xl border border-[#D5CABE] text-[#332D27] text-xs font-medium hover:bg-[#EFE9DF] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#6B1D2F]" />
            <span>Visual Measurement Guide</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Profile</span>
          </button>
        </div>
      </div>

      {/* Profiles Cards Grid */}
      {profiles.length === 0 ? (
        <div className="text-center py-20 bg-white/70 rounded-2xl border border-[#E5DDD0]">
          <Ruler className="w-12 h-12 mx-auto text-[#B7AA99] mb-3" />
          <p className="font-serif text-lg text-[#1A1716]">No Measurement Profiles Saved</p>
          <p className="text-xs text-[#706659] mt-1">Create your first profile to make ordering seamless.</p>
          <button
            onClick={openCreateModal}
            className="mt-4 px-4 py-2 rounded-xl bg-[#6B1D2F] text-white text-xs font-medium"
          >
            Create First Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                profile.isDefault
                  ? 'bg-white border-[#6B1D2F] shadow-md ring-1 ring-[#6B1D2F]/20'
                  : 'bg-[#FAF7F2] border-[#DFD6C7] hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg text-[#1A1716]">{profile.name}</h3>
                      {profile.isDefault && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F6ECEE] text-[#6B1D2F] font-semibold border border-[#EACCD2]">
                          Default
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#7C7164] capitalize block mt-0.5">
                      {profile.clothingType} Profile · Updated {profile.updatedAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(profile)}
                      className="p-1.5 rounded-lg text-[#7C7164] hover:text-[#1A1716] hover:bg-[#EFE9DF]"
                      title="Edit Profile"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProfile(profile.id)}
                      className="p-1.5 rounded-lg text-[#8A3030] hover:bg-[#FBEBEB]"
                      title="Delete Profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Measurements Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  {Object.entries(profile.measurements).map(([key, val]) => (
                    <div key={key} className="p-2 bg-[#F4EFE6] rounded-lg border border-[#E5DACB] flex justify-between items-center">
                      <span className="text-[#6B6154] capitalize truncate">
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span className="font-semibold text-[#1A1716] tabular-nums ml-2">
                        {val} {profile.unit}
                      </span>
                    </div>
                  ))}
                </div>

                {profile.notes && (
                  <p className="text-xs text-[#6B6154] mt-3 italic bg-[#F7F2EA] p-2.5 rounded-lg border border-[#E8DFD1]">
                    “{profile.notes}”
                  </p>
                )}
              </div>

              {!profile.isDefault && (
                <div className="pt-4 mt-4 border-t border-[#EAE3D7]">
                  <button
                    onClick={() => {
                      onSaveProfile({
                        ...profile,
                        isDefault: true,
                      });
                    }}
                    className="text-xs text-[#6B1D2F] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Set as Default for {profile.clothingType}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isCreatingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#6B1D2F]" />
                <h3 className="text-xl font-serif font-bold text-[#1A1716]">
                  {editingProfile ? 'Edit Measurement Profile' : 'New Measurement Profile'}
                </h3>
              </div>
              <button
                onClick={() => setIsCreatingNew(false)}
                className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716] hover:bg-[#EFE9DF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                    Profile Label
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Personal Festive Measurements – 2026"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs text-[#1A1716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                    Garment Category
                  </label>
                  <select
                    value={clothingType}
                    onChange={(e) => handleTypeChange(e.target.value as ClothingTypeKey)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs text-[#1A1716] focus:outline-none focus:border-[#6B1D2F]"
                  >
                    <option value="blouse">Saree Blouse</option>
                    <option value="kurti">Kurti / Anarkali</option>
                    <option value="lehenga">Bridal / Festive Lehenga</option>
                    <option value="gown">Evening Gown</option>
                    <option value="salwar">Salwar Suit</option>
                    <option value="custom">Custom Dress</option>
                  </select>
                </div>
              </div>

              {/* Units & Default */}
              <div className="flex items-center justify-between p-3 bg-[#F4EFE6] rounded-xl border border-[#E5DACB]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#1A1716]">Unit:</span>
                  <label className="flex items-center gap-1.5 text-xs text-[#3E3831] cursor-pointer">
                    <input
                      type="radio"
                      name="unit"
                      checked={unit === 'inches'}
                      onChange={() => setUnit('inches')}
                      className="accent-[#6B1D2F]"
                    />
                    <span>Inches (in)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-[#3E3831] cursor-pointer">
                    <input
                      type="radio"
                      name="unit"
                      checked={unit === 'cm'}
                      onChange={() => setUnit('cm')}
                      className="accent-[#6B1D2F]"
                    />
                    <span>Centimeters (cm)</span>
                  </label>
                </div>

                <label className="flex items-center gap-2 text-xs font-medium text-[#1A1716] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="accent-[#6B1D2F]"
                  />
                  <span>Set as Default Profile</span>
                </label>
              </div>

              {/* Measurements Inputs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#1A1716]">
                    Body Parameters ({unit})
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowGuideModal(true)}
                    className="text-xs text-[#6B1D2F] font-semibold hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>How to measure?</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(measurements).map(([key, val]) => (
                    <div key={key}>
                      <label className="text-[11px] font-medium text-[#6B6154] capitalize block mb-0.5 truncate">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        value={val || ''}
                        onChange={(e) => handleMeasurementChange(key, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DDD3C4] text-xs font-semibold text-[#1A1716] focus:outline-none focus:border-[#6B1D2F] tabular-nums"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                  Fit Notes & Body Quirks
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Prefer snug fit around bust, padded cups, relaxed armholes for comfort..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs text-[#1A1716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="px-4 py-2 rounded-xl border border-[#D5CABE] text-xs font-medium text-[#4A4237] hover:bg-[#EFE9DF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] shadow-xs"
                >
                  Save Measurement Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visual Guide Modal */}
      <MeasurementGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />
    </div>
  );
};
