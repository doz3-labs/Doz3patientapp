import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContext } from '../App';
import { Clock, Truck, Leaf, Zap, Shield } from 'lucide-react';

interface HeroBannerProps {
  navigation: NavigationContext;
}

export function HeroBanner({ navigation }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      icon: <Clock className="w-6 h-6" />,
      tag: '60-MIN DELIVERY',
      title: "Medicines at your door",
      subtitle: "in under 60 minutes",
      cta: "Order Now",
      gradient: "from-[#0F4C81] to-[#1a6bb3]",
      navigateTo: 'shop' as const,
    },
    {
      icon: <Truck className="w-6 h-6" />,
      tag: 'FREE DELIVERY',
      title: "Free delivery",
      subtitle: "on orders above ₹500",
      cta: "Start Shopping",
      gradient: "from-[#10B981] to-[#059669]",
      navigateTo: 'shop' as const,
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      tag: 'AYURVEDA WEEK',
      title: "Ayurveda essentials",
      subtitle: "Dabur, Himalaya, Patanjali",
      cta: "Explore Ayurveda",
      gradient: "from-[#D97706] to-[#92400E]",
      navigateTo: 'shop' as const,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      tag: 'NEW ON DOZ3',
      title: "Health devices",
      subtitle: "BP Monitors, Glucometers & more",
      cta: "Shop Devices",
      gradient: "from-[#7C3AED] to-[#4C1D95]",
      navigateTo: 'shop' as const,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      tag: 'DOZ3 HEALTH ID',
      title: "Your digital health card",
      subtitle: "QR-based ID for partner stores",
      cta: "View My ID",
      gradient: "from-[#0891B2] to-[#164E63]",
      navigateTo: 'qr' as const,
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative mt-4">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              index === currentSlide ? 'block' : 'hidden'
            }`}
          >
            <button
              onClick={() => navigation.navigate(banner.navigateTo)}
              className="w-full text-left"
            >
              <div className={`bg-gradient-to-r ${banner.gradient} p-5 text-white relative overflow-hidden min-h-[140px]`}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider mb-2">
                    {banner.icon}
                    {banner.tag}
                  </div>
                  <h2 className="text-2xl font-semibold mb-0.5">{banner.title}</h2>
                  <p className="text-base mb-3 text-white/90">{banner.subtitle}</p>
                  <span className="inline-block bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium">
                    {banner.cta} →
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? 'w-5 bg-[#0F4C81]' : 'w-1.5 bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
