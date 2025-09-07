import dotenv from "dotenv";
import connectDB from "../lib/mongodb";
import GlowProduct from "../models/Product";
import GlowService from "../models/Service";
import GlowUser from "../models/User";

// Load environment variables from .env file
dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await GlowProduct.deleteMany({});
    await GlowService.deleteMany({});
    await GlowUser.deleteMany({});

    // Create admin user
    const adminUser = new GlowUser({
      username: "admin",
      email: "admin@glowbeauty.com",
      password: "admin123",
      role: "admin",
    });
    await adminUser.save();
    console.log("✅ Admin user created");

    // Create sample cosmetics products
    const products = [
      {
        name: "Hydrating Vitamin C Serum",
        description:
          "Brightening serum with 20% Vitamin C for radiant, even-toned skin",
        price: 45000,
        originalPrice: 55000,
        brand: "GlowBeauty",
        category: "Skincare",
        skinType: "All Types",
        size: "30ml",
        ingredients: [
          "Vitamin C",
          "Hyaluronic Acid",
          "Niacinamide",
          "Green Tea Extract",
        ],
        benefits: [
          "Brightens skin",
          "Reduces dark spots",
          "Boosts collagen",
          "Hydrates",
        ],
        application: "Apply 2-3 drops to clean skin morning and evening",
        isOnSale: true,
        isFeatured: true,
        stock: 25,
        rating: 4.8,
        reviews: 156,
        tags: ["vitamin-c", "brightening", "anti-aging", "hydrating"],
        weight: "30g",
        dimensions: "15cm x 3cm x 3cm",
        expiryDate: "2025-12-31",
        images: [
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
        ],
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        sku: "GB-VC001",
      },
      {
        name: "Luxury Foundation - Medium Coverage",
        description:
          "Long-lasting foundation with SPF 30 for flawless, natural-looking coverage",
        price: 35000,
        originalPrice: 40000,
        brand: "GlowBeauty",
        category: "Makeup",
        skinType: "All Types",
        size: "30ml",
        ingredients: [
          "SPF 30",
          "Hyaluronic Acid",
          "Vitamin E",
          "Mineral Pigments",
        ],
        benefits: [
          "Full coverage",
          "Long-lasting",
          "SPF protection",
          "Hydrating",
        ],
        application:
          "Apply with brush or sponge, blend outward from center of face",
        isOnSale: true,
        isFeatured: true,
        stock: 18,
        rating: 4.6,
        reviews: 89,
        tags: ["foundation", "spf", "long-lasting", "full-coverage"],
        weight: "30g",
        dimensions: "12cm x 4cm x 4cm",
        expiryDate: "2026-06-30",
        images: [
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
        ],
        image:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
        sku: "GB-FD001",
      },
      {
        name: "Rose Gold Eyeshadow Palette",
        description:
          "12-shade palette with matte and shimmer finishes for versatile eye looks",
        price: 28000,
        brand: "GlowBeauty",
        category: "Makeup",
        skinType: "All Types",
        size: "15g",
        ingredients: ["Mica", "Talc", "Iron Oxides", "Rose Gold Pigments"],
        benefits: [
          "Versatile shades",
          "Long-lasting",
          "Blendable",
          "Pigmented",
        ],
        application: "Apply with brush, blend for desired intensity",
        isOnSale: false,
        isFeatured: true,
        stock: 32,
        rating: 4.7,
        reviews: 124,
        tags: ["eyeshadow", "palette", "rose-gold", "versatile"],
        weight: "15g",
        dimensions: "18cm x 12cm x 2cm",
        expiryDate: "2027-03-15",
        images: [
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
        ],
        image:
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
        sku: "GB-ES001",
      },
      {
        name: "Moisturizing Night Cream",
        description:
          "Rich night cream with retinol and peptides for anti-aging and repair",
        price: 52000,
        originalPrice: 60000,
        brand: "GlowBeauty",
        category: "Skincare",
        skinType: "Dry Skin",
        size: "50ml",
        ingredients: ["Retinol", "Peptides", "Ceramides", "Shea Butter"],
        benefits: [
          "Anti-aging",
          "Moisturizing",
          "Skin repair",
          "Reduces fine lines",
        ],
        application: "Apply to clean skin before bedtime, avoid eye area",
        isOnSale: true,
        isFeatured: false,
        stock: 15,
        rating: 4.9,
        reviews: 203,
        tags: ["night-cream", "retinol", "anti-aging", "moisturizing"],
        weight: "50g",
        dimensions: "8cm x 8cm x 6cm",
        expiryDate: "2025-09-20",
        images: [
          "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        ],
        image:
          "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
        sku: "GB-NC001",
      },
      {
        name: "Luxury Perfume - Rose Garden",
        description:
          "Elegant floral fragrance with notes of rose, jasmine, and vanilla",
        price: 85000,
        brand: "GlowBeauty",
        category: "Fragrances",
        skinType: "All Types",
        size: "50ml",
        ingredients: [
          "Rose Extract",
          "Jasmine Absolute",
          "Vanilla",
          "Sandalwood",
        ],
        benefits: [
          "Long-lasting",
          "Elegant scent",
          "Unisex appeal",
          "Premium quality",
        ],
        application: "Spray on pulse points: wrists, neck, behind ears",
        isOnSale: false,
        isFeatured: true,
        stock: 8,
        rating: 4.8,
        reviews: 67,
        tags: ["perfume", "rose", "floral", "luxury"],
        weight: "50g",
        dimensions: "12cm x 4cm x 4cm",
        expiryDate: "2028-01-10",
        images: [
          "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop",
        ],
        image:
          "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
        sku: "GB-PF001",
      },
      {
        name: "Hydrating Shampoo & Conditioner Set",
        description: "Professional hair care set for damaged and dry hair",
        price: 32000,
        originalPrice: 38000,
        brand: "GlowBeauty",
        category: "Hair Care",
        skinType: "All Types",
        size: "500ml each",
        ingredients: ["Argan Oil", "Keratin", "Biotin", "Coconut Oil"],
        benefits: [
          "Repairs damage",
          "Adds shine",
          "Reduces frizz",
          "Strengthens hair",
        ],
        application:
          "Wet hair, apply shampoo, rinse, apply conditioner, leave 2-3 minutes, rinse",
        isOnSale: true,
        isFeatured: false,
        stock: 22,
        rating: 4.5,
        reviews: 98,
        tags: ["shampoo", "conditioner", "hydrating", "repair"],
        weight: "1000g",
        dimensions: "25cm x 8cm x 8cm",
        expiryDate: "2026-08-15",
        images: [
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
        ],
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        sku: "GB-HC001",
      },
      {
        name: "Anti-Aging Eye Cream",
        description:
          "Advanced eye cream with caffeine and hyaluronic acid for dark circles and puffiness",
        price: 38000,
        brand: "GlowBeauty",
        category: "Skincare",
        skinType: "All Types",
        size: "15ml",
        ingredients: ["Caffeine", "Hyaluronic Acid", "Vitamin K", "Peptides"],
        benefits: [
          "Reduces dark circles",
          "Diminishes puffiness",
          "Smooths fine lines",
          "Brightens",
        ],
        application: "Apply gently around eye area morning and evening",
        isOnSale: false,
        isFeatured: true,
        stock: 28,
        rating: 4.7,
        reviews: 145,
        tags: ["eye-cream", "anti-aging", "caffeine", "dark-circles"],
        weight: "15g",
        dimensions: "6cm x 3cm x 3cm",
        expiryDate: "2025-11-30",
        images: [
          "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        ],
        image:
          "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
        sku: "GB-EC001",
      },
      {
        name: "Luxury Lipstick Set - Nude Collection",
        description:
          "Set of 3 nude lipsticks in matte, satin, and glossy finishes",
        price: 25000,
        originalPrice: 30000,
        brand: "GlowBeauty",
        category: "Makeup",
        skinType: "All Types",
        size: "3.5g each",
        ingredients: [
          "Vitamin E",
          "Shea Butter",
          "Natural Pigments",
          "Moisturizers",
        ],
        benefits: [
          "Long-lasting",
          "Moisturizing",
          "Versatile shades",
          "High pigmentation",
        ],
        application: "Apply directly to lips or use lip brush for precision",
        isOnSale: true,
        isFeatured: false,
        stock: 35,
        rating: 4.6,
        reviews: 112,
        tags: ["lipstick", "nude", "set", "long-lasting"],
        weight: "10.5g",
        dimensions: "15cm x 8cm x 3cm",
        expiryDate: "2026-04-20",
        images: [
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
        ],
        image:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
        sku: "GB-LS001",
      },
    ];

    // Create sample beauty services
    const services = [
      {
        name: "Signature Facial Treatment",
        description:
          "Deep cleansing facial with extraction, mask, and massage for glowing skin",
        category: "Facial Treatments",
        price: 25000,
        duration: 60,
        image:
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop",
        features: [
          "Deep cleansing",
          "Extraction",
          "Hydrating mask",
          "Facial massage",
          "Moisturizing",
        ],
        benefits: [
          "Clearer skin",
          "Reduced blackheads",
          "Improved texture",
          "Relaxation",
        ],
        isActive: true,
        isFeatured: true,
        tags: ["facial", "cleansing", "relaxation", "skincare"],
        requirements: "Clean face, No makeup, Arrive 10 minutes early",
        preparation: "Avoid exfoliating 24 hours before treatment",
        aftercare: "Avoid sun exposure and heavy makeup for 24 hours",
      },
      {
        name: "Hair Cut & Style",
        description:
          "Professional haircut with wash, cut, and styling for your perfect look",
        category: "Hair Styling",
        price: 15000,
        duration: 45,
        image:
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop",
        features: [
          "Hair wash",
          "Professional cut",
          "Blow dry",
          "Styling",
          "Hair care advice",
        ],
        benefits: [
          "Fresh look",
          "Healthy hair",
          "Professional styling",
          "Hair care tips",
        ],
        isActive: true,
        isFeatured: true,
        tags: ["haircut", "styling", "wash", "professional"],
        requirements: "Clean hair preferred, Bring inspiration photos",
        preparation: "Come with clean, dry hair if possible",
        aftercare: "Use recommended hair products for best results",
      },
      {
        name: "Manicure & Pedicure",
        description:
          "Complete nail care with cuticle treatment, shaping, and polish",
        category: "Nail Services",
        price: 18000,
        duration: 90,
        image:
          "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
        features: [
          "Cuticle care",
          "Nail shaping",
          "Hand/foot massage",
          "Polish application",
          "Moisturizing",
        ],
        benefits: [
          "Beautiful nails",
          "Relaxation",
          "Soft skin",
          "Professional finish",
        ],
        isActive: true,
        isFeatured: false,
        tags: ["manicure", "pedicure", "nails", "relaxation"],
        requirements: "Remove existing polish, Clean hands and feet",
        preparation: "Remove all nail polish before appointment",
        aftercare: "Avoid water for 2 hours, use cuticle oil daily",
      },
      {
        name: "Bridal Makeup",
        description:
          "Complete bridal makeup with trial session and touch-up kit",
        category: "Makeup Services",
        price: 45000,
        duration: 120,
        image:
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
        features: [
          "Consultation",
          "Trial session",
          "Wedding day makeup",
          "Touch-up kit",
          "Long-lasting formula",
        ],
        benefits: [
          "Perfect bridal look",
          "Photography ready",
          "Long-lasting",
          "Professional finish",
        ],
        isActive: true,
        isFeatured: true,
        tags: ["bridal", "makeup", "wedding", "photography"],
        requirements:
          "Skin consultation, Inspiration photos, Dress color reference",
        preparation: "Good skincare routine, avoid new products 1 week before",
        aftercare: "Gentle makeup removal, moisturize well",
      },
      {
        name: "Deep Tissue Massage",
        description:
          "Therapeutic massage to relieve muscle tension and promote relaxation",
        category: "Massage Therapy",
        price: 35000,
        duration: 60,
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop",
        features: [
          "Deep tissue techniques",
          "Muscle tension relief",
          "Relaxation",
          "Aromatherapy",
          "Hot stones",
        ],
        benefits: [
          "Pain relief",
          "Stress reduction",
          "Improved circulation",
          "Better sleep",
        ],
        isActive: true,
        isFeatured: false,
        tags: ["massage", "therapy", "relaxation", "pain-relief"],
        requirements: "Health consultation, Comfortable clothing",
        preparation: "Stay hydrated, avoid heavy meals 2 hours before",
        aftercare: "Drink plenty of water, rest and relax",
      },
      {
        name: "Eyebrow Shaping & Tinting",
        description:
          "Professional eyebrow shaping with tinting for perfect brows",
        category: "Skin Care",
        price: 12000,
        duration: 30,
        image:
          "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop",
        features: [
          "Brow consultation",
          "Shaping",
          "Tinting",
          "Trimming",
          "Aftercare advice",
        ],
        benefits: [
          "Perfect brow shape",
          "Enhanced features",
          "Long-lasting color",
          "Professional finish",
        ],
        isActive: true,
        isFeatured: false,
        tags: ["eyebrows", "shaping", "tinting", "beauty"],
        requirements: "No eye makeup, Clean face",
        preparation: "Remove all eye makeup before appointment",
        aftercare: "Avoid water and makeup for 24 hours",
      },
    ];

    // Save products
    for (const productData of products) {
      const product = new GlowProduct(productData);
      await product.save();
    }

    // Save services
    for (const serviceData of services) {
      const service = new GlowService(serviceData);
      await service.save();
    }

    console.log("✅ Sample cosmetics products created");
    console.log("✅ Sample beauty services created");
    console.log("🌸 Database seeded successfully!");
    console.log("📧 Admin login: admin@glowbeauty.com / admin123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

seedData();
