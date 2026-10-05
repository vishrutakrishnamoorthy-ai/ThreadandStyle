import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Scissors,
  Upload,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Layers,
  Palette,
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { ClothingTypeKey, Fabric, CustomSpecs, Design } from '../../types';
import { GarmentIllustration } from '../common/DesignIllustrations';
import { NecklineIcon, SleeveIcon } from '../common/NecklineSleeveIcons';

interface CustomDesignerProps {
  fabrics: Fabric[];
  initialDesign?: Design | null;
  onProceedToOrder: (customSpecs: CustomSpecs, estimatedPrice: number, designName: string) => void;
}

const CLOTHING_TYPES: { key: ClothingTypeKey; label: string; basePrice: number }[] = [
  { key: 'blouse', label: 'Saree Blouse', basePrice: 2800 },
  { key: 'kurti', label: 'Bespoke Kurti / Anarkali', basePrice: 2400 },
  { key: 'lehenga', label: 'Bridal & Festive Lehenga', basePrice: 18000 },
  { key: 'gown', label: 'Evening Couture Gown', basePrice: 5800 },
  { key: 'salwar', label: 'Salwar Suit Set', basePrice: 3200 },
  { key: 'custom', label: 'Custom Fusion Dress', basePrice: 3600 },
];

const NECK_DESIGNS = [
  'Round',
  'V-neck',
  'Square',
  'Boat',
  'Sweetheart',
  'High neck',
];

const SLEEVE_DESIGNS = [
  'Sleeveless',
  'Short',
  'Three-quarter',
  'Full',
  'Puff',
  'Bell',
];

const BACK_DESIGNS = [
  'Simple',
  'Deep back',
  'Keyhole',
  'Bow',
  'Custom / Corset',
];

