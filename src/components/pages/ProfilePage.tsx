import React from 'react';
import { NavigationContext } from '../../App';
import { ChevronRight, User, MapPin, Heart, CreditCard, Bell, HelpCircle, FileText, LogOut, Shield } from 'lucide-react';

interface ProfilePageProps {
  navigation: NavigationContext;
}

export function ProfilePage({ navigation }: ProfilePageProps) {
  // Map profile menu items to actual navigation destinations
  const handleMenuClick = (label: string) => {
    switch (label) {
      case 'Personal Information':
        navigation.navigate('personal-info');
        break;
      case 'Saved Addresses':
        navigation.navigate('addresses');
        break;
      case 'Payment Methods':
        navigation.navigate('payment-methods');
        break;
      case 'Wishlist':
        navigation.navigate('wishlist');
        break;
      case 'Notifications':
        navigation.navigate('notifications');
        break;
      case 'Privacy & Security':
        navigation.navigate('personal-info');
        break;
      case 'Help Center':
        navigation.navigate('help-center');
        break;
      case 'Terms & Conditions':
        navigation.navigate('help-center');
        break;
      default:
        navigation.navigate('home');
    }
  };

  const handleLogout = () => {
    navigation.navigate('home');
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Information', badge: null },
        { icon: MapPin, label: 'Saved Addresses', badge: '3' },
        { icon: CreditCard, label: 'Payment Methods', badge: '2' },
        { icon: Heart, label: 'Wishlist', badge: '12' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', badge: null },
        { icon: Shield, label: 'Privacy & Security', badge: null }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', badge: null },
        { icon: FileText, label: 'Terms & Conditions', badge: null }
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#0F4C81] to-[#1a6bb3] px-4 py-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl mb-1">Rajesh Kumar</h1>
            <p className="text-sm text-white/80">+91 98765 43210</p>
            <p className="text-sm text-white/80">rajesh.kumar@email.com</p>
          </div>
        </div>
      </div>

      {/* Membership Card */}
      <div className="px-4 -mt-4">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/80 mb-1">DOZ3 Member</p>
              <p className="text-lg">Gold Status</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/80 mb-1">Total Savings</p>
              <p className="text-xl">₹2,450</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 mt-6 space-y-6">
        {menuSections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-sm text-gray-500 mb-3 px-1">{section.title}</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIdx}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors active:scale-[0.98] border-b border-gray-100 last:border-b-0"
                    onClick={() => handleMenuClick(item.label)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#0F4C81]" />
                      </div>
                      <span className="text-sm text-gray-900">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-[#EF4444] text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center justify-center gap-3 text-[#EF4444] hover:bg-red-50 transition-colors active:scale-95"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
