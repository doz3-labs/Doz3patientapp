import React from 'react';
import { NavigationContext } from '../../App';
import { ArrowLeft, Stethoscope, CheckCircle, Package } from 'lucide-react';

interface DoctorOrderPageProps {
  navigation: NavigationContext;
}

export function DoctorOrderPage({ navigation }: DoctorOrderPageProps) {
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  
  const orderDetails = {
    doctor: 'Dr. Priya Sharma',
    qualification: 'MBBS, MD (Internal Medicine)',
    date: '10 Feb 2026',
    medicines: [
      { name: 'Glimepiride 1mg', dosage: '1 tablet morning (before breakfast)', duration: '30 days', price: 120 },
      { name: 'Metformin 500mg', dosage: '1 tablet morning + 1 tablet night', duration: '30 days', price: 180 },
      { name: 'Telmisartan 40mg', dosage: '1 tablet morning', duration: '30 days', price: 150 }
    ],
    notes: 'Blood sugar levels elevated. Take medicines after meals. Monitor blood sugar levels regularly. Strict diet control advised. Follow up in 1 week.',
    total: 450
  };

  const handleConfirmPayment = () => {
    // Show success state
    setPaymentSuccess(true);
  };

  // Success Screen
  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="text-center space-y-6 max-w-sm">
          {/* Success Animation */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-2xl text-gray-900">Payment Successful!</h1>
            <p className="text-base text-gray-600">
              Your order has been confirmed and will be delivered within 60 minutes.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-900">Order Confirmed</p>
                <p className="text-xs text-gray-500">Estimated delivery: Within 60 minutes</p>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="text-sm text-gray-600">Amount Paid</span>
              <span className="text-base text-gray-900">₹{orderDetails.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => navigation.navigate('orders')}
              className="w-full bg-[#0F4C81] text-white py-4 rounded-xl hover:bg-[#0d3f6b] transition-colors active:scale-95 shadow-md"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigation.navigate('home')}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl hover:bg-gray-50 transition-colors active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Original Order Review Screen
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
        <h1 className="text-2xl mb-1">Doctor's Order</h1>
        <p className="text-sm text-white/80">Review and confirm your prescription</p>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Doctor Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <h2 className="text-base text-gray-900">{orderDetails.doctor}</h2>
              <p className="text-xs text-gray-500">{orderDetails.qualification}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4 text-[#10B981]" />
            <span>Prescription verified • {orderDetails.date}</span>
          </div>
        </div>

        {/* Medicines */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm text-gray-900 mb-3">Prescribed Medicines</h3>
          <div className="space-y-3">
            {orderDetails.medicines.map((medicine, index) => (
              <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm text-gray-900 flex-1">{medicine.name}</h4>
                  <p className="text-sm text-gray-900">₹{medicine.price}</p>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• Dosage: {medicine.dosage}</p>
                  <p>• Duration: {medicine.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor's Notes */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4">
          <h3 className="text-sm text-[#0F4C81] mb-2">Doctor's Instructions</h3>
          <p className="text-xs text-gray-700">{orderDetails.notes}</p>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm text-gray-900 mb-3">Price Summary</h3>
          <div className="space-y-2">
            {orderDetails.medicines.map((medicine, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{medicine.name}</span>
                <span className="text-gray-900">₹{medicine.price}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200 flex justify-between">
              <span className="text-base text-gray-900">Total Amount</span>
              <span className="text-lg text-gray-900">₹{orderDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm text-gray-900 mb-2">Delivery Address</h3>
          <p className="text-sm text-gray-700">Rajesh Kumar</p>
          <p className="text-xs text-gray-500 mt-1">
            123, 4th Main Road, Indiranagar, Bengaluru - 560038<br />
            +91 98765 43210
          </p>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 max-w-[430px] mx-auto">
        <div className="px-4 py-4">
          <div className="flex gap-3">
            <button
              onClick={() => navigation.navigate('home')}
              className="flex-1 bg-white border-2 border-[#0F4C81] text-[#0F4C81] py-4 rounded-xl hover:bg-blue-50 transition-colors active:scale-95"
            >
              Not Now
            </button>
            <button
              onClick={handleConfirmPayment}
              className="flex-1 bg-[#10B981] text-white py-4 rounded-xl hover:bg-[#059669] transition-colors active:scale-95"
            >
              Confirm & Pay ₹{orderDetails.total}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}