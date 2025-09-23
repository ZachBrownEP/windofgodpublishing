import { type NextRequest, NextResponse } from "next/server"
import formidable from "formidable"
import { Resend } from "resend"
import fs from "fs"
import { Readable } from "stream"

const resend = new Resend(process.env.RESEND_API_KEY)

// Global storage for submission data (if needed by other parts of the app)
declare global {
  var submissionBuffers: Map<string, Buffer>
  var submissionData: Map<string, any>
}

// Initialize global storage
if (!global.submissionBuffers) {
  global.submissionBuffers = new Map()
}
if (!global.submissionData) {
  global.submissionData = new Map()
}

export async function POST(request: NextRequest) {
  console.log("🚀 API route called: /api/submit-manuscript")

  try {
    // Step 1: Check environment variables
    console.log("🔍 Step 1: Checking environment variables...")
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is missing")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }
    console.log("✅ RESEND_API_KEY is present")

    // Step 2: Get request body
    console.log("🔍 Step 2: Reading request body...")
    let body: ArrayBuffer
    try {
      body = await request.arrayBuffer()
      console.log("✅ Request body read, size:", body.byteLength)
    } catch (bodyError) {
      console.error("❌ Failed to read request body:", bodyError)
      return NextResponse.json({ error: "Failed to read request body" }, { status: 400 })
    }

    // Step 3: Convert to stream for formidable
    console.log("🔍 Step 3: Converting to stream...")
    const buffer = Buffer.from(body)
    const stream = new Readable()
    stream.push(buffer)
    stream.push(null)

    // Step 4: Parse with formidable
    console.log("🔍 Step 4: Parsing with formidable...")
    const form = new formidable.IncomingForm({
      maxFileSize: 15 * 1024 * 1024, // 15MB
      keepExtensions: true,
    })

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(stream as any, (err, parsedFields, parsedFiles) => {
        if (err) {
          console.error("❌ Formidable parsing failed:", err)
          reject(err)
        } else {
          console.log("✅ Formidable parsing successful")
          console.log("📋 Fields keys:", Object.keys(parsedFields))
          console.log("📎 Files keys:", Object.keys(parsedFiles))
          resolve([parsedFields, parsedFiles])
        }
      })
    })

    // Step 5: Extract fields
    console.log("🔍 Step 5: Extracting fields...")
    const firstName = Array.isArray(fields.firstName) ? fields.firstName[0] : fields.firstName
    const lastName = Array.isArray(fields.lastName) ? fields.lastName[0] : fields.lastName
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email
    const selectedService = Array.isArray(fields.selectedService) ? fields.selectedService[0] : fields.selectedService
    const manuscript = Array.isArray(files.manuscript) ? files.manuscript[0] : files.manuscript

    console.log("📊 Extracted values:", {
      firstName: !!firstName,
      lastName: !!lastName,
      email: !!email,
      selectedService: !!selectedService,
      manuscript: !!manuscript,
    })

    // Step 6: Validate required fields
    console.log("🔍 Step 6: Validating fields...")
    if (!firstName || !lastName || !email || !selectedService || !manuscript) {
      console.error("❌ Missing required fields")
      return NextResponse.json({ error: "All fields including file are required" }, { status: 400 })
    }
    console.log("✅ All required fields present")

    // Step 7: Read file
    console.log("🔍 Step 7: Reading uploaded file...")
    let fileBuffer: Buffer
    let fileName: string
    try {
      const filePath = manuscript.filepath
      if (!filePath) {
        throw new Error("No file path available")
      }

      fileBuffer = fs.readFileSync(filePath)
      fileName = manuscript.originalFilename || "manuscript.pdf"
      console.log("✅ File read successfully:", {
        fileName,
        size: fileBuffer.length,
        path: filePath,
      })

      // Clean up temp file
      try {
        fs.unlinkSync(filePath)
        console.log("🧹 Temp file cleaned up")
      } catch (cleanupError) {
        console.warn("⚠️ Failed to cleanup temp file:", cleanupError)
      }
    } catch (fileError) {
      console.error("❌ Failed to read file:", fileError)
      return NextResponse.json({ error: "Failed to read uploaded file" }, { status: 500 })
    }

    // Generate submission ID for tracking
    const submissionId = `MS_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store in global memory (optional - for compatibility with other parts of the app)
    global.submissionBuffers.set(submissionId, fileBuffer)
    global.submissionData.set(submissionId, {
      firstName,
      lastName,
      email,
      selectedService,
      fileName,
      fileSize: fileBuffer.length,
      mimeType: manuscript.mimetype,
      submissionDate: new Date().toISOString(),
    })

    // Step 8: Send email
    console.log("🔍 Step 8: Sending email...")
    try {
      const result = await resend.emails.send({
        from: "Wind of God Publishing <onboarding@resend.dev>",
        to: "epzwemove@gmail.com",
        subject: `New Manuscript Submission - ${selectedService}`,
        html: `
          <h2>New Manuscript Submission</h2>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${selectedService}</p>
          <p><strong>File:</strong> ${fileName}</p>
          <p><strong>File Size:</strong> ${(fileBuffer.length / 1024 / 1024).toFixed(2)} MB</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
        attachments: [
          {
            filename: fileName,
            content: fileBuffer,
          },
        ],
      })

      console.log("✅ Email sent successfully:", result.data?.id)

      // Step 9: Send confirmation to customer
      console.log("🔍 Step 9: Sending customer confirmation...")
      await resend.emails.send({
        from: "Wind of God Publishing <onboarding@resend.dev>",
        to: email,
        subject: "Manuscript Submission Confirmation",
        html: `
          <h2>Thank you for your submission!</h2>
          <p>Dear ${firstName},</p>
          <p>We have successfully received your manuscript for <strong>${selectedService}</strong>.</p>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p>Our team will review it and get back to you within 7-10 business days.</p>
          <p>Best regards,<br>Wind of God Publishing Team</p>
        `,
      })

      console.log("✅ Customer confirmation sent")

      return NextResponse.json({
        success: true,
        submissionId,
        message: "Manuscript submitted successfully!",
        emailId: result.data?.id,
      })
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError)
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: emailError instanceof Error ? emailError.message : "Unknown email error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : undefined) : undefined,
      },
      { status: 500 },
    )
  }
}

// Export functions for compatibility with other parts of the app
export function getSubmissionBuffer(submissionId: string): Buffer | undefined {
  try {
    return global.submissionBuffers?.get(submissionId)
  } catch (error) {
    console.error("❌ Failed to get submission buffer:", error)
    return undefined
  }
}

export function getSubmissionData(submissionId: string): any {
  try {
    return global.submissionData?.get(submissionId)
  } catch (error) {
    console.error("❌ Failed to get submission data:", error)
    return undefined
  }
}

export function clearSubmissionData(submissionId: string): void {
  try {
    global.submissionBuffers?.delete(submissionId)
    global.submissionData?.delete(submissionId)
    console.log("🧹 Cleared submission data for:", submissionId)
  } catch (error) {
    console.error("❌ Failed to clear submission data:", error)
  }
}
