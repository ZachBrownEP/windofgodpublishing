"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ShoppingCart, BookOpen } from "lucide-react"
import Image from "next/image"
import { useCart } from "./cart-context"

interface Product {
  id: string
  title: string
  price: number
  image: string
  description: string
  features: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
  amazonLink?: string
}

interface QuickViewModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const { dispatch } = useCart()

  if (!isOpen) return null

  const handleAddToCart = () => {
    if (product.amazonLink) {
      // For Amazon products, open the Amazon link
      window.open(product.amazonLink, "_blank", "noopener,noreferrer")
      onClose()
    } else {
      // For regular products, add to cart
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
      })
      dispatch({ type: "OPEN_CART" })
      onClose()
    }
  }

  const getPriceDisplay = () => {
    if (product.price === 0) {
      return {
        price: "FREE",
        subtitle: "no payment required",
        color: "text-green-600",
        buttonColor: "bg-green-600 hover:bg-green-700",
      }
    } else if (product.price === 1) {
      return {
        price: "$1",
        subtitle: "minimal test charge",
        color: "text-orange-600",
        buttonColor: "bg-orange-600 hover:bg-orange-700",
      }
    } else {
      return {
        price: `$${product.price}`,
        subtitle: "one-time payment",
        color: "text-blue-900",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
      }
    }
  }

  const priceInfo = getPriceDisplay()

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-4 md:inset-8 lg:inset-16">
        <Card className="h-full bg-white shadow-xl overflow-hidden">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-xl font-semibold text-blue-900">Quick View</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-0 flex-1 overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4">{product.title}</h3>
                  <p className="text-blue-700 mb-6">{product.description}</p>

                  <div className="space-y-4 mb-8">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-blue-600 mt-1">{feature.icon}</div>
                        <div>
                          <h4 className="font-medium text-blue-800">{feature.title}</h4>
                          <p className="text-blue-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {product.amazonLink ? (
                    <div className="text-center">
                      <span className="text-lg font-medium text-blue-700">Available on Amazon</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={`text-3xl font-bold ${priceInfo.color}`}>{priceInfo.price}</span>
                      <span className="text-blue-600">{priceInfo.subtitle}</span>
                    </div>
                  )}

                  <Button
                    size="lg"
                    className={`w-full text-white ${
                      product.amazonLink ? "bg-orange-600 hover:bg-orange-700" : priceInfo.buttonColor
                    }`}
                    onClick={handleAddToCart}
                  >
                    {product.amazonLink ? (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Buy on Amazon
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
