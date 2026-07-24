import React from 'react';
import { PRODUCTS } from '../data/products';

export const AccountView: React.FC = () => {
  const activeSubscription = PRODUCTS[0];

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* User Banner */}
      <div className="bg-[#EAE6DF] p-6 sm:p-8 border border-black/15 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-[#1A1A1A] text-[#F5F2ED] flex items-center justify-center font-serif text-lg font-bold">
            SC
          </div>
          <div>
            <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">Welcome back, Sarah</h3>
            <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">Member since March 2024 • PureForm Patron</p>
          </div>
        </div>

        <div className="hidden sm:block text-right border-l border-black/10 pl-6">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 block mb-1">
            Daily Ritual Streak
          </span>
          <span className="font-serif text-2xl text-[#1A1A1A]">18 Days Consecutive</span>
        </div>
      </div>

      {/* Active Subscription Pack */}
      <div className="bg-[#F5F2ED] p-6 sm:p-8 border border-black/15 shadow-xs">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/10">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A] border border-black/20 px-2.5 py-1">
              Active Monthly Protocol
            </span>
            <h4 className="font-serif text-2xl text-[#1A1A1A] mt-3 font-normal">
              {activeSubscription.name}
            </h4>
          </div>
          <span className="text-xs font-bold text-[#1A1A1A]">${(activeSubscription.price * 0.85).toFixed(2)}/mo</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 border border-black/10 bg-[#EAE6DF] mb-6">
          <img
            src={activeSubscription.imageUrl}
            alt={activeSubscription.name}
            className="w-20 h-20 object-cover border border-black/10"
          />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-bold text-[#1A1A1A]">Next Box Dispatch Date: August 5, 2026</p>
            <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 mt-0.5">30 Sachets • Cycle & Hormone Support Complex</p>
          </div>
          <div className="flex space-x-2">
            <button className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] border border-black/30 px-3 py-1.5 hover:bg-black/5">
              Modify Protocol
            </button>
            <button className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 hover:text-black px-3 py-1.5">
              Pause
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-[#EAE6DF] border border-black/10">
            <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 font-bold block">Status</span>
            <span className="text-[10px] font-bold uppercase text-[#1A1A1A] mt-0.5 block">Active Refill</span>
          </div>
          <div className="p-3 bg-[#EAE6DF] border border-black/10">
            <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 font-bold block">Interval</span>
            <span className="text-[10px] font-bold uppercase text-[#1A1A1A] mt-0.5 block">30 Days</span>
          </div>
          <div className="p-3 bg-[#EAE6DF] border border-black/10">
            <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 font-bold block">Dispatch</span>
            <span className="text-[10px] font-bold uppercase text-[#1A1A1A] mt-0.5 block">Complimentary</span>
          </div>
          <div className="p-3 bg-[#EAE6DF] border border-black/10">
            <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 font-bold block">Rate Lock</span>
            <span className="text-[10px] font-bold uppercase text-[#1A1A1A] mt-0.5 block">15% Discount</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#F5F2ED] p-6 sm:p-8 border border-black/15">
        <h4 className="font-serif text-xl text-[#1A1A1A] mb-4 font-normal">Dispatch Archive</h4>
        <div className="space-y-3 text-xs text-[#1A1A1A]/80">
          <div className="flex justify-between items-center p-3 bg-[#EAE6DF] border border-black/10">
            <div>
              <p className="font-bold text-[#1A1A1A]">Order #PF-89241</p>
              <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">July 5, 2026 • 1x Daily Essential Pack</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#1A1A1A] block">$40.80</span>
              <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A] border border-black/20 px-1.5 py-0.5 font-medium">Dispatched</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-[#EAE6DF] border border-black/10">
            <div>
              <p className="font-bold text-[#1A1A1A]">Order #PF-77102</p>
              <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">June 5, 2026 • 1x Daily Essential Pack + Botanical Sleep</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#1A1A1A] block">$76.50</span>
              <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A] border border-black/20 px-1.5 py-0.5 font-medium">Dispatched</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
