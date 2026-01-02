import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Parse params (only isFeatured/limit supported for now)
  const { searchParams } = new URL(request.url);
  const isFeatured = searchParams.get("isFeatured") === "true";
  const limit = Number(searchParams.get("limit")) || 8;

  // Dummy products
  const products = [
    {
      _id: "1",
      name: "Apex Pro Racing Kart",
      price: 4500000,
      brand: "Apex Rush",
      isFeatured: true,
      isOnSale: true,
      category: "Racing Karts",
      image: "/banner_image.jpg",
      rating: 4.8,
      reviews: 24,
      inStock: 5,
      description: "Premium racing kart for professionals.",
      sku: "APX-001",
    },
    {
      _id: "2",
      name: "Thunder 250cc Racing Kart",
      price: 3800000,
      brand: "Apex Rush",
      isFeatured: true,
      isOnSale: false,
      category: "Racing Karts",
      image: "/banner_image.jpg",
      rating: 4.6,
      reviews: 18,
      inStock: 8,
      description: "High-speed kart for adrenaline lovers.",
      sku: "THND-250",
    },
    // ... add more as needed ...
  ];

  // Filter by isFeatured and limit results
  const filtered = isFeatured
    ? products.filter((p) => p.isFeatured).slice(0, limit)
    : products.slice(0, limit);

  return NextResponse.json({ products: filtered });
}

