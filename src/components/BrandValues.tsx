import React from 'react';

export const BrandValues: React.FC = () => {
  const values = [
    { icon: 'science', title: 'EXPERT FORMULATED' },
    { icon: 'eco', title: 'CLEAN INGREDIENTS' },
    { icon: 'public', title: 'SUSTAINABLY SOURCED' },
  ];

  return (
    <section className="py-8 bg-[#F5F2ED] border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-black/10">
        {values.map((v, i) => (
          <div key={i} className="flex items-center justify-center gap-3 py-2 px-4">
            <span className="material-symbols-outlined text-[#1A1A1A] text-2xl">
              {v.icon}
            </span>
            <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
              {v.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
