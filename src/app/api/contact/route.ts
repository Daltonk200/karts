import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
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
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: `"Guitar & Strings Co Contact Form" from ${email}`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER, // Send to admin email
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://guitarstringsco.com/logo_gs.png" alt="Guitar & Strings Co" style="height: 50px; width: auto; max-width: 180px;">
          </div>
          <h2 style="color: #18181b; border-bottom: 2px solid #e4e4e7; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e4e4e7; color: #6b7280; font-size: 14px;">
            <p>This message was sent from the Guitar & Strings Co contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer
    const confirmationMailOptions = {
      from: `"Guitar & Strings Co" <${process.env.CONTACT_EMAIL}>`,
      to: email,
      subject: "Thank you for contacting Guitar & Strings Co",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://guitarstringsco.com/logo_gs.png" alt="Guitar & Strings Co" style="height: 50px; width: auto; max-width: 180px;">
          </div>
          <h2 style="color: #18181b; border-bottom: 2px solid #e4e4e7; padding-bottom: 10px;">
            Thank You for Contacting Us
          </h2>
          
          <p style="line-height: 1.6; color: #4b5563;">
            Dear ${name},
          </p>
          
          <p style="line-height: 1.6; color: #4b5563;">
            Thank you for reaching out to Guitar & Strings Co. We have received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Message Details</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          
          <p style="line-height: 1.6; color: #4b5563;">
            In the meantime, feel free to explore our collection of guitars .
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e4e4e7; color: #6b7280; font-size: 14px;">
            <p>Best regards,</p>
            <p>The Guitar & Strings Co Team</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
