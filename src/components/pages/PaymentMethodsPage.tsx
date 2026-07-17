import React from 'react';
import { NavigationContext } from '../../App';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Plus, Check } from 'lucide-react';

interface PaymentMethodsPageProps {
  navigation: NavigationContext;
}

export function PaymentMethodsPage({ navigation }: PaymentMethodsPageProps) {
  const paymentMethods = [
    {
      id: '1',
      type: 'UPI',
      icon: Smartphone,
      label: 'rajesh@okicici',
      subtitle: 'UPI ID',
      isDefault: true,
      color: '#0F4C81',
      bgColor: 'bg-blue-50',
    },
    {
      id: '2',
      type: 'Debit Card',
      icon: CreditCard,
      label: 'ICICI Bank •••• 4521',
      subtitle: 'Debit Card · Expires 09/27',
      isDefault: false,
      color: '#0F4C81',
      bgColor: 'bg-blue-50',
    },
    {
      id: '3',
      type: 'Credit Card',
      icon: CreditCard,
      label: 'HDFC Bank •••• 8834',
      subtitle: 'Credit Card · Expires 12/28',
      isDefault: false,
      color: '#0F4C81',
      bgColor: 'bg-blue-50',
    },
    {
      id: '4',
      type: 'Wallet',
      icon: Wallet,
      label: 'DOZ3 Wallet',
      subtitle: 'Balance: ₹250',
      isDefault: false,
      color: '#10B981',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-[64px] z-30 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigation.navigate('profile')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl text-gray-900">Payment Methods</h1>
          </div>
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="px-4 pt-4 space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              className={`bg-white rounded-2xl shadow-sm border p-4 ${
                method.isDefault ? 'border-[#0F4C81] border-2' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${method.bgColor}`}
                >
                  <Icon className="w-6 h-6" style={{ color: method.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900">{method.label}</h3>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 bg-[#0F4C81] text-white text-[10px] rounded-full font-medium flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{method.subtitle}</p>
                </div>
                <div className="text-xs text-gray-400 font-medium bg-gray-50 px-2.5 py-1 rounded-lg">
                  {method.type}
                </div>
              </div>
            </div>
          );
        })}

        {/* DOZ3 Wallet Highlight */}
        <div className="bg-gradient-to-r from-[#10B981] to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/80 mb-1">DOZ3 Wallet Balance</p>
              <p className="text-2xl font-bold">₹250.00</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
          <button className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl text-sm font-medium transition-colors active:scale-95">
            Add Money to Wallet
          </button>
        </div>

        {/* Add New Payment Method */}
        <button className="w-full bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-4 flex items-center justify-center gap-2 text-[#0F4C81] hover:bg-blue-50 hover:border-[#0F4C81] transition-colors active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Add New Payment Method</span>
        </button>
      </div>
    </div>
  );
}
