import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'shop', label: 'Formulas', icon: 'grid_view' },
    { id: 'journal', label: 'Journal', icon: 'auto_stories' },
    { id: 'account', label: 'Archive', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-40 bg-[#F5F2ED] border-t border-black/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex justify-around items-center h-20 px-4">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
              isActive
                ? 'text-[#1A1A1A] font-bold'
                : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl transition-all ${
                isActive ? 'fill text-[#1A1A1A]' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className={`text-[9px] mt-1 uppercase tracking-[0.15em] ${isActive ? 'font-bold border-b border-[#1A1A1A]' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
