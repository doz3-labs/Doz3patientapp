import React from 'react';
import { Camera, Stethoscope } from 'lucide-react';
import { NavigationContext } from '../App';

interface PrescriptionCardsProps {
  navigation: NavigationContext;
}

export function PrescriptionCards({ navigation }: PrescriptionCardsProps) {
  return (
    <section className="mt-6">
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Upload Prescription */}
        <button 
          onClick={() => navigation.navigate('upload-prescription')}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all active:scale-95 flex flex-col items-center text-center"
        >
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <Camera className="w-7 h-7 text-[#0F4C81]" />
          </div>
          <h3 className="text-sm text-gray-900 mb-1">Upload Prescription</h3>
          <p className="text-xs text-gray-500">Order from photo</p>
        </button>

        {/* Card 2: Doctor Request - Dynamic */}
        <button
          onClick={() => navigation.navigate('doctor-order')}
          className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-4 shadow-md text-white relative overflow-hidden"
        >
          {/* Active indicator pulse */}
          <div className="absolute top-2 right-2 flex items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>

          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs mb-1 text-white/90">Dr. Sharma sent an order</p>
          <p className="text-sm mb-3">Metformin + Telmisartan</p>
          <div className="w-full bg-white text-[#10B981] py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            View & Pay
          </div>
        </button>
      </div>
    </section>
  );
}