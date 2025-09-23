"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Palette, Compass, ChevronRight, Clock, Video, CreditCard, Users, BookOpen, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import MainLayout from "@/components/layout"

export default function ServicesPage() {
  const [manuscriptForm, setManuscriptForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selectedService: "",
    manuscript: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const services = [
    {
      id: "consultation",
      title: "1 on 1 Consultation",
      icon: Users,
      description:
        "Personal guidance to discuss your book project, goals, and the best path forward for your publishing journey.",
      image: "/images/consultation.png",
    },
    {
      id: "manuscript-review",
      title: "Manuscript Review",
      icon: Edit,
      description:
        "Professional evaluation of your manuscript with detailed feedback on structure, content, and marketability.",
      image: "/images/manuscript-review.png",
    },
    {
      id: "silver-package",
      title: "Writing & Publishing Coach - Silver Package",
      icon: Compass,
      description: "Essential coaching support to guide you through the writing and publishing process.",
      image: "/images/silver-package.png",
    },
    {
      id: "gold-package",
      title: "Writing & Publishing Coach - Gold Package",
      icon: Compass,
      description: "Enhanced coaching with additional support and resources for your publishing journey.",
      image: "/images/gold-package.png",
    },
    {
      id: "diamond-package",
      title: "Writing & Publishing Coach - Diamond Package",
      icon: Compass,
      description: "Premium coaching experience with extensive support and personalized guidance.",
      image: "/images/diamond-package.png",
    },
    {
      id: "platinum-package",
      title: "Writing & Publishing Coach - Platinum Package",
      icon: Compass,
      description: "Our most comprehensive coaching package with full-service support from concept to publication.",
      image: "/images/platinum-package.png",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setManuscriptForm((prev) => ({ ...prev, [name]: value }))
    if (submitError) setSubmitError(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setManuscriptForm((prev) => ({ ...prev, manuscript: file }))
    if (submitError) setSubmitError(null)
  }

  const validateForm = () => {
    if (!manuscriptForm.firstName.trim()) {
      setSubmitError("First name is required")
      return false
    }
    if (!manuscriptForm.lastName.trim()) {
      setSubmitError("Last name is required")
      return false
    }
    if (!manuscriptForm.email.trim()) {
      setSubmitError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(manuscriptForm.email)) {
      setSubmitError("Please enter a valid email address")
      return false
    }
    if (!manuscriptForm.selectedService) {
      setSubmitError("Please select a service")
      return false
    }
    if (!manuscriptForm.manuscript) {
      setSubmitError("Please upload your manuscript")
      return false
    }

    // Check file size (15MB limit)
    if (manuscriptForm.manuscript.size > 15 * 1024 * 1024) {
      setSubmitError("File size must be less than 15MB")
      return false
    }

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]
    if (!allowedTypes.includes(manuscriptForm.manuscript.type)) {
      setSubmitError("Please upload a PDF, Word document, or text file")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("firstName", manuscriptForm.firstName)
      formData.append("lastName", manuscriptForm.lastName)
      formData.append("email", manuscriptForm.email)
      formData.append("selectedService", manuscriptForm.selectedService)
      formData.append("manuscript", manuscriptForm.manuscript!)

      const response = await fetch("/api/submit-manuscript", {
        method: "POST",
        body: formData,
      })

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error Response:", errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to submit manuscript")
      }

      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitError(error instanceof Error ? error.message : "An error occurred during submission")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedServiceDetails = services.find((s) => s.id === manuscriptForm.selectedService)

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-8">Our Services</h1>
            <div className="text-xl md:text-2xl text-blue-800 leading-relaxed space-y-4">
              <p>At Wind of God Publishing, we guide you from manuscript to marketplace.</p>
              <p>
                Our services include writing support, professional editing, custom cover design, interior formatting,
                and publishing assistance for both print and digital books. Whether you're starting from scratch or
                polishing your final draft, we're here to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">How We Support Your Journey</h2>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-100 mb-12">
              <p className="text-lg text-blue-800 leading-relaxed mb-6">
                At Wind of God Publishing, we offer a range of services designed to support you at every stage of the
                publishing process, starting with manuscript development. We provide assistance with writing your
                manuscript, offering guidance and feedback to help you craft a compelling and well-structured document.
              </p>
              <p className="text-lg text-blue-800 leading-relaxed mb-6">
                Our editorial services then refine your work through developmental editing, copyediting, and
                proofreading to enhance clarity and quality. We also provide expert design and layout services, crafting
                eye-catching book covers, formatting for both print and digital editions, and designing interiors for
                visual appeal and readability.
              </p>
              <p className="text-lg text-blue-800 leading-relaxed">
                We can assist in all aspects of book creation from manuscript creation to publication. Let us guide you
                through this process successfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Our Publishing Services</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              Select the service that best fits your needs and publishing goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-white border-blue-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-contain bg-gradient-to-br from-blue-50 to-white"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{service.title}</h3>
                    {/* Add Available Online Badge under the title */}
                    <div className="flex items-center mb-3">
                      <div className="bg-green-600 text-white px-2 py-1 rounded-full flex items-center text-xs font-medium">
                        <Globe className="w-3 h-3 mr-1" />
                        Available Online
                      </div>
                    </div>
                    <p className="text-blue-700 mb-6">{service.description}</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href={`/services/${service.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-blue-600 text-blue-700 hover:bg-blue-50">
                          Read More
                        </Button>
                      </Link>
                      <Link href={`/services/${service.id}/pricing`} className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Pricing</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Our Service Process</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">How we work with you to bring your book to life</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-500 to-blue-500"></div>
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Consultation</h3>
                <p className="text-blue-700 text-sm">Initial meeting to discuss your vision and goals</p>
              </div>

              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit className="w-10 h-10 text-white" />
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-500 to-blue-500"></div>
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Development</h3>
                <p className="text-blue-700 text-sm">Crafting and refining your manuscript</p>
              </div>

              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-10 h-10 text-white" />
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-500 to-blue-500"></div>
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Design</h3>
                <p className="text-blue-700 text-sm">Creating covers and formatting your book</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Publication</h3>
                <p className="text-blue-700 text-sm">Bringing your book to market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">What's Included</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">Common features across our service packages</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white border-blue-100">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Dedicated Time</h3>
                <p className="text-blue-700 text-sm">Scheduled sessions focused entirely on your project</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100">
              <CardContent className="p-6 text-center">
                <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Zoom Meetings</h3>
                <p className="text-blue-700 text-sm">Face-to-face virtual guidance and support</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100">
              <CardContent className="p-6 text-center">
                <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Clear Pricing</h3>
                <p className="text-blue-700 text-sm">Transparent costs with no hidden fees</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Personal Support</h3>
                <p className="text-blue-700 text-sm">Direct access to experienced publishing professionals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Manuscript Submission Form */}
      {/* Embedded Tally Form Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-[700px] mx-auto">
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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-blue-800 mb-8">
              Let's discuss your project and how we can help bring your faith-inspired message to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  Schedule a Consultation
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
    </MainLayout>
  )
}
