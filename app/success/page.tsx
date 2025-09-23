"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Mail, ArrowRight, Star, Gift, Clock, Video, Copy, ExternalLink } from "lucide-react"
import Layout from "@/components/layout"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useCart } from "@/components/cart-context"
import Image from "next/image"

interface OrderItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}

interface OrderData {
  session_id: string
  customer_name: string
  customer_email: string
  amount_total: number
  payment_status: string
  items: OrderItem[]
}

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>({})
  const [copiedPasscodes, setCopiedPasscodes] = useState<{ [key: string]: boolean }>({})
  const { dispatch } = useCart()

  // Zoom access details
  const ZOOM_LINK =
    "https://us02web.zoom.us/rec/share/EJH5F0jb7fwosjBlLJ3xsMk3JLbJOyeuFBqAWYZMGbflFS5Wz5f7kL-_I8wX1TlQ.JxU9pIu-aVNiO6SV"
  const ZOOM_PASSCODE = "cX=N5Qa5"

  // Worship Write War event Zoom details
  const WORSHIP_ZOOM_LINK = "https://us02web.zoom.us/j/89589931125?pwd=62lwRxKkN6QB5nYqUTQ0NhbeEwlaSa.1"
  const WORSHIP_MEETING_ID = "895 8993 1125"
  const WORSHIP_PASSCODE = "858006"

  // Write With Me event Zoom details
  const WRITE_WITH_ME_ZOOM_LINK = "https://us02web.zoom.us/j/83212570246?pwd=8jwRWdJElxky87EnpwUQkdWADopr9O.1"
  const WRITE_WITH_ME_MEETING_ID = "832 1257 0246"
  const WRITE_WITH_ME_PASSCODE = "494984"

  useEffect(() => {
    // Clear cart immediately
    dispatch({ type: "CLEAR_CART" })

    const sessionId = searchParams.get("session_id")

    if (sessionId) {
      // Check if this is a Stripe redirect
      if (sessionId.startsWith("cs_")) {
        // This is a real Stripe session, get data from localStorage
        const pendingOrder = localStorage.getItem("pending_order")
        if (pendingOrder) {
          try {
            const orderInfo = JSON.parse(pendingOrder)
            const newOrderData: OrderData = {
              session_id: sessionId,
              customer_name: orderInfo.customer_name,
              customer_email: orderInfo.customer_email,
              amount_total: orderInfo.amount_total,
              payment_status: "completed",
              items: orderInfo.items,
            }
            setOrderData(newOrderData)
            // Clean up localStorage
            localStorage.removeItem("pending_order")
          } catch (error) {
            console.error("Error parsing pending order:", error)
          }
        }
      } else {
        // This is a free order or manual redirect, get data from URL params
        const customerName = searchParams.get("customer_name")
        const customerEmail = searchParams.get("customer_email")
        const amountTotal = searchParams.get("amount_total")
        const paymentStatus = searchParams.get("payment_status")
        const itemsParam = searchParams.get("items")

        try {
          const items = itemsParam ? JSON.parse(itemsParam) : []
          const newOrderData: OrderData = {
            session_id: sessionId,
            customer_name: customerName || "Valued Customer",
            customer_email: customerEmail || "",
            amount_total: amountTotal ? Number.parseFloat(amountTotal) : 0,
            payment_status: paymentStatus || "completed",
            items: items,
          }
          setOrderData(newOrderData)
        } catch (error) {
          console.error("Error parsing order data:", error)
        }
      }
    }

    setLoading(false)
  }, [dispatch, searchParams])

  const formatPrice = (price: number) => {
    return price === 0 ? "FREE" : `$${price.toFixed(2)}`
  }

  const totalAmount =
    orderData?.amount_total || orderData?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0

  // Check for each event type
  const webinarItems =
    orderData?.items.filter(
      (item) =>
        item.title.toLowerCase().includes("ready") &&
        item.title.toLowerCase().includes("set") &&
        item.title.toLowerCase().includes("write"),
    ) || []

  const worshipItems =
    orderData?.items.filter(
      (item) =>
        item.title.toLowerCase().includes("worship") &&
        item.title.toLowerCase().includes("write") &&
        item.title.toLowerCase().includes("war"),
    ) || []

  const writeWithMeItems =
    orderData?.items.filter(
      (item) =>
        item.title.toLowerCase().includes("write") &&
        item.title.toLowerCase().includes("with") &&
        item.title.toLowerCase().includes("me"),
    ) || []

  const hasAnyEvents = webinarItems.length > 0 || worshipItems.length > 0 || writeWithMeItems.length > 0

  const copyToClipboard = async (text: string, type: "link" | "passcode", eventKey: string) => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "link") {
        setCopiedLinks((prev) => ({ ...prev, [eventKey]: true }))
        setTimeout(() => setCopiedLinks((prev) => ({ ...prev, [eventKey]: false })), 2000)
      } else {
        setCopiedPasscodes((prev) => ({ ...prev, [eventKey]: true }))
        setTimeout(() => setCopiedPasscodes((prev) => ({ ...prev, [eventKey]: false })), 2000)
      }
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirming your order...</h2>
          <p className="text-gray-600">Please wait while we process your order</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Complete!</h1>
          <p className="text-xl text-gray-600 mb-8">Thank you for your purchase!</p>
          <Link href="/store">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="relative">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Star className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Order Complete!</h1>
            <p className="text-xl text-gray-600 mb-2">Thank you for your purchase, {orderData.customer_name}!</p>
            <p className="text-gray-500">Your order has been successfully processed and confirmed.</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Order #{orderData.session_id.slice(-8).toUpperCase()}
            </div>
          </div>

          {/* Event Access Sections - Show each event separately */}
          {hasAnyEvents && (
            <div className="space-y-8 mb-12">
              {/* Ready Set Write Webinar */}
              {webinarItems.length > 0 && (
                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      <Video className="w-6 h-6 mr-3" />🎉 Ready. Set. Write!!! Webinar Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready. Set. Write!!! Webinar</h3>
                        <p className="text-gray-600 mb-6">
                          Access your webinar recording immediately using the details below
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              🔗 Zoom Recording Link:
                            </label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-sm break-all">
                                {ZOOM_LINK}
                              </div>
                              <Button
                                onClick={() => copyToClipboard(ZOOM_LINK, "link", "webinar")}
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0"
                              >
                                {copiedLinks.webinar ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                onClick={() => window.open(ZOOM_LINK, "_blank")}
                                size="sm"
                                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">🔐 Passcode:</label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-lg font-bold text-center">
                                {ZOOM_PASSCODE}
                              </div>
                              <Button
                                onClick={() => copyToClipboard(ZOOM_PASSCODE, "passcode", "webinar")}
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0"
                              >
                                {copiedPasscodes.webinar ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <Star className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <h4 className="text-sm font-semibold text-yellow-800">Important Notes:</h4>
                            <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                              <li>• The recording is available immediately and doesn't expire</li>
                              <li>• Save these access details for future reference</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Worship Write War Event */}
              {worshipItems.length > 0 && (
                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      <Video className="w-6 h-6 mr-3" />🎉 Worship, Write, and War Event Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          Worship, Write, and War: A 2-Hour Writing Encounter
                        </h3>
                        <p className="text-gray-600 mb-6">Join your live writing encounter using the details below</p>
                      </div>

                      <div className="bg-white rounded-lg p-6 border-2 border-purple-200">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              🔗 Zoom Meeting Link:
                            </label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-sm break-all">
                                {WORSHIP_ZOOM_LINK}
                              </div>
                              <Button
                                onClick={() => copyToClipboard(WORSHIP_ZOOM_LINK, "link", "worship")}
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0"
                              >
                                {copiedLinks.worship ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                onClick={() => window.open(WORSHIP_ZOOM_LINK, "_blank")}
                                size="sm"
                                className="flex-shrink-0 bg-purple-600 hover:bg-purple-700"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">🆔 Meeting ID:</label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-lg font-bold text-center">
                                {WORSHIP_MEETING_ID}
                              </div>
                              <Button
                                onClick={() => copyToClipboard(WORSHIP_MEETING_ID, "passcode", "worship-id")}
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0"
                              >
                                {copiedPasscodes["worship-id"] ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">🔐 Passcode:</label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-lg font-bold text-center">
                                {WORSHIP_PASSCODE}
                              </div>
                              <Button
                                onClick={() => copyToClipboard(WORSHIP_PASSCODE, "passcode", "worship")}
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0"
                              >
                                {copiedPasscodes.worship ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <Star className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <h4 className="text-sm font-semibold text-yellow-800">Important Notes:</h4>
                            <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                              <li>• Event Date: August 14, 2025 at 1:00 PM EST</li>
                              <li>• Save these access details to join the live event</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Write With Me Event */}
              {writeWithMeItems.length > 0 && (
                <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-teal-50">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      <Clock className="w-6 h-6 mr-3" />🎉 Write With Me: 4-Week Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          Write With Me: A 4-Week Guided Writing Experience
                        </h3>
                        <p className="text-gray-600 mb-6">Join your 4-week writing journey using the details below</p>
                      </div>

                      <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              🔗 Zoom Meeting Link:
                            </label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-sm break-all">
                                {WRITE_WITH_ME_ZOOM_LINK}
                              </div>
                              <Button
                                onClick={() => copyToClipboard(WRITE_WITH_ME_ZOOM_LINK, "link", "write-with-me")}
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0"
                              >
                                {copiedLinks["write-with-me"] ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                onClick={() => window.open(WRITE_WITH_ME_ZOOM_LINK, "_blank")}
                                size="sm"
                                className="flex-shrink-0 bg-green-600 hover:bg-green-700"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">🆔 Meeting ID:</label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-lg font-bold text-center">
                                {WRITE_WITH_ME_MEETING_ID}
                              </div>
                              <Button
                                onClick={() =>
                                  copyToClipboard(WRITE_WITH_ME_MEETING_ID, "passcode", "write-with-me-id")
                                }
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0"
                              >
                                {copiedPasscodes["write-with-me-id"] ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">🔐 Passcode:</label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-lg font-bold text-center">
                                {WRITE_WITH_ME_PASSCODE}
                              </div>
                              <Button
                                onClick={() => copyToClipboard(WRITE_WITH_ME_PASSCODE, "passcode", "write-with-me")}
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0"
                              >
                                {copiedPasscodes["write-with-me"] ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <Star className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <h4 className="text-sm font-semibold text-yellow-800">Important Notes:</h4>
                            <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                              <li>• Sessions: August 9, 16, 23, 30, 2025</li>
                              <li>• Save these access details to join all sessions</li>
                              <li>• Each session builds on the previous one</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* What's Next */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  What happens next?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Check Your Email</h3>
                    <p className="text-gray-600 text-sm">
                      Your order confirmation will be sent to{" "}
                      <span className="font-medium">{orderData.customer_email || "your email address"}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {totalAmount > 0
                        ? "Stripe will send a receipt for your purchase"
                        : "Check your spam folder if you don't see it within 5 minutes"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Download className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instant Access</h3>
                    <p className="text-gray-600 text-sm">
                      {hasAnyEvents
                        ? "Your event access details are displayed above!"
                        : "Your digital products are ready to access immediately"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Bonus Content</h3>
                    <p className="text-gray-600 text-sm">Look out for exclusive bonus materials and future updates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-mono text-sm font-medium">
                      #{orderData.session_id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {orderData.payment_status === "completed" ? "Completed" : "Paid"}
                    </span>
                  </div>
                  {orderData.customer_name && orderData.customer_name !== "Valued Customer" && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Customer</span>
                      <span className="text-gray-900 font-medium">{orderData.customer_name}</span>
                    </div>
                  )}
                  {orderData.customer_email && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email</span>
                      <span className="text-gray-900 text-sm">{orderData.customer_email}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Order Date</span>
                    <span className="text-gray-900">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          {orderData.items && orderData.items.length > 0 && (
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle>Your Order Items</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-lg font-bold text-blue-600">{formatPrice(item.price)}</p>
                        <p className="text-xs text-green-600 font-medium mt-1">✅ Access details shown above</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {webinarItems.length > 0 && (
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  onClick={() => window.open(ZOOM_LINK, "_blank")}
                >
                  <Video className="w-5 h-5 mr-2" />
                  Watch Ready Set Write
                </Button>
              )}
              {worshipItems.length > 0 && (
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                  onClick={() => window.open(WORSHIP_ZOOM_LINK, "_blank")}
                >
                  <Video className="w-5 h-5 mr-2" />
                  Join Worship Event
                </Button>
              )}
              {writeWithMeItems.length > 0 && (
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                  onClick={() => window.open(WRITE_WITH_ME_ZOOM_LINK, "_blank")}
                >
                  <Video className="w-5 h-5 mr-2" />
                  Join Write With Me
                </Button>
              )}
              <Link href="/store">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Customer Support */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you have trouble accessing your events or have any questions about your order, our support team is
                here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                    Contact Support
                  </Button>
                </Link>
                <a href="mailto:support@windofgodpublishing.com">
                  <Button variant="ghost" className="text-blue-700 hover:bg-blue-50">
                    Email Us Directly
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Money Back Guarantee */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Layout>
      <SuccessPageContent />
    </Layout>
  )
}
