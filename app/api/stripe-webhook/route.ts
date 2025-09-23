import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"
import { getSubmissionBuffer, getSubmissionData, clearSubmissionData } from "../submit-manuscript/route"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const resend = new Resend(process.env.RESEND_API_KEY!)

// Webinar access details
const ZOOM_LINK =
  "https://us02web.zoom.us/rec/share/EJH5F0jb7fwosjBlLJ3xsMk3JLbJOyeuFBqAWYZMGbflFS5Wz5f7kL-_I8wX1TlQ.JxU9pIu-aVNiO6SV"
const ZOOM_PASSCODE = "cX=N5Qa5"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      console.error("❌ No Stripe signature found")
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("🎯 Webhook event received:", event.type)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Handle manuscript submissions
      const { submissionId, customerName, customerEmail, manuscriptTitle, serviceName } = session.metadata || {}

      if (submissionId) {
        console.log("💳 Payment completed for manuscript submission:", submissionId)

        // Retrieve submission data and file buffer from memory
        const submissionData = getSubmissionData(submissionId)
        const fileBuffer = getSubmissionBuffer(submissionId)

        if (!submissionData || !fileBuffer) {
          console.error("❌ Submission data not found for ID:", submissionId)
          return NextResponse.json({ error: "Submission data not found" }, { status: 404 })
        }

        console.log("📧 Sending email with manuscript attachment...")

        try {
          // Send email with manuscript attachment using Resend
          const emailResult = await resend.emails.send({
            from: "Wind of God Publishing <onboarding@resend.dev>",
            to: ["info@windofgodpublishing.com"],
            subject: `New Manuscript Submission - ${serviceName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                  New Manuscript Submission
                </h2>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #1e40af; margin-top: 0;">Customer Information</h3>
                  <p><strong>Name:</strong> ${submissionData.firstName} ${submissionData.lastName}</p>
                  <p><strong>Email:</strong> ${submissionData.email}</p>
                  <p><strong>Service Requested:</strong> ${serviceName}</p>
                  <p><strong>Submission Date:</strong> ${new Date(submissionData.submissionDate).toLocaleString()}</p>
                </div>

                <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #1e40af; margin-top: 0;">Manuscript Details</h3>
                  <p><strong>File Name:</strong> ${submissionData.fileName}</p>
                  <p><strong>File Size:</strong> ${(submissionData.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                  <p><strong>File Type:</strong> ${submissionData.mimeType}</p>
                </div>

                <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #16a34a; margin-top: 0;">Payment Information</h3>
                  <p><strong>Payment Status:</strong> ✅ Completed</p>
                  <p><strong>Amount Paid:</strong> $100.00</p>
                  <p><strong>Stripe Session ID:</strong> ${session.id}</p>
                  <p><strong>Submission ID:</strong> ${submissionId}</p>
                </div>

                <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #d97706; margin-top: 0;">Next Steps</h3>
                  <ul style="color: #92400e;">
                    <li>Review the attached manuscript</li>
                    <li>Contact the customer within 2-3 business days</li>
                    <li>Provide detailed feedback and consultation</li>
                    <li>Discuss full service pricing if customer proceeds</li>
                  </ul>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                  <p>This email was automatically generated by the Wind of God Publishing manuscript submission system.</p>
                  <p>Submission ID: ${submissionId}</p>
                </div>
              </div>
            `,
            attachments: [
              {
                filename: submissionData.fileName,
                content: fileBuffer,
              },
            ],
          })

          console.log("✅ Email sent successfully:", emailResult.data?.id)

          // Send confirmation email to customer
          await resend.emails.send({
            from: "Wind of God Publishing <onboarding@resend.dev>",
            to: [submissionData.email],
            subject: "Manuscript Submission Confirmed - Wind of God Publishing",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                  Thank You for Your Submission!
                </h2>
                
                <p>Dear ${submissionData.firstName},</p>
                
                <p>We have successfully received your manuscript submission and payment. Thank you for choosing Wind of God Publishing!</p>

                <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #1e40af; margin-top: 0;">Submission Details</h3>
                  <p><strong>Service:</strong> ${serviceName}</p>
                  <p><strong>Manuscript:</strong> ${submissionData.fileName}</p>
                  <p><strong>Submission ID:</strong> ${submissionId}</p>
                  <p><strong>Amount Paid:</strong> $100.00</p>
                </div>

                <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #16a34a; margin-top: 0;">What Happens Next?</h3>
                  <ul style="color: #166534;">
                    <li>Our team will review your manuscript within 2-3 business days</li>
                    <li>We'll contact you to schedule a consultation call</li>
                    <li>You'll receive detailed feedback on your work</li>
                    <li>We'll discuss the next steps for your publishing journey</li>
                  </ul>
                </div>

                <p>If you have any questions, please don't hesitate to contact us.</p>
                
                <p>Blessings,<br>
                <strong>The Wind of God Publishing Team</strong></p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                  <p>Wind of God Publishing - Bringing Faith-Inspired Stories to Life</p>
                </div>
              </div>
            `,
          })

          // Clear submission data from memory after successful processing
          clearSubmissionData(submissionId)
          console.log("🧹 Submission data cleared from memory")
        } catch (emailError) {
          console.error("❌ Failed to send email:", emailError)
          return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
        }
      } else {
        // Handle regular store purchases (like webinars)
        console.log("💳 Payment completed for store purchase:", session.id)

        // Get line items to check what was purchased
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ["data.price.product"],
          })

          const customerEmail = session.customer_details?.email
          const customerName = session.customer_details?.name || "Valued Customer"

          console.log("📦 Line items:", lineItems.data.length)

          // Check if any item is the webinar
          const hasWebinar = lineItems.data.some((item) => {
            const product = item.price?.product as Stripe.Product
            const productName = product?.name || ""
            console.log("🔍 Checking product:", productName)
            return (
              productName.toLowerCase().includes("ready") &&
              productName.toLowerCase().includes("set") &&
              productName.toLowerCase().includes("write")
            )
          })

          if (hasWebinar && customerEmail) {
            console.log("🎥 Webinar purchase detected, sending access email...")

            // Send webinar access email
            await resend.emails.send({
              from: "Wind of God Publishing <onboarding@resend.dev>",
              to: [customerEmail],
              subject: "🎉 Your Ready. Set. Write!!! Webinar Access - Wind of God Publishing",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎉 Welcome to Ready. Set. Write!!!</h1>
                    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Your webinar access is ready!</p>
                  </div>

                  <!-- Main Content -->
                  <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px;">
                    <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Dear ${customerName},</p>
                    
                    <p style="color: #6b7280; line-height: 1.6; margin-bottom: 30px;">
                      Thank you for purchasing the Ready. Set. Write!!! webinar! Your payment has been processed successfully, 
                      and you now have immediate access to the full webinar recording.
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

                    <!-- What You'll Learn -->
                    <div style="background: #f0fdf4; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin: 30px 0;">
                      <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">📚 What You'll Learn:</h3>
                      <ul style="color: #065f46; margin: 0; padding-left: 20px; line-height: 1.6;">
                        <li>Essential writing techniques and strategies</li>
                        <li>How to overcome writer's block and stay motivated</li>
                        <li>Publishing industry insights and opportunities</li>
                        <li>Practical tips for developing your unique voice</li>
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
                    <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
                      Order ID: ${session.id} | Need help? Contact support@windofgodpublishing.com
                    </p>
                  </div>
                </div>
              `,
            })

            console.log("✅ Webinar access email sent successfully to:", customerEmail)
          }

          // Send general order confirmation for all purchases
          if (customerEmail) {
            await resend.emails.send({
              from: "Wind of God Publishing <onboarding@resend.dev>",
              to: [customerEmail],
              subject: "Order Confirmation - Wind of God Publishing",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                    Order Confirmation
                  </h2>
                  
                  <p>Dear ${customerName},</p>
                  
                  <p>Thank you for your purchase! Your order has been successfully processed.</p>

                  <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #1e40af; margin-top: 0;">Order Details</h3>
                    <p><strong>Order ID:</strong> ${session.id}</p>
                    <p><strong>Amount:</strong> $${(session.amount_total! / 100).toFixed(2)}</p>
                    <p><strong>Payment Status:</strong> Completed</p>
                  </div>

                  ${
                    hasWebinar
                      ? `
                    <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <h3 style="color: #16a34a; margin-top: 0;">🎥 Webinar Access</h3>
                      <p>You've purchased the Ready. Set. Write!!! webinar! Check your email for a separate message with your access details.</p>
                    </div>
                  `
                      : ""
                  }

                  <p>If you have any questions, please don't hesitate to contact us.</p>
                  
                  <p>Blessings,<br>
                  <strong>The Wind of God Publishing Team</strong></p>

                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                    <p>Wind of God Publishing - Bringing Faith-Inspired Stories to Life</p>
                  </div>
                </div>
              `,
            })

            console.log("✅ Order confirmation email sent to:", customerEmail)
          }
        } catch (error) {
          console.error("❌ Error processing store purchase:", error)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("❌ Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
