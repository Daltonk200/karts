import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ApexProduct from "@/models/Product";
import ApexRating from "@/models/Rating";

// GET /api/products/[id]/ratings - Get all ratings for a product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const ratings = await ApexRating.find({ productId: id })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to 50 most recent ratings

    return NextResponse.json({ ratings });
  } catch (error) {
    console.error("Get ratings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/ratings - Add a new rating
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const { userId, userName, userEmail, rating, review } =
      await request.json();

    // Validate required fields
    if (!userId || !userName || !userEmail || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate rating value
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await ApexProduct.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if user already rated this product
    const existingRating = await ApexRating.findOne({
      productId: id,
      userId: userId,
    });

    if (existingRating) {
      return NextResponse.json(
        { error: "You have already rated this product" },
        { status: 400 }
      );
    }

    // Create new rating
    const newRating = new ApexRating({
      productId: id,
      userId,
      userName,
      userEmail,
      rating,
      review: review || "",
    });

    await newRating.save();

    // Update product's average rating and review count
    const allRatings = await ApexRating.find({ productId: id });
    const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / allRatings.length;

    await ApexProduct.findByIdAndUpdate(id, {
      rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      reviews: allRatings.length,
    });

    return NextResponse.json({
      success: true,
      rating: newRating,
      message: "Rating added successfully",
    });
  } catch (error) {
    console.error("Add rating error:", error);

    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "You have already rated this product" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
