import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { storeConfig } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const cleanPhone = storeConfig.whatsapp.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${storeConfig.name} team, I would like to inquire about customer service.`
  )}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-700">
          Client Care & Boutiques
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 uppercase tracking-wider">
          Contact Our Concierge
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Whether you need advice on bespoke sizing, tracking a Cash on Delivery package, or visiting our boutique showrooms, our team is at your service.
        </p>
      </div>

      {/* Flagship Boutiques 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storeConfig.stores.map((store, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-lg border border-zinc-200/90 shadow-2xs space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-serif font-bold text-sm">
              0{i + 1}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Flagship Studio
              </span>
              <h3 className="font-serif text-xl font-bold text-zinc-950">{store.city} Boutique</h3>
            </div>

            <div className="text-xs text-zinc-600 space-y-2 pt-2 border-t border-zinc-100">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>{store.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{store.phone}</span>
              </p>
              {store.hours && (
                <p className="flex items-start gap-2 text-zinc-500 text-[11px]">
                  <Clock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{store.hours}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Contact Form & WhatsApp Support */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-zinc-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-zinc-950">Send an Inquiry</h2>
            <p className="text-xs text-zinc-500 mt-1">
              We respond to all customer emails within 2-4 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Thank you! Your message has been received by our client care team. We will get in touch shortly.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full text-xs px-3 py-2.5 border border-zinc-300 rounded outline-none focus:border-zinc-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300 1234567"
                    className="w-full text-xs px-3 py-2.5 border border-zinc-300 rounded outline-none focus:border-zinc-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="bilal@example.com"
                    className="w-full text-xs px-3 py-2.5 border border-zinc-300 rounded outline-none focus:border-zinc-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Subject / Order Reference
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Order #KH-12345 Sizing"
                    className="w-full text-xs px-3 py-2.5 border border-zinc-300 rounded outline-none focus:border-zinc-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?..."
                  className="w-full text-xs p-3 border border-zinc-300 rounded outline-none focus:border-zinc-950 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Instant WhatsApp & FAQs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Card */}
          <div className="p-6 bg-emerald-50/80 border border-emerald-200 rounded-lg space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wide">
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Instant WhatsApp Concierge</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              For real-time fit consultations, order tracking, or same-day boutique appointments, message our head stylist on WhatsApp.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Quick FAQ List */}
          <div className="bg-white p-6 rounded-lg border border-zinc-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-3 text-xs text-zinc-600">
              <div>
                <p className="font-semibold text-zinc-900">How long does delivery take?</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  2-3 working days for Lahore, Karachi & Islamabad. 3-4 days nationwide.
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100">
                <p className="font-semibold text-zinc-900">What is the exchange policy?</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  7 days from receipt. Doorstep courier pickup available for size swaps.
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100">
                <p className="font-semibold text-zinc-900">Is Cash on Delivery available?</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Yes, available across all cities and towns in Pakistan with zero extra fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
