import React from 'react';

interface InfoModalProps {
  type: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const getTitle = () => {
    switch (type) {
      case 'privacy':
        return 'Privacy Policy';
      case 'terms':
        return 'Terms of Service';
      case 'faq':
        return 'Frequently Asked Questions';
      case 'contact':
        return 'Contact PureForm Care';
      default:
        return 'Information';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fbf9f4] w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#c3c8c1]/30 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#c3c8c1]/20">
          <h3 className="font-serif text-2xl text-[#334537] font-normal">{getTitle()}</h3>
          <button
            onClick={onClose}
            className="text-[#334537] hover:bg-[#334537]/10 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {type === 'privacy' && (
          <div className="text-xs sm:text-sm text-[#434843] space-y-3 leading-relaxed">
            <p>
              At PureForm Health, your health privacy and personal health assessment responses are strictly safeguarded.
            </p>
            <p>
              We use bank-level encryption protocols to protect your health goals, quiz responses, and payment data. We never sell or distribute your personal health data to third-party advertisers.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="text-xs sm:text-sm text-[#434843] space-y-3 leading-relaxed">
            <p>
              All PureForm supplement formulations are produced in TGA-approved and GMP-certified facilities adhering to international medical standards.
            </p>
            <p>
              Subscription packs auto-renew every 30 days and can be paused, modified, or canceled at any time prior to your monthly dispense date with zero hidden fees.
            </p>
          </div>
        )}

        {type === 'faq' && (
          <div className="text-xs sm:text-sm text-[#434843] space-y-4 leading-relaxed">
            <div>
              <p className="font-bold text-[#334537]">How do the daily packs work?</p>
              <p className="mt-1">Each pack contains 30 pre-portioned daily sachets containing your custom blend of bio-available botanical capsules.</p>
            </div>
            <div>
              <p className="font-bold text-[#334537]">When will I feel results?</p>
              <p className="mt-1">Most members report noticeable changes in sleep and gut lightness within 7–10 days, with full cycle and energy optimization taking 30–60 days.</p>
            </div>
            <div>
              <p className="font-bold text-[#334537]">Can I modify my ingredients?</p>
              <p className="mt-1">Yes! You can retake the quiz anytime in your account dashboard to update your formulas.</p>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="text-xs sm:text-sm text-[#434843] space-y-4 leading-relaxed">
            <p>Our team of naturopaths and health advisors are available 7 days a week.</p>
            <div className="bg-[#f5f3ee] p-4 rounded-2xl border border-[#c3c8c1]/30 space-y-2">
              <p className="font-bold text-[#334537]">📧 Email Support: hello@pureformhealth.com</p>
              <p className="font-bold text-[#334537]">📞 Naturopath Helpline: +1 (800) 555-PURE</p>
              <p className="text-[11px] text-[#434843]">Mon-Fri: 8am - 6pm EST | Sat-Sun: 9am - 3pm EST</p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#c3c8c1]/20 text-right">
          <button
            onClick={onClose}
            className="bg-[#334537] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#4a5d4e]"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
