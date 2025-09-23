import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

// Webinar access details
const ZOOM_LINK =
  "https://us02web.zoom.us/rec/share/EJH5F0jb7fwosjBlLJ3xsMk3JLbJOyeuFBqAWYZMGbflFS5Wz5f7kL-_I8wX1TlQ.JxU9pIu-aVNiO6SV"
const ZOOM_PASSCODE = "cX=N5Qa5"

export async function POST(request: NextRequest) {
  try {
    const { email, customerName, orderId } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    console.log("📧 Sending webinar access email to:", email)

    // Send webinar access email
    const emailResult = await resend.emails.send({
      from: "Wind of God Publishing <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Your Ready. Set. Write!!! Webinar Access - Wind of God Publishing",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎉 Ready. Set. Write!!! Access</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Your webinar access details</p>
          </div>

          <!-- Main Content -->
          <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Dear ${customerName || "Valued Customer"},</p>
            
            <p style="color: #6b7280; line-height: 1.6; margin-bottom: 30px;">
              Here are your access details for the Ready. Set. Write!!! webinar recording. 
              You can watch this content anytime - it never expires!
            </p>

            <!-- Access Details Box -->
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 30px; margin: 30px 0;">
              <h2 style="color: #1e40af; margin: 0 0 20px 0; font-size: 22px; text-align: center;">
                🔗 Your Webinar Access Details
              </h2>
              
              <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">📹 Zoom Recording Link:</h3>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                  <a href="${ZOOM_LINK}" style="color: #1e40af; text-decoration: none; word-break: break-all; font-family: monospace; font-size: 14px;">
                    ${ZOOM_LINK}
                  </a>
                </div>
              </div>

              <div style="background: white; border-radius: 8px; padding: 20px;">
                <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">🔐 Passcode:</h3>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981; text-align: center;">
                  <span style="font-family: monospace; font-size: 24px; font-weight: bold; color: #059669; letter-spacing: 2px;">
                    ${ZOOM_PASSCODE}
                  </span>
                </div>
              </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${ZOOM_LINK}" style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                🎥 Watch Webinar Now
              </a>
            </div>

            <!-- Important Notes -->
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 30px 0;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">⭐ Important Notes:</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li><strong>Save these details</strong> - You'll need both the link and passcode to access the webinar</li>
                <li><strong>No expiration</strong> - This recording is yours to keep and watch anytime</li>
                <li><strong>Need help?</strong> Contact our support team if you have any issues accessing the content</li>
                <li><strong>Share responsibly</strong> - This content is for your personal use only</li>
              </ul>
            </div>

            <p style="color: #6b7280; line-height: 1.6; margin-top: 30px;">
              We're excited to be part of your writing journey! If you have any questions or need assistance, 
              don't hesitate to reach out to our support team.
            </p>

            <p style="color: #374151; margin-top: 30px;">
              Blessings and happy writing!<br>
              <strong style="color: #1e40af;">The Wind of God Publishing Team</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Wind of God Publishing - Bringing Faith-Inspired Stories to Life
            </p>
            ${orderId ? `<p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">Order ID: ${orderId}</p>` : ""}
          </div>
        </div>
      `,
    })

    console.log("✅ Webinar access email sent successfully:", emailResult.data?.id)

    return NextResponse.json({
      success: true,
      message: "Webinar access details sent successfully!",
      emailId: emailResult.data?.id,
    })
  } catch (error) {
    console.error("❌ Error sending webinar access email:", error)
    return NextResponse.json(
      {
        error: "Failed to send email. Please try again or contact support.",
      },
      { status: 500 },
    )
  }
}
