"use client"

import type React from "react"
import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, Shield, AlertCircle, Lock, CheckCircle2, ExternalLink } from "lucide-react"
import Image from "next/image"
import Layout from "@/components/layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function CheckoutPageContent() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  // Check if we're in preview mode
  useEffect(() => {
    setIsPreviewMode(window.location.hostname.includes("v0.dev") || window.location.hostname.includes("localhost"))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const validateForm = () => {
    if (!customerInfo.firstName.trim()) {
      setError("First name is required")
      return false
    }
    if (!customerInfo.lastName.trim()) {
      setError("Last name is required")
      return false
    }
    if (!customerInfo.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const handleStripeCheckout = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    setError(null)
    setCheckoutUrl(null)

    try {
      // For free products, simulate completion
      if (state.total === 0) {
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Clear cart and redirect to success
        dispatch({ type: "CLEAR_CART" })
        const orderData = {
          session_id: "free_order_" + Date.now(),
          customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customer_email: customerInfo.email,
          amount_total: 0,
          items: state.items,
          payment_status: "completed",
        }

        const queryParams = new URLSearchParams({
          session_id: orderData.session_id,
          customer_name: orderData.customer_name,
          customer_email: orderData.customer_email,
          amount_total: orderData.amount_total.toString(),
          payment_status: orderData.payment_status,
          items: JSON.stringify(orderData.items),
        })

        router.push(`/success?${queryParams.toString()}`)
        return
      }

      // Store order data in localStorage before redirecting to Stripe
      const orderData = {
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customer_email: customerInfo.email,
        amount_total: state.total,
        items: state.items,
        payment_status: "pending",
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("pending_order", JSON.stringify(orderData))
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items,
          total: state.total,
          customerInfo,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Clear cart before redirecting
      dispatch({ type: "CLEAR_CART" })

      // In preview mode, show the checkout URL instead of redirecting
      if (isPreviewMode) {
        setCheckoutUrl(data.url || `https://checkout.stripe.com/c/pay/${data.id}`)
        setIsProcessing(false)
        return
      }

      // Try to redirect to Stripe Checkout
      try {
        const stripe = (await import("@stripe/stripe-js")).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        const stripeInstance = await stripe

        if (stripeInstance) {
          const { error } = await stripeInstance.redirectToCheckout({
            sessionId: data.id,
          })

          if (error) {
            // If redirect fails, show the checkout URL
            setCheckoutUrl(data.url || `https://checkout.stripe.com/c/pay/${data.id}`)
          }
        } else {
          // Fallback to direct URL
          setCheckoutUrl(data.url || `https://checkout.stripe.com/c/pay/${data.id}`)
        }
      } catch (redirectError) {
        console.warn("Stripe redirect failed, using fallback URL:", redirectError)
        setCheckoutUrl(data.url || `https://checkout.stripe.com/c/pay/${data.id}`)
      }
    } catch (err) {
      console.error("Checkout error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during checkout")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleExternalCheckout = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank", "noopener,noreferrer")
    }
  }

  if (!state.items || state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Your cart is empty</h1>
            <p className="text-blue-700 mb-4">Add some items to your cart before checking out.</p>
          </div>
          <div className="space-y-4">
            <Button onClick={() => router.push("/store")} className="bg-blue-600 hover:bg-blue-700 text-white">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Secure Checkout</h1>
            <p className="text-blue-700">Complete your order with our secure payment process</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-blue-600">Review Order</span>
              </div>
              <div className="w-16 h-0.5 bg-blue-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-blue-600">Customer Info</span>
              </div>
              <div className="w-16 h-0.5 bg-blue-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">Payment</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800 mb-1">There was a problem</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {checkoutUrl && (
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-center">
                  <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-medium text-blue-800 mb-2">Checkout Session Created!</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    {isPreviewMode
                      ? "In preview mode, click the button below to open Stripe Checkout in a new tab."
                      : "Click the button below to complete your payment securely with Stripe."}
                  </p>
                  <Button onClick={handleExternalCheckout} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Stripe Checkout
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">This will open in a new tab for security</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          {item.quantity > 1 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {item.quantity}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                          <p className="text-sm text-gray-500">
                            {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}
                            {item.quantity > 1 && ` �� ${item.quantity}`}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          {item.price === 0 ? "Free" : `$${(item.price * item.quantity).toFixed(2)}`}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">{state.total === 0 ? "Free" : `$${state.total.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-blue-900">{state.total === 0 ? "Free" : `$${state.total.toFixed(2)}`}</span>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1" />
                        <span>SSL Secured</span>
                      </div>
                      <div className="flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        <span>256-bit Encryption</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Information & Payment */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="space-y-8">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Customer Information</CardTitle>
                    <p className="text-sm text-gray-600">
                      We'll use this information for order confirmation and delivery.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          value={customerInfo.firstName}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={customerInfo.lastName}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We'll send your order confirmation and product access to this email.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {state.total === 0 ? "No payment required for free items." : "Secure payment powered by Stripe"}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-center p-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                          <span className="text-blue-800 font-medium">Stripe Checkout</span>
                        </div>
                        <p className="text-sm text-blue-700 mb-2">
                          {state.total === 0
                            ? "Complete your free order"
                            : "Secure payment with credit card, Apple Pay, or Google Pay"}
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-xs text-blue-600">
                          <span>🔒 SSL Secured</span>
                          <span>•</span>
                          <span>💳 PCI Compliant</span>
                          <span>•</span>
                          <span>✅ Trusted by millions</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment guarantee */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800 mb-1">30-Day Money-Back Guarantee</h4>
                          <p className="text-sm text-green-700">
                            Not satisfied? Get a full refund within 30 days, no questions asked.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Complete Order Button */}
                <div className="space-y-4">
                  <Button
                    onClick={handleStripeCheckout}
                    disabled={isProcessing || !!checkoutUrl}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        {state.total === 0 ? "Processing Free Order..." : "Creating Checkout Session..."}
                      </div>
                    ) : checkoutUrl ? (
                      <div className="flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Checkout Session Ready
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Lock className="w-5 h-5 mr-2" />
                        {state.total === 0 ? "Complete Free Order" : `Complete Order - $${state.total.toFixed(2)}`}
                      </div>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      By completing your order, you agree to our{" "}
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
                </div>

                {/* Trust indicators */}
                <div className="flex items-center justify-center space-x-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>Instant Delivery</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    <span>Money-Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Layout>
      <CheckoutPageContent />
    </Layout>
  )
}
