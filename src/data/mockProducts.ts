export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  skinType: string;
  isFeatured: boolean;
  stock: number;
  sku: string;
  description: string;
  rating?: number;
  reviews?: number;
  isOnSale?: boolean;
  originalPrice?: number;
}

// Mock data for cosmetics products
export const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Luxury Anti-Aging Serum",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "Skincare",
    brand: "Luxe Beauty",
    skinType: "Mature Skin",
    isFeatured: true,
    stock: 15,
    sku: "LAS-001",
    description: "Advanced anti-aging serum with retinol and hyaluronic acid",
    rating: 4.8,
    reviews: 127,
  },
  {
    _id: "2",
    name: "Matte Liquid Lipstick",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop",
    category: "Makeup",
    brand: "Glow Cosmetics",
    skinType: "All Types",
    isFeatured: true,
    stock: 25,
    sku: "MLL-002",
    description: "Long-lasting matte lipstick in stunning rose gold",
    rating: 4.6,
    reviews: 89,
  },
  {
    _id: "3",
    name: "Hydrating Face Cream",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "Skincare",
    brand: "Pure Skin",
    skinType: "Dry Skin",
    isFeatured: false,
    stock: 30,
    sku: "HFC-003",
    description: "Intensive hydration cream for dry and sensitive skin",
    rating: 4.7,
    reviews: 156,
  },
  {
    _id: "4",
    name: "Volumizing Mascara",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    category: "Makeup",
    brand: "Lash Luxe",
    skinType: "All Types",
    isFeatured: true,
    stock: 40,
    sku: "VM-004",
    description: "Dramatic volume and length for your lashes",
    rating: 4.5,
    reviews: 203,
  },
  {
    _id: "5",
    name: "Gentle Cleanser",
    price: 7500,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "Skincare",
    brand: "Pure Skin",
    skinType: "Sensitive Skin",
    isFeatured: false,
    stock: 20,
    sku: "GC-005",
    description: "Gentle daily cleanser for sensitive skin types",
    rating: 4.9,
    reviews: 78,
  },
  {
    _id: "6",
    name: "Shimmer Eyeshadow Palette",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    category: "Makeup",
    brand: "Glow Cosmetics",
    skinType: "All Types",
    isFeatured: true,
    stock: 12,
    sku: "SEP-006",
    description: "12 stunning shimmer shades for any occasion",
    rating: 4.8,
    reviews: 134,
  },
  {
    _id: "7",
    name: "Hair Growth Serum",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "Hair Care",
    brand: "Luxe Beauty",
    skinType: "All Types",
    isFeatured: false,
    stock: 18,
    sku: "HGS-007",
    description: "Promotes healthy hair growth and thickness",
    rating: 4.6,
    reviews: 92,
  },
  {
    _id: "8",
    name: "Perfume Rose Garden",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "Fragrances",
    brand: "Aroma Luxe",
    skinType: "All Types",
    isFeatured: true,
    stock: 8,
    sku: "PRG-008",
    description: "Elegant rose fragrance with lasting power",
    rating: 4.7,
    reviews: 67,
  },
  {
    _id: "9",
    name: "Body Lotion",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "Body Care",
    brand: "Pure Skin",
    skinType: "All Types",
    isFeatured: false,
    stock: 35,
    sku: "BL-009",
    description: "Nourishing body lotion with shea butter",
    rating: 4.4,
    reviews: 145,
  },
  {
    _id: "10",
    name: "Makeup Brushes Set",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    category: "Tools & Accessories",
    brand: "Glow Cosmetics",
    skinType: "All Types",
    isFeatured: false,
    stock: 22,
    sku: "MBS-010",
    description: "Professional 8-piece makeup brush set",
    rating: 4.8,
    reviews: 112,
  },
  {
    _id: "11",
    name: "Men's Shaving Cream",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "Men's Grooming",
    brand: "Gentleman's Choice",
    skinType: "Sensitive Skin",
    isFeatured: false,
    stock: 28,
    sku: "MSC-011",
    description: "Smooth shaving cream for sensitive skin",
    rating: 4.5,
    reviews: 89,
  },
  {
    _id: "12",
    name: "Acne Treatment Gel",
    price: 11000,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "Skincare",
    brand: "Pure Skin",
    skinType: "Acne-Prone Skin",
    isFeatured: true,
    stock: 16,
    sku: "ATG-012",
    description: "Targeted treatment for acne-prone skin",
    rating: 4.6,
    reviews: 178,
  },
];
