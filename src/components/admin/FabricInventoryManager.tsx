import React, { useState } from 'react';
import {
  Layers,
  Plus,
  AlertTriangle,
  Edit2,
  Trash2,
  X,
  Search,
  CheckCircle2,
  TrendingDown,
  ArrowUpRight
} from 'lucide-react';
import { Fabric } from '../../types';

interface FabricInventoryProps {
  fabrics: Fabric[];
  onAddFabric: (fabric: Omit<Fabric, 'id'>) => void;
  onUpdateFabric: (id: string, updates: Partial<Fabric>) => void;
  onDeleteFabric: (id: string) => void;
}

export const FabricInventoryManager: React.FC<FabricInventoryProps> = ({
  fabrics,
  onAddFabric,
  onUpdateFabric,
  onDeleteFabric,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFabric, setEditingFabric] = useState<Fabric | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<Fabric['type']>('Silk');
  const [color, setColor] = useState('');
  const [hex, setHex] = useState('#6B1D2F');
  const [quantityMeters, setQuantityMeters] = useState(25);
  const [pricePerMeter, setPricePerMeter] = useState(1200);
  const [supplier, setSupplier] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState(15);

  const openAddModal = () => {
    setName('');
    setType('Silk');
    setColor('');
    setHex('#6B1D2F');
    setQuantityMeters(30);
    setPricePerMeter(1200);
    setSupplier('Varanasi Weavers');
    setLowStockThreshold(15);
    setEditingFabric(null);
    setShowAddModal(true);
  };

  const openEditModal = (f: Fabric) => {
    setEditingFabric(f);
    setName(f.name);
    setType(f.type);
    setColor(f.color);
    setHex(f.hex);
    setQuantityMeters(f.quantityMeters);
    setPricePerMeter(f.pricePerMeter);
    setSupplier(f.supplier);
    setLowStockThreshold(f.lowStockThreshold);
    setShowAddModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFabric) {
      onUpdateFabric(editingFabric.id, {
        name,
        type,
        color,
        hex,
        quantityMeters,
        pricePerMeter,
        supplier,
        lowStockThreshold,
      });
    } else {
      onAddFabric({
        name,
        type,
        color,
        hex,
        quantityMeters,
        pricePerMeter,
        supplier,
        lowStockThreshold,
      });
    }
    setShowAddModal(false);
  };

  const adjustStock = (fab: Fabric, delta: number) => {
    const updated = Math.max(0, fab.quantityMeters + delta);
    onUpdateFabric(fab.id, { quantityMeters: updated });
  };

  const filteredFabrics = fabrics.filter((f) => {
    return (
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
            Material Stockroom
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
            Fabric & Textile Inventory
          </h1>
          <p className="text-sm text-[#554C41] mt-1">
            Track metreage, restock levels, artisan supplier logs, and unit pricing across all luxury fabrics.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Fabric Roll</span>
        </button>
      </div>

      {/* Inventory Search & Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#DFD6C7]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C7164]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fabrics by name, weave, color, or mill..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-xs text-[#1A1716]"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-[#7C7164]">
          <span>
            Total Stock:{' '}
            <strong className="text-[#1A1716] tabular-nums">
              {fabrics.reduce((acc, f) => acc + f.quantityMeters, 0)} meters
            </strong>
          </span>
          <span>·</span>
          <span>
            Low Stock Lots:{' '}
            <strong className="text-[#A84A1D] tabular-nums">
              {fabrics.filter((f) => f.quantityMeters <= f.lowStockThreshold).length}
            </strong>
          </span>
        </div>
      </div>

      {/* Fabrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFabrics.map((fab) => {
          const isLowStock = fab.quantityMeters <= fab.lowStockThreshold;

          return (
            <div
              key={fab.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isLowStock
                  ? 'bg-[#FFF9F6] border-[#F2CBB8] shadow-xs'
                  : 'bg-[#FAF7F2] border-[#DFD6C7] hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full border border-black/15 shadow-inner shrink-0"
                      style={{ backgroundColor: fab.hex }}
                    />
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#1A1716] leading-snug">
                        {fab.name}
                      </h3>
                      <span className="text-[11px] text-[#7C7164]">
                        {fab.type} · {fab.color}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(fab)}
                      className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716] hover:bg-[#EFE9DF]"
                      title="Edit Fabric"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteFabric(fab.id)}
                      className="p-1 rounded-lg text-[#8A3030] hover:bg-[#FBEBEB]"
                      title="Delete Fabric"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {isLowStock && (
                  <div className="mb-3 px-2.5 py-1 rounded-lg bg-[#FFEFE8] border border-[#F5C7B3] text-[11px] text-[#A84A1D] font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Low Stock Warning (Threshold: {fab.lowStockThreshold}m)</span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-[#5C5347] pt-1">
                  <div className="flex justify-between">
                    <span className="text-[#7C7164]">Price per Metre:</span>
                    <span className="font-semibold text-[#1A1716] tabular-nums">
                      ₹{fab.pricePerMeter.toLocaleString('en-IN')}/m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C7164]">Artisan Supplier:</span>
                    <span className="font-medium text-[#1A1716] truncate max-w-[160px]">
                      {fab.supplier}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Status */}
              <div className="pt-4 mt-4 border-t border-[#EAE3D7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C8275] uppercase block">In Stock</span>
                  <span className="font-serif font-bold text-xl text-[#1A1716] tabular-nums">
                    {fab.quantityMeters}m
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white border border-[#DDD3C4] rounded-lg p-0.5">
                  <button
                    onClick={() => adjustStock(fab, -1)}
                    className="w-7 h-7 rounded text-xs font-bold text-[#6B1D2F] hover:bg-[#F4EFE6] flex items-center justify-center cursor-pointer"
                    title="Deduct 1 metre"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold px-2 tabular-nums">{fab.quantityMeters}m</span>
                  <button
                    onClick={() => adjustStock(fab, 5)}
                    className="w-7 h-7 rounded text-xs font-bold text-[#2E6B4A] hover:bg-[#F4EFE6] flex items-center justify-center cursor-pointer"
                    title="Restock +5 metres"
                  >
                    +5
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Fabric Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-lg w-full shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#6B1D2F]" />
                <h3 className="font-serif font-bold text-xl text-[#1A1716]">
                  {editingFabric ? 'Edit Fabric Record' : 'Register New Fabric Lot'}
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
                <label className="font-semibold block mb-1">Fabric Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Raw Mulberry Silk (Katan)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Weave / Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  >
                    <option value="Silk">Silk</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Linen">Linen</option>
                    <option value="Georgette">Georgette</option>
                    <option value="Chiffon">Chiffon</option>
                    <option value="Velvet">Velvet</option>
                    <option value="Brocade">Brocade</option>
                    <option value="Organza">Organza</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Shade / Color Name</label>
                  <input
                    type="text"
                    required
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. Deep Maroon"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Swatch Hex</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hex}
                      onChange={(e) => setHex(e.target.value)}
                      className="w-8 h-8 rounded border p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={hex}
                      onChange={(e) => setHex(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Stock (Meters)</label>
                  <input
                    type="number"
                    min="0"
                    value={quantityMeters}
                    onChange={(e) => setQuantityMeters(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-white border text-xs font-semibold tabular-nums"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Rate (₹/meter)</label>
                  <input
                    type="number"
                    min="0"
                    value={pricePerMeter}
                    onChange={(e) => setPricePerMeter(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-white border text-xs font-semibold tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Supplier / Guild</label>
                  <input
                    type="text"
                    required
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    placeholder="e.g. Varanasi Weavers Guild"
                    className="w-full px-3 py-2 rounded-xl bg-white border text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Low-Stock Alert Level (m)</label>
                  <input
                    type="number"
                    min="1"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 10)}
                    className="w-full px-3 py-2 rounded-xl bg-white border text-xs tabular-nums"
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
                  {editingFabric ? 'Update Fabric Record' : 'Save Fabric'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
