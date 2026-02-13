import React from 'react';
import { Plus } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { NavigationContext } from '../App';
import { getFeaturedProducts } from '../data/products';
import { useToast } from './Toast';

interface DOZ3MartProps {
  navigation: NavigationContext;
}

export function DOZ3Mart({ navigation }: DOZ3MartProps) {
  const products = getFeaturedProducts(8);
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    showToast(`${productName} added to cart`);
  };

  return (
    <section className="mt-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg text-gray-900">DOZ3 Mart</h2>
          <p className="text-xs text-[#10B981]">Delivery in under 60 minutes</p>
        </div>
        <button
          onClick={() => navigation.navigate('shop')}
          className="text-sm text-[#0F4C81] font-medium"
        >
          View All
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => navigation.navigate('product-detail', product)}
            className="flex-shrink-0 w-36 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all active:scale-95"
          >
            <ProductImage
              name={product.name}
              brand={product.brand}
              category={product.category}
              className="w-full h-28"
            />

            <div className="p-3">
              <h3 className="text-xs text-gray-900 mb-2 line-clamp-2 min-h-[2rem] text-left">
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
                  className="w-7 h-7 bg-[#10B981] rounded-full flex items-center justify-center hover:bg-[#059669] transition-colors active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
