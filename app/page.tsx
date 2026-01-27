"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ChevronRight, BookOpen, Users, Video, Clock, PenTool, FileSearch, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Layout from "@/components/layout"

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/images/hero-background.avif')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/80 rounded-full mb-6 shadow-lg">
              <Image
                src="/images/wogp-logo.png"
                alt="Wind of God Publishing Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-blue-900 mb-6 leading-tight">
              We publish books that are
              <br />
              <span className="text-blue-700">God BREATHED</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-800 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our mission is to release Spirit-led books that carry the breath of God, bringing healing, deliverance,
              and transformation to the nations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit-manuscript">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Submit Your Manuscript
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-6">
              Why Choose Wind of God Publishing?
            </h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              Because we do more than publish, we equip. As a prophetic writing coach, we help you birth your God given
              message with clarity and boldness. Through detailed manuscript reviews, publishing services, and
              Spirit-led marketing strategies, we walk with you from idea to impact. Every step is covered in prayer,
              guided by the Holy Spirit, and aligned with Kingdom purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Professional Publishing</h3>
                <p className="text-blue-700">Complete publishing packages from consultation to final publication</p>
                <Link href="/services" className="inline-block mt-4">
                  <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                    View Services
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Faith-Centered</h3>
                <p className="text-blue-700">Every project guided by Christian values and principles</p>
                <Link href="/about" className="inline-block mt-4">
                  <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                    Our Mission
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Expert Guidance</h3>
                <p className="text-blue-700">Personalized support throughout your entire publishing journey</p>
                <Link href="/contact" className="inline-block mt-4">
                  <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Course Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-6">Featured Course</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              Break through spiritual resistance and finish your book
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-white border-blue-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/images/unstuck-course.jpg"
                    alt="Unstuck: Breaking the Spiritual Resistance to Finish Your Book"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div>
                  <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    Live Mini-Course
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-blue-900 mb-4">Unstuck</h3>
                  <p className="text-lg text-blue-800 mb-2">Breaking the Spiritual Resistance to Finish Your Book</p>
                  <p className="text-blue-700 mb-6">
                    You didn't lose the call. You encountered resistance. If you started your book in obedience but now feel stuck, discouraged, or unsure how to move forward, this isn't a writing problem—it's a spiritual one. This focused, Spirit-led mini-course will help you identify what's really blocking your manuscript and realign with God's original instruction.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-700">March 26, 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-700">Live via Zoom</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/courses">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Learn More
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <a href="https://buy.stripe.com/bJe8wR8Nv3MwdG6geZ5Rm06" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-blue-600 text-blue-700 hover:bg-blue-50"
                      >
                        Enroll Now - $37
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <PenTool className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4 underline">Writing & Publishing Coach</h3>
              <p className="text-blue-700 leading-relaxed">
                Our writing and publishing coaching services provide personalized guidance and support to help authors
                develop their manuscripts and achieve writing goals in addition to assisting authors throughout the
                entire publishing process providing expert guidance and support every step of the way.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileSearch className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4 underline">Manuscript Review</h3>
              <p className="text-blue-700 leading-relaxed">
                Our manuscript review offers a thorough and insightful manuscript review service, providing authors with
                constructive feedback to enhance the quality of their work.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4 underline">Strategic Game Plan</h3>
              <p className="text-blue-700 leading-relaxed">
                Our personalized consultations offer professional guidance to authors, assisting them in crafting
                strategic game plans and developing effective publishing strategies.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                View All Services
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Share Your Story?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step in your publishing journey. Whether you're just starting or ready to publish, we're here
            to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 text-lg font-semibold"
              >
                Start with Our Course
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg bg-transparent"
              >
                Explore Writing & Publishing Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
