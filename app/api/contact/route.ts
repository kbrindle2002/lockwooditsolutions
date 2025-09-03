import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
if (!process.env.SENDGRID_API_KEY) {
  console.warn("⚠️ SENDGRID_API_KEY is missing. Emails will not be sent.");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    console.log("📩 Contact form received:", { name, email, phone, message });
    console.log(
      "🔑 SENDGRID_API_KEY exists:",
      !!process.env.SENDGRID_API_KEY
    );
    console.log("📤 Sending from:", process.env.NEXT_PUBLIC_CONTACT_FROM);
    console.log("📥 Sending to:", process.env.NEXT_PUBLIC_CONTACT_TO);

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Attempt to send the email
    await sgMail.send({
      to: process.env.NEXT_PUBLIC_CONTACT_TO as string,
      from: process.env.NEXT_PUBLIC_CONTACT_FROM as string,
      subject: `📩 New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });

    console.log("✅ Email successfully queued with SendGrid.");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ SendGrid error:", error?.response?.body || error.message);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
