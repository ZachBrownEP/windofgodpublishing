import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wind of God Publishing - Inspiring Faith Through Words",
  description:
    "Professional publishing services for faith-based authors. Manuscript editing, cover design, book formatting, and publishing guidance.",
  keywords: "Christian publishing, faith-based books, manuscript editing, book publishing, religious books",
  authors: [{ name: "Wind of God Publishing" }],
  creator: "Wind of God Publishing",
  publisher: "Wind of God Publishing",
  openGraph: {
    title: "Wind of God Publishing - Inspiring Faith Through Words",
    description:
      "Professional publishing services for faith-based authors. Manuscript editing, cover design, book formatting, and publishing guidance.",
    url: "https://windofgodep.vercel.app",
    siteName: "Wind of God Publishing",
    images: [
      {
        url: "/images/wogp-logo-social-cropped.jpeg",
        width: 1200,
        height: 630,
        alt: "Wind of God Publishing Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wind of God Publishing - Inspiring Faith Through Words",
    description:
      "Professional publishing services for faith-based authors. Manuscript editing, cover design, book formatting, and publishing guidance.",
    images: ["/images/wogp-logo-social-cropped.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
