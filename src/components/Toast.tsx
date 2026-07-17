import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { Check } from 'lucide-react';

interface ToastMessage {
  id: number;
  text: string;
}

interface ToastContextType {
  showToast: (text: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none max-w-[400px] w-full px-4">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="bg-[#10B981] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slideDown text-sm font-medium"
          >
            <Check className="w-4 h-4 flex-shrink-0" />
            {toast.text}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </ToastContext.Provider>
  );
}
