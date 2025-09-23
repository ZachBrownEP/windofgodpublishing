"use client"

import type React from "react"

import { useCart } from "./cart-context"
import { useEffect, useState } from "react"

export function CartLoader({ children }: { children: React.ReactNode }) {
  const { state } = useCart()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Give a moment for localStorage to load
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <>{children}</>
}
