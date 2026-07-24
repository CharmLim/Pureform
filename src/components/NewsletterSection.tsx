import React, { useState, useEffect } from 'react';
import { NewsletterSubscription } from '../types';

interface NewsletterSectionProps {
  onOpenModal?: () => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onOpenModal }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Herbs & Botanical Spotlights',
    'Recent Health Trends & Physiology',
    'Clinical Ingredient Research',
  ]);
  const [frequency, setFrequency] = useState('Bi-Weekly Dispatch');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<NewsletterSubscription | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pureform_newsletter_sub');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSubscriptionData(parsed);
        setIsSubscribed(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const allTopics = [
    { id: 'Herbs & Botanical Spotlights', label: 'Herbs & Botanical Spotlights', icon: 'eco', desc: 'Deep-dives into Ashwagandha, Chasteberry, Rhodiola, and Curcumin.' },
    { id: 'Recent Health Trends & Physiology', label: 'Recent Health Trends & Physiology', icon: 'biomedical', desc: 'Analysis on circadian alignment, hormone balance & cortisol science.' },
    { id: 'Clinical Ingredient Research', label: 'Clinical Ingredient Research', icon: 'science', desc: 'Standardized extract trials, bioavailability studies & purity standards.' },
  ];

  const recentEditions = [
    {
      issue: 'Issue No. 24',
      date: 'Bi-Weekly Issue • Current',
      title: 'Phytosterols & Bio-Identical Progesterone Pathways',
      category: 'Herbs & Botanicals',
      summary: 'An investigation into how micronized Wild Yam extracts interact with luteal phase signaling.',
      readTime: '6 min read',
    },
    {
      issue: 'Issue No. 23',
      date: 'Bi-Weekly Issue • 2 weeks ago',
      title: 'Adaptogenic Synergies: Ashwagandha KSM-66 vs. Rhodiola',
      category: 'Clinical Ingredients',
      summary: 'Comparing cortisol dampening velocity and serum DHEA stabilization across 12-week clinical trials.',
      readTime: '8 min read',
    },
    {
      issue: 'Issue No. 22',
      date: 'Bi-Weekly Issue • 1 month ago',
      title: 'Circadian Cortisol Resets & Magnesium Bisglycinate',
      category: 'Health Trends',
      summary: 'Exploring nighttime neurotransmitter synthesis and REM architecture through bio-available chelation.',
      readTime: '5 min read',
    },
  ];

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const newSub: NewsletterSubscription = {
      email,
      name: name || undefined,
      topics: selectedTopics,
      frequency,
      subscribedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    try {
      localStorage.setItem('pureform_newsletter_sub', JSON.stringify(newSub));
    } catch {
      // ignore
    }

    setSubscriptionData(newSub);
    setIsSubscribed(true);
  };

  const handleUnsubscribe = () => {
    try {
      localStorage.removeItem('pureform_newsletter_sub');
    } catch {
      // ignore
    }
    setIsSubscribed(false);
    setSubscriptionData(null);
  };

  return (
    <section id="newsletter-section" className="py-20 px-6 max-w-7xl mx-auto border-b border-black/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-black/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A] border border-black/20 px-2 py-0.5 bg-[#EAE6DF]">
              Bi-Weekly Publication
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/50 font-mono">
              / Health Trends, Herbs & Ingredients
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal tracking-tight">
            The PureForm <span className="italic font-normal">Botanical Dispatch</span>
          </h2>
        </div>
        <p className="text-xs text-[#1A1A1A]/70 max-w-sm mt-3 md:mt-0 font-light leading-relaxed">
          Delivering rigorous, peer-reviewed analysis on emerging health trends, ethnobotanical extracts, and active ingredient science twice a month.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form & Subscription State */}
        <div className="lg:col-span-7 bg-[#EAE6DF] border border-black/15 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#1A1A1A]">
                Subscription Protocol
              </span>
              <span className="text-[10px] uppercase font-mono text-[#1A1A1A]/60">
                100% Free • Cancel Anytime
              </span>
            </div>

            {isSubscribed && subscriptionData ? (
              <div className="bg-[#F5F2ED] border border-black/15 p-6 space-y-4">
                <div className="flex items-center space-x-3 text-[#1A1A1A]">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                  <div>
                    <h4 className="font-serif text-xl font-medium">Dispatch Subscription Active</h4>
                    <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">
                      Registered Email: <strong className="text-[#1A1A1A]">{subscriptionData.email}</strong>
                    </p>
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4 space-y-2">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/70">
                    Active Curation Topics:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {subscriptionData.topics.map((t) => (
                      <span
                        key={t}
                        className="bg-[#EAE6DF] border border-black/20 text-[#1A1A1A] text-[10px] uppercase tracking-wider px-3 py-1 font-medium"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">
                    Next Dispatch: Next Tuesday 08:00 EST
                  </span>
                  <button
                    onClick={handleUnsubscribe}
                    className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 hover:text-black font-bold border-b border-black/30 pb-0.5"
                  >
                    Modify / Pause Subscription
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal mb-2">
                    Subscribe to Bi-Weekly Insights
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 font-light leading-relaxed">
                    Join over 24,000 health practitioners and formula enthusiasts receiving our curated reports on recent health trends, herbal medicine, and ingredient purity.
                  </p>
                </div>

                {/* Topics Selection */}
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] block mb-3">
                    Select Your Topic Interests (All Included by Default):
                  </label>
                  <div className="space-y-2.5">
                    {allTopics.map((item) => {
                      const isChecked = selectedTopics.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleTopic(item.id)}
                          className={`p-3 border text-left cursor-pointer transition-all flex items-start space-x-3 ${
                            isChecked
                              ? 'border-black bg-[#F5F2ED]'
                              : 'border-black/10 bg-white/40 hover:bg-white/80'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg text-[#1A1A1A] mt-0.5">
                            {isChecked ? 'check_box' : 'checkbox_outline_blank'}
                          </span>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                              {item.label}
                            </p>
                            <p className="text-[11px] text-[#1A1A1A]/60 font-light mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Email Inputs */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 block mb-1">
                        First Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah"
                        className="w-full bg-[#F5F2ED] border border-black/20 p-3 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-black font-sans"
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
                        className="w-full bg-[#F5F2ED] border border-black/20 p-3 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-black font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/60">
                      Frequency: Bi-Weekly Every 2nd Tuesday
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1A1A1A] text-[#F5F2ED] py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-xs flex items-center justify-center space-x-2"
                  >
                    <span>Subscribe to Bi-Weekly Dispatch</span>
                    <span className="material-symbols-outlined text-sm">mail</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/50 mt-6 text-center sm:text-left">
            🔒 No Spam • Unsubscribe in 1-Click • Verified Editorial Content
          </p>
        </div>

        {/* Right Column: Recent Newsletter Issue Previews */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#1A1A1A]">
              Recent Newsletter Archives
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 font-mono">
              Bi-Weekly Series
            </span>
          </div>

          <div className="space-y-4 flex-1">
            {recentEditions.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#F5F2ED] border border-black/10 hover:border-black/30 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/50 font-mono">
                      {item.issue} • {item.category}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/40">
                      {item.readTime}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-[#1A1A1A] font-medium leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 mt-2 font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A] flex items-center gap-1">
                    <span>Read Archival Extract</span>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/40">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#EAE6DF] border border-black/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-xl text-[#1A1A1A]">menu_book</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Looking for Past Issues?
                </p>
                <p className="text-[10px] text-[#1A1A1A]/60 font-light">
                  Browse all 24+ published issues on herbs & health trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
