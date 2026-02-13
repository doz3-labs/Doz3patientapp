import React, { useState } from 'react';
import { NavigationContext } from '../../App';
import { Package, ChevronRight, MapPin, Clock, RotateCcw } from 'lucide-react';

interface MyOrdersPageProps {
  navigation: NavigationContext;
}

export function MyOrdersPage({ navigation }: MyOrdersPageProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const activeOrders = [
    {
      id: 'ORD-2024',
      date: '10 Feb 2026',
      items: ['Glimepiride 1mg (30 tabs)', 'Metformin 500mg (60 tabs)', 'Telmisartan 40mg (30 tabs)'],
      status: 'Out for Delivery',
      total: 450,
      estimatedTime: 'Within 60 minutes',
      statusColor: '#10B981',
      doctor: 'Dr. Priya Sharma'
    },
    {
      id: 'ORD-2020',
      date: '8 Feb 2026',
      items: ['Accu-Chek Test Strips (50s)', 'Omron BP Monitor Cuff'],
      status: 'Processing',
      total: 950,
      estimatedTime: 'Within 60 minutes',
      statusColor: '#0F4C81'
    }
  ];

  const completedOrders = [
    {
      id: 'ORD-2010',
      date: '15 Jan 2026',
      items: ['Metformin 500mg (60 tabs)', 'Telmisartan 40mg (30 tabs)'],
      status: 'Delivered',
      total: 330,
      deliveredDate: '15 Jan 2026',
      doctor: 'Dr. Priya Sharma'
    },
    {
      id: 'ORD-1998',
      date: '10 Dec 2025',
      items: ['Metformin 500mg (30 tabs)', 'Shelcal 500mg', 'Becosules Z'],
      status: 'Delivered',
      total: 420,
      deliveredDate: '11 Dec 2025'
    },
    {
      id: 'ORD-1985',
      date: '25 Nov 2025',
      items: ['Omron BP Monitor HEM-7120', 'Accu-Chek Active Glucometer'],
      status: 'Delivered',
      total: 2500,
      deliveredDate: '28 Nov 2025'
    }
  ];

  const orders = activeTab === 'active' ? activeOrders : completedOrders;

  return (
    <div className="min-h-screen pb-6">
      {/* Tabs */}
      <div className="bg-white px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => { setActiveTab('active'); setSelectedOrder(null); }}
            className={`flex-1 py-2 rounded-lg transition-all text-sm ${
              activeTab === 'active'
                ? 'bg-white text-[#0F4C81] shadow-sm font-medium'
                : 'text-gray-600'
            }`}
          >
            Active ({activeOrders.length})
          </button>
          <button
            onClick={() => { setActiveTab('completed'); setSelectedOrder(null); }}
            className={`flex-1 py-2 rounded-lg transition-all text-sm ${
              activeTab === 'completed'
                ? 'bg-white text-[#0F4C81] shadow-sm font-medium'
                : 'text-gray-600'
            }`}
          >
            Completed ({completedOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 mt-4 space-y-3">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No orders found</p>
            <button
              onClick={() => navigation.navigate('shop')}
              className="bg-[#0F4C81] text-white px-6 py-3 rounded-xl"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id}>
              <button
                className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 text-left hover:shadow-md transition-all active:scale-[0.98]"
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base text-gray-900 mb-1">{order.id}</h3>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs ${
                    activeTab === 'active' ? 'text-white' : 'bg-gray-100 text-gray-600'
                  }`} style={activeTab === 'active' ? { backgroundColor: (order as any).statusColor } : {}}>
                    {order.status}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-700 mb-1">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {order.items.join(', ')}
                  </p>
                </div>

                {activeTab === 'active' && 'estimatedTime' in order && (
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                    <Clock className="w-4 h-4 text-[#0F4C81]" />
                    <span>Expected: {(order as any).estimatedTime}</span>
                  </div>
                )}

                {activeTab === 'completed' && 'deliveredDate' in order && (
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#10B981]" />
                    <span>Delivered on {(order as any).deliveredDate}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-base font-medium text-gray-900">₹{order.total}</p>
                  <div className="flex items-center gap-1 text-[#0F4C81] text-sm">
                    {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedOrder === order.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </button>

              {/* Expanded details */}
              {selectedOrder === order.id && (
                <div className="bg-gray-50 rounded-b-2xl -mt-2 pt-4 px-4 pb-4 border border-t-0 border-gray-200 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Items in this order:</p>
                    {order.items.map((item, i) => (
                      <p key={i} className="text-sm text-gray-700 py-1 border-b border-gray-100 last:border-b-0">
                        {i + 1}. {item}
                      </p>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => navigation.navigate('cart')}
                      className="flex-1 bg-[#0F4C81] text-white py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reorder
                    </button>
                    <button
                      onClick={() => navigation.navigate('home')}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm active:scale-95"
                    >
                      Need Help?
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
