import React, { useState } from 'react';
import {
  Scissors,
  Calendar,
  Ruler,
  CreditCard,
  Clock,
  ArrowRight,
  CheckCircle2,
  Package,
  Plus,
  Eye,
  X
} from 'lucide-react';
import {
  User,
  Customer,
  TailoringOrder,
  Appointment,
  MeasurementProfile,
  Design
} from '../../types';
import { OrderTrackingTimeline } from '../orders/OrderTrackingTimeline';
import { GarmentIllustration } from '../common/DesignIllustrations';

interface CustomerDashboardProps {
  currentUser: User;
  customer?: Customer;
  orders: TailoringOrder[];
  appointments: Appointment[];
  measurementProfiles: MeasurementProfile[];
  recentDesigns: Design[];
  onStartNewOrder: () => void;
  onBookAppointment: () => void;
  onNavigateToMeasurements: () => void;
  onPayBalance: (orderId: string, amount: number) => void;
  selectedOrderId?: string | null;
}

export const CustomerDashboardPage: React.FC<CustomerDashboardProps> = ({
  currentUser,
  customer,
  orders,
  appointments,
  measurementProfiles,
  recentDesigns,
  onStartNewOrder,
  onBookAppointment,
  onNavigateToMeasurements,
  onPayBalance,
  selectedOrderId,
}) => {
  const [activeOrderModal, setActiveOrderModal] = useState<TailoringOrder | null>(
    selectedOrderId ? orders.find((o) => o.id === selectedOrderId) || null : null
  );
  const [payModalOrder, setPayModalOrder] = useState<TailoringOrder | null>(null);
  const [payAmount, setPayAmount] = useState<number>(0);

  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const pastOrders = orders.filter((o) => o.status === 'delivered');
  const upcomingAppointments = appointments.filter((a) => a.status === 'scheduled');
  const pendingPaymentsOrders = orders.filter((o) => o.remainingAmount > 0);

  const openPayModal = (order: TailoringOrder) => {
    setPayModalOrder(order);
    setPayAmount(order.remainingAmount);
  };

  const handleConfirmPayment = () => {
    if (payModalOrder && payAmount > 0) {
      onPayBalance(payModalOrder.id, payAmount);
      setPayModalOrder(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#DFD6C7] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
            Customer Atelier Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-sm text-[#5C5347] mt-1 max-w-xl">
            Track your bespoke garments in real time, view saved measurement parameters, and reserve atelier trial consultations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onStartNewOrder}
            className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Scissors className="w-4 h-4" />
            <span>Create New Order</span>
          </button>
          <button
            onClick={onBookAppointment}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#D5CABE] text-[#332D27] text-xs font-medium hover:bg-[#F3EFEA] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#6B1D2F]" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-white rounded-2xl border border-[#DFD6C7] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#6B1D2F] shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#7C7164]">Active Outfits</span>
            <p className="font-serif font-bold text-2xl text-[#1A1716] tabular-nums mt-0.5">
              {activeOrders.length}
            </p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#DFD6C7] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#8A5C22] shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#7C7164]">Upcoming Appointments</span>
            <p className="font-serif font-bold text-2xl text-[#1A1716] tabular-nums mt-0.5">
              {upcomingAppointments.length}
            </p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#DFD6C7] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#2E6B4A] shrink-0">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#7C7164]">Saved Profiles</span>
            <p className="font-serif font-bold text-2xl text-[#1A1716] tabular-nums mt-0.5">
              {measurementProfiles.length}
            </p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#DFD6C7] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#6B1D2F] shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#7C7164]">Pending Balance</span>
            <p className="font-serif font-bold text-2xl text-[#1A1716] tabular-nums mt-0.5">
              ₹
              {pendingPaymentsOrders
                .reduce((sum, o) => sum + o.remainingAmount, 0)
                .toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Active Orders with 10-Stage Timeline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1716]">Active Orders & Timeline</h2>
            <p className="text-xs text-[#6B6154]">Live status tracking from master pattern to final pickup</p>
          </div>
          <span className="text-xs font-semibold text-[#6B1D2F]">{activeOrders.length} In Progress</span>
        </div>

        {activeOrders.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-[#E3DACB]">
            <Package className="w-10 h-10 mx-auto text-[#CCC3B4] mb-2" />
            <p className="font-serif text-base text-[#1A1716]">No active tailoring orders right now</p>
            <p className="text-xs text-[#7A7063] mt-1">Design a customized outfit or explore our catalogue.</p>
            <button
              onClick={onStartNewOrder}
              className="mt-4 px-4 py-2 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322]"
            >
              Start Custom Design
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FAF7F2] rounded-2xl border border-[#DFD6C7] p-5 sm:p-6 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D7] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#6B1D2F]">
                        #{order.orderNumber}
                      </span>
                      <span className="text-xs text-[#7C7164]">·</span>
                      <h3 className="font-serif font-bold text-lg text-[#1A1716]">
                        {order.designName}
                      </h3>
                      {order.priority === 'urgent' && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#FBEBEB] text-[#8B2626] font-semibold uppercase">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B6154] mt-0.5">
                      {order.customSpecs.neckline} Neck · {order.customSpecs.sleeve} Sleeve · Fabric:{' '}
                      {order.customSpecs.fabricName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {order.remainingAmount > 0 && (
                      <button
                        onClick={() => openPayModal(order)}
                        className="px-3 py-1.5 rounded-lg border border-[#6B1D2F] text-[#6B1D2F] text-xs font-semibold hover:bg-[#6B1D2F] hover:text-white transition-colors cursor-pointer"
                      >
                        Pay ₹{order.remainingAmount.toLocaleString('en-IN')}
                      </button>
                    )}

                    <button
                      onClick={() => setActiveOrderModal(order)}
                      className="px-3.5 py-1.5 rounded-lg bg-white border border-[#D5CABE] text-[#1A1716] text-xs font-medium hover:bg-[#F3EFEA] flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Timeline</span>
                    </button>
                  </div>
                </div>

                {/* Compact 10-stage timeline bar */}
                <OrderTrackingTimeline order={order} compact />

                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B6154] pt-2">
                  <div className="flex items-center gap-4">
                    <span>
                      Delivery: <strong className="text-[#1A1716]">{order.expectedDeliveryDate}</strong>
                    </span>
                    {order.tailorName && (
                      <span>
                        Tailor: <strong className="text-[#1A1716]">{order.tailorName}</strong>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span>
                      Total: <strong className="text-[#1A1716] tabular-nums">₹{order.pricing.totalPrice.toLocaleString('en-IN')}</strong>
                    </span>
                    <span>
                      Advance Paid:{' '}
                      <strong className="text-[#2E6B4A] tabular-nums">₹{order.advancePaid.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Grid: Upcoming Appointments & Saved Measurements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1A1716]">Upcoming Atelier Appointments</h3>
              <p className="text-xs text-[#7C7164]">Trial fittings and bespoke consultations</p>
            </div>
            <button
              onClick={onBookAppointment}
              className="text-xs font-semibold text-[#6B1D2F] hover:underline"
            >
              + Book New
            </button>
          </div>

          {upcomingAppointments.length === 0 ? (
            <p className="text-xs text-[#7C7164] py-8 text-center bg-white/60 rounded-xl">
              No appointments scheduled. Need a trial fitting? Book an appointment anytime.
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-3.5 bg-white rounded-xl border border-[#DFD6C7] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#1A1716] capitalize block">
                      {apt.type.replace('_', ' ')}
                    </span>
                    <p className="text-[11px] text-[#7C7164] mt-0.5">
                      {apt.date} · {apt.timeSlot}
                    </p>
                    {apt.notes && <p className="text-[11px] text-[#554C41] mt-1 italic">“{apt.notes}”</p>}
                  </div>
                  <span className="text-[11px] font-semibold text-[#2E6B4A] bg-[#EFF8F2] px-2 py-0.5 rounded border border-[#CDE5D5]">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Measurement Profiles */}
        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1A1716]">Saved Measurements</h3>
              <p className="text-xs text-[#7C7164]">Your personal fit parameters</p>
            </div>
            <button
              onClick={onNavigateToMeasurements}
              className="text-xs font-semibold text-[#6B1D2F] hover:underline"
            >
              Manage Vault →
            </button>
          </div>

          <div className="space-y-3">
            {measurementProfiles.slice(0, 3).map((m) => (
              <div key={m.id} className="p-3.5 bg-white rounded-xl border border-[#DFD6C7] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1A1716]">{m.name}</span>
                    {m.isDefault && (
                      <span className="text-[10px] bg-[#F6ECEE] text-[#6B1D2F] px-1.5 py-0.2 rounded font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#7C7164] capitalize mt-0.5">
                    {m.clothingType} · Bust: {m.measurements.bust || '-'}, Waist: {m.measurements.waist || '-'} ({m.unit})
                  </p>
                </div>
                <button
                  onClick={onNavigateToMeasurements}
                  className="text-xs text-[#6B1D2F] font-medium hover:underline"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details Modal with 10-Stage Timeline */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
              <div>
                <span className="text-xs font-bold text-[#6B1D2F] uppercase">
                  Order Tracking
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1A1716]">
                  {activeOrderModal.orderNumber} – {activeOrderModal.designName}
                </h3>
              </div>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716] hover:bg-[#EFE9DF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Comprehensive visual timeline */}
              <OrderTrackingTimeline order={activeOrderModal} />

              {/* Order specifications summary */}
              <div className="p-4 bg-white rounded-xl border border-[#DFD6C7] space-y-2 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#1A1716]">Craftsmanship Specifications</h4>
                <div className="grid grid-cols-2 gap-2 text-[#5A5146] pt-1">
                  <div>Neckline: <strong className="text-[#1A1716]">{activeOrderModal.customSpecs.neckline}</strong></div>
                  <div>Sleeve: <strong className="text-[#1A1716]">{activeOrderModal.customSpecs.sleeve}</strong></div>
                  <div>Back: <strong className="text-[#1A1716]">{activeOrderModal.customSpecs.back}</strong></div>
                  <div>Fabric: <strong className="text-[#1A1716]">{activeOrderModal.customSpecs.fabricName}</strong></div>
                  <div>Embroidery: <strong className="text-[#1A1716]">{activeOrderModal.customSpecs.embroidery}</strong></div>
                  <div>Length: <strong className="text-[#1A1716]">{activeOrderModal.customSpecs.garmentLength}</strong></div>
                </div>
                {activeOrderModal.customSpecs.specialInstructions && (
                  <p className="mt-2 text-[#5A5146] italic border-t pt-2">
                    Note: “{activeOrderModal.customSpecs.specialInstructions}”
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mock Payment Settlement Modal */}
      {payModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-md w-full shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#6B1D2F]" />
                <h3 className="font-serif font-bold text-lg text-[#1A1716]">Settle Balance</h3>
              </div>
              <button onClick={() => setPayModalOrder(null)} className="p-1 text-[#7C7164]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs text-[#403830]">
              <p>
                Settle payment for <strong>{payModalOrder.orderNumber}</strong> ({payModalOrder.designName}).
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#E3DACB] flex justify-between">
                <span>Remaining Balance:</span>
                <span className="font-bold text-[#6B1D2F] tabular-nums">
                  ₹{payModalOrder.remainingAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Amount to Pay (INR)</label>
                <input
                  type="number"
                  min="1"
                  max={payModalOrder.remainingAmount}
                  value={payAmount}
                  onChange={(e) => setPayAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-sm font-semibold tabular-nums"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1D5]">
              <button
                type="button"
                onClick={() => setPayModalOrder(null)}
                className="px-4 py-2 rounded-xl border border-[#D5CABE] text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="px-5 py-2 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322]"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
