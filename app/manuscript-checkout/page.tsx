"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, FileText, User, CreditCard, Lock, AlertCircle } from "lucide-react"
import Layout from "@/components/layout"
import { useRouter } from "next/navigation"

interface SubmissionData {
  customerInfo: {
    firstName: string
    lastName: string
    email: string
  }
  service: {
    id: string
    title: string
    price: number
    description: string
  }
  submissionId: string
}

function ManuscriptCheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get submission data from localStorage
    const savedSubmission = localStorage.getItem("manuscript_submission")
    if (savedSubmission) {
      try {
        const data = JSON.parse(savedSubmission)
        setSubmissionData(data)
      } catch (error) {
        console.error("Error parsing submission data:", error)
        setError("Invalid submission data")
      }
    } else {
      setError("No submission data found")
    }
    setLoading(false)
  }, [])

  const handlePayment = async () => {
    if (!submissionData) return

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: "manuscript-review",
              title: "Manuscript Review & Service Consultation",
              price: 100,
              image: `/images/manuscript-review.png`,
              quantity: 1,
            },
          ],
          total: 100,
          customerInfo: submissionData.customerInfo,
          metadata: {
            submissionId: submissionData.submissionId,
            serviceType: "manuscript_submission",
            interestedService: submissionData.service.id,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Store additional data for success page
      const orderData = {
        customer_name: `${submissionData.customerInfo.firstName} ${submissionData.customerInfo.lastName}`,
        customer_email: submissionData.customerInfo.email,
        amount_total: 100,
        items: [
          {
            id: "manuscript-review",
            title: "Manuscript Review & Service Consultation",
            price: 100,
            image: `/images/manuscript-review.png`,
            quantity: 1,
          },
        ],
        payment_status: "pending",
        submissionId: submissionData.submissionId,
      }

      localStorage.setItem("pending_order", JSON.stringify(orderData))

      // Try to redirect to Stripe Checkout
      try {
        const stripe = (await import("@stripe/stripe-js")).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        const stripeInstance = await stripe

        if (stripeInstance) {
          const { error } = await stripeInstance.redirectToCheckout({
            sessionId: data.id,
          })

          if (error) {
            // If redirect fails, open in new window
            window.open(data.url || `https://checkout.stripe.com/c/pay/${data.id}`, "_blank")
          }
        } else {
          // Fallback to direct URL
          window.open(data.url || `https://checkout.stripe.com/c/pay/${data.id}`, "_blank")
        }
      } catch (redirectError) {
        console.warn("Stripe redirect failed, using fallback URL:", redirectError)
        window.open(data.url || `https://checkout.stripe.com/c/pay/${data.id}`, "_blank")
      }
    } catch (err) {
      console.error("Checkout error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during checkout")
    } finally {
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading checkout...</h2>
        </div>
      </div>
    )
  }

  if (error || !submissionData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Checkout Error</h2>
          <p className="text-gray-600 mb-6">{error || "Unable to load checkout information"}</p>
          <Button onClick={() => router.push("/services")} className="bg-blue-600 hover:bg-blue-700 text-white">
            Return to Services
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Complete Your Manuscript Submission</h1>
            <p className="text-blue-700">
              Your manuscript has been uploaded. Complete payment to begin the review process.
            </p>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-green-800 mb-2">Manuscript Successfully Uploaded!</h3>
                  <p className="text-green-700 text-sm mb-2">
                    Your manuscript has been securely uploaded and sent to our team for review.
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>Submission ID:</strong> {submissionData.submissionId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Submission Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {submissionData.customerInfo.firstName} {submissionData.customerInfo.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{submissionData.customerInfo.email}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Selected Service</h3>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">{submissionData.service.title}</h4>
                        <p className="text-blue-800 text-sm mb-3">{submissionData.service.description}</p>
                        <p className="text-sm text-blue-700 italic">
                          Service pricing will be discussed separately after manuscript review.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Manuscript Review Fee</span>
                        <span className="text-gray-900">$100.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processing Fee</span>
                        <span className="text-gray-900">$0.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-blue-900">$100.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </CardTitle>
                  <p className="text-sm text-gray-600">Secure payment powered by Stripe</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800 mb-1">Payment Error</h3>
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center p-8 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <CreditCard className="w-8 h-8 text-blue-600" />
                        <span className="text-blue-800 font-medium text-lg">Stripe Checkout</span>
                      </div>
                      <p className="text-blue-700 mb-4">Secure payment with credit card, Apple Pay, or Google Pay</p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 mb-6">
                        <span>🔒 SSL Secured</span>
                        <span>•</span>
                        <span>💳 PCI Compliant</span>
                        <span>•</span>
                        <span>✅ Trusted by millions</span>
                      </div>
                    </div>
                  </div>

                  {/* What happens next */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">What happens after payment?</h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          1
                        </div>
                        <p>Your payment is processed securely through Stripe</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          2
                        </div>
                        <p>Our team begins reviewing your manuscript within 24 hours</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          3
                        </div>
                        <p>You'll receive detailed feedback within 7-10 business days</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          4
                        </div>
                        <p>Follow-up consultation to discuss next steps (if included in service)</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Lock className="w-5 h-5 mr-2" />
                        Pay $100 - Complete Manuscript Submission
                      </div>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      By completing your payment, you agree to our{" "}
                      <a href="/privacy-policy" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy-policy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ManuscriptCheckoutPage() {
  return (
    <Layout>
      <ManuscriptCheckoutContent />
    </Layout>
  )
}
