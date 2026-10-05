import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Edit,
  Scissors,
  UserCheck,
  CreditCard,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  TailoringOrder,
  OrderStatus,
  ORDER_STATUS_ORDER,
  ORDER_STATUS_LABELS,
  Tailor,
  PaymentRecord
} from '../../types';
import { OrderTrackingTimeline } from '../orders/OrderTrackingTimeline';

interface AdminOrdersManagerProps {
  orders: TailoringOrder[];
  tailors: Tailor[];
  onUpdateStatus: (orderId: string, status: OrderStatus, note: string) => void;
  onAssignTailor: (orderId: string, tailorId: string) => void;
  onRecordPayment: (orderId: string, amount: number, method: PaymentRecord['paymentMethod']) => void;
}

export const AdminOrdersManager: React.FC<AdminOrdersManagerProps> = ({
  orders,
  tailors,
  onUpdateStatus,
  onAssignTailor,
  onRecordPayment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const [inspectOrder, setInspectOrder] = useState<TailoringOrder | null>(null);
  const [statusUpdateModalOrder, setStatusUpdateModalOrder] = useState<TailoringOrder | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('cutting');
  const [statusNote, setStatusNote] = useState<string>('');

  const [assignModalOrder, setAssignModalOrder] = useState<TailoringOrder | null>(null);
  const [selectedTailorId, setSelectedTailorId] = useState<string>('');

  const [paymentModalOrder, setPaymentModalOrder] = useState<TailoringOrder | null>(null);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [payMethod, setPayMethod] = useState<PaymentRecord['paymentMethod']>('UPI / GPay');

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.designName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || o.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (statusUpdateModalOrder) {
      onUpdateStatus(statusUpdateModalOrder.id, newStatus, statusNote);
      setStatusUpdateModalOrder(null);
      setStatusNote('');
    }
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignModalOrder && selectedTailorId) {
      onAssignTailor(assignModalOrder.id, selectedTailorId);
      setAssignModalOrder(null);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentModalOrder && payAmount > 0) {
      onRecordPayment(paymentModalOrder.id, payAmount, payMethod);
      setPaymentModalOrder(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
          Boutique Operations
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
          Tailoring Orders & Workflows
        </h1>
        <p className="text-sm text-[#554C41] mt-1 max-w-2xl">
          Supervise cutting, stitching, and trial workflows across all active commissions. Advance garment phases and assign master tailors.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white rounded-2xl border border-[#DFD6C7] flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C7164]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer, phone, or design..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-xs text-[#1A1716]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#7C7164]">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C4] text-xs font-medium text-[#1A1716]"
            >
              <option value="all">All 10 Stages</option>
              {ORDER_STATUS_ORDER.map((st) => (
                <option key={st} value={st}>
                  {ORDER_STATUS_LABELS[st]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#7C7164]">
            <span>Payment:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C4] text-xs font-medium text-[#1A1716]"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="advance_paid">Advance Paid</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="fully_paid">Fully Paid</option>
            </select>
          </div>

          <span className="text-xs text-[#7C7164] font-medium">
            {filteredOrders.length} orders
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#DFD6C7] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#403830]">
            <thead>
              <tr className="border-b border-[#E3DACB] bg-[#F4EFE6] text-[11px] uppercase tracking-wider text-[#7C7164]">
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Garment Specs</th>
                <th className="py-3.5 px-4">Assigned Tailor</th>
                <th className="py-3.5 px-4">Target Delivery</th>
                <th className="py-3.5 px-4">Status Stage</th>
                <th className="py-3.5 px-4">Financials</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D7]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#7C7164]">
                    No tailoring orders match your query.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-[#6B1D2F] block">
                        {order.orderNumber}
                      </span>
                      <span className="text-[10px] text-[#7C7164]">{order.orderDate}</span>
                      {order.priority === 'urgent' && (
                        <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded bg-[#FBEBEB] text-[#8B2626] font-bold uppercase">
                          Urgent
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#1A1716] block">{order.customerName}</span>
                      <span className="text-[10px] text-[#7C7164]">{order.customerPhone}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#1A1716] block truncate max-w-[180px]">
                        {order.designName}
                      </span>
                      <span className="text-[10px] text-[#7C7164]">
                        {order.customSpecs.neckline} · {order.customSpecs.sleeve} · {order.customSpecs.fabricName}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {order.tailorName ? (
                        <span className="font-medium text-[#1A1716] flex items-center gap-1">
                          <Scissors className="w-3 h-3 text-[#6B1D2F]" />
                          <span>{order.tailorName}</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setAssignModalOrder(order);
                            setSelectedTailorId(tailors[0]?.id || '');
                          }}
                          className="text-[11px] font-semibold text-[#6B1D2F] hover:underline"
                        >
                          + Assign Craftsman
                        </button>
                      )}
                    </td>

                    <td className="py-3.5 px-4 tabular-nums">
                      <span className="font-semibold block">{order.expectedDeliveryDate}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => {
                          setStatusUpdateModalOrder(order);
                          setNewStatus(order.status);
                          setStatusNote('');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#D5CABE] text-[#1A1716] font-semibold hover:border-[#6B1D2F] transition-colors flex items-center gap-1 cursor-pointer"
                        title="Click to advance status"
                      >
                        <span>{ORDER_STATUS_LABELS[order.status]}</span>
                        <Edit className="w-3 h-3 text-[#7C7164]" />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 tabular-nums">
                      <span className="font-semibold block">₹{order.pricing.totalPrice.toLocaleString('en-IN')}</span>
                      {order.remainingAmount > 0 ? (
                        <button
                          onClick={() => {
                            setPaymentModalOrder(order);
                            setPayAmount(order.remainingAmount);
                          }}
                          className="text-[10px] text-[#A84A1D] hover:underline font-semibold"
                        >
                          Due: ₹{order.remainingAmount.toLocaleString('en-IN')} (Settle)
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#2E6B4A] font-semibold">Fully Settled</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setAssignModalOrder(order);
                            setSelectedTailorId(order.tailorId || tailors[0]?.id || '');
                          }}
                          className="p-1.5 rounded-lg border border-[#D5CABE] bg-white text-[#554C41] hover:text-[#1A1716]"
                          title="Assign Tailor"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setInspectOrder(order)}
                          className="p-1.5 rounded-lg bg-[#6B1D2F] text-white hover:bg-[#521322]"
                          title="View Full Spec & Timeline"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Modal */}
      {inspectOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
              <div>
                <span className="text-xs uppercase text-[#6B1D2F] font-bold">
                  Boutique Commission Spec
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1A1716]">
                  {inspectOrder.orderNumber} – {inspectOrder.designName}
                </h3>
              </div>
              <button
                onClick={() => setInspectOrder(null)}
                className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Timeline */}
              <OrderTrackingTimeline order={inspectOrder} />

              {/* Measurement Profile snapshot */}
              <div className="p-4 bg-white rounded-xl border border-[#DFD6C7] space-y-2 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#1A1716]">
                  Measurement Parameters Snapshot ({inspectOrder.measurementProfileName})
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1 text-[#4A4237]">
                  {Object.entries(inspectOrder.measurementSnapshot).map(([k, v]) => (
                    <div key={k} className="p-1.5 bg-[#FAF7F2] rounded border">
                      <span className="capitalize text-[#7C7164] block">{k}:</span>
                      <strong className="text-[#1A1716] tabular-nums">{v}"</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advance Order Status Modal */}
      {statusUpdateModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-md w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
              <h3 className="font-serif font-bold text-lg text-[#1A1716]">Update Order Status</h3>
              <button onClick={() => setStatusUpdateModalOrder(null)} className="p-1 text-[#7C7164]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStatusSubmit} className="space-y-4 mt-4 text-xs">
              <p className="text-[#554C41]">
                Order <strong>{statusUpdateModalOrder.orderNumber}</strong> ({statusUpdateModalOrder.designName})
              </p>

              <div>
                <label className="font-semibold block mb-1">Select New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-semibold"
                >
                  {ORDER_STATUS_ORDER.map((st) => (
                    <option key={st} value={st}>
                      {ORDER_STATUS_LABELS[st]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Audit Note (visible to client)</label>
                <textarea
                  rows={2}
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Master pattern finalized, hand embroidery begun by Ustad Mumtaz..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1D5]">
                <button
                  type="button"
                  onClick={() => setStatusUpdateModalOrder(null)}
                  className="px-4 py-2 rounded-xl border border-[#D5CABE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6B1D2F] text-white font-semibold hover:bg-[#521322]"
                >
                  Confirm & Notify Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Tailor Modal */}
      {assignModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-md w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
              <h3 className="font-serif font-bold text-lg text-[#1A1716]">Assign Master Tailor</h3>
              <button onClick={() => setAssignModalOrder(null)} className="p-1 text-[#7C7164]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4 mt-4 text-xs">
              <p className="text-[#554C41]">
                Assign order <strong>{assignModalOrder.orderNumber}</strong> ({assignModalOrder.designName})
              </p>

              <div>
                <label className="font-semibold block mb-1">Select Tailor</label>
                <select
                  value={selectedTailorId}
                  onChange={(e) => setSelectedTailorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-semibold"
                >
                  {tailors.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (Active: {t.activeWorkload} outfits | {t.specialization.join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1D5]">
                <button
                  type="button"
                  onClick={() => setAssignModalOrder(null)}
                  className="px-4 py-2 rounded-xl border border-[#D5CABE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6B1D2F] text-white font-semibold hover:bg-[#521322]"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {paymentModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-md w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
              <h3 className="font-serif font-bold text-lg text-[#1A1716]">Record Client Payment</h3>
              <button onClick={() => setPaymentModalOrder(null)} className="p-1 text-[#7C7164]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4 mt-4 text-xs">
              <p className="text-[#554C41]">
                Remaining balance for <strong>{paymentModalOrder.orderNumber}</strong>:{' '}
                <strong className="text-[#6B1D2F]">
                  ₹{paymentModalOrder.remainingAmount.toLocaleString('en-IN')}
                </strong>
              </p>

              <div>
                <label className="font-semibold block mb-1">Settlement Amount (INR)</label>
                <input
                  type="number"
                  min="1"
                  max={paymentModalOrder.remainingAmount}
                  value={payAmount}
                  onChange={(e) => setPayAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-semibold tabular-nums"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Payment Method</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-medium"
                >
                  <option value="UPI / GPay">UPI / Google Pay</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Cash at Boutique">Cash at Boutique Desk</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1D5]">
                <button
                  type="button"
                  onClick={() => setPaymentModalOrder(null)}
                  className="px-4 py-2 rounded-xl border border-[#D5CABE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2E6B4A] text-white font-semibold hover:bg-[#23563a]"
                >
                  Record Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
