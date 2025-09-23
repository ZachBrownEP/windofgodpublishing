"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MainLayout from "@/components/layout"
import Image from "next/image"
import { CustomBookingInterface } from "@/components/custom-booking-interface"

export default function ManuscriptReviewPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">Available Online</Badge>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-6">Manuscript Review</h1>
            <p className="text-xl text-blue-800 leading-relaxed max-w-2xl mx-auto">
              Professional evaluation of your manuscript with detailed feedback on structure, content, and
              marketability.
            </p>
          </div>
        </div>
      </section>

      {/* About This Service */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="/images/manuscript-review.png"
                  alt="Manuscript Review Service"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold text-blue-900 mb-6">About This Service</h2>
                <p className="text-lg text-blue-800 mb-6 leading-relaxed">
                  The Manuscript Review process ensures that the author's work communicates effectively, flows smoothly,
                  and resonates with its intended audience. Please allow 7-10 business days for the completion of this
                  service. You will receive a detailed report and be able to schedule a consultation call for the next
                  steps.
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => (window.location.href = "/submit-manuscript")}
                >
                  Start Booking Process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Benefits */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Service Benefits</h2>
            <p className="text-center text-gray-600 mb-8">
              How this service will help you achieve your publishing goals
            </p>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Personalized guidance tailored to your specific project</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Tailored game plan for your publishing journey</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Manuscript refinement strategies</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Marketing and distribution guidance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Support to realize your divine inspiration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-blue-900 mb-8">Our Process</h2>
            <p className="text-lg text-blue-800 leading-relaxed">
              After submitting your manuscript, our experienced editors will carefully review your work, typically
              within 7-10 business days depending on length and complexity. You'll receive a detailed written report
              followed by a scheduled consultation to discuss the feedback and potential next steps for your publishing
              journey.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Your Session */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-blue-900 mb-12 text-center">Schedule Your Session</h2>
            <CustomBookingInterface serviceType="manuscript-review" />
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
    </MainLayout>
  )
}
