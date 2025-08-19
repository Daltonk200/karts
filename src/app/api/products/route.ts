import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

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
    const featured = searchParams.get("featured") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      // Normalize brand names to remove common suffixes and variations
      const normalizeBrand = (brandName: string) => {
        const lowerBrand = brandName.toLowerCase();

        // Remove common suffixes
        const suffixes = [
          " guitars",
          " guitar",
          " instruments",
          " instrument",
          " music",
          " co",
          " company",
          " corp",
          " corporation",
        ];
        let normalized = lowerBrand;

        for (const suffix of suffixes) {
          if (normalized.endsWith(suffix)) {
            normalized = normalized.slice(0, -suffix.length);
            break;
          }
        }

        // Capitalize first letter of each word
        return normalized
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };

      const normalizedSelectedBrand = normalizeBrand(brand);

      // Create regex pattern to match the normalized brand and its variations
      const brandPattern = new RegExp(
        `^${normalizedSelectedBrand}(\\s+(guitars?|instruments?|music|co|company|corp|corporation))?$`,
        "i"
      );

      filter.brand = brandPattern;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Get products with pagination
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

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
      const modelCode = productData.model.substring(0, 3).toUpperCase();
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      productData.sku = `${brandCode}${modelCode}${randomNum}`;
    }

    const product = new Product(productData);
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
