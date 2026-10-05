import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Scissors,
  Ruler,
  Calendar,
  CreditCard,
  Upload,
  Sparkles,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import {
  ClothingTypeKey,
  CustomSpecs,
  Design,
  Fabric,
  MeasurementProfile,
  TailoringOrder,
  PaymentRecord
} from '../../types';
import { GarmentIllustration } from '../common/DesignIllustrations';

interface OrderCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string;
  customerName: string;
  customerPhone: string;
  designs: Design[];
  fabrics: Fabric[];
  measurementProfiles: MeasurementProfile[];
  initialCustomSpecs?: CustomSpecs | null;
  initialEstimatedPrice?: number;
  initialDesignName?: string;
  onOrderCreated: (order: TailoringOrder) => void;
  onCreateMeasurementProfile: () => void;
}

export const OrderCreationModal: React.FC<OrderCreationModalProps> = ({
  isOpen,
  onClose,
  customerId,
  customerName,
  customerPhone,
  designs,
  fabrics,
  measurementProfiles,
  initialCustomSpecs,
  initialEstimatedPrice,
  initialDesignName,
  onOrderCreated,
  onCreateMeasurementProfile,
}) => {
  if (!isOpen) return null;

  // Step 1 to 8 state
  const [step, setStep] = useState<number>(initialCustomSpecs ? 2 : 1);

  // Step 1: Design / Clothing
  const [clothingType, setClothingType] = useState<ClothingTypeKey>(
    initialCustomSpecs?.clothingType || 'blouse'
  );
  const [selectedDesignId, setSelectedDesignId] = useState<string>(designs[0]?.id || '');
  const [designName, setDesignName] = useState<string>(
    initialDesignName || designs[0]?.name || 'Bespoke Creation'
  );

  // Step 2: Measurement Profile
  const defaultProfile =
    measurementProfiles.find((m) => m.isDefault && m.clothingType === clothingType) ||
    measurementProfiles[0];
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    defaultProfile?.id || ''
  );

  // Step 3: Fabric
  const [selectedFabricId, setSelectedFabricId] = useState<string>(
    initialCustomSpecs?.fabricId || fabrics[0]?.id || 'customer_provided'
  );
  const [fabricSource, setFabricSource] = useState<'boutique' | 'customer_provided'>(
    initialCustomSpecs?.fabricSource || 'boutique'
  );

  // Step 4: Customization
  const [neckline, setNeckline] = useState<string>(initialCustomSpecs?.neckline || 'Boat');
  const [sleeve, setSleeve] = useState<string>(initialCustomSpecs?.sleeve || 'Short');
  const [back, setBack] = useState<string>(initialCustomSpecs?.back || 'Deep back');
  const [color, setColor] = useState<string>(initialCustomSpecs?.color || 'Crimson Wine');
  const [embroidery, setEmbroidery] = useState<string>(
    initialCustomSpecs?.embroidery || 'Handcrafted metallic zari & thread work'
  );
  const [border, setBorder] = useState<string>(initialCustomSpecs?.border || 'Antique Zari Piping');
  const [garmentLength, setGarmentLength] = useState<string>(
    initialCustomSpecs?.garmentLength || '14.5 inches'
  );
  const [specialInstructions, setSpecialInstructions] = useState<string>(
    initialCustomSpecs?.specialInstructions || 'Comfortable cotton lining, padded cups.'
  );

  // Step 5: Reference Image
  const [referenceImage, setReferenceImage] = useState<string | null>(
    initialCustomSpecs?.referenceImage || null
  );

  // Step 6: Expected Delivery Date & Priority
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 10);
  const defaultDeliveryDate = twoWeeksLater.toISOString().split('T')[0];
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<string>(defaultDeliveryDate);
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');

  // Step 7/8: Payment selection
  const [advanceAmount, setAdvanceAmount] = useState<number>(3000);
  const [paymentMethod, setPaymentMethod] = useState<PaymentRecord['paymentMethod']>('UPI / GPay');

  // Price calculations
  const calculatePricing = () => {
    let base = 3200;
    if (clothingType === 'lehenga') base = 18000;
    if (clothingType === 'gown') base = 5800;
    if (clothingType === 'kurti') base = 2600;
    if (clothingType === 'salwar') base = 3400;

    let fabricCost = 0;
    let fabName = 'Customer-provided fabric';

    if (fabricSource === 'boutique' && selectedFabricId !== 'customer_provided') {
      const fab = fabrics.find((f) => f.id === selectedFabricId);
      if (fab) {
        fabName = `${fab.name} (${fab.color})`;
        const metersMap: Record<ClothingTypeKey, number> = {
          blouse: 1.0,
          kurti: 2.5,
          salwar: 4.5,
          gown: 4.0,
          lehenga: 5.5,
          custom: 3.0,
        };
        fabricCost = fab.pricePerMeter * (metersMap[clothingType] || 2);
      }
    }

    const customizationCost = 600;
    const embroideryCost = embroidery.toLowerCase().includes('grand') ? 3500 : 1200;
    const totalPrice = base + fabricCost + customizationCost + embroideryCost;

    return {
      basePrice: base,
      fabricCost,
      fabricName: fabName,
      customizationCost,
      embroideryCost,
      totalPrice,
    };
  };

  const pricing = calculatePricing();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmOrder = () => {
    const selectedProfile = measurementProfiles.find((m) => m.id === selectedProfileId);

    const customSpecs: CustomSpecs = {
      clothingType,
      neckline,
      sleeve,
      back,
      fabricId: fabricSource === 'boutique' ? selectedFabricId : undefined,
      fabricName: pricing.fabricName,
      fabricSource,
      color,
      embroidery,
      border,
      garmentLength,
      specialInstructions,
      referenceImage: referenceImage || undefined,
    };

    const newOrder: any = {
      customerId,
      customerName,
      customerPhone,
      designId: selectedDesignId,
      designName,
      clothingType,
      customSpecs,
      measurementProfileId: selectedProfile?.id || 'meas_temp',
      measurementProfileName: selectedProfile?.name || 'Quick In-Atelier Measurement',
      measurementSnapshot: selectedProfile?.measurements || { bust: 36, waist: 30 },
      expectedDeliveryDate,
      pricing: {
        basePrice: pricing.basePrice,
        fabricCost: pricing.fabricCost,
        customizationCost: pricing.customizationCost,
        embroideryCost: pricing.embroideryCost,
        totalPrice: pricing.totalPrice,
      },
      advancePaid: advanceAmount,
      paymentMethod,
      priority,
      notes: specialInstructions,
    };

    onOrderCreated(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E1D5] flex items-center justify-between bg-white/70">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#7C7164]">
              Step {step} of 8 · Tailoring Order Flow
            </span>
            <h3 className="font-serif font-bold text-xl text-[#1A1716]">
              {step === 1 && 'Step 1: Select Silhouette & Design'}
              {step === 2 && 'Step 2: Choose Measurement Profile'}
              {step === 3 && 'Step 3: Select Material & Fabric Source'}
              {step === 4 && 'Step 4: Neckline, Sleeve & Back Cuts'}
              {step === 5 && 'Step 5: Reference Image & Sketches'}
              {step === 6 && 'Step 6: Expected Delivery & Urgency'}
              {step === 7 && 'Step 7: Review Bespoke Order Specification'}
              {step === 8 && 'Step 8: Payment & Order Confirmation'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716] hover:bg-[#EFE9DF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="w-full bg-[#EAE3D6] h-1">
          <div
            className="bg-[#6B1D2F] h-1 transition-all duration-300"
            style={{ width: `${(step / 8) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-[#1A1716]">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[#5C5347]">
                Choose your garment silhouette and base design inspiration.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: 'blouse', label: 'Saree Blouse', price: '₹3,200' },
                  { key: 'kurti', label: 'Kurti / Anarkali', price: '₹2,600' },
                  { key: 'lehenga', label: 'Bridal Lehenga', price: '₹18,000' },
                  { key: 'gown', label: 'Evening Gown', price: '₹5,800' },
                  { key: 'salwar', label: 'Salwar Suit', price: '₹3,400' },
                  { key: 'custom', label: 'Custom Dress', price: '₹3,600' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setClothingType(item.key as any);
                      setDesignName(`${item.label} Creation`);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      clothingType === item.key
                        ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                        : 'bg-[#F4EFE6] border-[#DDD3C3]'
                    }`}
                  >
                    <p className="font-semibold text-xs text-[#1A1716]">{item.label}</p>
                    <p className="text-[11px] text-[#7C7164] mt-0.5">Starting {item.price}</p>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="text-xs font-semibold block mb-1">Garment Title / Note</label>
                <input
                  type="text"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#5C5347]">
                  Select the anatomical measurement profile to tailor this garment to.
                </p>
                <button
                  type="button"
                  onClick={onCreateMeasurementProfile}
                  className="text-xs text-[#6B1D2F] font-semibold hover:underline"
                >
                  + Add New Profile
                </button>
              </div>

              {measurementProfiles.length === 0 ? (
                <div className="p-4 bg-white rounded-xl border text-center">
                  <p className="text-xs text-[#7C7164]">No saved measurement profiles found.</p>
                  <button
                    type="button"
                    onClick={onCreateMeasurementProfile}
                    className="mt-2 text-xs font-semibold text-[#6B1D2F]"
                  >
                    Create Measurement Profile Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {measurementProfiles.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProfileId(p.id)}
                      className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        selectedProfileId === p.id
                          ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                          : 'bg-[#F4EFE6] border-[#DDD3C3]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#1A1716]">{p.name}</span>
                          {p.isDefault && (
                            <span className="text-[10px] bg-[#F6ECEE] text-[#6B1D2F] px-2 py-0.5 rounded font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#7C7164] mt-1 capitalize">
                          {p.clothingType} · Bust: {p.measurements.bust || '-'}, Waist: {p.measurements.waist || '-'} ({p.unit})
                        </p>
                      </div>

                      {selectedProfileId === p.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#6B1D2F]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-[#5C5347]">
                Will Thread & Style supply the fabric, or will you deliver your own fabric?
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFabricSource('boutique')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    fabricSource === 'boutique'
                      ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                      : 'bg-[#F4EFE6] border-[#DDD3C3]'
                  }`}
                >
                  <p className="font-semibold text-xs text-[#1A1716]">Boutique Fabrics</p>
                  <p className="text-[11px] text-[#7C7164] mt-0.5">Pick from our handloom silks and brocades</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFabricSource('customer_provided');
                    setSelectedFabricId('customer_provided');
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    fabricSource === 'customer_provided'
                      ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                      : 'bg-[#F4EFE6] border-[#DDD3C3]'
                  }`}
                >
                  <p className="font-semibold text-xs text-[#1A1716]">Customer Fabric</p>
                  <p className="text-[11px] text-[#7C7164] mt-0.5">Deliver to atelier or request pickup (₹0 charge)</p>
                </button>
              </div>

              {fabricSource === 'boutique' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {fabrics.map((fab) => (
                    <button
                      key={fab.id}
                      type="button"
                      onClick={() => setSelectedFabricId(fab.id)}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                        selectedFabricId === fab.id
                          ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                          : 'bg-[#F4EFE6] border-[#DDD3C3]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: fab.hex }}
                        />
                        <div>
                          <p className="text-xs font-semibold text-[#1A1716] truncate max-w-[150px]">
                            {fab.name}
                          </p>
                          <p className="text-[10px] text-[#7C7164]">{fab.color}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#6B1D2F] tabular-nums">
                        ₹{fab.pricePerMeter}/m
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Neckline</label>
                  <select
                    value={neckline}
                    onChange={(e) => setNeckline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  >
                    <option value="Boat">Boat Neck</option>
                    <option value="Round">Round Neck</option>
                    <option value="V-neck">V-Neck</option>
                    <option value="Sweetheart">Sweetheart</option>
                    <option value="Square">Square</option>
                    <option value="High neck">High Neck</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Sleeve</label>
                  <select
                    value={sleeve}
                    onChange={(e) => setSleeve(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  >
                    <option value="Sleeveless">Sleeveless</option>
                    <option value="Short">Short Sleeve</option>
                    <option value="Three-quarter">Three-Quarter</option>
                    <option value="Full">Full Sleeve</option>
                    <option value="Puff">Puff Sleeve</option>
                    <option value="Bell">Bell Sleeve</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Back Cut</label>
                  <select
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  >
                    <option value="Simple">Simple Closed</option>
                    <option value="Deep back">Deep Back with Dori</option>
                    <option value="Keyhole">Keyhole Inset</option>
                    <option value="Bow">Bow Accent</option>
                    <option value="Custom">Custom Corset</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Color Palette</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Length</label>
                  <input
                    type="text"
                    value={garmentLength}
                    onChange={(e) => setGarmentLength(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Fit & Lining Notes</label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-xs text-[#5C5347]">
                Upload any inspirational Pinterest photos, embroidery closeups, or sketch drawings for our master tailors.
              </p>

              <div className="p-6 border-2 border-dashed border-[#CFC3B2] rounded-2xl bg-white/50 text-center flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-[#6B1D2F] mb-2" />
                <p className="text-xs font-medium text-[#1A1716]">Upload Reference Image (PNG/JPEG)</p>
                <p className="text-[11px] text-[#7C7164] mt-0.5">Maximum file size: 5MB</p>
                <label className="mt-3 px-4 py-2 rounded-xl bg-[#6B1D2F] text-white text-xs font-medium cursor-pointer hover:bg-[#521322]">
                  Select Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {referenceImage && (
                <div className="p-3 bg-[#F4EFE6] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={referenceImage} alt="Reference" className="w-12 h-12 object-cover rounded-lg border" />
                    <div>
                      <p className="text-xs font-semibold text-[#1A1716]">Inspiration Image Attached</p>
                      <p className="text-[10px] text-[#2E6B4A]">Ready for tailor inspection</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReferenceImage(null)}
                    className="text-xs text-[#8A3030] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="space-y-4">
              <p className="text-xs text-[#5C5347]">
                When do you require this outfit? Standard turnaround is 7–10 days. Express orders are prioritized.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold block mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={expectedDeliveryDate}
                    onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-medium text-[#1A1716]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Order Priority</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPriority('normal')}
                      className={`flex-1 p-2 rounded-xl border text-xs font-medium cursor-pointer ${
                        priority === 'normal'
                          ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F] font-semibold'
                          : 'bg-[#F4EFE6] border-[#DDD3C3]'
                      }`}
                    >
                      Standard (7-10 days)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority('urgent')}
                      className={`flex-1 p-2 rounded-xl border text-xs font-medium cursor-pointer ${
                        priority === 'urgent'
                          ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F] font-semibold text-[#8B2626]'
                          : 'bg-[#F4EFE6] border-[#DDD3C3]'
                      }`}
                    >
                      Urgent / Bridal Express
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F4EFE6] rounded-xl border border-[#DDD3C3] text-xs text-[#5C5347] flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#6B1D2F] shrink-0 mt-0.5" />
                <p>
                  A preliminary trial appointment will automatically be scheduled 3 days prior to your target delivery date.
                </p>
              </div>
            </div>
          )}

          {/* STEP 7: Review */}
          {step === 7 && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-xl border border-[#DDD3C4] space-y-2 text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-[#7C7164]">Garment:</span>
                  <span className="font-semibold">{designName} ({clothingType})</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-[#7C7164]">Cuts & Styling:</span>
                  <span className="font-semibold">{neckline} Neck · {sleeve} Sleeve · {back}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-[#7C7164]">Fabric:</span>
                  <span className="font-semibold">{pricing.fabricName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-[#7C7164]">Expected Delivery:</span>
                  <span className="font-semibold">{expectedDeliveryDate} ({priority.toUpperCase()})</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#7C7164]">Total Quoted Investment:</span>
                  <span className="font-serif font-bold text-base text-[#6B1D2F] tabular-nums">
                    ₹{pricing.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Payment & Confirm */}
          {step === 8 && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F4EFE6] rounded-xl border border-[#DDD3C3] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7C7164]">Total Outfit Cost</span>
                  <p className="font-serif font-bold text-xl text-[#1A1716] tabular-nums">
                    ₹{pricing.totalPrice.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="text-xs text-[#2E6B4A] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Bespoke Fit Guarantee
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">
                  Advance Token Deposit (Recommended 50% or full)
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setAdvanceAmount(Math.round(pricing.totalPrice * 0.5))}
                    className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                      advanceAmount === Math.round(pricing.totalPrice * 0.5)
                        ? 'bg-[#6B1D2F] text-white font-semibold'
                        : 'bg-white border-[#DDD3C4]'
                    }`}
                  >
                    50% Token (₹{Math.round(pricing.totalPrice * 0.5).toLocaleString('en-IN')})
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdvanceAmount(pricing.totalPrice)}
                    className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                      advanceAmount === pricing.totalPrice
                        ? 'bg-[#6B1D2F] text-white font-semibold'
                        : 'bg-white border-[#DDD3C4]'
                    }`}
                  >
                    100% Upfront (₹{pricing.totalPrice.toLocaleString('en-IN')})
                  </button>
                </div>
                <input
                  type="number"
                  min="0"
                  max={pricing.totalPrice}
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-semibold tabular-nums"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-medium"
                >
                  <option value="UPI / GPay">UPI / Google Pay / PhonePe</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Net Banking">Net Banking (NEFT/IMPS)</option>
                  <option value="Cash at Boutique">Cash at Boutique Counter</option>
                </select>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#DDD3C4] text-xs text-[#5C5347]">
                <p>
                  * Mock payment flow: Submitting will instantaneously generate order ID, allocate fabric, record receipt, and trigger tailor drafting.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-[#E8E1D5] bg-white/70 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl border border-[#D5CABE] text-xs font-medium text-[#4A4237] hover:bg-[#EFE9DF] flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 8 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmOrder}
              className="px-6 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FileCheck className="w-4 h-4" />
              <span>Confirm & Place Bespoke Order</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
