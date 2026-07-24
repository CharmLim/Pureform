import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/products';
import { JournalArticle } from '../types';

interface JournalSectionProps {
  onSelectArticle: (article: JournalArticle) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onSelectArticle }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = JOURNAL_ARTICLES[0];
  const method = JOURNAL_ARTICLES[1];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-b border-black/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-black/10 pb-6">
        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50 block mb-2">
            The Journal & Publication
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal tracking-tight">
            Vanguard <span className="italic font-normal">Journal</span>
          </h2>
        </div>
        <p className="text-xs text-[#1A1A1A]/60 max-w-xs mt-3 md:mt-0 font-light leading-relaxed">
          Essays on bio-identical rhythm, botanical integrity, and functional longevity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Featured Article */}
        <div
          onClick={() => onSelectArticle(featured)}
          className="md:col-span-7 cursor-pointer group bg-[#F5F2ED] border border-black/10 p-4 transition-all hover:border-black/30"
        >
          <div className="relative overflow-hidden h-full min-h-[380px] border border-black/5 bg-[#EAE6DF]">
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[9px] uppercase tracking-[0.25em] font-bold mb-2 opacity-80">
                {featured.category} • {featured.readTime}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white mb-3 font-normal leading-tight">
                {featured.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 mb-4 font-light max-w-lg">
                {featured.subtitle}
              </p>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white border-b border-white pb-0.5">
                  Read Journal Feature →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Column */}
        <div className="md:col-span-5 flex flex-col space-y-6">
          {/* Method Card */}
          <div
            onClick={() => onSelectArticle(method)}
            className="bg-[#EAE6DF] border border-black/10 p-8 flex-1 cursor-pointer transition-all hover:border-black/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60">
                  Formulation Science
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 font-mono">
                  {method.readTime}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3 font-normal leading-snug">
                {method.title}
              </h3>
              <div className="h-px w-12 bg-black/20 mb-3"></div>
              <p className="text-xs text-[#1A1A1A]/70 mb-6 leading-relaxed font-light">
                {method.subtitle}
              </p>
            </div>
            <div>
              <span className="text-[#1A1A1A] font-bold text-[10px] uppercase tracking-[0.2em] border-b border-[#1A1A1A] pb-0.5">
                Explore Protocol →
              </span>
            </div>
          </div>

          {/* Subscribe & Save Card */}
          <div className="bg-[#1A1A1A] p-8 border border-black text-[#F5F2ED] flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] opacity-60 block mb-2 font-bold">
                Member Dispatch
              </span>
              <h3 className="font-serif text-2xl mb-2 font-normal">
                Subscribe & Save 15%
              </h3>
              <p className="text-xs text-[#F5F2ED]/70 mb-6 leading-relaxed font-light">
                Receive monthly botanical deliveries and exclusive formulation updates directly to your door.
              </p>
            </div>

            {subscribed ? (
              <div className="bg-[#F5F2ED] text-[#1A1A1A] p-3 text-xs font-bold uppercase tracking-wider text-center">
                ✓ Subscription Registered
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL ADDRESS"
                  required
                  className="bg-white/10 border border-white/20 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white flex-1 font-mono uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="bg-[#F5F2ED] text-[#1A1A1A] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex-shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
