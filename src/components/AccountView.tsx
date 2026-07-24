import React, { useState } from 'react';
import { UserProfile, DetailedOrder, Product } from '../types';
import { OrderTrackingModal } from './OrderTrackingModal';

interface AccountViewProps {
  user: UserProfile | null;
  orders: DetailedOrder[];
  onLoginClick: () => void;
  onLogout: () => void;
  onReorder: (order: DetailedOrder) => void;
  activeSubscriptionProduct: Product;
  onOpenNewsletter?: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  user,
  orders,
  onLoginClick,
  onLogout,
  onReorder,
  activeSubscriptionProduct,
  onOpenNewsletter,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'in_transit' | 'delivered' | 'subscription'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<DetailedOrder | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(user?.address.street || '');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);

  // If user is not logged in, show elegant login landing block
  if (!user) {
    return (
      <div className="py-20 px-4 max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="bg-[#EAE6DF] border border-black/15 p-8 sm:p-12 shadow-xs">
          <div className="w-16 h-16 bg-[#1A1A1A] text-[#F5F2ED] flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-6">
            PF
          </div>
          <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#1A1A1A] border border-black/20 px-2.5 py-1 bg-[#F5F2ED]">
            Patron Portal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] mt-4 font-normal">
            Log In to Track Dispatches
          </h2>
          <p className="text-xs text-[#1A1A1A]/70 max-w-md mx-auto mt-3 leading-relaxed font-light">
            Sign in to access your order history, live package tracking, active subscription refills, and botanical wellness preferences.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onLoginClick}
              className="w-full sm:w-auto bg-[#1A1A1A] text-[#F5F2ED] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-xs flex items-center justify-center space-x-2"
            >
              <span>Sign In / Register</span>
              <span className="material-symbols-outlined text-sm">login</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-black/10">
            <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">
              ⚡ Need to test? Use 1-Click Demo Login inside the Sign In modal
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeFilter === 'in_transit' && order.status === 'Delivered') return false;
    if (activeFilter === 'delivered' && order.status !== 'Delivered') return false;
    if (activeFilter === 'subscription' && !order.items.some((i) => i.isSubscription)) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchItem = order.items.some((i) => i.productName.toLowerCase().includes(q));
      return matchId || matchItem;
    }

    return true;
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      user.address.street = addressInput;
      try {
        localStorage.setItem('pureform_user', JSON.stringify(user));
      } catch {
        // ignore
      }
    }
    setIsEditingAddress(false);
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 3000);
  };

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Profile Header Banner */}
      <div className="bg-[#EAE6DF] p-6 sm:p-8 border border-black/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-[#1A1A1A] text-[#F5F2ED] flex items-center justify-center font-serif text-xl font-bold border border-black/10">
            {user.avatarInitials}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                Welcome back, {user.name}
              </h3>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-[#1A1A1A] text-[#F5F2ED] px-2 py-0.5">
                {user.tier}
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 mt-1">
              {user.email} • Member since {user.memberSince}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 border-t sm:border-t-0 sm:border-l border-black/10 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 block mb-0.5">
              Daily Ritual Streak
            </span>
            <span className="font-serif text-2xl text-[#1A1A1A] font-normal">
              {user.streakDays} Days Consecutive
            </span>
          </div>

          <button
            onClick={onLogout}
            className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] border border-black/30 px-3 py-2 hover:bg-black/5 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Dispatch & Order Management Section */}
      <div className="bg-[#F5F2ED] p-6 sm:p-8 border border-black/15 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 mb-6 gap-4">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A] border border-black/20 px-2 py-0.5 bg-[#EAE6DF]">
              Order & Dispatch Tracking Hub
            </span>
            <h4 className="font-serif text-2xl text-[#1A1A1A] mt-2 font-normal">
              My Orders & Dispatches
            </h4>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1 bg-[#EAE6DF] p-1 border border-black/10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#1A1A1A] text-[#F5F2ED]'
                  : 'text-[#1A1A1A]/70 hover:text-black'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setActiveFilter('in_transit')}
              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'in_transit'
                  ? 'bg-[#1A1A1A] text-[#F5F2ED]'
                  : 'text-[#1A1A1A]/70 hover:text-black'
              }`}
            >
              In Transit ({orders.filter((o) => o.status !== 'Delivered').length})
            </button>
            <button
              onClick={() => setActiveFilter('delivered')}
              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'delivered'
                  ? 'bg-[#1A1A1A] text-[#F5F2ED]'
                  : 'text-[#1A1A1A]/70 hover:text-black'
              }`}
            >
              Delivered ({orders.filter((o) => o.status === 'Delivered').length})
            </button>
            <button
              onClick={() => setActiveFilter('subscription')}
              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'subscription'
                  ? 'bg-[#1A1A1A] text-[#F5F2ED]'
                  : 'text-[#1A1A1A]/70 hover:text-black'
              }`}
            >
              Subscriptions
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID (e.g. PF-99412) or product name..."
            className="w-full bg-[#EAE6DF] border border-black/20 p-3 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-black font-sans"
          />
        </div>

        {/* Order Cards List */}
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center bg-[#EAE6DF] border border-black/10">
            <p className="font-serif text-lg text-[#1A1A1A]">No orders match your filter criteria.</p>
            <p className="text-xs text-[#1A1A1A]/60 mt-1">Try resetting your search or tab filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const isInTransit = order.status !== 'Delivered';

              return (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 bg-[#EAE6DF] border border-black/15 shadow-2xs space-y-4"
                >
                  {/* Order Top Line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/10 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-lg font-medium text-[#1A1A1A]">
                          Order #{order.id}
                        </span>
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 border ${
                            isInTransit
                              ? 'bg-amber-100/80 border-amber-800 text-amber-900'
                              : 'bg-emerald-100/80 border-emerald-800 text-emerald-900'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 mt-0.5">
                        Placed on {order.date} • Courier: {order.carrier}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-serif text-xl font-bold text-[#1A1A1A] block">
                        ${order.total.toFixed(2)}
                      </span>
                      {order.estimatedDelivery && (
                        <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 block font-mono">
                          {order.estimatedDelivery}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Progress Bar for Active / In Transit Orders */}
                  {isInTransit && (
                    <div className="p-3 bg-[#F5F2ED] border border-black/10">
                      <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-wider text-[#1A1A1A]/70 mb-2">
                        <span>Status: Live Dispatch</span>
                        <span className="font-mono text-[#1A1A1A]">{order.trackingNumber}</span>
                      </div>
                      <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-[#1A1A1A] h-full transition-all duration-500"
                          style={{
                            width:
                              order.status === 'Processing'
                                ? '25%'
                                : order.status === 'Formulating'
                                ? '50%'
                                : order.status === 'In Transit'
                                ? '75%'
                                : '90%',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-14 h-14 object-cover border border-black/10"
                        />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-[#1A1A1A]">{item.productName}</p>
                          <p className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider">
                            Qty: {item.quantity} • ${item.price.toFixed(2)} each{' '}
                            {item.isSubscription && '• [30-Day Refill Protocol]'}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="pt-3 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">
                      Deliver to: <strong>{order.shippingAddress.street}</strong>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => setSelectedOrderForTracking(order)}
                        className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F5F2ED] border border-black/30 px-3.5 py-2 hover:bg-black hover:text-[#F5F2ED] transition-colors flex items-center space-x-1"
                      >
                        <span className="material-symbols-outlined text-xs">local_shipping</span>
                        <span>Track Live Package</span>
                      </button>

                      <button
                        onClick={() => onReorder(order)}
                        className="text-[10px] font-bold uppercase tracking-wider text-[#F5F2ED] bg-[#1A1A1A] border border-black px-3.5 py-2 hover:bg-black transition-colors flex items-center space-x-1"
                      >
                        <span className="material-symbols-outlined text-xs">refresh</span>
                        <span>Re-Order Formula</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Subscription Box */}
      <div className="bg-[#F5F2ED] p-6 sm:p-8 border border-black/15 shadow-xs">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/10">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A] border border-black/20 px-2.5 py-1">
              Active Monthly Protocol
            </span>
            <h4 className="font-serif text-2xl text-[#1A1A1A] mt-3 font-normal">
              {activeSubscriptionProduct.name}
            </h4>
          </div>
          <span className="text-xs font-bold text-[#1A1A1A]">
            ${(activeSubscriptionProduct.price * 0.85).toFixed(2)}/mo
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 border border-black/10 bg-[#EAE6DF] mb-6">
          <img
            src={activeSubscriptionProduct.imageUrl}
            alt={activeSubscriptionProduct.name}
            className="w-20 h-20 object-cover border border-black/10"
          />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-bold text-[#1A1A1A]">Next Box Dispatch Date: August 5, 2026</p>
            <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 mt-0.5">
              30 Sachets • Cycle & Hormone Support Complex
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] border border-black/30 px-3 py-1.5 hover:bg-black/5">
              Modify Protocol
            </button>
            <button className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 hover:text-black px-3 py-1.5">
              Pause Refill
            </button>
          </div>
        </div>
      </div>

      {/* Personal Address & Preferences */}
      <div className="bg-[#F5F2ED] p-6 sm:p-8 border border-black/15 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-black/10">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A] border border-black/20 px-2 py-0.5 bg-[#EAE6DF]">
              Saved Settings
            </span>
            <h4 className="font-serif text-xl text-[#1A1A1A] mt-2 font-normal">
              Default Delivery Address
            </h4>
          </div>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-black pb-0.5"
          >
            {isEditingAddress ? 'Cancel' : 'Edit Address'}
          </button>
        </div>

        {savedSuccessMsg && (
          <p className="text-xs text-emerald-800 font-bold bg-emerald-100/80 p-2 border border-emerald-300">
            ✓ Address updated successfully.
          </p>
        )}

        {isEditingAddress ? (
          <form onSubmit={handleSaveAddress} className="space-y-3 pt-2">
            <div>
              <label className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 block mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full bg-[#EAE6DF] border border-black/20 p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1A1A1A] text-[#F5F2ED] px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-black"
            >
              Save Address
            </button>
          </form>
        ) : (
          <div className="text-xs text-[#1A1A1A]/80 leading-relaxed font-light bg-[#EAE6DF] p-4 border border-black/10">
            <p className="font-bold text-[#1A1A1A]">{user.name}</p>
            <p>{user.address.street}</p>
            <p>
              {user.address.city}, {user.address.state} {user.address.zip}
            </p>
          </div>
        )}
      </div>

      {/* Tracking Modal */}
      <OrderTrackingModal
        order={selectedOrderForTracking}
        onClose={() => setSelectedOrderForTracking(null)}
      />
    </div>
  );
};
