import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GlowService from "@/models/Service";

// GET /api/services - Get all services with filtering, pagination, and sorting
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const isActive = searchParams.get("isActive");
    const isFeatured = searchParams.get("isFeatured");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { features: { $in: [new RegExp(search, "i")] } },
        { benefits: { $in: [new RegExp(search, "i")] } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (isActive !== null && isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    if (isFeatured !== null && isFeatured !== undefined) {
      filter.isFeatured = isFeatured === "true";
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Get services with pagination
    const services = await GlowService.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await GlowService.countDocuments(filter);

    return NextResponse.json({
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get services error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const serviceData = await request.json();

    // Validate required fields
    if (!serviceData.image) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      );
    }

    // If images array is provided and main image is not set, use first image
    if (
      serviceData.images &&
      serviceData.images.length > 0 &&
      !serviceData.image
    ) {
      serviceData.image = serviceData.images[0];
    }

    const service = new GlowService(serviceData);
    await service.save();

    return NextResponse.json(
      {
        success: true,
        service,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create service error:", error);

    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Service with this name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
