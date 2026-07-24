import React from 'react';
import { JournalArticle } from '../types';

interface JournalDetailModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export const JournalDetailModal: React.FC<JournalDetailModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F5F2ED] w-full max-w-2xl overflow-hidden border border-black/20 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="p-4 sm:p-6 border-b border-black/10 flex justify-between items-center bg-[#F5F2ED] sticky top-0 z-10">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/60 block mb-1">
              {article.category} • {article.readTime}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal leading-tight">
              {article.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#1A1A1A] hover:opacity-50 p-2 transition-opacity flex-shrink-0"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body scroll */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover border border-black/10"
          />

          <div className="flex items-center space-x-3 text-xs text-[#1A1A1A]/70 border-b border-black/10 pb-4">
            <span className="material-symbols-outlined text-[#1A1A1A] text-sm">edit_note</span>
            <span className="font-medium uppercase tracking-wider text-[10px]">{article.author}</span>
          </div>

          <p className="text-base sm:text-lg text-[#1A1A1A] font-serif italic leading-relaxed">
            "{article.subtitle}"
          </p>

          <div className="space-y-4 text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-black/10 flex justify-between items-center">
            <button
              onClick={onClose}
              className="bg-[#1A1A1A] text-[#F5F2ED] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
            >
              Close Essay
            </button>
            <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">PureForm Journal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
