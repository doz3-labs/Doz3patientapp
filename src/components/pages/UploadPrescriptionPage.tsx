import React, { useState } from 'react';
import { NavigationContext } from '../../App';
import { ArrowLeft, Camera, Upload, FileText, CheckCircle } from 'lucide-react';

interface UploadPrescriptionPageProps {
  navigation: NavigationContext;
}

export function UploadPrescriptionPage({ navigation }: UploadPrescriptionPageProps) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigation.navigate('orders');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-xl text-gray-900">Prescription Submitted!</h1>
          <p className="text-sm text-gray-600">Our pharmacist will verify and contact you shortly.</p>
          <p className="text-xs text-gray-400">Redirecting to orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="bg-[#0F4C81] px-4 py-6 text-white sticky top-0 z-30">
        <button
          onClick={() => navigation.navigate('home')}
          className="mb-4 flex items-center gap-2 text-white/80 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl mb-1">Upload Prescription</h1>
        <p className="text-sm text-white/80">Upload a clear photo of your prescription</p>
      </div>

      <div className="px-4 py-6 space-y-4">
        {!uploadedFile ? (
          <>
            {/* Upload Options */}
            <div className="space-y-3">
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-[#0F4C81] p-6 cursor-pointer hover:bg-blue-50 transition-colors active:scale-95">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Camera className="w-8 h-8 text-[#0F4C81]" />
                    </div>
                    <h3 className="text-base text-gray-900 mb-1">Take Photo</h3>
                    <p className="text-xs text-gray-500">Use camera to capture prescription</p>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:bg-gray-50 transition-colors active:scale-95">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Upload className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-base text-gray-900 mb-1">Upload from Gallery</h3>
                    <p className="text-xs text-gray-500">Select from your device</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4">
              <h3 className="text-sm text-[#0F4C81] mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Upload Guidelines
              </h3>
              <ul className="text-xs text-gray-700 space-y-2">
                <li className="flex gap-2">
                  <span className="text-[#10B981] flex-shrink-0">•</span>
                  <span>Ensure prescription is clearly visible and not blurry</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] flex-shrink-0">•</span>
                  <span>Doctor's name and signature should be visible</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] flex-shrink-0">•</span>
                  <span>Medicine names and dosages should be readable</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] flex-shrink-0">•</span>
                  <span>Upload JPG, PNG, or PDF files (Max 10MB)</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-green-50 border-b border-green-200 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
                <span className="text-sm text-[#10B981]">Prescription uploaded successfully</span>
              </div>
              <div className="p-4">
                <img
                  src={uploadedFile}
                  alt="Prescription preview"
                  className="w-full rounded-lg"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setUploadedFile(null)}
                className="w-full bg-white border-2 border-[#0F4C81] text-[#0F4C81] py-3 rounded-xl hover:bg-blue-50 transition-colors active:scale-95"
              >
                Upload Different Image
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm text-gray-900 mb-2">Delivery Address</h3>
              <p className="text-sm text-gray-700">Rajesh Kumar</p>
              <p className="text-xs text-gray-500 mt-1">
                Indiranagar, Bengaluru - 560038<br />
                +91 98765 43210
              </p>
              <button
                onClick={() => navigation.navigate('profile')}
                className="mt-3 text-xs text-[#0F4C81] hover:underline"
              >
                Change Address
              </button>
            </div>

            {/* Next Steps */}
            <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-4">
              <h3 className="text-sm text-yellow-800 mb-2">What happens next?</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>1. Our pharmacist will verify your prescription</li>
                <li>2. You'll receive a confirmation with price details</li>
                <li>3. Pay and we'll deliver to your doorstep</li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Fixed Bottom Action */}
      {uploadedFile && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 max-w-[430px] mx-auto">
          <div className="px-4 py-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#10B981] text-white py-4 rounded-xl hover:bg-[#059669] transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Submit for Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
