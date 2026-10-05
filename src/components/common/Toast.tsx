import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-start gap-3 transition-all animate-in slide-in-from-bottom duration-200 ${
            toast.type === 'success'
              ? 'bg-[#FAF8F5] border-[#2E6B4A]/30 text-[#1A1716]'
              : toast.type === 'error'
              ? 'bg-[#FAF8F5] border-[#8B2626]/30 text-[#1A1716]'
              : 'bg-[#FAF8F5] border-[#6B1D2F]/30 text-[#1A1716]'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#2E6B4A] shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#8B2626] shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#6B1D2F] shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-xs text-[#1A1716] leading-tight">{toast.title}</h4>
            <p className="text-[11px] text-[#554C41] mt-0.5 leading-snug">{toast.message}</p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-[#8C8275] hover:text-[#1A1716] rounded-lg shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
