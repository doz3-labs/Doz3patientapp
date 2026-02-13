import React from 'react';
import { RefreshCcw, ChevronRight } from 'lucide-react';
import { NavigationContext } from '../App';

interface ActiveNeedsProps {
  navigation: NavigationContext;
}

export function ActiveNeeds({ navigation }: ActiveNeedsProps) {
  const refillItems = [
    { name: 'Metformin 500mg', qty: '60 tabs', price: 120 },
    { name: 'Telmisartan 40mg', qty: '30 tabs', price: 105 },
    { name: 'Shelcal 500mg', qty: '30 tabs', price: 88 },
    { name: 'Limcee Vit C', qty: '15 tabs', price: 19 },
  ];
  const total = refillItems.reduce((s, i) => s + i.price, 0);

  return (
    <section className="mt-6">
      <h2 className="text-lg text-gray-900 mb-3">Your Daily Essentials</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div>
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 text-[#0F4C81]" />
              Feb Monthly Refill
            </h3>
            <p className="text-xs text-[#EF4444] flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full"></span>
              Due in 3 days
            </p>
          </div>
          <span className="text-xs bg-blue-50 text-[#0F4C81] px-2 py-1 rounded-full">4 items</span>
        </div>

        {/* Items preview */}
        <div className="px-4 py-2 space-y-2">
          {refillItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-gray-700">{item.name} <span className="text-gray-400">({item.qty})</span></span>
              <span className="text-gray-900">₹{item.price}</span>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="px-4 pb-4 pt-2">
          <button 
            onClick={() => navigation.navigate('cart')}
            className="w-full bg-[#0F4C81] text-white py-3 rounded-xl text-sm hover:bg-[#0d3f6b] transition-colors flex items-center justify-center gap-2 active:scale-95"
          >
            Repeat Order
            <span className="text-white/80">(₹{total})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
