import React from 'react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onTakeQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTakeQuiz }) => {
  return (
    <section className="bg-[#F5F2ED] border-b border-black/10 py-12 md:py-20 min-h-[75vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      {/* Editorial Side Label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-4 pointer-events-none">
        <div className="vertical-text text-[9px] uppercase tracking-[0.3em] text-[#1A1A1A]/40 font-bold">
          Issue No. 12 / Volume 2026
        </div>
        <div className="h-24 w-px bg-black/10"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-2 flex flex-col items-center">
        <span className="inline-block mb-4 px-3.5 py-1 border border-black/15 rounded-full text-[9px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A] bg-[#F5F2ED]">
          Cycle, Skin & Essential Vitality
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A] mb-4 font-normal leading-[0.95] tracking-tight">
          wellness, <br className="hidden sm:inline" />
          <span className="italic font-normal">simplified</span>.
        </h1>

        <div className="h-px w-20 bg-black/20 my-5"></div>

        <p className="text-xs sm:text-sm text-[#1A1A1A]/75 mb-8 max-w-md mx-auto leading-relaxed font-light">
          Tailored botanical supplement systems for your cycle, skin, and soul. Discover your personalized daily sachet formula in under 3 minutes.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={onTakeQuiz}
            className="px-8 py-4 bg-[#1A1A1A] text-[#F5F2ED] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-colors shadow-md"
          >
            Take the Quiz
          </button>
          <div className="text-left hidden sm:flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/50">Estimated</span>
            <span className="text-xs font-serif italic text-[#1A1A1A]">3 Min Analysis</span>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-12 w-full max-w-xl mx-auto relative z-10 px-2">
        <div className="relative group">
          <img
            src={HERO_IMAGE}
            alt="Natural supplement capsules and loose botanical herbs on soft linen"
            className="w-full h-[320px] sm:h-[380px] object-cover shadow-2xl border border-black/10"
          />
          <div className="absolute -bottom-5 -right-5 w-44 bg-[#F5F2ED] border border-black/15 p-3 text-left shadow-lg hidden sm:block">
            <span className="text-[9px] uppercase tracking-widest opacity-50 block mb-1">Formulation</span>
            <span className="text-xs font-serif italic text-[#1A1A1A] block">100% Bio-Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
