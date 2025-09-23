"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Video, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomBookingInterface } from "@/components/custom-booking-interface"
import Layout from "@/components/layout"

export default function ConsultationPricingPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/services/consultation" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Service Details
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">1 on 1 Consultation - Pricing</h1>
            <p className="text-blue-600">Investment in your publishing journey</p>
          </div>

          {/* Pricing Card */}
          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-900 mb-6">$97</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Duration</h3>
                  <p className="text-gray-600">1 hour</p>
                </div>

                <div className="text-center">
                  <Video className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Communication</h3>
                  <p className="text-gray-600">Zoom</p>
                </div>

                <div className="text-center">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Scheduling</h3>
                  <p className="text-gray-600">Flexible booking</p>
                </div>
              </div>
            </div>

            {/* Service Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Description</h3>
              <p className="text-gray-700 leading-relaxed">
                Authors receive one-on-one consultations that offer personalized guidance and support throughout the
                publishing journey. Each consultation includes a tailored game plan, addressing the author's unique
                goals, refining their manuscript, and developing strategies for effective marketing and distribution.
                The goal is to ensure the author's divine inspiration is fully realized.
              </p>
            </div>

            {/* Terms */}
            <div className="text-sm text-gray-600 mb-6">
              <p>
                <strong>Cancellation Policy:</strong> If you need to cancel or reschedule, please provide at least 24
                hour period, Client agrees to pay the full amount required for the meeting, if requested by Coach (at
                Coach's sole and exclusive discretion). The Parties will then attempt to reschedule the meeting in good
                faith.
              </p>
            </div>
          </div>

          {/* Booking Interface */}
          <div className="mb-8">
            <CustomBookingInterface />
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">How do I schedule my sessions?</h3>
                <p className="text-gray-700">
                  After booking, you'll receive a link to our scheduling system where you can select times that work
                  best for you. We'll confirm your appointments within 24 hours.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">What should I prepare before our first session?</h3>
                <p className="text-gray-700">
                  It's helpful to have a clear idea of your book concept, any existing material you've written, and
                  specific questions or challenges you'd like to address. We'll send you a pre-session questionnaire to
                  help you prepare.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">Can I upgrade my package later?</h3>
                <p className="text-gray-700">
                  Yes! If you find you need additional support, you can upgrade to a more comprehensive package at any
                  time.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-700">
                  We accept all major credit cards, PayPal, and bank transfers. For larger packages, we offer flexible
                  payment plans to help make the investment more manageable. Contact us to discuss payment arrangements
                  that work for your budget.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">Are payment plans available?</h3>
                <p className="text-gray-700">
                  Yes! We offer flexible payment plans for all coaching packages to make our services more accessible.
                  For packages over $500, we can arrange 2-3 month payment plans. Contact us to discuss a payment
                  arrangement that works for your budget.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Publishing Journey?</h2>
            <p className="text-blue-100 mb-6">
              Take the first step toward bringing your book to life with our expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() =>
                  window.open(
                    "https://app.acuityscheduling.com/schedule.php?owner=29289453&appointmentType=79659765",
                    "_blank",
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Book Now →
              </Button>
              <Button
                onClick={() => (window.location.href = "/contact")}
                variant="outline"
                className="bg-amber-400 text-white hover:bg-amber-500 hover:text-white px-8 py-3"
              >
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
