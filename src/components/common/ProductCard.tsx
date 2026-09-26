import React, { useState } from 'react';
import { Product } from '../../types/store';
import { useShop } from '../../context/ShopContext';
import { Heart, Eye, ShoppingBag, Edit3, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    isInWishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
    storeConfig,
    viewMode,
    setEditingProduct
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', { product });
  };

  const handleQuickAdd = (size: string) => {
    const defaultColor = product.availableColors[0] || { name: 'Standard', hex: '#000000' };
    addToCart(product, size, defaultColor, 1, false);
    setShowQuickSizes(false);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300 bg-white border border-zinc-200/80 rounded-sm overflow-hidden hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Visual Edit Mode Badge */}
      {viewMode === 'visual-edit' && (
        <div className="absolute top-2 left-2 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingProduct(product);
            }}
            className="bg-amber-400 hover:bg-amber-500 text-zinc-950 px-2 py-1 rounded shadow-md text-[10px] font-bold flex items-center gap-1 transition-all scale-100 hover:scale-105"
            title="Edit this product's price, title, image, or stock"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>
      )}

      {/* Image Container */}
      <div
        onClick={handleCardClick}
        className="relative w-full aspect-[3/4] bg-zinc-100 overflow-hidden cursor-pointer"
      >
        <img
          src={
            isHovered && product.images[1]
              ? product.images[1]
              : product.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000'
          }
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className={`absolute ${viewMode === 'visual-edit' ? 'top-9' : 'top-2.5'} left-2.5 flex flex-col gap-1 z-10 pointer-events-none`}>
          {product.discountPercentage > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 tracking-wider rounded-xs shadow-xs">
              -{product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-zinc-900 text-white text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider rounded-xs shadow-xs">
              BEST SELLER
            </span>
          )}
          {product.availableStock <= 5 && product.availableStock > 0 && (
            <span className="bg-amber-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 tracking-wider rounded-xs">
              Only {product.availableStock} Left
            </span>
          )}
          {product.availableStock === 0 && (
            <span className="bg-zinc-800 text-zinc-200 text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider rounded-xs">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick Actions (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              isFavorited
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/90 text-zinc-700 hover:text-zinc-950 hover:bg-white'
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 text-zinc-700 hover:text-zinc-950 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
            aria-label="Quick view"
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Size Select Bar on hover */}
        {showQuickSizes && product.availableStock > 0 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-3 border-t border-zinc-200 z-20 animate-fade-in shadow-lg"
          >
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-600 mb-2 text-center">
              Select Size for Instant Bag Add:
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleQuickAdd(size)}
                  className="px-2.5 py-1 text-xs font-semibold bg-zinc-100 hover:bg-zinc-950 hover:text-white border border-zinc-300 rounded transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hover Quick Add CTA */}
        {!showQuickSizes && product.availableStock > 0 && (
          <div className="absolute inset-x-0 bottom-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickSizes(true);
              }}
              className="w-full bg-zinc-950/90 hover:bg-zinc-950 backdrop-blur-sm text-white py-2 px-3 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>+ Quick Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Colors swatch */}
          {product.availableColors && product.availableColors.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
              {product.availableColors.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  className="w-3 h-3 rounded-full border border-zinc-300 inline-block shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.availableColors.length > 4 && (
                <span className="text-[10px] text-zinc-500 font-medium">
                  +{product.availableColors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Subcategory & Gender */}
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">
            {product.gender} • {product.subcategory || product.category}
          </div>

          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="text-xs sm:text-sm font-medium text-zinc-900 hover:text-zinc-600 line-clamp-1 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing */}
        <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-zinc-950 tracking-tight">
              {storeConfig.currencySymbol} {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-zinc-400 line-through">
                {storeConfig.currencySymbol} {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {addedSuccess ? (
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Added
            </span>
          ) : (
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium group-hover:text-zinc-700 transition-colors">
              Tailored Cut
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
