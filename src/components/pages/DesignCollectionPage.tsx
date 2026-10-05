import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, X, Scissors, Clock, Sparkles } from 'lucide-react';
import { Design, ClothingCategory } from '../../types';
import { GarmentIllustration } from '../common/DesignIllustrations';

interface DesignCollectionPageProps {
  designs: Design[];
  onCustomize: (design: Design) => void;
}

const CATEGORIES: ('All' | ClothingCategory)[] = [
  'All',
  'Saree Blouse',
  'Kurti',
  'Salwar Suit',
  'Lehenga',
  'Gown',
  'Churidar',
  'Kids Wear',
  'Custom Dress',
  'Bridal Wear',
];

export const DesignCollectionPage: React.FC<DesignCollectionPageProps> = ({ designs, onCustomize }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ClothingCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high'>('popular');
  const [activeModalDesign, setActiveModalDesign] = useState<Design | null>(null);

  const filteredDesigns = useMemo(() => {
    return designs
      .filter((d) => {
        const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
        const matchesSearch =
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price_high') return b.startingPrice - a.startingPrice;
        return b.popularity - a.popularity;
      });
  }, [designs, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
          Boutique Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
          Bespoke Design Collection
        </h1>
        <p className="text-sm text-[#554C41] mt-2 max-w-2xl">
          Explore curated styles designed for ceremonial, festive, and contemporary occasions. Select any silhouette to tailor it with your custom measurements and fabric preferences.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C7164]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blouses, lehengas, bridal zardozi, gowns..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-sm text-[#1A1716] placeholder:text-[#8E8375] focus:outline-none focus:border-[#6B1D2F] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7164] hover:text-[#1A1716]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-[#7C7164]" />
            <span className="text-xs text-[#7C7164] font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-medium text-[#2C2723] focus:outline-none focus:border-[#6B1D2F] cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price_low">Starting Price: Low to High</option>
              <option value="price_high">Starting Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Buttons (Functional Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#6B1D2F] text-white shadow-xs font-semibold'
                  : 'bg-[#EDE6DA] text-[#4A433A] hover:bg-[#E3DACB] hover:text-[#1A1716]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Designs */}
      {filteredDesigns.length === 0 ? (
        <div className="text-center py-20 bg-white/60 rounded-2xl border border-[#E5DDD0]">
          <p className="text-lg font-serif text-[#1A1716]">No matching designs found</p>
          <p className="text-xs text-[#706659] mt-1">Try adjusting your search terms or selecting another category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-[#6B1D2F] text-white text-xs font-medium hover:bg-[#541423]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <div
              key={design.id}
              className="bg-[#FAF7F2] rounded-2xl border border-[#DFD6C7] overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Image Frame */}
              <div className="aspect-[4/4.5] bg-gradient-to-b from-[#F2EBE0] to-[#E5DDD0] p-4 flex items-center justify-center relative overflow-hidden">
                <GarmentIllustration type={design.category} className="w-full h-full max-h-56" />
                <span className="absolute top-3 left-3 text-[11px] font-medium text-[#7C7164] bg-white/90 px-2 py-0.5 rounded-md border border-[#DDD3C4]">
                  {design.category}
                </span>
                <span className="absolute top-3 right-3 text-[11px] text-[#7C7164] bg-[#FAF7F2]/90 px-2 py-0.5 rounded-md border border-[#DDD3C4] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#6B1D2F]" />
                  <span>{design.estimatedDays}d craft</span>
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1A1716] group-hover:text-[#6B1D2F] transition-colors leading-snug">
                    {design.name}
                  </h3>
                  <p className="text-xs text-[#5D5448] mt-1.5 line-clamp-2 leading-relaxed">
                    {design.description}
                  </p>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-[#706659] mt-3 pt-2 border-t border-[#EAE3D7]">
                    <span>{design.neckline}</span>
                    <span>·</span>
                    <span>{design.sleeve}</span>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="pt-4 mt-4 border-t border-[#EAE3D7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C8275] uppercase block">Starting Price</span>
                    <span className="font-serif font-bold text-base text-[#1A1716] tabular-nums">
                      ₹{design.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalDesign(design)}
                      className="px-3 py-1.5 rounded-lg border border-[#D5CABE] text-[#332D27] text-xs font-medium hover:bg-[#EFE9DF] transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onCustomize(design)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Scissors className="w-3 h-3" />
                      <span>Customize</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Design Details Modal */}
      {activeModalDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#7C7164]">
                  {activeModalDesign.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1A1716]">
                  {activeModalDesign.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalDesign(null)}
                className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716] hover:bg-[#EFE9DF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 items-center">
              <div className="aspect-[4/4.5] bg-gradient-to-b from-[#F2EBE0] to-[#E5DDD0] rounded-xl p-4 flex items-center justify-center border border-[#E0D7C9]">
                <GarmentIllustration type={activeModalDesign.category} className="w-full h-full max-h-64" />
              </div>

              <div className="space-y-4 text-xs text-[#403830]">
                <div>
                  <h4 className="font-semibold text-sm text-[#1A1716] mb-1">Couture Description</h4>
                  <p className="leading-relaxed text-[#5C5347]">{activeModalDesign.description}</p>
                </div>

                <div className="p-3 bg-[#F2ECE1] rounded-xl space-y-2 border border-[#E3DACB]">
                  <div className="flex justify-between">
                    <span className="text-[#7C7164]">Recommended Neckline:</span>
                    <span className="font-semibold text-[#1A1716]">{activeModalDesign.neckline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C7164]">Sleeve Styling:</span>
                    <span className="font-semibold text-[#1A1716]">{activeModalDesign.sleeve}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C7164]">Back Design:</span>
                    <span className="font-semibold text-[#1A1716]">{activeModalDesign.back}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C7164]">Best Fabric Match:</span>
                    <span className="font-semibold text-[#1A1716]">{activeModalDesign.fabricRecommended}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C7164]">Crafting Duration:</span>
                    <span className="font-semibold text-[#1A1716]">{activeModalDesign.estimatedDays} Days</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-[#8C8275] uppercase block">Base Price</span>
                    <span className="font-serif font-bold text-xl text-[#1A1716] tabular-nums">
                      ₹{activeModalDesign.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const design = activeModalDesign;
                      setActiveModalDesign(null);
                      onCustomize(design);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>Customize This Silhouette</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
