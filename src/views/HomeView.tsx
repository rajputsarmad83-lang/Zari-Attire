import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  ArrowRight,
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Star,
  Quote
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    storeConfig,
    navigateTo,
    viewMode,
    setAdminTab,
    setViewMode,
    setIsAddProductModalOpen
  } = useShop();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const heroSlides = storeConfig.heroSlides || [];
  const currentSlide = heroSlides[currentSlideIndex] || heroSlides[0];

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.category === 'new-arrivals' || p.tags.includes('new')).slice(0, 4);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] bg-zinc-950 text-white overflow-hidden flex items-center">
        {/* Background Slide Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide?.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600'}
            alt="Hero collection"
            className="w-full h-full object-cover object-center brightness-60 transition-all duration-700 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentSlide?.tag || 'NEW SEASON DROP'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15] text-white">
              {currentSlide?.title || 'Architectural Cuts. Pure Pakistani Cotton.'}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
              {currentSlide?.subtitle ||
                'Tailored for the contemporary climate with precision craftsmanship, breathable natural fibers, and timeless luxury.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop', { category: currentSlide?.ctaCategory || 'men' })}
                className="bg-white hover:bg-zinc-200 text-zinc-950 px-6 sm:px-8 py-3.5 rounded text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 group shadow-lg"
              >
                <span>{currentSlide?.ctaText || 'Explore Collection'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('shop', { category: 'all' })}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 sm:px-7 py-3.5 rounded text-xs font-bold uppercase tracking-[0.2em] transition-all"
              >
                View Catalog
              </button>

              {viewMode === 'visual-edit' && (
                <button
                  onClick={() => {
                    setViewMode('admin');
                    setAdminTab('branding');
                  }}
                  className="bg-amber-400 text-zinc-950 font-bold px-3 py-2 rounded text-xs flex items-center gap-1.5 shadow"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Hero Banner</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Slide navigation controls */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-white/80">
              0{currentSlideIndex + 1} / 0{heroSlides.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>

      {/* Value Proposition Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-lg border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Nationwide Delivery</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Free on orders above PKR 5,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Cash on Delivery</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Doorstep payment across Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">7-Day Exchanges</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Easy size & fit replacements</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Combed Cotton</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Heavyweight 220–450 GSM pure weave</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection Categories Banner Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-400">
            Curated Categories
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 uppercase tracking-wider">
            Explore By Collection
          </h2>
          <p className="text-xs text-zinc-500">
            Explore distinct cuts and artisanal tailoring designed for every contemporary lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Men */}
          <div
            onClick={() => navigateTo('shop', { category: 'men' })}
            className="group relative h-96 sm:h-[420px] rounded-lg overflow-hidden cursor-pointer shadow-md bg-zinc-900"
          >
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000"
              alt="Men's collection"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                Architectural Essentials
              </span>
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wider mt-1">
                Men's Collection
              </h3>
              <p className="text-xs text-zinc-300 mt-1.5 opacity-90 line-clamp-2">
                Heavyweight tees, relaxed linen shirts, tailored kurtas, and rigid denim.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors">
                <span>Shop Men</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: Women */}
          <div
            onClick={() => navigateTo('shop', { category: 'women' })}
            className="group relative h-96 sm:h-[420px] rounded-lg overflow-hidden cursor-pointer shadow-md bg-zinc-900"
          >
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000"
              alt="Women's collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                Fluid Prêt & Modest
              </span>
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wider mt-1">
                Women's Prêt
              </h3>
              <p className="text-xs text-zinc-300 mt-1.5 opacity-90 line-clamp-2">
                Tiered casual dresses, premium Dubai Nida abayas, and ribbed modal knitwear.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors">
                <span>Shop Women</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3: Co-Ords & New Arrivals */}
          <div
            onClick={() => navigateTo('shop', { category: 'co-ords' })}
            className="group relative h-96 sm:h-[420px] rounded-lg overflow-hidden cursor-pointer shadow-md bg-zinc-900"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000"
              alt="Co-ord sets"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                Pure Slub Linen
              </span>
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wider mt-1">
                Co-Ord Sets
              </h3>
              <p className="text-xs text-zinc-300 mt-1.5 opacity-90 line-clamp-2">
                Effortless monochrome matching two-piece sets for travel, leisure, and daily elegance.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors">
                <span>Shop Co-Ords</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-700">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 uppercase tracking-wider mt-1">
              Best Sellers
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Hand-picked best selling garments loved by clients in Lahore, Karachi & Islamabad.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {viewMode === 'visual-edit' && (
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="bg-amber-400 text-zinc-950 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ Add New Garment</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('shop', { category: 'all' })}
              className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 flex items-center gap-1.5 transition-colors"
            >
              <span>View All ({products.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Brand Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 text-white rounded-xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 sm:p-12 lg:p-16 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
              The {storeConfig.name} Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-snug">
              "We believe clothing should feel like architecture in motion."
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              Rooted in Pakistan's historic textile mastery, {storeConfig.name} rejects fast-trend disposal. Each garment is crafted in small batches in our Lahore and Karachi ateliers from long-staple combed cotton, cooling flax linen, and high-density weaves that age gracefully.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3 bg-white text-zinc-950 font-bold text-xs uppercase tracking-widest rounded hover:bg-zinc-200 transition-colors"
              >
                Read Our Story
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-6 py-3 border border-zinc-600 text-white font-bold text-xs uppercase tracking-widest rounded hover:border-white transition-colors"
              >
                Visit Boutiques
              </button>
            </div>
          </div>

          <div className="relative h-80 lg:h-full min-h-[380px] bg-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals Preview */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-400">
                Fresh Off The Looms
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 uppercase tracking-wider mt-1">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop', { category: 'new-arrivals' })}
              className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Verified Customer Reviews Carousel / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-400">
            Client Voices
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 uppercase tracking-wider">
            Verified Experiences
          </h2>
          <p className="text-xs text-zinc-500">
            Over 10,000 satisfied patrons delivered across 25+ cities in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-zinc-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed italic">
                "The 220 GSM combed cotton t-shirt does not lose its collar shape after 15 washes. Finally a Pakistani brand that understands luxury heavyweight cotton tailoring."
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-950">Hamza Tariq</p>
                <p className="text-[10px] text-zinc-400">Gulberg, Lahore</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed italic">
                "The Dubai Nida Abaya has an unbelievable drape. Ordered via Cash on Delivery in Clifton Karachi and it arrived in 2 days beautifully boxed with cedar aroma."
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-950">Fatima Zahra</p>
                <p className="text-[10px] text-zinc-400">DHA Phase 6, Karachi</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed italic">
                "Wore the summer linen co-ord on vacation to northern areas. Lightweight, breathable, and so chic in photos. Customer care on WhatsApp helped me pick the right size."
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-950">Mahnoor Tariq</p>
                <p className="text-[10px] text-zinc-400">F-7, Islamabad</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Boutiques Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-zinc-100 rounded-lg border border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Personal Fitting Experience
            </span>
            <h3 className="font-serif text-2xl font-bold text-zinc-950">
              Experience the Fabrics at our Boutiques
            </h3>
            <p className="text-xs text-zinc-600 max-w-xl">
              Visit our experiential flagship studios in Lahore (MM Alam Road), Karachi (Bukhari Commercial DHA), and Islamabad (Beverly Centre) for bespoke styling.
            </p>
          </div>

          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shrink-0"
          >
            View Boutique Addresses
          </button>
        </div>
      </section>
    </div>
  );
};
