"use client"

import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Minus, Plus, ShoppingCart, Trash2, CreditCard, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartSidebar() {
  const { state, dispatch } = useCart()

  if (!state.isOpen) return null

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => dispatch({ type: "CLOSE_CART" })} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6 mr-3" />
              <div>
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <p className="text-blue-100 text-sm">
                  {state.items.length} {state.items.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6 max-w-sm">
                  Start adding items to your cart to see them here. Browse our store for amazing digital products!
                </p>
                <Button
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <Card key={item.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover object-center"
                          />
                          {item.quantity > 1 && (
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600">
                              {item.quantity}
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{item.title}</h3>
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-lg font-bold text-gray-900">
                              {item.price === 0 ? (
                                <span className="text-green-600">FREE</span>
                              ) : (
                                `$${item.price.toFixed(2)}`
                              )}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-500 hover:bg-red-50 p-1 h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-sm font-medium text-gray-600">
                              Total: {item.price === 0 ? "Free" : `$${(item.price * item.quantity).toFixed(2)}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-6">
              {/* Cart Total */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-blue-900">{state.total === 0 ? "FREE" : `$${state.total.toFixed(2)}`}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {state.total > 0
                    ? "Shipping and taxes calculated at checkout."
                    : "No payment required for free items."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/checkout" className="block">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-semibold shadow-lg"
                    onClick={() => dispatch({ type: "CLOSE_CART" })}
                  >
                    <div className="flex items-center justify-center">
                      {state.total === 0 ? (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Complete Free Order
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Secure Checkout
                        </>
                      )}
                    </div>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Security Badge */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center text-xs text-gray-500">
                  <Lock className="w-3 h-3 mr-1" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
