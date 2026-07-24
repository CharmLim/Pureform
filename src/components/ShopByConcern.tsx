import React from 'react';
import { Product } from '../types';

interface ShopByConcernProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, isSubscription: boolean) => void;
}

export const ShopByConcern: React.FC<ShopByConcernProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  return (
    <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-b border-black/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-black/10 pb-6">
        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50 block mb-2">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal tracking-tight">
            Targeted <span className="italic font-normal">Formulas</span>
          </h2>
        </div>
        <p className="text-xs text-[#1A1A1A]/60 max-w-xs mt-3 md:mt-0 font-light leading-relaxed">
          Bio-identical botanical combinations tailored to natural human rhythms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="group cursor-pointer bg-[#F5F2ED] border border-black/10 p-4 flex flex-col justify-between transition-all hover:border-black/30 hover:shadow-xl"
          >
            <div>
              <div className="w-full aspect-[4/5] bg-[#EAE6DF] overflow-hidden mb-4 relative border border-black/5">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#F5F2ED] border border-black/15 text-[#1A1A1A] text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 shadow-xs">
                    {product.tag}
                  </span>
                )}
                
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, true);
                    }}
                    className="w-full bg-[#1A1A1A] text-[#F5F2ED] text-[9px] font-bold uppercase tracking-[0.2em] py-2.5 shadow-md hover:bg-black transition-colors"
                  >
                    Quick Add • ${(product.price * 0.85).toFixed(2)}
                  </button>
                </div>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-bold block mb-1">
                {product.subtitle}
              </span>
              <h3 className="font-serif text-lg text-[#1A1A1A] font-medium leading-snug group-hover:underline decoration-1 underline-offset-4">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/10 text-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">30 Daily Sachets</span>
              <span className="font-bold text-[#1A1A1A]">${product.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
