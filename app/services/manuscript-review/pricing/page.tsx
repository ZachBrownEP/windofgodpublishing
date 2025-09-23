"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Check } from "lucide-react"
import Link from "next/link"
import MainLayout from "@/components/layout"

export default function ManuscriptReviewPricingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-8">Manuscript Review Pricing</h1>
            <p className="text-xl md:text-2xl text-blue-800 leading-relaxed">
              Professional evaluation of your manuscript with detailed feedback on structure, content, and
              marketability.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Simple, Transparent Pricing</h2>
              <p className="text-lg text-blue-800 max-w-2xl mx-auto">
                Our manuscript review service is designed to provide valuable feedback at an affordable price point.
              </p>
            </div>

            <Card className="bg-white border-blue-100 shadow-lg mb-12">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Manuscript Review</h3>
                    <div className="text-4xl font-bold text-blue-900 mb-2">$100</div>
                    <p className="text-blue-700 mb-6">One-time fee</p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-blue-800">Comprehensive manuscript evaluation</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-blue-800">Detailed written feedback report</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-blue-800">30-minute follow-up consultation</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-blue-800">Marketability assessment</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-blue-800">Recommendations for next steps</span>
                      </div>
                    </div>
                    <Link href="/submit-manuscript">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                        Submit Your Manuscript
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-blue-900 mb-4">What's Included</h4>
                    <ul className="space-y-4">
                      <li className="text-blue-800">
                        <strong>Structural Analysis:</strong> Evaluation of plot, character development, pacing, and
                        overall narrative structure
                      </li>
                      <li className="text-blue-800">
                        <strong>Content Feedback:</strong> Assessment of themes, messaging, and alignment with your
                        target audience
                      </li>
                      <li className="text-blue-800">
                        <strong>Marketability Assessment:</strong> Insights on your manuscript's commercial potential
                      </li>
                      <li className="text-blue-800">
                        <strong>Detailed Report:</strong> A comprehensive written evaluation with specific
                        recommendations
                      </li>
                      <li className="text-blue-800">
                        <strong>Follow-up Consultation:</strong> A one-on-one discussion to address your questions
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-100">
              <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">How long does the review process take?</h4>
                  <p className="text-blue-800">
                    Typically 2-3 weeks, depending on the length and complexity of your manuscript.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">What types of manuscripts do you review?</h4>
                  <p className="text-blue-800">
                    We review all genres of fiction and non-fiction, with a specialization in faith-based and
                    inspirational content.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">
                    Is there a word count limit for the review?
                  </h4>
                  <p className="text-blue-800">
                    The standard review covers manuscripts up to 80,000 words. For longer manuscripts, please contact us
                    for custom pricing.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">
                    What happens after I receive my manuscript review?
                  </h4>
                  <p className="text-blue-800">
                    After your review, we'll schedule a follow-up consultation to discuss the feedback and explore
                    options for next steps in your publishing journey, including our other publishing services if
                    desired.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Tally Form Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-3xl font-serif font-bold text-blue-900 mb-8 text-center">Submit Your Manuscript</h2>
            <iframe
              src="https://tally.so/embed/woY57x?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              width="100%"
              height="1200"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Submit Your Manuscript"
              className="rounded-lg w-full"
              style={{
                border: "none",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Need Help?</h2>
            <p className="text-lg text-blue-800 mb-8">
              Have questions about our manuscript review service? We're here to help guide you through the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  Contact Us
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-4"
                >
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
