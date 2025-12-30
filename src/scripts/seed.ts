import dotenv from "dotenv";
import connectDB from "../lib/mongodb";
import ApexProduct from "../models/Product";
import ApexService from "../models/Service";
import ApexUser from "../models/User";

// Load environment variables from .env file
dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await ApexProduct.deleteMany({});
    await ApexService.deleteMany({});
    await ApexUser.deleteMany({});

    // Create admin user
    const adminUser = new ApexUser({
      username: "admin",
      email: "admin@apexkarts.com",
      password: "admin123",
      role: "admin",
    });
    await adminUser.save();
    console.log("✅ Admin user created");

    // Create sample karts products
    const products = [
      {
        name: "Apex Pro Racing Kart",
        description:
          "Championship-winning professional racing kart chassis with aerodynamic improvements and lightweight frame.",
        price: 4500000,
        originalPrice: 5000000,
        brand: "Apex Rush",
        category: "Racing Karts",
        kartType: "Professional",
        size: "Adult",
        benefits: [
          "Lightweight Chromoly chassis",
          "High-performance hydraulic brakes",
          "Aerodynamic bodywork",
          "Adjustable pedal position",
        ],
        ingredients: [
          "Chromoly Steel",
          "Aluminum",
          "Carbon Fiber",
          "Rubber",
        ],
        application: "Professional racing circuits only",
        isOnSale: true,
        isFeatured: true,
        stock: 5,
        rating: 4.9,
        reviews: 24,
        tags: ["racing", "pro", "high-performance", "chassis"],
        weight: "75kg",
        dimensions: "200cm x 140cm x 60cm",
        images: [
          "https://images.unsplash.com/photo-1596700815136-1594916258cc?w=800&q=80",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        ],
        image:
          "https://images.unsplash.com/photo-1596700815136-1594916258cc?w=800&q=80",
        sku: "APK-PRO-001",
      },
      {
        name: "Thunder 250cc Racing Kart",
        description:
          "Powerful 250cc 4-stroke racing kart designed for endurance and speed. Perfect for intermediate racers.",
        price: 3800000,
        brand: "Thunder Karts",
        category: "Racing Karts",
        kartType: "Intermediate",
        size: "Adult",
        benefits: [
          "250cc 4-stroke engine",
          "Reliable performance",
          "Durable construction",
          "Low maintenance",
        ],
        ingredients: [
          "Steel",
          "Plastic",
          "Aluminum",
        ],
        application: "Club racing and practice sessions",
        isOnSale: false,
        isFeatured: true,
        stock: 8,
        rating: 4.7,
        reviews: 18,
        tags: ["250cc", "endurance", "racing", "intermediate"],
        weight: "85kg",
        dimensions: "190cm x 135cm x 65cm",
        images: [
          "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
          "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
        ],
        image:
          "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
        sku: "TH-250-001",
      },
      {
        name: "Velocity Electric Kart",
        description:
          "Eco-friendly high-torque electric kart with instant acceleration. Quiet but deadly fast.",
        price: 5200000,
        originalPrice: 5500000,
        brand: "Volt Racing",
        category: "Electric Karts",
        kartType: "Eco-Friendly",
        size: "Adult",
        benefits: [
          "Instant torque",
          "Zero emissions",
          "Low noise",
          "Reverse gear",
        ],
        ingredients: [
          "Lithium Battery",
          "Electric Motor",
          "Aluminum Chassis",
        ],
        application: "Indoor and outdoor tracks",
        isOnSale: true,
        isFeatured: true,
        stock: 3,
        rating: 4.8,
        reviews: 32,
        tags: ["electric", "eco", "fast", "innovative"],
        weight: "95kg",
        dimensions: "195cm x 138cm x 62cm",
        images: [
          "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        ],
        image:
          "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
        sku: "VR-ELE-001",
      },
      {
        name: "Junior Racer Kart",
        description:
          "Safe and reliable kart for young racers starting their journey. Adjustable speed limiter included.",
        price: 2500000,
        brand: "Apex Rush",
        category: "Recreational Karts",
        kartType: "Youth",
        size: "Junior",
        benefits: [
          "Adjustable pedals and seat",
          "Speed limiter",
          "Roll bar protection",
          "Soft compound tires",
        ],
        ingredients: [
          "Steel Tube Frame",
          "Plastic Bodywork",
        ],
        application: "Training and youth leagues",
        isOnSale: false,
        isFeatured: true,
        stock: 12,
        rating: 4.6,
        reviews: 45,
        tags: ["junior", "kids", "safe", "starter"],
        weight: "60kg",
        dimensions: "160cm x 110cm x 50cm",
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        ],
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        sku: "APK-JR-001",
      },
      {
        name: "Pro Racing Helmet",
        description:
          "FIA approved racing helmet with advanced ventilation and lightweight carbon composite shell.",
        price: 180000,
        brand: "Apex Rush",
        category: "Racing Gear",
        kartType: "Professional",
        size: "M-XL",
        benefits: [
          "Carbon composite shell",
          "Fire resistant lining",
          "Advanced airflow system",
          "Anti-fog visor",
        ],
        ingredients: [
          "Carbon Fiber",
          "Nomex",
          "Polycarbonate",
        ],
        application: "Head protection for racing",
        isOnSale: false,
        isFeatured: true,
        stock: 25,
        rating: 4.9,
        reviews: 110,
        tags: ["helmet", "safety", "carbon", "gear"],
        weight: "1.2kg",
        dimensions: "30cm x 30cm x 30cm",
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        ],
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        sku: "GR-HLM-001",
      },
      {
        name: "Racing Suit Pro Series",
        description:
          "Professional karting suit offering abrasion resistance and comfort. CIK-FIA Level 2 approved.",
        price: 280000,
        originalPrice: 320000,
        brand: "Apex Rush",
        category: "Racing Gear",
        kartType: "Professional",
        size: "S-XXL",
        benefits: [
          "Abrasion resistant",
          "Breathable panels",
          "Ergonomic fit",
          "Lightweight",
        ],
        ingredients: [
          "Cordura",
          "Cotton",
          "Polyester",
        ],
        application: "Body protection for racing",
        isOnSale: true,
        isFeatured: true,
        stock: 15,
        rating: 4.8,
        reviews: 65,
        tags: ["suit", "racing", "gear", "protection"],
        weight: "1.5kg",
        dimensions: "50cm x 40cm x 5cm",
        images: [
          "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
        ],
        image:
          "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
        sku: "GR-SUIT-001",
      },
      {
        name: "Performance Kart Tires (Set)",
        description:
          "Set of 4 high-grip slick tires for dry weather racing conditions. Soft compound for maximum traction.",
        price: 120000,
        brand: "GripMaster",
        category: "Parts & Accessories",
        kartType: "Professional",
        size: "Standard",
        benefits: [
          "High grip",
          "Consistent performance",
          "Durable sidewall",
        ],
        ingredients: [
          "Rubber compound",
          "Nylon",
        ],
        application: "Racing wheels",
        isOnSale: false,
        isFeatured: false,
        stock: 50,
        rating: 4.7,
        reviews: 89,
        tags: ["tires", "parts", "grip", "racing"],
        weight: "10kg",
        dimensions: "50cm x 50cm x 60cm",
        images: [
          "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
        ],
        image:
          "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
        sku: "PT-TIRE-001",
      },
      {
        name: "Family Fun Kart",
        description:
          "Two-seater go-kart designed for family fun. Take your child or partner along for the ride.",
        price: 2200000,
        brand: "Apex Rush",
        category: "Recreational Karts",
        kartType: "Family",
        size: "Adult + Child",
        benefits: [
          "Dual seat",
          "Passenger steering lock",
          "High safety rails",
          "Easy to drive",
        ],
        ingredients: [
          "Steel",
          "Fiberglass",
        ],
        application: "Recreational use",
        isOnSale: false,
        isFeatured: true,
        stock: 4,
        rating: 4.5,
        reviews: 12,
        tags: ["family", "two-seater", "fun", "recreational"],
        weight: "110kg",
        dimensions: "210cm x 140cm x 60cm",
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        ],
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        sku: "APK-FAM-001",
      },
    ];

    // Create sample kart services
    const services = [
      {
        name: "Full Maintenance Package",
        description:
          "Complete check-up and maintenance for your go-kart, including engine, chassis, and brakes.",
        category: "Maintenance",
        price: 50000,
        duration: 120,
        image:
          "https://images.unsplash.com/photo-1629814498709-66c5e6383617?w=800&q=80",
        features: [
          "Engine oil change",
          "Brake bleed/check",
          "Chain tensioning",
          "Alignment check",
          "Nut and bolt check",
        ],
        benefits: [
          "Improved reliability",
          "Safety assurance",
          "Extended lifespan",
        ],
        isActive: true,
        isFeatured: true,
        tags: ["maintenance", "service", "reliability"],
        requirements: "Bring kart to workshop",
        preparation: "Clean kart before arrival preferred",
        aftercare: "Test drive to confirm adjustments",
      },
      {
        name: "Engine Tuning & Optimization",
        description:
          "Professional dyno tuning to extract maximum power and efficiency from your racing engine.",
        category: "Tuning",
        price: 75000,
        duration: 180,
        image:
          "https://images.unsplash.com/photo-1596700815136-1594916258cc?w=800&q=80",
        features: [
          "Dyno testing",
          "Carburetor adjustment",
          "Ignition timing",
          "Exhaust optimization",
        ],
        benefits: [
          "More power",
          "Better response",
          "Competitive edge",
        ],
        isActive: true,
        isFeatured: true,
        tags: ["tuning", "performance", "race", "engine"],
        requirements: "Engine in good running condition",
        preparation: "Fresh fuel",
        aftercare: "Follow break-in procedure if new parts installed",
      },
      {
        name: "1-on-1 Coaching Session",
        description:
          "Personalized coaching session with a professional racer to improve your lap times and racecraft.",
        category: "Coaching",
        price: 40000,
        duration: 60,
        image:
          "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
        features: [
          "Track walk",
          "Lead-follow sessions",
          "Data analysis",
          "Video review",
          "Line correction",
        ],
        benefits: [
          "Faster lap times",
          "Better technique",
          "Increased confidence",
        ],
        isActive: true,
        isFeatured: true,
        tags: ["coaching", "learning", "speed", "driver-development"],
        requirements: "Own kart or rental",
        preparation: "Arrive 30 mins early",
        aftercare: "Review notes and practice",
      },
      {
        name: "Track Day Pass",
        description:
          "Full day access to our premium racing circuit for practice and testing.",
        category: "Track Days",
        price: 25000,
        duration: 480, // 8 hours
        image:
          "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
        features: [
          "Open pit lane",
          "Safety marshals",
          "Timing system access",
          "Paddock space",
        ],
        benefits: [
          "Unlimited laps",
          "Testing time",
          "Social atmosphere",
        ],
        isActive: true,
        isFeatured: false,
        tags: ["track-day", "practice", "circuit"],
        requirements: "Safety gear mandatory",
        preparation: "Check kart safety",
        aftercare: "Clean pit area",
      },
      {
        name: "Kart Storage (Monthly)",
        description:
          "Secure, climate-controlled storage for your go-kart at the track facility.",
        category: "Storage",
        price: 15000,
        duration: 0,
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        features: [
          "24/7 Security",
          "Climate control",
          "Battery charging",
          "Easy track access",
        ],
        benefits: [
          "Convenience",
          "Protection",
          "Space saving at home",
        ],
        isActive: true,
        isFeatured: false,
        tags: ["storage", "garage", "convenience"],
        requirements: "Insurance recommended",
        preparation: "Clean kart before storage",
        aftercare: "none",
      },
      {
        name: "Custom Livery Design",
        description:
          "Unique custom sticker kit design and application for your kart and helmet.",
        category: "Customization",
        price: 60000,
        duration: 240, // variable
        image:
          "https://images.unsplash.com/photo-1596700815136-1594916258cc?w=800&q=80",
        features: [
          "Custom design consultation",
          "High-quality vinyl",
          "Professional application",
          "Unique style",
        ],
        benefits: [
          "Stand out on track",
          "Sponsor visibility",
          "Personalized look",
        ],
        isActive: true,
        isFeatured: false,
        tags: ["design", "stickers", "custom", "look"],
        requirements: "Clean bodywork",
        preparation: "Provide logos/ideas",
        aftercare: "Avoid pressure washing edges",
      },
    ];

    // Save products
    for (const productData of products) {
      const product = new ApexProduct(productData);
      await product.save();
    }

    // Save services
    for (const serviceData of services) {
      const service = new ApexService(serviceData);
      await service.save();
    }

    console.log("✅ Sample karts products created");
    console.log("✅ Sample kart services created");
    console.log("🏎️  Database seeded successfully!");
    console.log("📧 Admin login: admin@apexkarts.com / admin123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

seedData();
