import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenMenu: () => void;
  cartCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTakeQuiz: () => void;
  onOpenNewsletter?: () => void;
  onOpenDrLimChat?: () => void;
  user?: UserProfile | null;
  onOpenAuthModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenMenu,
  cartCount,
  activeTab,
  setActiveTab,
  onTakeQuiz,
  onOpenNewsletter,
  onOpenDrLimChat,
  user,
  onOpenAuthModal,
}) => {

  return (
    <header className="fixed top-0 w-full z-40 bg-[#F5F2ED]/95 backdrop-blur-md border-b border-black/10 transition-all">
      <div className="flex justify-between items-center px-6 md:px-12 h-16 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-8 md:gap-10">
          <button
            onClick={onOpenMenu}
            className="text-[#1A1A1A] hover:opacity-60 transition-opacity p-1.5 flex items-center justify-center"
            aria-label="Open Navigation Menu"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>

          <button 
            onClick={() => setActiveTab('home')}
            className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] uppercase focus:outline-none"
          >
            PUREFORM
          </button>

          <nav className="hidden lg:flex gap-6 text-[10px] uppercase tracking-[0.2em] font-medium text-[#1A1A1A]">
            <button
              onClick={() => setActiveTab('shop')}
              className={`hover:opacity-50 transition-opacity ${
                activeTab === 'shop' ? 'border-b border-[#1A1A1A] font-bold' : ''
              }`}
            >
              Formulas
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`hover:opacity-50 transition-opacity ${
                activeTab === 'journal' ? 'border-b border-[#1A1A1A] font-bold' : ''
              }`}
            >
              Journal
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`hover:opacity-50 transition-opacity ${
                activeTab === 'account' ? 'border-b border-[#1A1A1A] font-bold' : ''
              }`}
            >
              Member Archive
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {onOpenDrLimChat && (
            <button
              onClick={onOpenDrLimChat}
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:opacity-50 transition-opacity flex items-center gap-1 bg-[#EAE6DF] border border-black/20 px-2.5 py-1"
            >
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
              <span>Ask Dr. Lim</span>
            </button>
          )}

          {onOpenNewsletter && (
            <button
              onClick={onOpenNewsletter}
              className="hidden md:inline-block text-[10px] uppercase tracking-[0.2em] font-medium hover:opacity-50 transition-opacity text-[#1A1A1A] border-b border-black/20 pb-0.5"
            >
              Newsletter Dispatch
            </button>
          )}

          <button
            onClick={onTakeQuiz}
            className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#1A1A1A] pb-0.5 hover:opacity-50 transition-opacity text-[#1A1A1A]"
          >
            Take Quiz
          </button>

          {/* Log In / Profile Button */}
          {user ? (
            <button
              onClick={() => setActiveTab('account')}
              className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A] hover:opacity-60 transition-opacity flex items-center space-x-1 bg-[#EAE6DF] border border-black/20 px-2 py-1"
            >
              <div className="w-4 h-4 bg-[#1A1A1A] text-[#F5F2ED] font-serif text-[8px] flex items-center justify-center font-bold">
                {user.avatarInitials}
              </div>
              <span className="hidden sm:inline-block max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A] hover:opacity-60 transition-opacity flex items-center space-x-1"
            >
              <span className="material-symbols-outlined text-lg">person</span>
              <span className="hidden sm:inline-block">Log In</span>
            </button>
          )}

          <button
            onClick={onOpenCart}
            className="text-[#1A1A1A] hover:opacity-60 transition-opacity p-2 flex items-center justify-center relative"
            aria-label="Open Shopping Bag"
          >
            <span className="material-symbols-outlined text-xl">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#1A1A1A] text-[#F5F2ED] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
