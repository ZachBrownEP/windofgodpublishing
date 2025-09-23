"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Mail, MapPin } from "lucide-react"
import Layout from "@/components/layout"
import { useState } from "react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/xanjjelz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        form.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-8">Get In Touch</h1>
            <p className="text-xl md:text-2xl text-blue-800 leading-relaxed">
              Ready to begin your publishing journey? We'd love to hear from you and discuss how we can help bring your
              faith-inspired message to the world.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-serif font-bold text-blue-900 mb-6">Send us a message</h2>

                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">
                        ✅ Message sent successfully! We'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium">
                        ❌ There was an error sending your message. Please try again or email us directly.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-blue-800 font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your first name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-blue-800 font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your last name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-blue-800 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-blue-800 font-medium mb-2">Project Type</label>
                      <select
                        name="projectType"
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select a service</option>
                        <option value="1-on-1-consultation">1-on-1 Consultation</option>
                        <option value="manuscript-review">Manuscript Review</option>
                        <option value="silver-package">Silver Package</option>
                        <option value="gold-package">Gold Package</option>
                        <option value="platinum-package">Platinum Package</option>
                        <option value="diamond-package">Diamond Package</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-blue-800 font-medium mb-2">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                        required
                        disabled={isSubmitting}
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 w-5 h-5" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-blue-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Email</h3>
                      <p className="text-blue-800">windofgodpublishing@gmail.com</p>
                      <p className="text-blue-600 text-sm">We respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Address</h3>
                      <p className="text-blue-800">91-1121 Keaunui Dr.</p>
                      <p className="text-blue-800">Ste 108 PMB 174</p>
                      <p className="text-blue-800">Ewa Beach, HI 96706</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manuscript Submission Guidelines */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Manuscript Submission Guidelines</h2>
              <p className="text-lg text-blue-800">
                Ready to submit your manuscript? Here's what we need to get started.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">What to Include</h3>
                  <div className="text-blue-700 space-y-4">
                    <p>
                      Are you a new author looking for guidance and feedback on your manuscript? You've come to the
                      right place. At Wind of God Publishing, we are dedicated to helping emerging writers refine their
                      craft and achieve their publishing dreams.
                    </p>
                    <p>
                      Select the service you're interested in, upload your manuscript, and proceed to checkout for $100.
                      We'll review your work and provide detailed feedback, then discuss the selected service pricing
                      separately.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Submission Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Initial Review</h4>
                        <p className="text-blue-700 text-sm">We review your submission within 7-10 business days</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Consultation</h4>
                        <p className="text-blue-700 text-sm">
                          Someone will reach out to you via email to schedule a call to discuss your project in detail
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Proposal</h4>
                        <p className="text-blue-700 text-sm">
                          If your manuscript is the right fit for our company, we can then discuss publishing options.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
