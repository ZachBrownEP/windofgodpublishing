"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Copy, Video, Mail, Download, Gift, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const PaypalSuccessPage = () => {
  const searchParams = useSearchParams()
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedPasscode, setCopiedPasscode] = useState(false)

  // Zoom access details for Ready Set Write webinar
  const ZOOM_LINK =
    "https://us02web.zoom.us/rec/share/EJH5F0jb7fwosjBlLJ3xsMk3JLbJOyeuFBqAWYZMGbflFS5Wz5f7kL-_I8wX1TlQ.JxU9pIu-aVNiO6SV"
  const ZOOM_PASSCODE = "cX=N5Qa5"

  const copyToClipboard = async (text: string, type: "link" | "passcode") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "link") {
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
      } else {
        setCopiedPasscode(true)
        setTimeout(() => setCopiedPasscode(false), 2000)
      }
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 font-bold">!</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Complete!</h1>
            <p className="text-xl text-gray-600 mb-2">Thank you for your purchase!</p>
            <p className="text-gray-500">Your order has been successfully processed and confirmed.</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Order #XANXN7SF
            </div>
          </div>

          {/* Webinar Access Section */}
          <div className="bg-blue-600 text-white rounded-t-lg p-4 mb-0">
            <div className="flex items-center">
              <Video className="w-6 h-6 mr-3" />
              <span className="text-lg font-semibold">🎉 Your Webinar Access is Ready!</span>
            </div>
          </div>

          <Card className="mb-8 rounded-t-none border-t-0">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready. Set. Write!!! Webinar</h3>
                <p className="text-gray-600">Access your webinar recording immediately using the details below</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">🔗 Zoom Recording Link:</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 p-3 bg-white rounded border font-mono text-sm break-all">{ZOOM_LINK}</div>
                      <Button
                        onClick={() => copyToClipboard(ZOOM_LINK, "link")}
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                      >
                        {copiedLink ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={() => window.open(ZOOM_LINK, "_blank")}
                        size="sm"
                        className="flex-shrink-0 bg-blue-600 hover:bg-blue-700"
                      >
                        Go
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">🔐 Passcode:</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 p-3 bg-white rounded border font-mono text-lg font-bold text-center">
                        {ZOOM_PASSCODE}
                      </div>
                      <Button
                        onClick={() => copyToClipboard(ZOOM_PASSCODE, "passcode")}
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                      >
                        {copiedPasscode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
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
                      <li>• Save these access details - you'll need them to watch the webinar</li>
                      <li>• The recording is available immediately and doesn't expire</li>
                      <li>• If you have any issues accessing the content, contact our support team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* What's Next */}
            <Card>
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-lg">→ What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Check Your Email</h3>
                    <p className="text-gray-600 text-sm">Your order confirmation will be sent to your email address</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Download className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instant Access</h3>
                    <p className="text-gray-600 text-sm">
                      Your webinar access details are displayed above - start watching immediately!
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
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
            <Card>
              <CardHeader className="bg-gray-800 text-white rounded-t-lg">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-mono text-sm">#XANXN7SF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status</span>
                    <span className="text-green-600 font-medium">● Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold">$35.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order Date</span>
                    <span>June 22, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <Card className="mb-8">
            <CardHeader className="bg-purple-600 text-white rounded-t-lg">
              <CardTitle>Your Order Items</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Image
                  src="/images/ready-set-write-store.png"
                  alt="Ready. Set. Write!!!"
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Ready. Set. Write!!!</h3>
                  <p className="text-sm text-gray-600">Quantity: 1</p>
                  <p className="text-lg font-bold text-blue-600">$35.00</p>
                  <p className="text-xs text-green-600 font-medium mt-1">✅ Access details shown above</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">$35.00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open(ZOOM_LINK, "_blank")}
              >
                <Video className="w-5 h-5 mr-2" />
                Watch Webinar Now
              </Button>
              <Link href="/store">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaypalSuccessPage
