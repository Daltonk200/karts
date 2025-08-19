import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET /api/products/brands - Get all available brands from products
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get all unique brands from products
    const brands = await Product.distinct("brand");

    // Filter out empty or null brands
    const validBrands = brands
      .filter((brand) => brand && brand.trim() !== "")
      .map((brand) => brand.trim());

    // Normalize brand names to remove common suffixes and variations
    const normalizeBrand = (brand: string) => {
      const lowerBrand = brand.toLowerCase();

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

    // Normalize and deduplicate brands
    const normalizedBrands = new Set<string>();
    validBrands.forEach((brand) => {
      const normalized = normalizeBrand(brand);
      if (normalized) {
        normalizedBrands.add(normalized);
      }
    });

    // Convert to array and sort alphabetically
    const uniqueBrands = Array.from(normalizedBrands).sort();

    return NextResponse.json({
      brands: uniqueBrands,
    });
  } catch (error) {
    console.error("Get brands error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
