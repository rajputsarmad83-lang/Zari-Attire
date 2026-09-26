import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  PromoCode,
  StoreConfig,
  AppView,
  ViewMode,
  ProductColor
} from '../types/store';
import {
  DEFAULT_PRODUCTS,
  DEFAULT_STORE_CONFIG,
  DEFAULT_PROMO_CODES
} from '../data/defaultData';

const STORAGE_KEYS = {
  PRODUCTS: 'khaas_products_v2',
  CART: 'khaas_cart_v2',
  WISHLIST: 'khaas_wishlist_v2',
  ORDERS: 'khaas_orders_v2',
  CONFIG: 'khaas_config_v2',
  PROMOS: 'khaas_promos_v2',
  VIEW_MODE: 'khaas_view_mode_v2'
};

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  promoCodes: PromoCode[];
  storeConfig: StoreConfig;
  currentView: AppView;
  viewMode: ViewMode;
  selectedProduct: Product | null;
  selectedCategory: string;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isSizeGuideOpen: boolean;
  quickViewProduct: Product | null;
  searchQuery: string;
  appliedPromo: PromoCode | null;
  adminTab: 'products' | 'branding' | 'promos' | 'orders' | 'backup';
  editingProduct: Product | null;
  isAddProductModalOpen: boolean;
  lastCreatedOrder: Order | null;

  // Actions
  navigateTo: (
    view: AppView,
    options?: { category?: string; product?: Product; scroll?: boolean }
  ) => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setAdminTab: (tab: 'products' | 'branding' | 'promos' | 'orders' | 'backup') => void;
  setEditingProduct: (product: Product | null) => void;
  setIsAddProductModalOpen: (open: boolean) => void;

  // Cart & Wishlist
  addToCart: (
    product: Product,
    size: string,
    color: ProductColor,
    quantity?: number,
    openDrawer?: boolean
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Promo & Checkout
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  placeOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    city: string;
    address: string;
    paymentMethod: 'cod' | 'bank_transfer';
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Catalog / Admin Editing
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateStoreConfig: (newConfig: Partial<StoreConfig>) => void;
  addPromoCode: (promo: PromoCode) => void;
  deletePromoCode: (code: string) => void;
  togglePromoCode: (code: string) => void;
  resetCatalogToDefaults: () => void;
  exportData: () => void;
  importData: (jsonData: string) => boolean;

  // Calculations
  cartItemCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartGrandTotal: number;
  remainingForFreeShipping: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // Store Configuration
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'KHAAS ATELIER' || !parsed.name) {
          parsed.name = 'ZARI ATTIRE';
        }
        if (!parsed.locationSubtitle || parsed.locationSubtitle.includes('Lahore')) {
          parsed.locationSubtitle = 'Shakargarh • Narowal • Sialkot';
        }
        if (parsed.stores && parsed.stores[0]?.city === 'Lahore') {
          parsed.stores = DEFAULT_STORE_CONFIG.stores;
        }
        return parsed;
      }
      return DEFAULT_STORE_CONFIG;
    } catch {
      return DEFAULT_STORE_CONFIG;
    }
  });

  // Promo Codes
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMOS);
      return saved ? JSON.parse(saved) : DEFAULT_PROMO_CODES;
    } catch {
      return DEFAULT_PROMO_CODES;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // View & UI states
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIEW_MODE);
      return (saved as ViewMode) || 'customer';
    } catch {
      return 'customer';
    }
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => DEFAULT_PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [adminTab, setAdminTab] = useState<'products' | 'branding' | 'promos' | 'orders' | 'backup'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(storeConfig));
    } catch (e) {
      console.warn('Could not save config to localStorage', e);
    }
  }, [storeConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promoCodes));
    } catch (e) {
      console.warn('Could not save promos to localStorage', e);
    }
  }, [promoCodes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders to localStorage', e);
    }
  }, [orders]);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode);
    } catch {}
    if (mode === 'admin') {
      setCurrentView('admin');
    } else if (currentView === 'admin') {
      setCurrentView('home');
    }
  };

  const navigateTo = (
    view: AppView,
    options?: { category?: string; product?: Product; scroll?: boolean }
  ) => {
    if (options?.category !== undefined) {
      setSelectedCategory(options.category);
    }
    if (options?.product) {
      setSelectedProduct(options.product);
    }
    setCurrentView(view);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    if (options?.scroll !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart operations
  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity = 1,
    openDrawer = true
  ) => {
    const cartItemId = `${product.id}-${size}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;

    setCart((prev) => {
      const idx = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (idx > -1) {
        const updated = [...prev];
        const newQty = updated[idx].quantity + quantity;
        updated[idx] = {
          ...updated[idx],
          quantity: Math.min(newQty, product.availableStock || 99)
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: Math.min(quantity, product.availableStock || 99)
          }
        ];
      }
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const validQty = Math.min(quantity, item.product.availableStock || 99);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Promo code operations
  const applyPromoCode = (inputCode: string): { success: boolean; message: string } => {
    const clean = inputCode.trim().toUpperCase();
    const promo = promoCodes.find((p) => p.code.toUpperCase() === clean && p.isActive);

    if (promo) {
      if (promo.minOrder && cartSubtotal < promo.minOrder) {
        return {
          success: false,
          message: `Minimum order of PKR ${promo.minOrder.toLocaleString()} required for code ${promo.code}.`
        };
      }
      setAppliedPromo(promo);
      return {
        success: true,
        message: `Promo code ${promo.code} applied! ${promo.discountPercent}% discount activated.`
      };
    }

    return {
      success: false,
      message: 'Invalid or expired promotional code. Try KHAAS10 for 10% off.'
    };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Orders
  const placeOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    city: string;
    address: string;
    paymentMethod: 'cod' | 'bank_transfer';
    notes?: string;
  }): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `KH-${randomNum}`;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      city: orderData.city,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.images[0],
        size: item.selectedSize,
        color: item.selectedColor.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      total: cartGrandTotal,
      promoCodeApplied: appliedPromo?.code,
      status: 'Pending'
    };

    // Deduct stock for ordered items
    setProducts((prev) =>
      prev.map((prod) => {
        const orderItem = cart.find((c) => c.product.id === prod.id);
        if (orderItem) {
          return {
            ...prod,
            availableStock: Math.max(0, prod.availableStock - orderItem.quantity)
          };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    clearCart();
    navigateTo('order-success', { scroll: true });
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // Product CRUD
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(products.find((p) => p.id !== productId) || null);
    }
  };

  // Store Configuration
  const updateStoreConfig = (newConfig: Partial<StoreConfig>) => {
    setStoreConfig((prev) => ({
      ...prev,
      ...newConfig
    }));
  };

  // Promo management
  const addPromoCode = (promo: PromoCode) => {
    setPromoCodes((prev) => [
      ...prev.filter((p) => p.code.toUpperCase() !== promo.code.toUpperCase()),
      promo
    ]);
  };

  const deletePromoCode = (code: string) => {
    setPromoCodes((prev) => prev.filter((p) => p.code !== code));
    if (appliedPromo?.code === code) {
      setAppliedPromo(null);
    }
  };

  const togglePromoCode = (code: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.code === code ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const resetCatalogToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
    setStoreConfig(DEFAULT_STORE_CONFIG);
    setPromoCodes(DEFAULT_PROMO_CODES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PROMOS);
  };

  const exportData = () => {
    const data = {
      storeConfig,
      products,
      promoCodes,
      orders,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `khaas-atelier-export-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.products && Array.isArray(parsed.products)) {
        setProducts(parsed.products);
      }
      if (parsed.storeConfig) {
        setStoreConfig(parsed.storeConfig);
      }
      if (parsed.promoCodes && Array.isArray(parsed.promoCodes)) {
        setPromoCodes(parsed.promoCodes);
      }
      if (parsed.orders && Array.isArray(parsed.orders)) {
        setOrders(parsed.orders);
      }
      return true;
    } catch (e) {
      console.error('Import parse error:', e);
      return false;
    }
  };

  // Financial calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : 0;
  const cartDeliveryFee =
    cartSubtotal >= storeConfig.freeShippingThreshold || cartSubtotal === 0
      ? 0
      : storeConfig.standardShippingFee;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);
  const remainingForFreeShipping = Math.max(0, storeConfig.freeShippingThreshold - cartSubtotal);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        promoCodes,
        storeConfig,
        currentView,
        viewMode,
        selectedProduct,
        selectedCategory,
        isCartOpen,
        isSearchOpen,
        isSizeGuideOpen,
        quickViewProduct,
        searchQuery,
        appliedPromo,
        adminTab,
        editingProduct,
        isAddProductModalOpen,
        lastCreatedOrder,

        navigateTo,
        setViewMode,
        setSearchQuery,
        setSelectedCategory,
        setIsCartOpen,
        setIsSearchOpen,
        setIsSizeGuideOpen,
        setQuickViewProduct,
        setAdminTab,
        setEditingProduct,
        setIsAddProductModalOpen,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,

        applyPromoCode,
        removePromoCode,
        placeOrder,
        updateOrderStatus,

        updateProduct,
        addProduct,
        deleteProduct,
        updateStoreConfig,
        addPromoCode,
        deletePromoCode,
        togglePromoCode,
        resetCatalogToDefaults,
        exportData,
        importData,

        cartItemCount,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartGrandTotal,
        remainingForFreeShipping
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
