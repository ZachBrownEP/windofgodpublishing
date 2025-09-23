import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment processing is not configured. Please contact support." },
        { status: 503 },
      )
    }

    // Dynamically import Stripe only when needed
    const Stripe = (await import("stripe")).default

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    })

    const body = await request.json()
    console.log("🛒 Received checkout data:", JSON.stringify(body, null, 2))

    // Handle manuscript submission checkout
    if (body.metadata?.serviceType === "manuscript_submission") {
      const { customerInfo, metadata } = body

      if (!customerInfo || !metadata?.submissionId) {
        console.error("❌ Missing manuscript submission data:", { customerInfo, metadata })
        return NextResponse.json({ error: "Missing submission information" }, { status: 400 })
      }

      console.log("📝 Processing manuscript submission checkout")

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Manuscript Review & Service Consultation",
                description: "Professional manuscript review and consultation",
              },
              unit_amount: 10000, // $100.00
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: customerInfo.email,
        success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.nextUrl.origin}/manuscript-checkout?canceled=true`,
        metadata: {
          submissionId: metadata.submissionId,
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          serviceType: "manuscript_submission",
          interestedService: metadata.interestedService || "consultation",
        },
      })

      console.log("✅ Manuscript checkout session created:", session.id)
      console.log("📊 Session metadata:", session.metadata)

      return NextResponse.json({
        id: session.id,
        url: session.url,
      })
    }

    // Handle regular store checkout (existing logic)
    const { items, total, customerInfo } = body

    // Validate required fields for regular checkout
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }

    if (!customerInfo || !customerInfo.email || !customerInfo.firstName || !customerInfo.lastName) {
      return NextResponse.json({ error: "Customer information is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerInfo.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Calculate total on server side for security
    const serverTotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Verify the total matches (within 1 cent due to floating point)
    if (Math.abs(serverTotal - total) > 0.01) {
      return NextResponse.json({ error: "Price mismatch detected" }, { status: 400 })
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => {
      const unitAmount = Math.round(item.price * 100) // Convert to cents

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            description: `Digital access to ${item.title}`,
            images: item.image ? [`${request.nextUrl.origin}${item.image}`] : [],
            metadata: {
              product_id: item.id,
              product_type: "digital",
            },
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      }
    })

    // Create checkout session for regular store items
    const sessionConfig: any = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerInfo.email,
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout?canceled=true`,
      metadata: {
        total: total.toString(),
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        orderDate: new Date().toISOString(),
      },
      billing_address_collection: "auto",
      custom_text: {
        submit: {
          message: "Thank you for choosing Wind of God Publishing!",
        },
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes from now
    }

    // Only add shipping address collection for paid orders
    if (total > 0) {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ["US", "CA", "GB", "AU"],
      }
      sessionConfig.phone_number_collection = {
        enabled: true,
      }
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return NextResponse.json({
      id: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("❌ Error creating checkout session:", error)

    if (error instanceof Error) {
      // Handle specific Stripe errors
      if (error.message.includes("Invalid integer")) {
        return NextResponse.json({ error: "Invalid price format" }, { status: 400 })
      }
      if (error.message.includes("No such price")) {
        return NextResponse.json({ error: "Product pricing error" }, { status: 400 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 })
  }
}
