import React from 'react';
import { NavigationContext } from '../../App';
import { ArrowLeft, MapPin, Home, Briefcase, Users, Edit2, Trash2, Plus, Clock } from 'lucide-react';

interface AddressesPageProps {
  navigation: NavigationContext;
}

export function AddressesPage({ navigation }: AddressesPageProps) {
  const addresses = [
    {
      id: '1',
      type: 'Home',
      icon: Home,
      address: '123, 4th Main Road, Indiranagar, Bengaluru - 560038',
      isDefault: true,
    },
    {
      id: '2',
      type: 'Office',
      icon: Briefcase,
      address: 'WeWork, Embassy Golf Links, Koramangala, Bengaluru - 560034',
      isDefault: false,
    },
    {
      id: '3',
      type: 'Parents',
      icon: Users,
      address: '15, 5th Main, Jayanagar 4th Block, Bengaluru - 560041',
      isDefault: false,
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
            <h1 className="text-xl text-gray-900">Saved Addresses</h1>
          </div>
          <span className="px-2.5 py-1 bg-[#0F4C81] text-white text-xs rounded-full">
            {addresses.length}
          </span>
        </div>
      </div>

      {/* Delivery Info Banner */}
      <div className="px-4 pt-4">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">Express Delivery Available</p>
            <p className="text-xs text-green-600">Delivery within 60 minutes to all saved addresses</p>
          </div>
        </div>
      </div>

      {/* Address Cards */}
      <div className="px-4 pt-4 space-y-3">
        {addresses.map((addr) => {
          const Icon = addr.icon;
          return (
            <div
              key={addr.id}
              className={`bg-white rounded-2xl shadow-sm border p-4 ${
                addr.isDefault ? 'border-[#0F4C81] border-2' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  addr.isDefault ? 'bg-[#0F4C81]' : 'bg-blue-50'
                }`}>
                  <Icon className={`w-5 h-5 ${addr.isDefault ? 'text-white' : 'text-[#0F4C81]'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-900">{addr.type}</h3>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 bg-[#0F4C81] text-white text-[10px] rounded-full font-medium">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{addr.address}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 text-[#0F4C81] hover:bg-blue-100 transition-colors active:scale-95">
                  <Edit2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Edit</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-[#EF4444] hover:bg-red-100 transition-colors active:scale-95">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Delete</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Add New Address Button */}
        <button className="w-full bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-4 flex items-center justify-center gap-2 text-[#0F4C81] hover:bg-blue-50 hover:border-[#0F4C81] transition-colors active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Add New Address</span>
        </button>
      </div>
    </div>
  );
}
