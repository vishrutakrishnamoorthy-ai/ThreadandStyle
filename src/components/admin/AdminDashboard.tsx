import React from 'react';
import {
  TrendingUp,
  Package,
  Calendar,
  AlertTriangle,
  Users,
  CreditCard,
  Scissors,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye
} from 'lucide-react';
import {
  TailoringOrder,
  Customer,
  Fabric,
  Appointment,
  PaymentRecord,
  Tailor,
  Design,
  OrderStatus,
  ORDER_STATUS_LABELS
} from '../../types';

interface AdminDashboardProps {
  orders: TailoringOrder[];
  customers: Customer[];
  fabrics: Fabric[];
  appointments: Appointment[];
  payments: PaymentRecord[];
  tailors: Tailor[];
  designs: Design[];
  onSelectOrder: (order: TailoringOrder) => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  customers,
  fabrics,
  appointments,
  payments,
  tailors,
  designs,
  onSelectOrder,
  onNavigateTab,
}) => {
  // Aggregate Metrics
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const completedOrders = orders.filter((o) => o.status === 'delivered');
  const pendingOrders = orders.filter((o) => o.status === 'order_placed');
  const totalPendingBalance = orders.reduce((sum, o) => sum + o.remainingAmount, 0);
  const lowStockFabrics = fabrics.filter((f) => f.quantityMeters <= f.lowStockThreshold);

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter((a) => a.date === todayStr);

  // Category breakdown
  const categoryCount: Record<string, number> = {};
  orders.forEach((o) => {
    categoryCount[o.clothingType] = (categoryCount[o.clothingType] || 0) + 1;
  });

  // Status breakdown
  const statusCount: Record<string, number> = {};
  orders.forEach((o) => {
    statusCount[o.status] = (statusCount[o.status] || 0) + 1;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
            Master Management Console
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
            Atelier Executive Overview
          </h1>
          <p className="text-sm text-[#554C41] mt-1">
            Real-time business performance, artisan workloads, inventory alerts, and order progression.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('admin_orders')}
            className="px-4 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] shadow-xs cursor-pointer"
          >
            Manage All Orders
          </button>
          <button
            onClick={() => onNavigateTab('admin_fabrics')}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#D5CABE] text-[#1A1716] text-xs font-medium hover:bg-[#F3EFEA] cursor-pointer"
          >
            Fabric Stock
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-white rounded-2xl border border-[#DFD6C7]">
          <div className="flex items-center justify-between text-[#7C7164]">
            <span className="text-xs font-medium">Total Revenue Recorded</span>
            <TrendingUp className="w-4 h-4 text-[#2E6B4A]" />
          </div>
          <p className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1716] tabular-nums mt-2">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-[#2E6B4A] font-semibold mt-1 block">
            {payments.length} verified receipts
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#DFD6C7]">
          <div className="flex items-center justify-between text-[#7C7164]">
            <span className="text-xs font-medium">Active Tailoring Orders</span>
            <Scissors className="w-4 h-4 text-[#6B1D2F]" />
          </div>
          <p className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1716] tabular-nums mt-2">
            {activeOrders.length}
          </p>
          <span className="text-[11px] text-[#7C7164] mt-1 block">
            {completedOrders.length} delivered · {pendingOrders.length} queued
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#DFD6C7]">
          <div className="flex items-center justify-between text-[#7C7164]">
            <span className="text-xs font-medium">Pending Client Balance</span>
            <CreditCard className="w-4 h-4 text-[#A84A1D]" />
          </div>
          <p className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1716] tabular-nums mt-2">
            ₹{totalPendingBalance.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-[#A84A1D] font-medium mt-1 block">
            Across {orders.filter((o) => o.remainingAmount > 0).length} active orders
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#DFD6C7]">
          <div className="flex items-center justify-between text-[#7C7164]">
            <span className="text-xs font-medium">Total Registered Patrons</span>
            <Users className="w-4 h-4 text-[#8A5C22]" />
          </div>
          <p className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1716] tabular-nums mt-2">
            {customers.length}
          </p>
          <button
            onClick={() => onNavigateTab('admin_customers')}
            className="text-[11px] text-[#6B1D2F] font-semibold mt-1 hover:underline block text-left"
          >
            View customer directories →
          </button>
        </div>
      </div>

      {/* Low Stock Warning Banner if any */}
      {lowStockFabrics.length > 0 && (
        <div className="p-4 bg-[#FFF8F4] border border-[#F0D5C3] rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#C25227] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#8C3413]">
                {lowStockFabrics.length} Fabric Lots Dipped Below Reorder Threshold:
              </p>
              <p className="text-xs text-[#6F4735] mt-0.5">
                {lowStockFabrics.map((f) => `${f.name} (${f.quantityMeters}m remaining)`).join(', ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('admin_fabrics')}
            className="px-3.5 py-1.5 rounded-lg bg-[#C25227] text-white text-xs font-semibold hover:bg-[#A33F19] shrink-0"
          >
            Restock Inventory
          </button>
        </div>
      )}

      {/* Analytics Charts & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Silhouette Distribution Chart */}
        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7] space-y-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1A1716]">Orders by Silhouette</h3>
            <p className="text-xs text-[#7C7164]">Distribution across clothing lines</p>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(categoryCount).map(([type, count]) => {
              const pct = Math.round((count / orders.length) * 100);
              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-xs text-[#403830]">
                    <span className="capitalize font-medium">{type}</span>
                    <span className="font-semibold tabular-nums">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#EAE3D6] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#6B1D2F] h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Pipeline Health */}
        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7] space-y-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1A1716]">Pipeline Status Funnel</h3>
            <p className="text-xs text-[#7C7164]">Current orders across 10 stages</p>
          </div>

          <div className="space-y-2 text-xs">
            {Object.entries(statusCount).map(([statusKey, count]) => (
              <div
                key={statusKey}
                className="p-2.5 bg-white rounded-xl border border-[#E3DACB] flex items-center justify-between"
              >
                <span className="font-medium text-[#1A1716]">
                  {(ORDER_STATUS_LABELS as Record<string, string>)[statusKey] || statusKey}
                </span>
                <span className="font-bold text-[#6B1D2F] px-2 py-0.5 rounded bg-[#FAF2F4] tabular-nums">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Master Craftsmen Workload */}
        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C7] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1A1716]">Tailor Capacity</h3>
              <p className="text-xs text-[#7C7164]">Active garment assignments</p>
            </div>
            <button
              onClick={() => onNavigateTab('admin_tailors')}
              className="text-xs font-semibold text-[#6B1D2F] hover:underline"
            >
              All Artisans →
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {tailors.map((t) => (
              <div key={t.id} className="p-3 bg-white rounded-xl border border-[#DFD6C7] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-[#1A1716]">{t.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      t.status === 'available'
                        ? 'bg-[#EFF8F2] text-[#2E6B4A]'
                        : 'bg-[#FFF6E9] text-[#A0601B]'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#7C7164]">
                  <span>Workload: {t.activeWorkload} outfits</span>
                  <span>{t.experienceYears}y exp · ★ {t.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#DFD6C7] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#1A1716]">Recent Tailoring Orders</h3>
            <p className="text-xs text-[#7C7164]">Latest bespoke requests received in the atelier</p>
          </div>
          <button
            onClick={() => onNavigateTab('admin_orders')}
            className="text-xs font-semibold text-[#6B1D2F] hover:underline"
          >
            Open Order Manager →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#403830]">
            <thead>
              <tr className="border-b border-[#E3DACB] text-[11px] uppercase tracking-wider text-[#7C7164]">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Design & Garment</th>
                <th className="py-3 px-3">Delivery Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Total / Balance</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D7]">
              {orders.slice(0, 7).map((order) => (
                <tr key={order.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#6B1D2F]">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-3 font-medium text-[#1A1716]">
                    {order.customerName}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold block">{order.designName}</span>
                    <span className="text-[11px] text-[#7C7164] capitalize">{order.clothingType}</span>
                  </td>
                  <td className="py-3 px-3 tabular-nums">
                    {order.expectedDeliveryDate}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EFE9DF] text-[#4A4237] font-semibold">
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="py-3 px-3 tabular-nums">
                    <span className="font-semibold block">₹{order.pricing.totalPrice.toLocaleString('en-IN')}</span>
                    {order.remainingAmount > 0 ? (
                      <span className="text-[10px] text-[#A84A1D]">Due: ₹{order.remainingAmount.toLocaleString('en-IN')}</span>
                    ) : (
                      <span className="text-[10px] text-[#2E6B4A]">Paid in Full</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectOrder(order)}
                      className="px-3 py-1 rounded-lg bg-white border border-[#D5CABE] text-[#1A1716] font-medium hover:bg-[#F3EFEA] inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
