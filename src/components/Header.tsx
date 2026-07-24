import React from 'react';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenMenu: () => void;
  cartCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTakeQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenMenu,
  cartCount,
  activeTab,
  setActiveTab,
  onTakeQuiz
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
          <button
            onClick={onTakeQuiz}
            className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#1A1A1A] pb-0.5 hover:opacity-50 transition-opacity text-[#1A1A1A]"
          >
            Take Quiz
          </button>

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
