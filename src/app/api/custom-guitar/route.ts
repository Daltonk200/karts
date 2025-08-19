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
    const formData = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "guitarType",
      "bodyStyle",
      "woodType",
      "budget",
      "timeline",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create HTML email content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: #18181b; color: white; padding: 30px; text-align: center;">
          <div style="margin-bottom: 15px;">
            <img src="https://guitarstringsco.com/logo_gs.png" alt="Guitar & Strings Co" style="height: 60px; width: auto; max-width: 200px;">
          </div>
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Custom Guitar Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Guitar Customization</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <!-- Customer Information -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #18181b; margin: 0 0 15px 0;">Customer Information</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Name:</strong> ${
                  formData.firstName
                } ${formData.lastName}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> ${
                  formData.email
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Phone:</strong> ${
                  formData.phone
                }</p>
              </div>
              <div>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Budget:</strong> ${
                  formData.budget
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Timeline:</strong> ${
                  formData.timeline
                }</p>
              </div>
            </div>
          </div>

          <!-- Basic Specifications -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #18181b; margin: 0 0 15px 0;">Basic Guitar Specifications</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Guitar Type:</strong> ${
                  formData.guitarType
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Body Style:</strong> ${
                  formData.bodyStyle
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Wood Type:</strong> ${
                  formData.woodType
                }</p>
              </div>
              <div>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Neck Wood:</strong> ${
                  formData.neckWood || "Not specified"
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Fretboard Wood:</strong> ${
                  formData.fretboardWood || "Not specified"
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Pickups:</strong> ${
                  formData.pickups || "Not specified"
                }</p>
              </div>
            </div>
          </div>

          <!-- Detailed Specifications -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #18181b; margin: 0 0 15px 0;">Detailed Specifications</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Bridge:</strong> ${
                  formData.bridge || "Not specified"
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Color:</strong> ${
                  formData.color || "Not specified"
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Finish:</strong> ${
                  formData.finish || "Not specified"
                }</p>
              </div>
              <div>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Scale Length:</strong> ${
                  formData.scaleLength || "Not specified"
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Nut Width:</strong> ${
                  formData.nutWidth || "Not specified"
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Body Depth:</strong> ${
                  formData.bodyDepth || "Not specified"
                }</p>
              </div>
            </div>
          </div>

          <!-- Preferences -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #18181b; margin: 0 0 15px 0;">Playing Preferences</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Playing Style:</strong> ${
                  formData.playingStyle || "Not specified"
                }</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Tone Preference:</strong> ${
                  formData.tonePreference || "Not specified"
                }</p>
              </div>
              <div>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Aesthetic Preference:</strong> ${
                  formData.aestheticPreference || "Not specified"
                }</p>
              </div>
            </div>
          </div>

          <!-- Special Requirements -->
          ${
            formData.specialRequirements
              ? `
          <div style="background: #f0f9ff; padding: 20px; border: 1px solid #0ea5e9; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #0c4a6e; margin: 0 0 15px 0;">Special Requirements</h2>
            <p style="margin: 0; color: #0c4a6e; line-height: 1.6;">${formData.specialRequirements}</p>
          </div>
          `
              : ""
          }

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e4e4e7; text-align: center; color: #6b7280;">
            <p>This custom guitar request was submitted from the Guitar & Strings Co website.</p>
            <div style="margin: 20px 0;">
              <img src="https://guitarstringsco.com/logo_gs.png" alt="Guitar & Strings Co" style="height: 40px; width: auto; max-width: 150px; opacity: 0.7;">
            </div>
            <p style="margin-top: 20px; font-size: 12px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to admin
    const adminMailOptions = {
      from: `"Guitar & Strings Co Custom Guitar Request" ${formData.email}`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Custom Guitar Request - ${formData.firstName} ${formData.lastName}`,
      html: emailHTML,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
        "X-Mailer": "Guitar & Strings Co Custom Guitar System",
      },
    };

    console.log(
      "Sending custom guitar request to admin:",
      process.env.CONTACT_EMAIL || process.env.EMAIL_USER
    );
    await transporter.sendMail(adminMailOptions);
    console.log("Custom guitar request sent successfully to admin");

    // Send confirmation email to customer
    const customerMailOptions = {
      from: `"Guitar & Strings Co" <${process.env.CONTACT_EMAIL}>`,
      to: formData.email,
      subject: "Custom Guitar Request Received - Guitar & Strings Co",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://guitarstringsco.com/logo_gs.png" alt="Guitar & Strings Co" style="height: 50px; width: auto; max-width: 180px;">
          </div>
          <h2 style="color: #18181b; border-bottom: 2px solid #e4e4e7; padding-bottom: 10px;">
            Custom Guitar Request Received
          </h2>
          
          <p style="line-height: 1.6; color: #4b5563;">
            Dear ${formData.firstName} ${formData.lastName},
          </p>
          
          <p style="line-height: 1.6; color: #4b5563;">
            Thank you for submitting your custom guitar request to Guitar & Strings Co. We have received your specifications and our team will review them carefully.
          </p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Request Summary</h3>
            <p><strong>Guitar Type:</strong> ${formData.guitarType}</p>
            <p><strong>Body Style:</strong> ${formData.bodyStyle}</p>
            <p><strong>Budget Range:</strong> ${formData.budget}</p>
            <p><strong>Timeline:</strong> ${formData.timeline}</p>
          </div>
          
          <p style="line-height: 1.6; color: #4b5563;">
            We will contact you within 24 hours to discuss your custom guitar project in detail and provide you with a personalized quote.
          </p>
          
          <p style="line-height: 1.6; color: #4b5563;">
            If you have any immediate questions, please don't hesitate to contact us at ${
              process.env.CONTACT_EMAIL || process.env.EMAIL_USER
            }.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e4e4e7; color: #6b7280; font-size: 14px;">
            <p>Best regards,</p>
            <p>The Guitar & Strings Co Team</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
        "X-Mailer": "Guitar & Strings Co Custom Guitar System",
      },
    };

    console.log("Sending confirmation email to customer:", formData.email);
    await transporter.sendMail(customerMailOptions);
    console.log("Confirmation email sent successfully to customer");

    return NextResponse.json(
      {
        success: true,
        message: "Custom guitar request submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Custom guitar request error:", error);
    return NextResponse.json(
      { error: "Failed to submit custom guitar request. Please try again." },
      { status: 500 }
    );
  }
}
