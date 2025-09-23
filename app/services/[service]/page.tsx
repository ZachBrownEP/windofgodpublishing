import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/layout"
import { notFound } from "next/navigation"
import { CustomBookingInterface } from "@/components/custom-booking-interface"

// Updated service data with accurate information
const serviceData = {
  consultation: {
    title: "1 on 1 Consultation",
    description:
      "Personal guidance to discuss your book project, goals, and the best path forward for your publishing journey.",
    image: "/images/consultation.png",
    fullDescription:
      "Authors receive one-on-one consultations that offer personalized guidance and support throughout the publishing journey. Each consultation includes a tailored game plan, addressing the author's unique goals, refining their manuscript, and developing strategies for effective marketing and distribution. The goal is to ensure the author's divine inspiration is fully realized.",
    benefits: [
      "Personalized guidance tailored to your specific project",
      "Tailored game plan for your publishing journey",
      "Manuscript refinement strategies",
      "Marketing and distribution guidance",
      "Support to realize your divine inspiration",
    ],
  },
  "manuscript-review": {
    title: "Manuscript Review",
    description:
      "Professional evaluation of your manuscript with detailed feedback on structure, content, and marketability.",
    image: "/images/manuscript-review.png",
    fullDescription:
      "The manuscript review process ensures that the author's work communicates effectively, flows smoothly, and resonates with its intended audience. Please allow 7-10 business days for the review. Please submit a copy of your manuscript on our services page at the bottom after checkout.",
    benefits: [
      "Comprehensive evaluation of manuscript effectiveness",
      "Assessment of flow and readability",
      "Audience resonance analysis",
      "Professional feedback within 7-10 business days",
      "Detailed written review with actionable insights",
    ],
  },
  "silver-package": {
    title: "Writing & Publishing Coach - Silver Package",
    description:
      "Need guidance but not a full publishing walkthrough? This two-week package is perfect for authors who just need direction.",
    image: "/images/silver-package.png",
    fullDescription:
      "The publishing coach at Wind of God Publishing guides authors through the entire publishing process, from editing to launch. We provide expert advice on editing, design, distribution, and marketing, ensuring each book reaches its full potential and target audience. Committed to reflecting the Father's heart, the coach helps authors bring forth and share the divine inspiration within their works. This package includes two 30 minute Zoom calls per week for two weeks, focusing on answering publishing and writing questions while providing resources on where to publish your manuscript.",
    benefits: [
      "Two 30-minute Zoom calls (one per week)",
      "Answers to your publishing questions",
      "Helpful resources on where and how to publish your manuscript",
    ],
  },
  "gold-package": {
    title: "Writing & Publishing Coach - Gold Package",
    description: "Enhanced coaching with additional support and resources for your publishing journey.",
    image: "/images/gold-package.png",
    fullDescription:
      "The publishing coach at Wind of God Publishing guides authors through the entire publishing process, from editing to launch. We provide expert advice on editing, design, distribution, and marketing, ensuring each book reaches its full potential and target audience. Committed to reflecting the Father's heart, the coach helps authors bring forth and share the divine inspiration within their works. This package includes four 1-hour Zoom calls per week for four weeks, preparing your manuscript for publishing and providing comprehensive resources.",
    benefits: [
      "One 45-minute Zoom call each week (4 total)",
      "Guidance to prepare your manuscript for publishing",
      "Resources for formatting your book and designing your cover",
      "Step-by-step support to upload your book for publishing",
    ],
  },
  "diamond-package": {
    title: "Writing & Publishing Coach - Diamond Package",
    description: "Premium coaching experience with extensive support and personalized guidance.",
    image: "/images/diamond-package.png",
    fullDescription:
      "The publishing coach at Wind of God Publishing guides authors through the entire publishing process, from editing to launch. We provide expert advice on editing, design, distribution, and marketing, ensuring each book reaches its full potential and target audience. Committed to reflecting the Father's heart, the coach helps authors bring forth and share the divine inspiration within their works. This package includes six 1-hour Zoom calls per week for six weeks, covering the complete publishing process.",
    benefits: [
      "Six weekly 60-minute Zoom calls",
      "Hands-on help to prepare your manuscript for publishing",
      "Full walkthrough of the publishing process",
      "Resources for formatting and professional book cover completion",
      "Guidance on securing your copyright and assigning your ISBN",
    ],
  },
  "platinum-package": {
    title: "Writing & Publishing Coach - Platinum Package",
    description: "Our most comprehensive coaching package with full-service support from concept to publication.",
    image: "/images/platinum-package.png",
    fullDescription:
      "The publishing coach at Wind of God Publishing guides authors through the entire publishing process, from editing to launch. We provide expert advice on editing, design, distribution, and marketing, ensuring each book reaches its full potential and target audience. Committed to reflecting the Father's heart, the coach helps authors bring forth and share the divine inspiration within their works. <strong>In this premium package, the publisher completes the entire publishing process for you.</strong>",
    benefits: [
      "Editing for up to 30,000 words",
      "Manuscript preparation",
      "Copyright and ISBN assignment",
      "Custom book cover design (paperback & eBook)",
      "Basic interior formatting for eBook and paperback",
      "Interior title page creation",
      "3D book mock-up and new release flyer",
      "Upload and setup on Amazon KDP",
      "Ongoing author support throughout the process",
    ],
  },
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const service = serviceData[params.service as keyof typeof serviceData]

  if (!service) {
    notFound()
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/services" className="inline-flex items-center text-blue-700 hover:text-blue-600 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-4">{service.title}</h1>
            {/* Add Available Online Badge under the title */}
            <div className="flex items-center mb-6">
              <div className="bg-green-600 text-white px-3 py-2 rounded-full flex items-center text-sm font-medium">
                <Globe className="w-4 h-4 mr-2" />
                Available Online
              </div>
            </div>
            <p className="text-xl text-blue-800 leading-relaxed">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-100">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-blue-900 mb-6">About This Service</h2>
              <div
                dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                className="text-lg text-blue-800 leading-relaxed mb-8"
              />
              <Link href={`/services/${params.service}/pricing`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  View Pricing Details
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Service Benefits</h2>
              <p className="text-lg text-blue-800">How this service will help you achieve your publishing goals.</p>
            </div>

            <Card className="bg-white border-blue-100 shadow-lg">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-blue-800">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Calendar - Added for all services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-blue-900 mb-8 text-center">Schedule Your Session</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <CustomBookingInterface serviceType={params.service} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-blue-800 mb-8">
              {params.service === "silver-package" &&
                "If you're feeling stuck or unsure of your next step, this package will help you move forward with clarity and confidence."}
              {params.service === "gold-package" &&
                "You don't have to navigate this journey alone, let's get your book ready to release into the world!"}
              {params.service === "diamond-package" &&
                "You don't have to do this alone, let's walk through it together and get your book ready to impact lives!"}
              {params.service === "platinum-package" &&
                "Everything you need to get your book published with confidence and excellence."}
              {!["silver-package", "gold-package", "diamond-package", "platinum-package"].includes(params.service) &&
                `Take the next step in your publishing journey with our ${service.title} service.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/services/${params.service}/pricing`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  View Pricing
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-4"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
