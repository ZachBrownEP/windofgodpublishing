"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, BookOpen, Download, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import Layout from "@/components/layout"
import Link from "next/link"
import { useCart } from "@/components/cart-context"
import { QuickViewModal } from "@/components/quick-view-modal"

const webinarProduct = {
  id: "ready-set-write",
  title: "Ready. Set. Write!!!",
  price: 20,
  image: "/images/ready-set-write-store.png",
  description:
    "A comprehensive webinar designed to help you overcome writer's block, develop your unique voice, and create compelling narratives that resonate with your audience.",
  features: [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Self-Paced Learning",
      description: "Watch at your own convenience",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Comprehensive Content",
      description: "In-depth lessons on writing techniques",
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "Lifetime Access",
      description: "Revisit the material whenever you need",
    },
  ],
}

const touchingHisHemBook = {
  id: "touching-his-hem",
  title: "Touching His Hem: My Journey to Wholeness",
  author: "Mary Elam",
  price: 0, // External purchase via Amazon
  image: "/images/touching-his-hem-book.jpeg",
  amazonLink: "https://a.co/d/dtk95MK",
  description:
    "Declarations and Prayers for Prodigals and Standers. A powerful journey of faith, healing, and restoration with a foreword by Yvette Benton.",
  features: [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Spiritual Guidance",
      description: "Declarations and prayers for healing",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Personal Journey",
      description: "Mary's authentic story of wholeness",
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "Available on Amazon",
      description: "Purchase directly from Amazon",
    },
  ],
}

