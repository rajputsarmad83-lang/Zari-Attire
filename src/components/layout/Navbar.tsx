import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Edit2,
  ChevronRight,
  Phone,
  Sparkles
} from 'lucide-react';
import { AppView } from '../../types/store';

export const Navbar: React.FC = () => {
  const {
    storeConfig,
    currentView,
    navigateTo,
    cartItemCount,
    cartGrandTotal,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    viewMode,
    setAdminTab,
    setViewMode
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: AppView; category?: string; badge?: string }[] = [
    { label: 'HOME', view: 'home' },
    { label: 'SHOP ALL', view: 'shop', category: 'all' },
    { label: 'MEN', view: 'shop', category: 'men' },
    { label: 'WOMEN', view: 'shop', category: 'women' },
    { label: 'NEW ARRIVALS', view: 'shop', category: 'new-arrivals', badge: 'NEW' },
    { label: 'SALE', view: 'shop', category: 'sale', badge: 'OFFERS' },
    { label: 'CO-ORDS', view: 'shop', category: 'co-ords' },
    { label: 'ABOUT US', view: 'about' },
    { label: 'CONTACT', view: 'contact' }
  ];

  const handleNavClick = (view: AppView, category?: string) => {
    navigateTo(view, { category });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-zinc-200 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#18181B] text-zinc-300 text-[11px] font-medium tracking-wider py-1.5 px-4 overflow-hidden relative border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
              <span>{storeConfig.announcement}</span>
              <span className="text-amber-400 font-bold">•</span>
              <span>100% COMBED LONG-STAPLE COTTON & PURE FABRICS</span>
              <span className="text-amber-400 font-bold">•</span>
              <span>CASH ON DELIVERY NATIONWIDE IN 2-4 DAYS</span>
              <span className="text-amber-400 font-bold">•</span>
              <span>USE CODE: <strong className="text-amber-300">KHAAS10</strong> FOR 10% OFF</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-zinc-400 shrink-0 ml-4">
            <a
              href={`https://wa.me/${storeConfig.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp: {storeConfig.phone}</span>
            </a>

            {viewMode === 'visual-edit' && (
              <button
                onClick={() => {
                  setViewMode('admin');
                  setAdminTab('branding');
                }}
                className="bg-amber-400 text-zinc-900 font-bold px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1"
                title="Edit announcement text"
              >
                <Edit2 className="w-2.5 h-2.5" />
                <span>Edit Bar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-zinc-800 hover:text-zinc-600 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <button
              onClick={() => handleNavClick('home')}
              className="group inline-block text-left relative focus:outline-none"
            >
              <div className="flex items-center gap-1">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-semibold text-zinc-950 uppercase group-hover:text-zinc-700 transition-colors">
                  {storeConfig.name}
                </span>
                {viewMode === 'visual-edit' && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewMode('admin');
                      setAdminTab('branding');
                    }}
                    className="p-1 text-amber-600 hover:text-amber-700 cursor-pointer"
                    title="Edit Store Name"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-medium">
                {storeConfig.locationSubtitle || 'Shakargarh • Narowal • Sialkot'}
              </p>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive =
                currentView === link.view &&
                (!link.category || link.category === 'all');

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view, link.category)}
                  className={`text-[12px] tracking-[0.16em] uppercase font-medium py-2 transition-all relative group ${
                    isActive
                      ? 'text-zinc-950 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {link.label}
                    {link.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold tracking-tight uppercase ${
                          link.badge === 'NEW'
                            ? 'bg-zinc-900 text-white'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-zinc-950 transition-transform origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors relative"
              aria-label="Search catalog"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors relative"
              aria-label="View wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-3 sm:px-4 py-2 rounded-full transition-all duration-200 shadow-sm relative group"
              aria-label="Open shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-zinc-100" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-zinc-950 rounded-full w-4 h-4 text-[10px] font-extrabold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wider">
                {cartItemCount > 0 ? (
                  <span>
                    {storeConfig.currencySymbol} {cartGrandTotal.toLocaleString()}
                  </span>
                ) : (
                  'BAG'
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between p-5 border-b border-zinc-100">
                <div>
                  <span className="font-serif text-xl tracking-widest font-bold text-zinc-950 uppercase">
                    {storeConfig.name}
                  </span>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                    Fashion Atelier
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <div className="py-4 px-3 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.view, link.category)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-left text-sm font-semibold tracking-wider text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      {link.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase bg-amber-100 text-amber-900">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer footer */}
            <div className="p-5 border-t border-zinc-100 bg-zinc-50 space-y-3">
              <div className="text-xs text-zinc-600">
                <p className="font-medium text-zinc-900">Assistance & Support</p>
                <p className="mt-1">{storeConfig.phone}</p>
                <p className="text-[11px] text-zinc-500">{storeConfig.email}</p>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setViewMode('admin');
                }}
                className="w-full py-2 px-3 bg-zinc-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Store Editor / Admin Studio</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
