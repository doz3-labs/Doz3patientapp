import React from 'react';
import { Pill, Heart, Leaf, Sparkles, Baby, Activity, ShoppingBag } from 'lucide-react';

// Category-to-color and icon mapping for branded product placeholders
const CATEGORY_STYLES: Record<string, { gradient: string; icon: any; emoji?: string }> = {
  'medicines':     { gradient: 'from-blue-500 to-blue-700',    icon: Pill,        emoji: '💊' },
  'wellness':      { gradient: 'from-emerald-500 to-teal-700', icon: Heart,       emoji: '💪' },
  'ayurveda':      { gradient: 'from-amber-500 to-orange-700', icon: Leaf,        emoji: '🌿' },
  'personal-care': { gradient: 'from-pink-500 to-rose-700',    icon: Sparkles,    emoji: '✨' },
  'baby-care':     { gradient: 'from-sky-400 to-indigo-600',   icon: Baby,        emoji: '👶' },
  'devices':       { gradient: 'from-slate-500 to-slate-800',  icon: Activity,    emoji: '🩺' },
  'fmcg':          { gradient: 'from-lime-500 to-green-700',   icon: ShoppingBag, emoji: '🥗' },
};

const DEFAULT_STYLE = { gradient: 'from-gray-500 to-gray-700', icon: ShoppingBag, emoji: '📦' };

interface ProductImageProps {
  name: string;
  brand?: string;
  category?: string;
  className?: string;
}

export function ProductImage({ name, brand, category, className = 'w-full h-36' }: ProductImageProps) {
  const style = CATEGORY_STYLES[category || ''] || DEFAULT_STYLE;
  const Icon = style.icon;

  // Get initials from brand or name
  const label = brand || name;
  const initials = label
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`bg-gradient-to-br ${style.gradient} ${className} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Emoji */}
      <span className="text-3xl mb-1 drop-shadow-sm">{style.emoji}</span>
      
      {/* Brand initials */}
      <span className="text-white/90 text-xs font-bold tracking-wider">{initials}</span>
    </div>
  );
}
