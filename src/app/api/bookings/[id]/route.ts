import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GlowBooking from "@/models/Booking";

// GET /api/bookings/[id] - Get a single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const booking = await Booking.findById(id).populate(
      "service.serviceId",
      "name category description"
    );

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/bookings/[id] - Update a booking
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const updateData = await request.json();

    const booking = await GlowBooking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("service.serviceId", "name category");

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Delete a booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const booking = await GlowBooking.findById(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Only allow deletion of pending or cancelled bookings
    if (!["pending", "cancelled"].includes(booking.status)) {
      return NextResponse.json(
        { error: "Cannot delete confirmed or completed bookings" },
        { status: 400 }
      );
    }

    // Delete the booking
    await GlowBooking.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
