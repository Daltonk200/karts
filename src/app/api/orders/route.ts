import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { authenticateToken } from '@/lib/auth';
import { generateOrderNumber, generateInvoiceNumber } from '@/lib/orderUtils';
import { sendEmail, generateOrderEmailHTML } from '@/lib/email';

// GET /api/orders - List orders (protected, admin only)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Authenticate user
    try {
      await authenticateToken(request);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { invoiceNumber: { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } },
        { 'customer.firstName': { $regex: search, $options: 'i' } },
        { 'customer.lastName': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(query),
    ]);

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
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create order (public, sends email notification)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      customer,
      items,
      subtotal,
      tax,
      shipping,
      paymentMethod,
      notes,
    } = body;

    // Validate required fields
    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Customer information and items are required' },
        { status: 400 }
      );
    }

    // Generate order and invoice numbers
    const orderNumber = await generateOrderNumber();
    const invoiceNumber = await generateInvoiceNumber();

    // Create order
    const order = new Order({
      orderNumber,
      invoiceNumber,
      customer,
      items,
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      paymentMethod: paymentMethod || 'invoice',
      notes,
      status: 'pending',
    });

    await order.save();

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || '';
    
    if (adminEmail) {
      try {
        const emailHTML = generateOrderEmailHTML({
          orderNumber,
          customer,
          items,
          subtotal,
          tax,
          shipping,
          total: subtotal + tax + shipping,
          paymentMethod: paymentMethod || 'invoice',
          notes,
        });

        await sendEmail({
          to: adminEmail,
          subject: `New Order #${orderNumber} - Apex Rush Karts`,
          html: emailHTML,
        });
      } catch (emailError) {
        console.error('Error sending order email:', emailError);
        // Don't fail the order creation if email fails
      }
    }

    return NextResponse.json(
      {
        message: 'Order created successfully',
        order: {
          _id: order._id.toString(),
          orderNumber: order.orderNumber,
          invoiceNumber: order.invoiceNumber,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    
    // Handle duplicate order number error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Order number conflict. Please try again.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

