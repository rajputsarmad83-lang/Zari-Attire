import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PAKISTAN_CITIES } from '../data/defaultData';
import {
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartGrandTotal,
    storeConfig,
    placeOrder,
    navigateTo
  } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    paymentMethod: 'cod' as 'cod' | 'bank_transfer',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-zinc-950">Your Bag is Empty</h2>
        <p className="text-xs text-zinc-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-6 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerEmail: formData.email.trim() || 'customer@khaasatelier.com',
        city: formData.city,
        address: formData.address.trim(),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes.trim()
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top back */}
      <button
        onClick={() => navigateTo('cart')}
        className="text-xs text-zinc-500 hover:text-zinc-950 flex items-center gap-1 font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Shopping Bag</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Checkout Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
              Express Dispatch
            </span>
            <h1 className="text-2xl font-serif font-bold text-zinc-950 uppercase tracking-wider mt-1">
              Checkout & Delivery Information
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Nationwide delivery across Pakistan via TCS & Leopard Express Courier in 2-4 working days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Details */}
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-2xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2">
                1. Contact & Recipient Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Asad Ali Khan"
                    className="w-full text-xs px-3 py-2.5 border border-zinc-300 rounded focus:border-zinc-950 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Mobile Number (For Courier SMS / Call) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0300 1234567"
                    className="w-full text-xs px-3 py-2.5 border border-zinc-300 rounded focus:border-zinc-950 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Email Address (For Order Tracking Receipt)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. asad@example.com"
                  className="w-full text-xs px-3 py-2.5 border border-zinc-300 rounded focus:border-zinc-950 outline-none"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-2xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2">
                2. Doorstep Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Destination City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-zinc-300 rounded focus:border-zinc-950 outline-none bg-white font-medium"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Pakistan (Nationwide)"
                    className="w-full text-xs px-3 py-2.5 border border-zinc-200 bg-zinc-50 rounded text-zinc-500 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Complete Street Address, House/Apartment No, Block & Landmark *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. House 42-B, Street 14, Phase 5 DHA, near Commercial Market"
                  className="w-full text-xs p-3 border border-zinc-300 rounded focus:border-zinc-950 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Please deliver after 2 PM or call before arrival"
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-2xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2">
                3. Payment Method
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery Option */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-zinc-950 bg-zinc-50/80 shadow-xs ring-1 ring-zinc-950'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-1 text-zinc-950 focus:ring-zinc-950"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-950 uppercase tracking-wide flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Most Popular in Pakistan
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Pay cash to courier agent upon doorstep package receipt. No advance payment required.
                    </p>
                  </div>
                </label>

                {/* Direct Bank / Raast Transfer Option */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.paymentMethod === 'bank_transfer'
                      ? 'border-zinc-950 bg-zinc-50/80 shadow-xs ring-1 ring-zinc-950'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                    className="mt-1 text-zinc-950 focus:ring-zinc-950"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-zinc-950 uppercase tracking-wide flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      Direct Bank Transfer / Raast / JazzCash
                    </span>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Pay via Meezan Bank, Raast ID, or Mobile Wallets. Account IBAN details provided on confirmation.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-400 text-white py-4 px-6 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Confirming Order...' : 'Confirm & Place Order (COD)'}</span>
            </button>
          </form>
        </div>

        {/* Right: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-zinc-200 shadow-sm space-y-5 sticky top-28">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            Bag Items ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h2>

          <div className="max-h-80 overflow-y-auto space-y-3 pr-1 divide-y divide-zinc-100">
            {cart.map((item) => (
              <div key={item.cartItemId} className="pt-3 first:pt-0 flex gap-3 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-16 object-cover rounded bg-zinc-100 shrink-0"
                />
                <div className="flex-1 text-xs">
                  <h4 className="font-semibold text-zinc-950 line-clamp-1">{item.product.name}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Qty: {item.quantity} • Size: {item.selectedSize} • {item.selectedColor.name}
                  </p>
                </div>
                <div className="text-xs font-bold text-zinc-950">
                  {storeConfig.currencySymbol}{' '}
                  {(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 text-xs text-zinc-600 pt-4 border-t border-zinc-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
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
              <span>Nationwide Delivery</span>
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
              <span>Grand Total</span>
              <span className="font-serif">
                {storeConfig.currencySymbol} {cartGrandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 rounded text-[11px] text-zinc-500 space-y-1">
            <p className="flex items-center gap-1.5 font-semibold text-zinc-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe Doorstep Delivery Guarantee</span>
            </p>
            <p>Inspect your parcel package upon arrival. 7-day hassle-free size exchanges available.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
