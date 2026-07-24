import React, { useState, useEffect } from 'react';
import { NewsletterSubscription } from '../types';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Herbs & Botanical Spotlights',
    'Recent Health Trends & Physiology',
    'Clinical Ingredient Research',
  ]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('pureform_newsletter_sub');
        if (saved) {
          setIsSubscribed(true);
        }
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const topicsList = [
    { id: 'Herbs & Botanical Spotlights', title: 'Herbal & Botanical Monographs', desc: 'Ashwagandha, Chasteberry, Rhodiola, Curcumin, Shatavari' },
    { id: 'Recent Health Trends & Physiology', title: 'Health Trends & Physiology', desc: 'Cortisol rhythms, circadian optimization, gut-brain axis' },
    { id: 'Clinical Ingredient Research', title: 'Clinical Ingredient Research', desc: 'Extract bioavailability, double-blind trials, purity assays' },
  ];

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const sub: NewsletterSubscription = {
      email,
      name: name || undefined,
      topics: selectedTopics,
      frequency: 'Bi-Weekly Dispatch',
      subscribedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    try {
      localStorage.setItem('pureform_newsletter_sub', JSON.stringify(sub));
    } catch {
      // ignore
    }

    setIsSubscribed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F5F2ED] w-full max-w-lg p-6 sm:p-8 border border-black/20 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#1A1A1A] hover:opacity-50 p-2 transition-opacity"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="mb-6 border-b border-black/10 pb-4">
          <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#1A1A1A] border border-black/20 px-2 py-0.5 bg-[#EAE6DF] inline-block mb-2">
            Bi-Weekly Editorial Dispatch
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
            Subscribe to Botanical Insights
          </h3>
          <p className="text-xs text-[#1A1A1A]/70 mt-1 font-light">
            Stay informed on recent health trends, ethnobotanical extracts, and active ingredient science delivered twice monthly.
          </p>
        </div>

        {isSubscribed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 border border-black/20 bg-[#EAE6DF] text-[#1A1A1A] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">mail</span>
            </div>
            <h4 className="font-serif text-2xl text-[#1A1A1A] font-normal">
              You Are Subscribed
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 max-w-xs mx-auto font-light">
              You will receive our upcoming bi-weekly dispatch on health trends, herbs, and clinical ingredients directly in your inbox.
            </p>
            <button
              onClick={onClose}
              className="bg-[#1A1A1A] text-[#F5F2ED] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
            >
              Return to PureForm
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">
                Choose Preferred Topics:
              </label>
              <div className="space-y-2">
                {topicsList.map((t) => {
                  const isChecked = selectedTopics.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTopic(t.id)}
                      className={`p-3 border text-left cursor-pointer transition-all flex items-start space-x-3 ${
                        isChecked
                          ? 'border-black bg-[#EAE6DF]'
                          : 'border-black/10 bg-[#F5F2ED] hover:bg-[#EAE6DF]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base text-[#1A1A1A] mt-0.5">
                        {isChecked ? 'check_box' : 'checkbox_outline_blank'}
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                          {t.title}
                        </p>
                        <p className="text-[10px] text-[#1A1A1A]/60 font-light mt-0.5">
                          {t.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 block mb-1">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full bg-[#EAE6DF] border border-black/20 p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@domain.com"
                  className="w-full bg-[#EAE6DF] border border-black/20 p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-[#F5F2ED] py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
                >
                  Confirm Bi-Weekly Subscription
                </button>
              </div>
            </div>

            <p className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/50 text-center">
              Published Every 2nd Tuesday • Zero Spam Guarantee
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
