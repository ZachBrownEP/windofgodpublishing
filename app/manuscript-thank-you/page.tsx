"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Clock, FileText, ArrowRight, Star, MessageCircle, Calendar, Phone } from "lucide-react"
import Layout from "@/components/layout"
import Link from "next/link"

export default function ManuscriptThankYouPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="relative">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Thank You!</h1>
              <p className="text-xl text-gray-600 mb-2">Your manuscript submission has been received successfully!</p>
              <p className="text-gray-500">
                We're excited to review your work and help you on your publishing journey.
              </p>
            </div>

            {/* What Happens Next */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  What happens next?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
                      <p className="text-gray-600">
                        You'll receive a confirmation email within the next few minutes with your submission details and
                        what to expect during the review process.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Professional Review</h3>
                      <p className="text-gray-600">
                        Our team will conduct a thorough review of your manuscript, evaluating structure, content,
                        marketability, and providing detailed feedback to help you improve your work.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Detailed Feedback</h3>
                      <p className="text-gray-600">
                        Within 7-10 business days, you'll receive comprehensive feedback and recommendations for your
                        manuscript, along with next steps for your publishing journey.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Follow-Up Consultation</h3>
                      <p className="text-gray-600">
                        After reviewing your feedback, we'll schedule a consultation to discuss your options and create
                        a personalized publishing strategy for your book.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Review Timeline */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Review Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Submission Received</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Complete
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Initial Review</span>
                      <span className="text-gray-500 text-sm">24-48 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Detailed Analysis</span>
                      <span className="text-gray-500 text-sm">7-10 business days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Feedback Delivery</span>
                      <span className="text-gray-500 text-sm">Within 7-10 business days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What We Review */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle>What We Review</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Story structure and flow</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Character development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Writing style and voice</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Market potential</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Publishing readiness</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Improvement recommendations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inspirational Quote */}
            <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <blockquote className="text-xl font-medium text-gray-900 mb-4 italic">
                  "Every great author started with a single manuscript and the courage to share their story with the
                  world."
                </blockquote>
                <p className="text-blue-700 font-semibold">- Mary E. Elam, Wind of God Publishing</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="text-center space-y-4 mb-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                    Explore Our Services
                  </Button>
                </Link>
                <Link href="/featured-authors">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50"
                  >
                    Featured Authors
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Support */}
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Questions About Your Submission?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  If you have any questions about your manuscript submission or the review process, our team is here to
                  help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button variant="outline" className="border-gray-600 text-gray-700 hover:bg-gray-50">
                      Contact Support
                    </Button>
                  </Link>
                  <a href="mailto:support@windofgodpublishing.com">
                    <Button variant="ghost" className="text-gray-700 hover:bg-gray-50">
                      Email Us Directly
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Guarantee */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Professional Review Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
