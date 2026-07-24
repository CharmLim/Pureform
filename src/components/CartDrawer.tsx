import React, { useState } from 'react';
import { CartItem, DetailedOrder, UserProfile } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onToggleSubscription: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAddOrder?: (order: DetailedOrder) => void;
  user?: UserProfile | null;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onToggleSubscription,
  onRemoveItem,
  onClearCart,
  onAddOrder,
  user,
}) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = item.isSubscription
      ? item.product.price * 0.85
      : item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const shipping = subtotal > 50 || cart.length === 0 ? 0 : 5.0;
  const grandTotal = subtotal + shipping;

  const handleCheckout = () => {
    setCheckingOut(true);

    const newOrder: DetailedOrder = {
      id: `PF-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      estimatedDelivery: 'Expected in 2-3 Business Days',
      status: 'Processing',
      trackingNumber: `DHL-EXPRESS-${Math.floor(100000000 + Math.random() * 900000000)}`,
      carrier: 'DHL Express Air',
      items: cart.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        imageUrl: i.product.imageUrl,
        quantity: i.quantity,
        price: i.isSubscription ? i.product.price * 0.85 : i.product.price,
        isSubscription: i.isSubscription,
      })),
      subtotal,
      shippingCost: shipping,
      total: grandTotal,
      shippingAddress: user?.address
        ? { name: user.name, ...user.address }
        : {
            name: 'Sarah Connor',
            street: '742 Evergreen Terrace, Suite 4B',
            city: 'San Francisco',
            state: 'CA',
            zip: '94107',
          },
      trackingSteps: [
        {
          status: 'Order Confirmed',
          description: 'Payment processed and order routed to clean room formulation lab.',
          timestamp: 'Just Now',
          completed: true,
        },
        {
          status: 'Botanical Quality Audit',
          description: 'Standardized potency testing & hermetic sachet sealing.',
          timestamp: 'Scheduled for Today',
          completed: false,
        },
        {
          status: 'Dispatched to DHL Express',
          description: 'Package queued for courier pickup.',
          timestamp: 'Scheduled for Tomorrow',
          completed: false,
        },
      ],
    };

    setTimeout(() => {
      if (onAddOrder) {
        onAddOrder(newOrder);
      }
      setCheckingOut(false);
      setCompletedOrder(true);
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F5F2ED] shadow-2xl flex flex-col justify-between border-l border-black/20">
          {/* Header */}
          <div className="p-6 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-[#1A1A1A] text-xl">shopping_bag</span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">Shopping Bag</h3>
              <span className="text-[10px] uppercase font-bold text-[#1A1A1A] border border-black/20 px-2 py-0.5">
                {cart.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#1A1A1A] hover:opacity-50 p-2 transition-opacity"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {completedOrder ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 border border-black/20 bg-[#EAE6DF] text-[#1A1A1A] flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-2xl">check</span>
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2 font-normal">
                  Dispatch Confirmed
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 max-w-xs mx-auto mb-6 font-light">
                  Thank you for starting your ritual. Confirmation and tracking credentials have been dispatched to your email.
                </p>
                <button
                  onClick={() => {
                    setCompletedOrder(false);
                    onClose();
                  }}
                  className="bg-[#1A1A1A] text-[#F5F2ED] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
                >
                  Return to Archive
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-3xl text-[#1A1A1A]/40 mb-3 block">
                  local_mall
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-1">Your Bag is Empty</p>
                <p className="text-xs text-[#1A1A1A]/60 max-w-xs mx-auto font-light">
                  Take our formulation analysis to curate your personalized daily pack.
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const itemUnitPrice = item.isSubscription
                  ? item.product.price * 0.85
                  : item.product.price;

                return (
                  <div
                    key={item.product.id}
                    className="flex space-x-4 p-4 bg-[#EAE6DF] border border-black/10 relative"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover border border-black/10"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-base text-[#1A1A1A] font-medium leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#1A1A1A]/50 hover:text-black transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 mt-0.5">
                          {item.product.subtitle}
                        </p>
                      </div>

                      {/* Subscription toggle checkbox */}
                      <label className="flex items-center space-x-2 my-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isSubscription}
                          onChange={() => onToggleSubscription(item.product.id)}
                          className="border-black/30 text-[#1A1A1A] focus:ring-black"
                        />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                          Monthly Subscription (Save 15%)
                        </span>
                      </label>

                      <div className="flex items-center justify-between mt-1">
                        {/* Quantity control */}
                        <div className="flex items-center border border-black/20 bg-[#F5F2ED] px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="text-xs text-[#1A1A1A] px-1 hover:font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="text-xs text-[#1A1A1A] px-1 hover:font-bold"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#1A1A1A]">
                          ${(itemUnitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary */}
          {!completedOrder && cart.length > 0 && (
            <div className="p-6 border-t border-black/10 bg-[#EAE6DF] space-y-4">
              <div className="space-y-2 text-xs text-[#1A1A1A]/80 font-light">
                <div className="flex justify-between">
                  <span className="uppercase text-[10px] tracking-wider">Subtotal</span>
                  <span className="font-bold text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase text-[10px] tracking-wider">Estimated Dispatch</span>
                  <span>{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-3 border-t border-black/10">
                  <span className="uppercase text-xs tracking-widest">Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full bg-[#1A1A1A] text-[#F5F2ED] py-4 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {checkingOut ? (
                  <span>Processing Protocol...</span>
                ) : (
                  <>
                    <span>Proceed to Dispatch</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
              <p className="text-[9px] text-center uppercase tracking-widest text-[#1A1A1A]/50">
                🔒 Encrypted Checkout • 30-Day Guarantee
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
