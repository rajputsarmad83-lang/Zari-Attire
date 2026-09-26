import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Package,
  SlidersHorizontal,
  Tag,
  ShoppingBag,
  Database,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Download,
  Upload,
  Eye,
  MapPin,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { Product, PromoCode, StoreLocation, HeroSlide } from '../types/store';

export const AdminStudioView: React.FC = () => {
  const {
    products,
    storeConfig,
    promoCodes,
    orders,
    adminTab,
    setAdminTab,
    updateProduct,
    addProduct,
    deleteProduct,
    updateStoreConfig,
    addPromoCode,
    deletePromoCode,
    togglePromoCode,
    updateOrderStatus,
    resetCatalogToDefaults,
    exportData,
    importData,
    setEditingProduct,
    setIsAddProductModalOpen,
    navigateTo,
    setViewMode
  } = useShop();

  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // New Promo Code Form state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState(10);
  const [newPromoDesc, setNewPromoDesc] = useState('');
  const [newPromoMin, setNewPromoMin] = useState(0);

  // JSON Import state
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Store Config Form local state
  const [brandForm, setBrandForm] = useState({ ...storeConfig });
  const [brandSaved, setBrandSaved] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDuplicateProduct = (prod: Product) => {
    const dup: Product = {
      ...prod,
      id: `prod-${Date.now()}`,
      name: `${prod.name} (Copy)`,
      sku: `KH-CP-${Math.floor(1000 + Math.random() * 9000)}`,
      slug: `${prod.slug}-copy`
    };
    addProduct(dup);
  };

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreConfig(brandForm);
    setBrandSaved(true);
    setTimeout(() => setBrandSaved(false), 2500);
  };

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;
    const p: PromoCode = {
      code: newPromoCode.trim().toUpperCase(),
      discountPercent: Number(newPromoDiscount),
      description: newPromoDesc.trim(),
      minOrder: Number(newPromoMin) || undefined,
      isActive: true
    };
    addPromoCode(p);
    setNewPromoCode('');
    setNewPromoDiscount(10);
    setNewPromoDesc('');
    setNewPromoMin(0);
  };

  const handleJsonImport = () => {
    if (!jsonInput.trim()) return;
    const ok = importData(jsonInput.trim());
    if (ok) {
      setImportStatus('Store data imported successfully!');
      setJsonInput('');
    } else {
      setImportStatus('Invalid JSON data format. Please verify the JSON string.');
    }
    setTimeout(() => setImportStatus(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Studio Header */}
      <div className="bg-[#18181B] text-white p-6 sm:p-8 rounded-xl shadow-lg border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store CMS & Live Editor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide">
            {storeConfig.name} Studio
          </h1>
          <p className="text-xs text-zinc-400">
            Edit products, pricing in PKR, promo discounts, store branding, and manage customer orders in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setViewMode('customer');
              navigateTo('home');
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-zinc-950 rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Storefront</span>
          </button>

          <button
            onClick={() => setIsAddProductModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Garment</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-zinc-200 overflow-x-auto gap-2 pb-0.5 scrollbar-none">
        <button
          onClick={() => setAdminTab('products')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'products'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Garments & Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('branding')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'branding'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Branding & Banners</span>
        </button>

        <button
          onClick={() => setAdminTab('promos')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'promos'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Promo Codes ({promoCodes.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'orders'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('backup')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'backup'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Backup & Export</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-zinc-200">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title or SKU..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-zinc-300 rounded outline-none focus:border-zinc-950"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="text-xs border border-zinc-300 rounded px-3 py-2 bg-white text-zinc-800 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="men">Men's Collection</option>
                <option value="women">Women's Collection</option>
                <option value="new-arrivals">New Arrivals</option>
                <option value="co-ords">Co-Ord Sets</option>
                <option value="sale">Sale & Offers</option>
              </select>

              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="bg-zinc-950 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                + Add Garment
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 text-zinc-700 uppercase font-semibold text-[11px] border-b border-zinc-200">
                  <tr>
                    <th className="p-3.5">Garment</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price (PKR)</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Badges</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-800">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                      {/* Product Name & Photo */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded bg-zinc-100 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-zinc-950 line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                              SKU: {p.sku} • {p.gender}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3.5">
                        <span className="capitalize font-medium text-zinc-700">
                          {p.subcategory || p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-3.5">
                        <div className="font-bold text-zinc-950">
                          {storeConfig.currencySymbol} {p.price.toLocaleString()}
                        </div>
                        {p.originalPrice > p.price && (
                          <div className="text-[10px] text-zinc-400 line-through">
                            {storeConfig.currencySymbol} {p.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="p-3.5">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                            p.availableStock > 5
                              ? 'bg-emerald-50 text-emerald-700'
                              : p.availableStock > 0
                              ? 'bg-amber-50 text-amber-700 font-bold'
                              : 'bg-rose-50 text-rose-700 font-bold'
                          }`}
                        >
                          {p.availableStock > 0 ? `${p.availableStock} in stock` : 'Sold out'}
                        </span>
                      </td>

                      {/* Badges */}
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {p.isBestSeller && (
                            <span className="text-[9px] bg-zinc-900 text-white px-1.5 py-0.2 rounded font-bold uppercase">
                              Best Seller
                            </span>
                          )}
                          {p.discountPercentage > 0 && (
                            <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold">
                              -{p.discountPercentage}%
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => navigateTo('product-detail', { product: p })}
                            className="p-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded"
                            title="View on store"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded"
                            title="Edit Garment"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDuplicateProduct(p)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                            title="Duplicate Product"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BRANDING & CONTENT */}
      {adminTab === 'branding' && (
        <form onSubmit={handleBrandSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-2xs space-y-6">
            <div className="border-b border-zinc-100 pb-3">
              <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-zinc-950">
                Store Identity & Announcement Bar
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Customize brand name, top announcement ticker, and currency details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded font-serif font-bold text-zinc-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Locations Subtitle (Header Tagline)
                </label>
                <input
                  type="text"
                  value={brandForm.locationSubtitle || ''}
                  onChange={(e) => setBrandForm({ ...brandForm, locationSubtitle: e.target.value })}
                  placeholder="Shakargarh • Narowal • Sialkot"
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  value={brandForm.currencySymbol}
                  onChange={(e) => setBrandForm({ ...brandForm, currencySymbol: e.target.value })}
                  placeholder="PKR"
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                Top Announcement Marquee Bar
              </label>
              <input
                type="text"
                value={brandForm.announcement}
                onChange={(e) => setBrandForm({ ...brandForm, announcement: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-zinc-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                Subheading / Brand Manifesto
              </label>
              <textarea
                rows={2}
                value={brandForm.subheading}
                onChange={(e) => setBrandForm({ ...brandForm, subheading: e.target.value })}
                className="w-full text-xs p-3 border border-zinc-300 rounded leading-relaxed"
              />
            </div>

            {/* Shipping Thresholds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Free Shipping Threshold (PKR)
                </label>
                <input
                  type="number"
                  value={brandForm.freeShippingThreshold}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      freeShippingThreshold: Number(e.target.value)
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Standard Courier Delivery Fee (PKR)
                </label>
                <input
                  type="number"
                  value={brandForm.standardShippingFee}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      standardShippingFee: Number(e.target.value)
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded font-bold"
                />
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Customer Care Phone
                </label>
                <input
                  type="text"
                  value={brandForm.phone}
                  onChange={(e) => setBrandForm({ ...brandForm, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={brandForm.whatsapp}
                  onChange={(e) => setBrandForm({ ...brandForm, whatsapp: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={brandForm.email}
                  onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {brandSaved && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Changes Saved!
              </span>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Save Brand Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: PROMO CODES */}
      {adminTab === 'promos' && (
        <div className="space-y-6">
          {/* Add Promo Code Form */}
          <form
            onSubmit={handleAddPromo}
            className="bg-white p-6 rounded-lg border border-zinc-200 shadow-2xs space-y-4"
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2">
              Create New Voucher / Promo Code
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Promo Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH20"
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded uppercase font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Discount Percentage (%) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  required
                  value={newPromoDiscount}
                  onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Min Order Amount (PKR)
                </label>
                <input
                  type="number"
                  min="0"
                  value={newPromoMin || ''}
                  onChange={(e) => setNewPromoMin(Number(e.target.value))}
                  placeholder="Optional min total"
                  className="w-full text-xs px-3 py-2 border border-zinc-300 rounded"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-zinc-950 text-white py-2 px-4 rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  + Add Promo Code
                </button>
              </div>
            </div>
          </form>

          {/* Promo Codes List */}
          <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 text-zinc-700 uppercase font-semibold text-[11px] border-b border-zinc-200">
                  <tr>
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Discount</th>
                    <th className="p-3.5">Min Order</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-800">
                  {promoCodes.map((p) => (
                    <tr key={p.code} className="hover:bg-zinc-50">
                      <td className="p-3.5 font-mono font-bold text-zinc-950 text-sm">
                        {p.code}
                      </td>
                      <td className="p-3.5 font-bold text-rose-600">
                        {p.discountPercent}% OFF
                      </td>
                      <td className="p-3.5 text-zinc-500">
                        {p.minOrder
                          ? `${storeConfig.currencySymbol} ${p.minOrder.toLocaleString()}`
                          : 'No minimum'}
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => togglePromoCode(p.code)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-zinc-100 text-zinc-500'
                          }`}
                        >
                          {p.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => deletePromoCode(p.code)}
                          className="text-rose-600 hover:text-rose-800 p-1"
                          title="Delete code"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOMER ORDERS */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-zinc-950">
              Customer Orders & Dispatch Status ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-lg border border-dashed border-zinc-300 p-8 space-y-2">
              <ShoppingBag className="w-10 h-10 text-zinc-300 mx-auto" />
              <p className="text-sm font-semibold text-zinc-700">No orders recorded yet</p>
              <p className="text-xs text-zinc-500">
                When clients check out on your store, their orders will appear here for courier dispatch.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-zinc-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-100 text-zinc-700 uppercase font-semibold text-[11px] border-b border-zinc-200">
                    <tr>
                      <th className="p-3.5">Order Ref</th>
                      <th className="p-3.5">Client & City</th>
                      <th className="p-3.5">Garments</th>
                      <th className="p-3.5">Total (PKR)</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-800">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-zinc-50">
                        <td className="p-3.5 font-mono font-bold text-zinc-950">
                          {ord.orderNumber}
                          <p className="text-[10px] text-zinc-400 font-sans">{ord.date}</p>
                        </td>

                        <td className="p-3.5">
                          <p className="font-semibold text-zinc-900">{ord.customerName}</p>
                          <p className="text-[10px] text-zinc-500">
                            {ord.customerPhone} • {ord.city}
                          </p>
                          <p className="text-[10px] text-zinc-400 truncate max-w-xs">{ord.address}</p>
                        </td>

                        <td className="p-3.5">
                          <span className="font-medium text-zinc-700">
                            {ord.items.length} item(s):
                          </span>
                          <p className="text-[10px] text-zinc-500 line-clamp-1">
                            {ord.items.map((i) => `${i.name} (${i.size})`).join(', ')}
                          </p>
                        </td>

                        <td className="p-3.5 font-bold text-zinc-950">
                          {storeConfig.currencySymbol} {ord.total.toLocaleString()}
                        </td>

                        <td className="p-3.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">
                            {ord.paymentMethod === 'cod' ? 'COD' : 'Bank Transfer'}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value as any)
                            }
                            className="text-xs border border-zinc-300 rounded px-2 py-1 bg-white font-medium text-zinc-800 outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped / In Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: BACKUP & EXPORT */}
      {adminTab === 'backup' && (
        <div className="space-y-6">
          {/* Netlify Deployment Setup Card */}
          <div className="bg-gradient-to-br from-teal-950 via-zinc-900 to-zinc-950 text-white p-6 rounded-lg border border-teal-800/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Netlify Deployment Configuration</span>
              </div>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                ✓ Ready for Netlify
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Your codebase is now fully configured for Netlify with pre-configured <code className="text-teal-300 bg-zinc-800/80 px-1.5 py-0.5 rounded font-mono">netlify.toml</code> and <code className="text-teal-300 bg-zinc-800/80 px-1.5 py-0.5 rounded font-mono">_redirects</code> for Single Page Application routing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-900/80 p-4 rounded border border-zinc-800 font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-sans font-bold">Build Command</span>
                <span className="text-teal-300 font-bold">npm run build</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-sans font-bold">Publish Directory</span>
                <span className="text-teal-300 font-bold">dist</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs text-zinc-300">
              <p className="font-semibold text-white">Three Ways to Deploy to Netlify:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-zinc-900/60 rounded border border-zinc-800 space-y-1">
                  <p className="font-bold text-teal-300">1. Git Connect</p>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Push your code to GitHub. Connect to Netlify at <span className="text-zinc-300 underline">app.netlify.com</span>. Netlify reads <code className="text-teal-400">netlify.toml</code> automatically.
                  </p>
                </div>
                <div className="p-3 bg-zinc-900/60 rounded border border-zinc-800 space-y-1">
                  <p className="font-bold text-teal-300">2. Netlify Drop</p>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Open <span className="text-zinc-300 underline">app.netlify.com/drop</span> and drag the compiled <code className="text-teal-400">dist/</code> folder into your browser for instant hosting.
                  </p>
                </div>
                <div className="p-3 bg-zinc-900/60 rounded border border-zinc-800 space-y-1">
                  <p className="font-bold text-teal-300">3. Netlify CLI</p>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Run <code className="text-teal-300">npx netlify deploy --prod</code> in your terminal to publish instantly from the command line.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-zinc-950">
              Download & Export Store Configuration
            </h2>
            <p className="text-xs text-zinc-500">
              Download a complete JSON backup of all your edited garments, pricing, store branding, and promo codes.
            </p>

            <button
              onClick={exportData}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Store Data (JSON)</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-zinc-950">
              Import Store Data
            </h2>
            <p className="text-xs text-zinc-500">
              Paste a previously exported JSON backup to restore your products and store settings.
            </p>

            <textarea
              rows={4}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste JSON data here..."
              className="w-full text-xs font-mono p-3 border border-zinc-300 rounded outline-none"
            />

            {importStatus && (
              <p
                className={`text-xs font-bold ${
                  importStatus.includes('success') ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {importStatus}
              </p>
            )}

            <button
              onClick={handleJsonImport}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Import & Apply Data</span>
            </button>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-6 rounded-lg space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Reset to Factory Defaults
            </h3>
            <p className="text-xs text-rose-700">
              Revert all changes and restore original Khaas Atelier products and defaults extracted from https://kprawebsite.netlify.app/.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Reset all catalog and branding to Netlify original defaults?')) {
                  resetCatalogToDefaults();
                  alert('Store reset to defaults!');
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Everything to Defaults</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
