import React, { useState } from 'react';
import { NavigationContext } from '../../App';
import { ArrowLeft, Search, Package, CreditCard, FileText, Shield, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

interface HelpCenterPageProps {
  navigation: NavigationContext;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  items: FAQItem[];
}

export function HelpCenterPage({ navigation }: HelpCenterPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const faqSections: FAQSection[] = [
    {
      title: 'Orders & Delivery',
      icon: Package,
      color: '#0F4C81',
      bgColor: 'bg-blue-50',
      items: [
        {
          question: 'How long does delivery take?',
          answer: 'We deliver within 60 minutes to all addresses in Bangalore. For orders placed after 10 PM, delivery will be scheduled for the next morning between 7-9 AM.',
        },
        {
          question: 'Can I track my order in real-time?',
          answer: 'Yes! Once your order is dispatched, you can track it in real-time from the "My Orders" section. You will receive live updates via SMS and push notifications.',
        },
        {
          question: 'What if my order is delayed?',
          answer: 'In the rare event of a delay, we will notify you immediately with an updated ETA. If the delay exceeds 30 minutes beyond the promised time, you will receive a ₹50 DOZ3 wallet credit automatically.',
        },
      ],
    },
    {
      title: 'Payments & Refunds',
      icon: CreditCard,
      color: '#10B981',
      bgColor: 'bg-green-50',
      items: [
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept UPI (GPay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, RuPay), net banking, and DOZ3 Wallet. Cash on delivery is also available for orders under ₹5,000.',
        },
        {
          question: 'How do refunds work?',
          answer: 'Refunds are processed within 24 hours of approval. UPI and wallet refunds are instant. Card refunds take 5-7 business days to reflect in your statement. You will receive a confirmation SMS once the refund is initiated.',
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Absolutely. We use 256-bit SSL encryption and are PCI DSS Level 1 compliant. We never store your full card details. All UPI transactions are processed through NPCI\'s secure gateway.',
        },
      ],
    },
    {
      title: 'Prescriptions',
      icon: FileText,
      color: '#EF4444',
      bgColor: 'bg-red-50',
      items: [
        {
          question: 'How do I upload a prescription?',
          answer: 'Tap "Upload Prescription" on the home screen or in the order flow. You can take a photo, upload from gallery, or share from WhatsApp. Our pharmacist will verify it within 15 minutes.',
        },
        {
          question: 'Is a prescription required for all medicines?',
          answer: 'No. Only Schedule H and Schedule H1 drugs require a valid prescription from a registered medical practitioner. OTC (over-the-counter) medicines can be ordered directly without any prescription.',
        },
        {
          question: 'How long is my prescription valid?',
          answer: 'Prescriptions are typically valid for 6 months from the date of issue. For chronic medications, we can set up auto-refill reminders so you never miss a dose. Just enable this in your order settings.',
        },
      ],
    },
    {
      title: 'Account & Security',
      icon: Shield,
      color: '#7C3AED',
      bgColor: 'bg-purple-50',
      items: [
        {
          question: 'How do I update my personal information?',
          answer: 'Go to Profile → Personal Information → Edit Profile. You can update your name, email, phone number, and emergency contact details. Phone number changes require OTP verification.',
        },
        {
          question: 'How do I reset my password?',
          answer: 'Tap "Forgot Password" on the login screen. Enter your registered phone number or email, and we will send you an OTP. You can then set a new password. For security, you will be logged out of all other devices.',
        },
        {
          question: 'Can I delete my DOZ3 account?',
          answer: 'Yes, you can request account deletion from Profile → Privacy & Security → Delete Account. Please note that this action is irreversible. Your order history and wallet balance will be permanently removed after a 30-day grace period.',
        },
      ],
    },
  ];

  const filteredSections = searchQuery.trim()
    ? faqSections.map(section => ({
        ...section,
        items: section.items.filter(
          item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(section => section.items.length > 0)
    : faqSections;

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
          <h1 className="text-xl text-gray-900">Help Center</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="px-4 pt-4 space-y-4">
        {filteredSections.map((section, sectionIdx) => {
          const SectionIcon = section.icon;
          return (
            <div key={sectionIdx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${section.bgColor}`}>
                  <SectionIcon className="w-5 h-5" style={{ color: section.color }} />
                </div>
                <h2 className="text-sm font-semibold text-gray-900">{section.title}</h2>
              </div>

              {/* Q&A Items */}
              <div className="divide-y divide-gray-100">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="flex flex-col items-center py-12">
            <Search className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-sm text-[#0F4C81] font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Contact Support Section */}
      <div className="px-4 pt-6">
        <h2 className="text-sm text-gray-500 mb-3 px-1">Still need help?</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <button className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors active:scale-[0.98]">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">Call Us</p>
              <p className="text-xs text-gray-500">1800-123-DOZ3 (3693) · Toll Free</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              24/7
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors active:scale-[0.98]">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#0F4C81]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">Email Support</p>
              <p className="text-xs text-gray-500">support@doz3.in</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              &lt; 4hrs
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors active:scale-[0.98]">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">Live Chat</p>
              <p className="text-xs text-gray-500">Chat with our support team</p>
            </div>
            <span className="px-2 py-0.5 bg-[#10B981] text-white text-[10px] rounded-full font-medium">
              ONLINE
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
