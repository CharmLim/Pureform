import React from 'react';
import { DetailedOrder } from '../types';

interface OrderTrackingModalProps {
  order: DetailedOrder | null;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const isDelivered = order.status === 'Delivered';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#F5F2ED] w-full max-w-lg p-6 sm:p-8 border border-black/20 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#1A1A1A] hover:opacity-50 p-2 transition-opacity"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-black/10 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#1A1A1A] border border-black/20 px-2 py-0.5 bg-[#EAE6DF]">
              Live Dispatch Tracking
            </span>
            <span className="text-[10px] uppercase font-mono text-[#1A1A1A]/60">
              {order.carrier}
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
            Order #{order.id}
          </h3>
          <p className="text-xs text-[#1A1A1A]/70 mt-1 font-light">
            Tracking Number: <strong className="font-mono text-[#1A1A1A]">{order.trackingNumber}</strong>
          </p>
        </div>

        {/* Current Status Box */}
        <div className="bg-[#EAE6DF] border border-black/15 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A]/60 block">
                Current Package Status
              </span>
              <span className="font-serif text-xl font-medium text-[#1A1A1A]">
                {order.status}
              </span>
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 border ${
              isDelivered
                ? 'bg-[#1A1A1A] text-[#F5F2ED] border-black'
                : 'bg-[#F5F2ED] text-[#1A1A1A] border-black/30'
            }`}>
              {isDelivered ? 'Complete' : 'In Transit'}
            </span>
          </div>

          {order.estimatedDelivery && (
            <div className="mt-3 pt-3 border-t border-black/10 flex items-center justify-between text-xs">
              <span className="text-[#1A1A1A]/70 font-light">Estimated Delivery:</span>
              <span className="font-bold text-[#1A1A1A]">{order.estimatedDelivery}</span>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="mb-6 space-y-4">
          <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A] border-b border-black/10 pb-2">
            Dispatch Audit Log & Milestone Timeline
          </h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-black/15">
            {order.trackingSteps.map((step, idx) => {
              return (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                      step.completed
                        ? 'bg-[#1A1A1A] border-[#1A1A1A]'
                        : 'bg-[#F5F2ED] border-black/30'
                    }`}
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-bold uppercase tracking-wider ${
                        step.completed ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'
                      }`}>
                        {step.status}
                      </p>
                      <span className="text-[10px] font-mono text-[#1A1A1A]/50">
                        {step.timestamp}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 font-light leading-relaxed ${
                      step.completed ? 'text-[#1A1A1A]/70' : 'text-[#1A1A1A]/40'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Item Summary */}
        <div className="bg-[#EAE6DF] border border-black/10 p-4 mb-6 space-y-3">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 block">
            Package Contents ({order.items.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 text-xs">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-12 h-12 object-cover border border-black/10"
              />
              <div className="flex-1">
                <p className="font-bold text-[#1A1A1A]">{item.productName}</p>
                <p className="text-[10px] text-[#1A1A1A]/60">
                  Qty: {item.quantity} • ${item.price.toFixed(2)} each {item.isSubscription && '(Subscription Sachet)'}
                </p>
              </div>
              <span className="font-bold text-[#1A1A1A]">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Shipping Address */}
        <div className="text-xs text-[#1A1A1A]/70 mb-6 p-3 border border-black/10 bg-[#F5F2ED]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
            Dispatch Address
          </span>
          <p className="font-medium text-[#1A1A1A]">{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#1A1A1A] text-[#F5F2ED] py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
        >
          Close Tracking
        </button>
      </div>
    </div>
  );
};
