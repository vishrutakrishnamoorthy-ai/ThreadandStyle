import React from 'react';
import { Check, Clock, AlertCircle, Sparkles, CheckCircle2, User, Scissors } from 'lucide-react';
import {
  TailoringOrder,
  OrderStatus,
  ORDER_STATUS_ORDER,
  ORDER_STATUS_LABELS,
} from '../../types';

interface OrderTrackingTimelineProps {
  order: TailoringOrder;
  compact?: boolean;
}

export const OrderTrackingTimeline: React.FC<OrderTrackingTimelineProps> = ({ order, compact = false }) => {
  const currentIndex = ORDER_STATUS_ORDER.indexOf(order.status);

  if (compact) {
    return (
      <div className="w-full">
        {/* Compact stage bar */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-[#1A1716] capitalize">
            Stage: {ORDER_STATUS_LABELS[order.status]}
          </span>
          <span className="text-[#7C7164] font-medium tabular-nums">
            Step {currentIndex + 1} of 10
          </span>
        </div>

        <div className="w-full bg-[#EAE3D6] h-2 rounded-full overflow-hidden flex">
          {ORDER_STATUS_ORDER.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={stage}
                className={`h-full flex-1 border-r border-[#FAF7F2] last:border-0 ${
                  isCompleted
                    ? 'bg-[#2E6B4A]'
                    : isCurrent
                    ? 'bg-[#6B1D2F] animate-pulse'
                    : 'bg-[#E3DAD0]'
                }`}
                title={ORDER_STATUS_LABELS[stage]}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Status Banner */}
      <div className="p-4 sm:p-5 bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6B1D2F] animate-ping" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#6B1D2F]">
              Current Atelier Stage
            </span>
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#1A1716] mt-1">
            {ORDER_STATUS_LABELS[order.status]}
          </h3>
          <p className="text-xs text-[#5D5448] mt-1">
            Order #{order.orderNumber} · Expected Delivery: <strong className="text-[#1A1716]">{order.expectedDeliveryDate}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#3E3831] bg-[#F3ECE1] p-3 rounded-xl border border-[#E3DACB]">
          {order.tailorName ? (
            <div>
              <span className="text-[10px] text-[#7C7164] block">Master Craftsman</span>
              <span className="font-semibold text-[#1A1716]">{order.tailorName}</span>
            </div>
          ) : (
            <div>
              <span className="text-[10px] text-[#7C7164] block">Master Craftsman</span>
              <span className="text-[#7C7164] italic">Assignment pending</span>
            </div>
          )}
          <div className="border-l border-[#D5CABE] pl-3">
            <span className="text-[10px] text-[#7C7164] block">Payment</span>
            <span className="font-semibold text-[#2E6B4A] capitalize">
              {order.paymentStatus.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* 10-Stage Visual Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-[#DDD3C4]">
        {ORDER_STATUS_ORDER.map((statusKey, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          // Find if there is a recorded history log for this status
          const historyEntry = order.statusHistory?.find((h) => h.status === statusKey);

          return (
            <div key={statusKey} className="relative group">
              {/* Bullet Node */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-[#2E6B4A] text-white ring-4 ring-[#FAF7F2]'
                    : isCurrent
                    ? 'bg-[#6B1D2F] text-white ring-4 ring-[#FAF7F2] shadow-md scale-110'
                    : 'bg-[#E3DAD0] text-[#7C7164] ring-4 ring-[#FAF7F2]'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Status Card */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-white border-[#6B1D2F] shadow-sm ring-1 ring-[#6B1D2F]/20'
                    : isDone
                    ? 'bg-[#F9F6F0] border-[#E2D8CA]'
                    : 'bg-[#F4EFE6]/50 border-[#E8E1D5] opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#1A1716]">
                      {ORDER_STATUS_LABELS[statusKey]}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6B1D2F] text-white font-semibold uppercase">
                        In Progress
                      </span>
                    )}
                  </div>

                  {historyEntry && (
                    <span className="text-[11px] text-[#7C7164] tabular-nums">
                      {historyEntry.timestamp}
                    </span>
                  )}
                </div>

                {historyEntry ? (
                  <p className="text-xs text-[#5D5448] mt-1.5 leading-relaxed">
                    {historyEntry.note}
                    <span className="text-[#8C8275] ml-1">· by {historyEntry.updatedBy}</span>
                  </p>
                ) : (
                  <p className="text-xs text-[#8C8275] mt-1 italic">
                    {isPending ? 'Upcoming atelier phase' : 'Status reached'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
