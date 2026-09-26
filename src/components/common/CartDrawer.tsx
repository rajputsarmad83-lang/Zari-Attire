import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
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

  if (!isCartOpen) return null;

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

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigateTo('checkout', { scroll: true });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-zinc-900" />
                <h2 className="text-base font-serif font-bold text-zinc-950 uppercase tracking-wider">
                  Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="mt-4 p-3 bg-zinc-50 border border-zinc-200/80 rounded-sm">
              <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                {remainingForFreeShipping > 0 ? (
                  <span className="text-zinc-700">
                    Add{' '}
                    <strong className="text-zinc-950">
                      {storeConfig.currencySymbol} {remainingForFreeShipping.toLocaleString()}
                    </strong>{' '}
                    more for <strong>FREE Nationwide Delivery</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Delivery
                  </span>
                )}
                <span className="text-[11px] text-zinc-500 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    progressPercent >= 100 ? 'bg-emerald-600' : 'bg-zinc-900'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-zinc-900">Your bag is empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Discover our new architectural garments and elevate your wardrobe.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop', { category: 'all' });
                  }}
                  className="px-5 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3.5 pb-4 border-b border-zinc-100 last:border-b-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-sm bg-zinc-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-zinc-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-zinc-400 hover:text-rose-600 p-1 -mr-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-zinc-500 mt-0.5">
                        Size: <strong className="text-zinc-800">{item.selectedSize}</strong> | Color:{' '}
                        <strong className="text-zinc-800">{item.selectedColor.name}</strong>
                      </p>
                      <p className="text-[11px] font-semibold text-zinc-950 mt-1">
                        {storeConfig.currencySymbol} {item.product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2">
                      <div className="flex items-center border border-zinc-300 rounded overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-semibold text-zinc-900 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.availableStock}
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-zinc-950">
                        {storeConfig.currencySymbol}{' '}
                        {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-zinc-50/70 space-y-4">
              {/* Promo code input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedPromo.code} ({appliedPromo.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-rose-600 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (try KHAAS10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="flex-1 text-xs px-3 py-2 border border-zinc-300 rounded uppercase font-semibold tracking-wider outline-none focus:border-zinc-950"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold uppercase rounded hover:bg-zinc-800 tracking-wider"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoStatus && (
                  <p
                    className={`text-[11px] mt-1.5 font-medium ${
                      promoStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {promoStatus.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">
                    {storeConfig.currencySymbol} {cartSubtotal.toLocaleString()}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-rose-600 font-medium">
                    <span>Discount ({appliedPromo?.discountPercent}%)</span>
                    <span>
                      -{storeConfig.currencySymbol} {cartDiscount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Nationwide Courier Delivery</span>
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

                <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Grand Total</span>
                  <span className="text-base tracking-tight font-serif">
                    {storeConfig.currencySymbol} {cartGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-zinc-950 hover:bg-zinc-800 text-white py-3 px-4 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Checkout (COD)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-zinc-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cash on Delivery & Secure Dispatch Across Pakistan</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
