import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, isSubscription: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [isSubscription, setIsSubscription] = useState(true);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, isSubscription);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const finalPrice = isSubscription ? product.price * 0.85 : product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F5F2ED] w-full max-w-2xl overflow-hidden border border-black/20 shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#F5F2ED] border border-black/15 text-[#1A1A1A] p-2 hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#EAE6DF] relative flex-shrink-0 border-b md:border-b-0 md:border-r border-black/10">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover filter grayscale-[10%]"
          />
          {product.tag && (
            <span className="absolute top-4 left-4 bg-[#F5F2ED] border border-black/15 text-[#1A1A1A] text-[9px] font-bold uppercase tracking-widest px-3 py-1 shadow-xs">
              {product.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-1 text-[#1A1A1A] mb-2 text-xs">
              <span className="material-symbols-outlined fill text-sm">star</span>
              <span className="font-bold">{product.rating}</span>
              <span className="text-[#1A1A1A]/60">({product.reviewsCount} reviews)</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal leading-tight mb-1">
              {product.name}
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-4 font-bold">{product.subtitle}</p>

            <p className="text-xs text-[#1A1A1A]/75 leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Ingredients */}
            <div className="mb-6">
              <p className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-2">
                Active Botanical Complex:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-[#EAE6DF] text-[#1A1A1A] text-[10px] uppercase tracking-wider px-2.5 py-1 border border-black/15 font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6 space-y-1.5">
              <p className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-1">
                Protocol Benefits:
              </p>
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-[#1A1A1A]/80 font-light">
                  <span className="material-symbols-outlined text-[#1A1A1A] text-sm mt-0.5">
                    check
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Box */}
          <div className="pt-4 border-t border-black/10 space-y-3">
            <div className="flex justify-between items-center bg-[#EAE6DF] p-3 border border-black/10">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSubscription}
                  onChange={(e) => setIsSubscription(e.target.checked)}
                  className="border-black/30 text-[#1A1A1A] focus:ring-black"
                />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Monthly Subscription (15% Off)
                </span>
              </label>

              <div className="text-right">
                <span className="text-sm font-bold text-[#1A1A1A]">
                  ${finalPrice.toFixed(2)}
                </span>
                {isSubscription && (
                  <span className="text-[9px] text-[#1A1A1A]/50 block line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className="w-full bg-[#1A1A1A] text-[#F5F2ED] py-3.5 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {added ? (
                <span>✓ Added to Bag</span>
              ) : (
                <span>Add to Bag • ${finalPrice.toFixed(2)}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
