import React from 'react';

export const QualityTrust: React.FC = () => {
  const trustPoints = [
    { icon: 'verified', label: 'GMP CERTIFIED' },
    { icon: 'health_and_safety', label: 'TGA APPROVED' },
    { icon: 'eco', label: '100% ORGANIC' },
    { icon: 'science', label: 'LAB TESTED' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F2ED] border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50 block mb-2">
            Verification & Integrity
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] mb-3 font-normal tracking-tight">
            Quality You Can <span className="italic font-normal">Trust</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-xl mx-auto leading-relaxed font-light">
            Formulated in strict accordance with clinical protocols and independently verified by accredited third-party analytical laboratories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustPoints.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-[#EAE6DF] border border-black/10 transition-all hover:border-black/30">
              <div className="w-12 h-12 border border-black/20 bg-[#F5F2ED] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#1A1A1A] text-2xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                {item.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
