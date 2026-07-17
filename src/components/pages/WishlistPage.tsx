import React, { useState } from 'react';
import { NavigationContext } from '../../App';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react';
import { ALL_PRODUCTS } from '../../data/products';
import { ProductImage } from '../ProductImage';
import { useToast } from '../Toast';

interface WishlistPageProps {
  navigation: NavigationContext;
}

export function WishlistPage({ navigation }: WishlistPageProps) {
  const [wishlistItems, setWishlistItems] = useState(() => ALL_PRODUCTS.slice(0, 6));
  const { showToast } = useToast();

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-[64px] z-30 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigation.navigate('profile')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl text-gray-900">My Wishlist</h1>
          </div>
          <span className="px-2.5 py-1 bg-[#EF4444] text-white text-xs rounded-full">
            {wishlistItems.length} items
          </span>
        </div>
      </div>

      {/* Wishlist Grid */}
      {wishlistItems.length > 0 ? (
        <div className="px-4 pt-4 grid grid-cols-2 gap-3">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Product Image */}
              <button
                onClick={() => navigation.navigate('product-detail', product)}
                className="relative w-full aspect-square bg-gray-50 overflow-hidden"
              >
                <ProductImage
                  name={product.name}
                  brand={product.brand}
                  category={product.category}
                  className="w-full h-full"
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-[#EF4444] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-md">
                    {product.discount}
                  </span>
                )}
                {/* Remove Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform active:scale-95"
                >
                  <Heart className="w-4 h-4 text-[#EF4444] fill-[#EF4444]" />
                </button>
              </button>

              {/* Product Info */}
              <div className="p-3">
                <button
                  onClick={() => navigation.navigate('product-detail', product)}
                  className="text-left w-full"
                >
                  <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
                  <h3 className="text-sm text-gray-900 font-medium line-clamp-2 leading-tight mb-1.5">
                    {product.name}
                  </h3>
                </button>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => { showToast(`${product.name} added to cart`); }}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#0F4C81] text-white py-2 rounded-xl text-xs font-medium hover:bg-[#0d3f6b] transition-colors active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist is empty</h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Save items you love to your wishlist and come back to them anytime.
          </p>
          <button
            onClick={() => navigation.navigate('shop')}
            className="bg-[#0F4C81] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#0d3f6b] transition-colors active:scale-95"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
}
