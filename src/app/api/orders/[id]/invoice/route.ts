import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import nodemailer from "nodemailer";

// Create transporter for sending emails with professional configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 3,
  rateLimit: 3,
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error(
      "Email configuration missing: EMAIL_USER or EMAIL_PASS not set"
    );
    return NextResponse.json(
      { error: "Email configuration error" },
      { status: 500 }
    );
  }

  try {
    await connectDB();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Generate invoice number if not exists
    if (!order.invoiceNumber) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      order.invoiceNumber = `INV-${year}${month}${day}-${randomNum}`;
      await order.save();
    }

    // Create invoice HTML
    const invoiceHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: #18181b; color: white; padding: 30px; text-align: center;">
          <div style="margin-bottom: 15px;">
            <img src="https://guitarstringsco.com/logo_gs.png" alt="Guitar & Strings Co" style="height: 60px; width: auto; max-width: 200px;">
          </div>
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Purchase Invoice</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Guitar Sales & Service</p>
        </div>

        <!-- Invoice Details -->
        <div style="padding: 30px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div>
              <h2 style="color: #18181b; margin: 0 0 10px 0;">Invoice Details</h2>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Invoice #:</strong> ${
                order.invoiceNumber
              }</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Date:</strong> ${new Date(
                order.createdAt
              ).toLocaleDateString()}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Order ID:</strong> ${
                order._id
              }</p>
            </div>
            <div style="text-align: right;">
              <h2 style="color: #18181b; margin: 0 0 10px 0;">Customer Information</h2>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Name:</strong> ${
                order.customer.firstName
              } ${order.customer.lastName}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Email:</strong> ${
                order.customer.email
              }</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Phone:</strong> ${
                order.customer.phone
              }</p>
            </div>
          </div>

          <!-- Shipping Address -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #374151; margin: 0 0 15px 0;">Shipping Address</h3>
            <p style="margin: 5px 0; color: #4b5563;">${
              order.customer.address
            }</p>
            <p style="margin: 5px 0; color: #4b5563;">${order.customer.city}, ${
      order.customer.state
    } ${order.customer.zipCode}</p>
            <p style="margin: 5px 0; color: #4b5563;">${
              order.customer.country
            }</p>
          </div>

          <!-- Order Items -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #374151; margin: 0 0 15px 0;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e4e4e7;">
              <thead>
                <tr style="background: #f9fafb;">
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e4e4e7; color: #374151;">Item</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 1px solid #e4e4e7; color: #374151;">Quantity</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e4e4e7; color: #374151;">Price</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e4e4e7; color: #374151;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items
                  .map(
                    (item: any) => `
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #e4e4e7; color: #4b5563;">
                      <div>
                        <strong>${item.name}</strong>
                      </div>
                    </td>
                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e4e4e7; color: #4b5563;">${
                      item.quantity
                    }</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e4e4e7; color: #4b5563;">$${item.price.toFixed(
                      2
                    )}</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e4e4e7; color: #4b5563;">$${(
                      item.price * item.quantity
                    ).toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <!-- Order Summary -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #4b5563;">Subtotal:</span>
              <span style="color: #4b5563;">$${order.subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #4b5563;">Tax:</span>
              <span style="color: #4b5563;">$${order.tax.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #4b5563;">Shipping:</span>
              <span style="color: #4b5563;">$${order.shipping.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 2px solid #e4e4e7; padding-top: 10px; margin-top: 10px;">
              <span style="color: #18181b; font-weight: bold; font-size: 18px;">Total:</span>
              <span style="color: #18181b; font-weight: bold; font-size: 18px;">$${order.total.toFixed(
                2
              )}</span>
            </div>
          </div>

          <!-- Payment Information -->
          <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px;">
            <h3 style="color: #0c4a6e; margin: 0 0 10px 0;">Payment Information</h3>
            <p style="margin: 5px 0; color: #0c4a6e;"><strong>Payment Method:</strong> ${
              order.paymentMethod
            }</p>
            <p style="margin: 5px 0; color: #0c4a6e;"><strong>Payment Status:</strong> ${
              order.paymentStatus
            }</p>
            <p style="margin: 5px 0; color: #0c4a6e;"><strong>Order Status:</strong> ${
              order.status
            }</p>
          </div>

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e4e4e7; text-align: center; color: #6b7280;">
            <p>Thank you for your purchase from Guitar & Strings Co!</p>
            <p>If you have any questions about your order, please contact us at contact@guitarstringsco.com</p>
            <div style="margin: 20px 0;">
              <img src="https://guitarstringsco.com/logo_gs.png" alt="Guitar & Strings Co" style="height: 40px; width: auto; max-width: 150px; opacity: 0.7;">
            </div>
            <p style="margin-top: 20px; font-size: 12px;">
               Email: contact@guitarstringsco.com
            </p>
          </div>
        </div>
      </div>
    `;

    // Send invoice email to customer
    const mailOptions = {
      from: `"Guitar & Strings Co" <${process.env.CONTACT_EMAIL}>`,
      to: order.customer.email,
      subject: `Purchase Invoice - ${order.invoiceNumber} - Guitar & Strings Co`,
      html: invoiceHTML,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
        "X-Mailer": "Guitar & Strings Co Invoice System",
        "List-Unsubscribe": `<mailto:${process.env.EMAIL_USER}?subject=unsubscribe>`,
        Precedence: "bulk",
      },
      replyTo: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
    };

    console.log("Sending invoice email to customer:", order.customer.email);
    await transporter.sendMail(mailOptions);
    console.log("Invoice email sent successfully to customer");

    // Send notification to admin
    const adminMailOptions = {
      from: `"Guitar & Strings Co System" <${order.customer.email}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Order Invoice Sent - ${order.invoiceNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #18181b; border-bottom: 2px solid #e4e4e7; padding-bottom: 10px;">
            Invoice Sent Successfully
          </h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Order Details</h3>
            <p><strong>Invoice #:</strong> ${order.invoiceNumber}</p>
            <p><strong>Customer:</strong> ${order.customer.firstName} ${
        order.customer.lastName
      } (${order.customer.email})</p>
            <p><strong>Total Amount:</strong> $${order.total.toFixed(2)}</p>
            <p><strong>Items:</strong> ${order.items.length} item(s)</p>
          </div>
          
          <p style="line-height: 1.6; color: #4b5563;">
            The purchase invoice has been sent to the customer successfully.
          </p>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e4e4e7; color: #6b7280; font-size: 14px;">
            <p>Order ID: ${order._id}</p>
            <p>Sent on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    console.log(
      "Sending admin notification to:",
      process.env.ADMIN_EMAIL || process.env.EMAIL_USER
    );
    await transporter.sendMail(adminMailOptions);
    console.log("Admin notification sent successfully");

    return NextResponse.json(
      {
        success: true,
        message: "Invoice sent successfully",
        invoiceNumber: order.invoiceNumber,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send invoice error:", error);
    return NextResponse.json(
      { error: "Failed to send invoice. Please try again." },
      { status: 500 }
    );
  }
}
