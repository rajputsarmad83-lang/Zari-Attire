import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowUp, MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { storeConfig } = useShop();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = storeConfig.whatsapp.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hello ${storeConfig.name}! I am browsing your online store and would like assistance with an order/sizing.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2.5 items-end">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-white/95 text-zinc-800 hover:bg-zinc-950 hover:text-white rounded-full shadow-lg border border-zinc-200 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5"
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* WhatsApp Support Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          WhatsApp Support
        </span>
      </a>
    </div>
  );
};
