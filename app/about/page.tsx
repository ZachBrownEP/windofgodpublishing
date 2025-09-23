import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, BookOpen, Users, Quote } from "lucide-react"
import Image from "next/image"
import Layout from "@/components/layout"

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section - About Wind of God Publishing */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 mb-8">
              About Wind of God Publishing
            </h1>
            <div className="space-y-6 text-lg text-blue-800 leading-relaxed">
              <p>
                Wind of God Publishing is a Spirit-led publishing company birthed from the very breath of God. We are
                called to partner with Kingdom writers who carry a message from the Father's heart—books filled with
                divine insight, revelation, and inspiration.
              </p>
              <p>
                Our mission is to nurture and amplify faith-filled voices, helping authors steward their God-given
                assignments with excellence. Guided by the Holy Spirit and rooted in professional integrity, we
                transform powerful God-breathed visions into beautifully crafted publications that shift atmospheres,
                change lives, and leave a legacy for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mary's Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Mary Elam's Journey</h2>
              <div className="space-y-6 text-lg text-blue-800 leading-relaxed">
                <p>
                  Mary Elam was first published at the age of 15 in her small-town newspaper, never imagining the
                  writing journey God had planned for her. In 2019, she released her first best-selling book,{" "}
                  <em className="text-blue-900 font-semibold">Touching His Hem – My Journey to Wholeness</em>, and since
                  then, the Lord has graced her to write and publish several more, including two additional bestsellers.
                </p>
                <p>
                  From writing poetry to authoring books that have brought healing and transformation, Mary walks boldly
                  in the writing mantle God has placed on her life. Today, she is commissioned to help others do the
                  same. From the ideas God places in your heart to the moment you hold your finished book, Mary will
                  walk with you every step of the way, helping bring your vision to life and trusting God to breathe on
                  every page.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <Image
                  src="/images/mary-elam.png"
                  alt="Mary Elam, Founder of Wind of God Publishing"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Our Mission & Vision</h2>
              <p className="text-lg text-blue-800">
                Guided by faith and inspired by God's calling to help authors share their divine messages
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border-blue-100 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4 text-center">Our Mission</h3>
                  <p className="text-blue-800 leading-relaxed text-center">
                    To inspire, equip, and impact lives through the written word.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-100 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4 text-center">Our Vision</h3>
                  <p className="text-blue-800 leading-relaxed text-center">
                    Our vision at Wind of God Publishing is to see God-breathed books released across the nations. Books
                    that are awakening purpose, igniting faith, and transforming lives one book at a time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mary's Achievements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Mary's Achievements</h2>
              <p className="text-lg text-blue-800">
                A testament to God's grace and the power of faith-inspired writing
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">3 Bestsellers</h3>
                  <p className="text-blue-700 text-sm">
                    Including "Touching His Hem-My Journey to Wholeness" and two additional bestselling titles
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Lives Transformed</h3>
                  <p className="text-blue-700 text-sm">
                    Her books have touched and transformed countless lives through powerful, faith-based messages
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Divine Calling</h3>
                  <p className="text-blue-700 text-sm">
                    Commissioned by God to help other authors bring their divine inspirations to life
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture & Values */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-100 mb-12">
              <blockquote className="text-2xl md:text-3xl font-serif italic text-blue-900 mb-4 text-center">
                "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to
                give you hope and a future."
              </blockquote>
              <cite className="text-blue-700 font-medium text-center block">— Jeremiah 29:11</cite>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-blue-900 mb-6">Our Core Values</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Faith-Centered Approach</h3>
                    <p className="text-blue-700">
                      Every project is guided by Christian values and principles, ensuring your message aligns with
                      God's purpose.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Excellence in Service</h3>
                    <p className="text-blue-700">
                      Committed to the highest standards in publishing quality, from manuscript to final product.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Personal Guidance</h3>
                    <p className="text-blue-700">
                      Mary personally guides each author through the publishing process, from initial idea to
                      completion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Transformative Impact</h3>
                    <p className="text-blue-700">
                      Focused on creating books that don't just inform, but transform lives and strengthen faith.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg">
              <CardContent className="p-12">
                <Quote className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
                <blockquote className="text-3xl md:text-4xl font-serif font-bold text-yellow-600 mb-6 leading-tight">
                  "Write with God.
                  <br />
                  His imagination and His creativity are boundless."
                </blockquote>
                <cite className="text-yellow-700 font-medium text-lg">— Mary Elam</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  )
}
