import React, { useState } from 'react';
import { NavigationContext } from '../../App';
import { Search, Filter, Plus } from 'lucide-react';
import { ProductImage } from '../ProductImage';
import { CATEGORIES, searchProducts } from '../../data/products';
import { useToast } from '../Toast';

interface ShopPageProps {
  navigation: NavigationContext;
}

export function ShopPage({ navigation }: ShopPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const filteredProducts = searchProducts(searchQuery, activeCategory);

  const handleAddToCart = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    showToast(`${productName} added to cart`);
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Search Bar */}
      <div className="bg-white px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines, wellness products..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#0F4C81] text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="w-12 h-12 bg-[#0F4C81] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white px-4 py-3 overflow-x-auto scrollbar-hide border-b">
        <div className="flex gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm ${
                activeCategory === cat.id
                  ? 'bg-[#0F4C81] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery banner */}
      <div className="mx-4 mt-3 bg-green-50 border border-green-200 rounded-xl px-3 py-2 flex items-center gap-2">
        <span className="text-green-600 text-xs">🚀</span>
        <span className="text-xs text-green-700 font-medium">Delivery in under 60 minutes across Bengaluru</span>
      </div>

      {/* Products Grid */}
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base text-gray-900">{filteredProducts.length} Products</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(product => (
            <button
              key={product.id}
              onClick={() => navigation.navigate('product-detail', product)}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-left hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="relative">
                <ProductImage
                  name={product.name}
                  brand={product.brand}
                  category={product.category}
                  className="w-full h-32"
                />
                {product.prescription && (
                  <div className="absolute top-2 left-2 bg-[#EF4444] text-white px-2 py-0.5 rounded text-[10px]">
                    Rx Required
                  </div>
                )}
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-[#10B981] text-white px-2 py-0.5 rounded text-[10px]">
                    {product.discount}
                  </div>
                )}
              </div>

              <div className="p-3">
                <p className="text-[10px] text-gray-400 mb-0.5">{product.brand}</p>
                <h3 className="text-xs text-gray-900 mb-2 line-clamp-2 min-h-[2rem]">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</p>
                    )}
                  </div>
                  <div
                    onClick={(e) => handleAddToCart(e, product.name)}
                    className="w-7 h-7 bg-[#10B981] rounded-full flex items-center justify-center hover:bg-[#059669]"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
