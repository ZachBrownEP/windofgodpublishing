import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🧪 Test endpoint called")

    // Check environment variables
    const envCheck = {
      STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    }

    console.log("🔍 Environment variables:", envCheck)

    return NextResponse.json({
      success: true,
      message: "API is working",
      timestamp: new Date().toISOString(),
      environment: envCheck,
    })
  } catch (error) {
    console.error("❌ Test endpoint error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Test endpoint failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    console.log("🧪 Test POST endpoint called")

    return NextResponse.json({
      success: true,
      message: "POST endpoint is working",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Test POST endpoint error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Test POST endpoint failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
