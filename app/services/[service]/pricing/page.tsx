import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ArrowLeft, Clock, Video, Calendar } from "lucide-react"
import Link from "next/link"
import Layout from "@/components/layout"
import { notFound } from "next/navigation"
import { CustomBookingInterface } from "@/components/custom-booking-interface"

// Updated pricing data with accurate information
const pricingData = {
  consultation: {
    title: "1 on 1 Consultation",
    duration: "1 hour",
    price: "$97",
    communication: "Zoom",
    description:
      "Authors receive one-on-one consultations that offer personalized guidance and support throughout the publishing journey. Each consultation includes a tailored game plan, addressing the author's unique goals, refining their manuscript, and developing strategies for effective marketing and distribution. The goal is to ensure the author's divine inspiration is fully realized.",
    cancellationPolicy:
      "Client or Coach may, from time to time, need to cancel or reschedule any of the coaching meetings. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Client is responsible for the cancellation or reschedule, Client agrees to notify Coach no less than 24 hours prior to the scheduled meeting. If Client cancels or reschedules within the 24-hour period, Client agrees to pay the full amount required for the meeting, if requested by Coach (at Coach's sole and exclusive discretion). The Parties will then attempt to reschedule the meeting in good faith.",
  },
  "manuscript-review": {
    title: "Manuscript Review",
    duration: "1 hour consultation + 7-10 business days for review",
    price: "$100",
    communication: "Zoom consultation + written review",
    description:
      "The manuscript review process ensures that the author's work communicates effectively, flows smoothly, and resonates with its intended audience. Please allow 7-10 business days for the review. Please submit a copy of your manuscript on our services page at the bottom after checkout.",
    cancellationPolicy:
      "Reviews are non-refundable once the manuscript has been submitted and review process has begun. Consultation calls follow the standard 24-hour cancellation policy.",
  },
  "silver-package": {
    title: "Writing & Publishing Coach - Silver Package",
    duration: "Two 30 minute calls per week for 2 weeks",
    price: "$397",
    communication: "Zoom sessions",
    description:
      "The publishing coach at Wind of God Publishing guides authors through the entire publishing process, from editing to launch. We provide expert advice on editing, design, distribution, and marketing, ensuring each book reaches its full potential and target audience. Committed to reflecting the Father's heart, the coach helps authors bring forth and share the divine inspiration within their works. Ask publishing questions and/or writing questions, no walk-through of the publishing process. Provide resources on where to publish manuscript.",
    cancellationPolicy:
      "Client or Coach may, from time to time, need to cancel or reschedule any of the coaching meetings. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Client is responsible for the cancellation or reschedule, Client agrees to notify Coach no less than 24 hours prior to the scheduled meeting. If Client cancels or reschedules within the 24-hour period, Client agrees to pay the full amount required for the meeting, if requested by Coach (at Coach's sole and exclusive discretion). The Parties will then attempt to reschedule the meeting in good faith.",
  },
  "gold-package": {
    title: "Writing & Publishing Coach - Gold Package",
    duration: "One 45-minute call per week for 4 weeks",
    price: "$597",
    communication: "Zoom sessions",
    description:
      "The publishing coach at Wind of God Publishing guides authors through the entire publishing process, from editing to launch. We provide expert advice on editing, design, distribution, and marketing, ensuring each book reaches its full potential and target audience. Committed to reflecting the Father's heart, the coach helps authors bring forth and share the divine inspiration within their works. Prepare a manuscript for publishing. Provide resources on how to format book, book cover, and walk through uploads for publishing.",
    cancellationPolicy:
      "Client or Coach may, from time to time, need to cancel or reschedule any of the coaching meetings. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Client is responsible for the cancellation or reschedule, Client agrees to notify Coach no less than 24 hours prior to the scheduled meeting. If Client cancels or reschedules within the 24-hour period, Client agrees to pay the full amount required for the meeting, if requested by Coach (at Coach's sole and exclusive discretion). The Parties will then attempt to reschedule the meeting in good faith.",
  },
  "diamond-package": {
    title: "Writing & Publishing Coach - Diamond Package",
    duration: "Six 1-hour calls per week for 6 weeks",
    price: "$1,397",
    communication: "Zoom sessions",
    description:
      "The publishing coach at Wind of God Publishing guides authors through the entire publishing process, from editing to launch. We provide expert advice on editing, design, distribution, and marketing, ensuring each book reaches its full potential and target audience. Committed to reflecting the Father's heart, the coach helps authors bring forth and share the divine inspiration within their works. Prepare manuscript for publishing, complete publishing process, resources for formatting, book cover completion. Walkthrough how to complete copyright & ISBN.",
    cancellationPolicy:
      "Client or Coach may, from time to time, need to cancel or reschedule any of the coaching meetings. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Client is responsible for the cancellation or reschedule, Client agrees to notify Coach no less than 24 hours prior to the scheduled meeting. If Client cancels or reschedules within the 24-hour period, Client agrees to pay the full amount required for the meeting, if requested by Coach (at Coach's sole and exclusive discretion). The Parties will then attempt to reschedule the meeting in good faith.",
  },
  "platinum-package": {
    title: "Writing & Publishing Coach - Platinum Package",
    duration: "Full-service publishing completion",
    price: "$2,397",
    communication: "Zoom coordination meetings as needed",
    description:
      "The publishing coach at Wind of God Publishing guides authors through the entire publishing process, from editing to launch. We provide expert advice on editing, design, distribution, and marketing, ensuring each book reaches its full potential and target audience. Committed to reflecting the Father's heart, the coach helps authors bring forth and share the divine inspiration within their works. Publisher completes entire publishing process.",
    cancellationPolicy:
      "Client or Coach may, from time to time, need to cancel or reschedule any of the coaching meetings. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Coach is responsible for the reschedule, Coach will become available to Client as the soonest possible opportunity within 2 business days. If Client is responsible for the cancellation or reschedule, Client agrees to notify Coach no less than 24 hours prior to the scheduled meeting. If Client cancels or reschedules within the 24-hour period, Client agrees to pay the full amount required for the meeting, if requested by Coach (at Coach's sole and exclusive discretion). The Parties will then attempt to reschedule the meeting in good faith.",
  },
}

