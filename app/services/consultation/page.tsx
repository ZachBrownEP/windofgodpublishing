import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CustomBookingInterface } from "@/components/custom-booking-interface"
import Layout from "@/components/layout"

export default function ConsultationPage() {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        {/* Back to Services */}
        <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Services
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">1 on 1 Consultation</h1>
          <Badge className="bg-green-500 text-white mb-4">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Available Online
          </Badge>
          <p className="text-gray-600 text-lg">
            Personal guidance to discuss your book project, goals, and the best path forward for your publishing
            journey.
          </p>
        </div>

        {/* About This Service Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <Image
              src="/images/consultation.png"
              alt="1 on 1 Consultation"
              width={400}
              height={300}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
            <p className="text-gray-700 mb-6">
              Authors receive one-on-one consultations that offer personalized guidance and support throughout the
              publishing journey. Each consultation includes a tailored game plan, addressing the author's unique goals,
              refining their manuscript, and developing strategies for effective marketing and distribution. The goal is
              to ensure the author's divine inspiration is fully realized.
            </p>
            <Link href="/services/consultation/pricing">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                View Pricing Details
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>

        {/* Service Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Service Benefits</h2>
          <p className="text-center text-gray-600 mb-8">How this service will help you achieve your publishing goals</p>

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

        {/* Booking Calendar */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <CustomBookingInterface />
        </div>
      </div>
    </Layout>
  )
}
