import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // Only support isFeatured and isActive for now
  const isFeatured = searchParams.get("isFeatured") === "true";
  const isActive = searchParams.get("isActive") !== "false"; // default true
  const limit = Number(searchParams.get("limit")) || 3;

  // Dummy featured services
  const services = [
    {
      _id: "1",
      name: "Kart Maintenance",
      description: "Expert kart maintenance to keep you on the track.",
      price: 15000,
      isFeatured: true,
      isActive: true,
      image: "/banner_image.jpg",
    },
    {
      _id: "2",
      name: "Performance Tuning",
      description: "Get the most out of your kart with our performance tuning.",
      price: 30000,
      isFeatured: true,
      isActive: true,
      image: "/banner_image.jpg",
    },
    {
      _id: "3",
      name: "Custom Paint Job",
      description: "Stand out with a custom paint job for your kart.",
      price: 10000,
      isFeatured: true,
      isActive: true,
      image: "/banner_image.jpg",
    }
    // ...more if needed...
  ];

  // Filter by featured/active and limit results
  const filtered = services.filter(s => (!isFeatured || s.isFeatured) && (isActive ? s.isActive : true)).slice(0, limit);

  return NextResponse.json({ services: filtered });
}