export const CustomDesignerPage: React.FC<CustomDesignerProps> = ({
  fabrics,
  initialDesign,
  onProceedToOrder,
}) => {
  const [clothingType, setClothingType] = useState<ClothingTypeKey>(
    initialDesign
      ? (initialDesign.category.toLowerCase().includes('blouse')
          ? 'blouse'
          : initialDesign.category.toLowerCase().includes('kurti')
          ? 'kurti'
          : initialDesign.category.toLowerCase().includes('lehenga') || initialDesign.category.toLowerCase().includes('bridal')
          ? 'lehenga'
          : initialDesign.category.toLowerCase().includes('gown')
          ? 'gown'
          : 'salwar')
      : 'blouse'
  );

  const [neckline, setNeckline] = useState<string>(initialDesign?.neckline.split(' ')[0] || 'Boat');
  const [sleeve, setSleeve] = useState<string>(initialDesign?.sleeve.split(' ')[0] || 'Short');
  const [back, setBack] = useState<string>('Deep back');
  const [selectedFabricId, setSelectedFabricId] = useState<string>(fabrics[0]?.id || 'customer_provided');
  const [colorText, setColorText] = useState<string>('Crimson Wine & Antique Gold');
  const [embroideryOption, setEmbroideryOption] = useState<'none' | 'light' | 'moderate' | 'heavy'>('moderate');
  const [borderRequirement, setBorderRequirement] = useState<string>('Antique Zari Piping (0.5 inch)');
  const [garmentLength, setGarmentLength] = useState<string>('14.5 inches');
  const [specialInstructions, setSpecialInstructions] = useState<string>(
    'Include soft cotton lining, bra-strap holder clasps, and padded cups.'
  );
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [designTitle, setDesignTitle] = useState<string>(initialDesign ? initialDesign.name : 'Bespoke Handcrafted Outfit');

  // Handle image upload
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

  // Dynamic Price Calculation
  const priceCalculation = useMemo(() => {
    const base = CLOTHING_TYPES.find((t) => t.key === clothingType)?.basePrice || 3000;

    let fabricCost = 0;
    let fabricName = 'Customer-provided fabric';

    if (selectedFabricId !== 'customer_provided') {
      const fab = fabrics.find((f) => f.id === selectedFabricId);
      if (fab) {
        fabricName = `${fab.name} (${fab.color})`;
        const metersNeeded: Record<ClothingTypeKey, number> = {
          blouse: 1.0,
          kurti: 2.5,
          salwar: 4.5,
          gown: 4.0,
          lehenga: 5.5,
          custom: 3.0,
        };
        fabricCost = fab.pricePerMeter * (metersNeeded[clothingType] || 2);
      }
    }

    const embroideryCosts: Record<string, number> = {
      none: 0,
      light: 600,
      moderate: 1400,
      heavy: 3500,
    };
    const embroideryCost = embroideryCosts[embroideryOption] || 0;

    let customizationCost = 0;
    if (sleeve === 'Puff' || sleeve === 'Bell') customizationCost += 250;
    if (back.includes('Keyhole') || back.includes('Bow')) customizationCost += 200;
    if (neckline === 'Sweetheart' || neckline === 'High neck') customizationCost += 200;

    const totalPrice = base + fabricCost + embroideryCost + customizationCost;

    return {
      base,
      fabricCost,
      fabricName,
      embroideryCost,
      customizationCost,
      totalPrice,
    };
  }, [clothingType, selectedFabricId, fabrics, embroideryOption, sleeve, back, neckline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customSpecs: CustomSpecs = {
      clothingType,
      neckline,
      sleeve,
      back,
      fabricId: selectedFabricId === 'customer_provided' ? undefined : selectedFabricId,
      fabricName: priceCalculation.fabricName,
      fabricSource: selectedFabricId === 'customer_provided' ? 'customer_provided' : 'boutique',
      color: colorText,
      embroidery: `${embroideryOption.toUpperCase()} - ${embroideryOption === 'none' ? 'No embroidery' : 'Handcrafted metallic zari & thread work'}`,
      border: borderRequirement,
      garmentLength,
      specialInstructions,
      referenceImage: referenceImage || undefined,
    };

    onProceedToOrder(customSpecs, priceCalculation.totalPrice, designTitle);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
          Atelier Interactive Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
          Custom Dress & Silhouette Designer
        </h1>
        <p className="text-sm text-[#554C41] mt-2 max-w-2xl">
          Personalize every element of your garment—from cuts and sleeve contours to artisanal fabrics and handcrafted embroidery. Watch your estimated atelier investment update live.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customization Controls (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          {/* Section 1: Clothing Type */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="font-serif font-bold text-lg text-[#1A1716]">Select Garment Silhouette</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CLOTHING_TYPES.map((type) => (
                <button
                  type="button"
                  key={type.key}
                  onClick={() => setClothingType(type.key)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    clothingType === type.key
                      ? 'bg-white border-[#6B1D2F] shadow-sm ring-1 ring-[#6B1D2F]'
                      : 'bg-[#F4EFE6] border-[#DDD3C3] hover:bg-white text-[#4A4237]'
                  }`}
                >
                  <p className="font-semibold text-xs text-[#1A1716]">{type.label}</p>
                  <p className="text-[11px] text-[#7C7164] mt-1">
                    From ₹{type.basePrice.toLocaleString('en-IN')}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Neckline Design */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="font-serif font-bold text-lg text-[#1A1716]">Neckline Contour</h2>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {NECK_DESIGNS.map((neck) => (
                <button
                  type="button"
                  key={neck}
                  onClick={() => setNeckline(neck)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    neckline === neck
                      ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                      : 'bg-[#F4EFE6] border-[#DDD3C3] hover:bg-white text-[#4A4237]'
                  }`}
                >
                  <NecklineIcon type={neck} selected={neckline === neck} className="w-10 h-10 mb-1" />
                  <span className="text-[11px] font-medium text-[#1A1716] text-center leading-tight">
                    {neck}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Sleeve Styling */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="font-serif font-bold text-lg text-[#1A1716]">Sleeve Structure</h2>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {SLEEVE_DESIGNS.map((slv) => (
                <button
                  type="button"
                  key={slv}
                  onClick={() => setSleeve(slv)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    sleeve === slv
                      ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                      : 'bg-[#F4EFE6] border-[#DDD3C3] hover:bg-white text-[#4A4237]'
                  }`}
                >
                  <SleeveIcon type={slv} selected={sleeve === slv} className="w-10 h-10 mb-1" />
                  <span className="text-[11px] font-medium text-[#1A1716] text-center leading-tight">
                    {slv}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Back Design */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h2 className="font-serif font-bold text-lg text-[#1A1716]">Back Silhouette</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {BACK_DESIGNS.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setBack(b)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    back === b
                      ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F] font-semibold text-[#6B1D2F]'
                      : 'bg-[#F4EFE6] border-[#DDD3C3] hover:bg-white text-[#4A4237]'
                  }`}
                >
                  <span className="text-xs">{b}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Fabric Selection */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <h2 className="font-serif font-bold text-lg text-[#1A1716]">Fabric Selection</h2>
              </div>
              <span className="text-xs text-[#7A6B58]">Boutique inventory or bring your own</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Customer provided fabric option */}
              <button
                type="button"
                onClick={() => setSelectedFabricId('customer_provided')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedFabricId === 'customer_provided'
                    ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                    : 'bg-[#F4EFE6] border-[#DDD3C3] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#1A1716]">Customer-Provided Fabric</span>
                  <span className="text-[10px] text-[#2E6B4A] font-bold">₹0 Fabric Charge</span>
                </div>
                <p className="text-[11px] text-[#6E6457] mt-1">
                  You drop off or courier your fabric to our Indiranagar atelier.
                </p>
              </button>

              {/* In-house luxury fabrics */}
              {fabrics.map((fab) => (
                <button
                  type="button"
                  key={fab.id}
                  onClick={() => setSelectedFabricId(fab.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedFabricId === fab.id
                      ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                      : 'bg-[#F4EFE6] border-[#DDD3C3] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: fab.hex }}
                      />
                      <span className="font-semibold text-xs text-[#1A1716] truncate max-w-[140px]">
                        {fab.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#1A1716] tabular-nums">
                      ₹{fab.pricePerMeter}/m
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#7A7063] mt-1">
                    <span>{fab.color}</span>
                    <span>{fab.quantityMeters}m in atelier</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 6: Artisanal Embroidery & Custom Specs */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7] space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs font-bold flex items-center justify-center">
                6
              </span>
              <h2 className="font-serif font-bold text-lg text-[#1A1716]">Embellishment & Specifications</h2>
            </div>

            {/* Embroidery Level */}
            <div>
              <label className="text-xs font-semibold text-[#1A1716] block mb-2">
                Handcrafted Embroidery Work
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'Plain / No Work', cost: '₹0' },
                  { id: 'light', label: 'Subtle Neck/Cuff Piping', cost: '+₹600' },
                  { id: 'moderate', label: 'Aari & Zardozi Motifs', cost: '+₹1,400' },
                  { id: 'heavy', label: 'Grand Bridal All-Over', cost: '+₹3,500' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setEmbroideryOption(opt.id as any)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      embroideryOption === opt.id
                        ? 'bg-white border-[#6B1D2F] ring-1 ring-[#6B1D2F]'
                        : 'bg-[#F4EFE6] border-[#DDD3C3] hover:bg-white'
                    }`}
                  >
                    <p className="text-[11px] font-semibold text-[#1A1716]">{opt.label}</p>
                    <p className="text-[10px] text-[#6B1D2F] font-bold mt-0.5">{opt.cost}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color & Border */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                  Color / Shade Requirements
                </label>
                <input
                  type="text"
                  value={colorText}
                  onChange={(e) => setColorText(e.target.value)}
                  placeholder="e.g. Deep Maroon, Antique Gold, Champagne"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs text-[#1A1716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                  Border & Piping Requirements
                </label>
                <input
                  type="text"
                  value={borderRequirement}
                  onChange={(e) => setBorderRequirement(e.target.value)}
                  placeholder="e.g. 2-inch temple zari border, velvet piping"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs text-[#1A1716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
            </div>

            {/* Length & Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                  Desired Garment Length
                </label>
                <input
                  type="text"
                  value={garmentLength}
                  onChange={(e) => setGarmentLength(e.target.value)}
                  placeholder="e.g. 14.5 inches for blouse, 46 inches for kurti"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs text-[#1A1716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                  Design Name / Title
                </label>
                <input
                  type="text"
                  value={designTitle}
                  onChange={(e) => setDesignTitle(e.target.value)}
                  placeholder="Give your outfit a name"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs text-[#1A1716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                Special Tailoring & Fit Instructions
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Deep armhole margin, double cotton lining, padded cups, hooks on left side..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs text-[#1A1716] focus:outline-none focus:border-[#6B1D2F]"
              />
            </div>

            {/* Reference Image Upload */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                Upload Reference Photo / Sketch (Optional)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[#B5A898] bg-[#F4EFE6] text-xs text-[#5C5347] hover:bg-white cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#6B1D2F]" />
                  <span>Choose Image File</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                {referenceImage && (
                  <div className="flex items-center gap-2">
                    <img
                      src={referenceImage}
                      alt="Reference"
                      className="w-10 h-10 rounded-lg object-cover border border-[#DDD3C4]"
                    />
                    <span className="text-xs text-[#2E6B4A] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Uploaded
                    </span>
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
            </div>
          </div>
        </div>

        {/* Right: Live Silhouette Preview & Summary (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-6">
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7] shadow-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58] block mb-1">
              Real-Time Atelier Preview
            </span>
            <h3 className="font-serif font-bold text-xl text-[#1A1716]">
              {designTitle}
            </h3>

            {/* Visual Canvas */}
            <div className="my-4 aspect-[4/4.5] rounded-xl bg-gradient-to-b from-[#F2ECE1] to-[#E5DDD0] p-4 flex items-center justify-center border border-[#DFD5C5] relative overflow-hidden">
              <GarmentIllustration type={clothingType} className="w-full h-full max-h-60" />
              
              <div className="absolute top-2 left-2 text-[10px] bg-white/90 px-2 py-0.5 rounded border border-[#DDD3C4] text-[#6E6457]">
                {neckline} Neck · {sleeve} Sleeve
              </div>
            </div>

            {/* Summary List */}
            <div className="border-t border-[#EAE3D7] pt-4 space-y-2 text-xs text-[#403830]">
              <div className="flex justify-between">
                <span className="text-[#7C7164]">Silhouette:</span>
                <span className="font-semibold text-[#1A1716] capitalize">{clothingType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C7164]">Neck / Sleeve:</span>
                <span className="font-semibold text-[#1A1716]">{neckline} / {sleeve}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C7164]">Back Cut:</span>
                <span className="font-semibold text-[#1A1716]">{back}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C7164]">Fabric:</span>
                <span className="font-semibold text-[#1A1716] truncate max-w-[170px]">
                  {priceCalculation.fabricName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C7164]">Embroidery:</span>
                <span className="font-semibold text-[#1A1716] capitalize">{embroideryOption} Work</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-[#EAE3D7] pt-4 mt-4 space-y-1.5 text-xs text-[#635A4E]">
              <div className="flex justify-between">
                <span>Base Tailoring:</span>
                <span className="tabular-nums">₹{priceCalculation.base.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Fabric Allocation:</span>
                <span className="tabular-nums">₹{priceCalculation.fabricCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Embroidery & Accents:</span>
                <span className="tabular-nums">
                  ₹{(priceCalculation.embroideryCost + priceCalculation.customizationCost).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="border-t border-[#EAE3D7] pt-3 mt-2 flex justify-between items-baseline">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7C7164] block">
                    Estimated Price
                  </span>
                  <span className="text-[10px] text-[#8C8275]">Taxes & fitting included</span>
                </div>
                <span className="font-serif font-bold text-2xl text-[#6B1D2F] tabular-nums">
                  ₹{priceCalculation.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full mt-6 py-3.5 rounded-xl bg-[#6B1D2F] text-white font-semibold text-sm hover:bg-[#521322] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Scissors className="w-4 h-4" />
              <span>Submit Design Request & Order</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
