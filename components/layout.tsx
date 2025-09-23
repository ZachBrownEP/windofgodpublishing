"use client"

import type React from "react"
import { Facebook } from "lucide-react"
import Link from "next/link"
import { CartProvider } from "./cart-context"
import { CartSidebar } from "./cart-sidebar"
import Image from "next/image"
import Navigation from "./navigation"

interface LayoutProps {
  children: React.ReactNode
}

function LayoutContent({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Content - Add top padding to account for fixed header */}
      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
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
                  <h3 className="text-xl font-serif font-bold">Wind of God Publishing</h3>
                  <p className="text-blue-200 text-sm">Inspiring Faith Through Words</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm">
                Dedicated to helping authors share their faith-inspired stories with the world.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/featured-authors" className="hover:text-white transition-colors">
                    Featured Authors
                  </Link>
                </li>
                <li>
                  <Link href="/store" className="hover:text-white transition-colors">
                    Store
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <Link href="/services/manuscript-review" className="hover:text-white transition-colors">
                    Manuscript Review
                  </Link>
                </li>
                <li>
                  <Link href="/services/consultation" className="hover:text-white transition-colors">
                    Author Consultation
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Publishing Services
                  </Link>
                </li>
                <li>
                  <Link href="/submit-manuscript" className="hover:text-white transition-colors">
                    Submit Manuscript
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="mb-6">
                <a
                  href="https://www.facebook.com/people/Wind-of-God-Publishing/61558133978618/?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Follow us on Facebook</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200 text-sm">
                © {new Date().getFullYear()} Wind of God Publishing. All rights reserved.
              </p>
              <div className="mt-2 md:mt-0 flex items-center space-x-4">
                <Link href="/privacy-policy" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-blue-300">•</span>
                <a
                  href="https://www.zachbrownep.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white text-sm transition-colors"
                >
                  Site Credit
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CartSidebar />
    </div>
  )
}

export default function Layout({ children }: LayoutProps) {
  return (
    <CartProvider>
      <LayoutContent>{children}</LayoutContent>
    </CartProvider>
  )
}
