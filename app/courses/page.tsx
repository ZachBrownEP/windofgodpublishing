import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Play, Users, Clock, Star, ChevronRight, BookOpen, Heart, Lightbulb } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Layout from "@/components/layout"

export default function CoursesPage() {
  const courseTopics = [
    "Writing My Story - Where do I begin?",
    "How to partner with God to bring my story to life?",
    "Creating an Outline",
    "Teaching you the BREATH Method",
    "Staying on Task When You Get Writer's Block",
    "Staying Motivated when Hindrances Come",
    "Q and A Time",
  ]

  return (
    <Layout>
      {/* Hero Section with Header Image as Background */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/ready-set-write-header.png')`,
          minHeight: "400px",
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-blue-600 text-white px-6 py-2 text-lg font-semibold mb-6">Exclusive Webinar</Badge>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Ready. Set. Write!!!
            </h1>

            <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              A Transformative Webinar on How to Bring Your Story to Life
            </p>

            <Link href="/store">
              <Button
                size="lg"
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <Image
                  src="/images/mary-elam-course.png"
                  alt="Mary Elam, Course Instructor"
                  width={600}
                  height={700}
                  className="rounded-3xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 shadow-xl">
                  <div className="text-center">
                    <Star className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-white font-bold">3x Bestselling</div>
                    <div className="text-white text-sm">Author</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 mb-6">Meet Your Instructor</Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-6">Presented by Mary Elam</h2>
              <h3 className="text-2xl font-semibold text-blue-800 mb-8">Owner of Wind of God Publishing</h3>

              <div className="space-y-6 text-lg text-blue-800 leading-relaxed">
                <p>
                  Mary is a <strong className="text-blue-900">three-time bestselling author</strong> as well as a
                  <strong className="text-blue-900"> certified writing coach</strong>. Her books have reached the world
                  globally and she is prepared to teach you how to achieve the same using her writing method called
                  <strong className="text-blue-900"> BREATH</strong>.
                </p>
                <p>
                  Join her as she teaches you how to allow God to speak through you in your writing and reach your
                  audience in a way that will change their lives. What are you waiting for? Sign up today.
                </p>
              </div>

              <div className="mt-6 mb-4">
                <Badge className="bg-yellow-500 text-white px-4 py-2 text-sm font-semibold">
                  Webinar Investment: $35
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-blue-900">3 Bestsellers</div>
                  <div className="text-blue-700 text-sm">Published</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-blue-900">Global Reach</div>
                  <div className="text-blue-700 text-sm">Worldwide Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-8">Ready. Set. Write!!!</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-blue-800 leading-relaxed mb-6">
                  Books birthed out by God are weapons against the kingdom of darkness. Your testimony will set the
                  captives free. When God told me to write my first book, He said,{" "}
                  <em className="font-semibold">"It will bless many."</em>
                </p>
                <p className="text-xl text-blue-800 leading-relaxed mb-6">
                  <em>Touching His Hem - My Journey to Wholeness</em> truly has been a blessing and encouragement to
                  many. It is a weapon in the hands of those that want to be free and for those that want to see others
                  free. It has blessed the masses globally.
                </p>
                <p className="text-xl text-blue-800 leading-relaxed">
                  You too can have that experience. The Lord has spoken to many of you about telling your story, but you
                  don't know where to begin. Let me help you with the process. Also for those of you that have a
                  manuscript ready to go, I can assist you in seeing your manuscript become that book that you have only
                  dreamed of coming to life.
                </p>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-blue-900 mb-4">Transform Lives Through Your Story</h3>
                  <p className="text-lg text-blue-800">
                    You no longer have to wait and wonder how you will get it done. My team is here to make that dream a
                    reality. Allow Wind of God Publishing to bring that book forth. We will teach you how to Write with
                    God and let Him <strong>"Breathe"</strong> on It!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-yellow-500 text-white px-6 py-3 text-lg font-semibold mb-6">
                Comprehensive Curriculum
              </Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-8">
                In This Webinar We Will Cover
              </h2>
              <p className="text-xl text-blue-800 max-w-3xl mx-auto">
                A complete roadmap to transform your ideas into a published book that impacts lives
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {courseTopics.map((topic, index) => (
                <Card key={index} className="bg-white border-blue-100 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                          {topic.includes("?") ? topic.split("?")[0] + "?" : topic}
                        </h3>
                        {topic === "Teaching you the BREATH Method" && (
                          <p className="text-blue-700 text-sm">
                            Learn Mary's signature writing methodology that has helped create bestsellers
                          </p>
                        )}
                        {topic === "Q and A Time" && (
                          <p className="text-blue-700 text-sm">Get your specific questions answered directly by Mary</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Special Features */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-center">
                <CardContent className="p-8">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">BREATH Method</h3>
                  <p className="text-blue-100">Learn the signature writing technique that creates bestsellers</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white text-center">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Lifetime Access</h3>
                  <p className="text-yellow-100">Watch and rewatch the content at your own pace</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white text-center">
                <CardContent className="p-8">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Practical Tools</h3>
                  <p className="text-green-100">Actionable strategies you can implement immediately</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
              Your Story is Waiting to Transform Lives
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Don't let another day pass wondering "what if." Join Mary Elam and discover how to partner with God to
              bring your story to life and impact the world.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">On-Demand Webinar</div>
                  <div className="text-blue-200 text-sm">Learn at Your Pace</div>
                </div>
                <div>
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Expert Instructor</div>
                  <div className="text-blue-200 text-sm">3x Bestselling Author</div>
                </div>
                <div>
                  <Heart className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Life-Changing</div>
                  <div className="text-blue-200 text-sm">Transform Your Writing</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/store">
                <Button
                  size="lg"
                  className="bg-yellow-600 hover:bg-yellow-500 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Play className="mr-3 w-6 h-6" />
                  Register Now
                  <ChevronRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </div>

            <p className="text-blue-200 mt-6 text-sm">
              Secure registration • Instant access • 30-day satisfaction guarantee
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
