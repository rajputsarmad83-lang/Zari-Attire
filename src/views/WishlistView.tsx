import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, navigateTo } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
            Personal Wardrobe
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 uppercase tracking-wider mt-1">
            Saved Wishlist ({savedProducts.length})
          </h1>
        </div>

        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-zinc-900">Your Wishlist is Empty</h3>
          <p className="text-xs text-zinc-500">
            Click the heart icon on any garment to bookmark pieces you love for later.
          </p>
          <button
            onClick={() => navigateTo('shop', { category: 'all' })}
            className="px-6 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};
