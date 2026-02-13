import React, { useState } from 'react';
import { NavigationContext } from '../../App';
import { ArrowLeft, Heart, Star, Minus, Plus, ShoppingCart, Check, Clock, MapPin } from 'lucide-react';
import { ProductImage } from '../ProductImage';
import { useToast } from '../Toast';

interface ProductDetailPageProps {
  navigation: NavigationContext;
}

export function ProductDetailPage({ navigation }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { showToast } = useToast();

  const product = navigation.pageData || {
    id: 'med-001',
    name: 'Crocin Advance 500mg',
    brand: 'Crocin',
    category: 'medicines',
    price: 30,
    originalPrice: 38,
    image: '',
    rating: 4.6,
    reviews: 2340,
    inStock: true,
    prescription: false,
    description: 'Paracetamol 500mg tablets for fast relief from headache, body ache, toothache, and fever.',
    benefits: ['Fast fever relief', 'Headache & body pain', 'Gentle on stomach', 'Safe for adults'],
    dosage: '1-2 tablets every 4-6 hours.',
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    showToast(`${product.name} (×${quantity}) added to cart`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    showToast(`${product.name} added to cart`);
    navigation.navigate('cart');
  };

  return (
    <div className="min-h-screen pb-32 bg-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigation.navigate('shop')}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => { setIsFavorite(!isFavorite); showToast(isFavorite ? 'Removed from wishlist' : 'Added to wishlist'); }}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#EF4444] text-[#EF4444]' : 'text-gray-700'}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative">
        <ProductImage
          name={product.name}
          brand={product.brand}
          category={product.category}
          className="w-full h-56"
        />
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-[#EF4444] text-white px-3 py-1 rounded-full text-sm font-medium">
            {discount}% OFF
          </div>
        )}
        {product.inStock === false && (
          <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 py-5 space-y-5">
        {/* Brand + Title + Price */}
        <div>
          {product.brand && (
            <p className="text-xs text-[#0F4C81] font-medium mb-1">{product.brand}</p>
          )}
          <h1 className="text-xl text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-900">{product.rating || 4.5}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviews || 100} reviews)</span>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold text-gray-900">₹{product.price}</p>
            {product.originalPrice && (
              <p className="text-base text-gray-400 line-through">₹{product.originalPrice}</p>
            )}
            {discount > 0 && (
              <span className="px-2 py-1 bg-green-100 text-[#10B981] text-xs rounded-full font-medium">
                Save ₹{product.originalPrice - product.price}
              </span>
            )}
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-green-50 rounded-xl border border-green-200 p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Delivery in under 60 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivering to Indiranagar, Bengaluru</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div>
          <h3 className="text-sm text-gray-700 mb-2">Quantity</h3>
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3 w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-base text-gray-900 w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div>
            <h3 className="text-base text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Benefits */}
        {product.benefits && product.benefits.length > 0 && (
          <div>
            <h3 className="text-base text-gray-900 mb-3">Key Benefits</h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#10B981] flex-shrink-0 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dosage */}
        {product.dosage && (
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4">
            <h3 className="text-sm text-[#0F4C81] mb-2">Recommended Dosage</h3>
            <p className="text-xs text-gray-700">{product.dosage}</p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 max-w-[430px] mx-auto">
        <div className="px-4 py-3 flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`flex-1 py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm font-medium ${
              addedToCart
                ? 'bg-[#10B981] text-white'
                : 'bg-white border-2 border-[#0F4C81] text-[#0F4C81] hover:bg-blue-50'
            }`}
          >
            {addedToCart ? <><Check className="w-5 h-5" /> Added!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#10B981] text-white py-3.5 rounded-xl hover:bg-[#059669] transition-colors active:scale-95 text-sm font-medium"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
