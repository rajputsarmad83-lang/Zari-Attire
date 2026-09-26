import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Sparkles,
  Eye,
  SlidersHorizontal,
  Plus,
  RotateCcw,
  Package,
  Layers,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const TopAdminBar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    currentView,
    navigateTo,
    products,
    orders,
    setIsAddProductModalOpen,
    resetCatalogToDefaults
  } = useShop();

  return (
    <div className="bg-[#18181B] text-white border-b border-zinc-800 text-xs px-3 sm:px-6 py-2 sticky top-0 z-50 transition-all shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Mode switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-semibold tracking-wider text-amber-400 uppercase text-[11px] mr-1 sm:mr-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Store Editor</span>
          </div>

          <div className="inline-flex rounded-full bg-zinc-900/90 p-0.5 border border-zinc-700">
            <button
              onClick={() => setViewMode('customer')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
                viewMode === 'customer'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="View site as regular customer"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Customer View</span>
              <span className="sm:hidden">Store</span>
            </button>

            <button
              onClick={() => setViewMode('visual-edit')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
                viewMode === 'visual-edit'
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Click on store elements directly to edit them"
            >
              <Layers className="w-3 h-3" />
              <span>Visual Edit</span>
            </button>

            <button
              onClick={() => setViewMode('admin')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
                viewMode === 'admin' || currentView === 'admin'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Open full catalog, pricing, branding, and orders dashboard"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Admin Studio</span>
              <span className="sm:hidden">Studio</span>
            </button>
          </div>
        </div>

        {/* Center: Live Stats indicator */}
        <div className="hidden md:flex items-center gap-4 text-zinc-400 text-[11px]">
          <span className="flex items-center gap-1">
            <Package className="w-3 h-3 text-zinc-300" />
            <span className="text-zinc-200 font-semibold">{products.length}</span> Products
          </span>
          <span className="flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-zinc-300" />
            <span className="text-zinc-200 font-semibold">{orders.length}</span> Orders
          </span>
          {viewMode === 'visual-edit' && (
            <span className="bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] animate-pulse">
              Click any element with edit pen to customize
            </span>
          )}
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddProductModalOpen(true)}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-2.5 py-1 rounded-full transition-colors text-[11px] shadow-sm"
          >
            <Plus className="w-3 h-3" />
            <span>Add Product</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all catalog products, prices, and branding to initial Khaas Atelier defaults?')) {
                resetCatalogToDefaults();
              }
            }}
            className="flex items-center gap-1 text-zinc-400 hover:text-rose-300 transition-colors p-1"
            title="Reset store to original default catalog"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline text-[11px]">Reset Defaults</span>
          </button>

          {currentView === 'admin' ? (
            <button
              onClick={() => navigateTo('home')}
              className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px] ml-1"
            >
              <span>Back to Store</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
