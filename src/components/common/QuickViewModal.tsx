import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, ShoppingBag, Heart, Check, Ruler, ExternalLink } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    navigateTo,
    setIsSizeGuideOpen,
    storeConfig
  } = useShop();

  if (!quickViewProduct) return null;

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(
    quickViewProduct.availableColors[0] || { name: 'Standard', hex: '#111' }
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity, true);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  const handleFullDetail = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    navigateTo('product-detail', { product: prod });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-3xl w-full p-4 sm:p-6 border border-zinc-200 overflow-hidden">
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Gallery Left */}
            <div>
              <div className="aspect-[3/4] bg-zinc-100 rounded overflow-hidden">
                <img
                  src={quickViewProduct.images[selectedImg] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImg(i)}
                      className={`w-14 h-16 rounded overflow-hidden border-2 shrink-0 ${
                        selectedImg === i ? 'border-zinc-950' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Right */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                  {quickViewProduct.gender} • {quickViewProduct.subcategory || quickViewProduct.category}
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-zinc-950 mt-1">
                  {quickViewProduct.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-bold text-zinc-950">
                  {storeConfig.currencySymbol} {quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-sm text-zinc-400 line-through">
                    {storeConfig.currencySymbol} {quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                {quickViewProduct.discountPercentage > 0 && (
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded">
                    -{quickViewProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Color */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Color: <strong className="text-zinc-950">{selectedColor.name}</strong>
                </label>
                <div className="flex gap-2">
                  {quickViewProduct.availableColors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor.name === c.name
                          ? 'border-zinc-950 scale-110'
                          : 'border-zinc-300'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="w-full h-full rounded-full block"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                    Size: <strong className="text-zinc-950">{selectedSize}</strong>
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] text-zinc-500 hover:text-zinc-900 underline flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
                        selectedSize === size
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-zinc-300 rounded overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1.5 text-zinc-600 hover:bg-zinc-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(quickViewProduct.availableStock, quantity + 1))}
                    className="px-2.5 py-1.5 text-zinc-600 hover:bg-zinc-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={quickViewProduct.availableStock === 0}
                  className="flex-1 bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-400 text-white py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2.5 border rounded transition-colors ${
                    isFavorited
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-zinc-300 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={handleFullDetail}
                  className="text-xs text-zinc-600 hover:text-zinc-950 font-semibold underline inline-flex items-center gap-1"
                >
                  <span>View Complete Details, Fabric & Reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
