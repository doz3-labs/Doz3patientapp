import React from 'react';
import { ShoppingBag, Package, Heart, History } from 'lucide-react';
import { NavigationContext } from '../App';

interface QuickActionsProps {
  navigation: NavigationContext;
}

export function QuickActions({ navigation }: QuickActionsProps) {
  const actions = [
    {
      id: 'shop',
      label: 'Browse Shop',
      icon: ShoppingBag,
      color: '#0F4C81',
      onClick: () => navigation.navigate('shop')
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: Package,
      color: '#10B981',
      onClick: () => navigation.navigate('orders')
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      color: '#EF4444',
      onClick: () => navigation.navigate('shop')
    },
    {
      id: 'history',
      label: 'Order Again',
      icon: History,
      color: '#F59E0B',
      onClick: () => navigation.navigate('orders')
    }
  ];

  return (
    <section className="mt-6">
      <h2 className="text-lg text-gray-900 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="flex flex-col items-center gap-2 bg-white rounded-2xl p-3 shadow-sm border border-gray-200 hover:shadow-md transition-all active:scale-95"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${action.color}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: action.color }} />
              </div>
              <span className="text-xs text-gray-700 text-center leading-tight">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
