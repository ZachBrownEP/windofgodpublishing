"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "./cart-context"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { state, dispatch } = useCart()

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Added Testimonials to navigation
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Courses", path: "/courses" },
    { name: "Events", path: "/events" },
    { name: "Featured Authors", path: "/featured-authors" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Store", path: "/store" },
    { name: "Contact", path: "/contact" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/images/wogp-logo.png"
                alt="Wind of God Publishing Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="hidden sm:inline text-xl font-serif font-bold text-blue-900">
                Wind of God Publishing
              </span>
              <span className="sm:hidden text-lg font-serif font-bold text-blue-900">Wind of God</span>
              <p className="text-xs text-blue-700 hidden sm:block">Inspiring Faith Through Words</p>
            </div>
          </Link>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative p-2"
            >
              <ShoppingCart className="w-5 h-5 text-blue-800" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Button>

            {/* Mobile menu button */}
            <button
              className="text-blue-800 hover:text-blue-600 transition-colors p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12m-16.5 5.25h16.5" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm text-blue-800 hover:text-blue-600 transition-colors duration-300 font-medium ${
                    isActive(item.path) ? "text-blue-600 underline underline-offset-4" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Cart and Book Button */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="relative p-2"
              >
                <ShoppingCart className="w-5 h-5 text-blue-800" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>

              <Link href="/contact">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                  Book a Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-blue-100 shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive(item.path) ? "bg-blue-50 text-blue-900 font-medium" : "text-blue-800 hover:bg-blue-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-3 pb-2">
                  <Link href="/contact" className="block w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">Book a Session</Button>
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
