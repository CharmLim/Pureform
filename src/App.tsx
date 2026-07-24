/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Hero } from './components/Hero';
import { BrandValues } from './components/BrandValues';
import { ShopByConcern } from './components/ShopByConcern';
import { HowItWorks } from './components/HowItWorks';
import { QualityTrust } from './components/QualityTrust';
import { Testimonials } from './components/Testimonials';
import { JournalSection } from './components/JournalSection';
import { Footer } from './components/Footer';
import { QuizModal } from './components/QuizModal';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { JournalDetailModal } from './components/JournalDetailModal';
import { AccountView } from './components/AccountView';
import { InfoModal } from './components/InfoModal';
import { MenuDrawer } from './components/MenuDrawer';
import { NewsletterSection } from './components/NewsletterSection';
import { NewsletterModal } from './components/NewsletterModal';
import { PRODUCTS } from './data/products';

import { Product, CartItem, JournalArticle } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pureform_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [infoModalType, setInfoModalType] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('pureform_cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const handleAddToCart = (product: Product, isSubscription: boolean = true) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        updated[existingIndex].isSubscription = isSubscription;
        return updated;
      }
      return [...prevCart, { product, quantity: 1, isSubscription }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleToggleSubscription = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, isSubscription: !item.isSubscription }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] flex flex-col font-sans selection:bg-[#334537]/20">
      {/* Top Header */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        cartCount={cartCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTakeQuiz={() => setIsQuizOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 pt-16">
        {activeTab === 'home' && (
          <>
            <Hero onTakeQuiz={() => setIsQuizOpen(true)} />
            <BrandValues />
            <ShopByConcern
              products={PRODUCTS}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
            <HowItWorks onTakeQuiz={() => setIsQuizOpen(true)} />
            <QualityTrust />
            <Testimonials />
            <JournalSection onSelectArticle={setSelectedArticle} />
            <NewsletterSection onOpenModal={() => setIsNewsletterOpen(true)} />
          </>
        )}

        {activeTab === 'shop' && (
          <div className="py-8">
            <ShopByConcern
              products={PRODUCTS}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
            <QualityTrust />
            <NewsletterSection onOpenModal={() => setIsNewsletterOpen(true)} />
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="py-8">
            <JournalSection onSelectArticle={setSelectedArticle} />
            <NewsletterSection onOpenModal={() => setIsNewsletterOpen(true)} />
          </div>
        )}

        {activeTab === 'account' && <AccountView />}
      </main>

      {/* Footer */}
      <Footer
        onOpenModal={setInfoModalType}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Bottom Mobile Nav */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Slide-over & Dialog Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleSubscription={handleToggleSubscription}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectTab={setActiveTab}
        onTakeQuiz={() => setIsQuizOpen(true)}
        onSelectProduct={setSelectedProduct}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />


      <JournalDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </div>
  );
}
