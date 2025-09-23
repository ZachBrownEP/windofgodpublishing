"use client"

import MainLayout from "@/components/layout"

export default function SubmitManuscriptPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-8">Submit Your Manuscript</h1>
            <p className="text-xl md:text-2xl text-blue-800 leading-relaxed max-w-3xl mx-auto">
              Are you a new author looking for guidance and feedback on your manuscript? You've come to the right place.
              At Wind of God Publishing, we are dedicated to helping emerging writers refine their craft and achieve
              their publishing dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-100">
              <h2 className="text-3xl font-serif font-bold text-blue-900 mb-6 text-center">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Upload Manuscript</h3>
                  <p className="text-blue-700 text-sm">
                    Submit your manuscript for our professional review and evaluation.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Get Feedback</h3>
                  <p className="text-blue-700 text-sm">
                    Receive detailed feedback and discuss next steps for your publishing journey.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg text-blue-800 mb-4">
                  <strong>Manuscript Review Fee: $100</strong>
                </p>
                <p className="text-blue-700">
                  We'll review your work and provide detailed feedback on structure, content, and marketability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Support Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Need Help?</h2>
            <p className="text-lg text-blue-800 mb-8">
              Have questions about submitting your manuscript or our services? We're here to help guide you through the
              process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-block">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Contact Us
                </button>
              </a>
              <a href="/services" className="inline-block">
                <button className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  View All Services
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
