import nodemailer from 'nodemailer';

// Configure email transporter
// Update these with your email service credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@apexrushkarts.com',
      to: options.to,
      subject: options.subject,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Plain text version
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Generate order notification email HTML
export function generateOrderEmailHTML(orderData: {
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  notes?: string;
}): string {
  const itemsHTML = orderData.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toLocaleString()}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order #${orderData.orderNumber}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">New Order Received</h1>
        <p style="margin: 10px 0 0 0;">Order #${orderData.orderNumber}</p>
      </div>
      
      <div style="background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <h2 style="color: #111827; margin-top: 0;">Customer Information</h2>
        <p><strong>Name:</strong> ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
        <p><strong>Email:</strong> ${orderData.customer.email}</p>
        <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
        <p><strong>Address:</strong> ${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zipCode}, ${orderData.customer.country}</p>
      </div>

      <div style="background-color: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <h2 style="color: #111827; margin-top: 0;">Order Items</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #e5e7eb;">Item</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div style="border-top: 2px solid #e5e7eb; padding-top: 15px; margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Subtotal:</span>
            <span>$${orderData.subtotal.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Tax:</span>
            <span>$${orderData.tax.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Shipping:</span>
            <span>$${orderData.shipping.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.2em; font-weight: bold; margin-top: 15px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
            <span>Total:</span>
            <span style="color: #dc2626;">$${orderData.total.toLocaleString()}</span>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
          <p style="margin: 0;"><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
          <p style="margin: 5px 0 0 0;"><em>Please contact the customer to proceed with payment.</em></p>
        </div>

        ${orderData.notes ? `
        <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 4px;">
          <p style="margin: 0;"><strong>Customer Notes:</strong></p>
          <p style="margin: 5px 0 0 0;">${orderData.notes}</p>
        </div>
        ` : ''}
      </div>

      <div style="background-color: #f9fafb; padding: 15px; text-align: center; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; margin-top: 20px;">
        <p style="margin: 0; color: #6b7280; font-size: 0.9em;">
          This is an automated notification from Apex Rush Karts
        </p>
      </div>
    </body>
    </html>
  `;
}

