import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  RotateCcw
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartGrandTotal,
    remainingForFreeShipping,
    storeConfig,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    navigateTo
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const freeShippingThreshold = storeConfig.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoStatus({ type: 'success', message: res.message });
      setPromoInput('');
    } else {
      setPromoStatus({ type: 'error', message: res.message });
    }
    setTimeout(() => setPromoStatus(null), 4000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-zinc-950 uppercase tracking-wider">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          Explore our latest collection of architectural cuts, pure Pakistani cotton, and modern pret garments.
        </p>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-6 py-3 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
            Order Review
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 uppercase tracking-wider mt-1">
            Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-zinc-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Bag</span>
        </button>
      </div>

      {/* Free Delivery Meter */}
      <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
        <div className="flex justify-between items-center text-xs mb-2 font-medium">
          {remainingForFreeShipping > 0 ? (
            <span className="text-zinc-700">
              Add{' '}
              <strong className="text-zinc-950">
                {storeConfig.currencySymbol} {remainingForFreeShipping.toLocaleString()}
              </strong>{' '}
              more for <strong>FREE Nationwide Delivery</strong>!
            </span>
          ) : (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> You qualify for FREE Nationwide Delivery!
            </span>
          )}
          <span className="text-xs text-zinc-500 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              progressPercent >= 100 ? 'bg-emerald-600' : 'bg-zinc-900'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Grid: Cart Items & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white divide-y divide-zinc-200">
            {cart.map((item) => (
              <div key={item.cartItemId} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-32 object-cover rounded bg-zinc-100 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                          {item.product.gender} • {item.product.category}
                        </span>
                        <h3
                          onClick={() => navigateTo('product-detail', { product: item.product })}
                          className="text-sm sm:text-base font-semibold text-zinc-950 hover:underline cursor-pointer"
                        >
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-zinc-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-2 text-xs text-zinc-600 space-y-0.5">
                      <p>
                        Size: <strong className="text-zinc-900">{item.selectedSize}</strong> | Color:{' '}
                        <strong className="text-zinc-900">{item.selectedColor.name}</strong>
                      </p>
                      <p className="text-zinc-500">Fabric: {item.product.material}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100">
                    <div className="flex items-center border border-zinc-300 rounded overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3.5 py-1 text-xs font-bold text-zinc-950 bg-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        disabled={item.quantity >= item.product.availableStock}
                        className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-zinc-950">
                        {storeConfig.currencySymbol}{' '}
                        {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <p className="text-[10px] text-zinc-400">
                        {storeConfig.currencySymbol} {item.product.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary Box (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-zinc-200 shadow-sm space-y-6">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-zinc-950 pb-3 border-b border-zinc-200">
            Order Summary
          </h2>

          {/* Promo code */}
          <div>
            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <Tag className="w-4 h-4" />
                  <span>
                    {appliedPromo.code} ({appliedPromo.discountPercent}% OFF)
                  </span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-xs text-rose-600 hover:underline font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Promo Code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    className="flex-1 text-xs px-3 py-2 border border-zinc-300 rounded uppercase font-semibold outline-none focus:border-zinc-950"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-zinc-800"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400">Try coupon code: <strong>KHAAS10</strong> for 10% off.</p>
              </form>
            )}

            {promoStatus && (
              <p
                className={`text-xs mt-2 font-medium ${
                  promoStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {promoStatus.message}
              </p>
            )}
          </div>

          {/* Breakdown */}
          <div className="space-y-2 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="font-semibold text-zinc-900">
                {storeConfig.currencySymbol} {cartSubtotal.toLocaleString()}
              </span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-rose-600 font-semibold">
                <span>Voucher Discount</span>
                <span>
                  -{storeConfig.currencySymbol} {cartDiscount.toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Nationwide Courier (TCS / Leopard)</span>
              <span className="font-semibold text-zinc-900">
                {cartDeliveryFee === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">
                    FREE
                  </span>
                ) : (
                  `${storeConfig.currencySymbol} ${cartDeliveryFee}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-zinc-950 pt-3 border-t border-zinc-200">
              <span>Estimated Total</span>
              <span className="font-serif">
                {storeConfig.currencySymbol} {cartGrandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => navigateTo('checkout', { scroll: true })}
            className="w-full bg-zinc-950 hover:bg-zinc-800 text-white py-3.5 px-4 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cash on Delivery & Raast Payment Supported</span>
          </p>
        </div>
      </div>
    </div>
  );
};
