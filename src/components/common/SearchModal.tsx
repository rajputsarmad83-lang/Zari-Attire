import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    navigateTo,
    storeConfig
  } = useShop();

  const [term, setTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickPills = ['Cotton', 'Linen', 'Oversized', 'Kurta', 'Abaya', 'Co-Ord', 'Denim', 'Hoodie'];

  const results = term.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(term.toLowerCase()) ||
          p.description.toLowerCase().includes(term.toLowerCase()) ||
          p.category.toLowerCase().includes(term.toLowerCase()) ||
          p.material.toLowerCase().includes(term.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(term.toLowerCase()))
      )
    : [];

  const handleProductSelect = (product: any) => {
    setIsSearchOpen(false);
    navigateTo('product-detail', { product });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16 sm:pt-24">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 border border-zinc-200">
          {/* Top search bar */}
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search garments, fabrics, kurtas, abayas, or collections..."
              className="w-full text-base sm:text-lg text-zinc-900 placeholder-zinc-400 outline-none"
            />
            {term && (
              <button
                onClick={() => setTerm('')}
                className="text-zinc-400 hover:text-zinc-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-800 rounded-full hover:bg-zinc-100 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="py-3 flex flex-wrap items-center gap-1.5 border-b border-zinc-100">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Popular:
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setTerm(pill)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  term.toLowerCase() === pill.toLowerCase()
                    ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Results list */}
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
            {term.trim() === '' ? (
              <div className="py-8 text-center text-zinc-400 text-xs">
                Type product names or categories above to explore the collection.
              </div>
            ) : results.length === 0 ? (
              <div className="py-8 text-center text-zinc-500 text-xs">
                No items found for "<span className="font-semibold text-zinc-800">{term}</span>".
                Try searching for "Cotton", "Kurta", or "Dress".
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Found {results.length} Garments
                </p>
                {results.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleProductSelect(prod)}
                    className="flex items-center gap-3.5 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors border border-transparent hover:border-zinc-200 group"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-14 h-16 object-cover rounded bg-zinc-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                        {prod.material} • {prod.gender}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-zinc-950">
                          {storeConfig.currencySymbol} {prod.price.toLocaleString()}
                        </span>
                        {prod.discountPercentage > 0 && (
                          <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.2 rounded">
                            -{prod.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