function StorePageContent() {
  const { dispatch } = useCart()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [paypalLoaded, setPaypalLoaded] = useState(false)

  useEffect(() => {
    // Load PayPal SDK dynamically only for this page
    // const loadPayPalSDK = () => {
    //   if (document.querySelector('script[src*="paypal.com/sdk"]')) {
    //     // SDK already loaded
    //     initializePayPal()
    //     return
    //   }
    //   const script = document.createElement("script")
    //   script.src =
    //     "https://www.paypal.com/sdk/js?client-id=BAAGWMI-KdfnIGDrfVUJFp_620LDO7dbPwjTI-ectNKuLYzyiAtdQfm9BYoyYepC7kKmm6GjKdt8_8fuZY&components=hosted-buttons&enable-funding=venmo&currency=USD"
    //   script.crossOrigin = "anonymous"
    //   script.async = true
    //   script.onload = () => {
    //     setPaypalLoaded(true)
    //     initializePayPal()
    //   }
    //   script.onerror = () => {
    //     console.error("Failed to load PayPal SDK")
    //   }
    //   document.head.appendChild(script)
    // }
    // const initializePayPal = () => {
    //   if (typeof window !== "undefined" && window.paypal) {
    //     try {
    //       window.paypal
    //         .HostedButtons({
    //           hostedButtonId: "6PTEYR569VLG2",
    //         })
    //         .render("#paypal-container-6PTEYR569VLG2")
    //     } catch (error) {
    //       console.error("PayPal initialization error:", error)
    //     }
    //   }
    // }
    // loadPayPalSDK()
    // Cleanup function
    // return () => {
    //   // Remove PayPal SDK script when component unmounts
    //   const script = document.querySelector('script[src*="paypal.com/sdk"]')
    //   if (script) {
    //     script.remove()
    //   }
    // }
  }, [])

  const handleBuyNow = () => {
    // Redirect directly to Stripe checkout for Ready Set Write webinar
    window.open("https://buy.stripe.com/dRm8wRaVDgzigSi1k55Rm05", "_blank", "noopener,noreferrer")
  }

  const openQuickView = (product) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-8">Store</h1>
            <p className="text-xl md:text-2xl text-blue-800 leading-relaxed">
              Discover resources to help you on your writing journey
            </p>
          </div>
        </div>
      </section>

      {/* Featured Webinar */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Featured Webinar</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              Take your writing to the next level with our signature webinar
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-white border-blue-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-full">
                    <Image
                      src="/images/ready-set-write-store.png"
                      alt="Ready. Set. Write!!!"
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain max-h-96"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-blue-900 mb-4">Ready. Set. Write!!!</h3>
                      <p className="text-blue-700 mb-6">
                        A comprehensive webinar designed to help you overcome writer's block, develop your unique voice,
                        and create compelling narratives that resonate with your audience.
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-blue-800">Self-Paced Learning</h4>
                            <p className="text-blue-600 text-sm">Watch at your own convenience</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-blue-800">Comprehensive Content</h4>
                            <p className="text-blue-600 text-sm">In-depth lessons on writing techniques</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Download className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-blue-800">Lifetime Access</h4>
                            <p className="text-blue-600 text-sm">Revisit the material whenever you need</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-lg mb-4">
                        <div className="text-sm font-bold uppercase tracking-wide mb-1">Black Friday Deal!</div>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold">$20</span>
                          <span className="text-lg line-through opacity-75">$35</span>
                          <span className="bg-yellow-400 text-red-800 text-xs font-bold px-2 py-1 rounded">SAVE $15</span>
                        </div>
                        <div className="text-xs mt-2 opacity-90">Limited time: Nov 27-30</div>
                      </div>

                      <div>
                        <Button
                          size="lg"
                          className="bg-red-600 hover:bg-red-700 text-white w-full"
                          onClick={handleBuyNow}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Get Black Friday Deal
                        </Button>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-blue-600 mb-2">Or use PayPal:</p>
                        <div className="mt-4">
                          <style
                            dangerouslySetInnerHTML={{
                              __html: `.pp-6PTEYR569VLG2{text-align:center;border:none;border-radius:0.25rem;min-width:11.625rem;padding:0 2rem;height:2.625rem;font-weight:bold;background-color:#FFD140;color:#000000;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer;}`,
                            }}
                          />
                          <form
                            action="https://www.paypal.com/ncp/payment/6PTEYR569VLG2"
                            method="post"
                            target="_blank"
                            style={{
                              display: "inline-grid",
                              justifyItems: "center",
                              alignContent: "start",
                              gap: "0.5rem",
                            }}
                          >
                            <input className="pp-6PTEYR569VLG2" type="submit" value="Buy Now" />
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
                      </div>

                      <Link href="/courses" passHref>
                        <Button size="lg" variant="ghost" className="w-full text-blue-700 hover:bg-blue-50">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Featured Books</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              Discover inspiring books from our published authors
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-white border-blue-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-8">
                    <Image
                      src="/images/touching-his-hem-book.jpeg"
                      alt="Touching His Hem: My Journey to Wholeness"
                      width={300}
                      height={400}
                      className="w-auto h-96 object-contain shadow-lg rounded-lg"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-blue-900 mb-2">Touching His Hem</h3>
                      <p className="text-lg text-blue-800 mb-2">My Journey to Wholeness</p>
                      <p className="text-blue-700 font-medium mb-4">by Mary Elam</p>
                      <p className="text-sm text-orange-600 mb-6">Foreword by Yvette Benton</p>

                      <p className="text-blue-700 mb-6">
                        Declarations and Prayers for Prodigals and Standers. A powerful journey of faith, healing, and
                        restoration that will inspire and guide you on your own path to wholeness.
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-blue-800">Spiritual Guidance</h4>
                            <p className="text-blue-600 text-sm">Declarations and prayers for healing</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-blue-800">Personal Journey</h4>
                            <p className="text-blue-600 text-sm">Mary's authentic story of wholeness</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Download className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-blue-800">Available on Amazon</h4>
                            <p className="text-blue-600 text-sm">Purchase directly from Amazon</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center">
                        <a
                          href="https://a.co/d/dtk95MK"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Buy on Amazon
                          </Button>
                        </a>
                      </div>

                      <div className="text-center">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-blue-600 text-blue-700 hover:bg-blue-50 bg-transparent"
                          onClick={() => openQuickView(touchingHisHemBook)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Quick View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">More Coming Soon</h2>
            <p className="text-lg text-blue-800 mb-12">
              We're working on expanding our store with books, merchandise, and more resources to support your writing
              journey. Check back soon for updates!
            </p>
          </div>
        </div>
      </section>

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={selectedProduct || webinarProduct}
      />
    </>
  )
}

export default function StorePage() {
  return (
    <Layout>
      <StorePageContent />
    </Layout>
  )
}
