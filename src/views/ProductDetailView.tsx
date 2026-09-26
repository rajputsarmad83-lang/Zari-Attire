import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  Edit2,
  Sparkles,
  ArrowRight,
  Share2
} from 'lucide-react';
import { ProductColor } from '../types/store';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    navigateTo,
    setIsSizeGuideOpen,
    products,
    storeConfig,
    viewMode,
    setEditingProduct,
    updateProduct
  } = useShop();

  const product = selectedProduct || products[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.availableSizes?.[0] || 'M'
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.availableColors?.[0] || { name: 'Standard', hex: '#111' }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'material' | 'fit' | 'care' | 'delivery'>('material');
  const [addedNotice, setAddedNotice] = useState(false);

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('Lahore');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-600">Product not found.</p>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="mt-4 px-4 py-2 bg-zinc-950 text-white rounded text-xs uppercase"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (instantCheckout = false) => {
    addToCart(product, selectedSize, selectedColor, quantity, !instantCheckout);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);

    if (instantCheckout) {
      navigateTo('checkout', { scroll: true });
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim(),
      city: reviewerCity,
      rating: reviewerRating,
      comment: reviewerComment.trim(),
      date: 'Just now',
      verifiedPurchase: true
    };

    const updatedReviews = [newRev, ...(product.reviews || [])];
    const newRating = Number(
      (
        updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
      ).toFixed(1)
    );

    updateProduct({
      ...product,
      reviews: updatedReviews,
      rating: newRating,
      reviewsCount: updatedReviews.length
    });

    setReviewSubmitted(true);
    setReviewerName('');
    setReviewerComment('');
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 2500);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-zinc-500 flex items-center gap-2">
        <button onClick={() => navigateTo('home')} className="hover:text-zinc-950">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop', { category: product.category })}
          className="capitalize hover:text-zinc-950"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-zinc-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Photos (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shadow-sm">
            <img
              src={product.images[activeImgIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.discountPercentage > 0 && (
                <span className="bg-rose-600 text-white text-xs font-extrabold uppercase px-2.5 py-1 tracking-wider rounded-xs shadow-xs">
                  -{product.discountPercentage}% OFF
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-zinc-900 text-white text-xs font-bold uppercase px-2.5 py-1 tracking-wider rounded-xs shadow-xs">
                  Best Seller
                </span>
              )}
            </div>

            {/* Visual Edit Button */}
            {viewMode === 'visual-edit' && (
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-amber-400 hover:bg-amber-500 text-zinc-950 px-3 py-1.5 rounded shadow-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Garment</span>
                </button>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIndex(i)}
                  className={`w-20 h-24 rounded overflow-hidden border-2 transition-all shrink-0 ${
                    activeImgIndex === i
                      ? 'border-zinc-950 ring-1 ring-zinc-950'
                      : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Purchase (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                {product.gender} • {product.subcategory || product.category}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 mt-1">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-zinc-900">{product.rating}</span>
              <span className="text-xs text-zinc-500">
                ({product.reviewsCount || product.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-lg flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                {storeConfig.currencySymbol} {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-zinc-400 line-through">
                  {storeConfig.currencySymbol} {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {product.discountPercentage > 0 && (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                Save {storeConfig.currencySymbol}{' '}
                {(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.availableColors && product.availableColors.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-zinc-700">
                  Select Color:
                </span>
                <span className="font-bold text-zinc-950">{selectedColor.name}</span>
              </div>
              <div className="flex gap-2.5">
                {product.availableColors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor.name === color.name
                        ? 'border-zinc-950 scale-110 shadow-sm'
                        : 'border-zinc-300 hover:border-zinc-500'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="w-full h-full rounded-full block"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold uppercase tracking-wider text-zinc-700">
                Select Size: <strong className="text-zinc-950">{selectedSize}</strong>
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-zinc-600 hover:text-zinc-950 underline font-medium flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide & Chart</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-xs font-bold rounded border transition-colors ${
                    selectedSize === size
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                      : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Urgency */}
          <div className="text-xs">
            {product.availableStock > 0 ? (
              <p className="text-emerald-700 font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>
                  In Stock ({product.availableStock} available for dispatch)
                </span>
              </p>
            ) : (
              <p className="text-rose-600 font-bold">Currently Sold Out</p>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-zinc-300 rounded overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-bold text-zinc-900 bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.availableStock, quantity + 1))}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={() => handleAddToCart(false)}
                disabled={product.availableStock === 0}
                className="flex-1 bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-400 text-white py-3 px-5 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border rounded transition-colors ${
                  isFavorited
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-zinc-300 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
                title="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Instant COD Checkout Button */}
            <button
              onClick={() => handleAddToCart(true)}
              disabled={product.availableStock === 0}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 py-3 px-5 rounded text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Buy Now (Cash on Delivery)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {addedNotice && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-2.5 rounded text-xs flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Added to bag! Checkout whenever ready.</span>
              </div>
            )}
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-200 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-zinc-800" />
              <span>Nationwide 2-4 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-800" />
              <span>Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-zinc-800" />
              <span>7-Day Easy Exchange</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Pure Combed Cotton</span>
            </div>
          </div>

          {/* Accordion Tabs for Details */}
          <div className="border-t border-zinc-200 pt-4 space-y-2">
            {/* Tab 1: Fabric */}
            <div className="border border-zinc-200 rounded overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'material' ? ('' as any) : 'material')}
                className="w-full p-3 bg-zinc-50 text-left text-xs font-bold uppercase tracking-wider text-zinc-900 flex justify-between items-center"
              >
                <span>Fabric & Material Specifications</span>
                {activeTab === 'material' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeTab === 'material' && (
                <div className="p-3 text-xs text-zinc-600 bg-white space-y-1">
                  <p>• <strong>Composition:</strong> {product.material}</p>
                  <p>• <strong>Origin:</strong> Sourced and milled in Pakistan using premium long-staple cotton fibers.</p>
                  <p>• <strong>Breathability:</strong> High air-permeability weave designed for the South Asian climate.</p>
                </div>
              )}
            </div>

            {/* Tab 2: Fit */}
            <div className="border border-zinc-200 rounded overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'fit' ? ('' as any) : 'fit')}
                className="w-full p-3 bg-zinc-50 text-left text-xs font-bold uppercase tracking-wider text-zinc-900 flex justify-between items-center"
              >
                <span>Tailored Fit & Silhouette</span>
                {activeTab === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeTab === 'fit' && (
                <div className="p-3 text-xs text-zinc-600 bg-white space-y-1">
                  <p>• <strong>Fit:</strong> {product.fit}</p>
                  <p>• <strong>Sizing Advice:</strong> Take your standard size for tailored architectural drape, or size up for a relaxed streetwear feel.</p>
                </div>
              )}
            </div>

            {/* Tab 3: Care */}
            <div className="border border-zinc-200 rounded overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'care' ? ('' as any) : 'care')}
                className="w-full p-3 bg-zinc-50 text-left text-xs font-bold uppercase tracking-wider text-zinc-900 flex justify-between items-center"
              >
                <span>Care & Washing Instructions</span>
                {activeTab === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeTab === 'care' && (
                <div className="p-3 text-xs text-zinc-600 bg-white space-y-1">
                  {product.careInstructions.map((inst, i) => (
                    <p key={i}>• {inst}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Tab 4: Delivery & Exchange */}
            <div className="border border-zinc-200 rounded overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'delivery' ? ('' as any) : 'delivery')}
                className="w-full p-3 bg-zinc-50 text-left text-xs font-bold uppercase tracking-wider text-zinc-900 flex justify-between items-center"
              >
                <span>Nationwide Shipping & 7-Day Exchange</span>
                {activeTab === 'delivery' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeTab === 'delivery' && (
                <div className="p-3 text-xs text-zinc-600 bg-white space-y-1.5 leading-relaxed">
                  <p>• <strong>Dispatch:</strong> Orders dispatched via TCS & Leopard courier within 24 hours.</p>
                  <p>• <strong>Delivery Time:</strong> 2–3 business days for Punjab & Sindh, 3–4 business days nationwide.</p>
                  <p>• <strong>Free Shipping:</strong> Free delivery on all orders over {storeConfig.currencySymbol} {storeConfig.freeShippingThreshold.toLocaleString()}.</p>
                  <p>• <strong>Exchanges:</strong> We offer 7-day doorstep size swaps with zero restocking fees.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-12 border-t border-zinc-200 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-400">
              Patron Feedback
            </span>
            <h2 className="text-2xl font-serif font-bold text-zinc-950 mt-1">
              Customer Reviews ({product.reviews?.length || 0})
            </h2>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors self-start sm:self-auto"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="p-6 bg-zinc-50 border border-zinc-200 rounded-lg max-w-xl space-y-4 animate-fade-in"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Share Your Experience
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Asad Siddiqui"
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">City in Pakistan *</label>
                <input
                  type="text"
                  required
                  value={reviewerCity}
                  onChange={(e) => setReviewerCity(e.target.value)}
                  placeholder="e.g. Lahore / Karachi"
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewerRating(star)}
                    className="p-1 text-amber-500 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= reviewerRating ? 'fill-current' : 'text-zinc-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Your Comments on Fabric, Fit, and Quality *
              </label>
              <textarea
                rows={3}
                required
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                placeholder="How does the fabric feel? Did the sizing match?"
                className="w-full text-xs p-3 border border-zinc-300 rounded outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800"
            >
              Submit Verified Review
            </button>

            {reviewSubmitted && (
              <p className="text-xs text-emerald-600 font-bold">
                Thank you! Your review has been added.
              </p>
            )}
          </form>
        )}

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 bg-white border border-zinc-200/90 rounded-lg shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">{rev.author}</h4>
                    <p className="text-[10px] text-zinc-400">
                      {rev.city} • {rev.date}
                    </p>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {rev.verifiedPurchase && (
                  <span className="inline-block text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
                    ✓ Verified Patron
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-zinc-400 italic">
              No customer reviews yet. Be the first to review this garment!
            </p>
          )}
        </div>
      </section>

      {/* Related Garments */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-zinc-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-zinc-950 uppercase tracking-wider">
              Complementary Pieces
            </h3>
            <button
              onClick={() => navigateTo('shop', { category: product.category })}
              className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
