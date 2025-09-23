"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Bell } from "lucide-react"
import Layout from "@/components/layout"
import { useCart } from "@/components/cart-context"

export default function EventsPage() {
  const { dispatch } = useCart()

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-8">Events & Workshops</h1>
            <p className="text-xl md:text-2xl text-blue-800 leading-relaxed">
              Join our community of faith-based writers through workshops, seminars, and networking events designed to
              enhance your writing journey.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Upcoming Events</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              We're planning exciting new events for the future. Stay tuned for announcements!
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white border-blue-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <Bell className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-serif font-bold text-blue-900 mb-4">More Events Coming Soon!</h3>
                  <p className="text-lg text-blue-700 leading-relaxed mb-6">
                    We're currently planning new workshops, writing experiences, and community events for the upcoming
                    year. Each event is carefully designed to help you grow in your writing journey and connect with
                    fellow faith-based authors.
                  </p>
                  <p className="text-blue-600 mb-8">
                    Be the first to know when new events are announced by following us on social media or checking back
                    here regularly.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    What to Expect from Future Events:
                  </h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-center justify-center gap-2">
                      <span className="text-blue-400">•</span>
                      Spirit-led writing workshops and experiences
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <span className="text-blue-400">•</span>
                      Community building and networking opportunities
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <span className="text-blue-400">•</span>
                      Practical writing skills and publishing guidance
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <span className="text-blue-400">•</span>
                      Worship and prayer-centered sessions
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Types of Events We Offer</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              We offer various types of events to meet you wherever you are in your writing journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                type: "Workshops",
                description: "Hands-on learning experiences with practical exercises and immediate feedback",
                icon: "🛠️",
                duration: "2-6 hours",
              },
              {
                type: "Series",
                description: "Multi-week guided experiences with ongoing support and accountability",
                icon: "📚",
                duration: "4-8 weeks",
              },
              {
                type: "Seminars",
                description: "Educational presentations on specific topics with Q&A sessions",
                icon: "🎓",
                duration: "1-3 hours",
              },
              {
                type: "Conferences",
                description: "Multi-day events with keynote speakers, workshops, and networking",
                icon: "🏛️",
                duration: "1-3 days",
              },
              {
                type: "Retreats",
                description: "Intensive writing experiences in peaceful, inspiring environments",
                icon: "🏞️",
                duration: "2-5 days",
              },
            ].map((eventType, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-white border-blue-100 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{eventType.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{eventType.type}</h3>
                  <p className="text-blue-700 mb-4">{eventType.description}</p>
                  <div className="text-blue-600 text-sm font-medium">Typical Duration: {eventType.duration}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
