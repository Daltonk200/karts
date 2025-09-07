import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GlowBooking from "@/models/Booking";
import GlowService from "@/models/Service";

// GET /api/bookings - Get all bookings with filtering, pagination, and sorting
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const dateFrom = searchParams.get("dateFrom") || "";
    const dateTo = searchParams.get("dateTo") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    if (search) {
      filter.$or = [
        { bookingNumber: { $regex: search, $options: "i" } },
        { "customer.firstName": { $regex: search, $options: "i" } },
        { "customer.lastName": { $regex: search, $options: "i" } },
        { "customer.email": { $regex: search, $options: "i" } },
        { "service.serviceName": { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (dateFrom || dateTo) {
      const dateFilter: any = {};

      if (dateFrom) {
        const startDate = new Date(dateFrom);
        dateFilter.$gte = startDate;
      }

      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setDate(endDate.getDate() + 1); // Include the entire end date
        dateFilter.$lt = endDate;
      }

      filter["appointment.date"] = dateFilter;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Get bookings with pagination
    const bookings = await GlowBooking.find(filter)
      .populate("service.serviceId", "name category")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await GlowBooking.countDocuments(filter);

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const bookingData = await request.json();

    // Get service details
    const serviceId = bookingData.service?.serviceId || bookingData.serviceId;
    const service = await GlowService.findById(serviceId);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Generate booking number if not provided
    if (!bookingData.bookingNumber) {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      bookingData.bookingNumber = `BK-${year}${month}${day}-${randomNum}`;
    }

    // Set service details
    bookingData.service = {
      serviceId: service._id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDuration: service.duration,
    };

    // Set total amount
    bookingData.totalAmount = service.price;

    // Set appointment duration
    bookingData.appointment.duration = service.duration;

    const booking = new GlowBooking(bookingData);
    await booking.save();

    // Populate service details
    await booking.populate("service.serviceId", "name category");

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);

    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Booking with this number already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
