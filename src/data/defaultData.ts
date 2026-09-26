import { Product, StoreConfig, PromoCode } from '../types/store';

export const PAKISTAN_CITIES = [
  'Shakargarh',
  'Narowal',
  'Sialkot',
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Wah Cantt',
  'Rahim Yar Khan',
  'Sheikhupura',
  'Jhelum',
  'Mardan',
  'Other'
];

export const SIZE_CHART = {
  men: [
    { size: 'XS', chest: '36"', length: '27"', shoulder: '16.5"' },
    { size: 'S', chest: '38"', length: '28"', shoulder: '17.5"' },
    { size: 'M', chest: '40"', length: '29"', shoulder: '18.5"' },
    { size: 'L', chest: '42"', length: '30"', shoulder: '19.5"' },
    { size: 'XL', chest: '44"', length: '31"', shoulder: '20.5"' },
    { size: 'XXL', chest: '46"', length: '32"', shoulder: '21.5"' }
  ],
  women: [
    { size: 'XS', chest: '34"', length: '38"', waist: '28"' },
    { size: 'S', chest: '36"', length: '39"', waist: '30"' },
    { size: 'M', chest: '38"', length: '40"', waist: '32"' },
    { size: 'L', chest: '40"', length: '41"', waist: '34"' },
    { size: 'XL', chest: '42"', length: '42"', waist: '36"' },
    { size: 'XXL', chest: '44"', length: '43"', waist: '38"' }
  ]
};

