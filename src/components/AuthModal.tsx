import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEMO_USER } from '../data/mockOrders';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Create or log in user profile
    const initials = name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : email[0].toUpperCase();

    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || email.split('@')[0],
      email: email,
      avatarInitials: initials,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      tier: 'PureForm Member',
      streakDays: 1,
      address: {
        street: '123 Botanical Ave, Suite 100',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102',
      },
    };

    try {
      localStorage.setItem('pureform_user', JSON.stringify(user));
    } catch {
      // ignore
    }

    onLoginSuccess(user);
    onClose();
  };

  const handleDemoLogin = () => {
    try {
      localStorage.setItem('pureform_user', JSON.stringify(DEMO_USER));
    } catch {
      // ignore
    }
    onLoginSuccess(DEMO_USER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#F5F2ED] w-full max-w-md p-6 sm:p-8 border border-black/20 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#1A1A1A] hover:opacity-50 p-2 transition-opacity"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="mb-6 border-b border-black/10 pb-4">
          <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#1A1A1A] border border-black/20 px-2 py-0.5 bg-[#EAE6DF] inline-block mb-2">
            PureForm Patron Portal
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
            {isSignUp ? 'Create Your Account' : 'Member Log In'}
          </h3>
          <p className="text-xs text-[#1A1A1A]/70 mt-1 font-light">
            {isSignUp
              ? 'Join PureForm to track dispatches, manage subscriptions, and unlock custom botanical protocols.'
              : 'Sign in to track live dispatches, review order history, and manage recurring formulas.'}
          </p>
        </div>

        {/* 1-Click Quick Demo Login Button */}
        <div className="mb-6 p-4 bg-[#EAE6DF] border border-black/15">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">
              ⚡ Instant Testing Access
            </span>
            <span className="text-[9px] font-mono text-[#1A1A1A]/50">Pre-loaded Orders</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-[#1A1A1A] text-[#F5F2ED] py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center space-x-2 shadow-xs"
          >
            <span>Log In as Demo User (Sarah Connor)</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/10"></div>
          </div>
          <span className="relative bg-[#F5F2ED] px-3 text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/50">
            Or Sign In With Email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Connor"
                className="w-full bg-[#EAE6DF] border border-black/20 p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-black font-sans"
              />
            </div>
          )}

          <div>
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@pureform.com"
              className="w-full bg-[#EAE6DF] border border-black/20 p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-black font-sans"
            />
          </div>

          <div>
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#EAE6DF] border border-black/20 p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-black font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] text-[#F5F2ED] py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
          >
            {isSignUp ? 'Create PureForm Account' : 'Sign In To Account'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-black/10 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] border-b border-black pb-0.5 hover:opacity-60"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
};
