import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GlowProduct from "@/models/Product";

// GET /api/products - Get all products with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";
    const skinType = searchParams.get("skinType") || "";
    const featured = searchParams.get("featured") || "";
    const onSale = searchParams.get("onSale") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { ingredients: { $in: [new RegExp(search, "i")] } },
        { benefits: { $in: [new RegExp(search, "i")] } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }

    if (skinType) {
      filter.skinType = skinType;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    if (onSale === "true") {
      filter.isOnSale = true;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter.price.$lte = parseFloat(maxPrice);
      }
    }

    // Build sort object
    const sort: any = {};
    switch (sortBy) {
      case "price-low":
        sort.price = 1;
        break;
      case "price-high":
        sort.price = -1;
        break;
      case "rating":
        sort.rating = -1;
        break;
      case "name":
        sort.name = 1;
        break;
      case "featured":
        sort.isFeatured = -1;
        sort.createdAt = -1;
        break;
      default:
        sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Get products with pagination
    const products = await GlowProduct.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await GlowProduct.countDocuments(filter);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const productData = await request.json();

    // Generate SKU if not provided
    if (!productData.sku) {
      const brandCode = productData.brand.substring(0, 3).toUpperCase();
      const nameCode = productData.name.substring(0, 3).toUpperCase();
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      productData.sku = `${brandCode}${nameCode}${randomNum}`;
    }

    // Set main image as first image in the array
    if (productData.images && productData.images.length > 0) {
      productData.image = productData.images[0];
    }

    // Calculate if product is on sale
    if (
      productData.originalPrice &&
      productData.originalPrice > productData.price
    ) {
      productData.isOnSale = true;
    }

    const product = new GlowProduct(productData);
    await product.save();

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);

    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Product with this SKU already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
