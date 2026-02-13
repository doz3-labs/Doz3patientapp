import React, { useState } from 'react';
import { NavigationContext } from '../../App';
import { Download, Share2, Check } from 'lucide-react';

interface MyIDPageProps {
  navigation: NavigationContext;
}

export function MyIDPage({ navigation }: MyIDPageProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DOZ3 Health ID',
        text: 'My DOZ3 Health ID - DZ-2026-RAJ-4521',
        url: window.location.href,
      }).catch(() => {});
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-[#0F4C81] px-4 py-6 text-white">
        <h1 className="text-2xl mb-1">My Health ID</h1>
        <p className="text-sm text-white/80">Present this at DOZ3 partner stores</p>
      </div>

      {/* ID Card */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#0F4C81] to-[#1a6bb3] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex items-center gap-3">
              <img src="./doz3-logo.png" alt="DOZ3" className="w-10 h-10 rounded-lg bg-white/20 p-1" />
              <div>
                <p className="text-sm text-white/80 mb-0.5">DOZ3 Health ID</p>
                <p className="text-xl tracking-wide font-mono">DZ-2026-RAJ-4521</p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <div className="flex gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-[#0F4C81]/10 flex items-center justify-center border-2 border-[#0F4C81]/20">
                <span className="text-3xl">👤</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl text-gray-900 mb-1">Rajesh Kumar</h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Age: 58 years</p>
                  <p>Blood Group: B+</p>
                  <p>Allergies: Penicillin</p>
                  <p>Member Since: Oct 2025</p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-4">Scan to view health profile</p>
              <div className="w-44 h-44 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                {/* QR Code SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <rect width="200" height="200" fill="white"/>
                  <g fill="#0F4C81">
                    <rect x="10" y="10" width="50" height="50"/>
                    <rect x="20" y="20" width="30" height="30" fill="white"/>
                    <rect x="25" y="25" width="20" height="20" fill="#0F4C81"/>
                    <rect x="140" y="10" width="50" height="50"/>
                    <rect x="150" y="20" width="30" height="30" fill="white"/>
                    <rect x="155" y="25" width="20" height="20" fill="#0F4C81"/>
                    <rect x="10" y="140" width="50" height="50"/>
                    <rect x="20" y="150" width="30" height="30" fill="white"/>
                    <rect x="25" y="155" width="20" height="20" fill="#0F4C81"/>
                    <rect x="70" y="10" width="10" height="10"/>
                    <rect x="90" y="10" width="10" height="10"/>
                    <rect x="110" y="10" width="10" height="10"/>
                    <rect x="70" y="30" width="10" height="10"/>
                    <rect x="110" y="30" width="10" height="10"/>
                    <rect x="10" y="70" width="10" height="10"/>
                    <rect x="30" y="70" width="10" height="10"/>
                    <rect x="50" y="70" width="10" height="10"/>
                    <rect x="70" y="70" width="10" height="10"/>
                    <rect x="90" y="70" width="10" height="10"/>
                    <rect x="110" y="70" width="10" height="10"/>
                    <rect x="130" y="70" width="10" height="10"/>
                    <rect x="150" y="70" width="10" height="10"/>
                    <rect x="170" y="70" width="10" height="10"/>
                    <rect x="70" y="90" width="10" height="10"/>
                    <rect x="110" y="90" width="10" height="10"/>
                    <rect x="150" y="90" width="10" height="10"/>
                    <rect x="70" y="110" width="10" height="10"/>
                    <rect x="90" y="110" width="10" height="10"/>
                    <rect x="130" y="110" width="10" height="10"/>
                    <rect x="170" y="110" width="10" height="10"/>
                    <rect x="70" y="130" width="10" height="10"/>
                    <rect x="110" y="130" width="10" height="10"/>
                    <rect x="150" y="130" width="10" height="10"/>
                    <rect x="70" y="150" width="10" height="10"/>
                    <rect x="90" y="150" width="10" height="10"/>
                    <rect x="130" y="150" width="10" height="10"/>
                    <rect x="170" y="150" width="10" height="10"/>
                    <rect x="70" y="170" width="10" height="10"/>
                    <rect x="110" y="170" width="10" height="10"/>
                    <rect x="150" y="170" width="10" height="10"/>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-500 mt-4">Valid for all DOZ3 services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-3">
        <button
          className={`py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm font-medium ${
            downloaded ? 'bg-[#10B981] text-white' : 'bg-[#0F4C81] text-white hover:bg-[#0d3f6b]'
          }`}
          onClick={handleDownload}
        >
          {downloaded ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
          <span>{downloaded ? 'Downloaded!' : 'Download'}</span>
        </button>
        <button
          className={`py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm font-medium ${
            shared ? 'bg-[#10B981] text-white' : 'bg-white border-2 border-[#0F4C81] text-[#0F4C81] hover:bg-blue-50'
          }`}
          onClick={handleShare}
        >
          {shared ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
          <span>{shared ? 'Shared!' : 'Share'}</span>
        </button>
      </div>

      {/* Info Cards */}
      <div className="px-4 mt-6 space-y-3">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <h3 className="text-sm text-[#0F4C81] mb-2">Benefits of Health ID</h3>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Quick access to your medical history</li>
            <li>• Faster checkout at partner stores</li>
            <li>• Automatic prescription tracking</li>
            <li>• Emergency contact information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
