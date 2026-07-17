import React, { useState } from 'react';
import { NavigationContext } from '../../App';
import { Minus, Plus, Trash2, Tag, Check, Clock, MapPin } from 'lucide-react';
import { ProductImage } from '../ProductImage';

interface CartPageProps {
  navigation: NavigationContext;
}

export function CartPage({ navigation }: CartPageProps) {
  const [cartItems, setCartItems] = useState([
    {
      id: 'med-001',
      name: 'Crocin Advance 500mg',
      brand: 'Crocin',
      price: 30,
      originalPrice: 38,
      quantity: 2,
    },
    {
      id: 'well-001',
      name: 'Revital H Capsules',
      brand: 'Sun Pharma',
      price: 420,
      originalPrice: 495,
      quantity: 1,
    },
    {
      id: 'fmcg-004',
      name: 'Dabur Honey 500g',
      brand: 'Dabur',
      price: 225,
      originalPrice: 279,
      quantity: 1,
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    navigation.navigate('orders');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = cartItems.reduce((sum, item) => {
    const itemDiscount = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
    return sum + itemDiscount;
  }, 0);
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryFee - promoDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500 mb-6">Add items to get started</p>
          <button
            onClick={() => navigation.navigate('shop')}
            className="bg-[#0F4C81] text-white px-6 py-3 rounded-xl hover:bg-[#0d3f6b] transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-56">
      {/* Cart Items */}
      <div className="px-4 py-4 space-y-3">
        <h1 className="text-xl text-gray-900 mb-4">Shopping Cart ({cartItems.length})</h1>
        
        {cartItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex gap-3">
              <button onClick={() => navigation.navigate('product-detail', item)} className="flex-shrink-0">
                <ProductImage
                  name={item.name}
                  brand={item.brand}
                  category={item.id.split('-')[0] === 'med' ? 'medicines' : item.id.split('-')[0] === 'well' ? 'wellness' : item.id.split('-')[0] === 'fmcg' ? 'fmcg' : 'medicines'}
                  className="w-20 h-20 rounded-xl"
                />
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="text-[10px] text-gray-400">{item.brand}</p>
                    <h3 className="text-sm text-gray-900 truncate">{item.name}</h3>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#EF4444] hover:bg-red-50 p-1 rounded transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-base font-medium text-gray-900">₹{item.price * item.quantity}</p>
                    {item.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">₹{item.originalPrice * item.quantity}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-white rounded transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm text-gray-900 w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-white rounded transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Info */}
      <div className="px-4 mb-3">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
            <Clock className="w-4 h-4" />
            Delivery in under 60 minutes
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin className="w-3.5 h-3.5" />
            42, 3rd Cross, Indiranagar, Bengaluru - 560038
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          {promoApplied ? (
            <div className="flex items-center gap-2 text-[#10B981]">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">DOZ3SAVE applied — 10% off!</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code (try DOZ3SAVE)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#0F4C81] text-sm"
              />
              <button
                onClick={applyPromoCode}
                className="bg-[#0F4C81] text-white px-5 py-2 rounded-lg hover:bg-[#0d3f6b] transition-colors text-sm flex-shrink-0"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Price Summary - Fixed at bottom */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 max-w-[430px] mx-auto">
        <div className="px-4 py-3">
          <div className="space-y-1.5 mb-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Item Discount</span>
                <span className="text-[#10B981]">-₹{discount}</span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Promo Discount</span>
                <span className="text-[#10B981]">-₹{promoDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'text-[#10B981]' : 'text-gray-900'}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            {subtotal < 500 && (
              <p className="text-xs text-gray-400">Add ₹{500 - subtotal} more for free delivery</p>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-base font-medium text-gray-900">Total</span>
              <span className="text-lg font-semibold text-gray-900">₹{total}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#10B981] text-white py-3.5 rounded-xl hover:bg-[#059669] transition-colors active:scale-95 text-sm font-medium"
          >
            Proceed to Checkout — ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
}
