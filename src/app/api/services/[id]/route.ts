import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GlowService from "@/models/Service";

// GET /api/services/[id] - Get a single service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const service = await GlowService.findById(id);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Get service error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update a service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const updateData = await request.json();

    // Set main image as first image in the array
    if (updateData.images && updateData.images.length > 0) {
      updateData.image = updateData.images[0];
    }

    const service = await GlowService.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete a service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const service = await GlowService.findById(id);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Check if service has any bookings
    const Booking = (await import("@/models/Booking")).default;
    const hasBookings = await Booking.findOne({ "service.serviceId": id });

    if (hasBookings) {
      return NextResponse.json(
        { error: "Cannot delete service with existing bookings" },
        { status: 400 }
      );
    }

    // Delete the service
    await GlowService.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
