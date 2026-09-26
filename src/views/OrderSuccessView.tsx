import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Phone,
  Printer,
  ArrowRight,
  MessageCircle,
  Clock
} from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { lastCreatedOrder, orders, storeConfig, navigateTo } = useShop();

  const order = lastCreatedOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-zinc-950">No Order Found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider"
        >
          Return Home
        </button>
      </div>
    );
  }

  const cleanPhone = storeConfig.whatsapp.replace(/[^0-9]/g, '');
  const waMsg = encodeURIComponent(
    `Hello ${storeConfig.name}, I have placed order ${order.orderNumber} for PKR ${order.total.toLocaleString()} to ${order.city}. Please confirm dispatch.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700">
          Order Successfully Placed
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950">
          Thank You, {order.customerName}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          Your order has been recorded. Our tailoring and dispatch team will package your garments with care.
        </p>
      </div>

      {/* Order Card */}
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Order Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider">Order Reference</p>
            <p className="text-lg font-mono font-bold text-zinc-950 mt-0.5">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider">Date</p>
            <p className="text-xs font-semibold text-zinc-800 mt-0.5">{order.date}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider">Payment Method</p>
            <span className="inline-block mt-0.5 text-xs font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded">
              {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Transfer / Raast'}
            </span>
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider">Status</p>
            <span className="inline-block mt-0.5 text-xs font-bold px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded">
              {order.status}
            </span>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-600">
          <div className="space-y-1">
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider">Recipient Contact</h4>
            <p className="font-medium text-zinc-800">{order.customerName}</p>
            <p>{order.customerPhone}</p>
            <p className="text-zinc-500">{order.customerEmail}</p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider">Delivery Destination</h4>
            <p className="font-medium text-zinc-800">{order.address}</p>
            <p>{order.city}, Pakistan</p>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold pt-1">
              <Truck className="w-3.5 h-3.5" />
              <span>Nationwide Courier: 2–4 Business Days</span>
            </div>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="space-y-3 pt-4 border-t border-zinc-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
            Ordered Garments ({order.items.length})
          </h4>
          <div className="divide-y divide-zinc-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded bg-zinc-100 shrink-0"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-zinc-900">{item.name}</p>
                    <p className="text-zinc-500 text-[11px]">
                      Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-zinc-950 shrink-0">
                  {storeConfig.currencySymbol} {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="space-y-2 pt-4 border-t border-zinc-200 text-xs text-zinc-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {storeConfig.currencySymbol} {order.subtotal.toLocaleString()}
            </span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-rose-600 font-semibold">
              <span>Voucher Discount</span>
              <span>
                -{storeConfig.currencySymbol} {order.discount.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Courier Delivery Fee</span>
            <span>
              {order.deliveryFee === 0 ? 'FREE' : `${storeConfig.currencySymbol} ${order.deliveryFee}`}
            </span>
          </div>

          <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-200">
            <span>Total Payable {order.paymentMethod === 'cod' ? 'on Delivery' : ''}</span>
            <span className="text-base font-serif">
              {storeConfig.currencySymbol} {order.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Next Steps notice */}
        <div className="p-4 bg-zinc-50 rounded border border-zinc-200 text-xs text-zinc-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-zinc-900">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>What happens next?</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            1. You will receive an SMS confirmation from our courier dispatch team with your tracking tracking ID.
          </p>
          <p className="text-[11px] leading-relaxed">
            2. The rider will contact you on <strong>{order.customerPhone}</strong> prior to delivery. Please have exact cash ready for COD.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Confirm Order on WhatsApp</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 border border-zinc-300 rounded text-xs text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={() => navigateTo('shop', { category: 'all' })}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
