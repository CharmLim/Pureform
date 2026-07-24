import React from 'react';

interface FooterProps {
  onOpenModal: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="w-full py-16 bg-[#F5F2ED] flex flex-col items-center justify-center space-y-8 px-6 text-center pb-28 md:pb-16 border-t border-black/10">
      <div className="flex items-center gap-4">
        <span className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A] uppercase">PUREFORM</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-mono">/ ISSUE NO. 12</span>
      </div>

      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        <button
          onClick={() => onOpenModal('privacy')}
          className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] hover:opacity-50 transition-opacity font-medium border-b border-black/20 pb-0.5"
        >
          Privacy Protocol
        </button>
        <button
          onClick={() => onOpenModal('terms')}
          className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] hover:opacity-50 transition-opacity font-medium border-b border-black/20 pb-0.5"
        >
          Terms of Service
        </button>
        <button
          onClick={() => onOpenModal('faq')}
          className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] hover:opacity-50 transition-opacity font-medium border-b border-black/20 pb-0.5"
        >
          FAQ & Archive
        </button>
        <button
          onClick={() => onOpenModal('contact')}
          className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] hover:opacity-50 transition-opacity font-medium border-b border-black/20 pb-0.5"
        >
          Contact Laboratory
        </button>
      </nav>

      <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 pt-2 border-t border-black/5 max-w-md w-full">
        <div>
          <span className="font-bold">Formulation: </span>
          <span>Bio-Identical Lab</span>
        </div>
        <div>
          <span className="font-bold">Journal: </span>
          <span>Vanguard Series</span>
        </div>
      </div>

      <p className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
        © 2026 PureForm Health. All Rights Reserved.
      </p>
    </footer>
  );
};
