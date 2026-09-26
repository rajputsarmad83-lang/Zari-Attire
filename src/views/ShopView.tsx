import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { SlidersHorizontal, X, Plus, RotateCcw, Sparkles } from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    storeConfig,
    viewMode,
    setIsAddProductModalOpen
  } = useShop();

  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'men', label: "Men's Collection" },
    { id: 'women', label: "Women's Collection" },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'co-ords', label: 'Co-Ord Sets' },
    { id: 'sale', label: 'Sale & Offers' }
  ];

  const subcategories = [
    { id: 'all', label: 'All Types' },
    { id: 't-shirts', label: 'T-Shirts' },
    { id: 'shirts', label: 'Shirts & Kurtas' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'jackets', label: 'Jackets & Coats' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'abayas', label: 'Abayas' },
    { id: 'co-ords', label: 'Co-Ord Sets' },
    { id: 'bottoms', label: 'Trousers' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'sale') {
          if (!p.isSale && p.discountPercentage <= 0) return false;
        } else if (selectedCategory === 'new-arrivals') {
          if (p.category !== 'new-arrivals' && !p.tags.includes('new')) return false;
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Gender filter
      if (selectedGender !== 'all') {
        if (p.gender !== selectedGender && p.gender !== 'unisex') return false;
      }

      // Subcategory filter
      if (selectedSubcat !== 'all') {
        if (p.subcategory !== selectedSubcat) return false;
      }

      // In stock
      if (inStockOnly && p.availableStock <= 0) {
        return false;
      }

      // Price filter
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      return 0; // featured
    });
  }, [products, selectedCategory, selectedGender, selectedSubcat, inStockOnly, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
    setSelectedSubcat('all');
    setMaxPrice(15000);
    setInStockOnly(false);
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'men':
        return "Men's Collection";
      case 'women':
        return "Women's Collection";
      case 'new-arrivals':
        return 'New Arrivals';
      case 'co-ords':
        return 'Co-Ord Sets';
      case 'sale':
        return 'Sale & Special Offers';
      default:
        return 'All Ready-to-Wear';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Catalog Header */}
      <div className="border-b border-zinc-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-400">
            {storeConfig.name} Atelier Shop
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 uppercase tracking-wider mt-1">
            {getCategoryTitle()}
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl">
            Pure combed Pakistani cotton, breathable linen blends, and architectural drapery. Delivered nationwide with Cash on Delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === 'visual-edit' && (
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="bg-amber-400 text-zinc-950 px-3.5 py-2 rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-zinc-300 rounded px-3 py-2 bg-white text-zinc-800 outline-none focus:border-zinc-950"
            >
              <option value="featured">Featured / Curated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Category Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Subcategory & Gender Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Gender filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Gender:
            </span>
            <div className="inline-flex rounded-md border border-zinc-300 p-0.5 bg-zinc-50">
              {['all', 'men', 'women', 'unisex'].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-2.5 py-1 text-xs font-medium rounded capitalize transition-colors ${
                    selectedGender === g
                      ? 'bg-white text-zinc-950 shadow-xs font-bold'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-1">
              Garment:
            </span>
            {subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcat(sub.id)}
                className={`text-xs px-2.5 py-1 rounded border whitespace-nowrap transition-colors ${
                  selectedSubcat === sub.id
                    ? 'border-zinc-950 bg-zinc-950 text-white font-semibold'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Max Price & In Stock */}
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 text-zinc-900 rounded border-zinc-300"
              />
              <span className="text-zinc-700 font-medium">In Stock Only</span>
            </label>

            <button
              onClick={resetFilters}
              className="text-xs text-zinc-500 hover:text-rose-600 flex items-center gap-1 font-medium underline"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <p>
          Showing <strong className="text-zinc-900 font-bold">{filteredProducts.length}</strong>{' '}
          garments
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-lg border border-dashed border-zinc-300 p-8">
          <p className="text-sm font-serif font-bold text-zinc-800">
            No garments match your current filters
          </p>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Try adjusting your price range or clearing category filters to view all products.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-zinc-800"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