export default function ServicePricingPage({ params }: { params: { service: string } }) {
  const pricing = pricingData[params.service as keyof typeof pricingData]

  if (!pricing) {
    notFound()
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/services/${params.service}`}
              className="inline-flex items-center text-blue-700 hover:text-blue-600 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Service Details
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-6">{pricing.title} - Pricing</h1>
            <p className="text-xl text-blue-800 leading-relaxed">Investment in your publishing journey</p>
          </div>
        </div>
      </section>

      {/* Pricing Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-blue-900">{pricing.price}</span>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Clock className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-900 mb-1">Duration</h3>
                    <p className="text-blue-700 text-sm">{pricing.duration}</p>
                  </div>

                  <div className="text-center">
                    <Video className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-900 mb-1">Communication</h3>
                    <p className="text-blue-700 text-sm">{pricing.communication}</p>
                  </div>

                  <div className="text-center">
                    <Calendar className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-900 mb-1">Scheduling</h3>
                    <p className="text-blue-700 text-sm">Flexible booking</p>
                  </div>
                </div>

                <div className="border-t border-blue-100 pt-8 mb-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Service Description</h3>
                  <p className="text-blue-800 leading-relaxed">{pricing.description}</p>
                </div>

                <div className="border-t border-blue-100 pt-8 mb-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Cancellation Policy</h3>
                  <p className="text-blue-800 leading-relaxed">{pricing.cancellationPolicy}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Interface - Added for all services */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-blue-900 mb-8 text-center">Schedule Your Session</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <CustomBookingInterface serviceType={params.service} />
            </div>
          </div>
        </div>
      </section>

      {/* Package Comparison for Coaching Services */}
      {params.service.includes("package") && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Compare Coaching Packages</h2>
                <p className="text-lg text-blue-800">Choose the package that best fits your publishing needs</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-white border-blue-100">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Silver Package</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-2">$397</p>
                    <p className="text-blue-700 text-sm mb-4">2 weeks • 2 calls/week</p>
                    <p className="text-blue-600 text-xs">Q&A and resources</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-blue-100">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Gold Package</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-2">$597</p>
                    <p className="text-blue-700 text-sm mb-4">4 weeks • 1 call/week</p>
                    <p className="text-blue-600 text-xs">Manuscript prep + walkthrough</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-blue-100">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Diamond Package</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-2">$1,397</p>
                    <p className="text-blue-700 text-sm mb-4">6 weeks • 6 calls/week</p>
                    <p className="text-blue-600 text-xs">Complete process + copyright</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-blue-100">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Platinum Package</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-2">$2,397</p>
                    <p className="text-blue-700 text-sm mb-4">Full-service</p>
                    <p className="text-blue-600 text-xs">We do everything for you</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <Card className="bg-white border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">How do I schedule my sessions?</h3>
                  <p className="text-blue-800">
                    After booking, you'll receive a link to our scheduling system where you can select times that work
                    best for you. We'll confirm your appointments within 24 hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    What should I prepare before our first session?
                  </h3>
                  <p className="text-blue-800">
                    It's helpful to have a clear idea of your book concept, any existing material you've written, and
                    specific questions or challenges you'd like to address. We'll send you a pre-session questionnaire
                    to help you prepare.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Can I upgrade my package later?</h3>
                  <p className="text-blue-800">
                    Yes! If you find you need additional support, you can upgrade to a more comprehensive package at any
                    time. We'll apply the value of your current package toward the upgrade.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">What payment methods do you accept?</h3>
                  <p className="text-blue-800">
                    We accept all major credit cards, PayPal, and bank transfers. For larger packages, we offer flexible
                    payment plans to help make the investment more manageable. Contact us to discuss payment
                    arrangements that work for your budget.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Are payment plans available?</h3>
                  <p className="text-blue-800">
                    Yes! We offer flexible payment plans for all coaching packages to make our services more accessible.
                    For packages over $500, we can arrange 2-3 month payment plans. Contact us to discuss a payment
                    arrangement that works for your budget.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">
              Ready to Begin Your Publishing Journey?
            </h2>
            <p className="text-lg text-blue-800 mb-8">
              Take the first step toward bringing your book to life with our expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  Book Now
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-4"
                >
                  Ask a Question
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
