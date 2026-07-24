import React, { useRef } from 'react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F2ED] border-b border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-end border-b border-black/10 pb-6">
        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50 block mb-2">
            Community Archive
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal tracking-tight">
            Real <span className="italic font-normal">Results</span>
          </h2>
        </div>

        <div className="hidden md:flex space-x-3">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 border border-black/20 text-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all active:scale-95"
            aria-label="Previous Testimonial"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 border border-black/20 text-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all active:scale-95"
            aria-label="Next Testimonial"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto hide-scrollbar px-6 max-w-7xl mx-auto pb-4 snap-x"
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="min-w-[300px] sm:min-w-[380px] max-w-[420px] snap-start bg-[#EAE6DF] border border-black/10 p-8 flex flex-col justify-between flex-shrink-0 transition-all hover:border-black/30"
          >
            <div>
              <div className="flex text-[#1A1A1A] mb-4 space-x-1">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill text-base">
                    star
                  </span>
                ))}
              </div>
              <p className="font-serif text-base sm:text-lg text-[#1A1A1A] italic mb-6 leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t border-black/10">
              <div className="w-8 h-8 border border-black/20 bg-[#F5F2ED] flex items-center justify-center font-bold text-[#1A1A1A] text-xs">
                {t.initials}
              </div>
              <div>
                <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">{t.role} • {t.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
