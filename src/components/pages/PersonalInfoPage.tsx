import React from 'react';
import { NavigationContext } from '../../App';
import { ArrowLeft, User, Phone, Mail, Calendar, Users, Droplets, AlertCircle, Edit2 } from 'lucide-react';

interface PersonalInfoPageProps {
  navigation: NavigationContext;
}

export function PersonalInfoPage({ navigation }: PersonalInfoPageProps) {
  const personalInfo = [
    { icon: User, label: 'Full Name', value: 'Rajesh Kumar' },
    { icon: Phone, label: 'Phone Number', value: '+91 98765 43210' },
    { icon: Mail, label: 'Email Address', value: 'rajesh.kumar@email.com' },
    { icon: Calendar, label: 'Date of Birth', value: '15 March 1968' },
    { icon: Users, label: 'Gender', value: 'Male' },
    { icon: Droplets, label: 'Blood Group', value: 'B+' },
    { icon: AlertCircle, label: 'Allergies', value: 'Penicillin' },
  ];

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-[64px] z-30 shadow-sm border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigation.navigate('profile')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl text-gray-900">Personal Information</h1>
        </div>
      </div>

      {/* Profile Avatar */}
      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0F4C81] to-[#1a6bb3] flex items-center justify-center border-4 border-white shadow-lg">
          <User className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-lg font-medium text-gray-900 mt-3">Rajesh Kumar</h2>
        <p className="text-sm text-gray-500">DOZ3 Gold Member</p>
      </div>

      {/* Personal Info Cards */}
      <div className="px-4 space-y-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {personalInfo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#0F4C81]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm text-gray-900 font-medium">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-[#EF4444]" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Emergency Contact</h3>
          </div>
          <div className="pl-10">
            <p className="text-sm text-gray-900 font-medium">Priya Kumar</p>
            <p className="text-sm text-gray-500">+91 98765 43211</p>
          </div>
        </div>

        {/* Edit Button */}
        <button className="w-full bg-[#0F4C81] text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#0d3f6b] transition-colors active:scale-95 shadow-sm">
          <Edit2 className="w-4 h-4" />
          <span className="text-sm font-medium">Edit Profile</span>
        </button>
      </div>
    </div>
  );
}
