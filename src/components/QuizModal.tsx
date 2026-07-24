import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, isSubscription: boolean) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onAddToCart }) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('Cycle & Hormones');
  const [symptom, setSymptom] = useState('PMS & Mood Fluctuations');
  const [diet, setDiet] = useState('Omnivore / Balanced');
  const [stress, setStress] = useState('Moderate');

  if (!isOpen) return null;

  const totalSteps = 4;

  const goals = [
    { id: 'cycle', title: 'Cycle & Hormones', icon: 'cyclone', desc: 'Support cycle balance, PMS, and energy shifts' },
    { id: 'sleep', title: 'Restful Sleep', icon: 'bedtime', desc: 'Fall asleep faster and wake up refreshed' },
    { id: 'gut', title: 'Gut & Digestion', icon: 'ecg_heart', desc: 'Reduce bloating and promote smooth digestion' },
    { id: 'energy', title: 'Sustained Energy', icon: 'bolt', desc: 'Clean, steady vitality without caffeine crashes' },
  ];

  const symptomsByGoal: Record<string, string[]> = {
    'Cycle & Hormones': ['PMS & Mood Fluctuations', 'Heavy or Irregular Cycles', 'Hormonal Breakouts', 'Low Luteal Phase Energy'],
    'Restful Sleep': ['Trouble Falling Asleep', 'Frequent Night Waking', 'Morning Grogginess', 'Nighttime Anxiety'],
    'Gut & Digestion': ['Post-Meal Bloating', 'Irregular Digestion', 'Food Sensitivities', 'Sluggish Gut'],
    'Sustained Energy': ['3PM Energy Slump', 'Brain Fog & Focus', 'Post-Workout Recovery', 'Chronic Fatigue'],
  };

  const recommendedProduct: Product = PRODUCTS.find((p) => {
    if (goal === 'Restful Sleep') return p.category === 'sleep';
    if (goal === 'Gut & Digestion') return p.category === 'digestion';
    if (goal === 'Sustained Energy') return p.category === 'energy';
    return p.category === 'daily-packs';
  }) || PRODUCTS[0];

  const handleFinish = () => {
    onAddToCart(recommendedProduct, true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F5F2ED] w-full max-w-xl p-6 sm:p-8 border border-black/20 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#1A1A1A] hover:opacity-50 p-2 transition-opacity"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {step <= totalSteps ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-6 border-b border-black/10 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]">
                Protocol Step {step} / {totalSteps}
              </span>
              <div className="flex space-x-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1 transition-all ${
                      s <= step ? 'w-6 bg-[#1A1A1A]' : 'w-2 bg-black/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] mb-2 font-normal">
                  Primary Wellness Goal
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 mb-6 font-light">
                  Select the main physiological concern you wish to target.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {goals.map((g) => (
                    <button
                      key={g.title}
                      onClick={() => {
                        setGoal(g.title);
                        setSymptom(symptomsByGoal[g.title][0]);
                      }}
                      className={`p-4 border text-left transition-all flex flex-col justify-between ${
                        goal === g.title
                          ? 'border-black bg-[#EAE6DF] shadow-xs'
                          : 'border-black/10 bg-[#F5F2ED] hover:bg-[#EAE6DF]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[#1A1A1A] mb-2 text-xl">
                        {g.icon}
                      </span>
                      <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">{g.title}</p>
                        <p className="text-[11px] text-[#1A1A1A]/70 mt-1 font-light">{g.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] mb-2 font-normal">
                  Specific Symptom Profile
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 mb-6 font-light">
                  Refining formulation ratios for {goal}.
                </p>
                <div className="space-y-3 mb-8">
                  {(symptomsByGoal[goal] || symptomsByGoal['Cycle & Hormones']).map((sym) => (
                    <button
                      key={sym}
                      onClick={() => setSymptom(sym)}
                      className={`w-full p-4 border text-left transition-all flex items-center justify-between ${
                        symptom === sym
                          ? 'border-black bg-[#EAE6DF] font-bold text-[#1A1A1A]'
                          : 'border-black/10 bg-[#F5F2ED] text-[#1A1A1A] hover:bg-[#EAE6DF]'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-wider">{sym}</span>
                      {symptom === sym && (
                        <span className="material-symbols-outlined text-[#1A1A1A] text-lg">
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] mb-2 font-normal">
                  Dietary Preferences
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 mb-6 font-light">
                  Aligning capsule matrix and excipients with your regimen.
                </p>
                <div className="space-y-3 mb-8">
                  {['Omnivore / Balanced', 'Vegetarian', 'Vegan', 'Gluten-Free & Dairy-Free'].map(
                    (d) => (
                      <button
                        key={d}
                        onClick={() => setDiet(d)}
                        className={`w-full p-4 border text-left transition-all flex items-center justify-between ${
                          diet === d
                            ? 'border-black bg-[#EAE6DF] font-bold text-[#1A1A1A]'
                            : 'border-black/10 bg-[#F5F2ED] text-[#1A1A1A] hover:bg-[#EAE6DF]'
                        }`}
                      >
                        <span className="text-xs uppercase tracking-wider">{d}</span>
                        {diet === d && (
                          <span className="material-symbols-outlined text-[#1A1A1A] text-lg">
                            check
                          </span>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] mb-2 font-normal">
                  Stress & Cortisol Response
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 mb-6 font-light">
                  Stress alters micronutrient absorption and luteal signaling.
                </p>
                <div className="space-y-3 mb-8">
                  {['Low & Grounded', 'Moderate - Busy Lifestyle', 'High - Constant Work Demands'].map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => setStress(st)}
                        className={`w-full p-4 border text-left transition-all flex items-center justify-between ${
                          stress === st
                            ? 'border-black bg-[#EAE6DF] font-bold text-[#1A1A1A]'
                            : 'border-black/10 bg-[#F5F2ED] text-[#1A1A1A] hover:bg-[#EAE6DF]'
                        }`}
                      >
                        <span className="text-xs uppercase tracking-wider">{st}</span>
                        {stress === st && (
                          <span className="material-symbols-outlined text-[#1A1A1A] text-lg">
                            check
                          </span>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-black/10">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-bold border-b border-[#1A1A1A] pb-0.5"
                >
                  ← Previous
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={() => setStep(step + 1)}
                className="bg-[#1A1A1A] text-[#F5F2ED] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
              >
                {step === totalSteps ? 'See Protocol →' : 'Continue →'}
              </button>
            </div>
          </div>
        ) : (
          /* Recommendation Result Screen */
          <div className="text-center py-2">
            <span className="inline-block border border-black/20 text-[#1A1A1A] text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1 mb-3">
              Curated Protocol Result
            </span>
            <h3 className="font-serif text-3xl text-[#1A1A1A] mb-2 font-normal">
              Protocol: {recommendedProduct.name}
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 max-w-md mx-auto mb-6 font-light">
              Formulated for <strong>{goal}</strong> targeting <em>{symptom}</em> under a {diet.toLowerCase()} diet.
            </p>

            <div className="bg-[#EAE6DF] p-5 border border-black/10 text-left mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={recommendedProduct.imageUrl}
                  alt={recommendedProduct.name}
                  className="w-16 h-16 object-cover border border-black/10"
                />
                <div>
                  <h4 className="font-serif text-lg text-[#1A1A1A] font-medium">
                    {recommendedProduct.name}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">30 Daily Sachets</p>
                  <p className="text-xs font-bold text-[#1A1A1A] mt-1">
                    ${(recommendedProduct.price * 0.85).toFixed(2)}{' '}
                    <span className="line-through text-[10px] text-[#1A1A1A]/50 font-normal">
                      ${recommendedProduct.price.toFixed(2)}
                    </span>{' '}
                    <span className="text-[9px] uppercase font-bold text-[#1A1A1A] border border-black/20 px-1.5 py-0.5 ml-1">
                      Save 15%
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-2">
                Active Botanical Complex:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {recommendedProduct.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-[#F5F2ED] border border-black/15 text-[#1A1A1A] text-[10px] uppercase tracking-wider px-2.5 py-1 font-medium"
                  >
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-black/20 text-[#1A1A1A] py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black/5 transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 bg-[#1A1A1A] text-[#F5F2ED] py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
              >
                Add Protocol to Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
