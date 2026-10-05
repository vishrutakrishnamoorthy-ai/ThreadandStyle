import React, { useState } from 'react';
import {
  Users,
  Search,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Package,
  Ruler,
  X,
  CreditCard
} from 'lucide-react';
import { Customer, TailoringOrder, MeasurementProfile } from '../../types';

interface CustomerManagerProps {
  customers: Customer[];
  orders: TailoringOrder[];
  measurementProfiles: MeasurementProfile[];
  onSelectOrder: (order: TailoringOrder) => void;
}

export const CustomerManager: React.FC<CustomerManagerProps> = ({
  customers,
  orders,
  measurementProfiles,
  onSelectOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getCustomerStats = (customerId: string) => {
    const custOrders = orders.filter((o) => o.customerId === customerId);
    const lastOrder = custOrders[0]; // sorted newest first
    const pendingBalance = custOrders.reduce((sum, o) => sum + o.remainingAmount, 0);
    const profiles = measurementProfiles.filter((m) => m.customerId === customerId);

    return {
      orderCount: custOrders.length,
      lastOrder,
      pendingBalance,
      profiles,
      custOrders,
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
          Clientele Directory
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
          Patron Profiles & History
        </h1>
        <p className="text-sm text-[#554C41] mt-1">
          Review client lifetime orders, saved measurement archives, and account settlements.
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-[#DFD6C7] flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C7164]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patron name, phone, email, or locality..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-xs text-[#1A1716]"
          />
        </div>

        <span className="text-xs text-[#7C7164] font-medium">
          {filteredCustomers.length} registered patrons
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#DFD6C7] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#403830]">
            <thead>
              <tr className="border-b border-[#E3DACB] bg-[#F4EFE6] text-[11px] uppercase tracking-wider text-[#7C7164]">
                <th className="py-3.5 px-4">Patron Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Locality</th>
                <th className="py-3.5 px-4">Lifetime Orders</th>
                <th className="py-3.5 px-4">Last Order</th>
                <th className="py-3.5 px-4">Pending Due</th>
                <th className="py-3.5 px-4">Measurements</th>
                <th className="py-3.5 px-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D7]">
              {filteredCustomers.map((cust) => {
                const stats = getCustomerStats(cust.id);

                return (
                  <tr key={cust.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-serif font-bold text-sm text-[#1A1716] block">
                        {cust.name}
                      </span>
                      <span className="text-[10px] text-[#7C7164]">Since {cust.createdAt}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-[#1A1716] block">{cust.phone}</span>
                      <span className="text-[10px] text-[#7C7164]">{cust.email}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[#1A1716]">{cust.city}</span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#1A1716] tabular-nums">
                      {stats.orderCount} Outfits
                    </td>

                    <td className="py-3.5 px-4">
                      {stats.lastOrder ? (
                        <div>
                          <span className="font-mono text-[#6B1D2F] font-bold block">
                            #{stats.lastOrder.orderNumber}
                          </span>
                          <span className="text-[10px] text-[#7C7164] truncate block max-w-[130px]">
                            {stats.lastOrder.designName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#8C8275] italic">No orders yet</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 tabular-nums">
                      {stats.pendingBalance > 0 ? (
                        <span className="font-bold text-[#A84A1D]">
                          ₹{stats.pendingBalance.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-[#2E6B4A] font-semibold">Zero Due</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-white border border-[#DDD3C4] text-[11px] text-[#554C41]">
                        {stats.profiles.length} Profiles
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="px-3 py-1 rounded-lg bg-white border border-[#D5CABE] text-[#1A1716] font-medium hover:bg-[#F3EFEA] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Dossier</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Dossier Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
              <div>
                <span className="text-xs uppercase font-bold text-[#6B1D2F]">
                  Patron Dossier
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1A1716]">
                  {selectedCustomer.name}
                </h3>
                <p className="text-xs text-[#7C7164] mt-0.5">
                  {selectedCustomer.email} · {selectedCustomer.phone} · {selectedCustomer.address},{' '}
                  {selectedCustomer.city}
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(() => {
              const stats = getCustomerStats(selectedCustomer.id);

              return (
                <div className="space-y-6 mt-6 text-xs text-[#403830]">
                  {/* Notes if any */}
                  {selectedCustomer.notes && (
                    <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#DDD3C4]">
                      <span className="font-semibold text-[#1A1716] block mb-0.5">
                        Style Preferences & Atelier Notes:
                      </span>
                      <p className="text-[#554C41] italic">“{selectedCustomer.notes}”</p>
                    </div>
                  )}

                  {/* Measurement profiles */}
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold text-sm text-[#1A1716]">
                      Saved Anatomical Profiles ({stats.profiles.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {stats.profiles.map((p) => (
                        <div key={p.id} className="p-3 bg-white rounded-xl border border-[#DFD6C7]">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-[#1A1716]">{p.name}</span>
                            <span className="text-[10px] capitalize text-[#7C7164]">
                              {p.clothingType}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[11px] text-[#635A4E]">
                            {Object.entries(p.measurements).slice(0, 4).map(([k, v]) => (
                              <div key={k}>
                                <span className="capitalize">{k}: </span>
                                <strong>{v}"</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complete Order History */}
                  <div className="space-y-2 pt-2">
                    <h4 className="font-serif font-bold text-sm text-[#1A1716]">
                      Lifetime Commission History ({stats.custOrders.length})
                    </h4>

                    {stats.custOrders.length === 0 ? (
                      <p className="p-4 text-center bg-white rounded-xl text-[#7C7164]">
                        No orders recorded yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {stats.custOrders.map((ord) => (
                          <div
                            key={ord.id}
                            className="p-3.5 bg-white rounded-xl border border-[#DFD6C7] flex items-center justify-between"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#6B1D2F]">
                                  #{ord.orderNumber}
                                </span>
                                <span className="font-semibold text-[#1A1716]">
                                  {ord.designName}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#7C7164] mt-0.5">
                                Ordered {ord.orderDate} · Delivery {ord.expectedDeliveryDate} · Status:{' '}
                                <strong className="text-[#1A1716] capitalize">
                                  {ord.status.replace('_', ' ')}
                                </strong>
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <span className="font-bold text-[#1A1716] block tabular-nums">
                                  ₹{ord.pricing.totalPrice.toLocaleString('en-IN')}
                                </span>
                                {ord.remainingAmount > 0 && (
                                  <span className="text-[10px] text-[#A84A1D]">
                                    Due: ₹{ord.remainingAmount.toLocaleString('en-IN')}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedCustomer(null);
                                  onSelectOrder(ord);
                                }}
                                className="px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#DDD3C4] text-[#1A1716] text-[11px] font-medium hover:bg-[#F3EFEA]"
                              >
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
