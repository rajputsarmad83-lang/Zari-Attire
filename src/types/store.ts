export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: 'men' | 'women' | 'new-arrivals' | 'sale' | 'co-ords' | string;
  subcategory: string;
  gender: 'men' | 'women' | 'unisex';
  images: string[];
  availableSizes: string[];
  availableColors: ProductColor[];
  description: string;
  material: string;
  fit: string;
  careInstructions: string[];
  availableStock: number;
  sku: string;
  rating: number;
  reviewsCount: number;
  isBestSeller: boolean;
  isSale: boolean;
  tags: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  address: string;
  paymentMethod: 'cod' | 'bank_transfer';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCodeApplied?: string;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  notes?: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description?: string;
  minOrder?: number;
  isActive: boolean;
}

export interface StoreLocation {
  city: string;
  address: string;
  phone: string;
  hours?: string;
}

export interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaCategory: string;
  image: string;
}

export interface StoreConfig {
  name: string;
  subheading: string;
  tagline: string;
  announcement: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  phone: string;
  whatsapp: string;
  email: string;
  heroSlides: HeroSlide[];
  stores: StoreLocation[];
  currencySymbol: string;
  locationSubtitle?: string;
}

export type AppView =
  | 'home'
  | 'shop'
  | 'men'
  | 'women'
  | 'new-arrivals'
  | 'sale'
  | 'co-ords'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'about'
  | 'contact'
  | 'wishlist'
  | 'admin';

export type ViewMode = 'customer' | 'visual-edit' | 'admin';
