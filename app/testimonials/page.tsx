import Layout from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  initial: string
  content: string
}

export default function TestimonialsPage() {
  const testimonials: Testimonial[] = [
    {
      id: "susan-mcdonald",
      name: "Susan McDonald",
      initial: "S",
      content:
        "Mary Elam's publishing company is patient, Spirit-filled, and truly guided by God. I highly recommend their services to everyone. God bless you all!",
    },
    {
      id: "deborah-p",
      name: "Deborah P.",
      initial: "D",
      content:
        "I so enjoyed the course! I was inspired by Mary and her teaching on the importance of allowing the Holy Spirit to lead in the writing process. I’m grateful for the replays, which let me revisit the teachings and absorb everything I need. Thank you, Mary!",
    },
    {
      id: "shawna-h",
      name: "Shawna H.",
      initial: "S",
      content: "I loved the worship music during the writing portion of the course.",
    },
    {
      id: "jennifer-rodriguez",
      name: "Jennifer Rodriguez",
      initial: "J",
      content:
        "Mary is an amazing consultant and guidance counselor through her publishing services. She was able to help me move my thoughts from writing into active publishing. She offers great avenues of publishing that will fit your personal need. She offers many key elements you can utilize to get you headed on the right path and even to completion if you take that full route. I love that she leaves it up to you on which route you want to take and still offers her assistance at a well-rounded capacity. Thank you Mary!!",
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-full">
                <Quote className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Testimonials</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Hear from authors whose lives have been transformed through our courses and services
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 mb-4">
                What Our Students Are Saying
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover how our courses have impacted the lives and writing journeys of our students
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-blue-600"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.initial}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-4">
                          <Quote className="w-6 h-6 text-blue-300 mb-2" />
                          <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                        </div>

                        <div className="border-t pt-4">
                          <p className="font-semibold text-blue-900">{testimonial.name}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
