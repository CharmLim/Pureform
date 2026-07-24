import React from 'react';
import { PRODUCTS } from '../data/products';
import { Product, UserProfile } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onTakeQuiz: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenNewsletter?: () => void;
  onOpenDrLimChat?: () => void;
  user?: UserProfile | null;
  onOpenAuthModal?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onTakeQuiz,
  onSelectProduct,
  onOpenNewsletter,
  onOpenDrLimChat,
  user,
  onOpenAuthModal,
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-sm bg-[#F5F2ED] shadow-2xl flex flex-col justify-between border-r border-black/20">
          <div className="p-6 border-b border-black/10 flex items-center justify-between">
            <h2 className="font-serif text-2xl tracking-tighter text-[#1A1A1A]">PUREFORM</h2>
            <button
              onClick={onClose}
              className="text-[#1A1A1A] hover:opacity-50 p-2 transition-opacity"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-2">
              <button
                onClick={() => {
                  onTakeQuiz();
                  onClose();
                }}
                className="w-full bg-[#1A1A1A] text-[#F5F2ED] p-4 flex items-center justify-between hover:bg-black transition-colors text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#F5F2ED]/70 block">
                    Interactive Analysis
                  </span>
                  <span className="font-serif text-lg">Formulation Quiz</span>
                </div>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              {onOpenDrLimChat && (
                <button
                  onClick={() => {
                    onOpenDrLimChat();
                    onClose();
                  }}
                  className="w-full bg-[#EAE6DF] border border-black/20 text-[#1A1A1A] p-4 flex items-center justify-between hover:border-black transition-all text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#1A1A1A] text-[#F5F2ED] flex items-center justify-center font-serif text-xs font-bold">
                      DL
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 block">
                        Live AI Consultation
                      </span>
                      <span className="font-serif text-base font-normal">Chat with Dr. Lim</span>
                    </div>
                  </div>
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                </button>
              )}
            </div>

            {/* Shop Categories */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-3">
                Curated Formulas
              </p>
              <div className="space-y-2">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="w-full p-3 bg-[#EAE6DF] border border-black/10 hover:border-black/30 text-left flex items-center space-x-3 transition-colors"
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-10 h-10 object-cover border border-black/10"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">{prod.name}</p>
                      <p className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider">{prod.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Navigation Tabs */}
            <div className="pt-4 border-t border-black/10 space-y-3">
              <button
                onClick={() => {
                  onSelectTab('home');
                  onClose();
                }}
                className="w-full text-left py-2 text-base font-serif text-[#1A1A1A] hover:italic"
              >
                Home Index
              </button>
              <button
                onClick={() => {
                  onSelectTab('shop');
                  onClose();
                }}
                className="w-full text-left py-2 text-base font-serif text-[#1A1A1A] hover:italic"
              >
                All Formulas
              </button>
              <button
                onClick={() => {
                  onSelectTab('journal');
                  onClose();
                }}
                className="w-full text-left py-2 text-base font-serif text-[#1A1A1A] hover:italic"
              >
                Health Journal
              </button>
              {onOpenNewsletter && (
                <button
                  onClick={() => {
                    onOpenNewsletter();
                    onClose();
                  }}
                  className="w-full text-left py-2 text-base font-serif text-[#1A1A1A] hover:italic flex items-center justify-between"
                >
                  <span>Bi-Weekly Newsletter</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold border border-black/20 px-1.5 py-0.5">Free</span>
                </button>
              )}
              <button
                onClick={() => {
                  if (user) {
                    onSelectTab('account');
                  } else if (onOpenAuthModal) {
                    onOpenAuthModal();
                  } else {
                    onSelectTab('account');
                  }
                  onClose();
                }}
                className="w-full text-left py-2 text-base font-serif text-[#1A1A1A] hover:italic flex items-center justify-between"
              >
                <span>{user ? `Profile (${user.name})` : 'Log In / Member Portal'}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest border border-black/20 px-2 py-0.5 bg-[#EAE6DF]">
                  {user ? 'Profile' : 'Log In'}
                </span>
              </button>

            </div>
          </div>

          <div className="p-6 border-t border-black/10 bg-[#EAE6DF]">
            <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 text-center font-mono">
              PureForm Editorial • No. 04
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
