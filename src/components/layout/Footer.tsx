import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { AppView } from '../../types/store';

export const Footer: React.FC = () => {
  const { storeConfig, navigateTo, setIsSizeGuideOpen, setViewMode } = useShop();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#18181B] text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      {/* Top Value Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-zinc-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Nationwide Delivery</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Fast courier dispatch in 2–4 business days via TCS & Leopard across all cities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Cash on Delivery (COD)</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Pay with confidence upon doorstep arrival, or pay via Raast and Bank Transfer.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 text-amber-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">7-Day Hassle-Free Exchange</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Wrong size? We exchange unworn garments swiftly with doorstep pickup support.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Pure Fabrics & Craft</h4>
              <p className="text-xs text-zinc-400 mt-1">
                100% Combed Pakistani Cotton, pure slub linen, and original Dubai Nida weave.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.2em] font-semibold text-white uppercase">
              {storeConfig.name}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {storeConfig.subheading}
            </p>
            <div className="pt-2 text-xs space-y-2 text-zinc-400">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{storeConfig.phone} (10:00 AM – 10:00 PM PKT)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{storeConfig.email}</span>
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">Collections</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'men' })}
                  className="hover:text-white transition-colors"
                >
                  Men's Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'women' })}
                  className="hover:text-white transition-colors"
                >
                  Women's Prêt
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'new-arrivals' })}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'co-ords' })}
                  className="hover:text-white transition-colors"
                >
                  Linen Co-Ord Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'sale' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Sale & Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">Customer Care</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Size Guide & Measurements
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Track Order & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors"
                >
                  Heritage & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Boutique Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setViewMode('admin')}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 mt-2"
                >
                  <span>Store Admin & Editor</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">
              Stay in the Circle
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe to receive private preview invitations, exclusive fabric releases, and 10% off your next tailoring.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you for subscribing! Your welcome discount code is <strong>WELCOME10</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex rounded-md overflow-hidden border border-zinc-700 focus-within:border-white transition-colors">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-zinc-900 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-white text-zinc-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500">
                  By subscribing you agree with our terms. We never spam.
                </p>
              </form>
            )}

            {/* Boutiques snippet */}
            <div className="pt-2 border-t border-zinc-800/80">
              <p className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Flagship Boutiques:</span>
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                {storeConfig.stores && storeConfig.stores.length > 0
                  ? storeConfig.stores.map((s) => `${s.city} (${s.address.split(',')[0]})`).join(' • ')
                  : 'Shakargarh • Narowal • Sialkot'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} {storeConfig.name}. All Rights Reserved. Crafted for Pakistan.</p>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Cash on Delivery</span>
          <span>•</span>
          <span>Bank Transfer / Raast</span>
          <span>•</span>
          <span>Visa / Mastercard</span>
          <span>•</span>
          <span>JazzCash / EasyPaisa</span>
        </div>
      </div>
    </footer>
  );
};
