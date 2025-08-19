import connectDB from "../lib/mongodb";
import Product from "../models/Product";
import User from "../models/User";

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    const adminUser = new User({
      username: "admin",
      email: "admin@guitarshop.com",
      password: "admin123",
      role: "admin",
    });
    await adminUser.save();
    console.log("✅ Admin user created");

    // Create sample products
    const products = [
      {
        name: "Fender Stratocaster",
        description: "Classic electric guitar with versatile tone",
        price: 1299.99,
        brand: "Fender",
        model: "Stratocaster",
        year: 2023,
        condition: "New",
        color: "Sunburst",
        body: "Alder",
        neck: "Maple",
        fretboard: "Rosewood",
        pickups: "3 Single-coil",
        bridge: "2-Point Tremolo",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        category: "Electric Guitars",
        isFeatured: true,
        stock: 5,
        sku: "FENSTR001",
      },
      {
        name: "Gibson Les Paul",
        description: "Legendary electric guitar with rich, warm tone",
        price: 2499.99,
        brand: "Gibson",
        model: "Les Paul Standard",
        year: 2023,
        condition: "New",
        color: "Cherry Sunburst",
        body: "Mahogany",
        neck: "Mahogany",
        fretboard: "Rosewood",
        pickups: "2 Humbuckers",
        bridge: "Tune-o-matic",
        image:
          "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=400&h=400&fit=crop",
        category: "Electric Guitars",
        isFeatured: true,
        stock: 3,
        sku: "GIBLES001",
      },
      {
        name: "Martin D-28",
        description: "Premium acoustic guitar with exceptional sound",
        price: 3299.99,
        brand: "Martin",
        model: "D-28",
        year: 2023,
        condition: "New",
        color: "Natural",
        body: "Rosewood",
        neck: "Mahogany",
        fretboard: "Ebony",
        pickups: "None (Acoustic)",
        bridge: "Rosewood",
        image:
          "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&h=400&fit=crop",
        category: "Acoustic Guitars",
        isFeatured: true,
        stock: 2,
        sku: "MARD28001",
      },
      {
        name: "Taylor 214ce",
        description: "Grand Auditorium acoustic-electric with rich tone",
        price: 899.99,
        brand: "Taylor",
        model: "214ce",
        year: 2023,
        condition: "New",
        color: "Natural",
        body: "Layered Rosewood",
        neck: "Sapele",
        fretboard: "Ebony",
        pickups: "ES2",
        bridge: "Rosewood",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        category: "Acoustic Guitars",
        isFeatured: false,
        stock: 8,
        sku: "TAY214001",
      },
      {
        name: "PRS Custom 24",
        description: "Versatile electric guitar with stunning craftsmanship",
        price: 3499.99,
        brand: "PRS",
        model: "Custom 24",
        year: 2023,
        condition: "New",
        color: "Trampas Green",
        body: "Mahogany",
        neck: "Mahogany",
        fretboard: "Rosewood",
        pickups: "PRS 85/15",
        bridge: "PRS Tremolo",
        image:
          "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=400&h=400&fit=crop",
        category: "Electric Guitars",
        isFeatured: true,
        stock: 1,
        sku: "PRSCUS001",
      },
      {
        name: "Ibanez RG450DX",
        description: "High-performance electric guitar for rock and metal",
        price: 299.99,
        brand: "Ibanez",
        model: "RG450DX",
        year: 2023,
        condition: "New",
        color: "Black",
        body: "Poplar",
        neck: "Maple",
        fretboard: "Jatoba",
        pickups: "Quantum",
        bridge: "Tremolo",
        image:
          "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&h=400&fit=crop",
        category: "Electric Guitars",
        isFeatured: false,
        stock: 12,
        sku: "IBARG001",
      },
      {
        name: "Fender Precision Bass",
        description: "Classic bass guitar with deep, punchy tone",
        price: 899.99,
        brand: "Fender",
        model: "Precision Bass",
        year: 2023,
        condition: "New",
        color: "Black",
        body: "Alder",
        neck: "Maple",
        fretboard: "Rosewood",
        pickups: "1 Split-coil",
        bridge: "4-Saddle Standard",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        category: "Bass Guitars",
        isFeatured: false,
        stock: 6,
        sku: "FENPRE001",
      },
      {
        name: "Yamaha C40",
        description: "Traditional classical guitar for classical music",
        price: 199.99,
        brand: "Yamaha",
        model: "C40",
        year: 2023,
        condition: "New",
        color: "Natural",
        body: "Spruce",
        neck: "Nato",
        fretboard: "Rosewood",
        pickups: "None (Classical)",
        bridge: "Rosewood",
        image:
          "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&h=400&fit=crop",
        category: "Acoustic Guitars",
        isFeatured: false,
        stock: 15,
        sku: "YAMC40001",
      },
    ];

    for (const productData of products) {
      const product = new Product(productData);
      await product.save();
    }

    console.log("✅ Sample products created");
    console.log("🎸 Database seeded successfully!");
    console.log("📧 Admin login: admin / admin123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

seedData();
