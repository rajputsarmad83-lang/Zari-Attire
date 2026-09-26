import React, { useState, useEffect } from 'react';
import { Product, ProductColor } from '../../types/store';
import { useShop } from '../../context/ShopContext';
import { X, Plus, Trash2, Image, Check, AlertCircle } from 'lucide-react';

interface ProductEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { updateProduct, addProduct, deleteProduct, storeConfig } = useShop();

  const isCreating = !product;

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    price: 2999,
    originalPrice: 3800,
    discountPercentage: 20,
    category: 'men',
    subcategory: 't-shirts',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Onyx Black', hex: '#1C1C1C' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    description: '',
    material: '100% Pure Combed Cotton (220 GSM)',
    fit: 'Regular Tailored Fit',
    careInstructions: ['Machine wash cold', 'Dry in shade'],
    availableStock: 25,
    sku: `KH-${Math.floor(1000 + Math.random() * 9000)}`,
    isBestSeller: false,
    isSale: false,
    tags: ['new', 'essential']
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData({
        name: '',
        slug: '',
        price: 2999,
        originalPrice: 3800,
        discountPercentage: 20,
        category: 'men',
        subcategory: 't-shirts',
        gender: 'men',
        images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000'],
        availableSizes: ['S', 'M', 'L', 'XL'],
        availableColors: [
          { name: 'Onyx Black', hex: '#1C1C1C' },
          { name: 'Pure White', hex: '#FFFFFF' }
        ],
        description: 'Crafted with premium natural fibers and meticulous attention to tailoring.',
        material: '100% Long-Staple Pakistani Cotton (220 GSM)',
        fit: 'Regular Tailored Fit',
        careInstructions: ['Machine wash cold with like colors', 'Dry in shade'],
        availableStock: 30,
        sku: `KH-PR-${Math.floor(1000 + Math.random() * 9000)}`,
        isBestSeller: false,
        isSale: false,
        tags: ['new-arrival', 'cotton']
      });
    }
    setSaveSuccess(false);
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handlePriceChange = (priceVal: number, originalVal?: number) => {
    const orig = originalVal !== undefined ? originalVal : formData.originalPrice || priceVal;
    let disc = 0;
    if (orig > priceVal && orig > 0) {
      disc = Math.round(((orig - priceVal) / orig) * 100);
    }
    setFormData((prev) => ({
      ...prev,
      price: priceVal,
      originalPrice: orig,
      discountPercentage: disc,
      isSale: disc > 0
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setFormData((prev) => ({
        ...prev,
        availableColors: [
          ...(prev.availableColors || []),
          { name: newColorName.trim(), hex: newColorHex }
        ]
      }));
      setNewColorName('');
    }
  };

  const handleRemoveColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      availableColors: (prev.availableColors || []).filter((_, i) => i !== index)
    }));
  };

  const handleToggleSize = (size: string) => {
    setFormData((prev) => {
      const current = prev.availableSizes || [];
      const updated = current.includes(size)
        ? current.filter((s) => s !== size)
        : [...current, size];
      return { ...prev, availableSizes: updated };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert('Please enter a product title');
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const fullProduct: Product = {
      id: product?.id || `prod-${Date.now()}`,
      name: formData.name || 'Untitled Garment',
      slug,
      price: Number(formData.price) || 2499,
      originalPrice: Number(formData.originalPrice) || Number(formData.price) || 2499,
      discountPercentage: Number(formData.discountPercentage) || 0,
      category: formData.category || 'men',
      subcategory: formData.subcategory || 'apparel',
      gender: formData.gender || 'unisex',
      images:
        formData.images && formData.images.length > 0
          ? formData.images
          : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000'],
      availableSizes:
        formData.availableSizes && formData.availableSizes.length > 0
          ? formData.availableSizes
          : ['M', 'L'],
      availableColors:
        formData.availableColors && formData.availableColors.length > 0
          ? formData.availableColors
          : [{ name: 'Black', hex: '#1A1A1A' }],
      description: formData.description || '',
      material: formData.material || 'Premium Fabric',
      fit: formData.fit || 'Regular Fit',
      careInstructions: formData.careInstructions || ['Gentle care'],
      availableStock: Number(formData.availableStock) || 0,
      sku: formData.sku || `KH-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: product?.rating || 4.9,
      reviewsCount: product?.reviewsCount || 1,
      isBestSeller: !!formData.isBestSeller,
      isSale: !!formData.isSale,
      tags: formData.tags || ['featured'],
      reviews: product?.reviews || []
    };

    if (isCreating) {
      addProduct(fullProduct);
    } else {
      updateProduct(fullProduct);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleDelete = () => {
    if (product && window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product.id);
      onClose();
    }
  };

  const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38', '52', '54', '56', '58'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-3xl w-full p-6 overflow-hidden my-8 border border-zinc-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                Store Catalog Editor
              </span>
              <h2 className="text-xl font-serif font-bold text-zinc-950 mt-1">
                {isCreating ? 'Add New Fashion Garment' : `Edit: ${product?.name}`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="mt-4 space-y-5 max-h-[75vh] overflow-y-auto pr-2">
            {/* Title & SKU */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tailored Minimalist Linen Kurta"
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  SKU Identifier
                </label>
                <input
                  type="text"
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="KH-TS-0101"
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none font-mono"
                />
              </div>
            </div>

            {/* Category, Subcategory, Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category || 'men'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 outline-none bg-white"
                >
                  <option value="men">Men's Collection</option>
                  <option value="women">Women's Collection</option>
                  <option value="new-arrivals">New Arrivals</option>
                  <option value="co-ords">Co-Ord Sets</option>
                  <option value="sale">Sale & Offers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Subcategory
                </label>
                <select
                  value={formData.subcategory || 't-shirts'}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 outline-none bg-white"
                >
                  <option value="t-shirts">T-Shirts</option>
                  <option value="shirts">Shirts / Kurtas</option>
                  <option value="hoodies">Hoodies / Sweatshirts</option>
                  <option value="jackets">Jackets & Outerwear</option>
                  <option value="dresses">Dresses & Tunics</option>
                  <option value="abayas">Abayas & Modest Wear</option>
                  <option value="co-ords">Co-Ord Sets</option>
                  <option value="bottoms">Trousers & Chinos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Gender Target
                </label>
                <select
                  value={formData.gender || 'men'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as 'men' | 'women' | 'unisex'
                    })
                  }
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 outline-none bg-white"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
            </div>

            {/* Pricing and Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Sale Price ({storeConfig.currencySymbol}) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.price || ''}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Original Retail Price ({storeConfig.currencySymbol})
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.originalPrice || ''}
                  onChange={(e) => handlePriceChange(formData.price || 0, Number(e.target.value))}
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Discount Calculated
                </label>
                <div className="text-sm font-bold text-rose-600 px-3 py-2 bg-rose-50 border border-rose-200 rounded">
                  {formData.discountPercentage}% OFF
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Inventory Units *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.availableStock ?? 20}
                  onChange={(e) =>
                    setFormData({ ...formData, availableStock: Number(e.target.value) })
                  }
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 outline-none"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                Product Photography URLs
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 border border-zinc-300 rounded focus:border-zinc-950 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-3 py-2 bg-zinc-900 text-white rounded text-xs font-semibold hover:bg-zinc-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex flex-wrap gap-2.5 mt-2">
                {formData.images?.map((url, idx) => (
                  <div key={idx} className="relative group w-16 h-20 rounded border border-zinc-200 overflow-hidden bg-zinc-100">
                    <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_SIZES.map((size) => {
                  const isSelected = formData.availableSizes?.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleToggleSize(size)}
                      className={`px-3 py-1 text-xs font-semibold rounded border transition-colors ${
                        isSelected
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                Color Options
              </label>
              <div className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  placeholder="Color Name (e.g. Sage Green)"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  className="text-xs px-3 py-1.5 border border-zinc-300 rounded flex-1"
                />
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-9 h-8 p-0 border border-zinc-300 rounded cursor-pointer"
                  title="Pick color"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="px-3 py-1.5 bg-zinc-900 text-white text-xs rounded font-medium hover:bg-zinc-800"
                >
                  Add Color
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.availableColors?.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-xs text-zinc-800"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-zinc-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(i)}
                      className="text-zinc-400 hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Description, Fabric, Fit */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Write a luxurious, detailed description of this item..."
                  className="w-full text-xs p-3 border border-zinc-300 rounded focus:border-zinc-950 outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                    Fabric & Material Specs
                  </label>
                  <input
                    type="text"
                    value={formData.material || ''}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="100% Combed Pakistani Cotton (220 GSM)"
                    className="w-full text-xs px-3 py-2 border border-zinc-300 rounded outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                    Tailored Cut & Fit
                  </label>
                  <input
                    type="text"
                    value={formData.fit || ''}
                    onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                    placeholder="Regular Tailored Fit (true to size)"
                    className="w-full text-xs px-3 py-2 border border-zinc-300 rounded outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Badges / Checkboxes */}
            <div className="flex flex-wrap gap-6 pt-2 border-t border-zinc-200 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="font-semibold text-zinc-800">Highlight as "Best Seller"</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData.isSale}
                  onChange={(e) => setFormData({ ...formData, isSale: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="font-semibold text-zinc-800">Featured in Sale Collection</span>
              </label>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
              <div>
                {!isCreating && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Product</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>{isCreating ? 'Create Garment' : 'Save Changes'}</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
