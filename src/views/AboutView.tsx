import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Scissors, Compass, ShieldCheck } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { storeConfig, navigateTo } = useShop();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero statement */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-700">
          Craft & Philosophy
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 uppercase tracking-wider">
          The Story of {storeConfig.name}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Reimagining modern South Asian tailoring through architectural proportion, pure unadulterated fibers, and quiet luxury.
        </p>
      </div>

      {/* Main Image Banner */}
      <div className="rounded-xl overflow-hidden shadow-lg aspect-[16/9] sm:aspect-[21/9] bg-zinc-900 relative">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600"
          alt="Textile Craftsmanship"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-10 text-white">
          <p className="font-serif text-lg sm:text-2xl font-light italic max-w-2xl">
            "Clothing should never constrain human movement. It should provide grace, structure, and shelter."
          </p>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <div className="space-y-3 p-6 bg-white rounded-lg border border-zinc-200">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
            <Scissors className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-zinc-950">Architectural Silhouettes</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Every shoulder drop, collar band, and drape is engineered to flatter without cling. We strip away superfluous ornamentation to celebrate the purity of proportion.
          </p>
        </div>

        <div className="space-y-3 p-6 bg-white rounded-lg border border-zinc-200">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-zinc-950">Natural Fiber Heritage</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Pakistan produces some of the world's most luxurious long-staple cottons. We partner directly with ethical spinning mills to produce custom 220 GSM combed jersey and natural slub linen.
          </p>
        </div>

        <div className="space-y-3 p-6 bg-white rounded-lg border border-zinc-200">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-zinc-950">Ethical Master Ateliers</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Our master tailors in Lahore and Karachi work in fair, daylight-flooded studios with livable wages, upholding centuries-old generational stitching craft.
          </p>
        </div>
      </div>

      {/* Founder & Atelier Quote */}
      <div className="p-8 sm:p-12 bg-zinc-900 text-white rounded-xl space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
          A Note from the Atelier
        </span>
        <p className="text-sm sm:text-base font-light text-zinc-300 leading-relaxed">
          "When we launched {storeConfig.name}, our goal was simple: to create clothing we could wear every single day that feels extraordinary against the skin, weathers humid subcontinental summers and crisp northern winters, and looks just as sharp whether stepping into a board meeting in Islamabad or an evening gallery in Lahore."
        </p>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <p className="font-serif text-base font-semibold text-white">The Design Studio</p>
            <p className="text-xs text-zinc-400">Lahore & Karachi, Pakistan</p>
          </div>

          <button
            onClick={() => navigateTo('shop', { category: 'all' })}
            className="px-5 py-2.5 bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider rounded hover:bg-zinc-200 transition-colors"
          >
            Explore Creations
          </button>
        </div>
      </div>
    </div>
  );
};
