import React from 'react';
import { X, Check, Bell, Calendar, CreditCard, Package, AlertTriangle } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onSelectOrder?: (orderId: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onSelectOrder,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-[#8A5C22]" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-[#2E6B4A]" />;
      case 'system':
        return <AlertTriangle className="w-4 h-4 text-[#A84A1D]" />;
      default:
        return <Package className="w-4 h-4 text-[#6B1D2F]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E5DDD0] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E1D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#6B1D2F]" />
            <h3 className="font-serif font-bold text-lg text-[#1A1716]">Atelier Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-[#7C7164] hover:text-[#1A1716] font-medium flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716] hover:bg-[#EFE9DF] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-[#7C7164]">
              <Bell className="w-10 h-10 mx-auto text-[#CCC3B4] mb-3 opacity-60" />
              <p className="text-sm font-medium">No notifications yet</p>
              <p className="text-xs text-[#9C9285] mt-1">Updates regarding your garments will appear here.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  if (!notif.read) onMarkAsRead(notif.id);
                  if (notif.linkOrderId && onSelectOrder) {
                    onSelectOrder(notif.linkOrderId);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-[#F6F1E8] border-[#E8E1D5] text-[#554D43]'
                    : 'bg-[#FFFDF9] border-[#6B1D2F]/30 shadow-xs text-[#1A1716]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EFE9DD] shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold truncate text-[#1A1716]">{notif.title}</p>
                      <span className="text-[10px] text-[#8C8275] shrink-0">{notif.createdAt}</span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed text-[#5A5146]">{notif.message}</p>
                    {notif.linkOrderId && (
                      <span className="inline-block mt-2 text-[11px] text-[#6B1D2F] font-semibold hover:underline">
                        View Order Details →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
