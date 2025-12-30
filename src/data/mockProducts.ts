export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  kartType: string;
  isFeatured: boolean;
  stock: number;
  sku: string;
  description: string;
  rating?: number;
  reviews?: number;
  isOnSale?: boolean;
  originalPrice?: number;
}

// Mock data for karts products
export const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Apex Pro Racing Kart",
    price: 4500000,
    image:
      "https://images.unsplash.com/photo-1596700815136-1594916298cc?w=800&q=80",
    category: "Racing Karts",
    brand: "Apex Rush",
    kartType: "Professional",
    isFeatured: true,
    stock: 5,
    sku: "APK-001",
    description: "Championship-winning professional racing kart chassis with aerodynamic improvements",
    rating: 4.9,
    reviews: 24,
  },
  {
    _id: "2",
    name: "Thunder 250cc",
    price: 3800000,
    image:
      "https://images.unsplash.com/photo-1563200782-eb0678d2b96e?w=800&q=80",
    category: "Racing Karts",
    brand: "Thunder Karts",
    kartType: "Professional",
    isFeatured: true,
    stock: 8,
    sku: "T250-002",
    description: "High-performance 250cc engine kart designed for speed and agility",
    rating: 4.8,
    reviews: 18,
  },
  {
    _id: "3",
    name: "Velocity Electric Kart",
    price: 5200000,
    image:
      "https://images.unsplash.com/photo-1510251197878-a2e6d2cb590c?w=800&q=80",
    category: "Electric Karts",
    brand: "Velocity",
    kartType: "Eco-Friendly",
    isFeatured: true,
    stock: 3,
    sku: "VEK-003",
    description: "Zero-emission high-torque electric kart for the modern racer",
    rating: 4.9,
    reviews: 12,
  },
  {
    _id: "4",
    name: "Junior Racer Kart",
    price: 2500000,
    image:
      "https://images.unsplash.com/photo-1534015797371-507c72462e08?w=800&q=80",
    category: "Recreational Karts",
    brand: "Speedster",
    kartType: "Youth",
    isFeatured: true,
    stock: 10,
    sku: "JRK-004",
    description: "Safe and reliable starter kart for young aspiring drivers",
    rating: 4.7,
    reviews: 35,
  },
  {
    _id: "5",
    name: "Pro Racing Helmet",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    category: "Safety Equipment",
    brand: "HeadSafe",
    kartType: "All Types",
    isFeatured: false,
    stock: 50,
    sku: "PRH-005",
    description: "FIA approved carbon fiber racing helmet with advanced ventilation",
    rating: 4.8,
    reviews: 156,
  },
  {
    _id: "6",
    name: "Speed Master 200cc",
    price: 3200000,
    image:
      "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
    category: "Recreational Karts",
    brand: "Speedster",
    kartType: "Intermediate",
    isFeatured: true,
    stock: 6,
    sku: "SM-200",
    description: "Perfect balance of power and control for intermediate drivers",
    rating: 4.6,
    reviews: 42,
  },
  {
    _id: "7",
    name: "Racing Suit Pro",
    price: 280000,
    image:
      "https://images.unsplash.com/photo-1622606547635-08e92025170d?w=800&q=80",
    category: "Racing Gear",
    brand: "Apex Gear",
    kartType: "All Types",
    isFeatured: false,
    stock: 25,
    sku: "RSP-007",
    description: "Fire-resistant professional racing suit with ergonomic fit",
    rating: 4.7,
    reviews: 89,
  },
  {
    _id: "8",
    name: "Family Fun Kart",
    price: 2200000,
    image:
      "https://images.unsplash.com/photo-1456013620853-066c1b353df0?w=800&q=80",
    category: "Recreational Karts",
    brand: "FunRide",
    kartType: "Family",
    isFeatured: true,
    stock: 4,
    sku: "FFK-008",
    description: "Double seater kart perfect for family fun on the track",
    rating: 4.5,
    reviews: 28,
  },
  {
    _id: "9",
    name: "Premium Racing Gloves",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1591523351984-7a93554b3834?w=800&q=80",
    category: "Racing Gear",
    brand: "Apex Gear",
    kartType: "All Types",
    isFeatured: false,
    stock: 100,
    sku: "PRG-009",
    description: "High-grip racing gloves for ultimate steering precision",
    rating: 4.8,
    reviews: 210,
  },
  {
    _id: "10",
    name: "Eco Racer Electric",
    price: 4900000,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Electric Karts",
    brand: "Velocity",
    kartType: "Eco-Friendly",
    isFeatured: true,
    stock: 2,
    sku: "ERE-010",
    description: "High-efficiency electric kart with regenerative braking",
    rating: 4.9,
    reviews: 8,
  },
];
