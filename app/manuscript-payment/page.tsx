"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Layout from "@/components/layout"

export default function ManuscriptPaymentPage() {
  const handleStripeCheckout = () => {
    window.open("https://buy.stripe.com/test_7sY6oJ2p72IsfOe7It5Rm00", "_blank")
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Submission!</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Thank you for submitting your manuscript! Please choose your payment method below.
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Choose Your Payment Method</h2>

                <div className="relative">
                  {/* Payment buttons container */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stripe Button */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-gray-800 text-center">Credit Card</h3>
                      <Button
                        onClick={handleStripeCheckout}
                        className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg transition-colors duration-200 rounded-lg"
                        size="lg"
                      >
                        Pay with Stripe
                      </Button>
                      <p className="text-xs text-gray-500 text-center">Secure credit card processing</p>
                    </div>

                    {/* Divider for mobile */}
                    <div className="md:hidden flex items-center justify-center py-4">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="px-4 text-sm text-gray-500 bg-white">OR</span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* PayPal Button */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-gray-800 text-center">PayPal</h3>
                      <div className="w-full flex justify-center">
                        <style
                          dangerouslySetInnerHTML={{
                            __html: `.pp-YPVFTPN7GFVM6{text-align:center;border:none;border-radius:0.25rem;min-width:11.625rem;padding:0 2rem;height:2.625rem;font-weight:bold;background-color:#FFD140;color:#000000;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer;}`,
                          }}
                        />
                        <form
                          action="https://www.paypal.com/ncp/payment/YPVFTPN7GFVM6"
                          method="post"
                          target="_blank"
                          style={{
                            display: "inline-grid",
                            justifyItems: "center",
                            alignContent: "start",
                            gap: "0.5rem",
                          }}
                        >
                          <input className="pp-YPVFTPN7GFVM6" type="submit" value="Buy Now" />
                          <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
                          <section style={{ fontSize: "0.75rem" }}>
                            Powered by{" "}
                            <img
                              src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
                              alt="paypal"
                              style={{ height: "0.875rem", verticalAlign: "middle" }}
                            />
                          </section>
                        </form>
                      </div>
                      <p className="text-xs text-gray-500 text-center">Pay with PayPal, Venmo, or other methods</p>
                    </div>
                  </div>

                  {/* Desktop divider */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-20 bg-gray-300"></div>
                </div>

                {/* Additional information */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-500 space-y-2">
                    <p>Both payment methods are secure and encrypted for your protection.</p>
                    <p>You will receive a confirmation email once your payment is processed.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact information */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Questions about your payment?{" "}
              <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
