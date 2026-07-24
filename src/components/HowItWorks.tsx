import React from 'react';

interface HowItWorksProps {
  onTakeQuiz: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onTakeQuiz }) => {
  const steps = [
    {
      num: '01',
      title: 'Formulation Analysis',
      desc: 'Tell us about your lifestyle, cycle, diet, and health goals in under 3 minutes.',
      actionable: true
    },
    {
      num: '02',
      title: 'Precision Protocol',
      desc: 'Receive a bio-identical regimen of supplements curated specifically for your chemistry.'
    },
    {
      num: '03',
      title: 'Daily Ritual',
      desc: 'Composted sachet deliveries keep your daily ritual effortless and consistent.'
    }
  ];

  return (
    <section className="bg-[#EAE6DF] py-16 md:py-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50 block mb-2">
            The Process
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal tracking-tight">
            How it <span className="italic font-normal">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              onClick={step.actionable ? onTakeQuiz : undefined}
              className={`bg-[#F5F2ED] p-8 border border-black/10 flex flex-col justify-between transition-all ${
                step.actionable ? 'cursor-pointer hover:border-black/40 hover:shadow-xl' : ''
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-serif italic text-5xl sm:text-6xl text-[#1A1A1A]">
                    {step.num}
                  </span>
                  {step.actionable && (
                    <span className="text-[9px] uppercase tracking-widest font-bold border border-black/20 px-2.5 py-1">
                      Interactive
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3 font-normal">
                  {step.title}
                </h3>
                <div className="h-px w-12 bg-black/20 mb-4"></div>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/75 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              {step.actionable && (
                <div className="pt-6 mt-6 border-t border-black/10">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5">
                    Start Formulation Analysis →
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
