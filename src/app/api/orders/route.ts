import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

// GET /api/orders - Get all orders with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const invoiceNumber = searchParams.get("invoiceNumber") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    if (search) {
      filter.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "customer.firstName": { $regex: search, $options: "i" } },
        { "customer.lastName": { $regex: search, $options: "i" } },
        { "customer.email": { $regex: search, $options: "i" } },
        { invoiceNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (invoiceNumber) {
      filter.invoiceNumber = invoiceNumber;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Get orders with pagination
    const orders = await Order.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("items.productId", "name brand model")
      .lean();

    // Get total count for pagination
    const total = await Order.countDocuments(filter);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const orderData = await request.json();

    // Generate order number if not provided
    if (!orderData.orderNumber) {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      orderData.orderNumber = `ORD-${year}${month}${day}-${randomNum}`;
    }

    // Generate invoice number if not provided
    if (!orderData.invoiceNumber) {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const randomNum = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
      orderData.invoiceNumber = `INV-${year}${month}-${randomNum}`;
    }

    const order = new Order(orderData);
    await order.save();

    // Populate product details
    await order.populate("items.productId", "name brand model");

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);

    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Order with this number already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