export const DEFAULT_PROMO_CODES: PromoCode[] = [
  {
    code: 'KHAAS10',
    discountPercent: 10,
    description: '10% off on all collections',
    isActive: true
  },
  {
    code: 'WELCOME10',
    discountPercent: 10,
    description: '10% welcome discount on your first order',
    isActive: true
  },
  {
    code: 'RAMADAN15',
    discountPercent: 15,
    description: 'Special seasonal 15% discount',
    minOrder: 6000,
    isActive: true
  }
];

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  name: 'ZARI ATTIRE',
  subheading: 'Contemporary clothing crafted with architectural silhouettes, pure fabrics, and timeless aesthetics for the modern Pakistani wardrobe.',
  tagline: 'Modern Elegance & Architectural Silhouettes',
  locationSubtitle: 'Shakargarh • Narowal • Sialkot',
  announcement: 'FREE NATIONWIDE DELIVERY ON ORDERS OVER PKR 5,000 | CASH ON DELIVERY AVAILABLE ACROSS PAKISTAN',
  freeShippingThreshold: 5000,
  standardShippingFee: 200,
  currencySymbol: 'PKR',
  phone: '+92 300 8421920',
  whatsapp: '+923008421920',
  email: 'care@zariattire.com',
  heroSlides: [
    {
      id: 'slide-1',
      tag: 'NEW COLLECTION 2025/2026',
      title: 'Architectural Cuts. Pure Pakistani Cotton.',
      subtitle: 'Tailored for the contemporary climate with precision craftsmanship, breathable natural fibers, and timeless luxury.',
      ctaText: 'Explore Men',
      ctaCategory: 'men',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: 'slide-2',
      tag: 'WOMEN’S PRÊT & SILHOUETTES',
      title: 'Effortless Drapery & Sculptural Grace',
      subtitle: 'Discover our breathable linen co-ords, luxury Dubai Nida abayas, and relaxed tailored dresses made for every occasion.',
      ctaText: 'Explore Women',
      ctaCategory: 'women',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop'
    }
  ],
  stores: [
    {
      city: 'Shakargarh',
      address: 'Circular Road, Main Bazar, Shakargarh',
      phone: '+92 300 8421920',
      hours: 'Mon - Sat: 11:00 AM - 10:00 PM | Sun: 2:00 PM - 10:00 PM'
    },
    {
      city: 'Narowal',
      address: 'Kachehri Road, Near Railway Station, Narowal',
      phone: '+92 300 8421920',
      hours: 'Mon - Sun: 12:00 PM - 10:00 PM'
    },
    {
      city: 'Sialkot',
      address: 'Paris Road, Cantt, Sialkot',
      phone: '+92 52 3578910',
      hours: 'Mon - Sat: 11:00 AM - 10:00 PM | Sun: 3:00 PM - 10:00 PM'
    }
  ]
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-t-shirt',
    price: 2499,
    originalPrice: 3200,
    discountPercentage: 22,
    category: 'men',
    subcategory: 't-shirts',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Onyx Black', hex: '#1C1C1C' },
      { name: 'Chalk White', hex: '#F5F5F5' },
      { name: 'Desert Sand', hex: '#D7C4B7' }
    ],
    description: 'Crafted from 100% combed ringspun Pakistani long-staple cotton, this premium crewneck T-shirt offers supreme breathability and an exceptionally soft hand-feel. Tailored with reinforced neck taping and twin-needle hems to retain shape through countless washes.',
    material: '100% Combed Pakistani Cotton (220 GSM)',
    fit: 'Regular Tailored Fit (true to size)',
    careInstructions: [
      'Machine wash cold with like colors',
      'Do not bleach or tumble dry',
      'Warm iron inside-out if needed',
      'Dry in shade'
    ],
    availableStock: 48,
    sku: 'KH-TS-0101',
    rating: 4.8,
    reviewsCount: 34,
    isBestSeller: true,
    isSale: true,
    tags: ['essential', 'basics', 'cotton', 'summer', 'best seller'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Hamza Tariq',
        city: 'Lahore',
        rating: 5,
        comment: 'Best cotton t-shirt I have bought in Pakistan. The 220 GSM fabric does not lose its shape after washing. Super breathable for Lahore summer.',
        date: '14 August 2024',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        author: 'Usman Ali',
        city: 'Karachi',
        rating: 5,
        comment: 'Delivery arrived in 3 days via Cash on Delivery in Clifton. Excellent packaging and pure luxury fabric feel.',
        date: '28 July 2024',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Oversized Streetwear T-Shirt',
    slug: 'oversized-streetwear-t-shirt',
    price: 2999,
    originalPrice: 3800,
    discountPercentage: 21,
    category: 'new-arrivals',
    subcategory: 't-shirts',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Vintage Olive', hex: '#595F4D' },
      { name: 'Washed Charcoal', hex: '#333333' }
    ],
    description: 'Boxy, dropped-shoulder silhouette crafted in heavyweight 240 GSM organic cotton. Designed for a contemporary street silhouette with relaxed drape and thick ribbed collar.',
    material: '100% Organic Heavyweight Cotton (240 GSM)',
    fit: 'Relaxed Oversized Fit (size down for regular fit)',
    careInstructions: [
      'Machine wash gentle cycle at 30°C',
      'Wash inside out',
      'Do not tumble dry'
    ],
    availableStock: 26,
    sku: 'KH-OS-0202',
    rating: 4.9,
    reviewsCount: 19,
    isBestSeller: true,
    isSale: true,
    tags: ['streetwear', 'oversized', 'heavyweight', 'new'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Shahmeer Khan',
        city: 'Islamabad',
        rating: 5,
        comment: 'The drape is unmatched. Heavyweight fabric like high-end European labels.',
        date: '10 September 2024',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Premium Heavyweight Hoodie',
    slug: 'premium-heavyweight-hoodie',
    price: 4999,
    originalPrice: 6500,
    discountPercentage: 23,
    category: 'men',
    subcategory: 'hoodies',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Midnight Navy', hex: '#1D2A44' },
      { name: 'Oatmeal Heather', hex: '#D8D4CD' }
    ],
    description: 'Substantial 450 GSM brushed French terry fleece hoodie with double-layered hood, seamless kangaroo pocket, and heavy cotton drawstrings with engraved metal aglets.',
    material: '100% Combed Cotton Brushed Fleece (450 GSM)',
    fit: 'Structured Boxy Fit',
    careInstructions: ['Dry clean recommended or machine wash cold', 'Lay flat to dry'],
    availableStock: 35,
    sku: 'KH-HD-0303',
    rating: 4.7,
    reviewsCount: 22,
    isBestSeller: false,
    isSale: true,
    tags: ['winter', 'hoodie', 'fleece', 'heavyweight'],
    reviews: [
      {
        id: 'rev-4',
        author: 'Bilal Chaudhry',
        city: 'Rawalpindi',
        rating: 5,
        comment: 'Heavy and warm for Islamabad winters. Stitching quality is top notch.',
        date: '2 November 2024',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Relaxed Casual Linen-Blend Shirt',
    slug: 'relaxed-casual-shirt',
    price: 3499,
    originalPrice: 4500,
    discountPercentage: 22,
    category: 'men',
    subcategory: 'shirts',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Natural Ecru', hex: '#EBE6DD' },
      { name: 'Sage Green', hex: '#7A8B7B' },
      { name: 'Sky Chambray', hex: '#9BB5C4' }
    ],
    description: 'Airy linen and combed cotton blend tailored with a spread collar and mother-of-pearl finish buttons. Naturally cooling and subtly textured for effortless warm-weather tailoring.',
    material: '55% Pure Linen, 45% Combed Cotton',
    fit: 'Relaxed Silhouette',
    careInstructions: ['Gentle cycle cold', 'Steam iron while damp', 'Hang dry'],
    availableStock: 20,
    sku: 'KH-SH-0404',
    rating: 4.8,
    reviewsCount: 15,
    isBestSeller: true,
    isSale: true,
    tags: ['linen', 'summer', 'breathable', 'casual'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Zain Raza',
        city: 'Faisalabad',
        rating: 5,
        comment: 'So cool and lightweight for humid weather. The mother of pearl buttons add such a refined detail.',
        date: '19 June 2024',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Vintage Wash Denim Trucker Jacket',
    slug: 'vintage-denim-jacket',
    price: 5999,
    originalPrice: 7999,
    discountPercentage: 25,
    category: 'men',
    subcategory: 'jackets',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['M', 'L', 'XL'],
    availableColors: [
      { name: 'Vintage Indigo', hex: '#3E5675' },
      { name: 'Faded Black', hex: '#2A2A2A' }
    ],
    description: '14 oz raw selvedge-inspired rigid cotton denim treated with artisanal ozone wash. Features custom embossed Khaas Atelier hardware and twin flap chest pockets.',
    material: '100% Rigid Pakistani Cotton Denim (14 oz)',
    fit: 'Standard Classic Trucker Fit',
    careInstructions: ['Wash sparingly inside out with cold water', 'Hang dry away from sunlight'],
    availableStock: 18,
    sku: 'KH-JK-0505',
    rating: 4.9,
    reviewsCount: 28,
    isBestSeller: true,
    isSale: true,
    tags: ['denim', 'jacket', 'outerwear', 'classic'],
    reviews: [
      {
        id: 'rev-6',
        author: 'Murtaza Qureshi',
        city: 'Peshawar',
        rating: 5,
        comment: 'Top tier denim jacket. Heavy denim fabric that will age with beautiful fades over time.',
        date: '5 January 2025',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-6',
    name: "Women's Everyday Casual Tiered Dress",
    slug: 'womens-casual-dress',
    price: 4499,
    originalPrice: 5999,
    discountPercentage: 25,
    category: 'women',
    subcategory: 'dresses',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Terracotta Rust', hex: '#B85D43' },
      { name: 'Earthy Sage', hex: '#6B7A6A' },
      { name: 'Jet Black', hex: '#1C1C1C' }
    ],
    description: 'Flattering tiered silhouette cut from breathable modal-cotton blend. Features elbow-length bishop sleeves, practical deep side pockets, and an elasticated waist with sash tie.',
    material: '60% Fine Cotton, 40% Lenzing Modal',
    fit: 'Relaxed Tiered Silhouette (A-line)',
    careInstructions: ['Machine wash delicate', 'Low iron', 'Dry in shade'],
    availableStock: 24,
    sku: 'KH-WD-0606',
    rating: 4.8,
    reviewsCount: 31,
    isBestSeller: true,
    isSale: true,
    tags: ['women', 'dress', 'casual', 'modest', 'summer'],
    reviews: [
      {
        id: 'rev-7',
        author: 'Ayesha Siddiqui',
        city: 'Lahore',
        rating: 5,
        comment: 'So flattering and modest! Pockets are deep and the fabric does not wrinkle easily. Loved the packaging too.',
        date: '20 August 2024',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-7',
    name: "Women's Premium Dubai Nida Abaya",
    slug: 'womens-premium-abaya',
    price: 5999,
    originalPrice: 7999,
    discountPercentage: 25,
    category: 'women',
    subcategory: 'abayas',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['52', '54', '56', '58'],
    availableColors: [
      { name: 'Pure Onyx', hex: '#121212' },
      { name: 'Smoky Taupe', hex: '#877B75' }
    ],
    description: 'Tailored from genuine Korean-grade Dubai Nida fabric with seamless fluid drape and opaque finish. Styled with concealed snap-buttons along the front and flared kimono sleeves.',
    material: 'Original High-Density Dubai Nida (Polyester silk-blend)',
    fit: 'Flowing Modest Cut',
    careInstructions: ['Hand wash or gentle machine wash inside a laundry bag', 'Do not bleach'],
    availableStock: 22,
    sku: 'KH-AB-0707',
    rating: 4.9,
    reviewsCount: 42,
    isBestSeller: true,
    isSale: true,
    tags: ['abaya', 'modest', 'nida', 'luxury', 'women'],
    reviews: [
      {
        id: 'rev-8',
        author: 'Fatima Zahra',
        city: 'Karachi',
        rating: 5,
        comment: 'The drape and fall of this Nida fabric is gorgeous. Completely opaque yet cool in Karachi weather.',
        date: '12 October 2024',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'Summer Linen Co-Ord Set',
    slug: 'summer-co-ord-set',
    price: 3999,
    originalPrice: 5200,
    discountPercentage: 23,
    category: 'co-ords',
    subcategory: 'co-ords',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Warm Almond', hex: '#E2D3C4' },
      { name: 'Powder Blue', hex: '#A3BFD9' },
      { name: 'Olive Dusk', hex: '#5E6652' }
    ],
    description: 'Matching two-piece set featuring an asymmetrical relaxed tunic top with wide-leg cropped culottes. Elasticated waistband with drawstring for customizable comfort.',
    material: 'Pure Slub Linen & Cotton Weave',
    fit: 'Relaxed Tunic & Wide-Leg Trouser',
    careInstructions: ['Dry clean or delicate hand wash cold', 'Steam iron'],
    availableStock: 30,
    sku: 'KH-CO-0808',
    rating: 4.8,
    reviewsCount: 38,
    isBestSeller: true,
    isSale: true,
    tags: ['co-ord', 'linen', 'matching-set', 'bestseller'],
    reviews: [
      {
        id: 'rev-9',
        author: 'Mahnoor Tariq',
        city: 'Islamabad',
        rating: 5,
        comment: 'Wore this on vacation to Hunza. Incredibly comfortable, breathable, and so chic in photos!',
        date: '1 July 2024',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-9',
    name: 'Relaxed Fit Chino Trousers',
    slug: 'relaxed-chino-trousers',
    price: 3799,
    originalPrice: 4800,
    discountPercentage: 21,
    category: 'men',
    subcategory: 'bottoms',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['30', '32', '34', '36', '38'],
    availableColors: [
      { name: 'Khaki Stone', hex: '#C2B69D' },
      { name: 'Slate Grey', hex: '#5A6065' },
      { name: 'Dark Navy', hex: '#1C2833' }
    ],
    description: 'Tailored from stretch cotton twill with garment-dyed finish for a soft lived-in feel. Single front pleat, angled side pockets, and cleanly finished horn buttons.',
    material: '98% Combed Cotton Twill, 2% Elastane',
    fit: 'Tapered Straight Leg',
    careInstructions: ['Machine wash warm', 'Tumble dry low', 'Warm iron'],
    availableStock: 25,
    sku: 'KH-CH-0909',
    rating: 4.6,
    reviewsCount: 17,
    isBestSeller: false,
    isSale: true,
    tags: ['trousers', 'chinos', 'bottoms', 'smart-casual'],
    reviews: []
  },
  {
    id: 'prod-10',
    name: 'Textured Ribbed Knit Top',
    slug: 'textured-ribbed-knit-top',
    price: 2699,
    originalPrice: 3400,
    discountPercentage: 20,
    category: 'women',
    subcategory: 't-shirts',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Cream Ivory', hex: '#FDFBF7' },
      { name: 'Espresso Brown', hex: '#3E2723' }
    ],
    description: 'Fine ribbed knit top featuring a mock neckline and long slim sleeves. Breathable modal blend maintains stretch and recovery without bagging.',
    material: '70% Lenzing Modal, 25% Cotton, 5% Spandex',
    fit: 'Fitted Body-Skimming Silhouette',
    careInstructions: ['Hand wash cold', 'Lay flat to dry'],
    availableStock: 18,
    sku: 'KH-KT-1010',
    rating: 4.7,
    reviewsCount: 14,
    isBestSeller: false,
    isSale: true,
    tags: ['knitwear', 'basics', 'women', 'layering'],
    reviews: []
  },
  {
    id: 'prod-11',
    name: 'Minimalist Mandarin Collar Kurta Shirt',
    slug: 'mandarin-collar-kurta-shirt',
    price: 3699,
    originalPrice: 4700,
    discountPercentage: 21,
    category: 'men',
    subcategory: 'shirts',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Raw Linen', hex: '#D2B48C' },
      { name: 'Deep Indigo', hex: '#1E3F66' }
    ],
    description: 'Modern interpretation of the Eastern kurta silhouette tailored with a mandarin band collar, concealed placket, and subtle side slits. Ideal for Eid or smart casual gatherings.',
    material: 'Pure Long-Staple Egyptian Cotton & Linen Weave',
    fit: 'Contemporary Semi-Fitted Kurta Cut',
    careInstructions: ['Dry clean or hand wash gently', 'Medium iron with starch if preferred'],
    availableStock: 28,
    sku: 'KH-KR-1111',
    rating: 4.9,
    reviewsCount: 26,
    isBestSeller: true,
    isSale: true,
    tags: ['kurta', 'eastern', 'mandarin', 'eid', 'cotton'],
    reviews: []
  },
  {
    id: 'prod-12',
    name: 'Structured Wool-Blend Overcoat',
    slug: 'structured-wool-overcoat',
    price: 8999,
    originalPrice: 11999,
    discountPercentage: 25,
    category: 'new-arrivals',
    subcategory: 'jackets',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['M', 'L', 'XL'],
    availableColors: [
      { name: 'Camel Tan', hex: '#B8860B' },
      { name: 'Charcoal Herringbone', hex: '#363636' }
    ],
    description: 'Architecturally proportioned tailored overcoat made from dense double-faced wool blend with notch lapels, horn buttons, deep welt pockets, and a back vent for ease of motion.',
    material: '65% Fine Wool, 35% Cashmere-Feel Microfiber',
    fit: 'Structured Tailored Overcoat Cut',
    careInstructions: ['Professional dry clean only'],
    availableStock: 12,
    sku: 'KH-CT-1212',
    rating: 5.0,
    reviewsCount: 16,
    isBestSeller: true,
    isSale: true,
    tags: ['overcoat', 'luxury', 'wool', 'winter', 'outerwear'],
    reviews: []
  }
];
