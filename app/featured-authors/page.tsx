"use client"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ExternalLink, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Author {
  id: string
  name: string
  title: string
  bio: string
  image: string
  featured: boolean
  socialLinks?: {
    website?: string
    facebook?: string
    instagram?: string
  }
}

interface Book {
  id: string
  title: string
  author: string
  authorId: string
  description: string
  image: string
  genre: string
  publishedDate: string
  featured: boolean
  purchaseLink: string
}

export default function FeaturedAuthorsPage() {
  const authors: Author[] = [
    {
      id: "susan-mcdonald",
      name: "Susan McDonald",
      title: "Ordained Minister & Legal Advocate",
      bio: "Susan McDonald is an ordained minister through Joan Hunter Ministries and Heaven on Earth Ministries International under Pastor Deusdedit Bagume. A former drug addict, she now serves as a legal advocate at the Lovelady Center and the Alabama Pardon and Parole Board, helping men, women and families rebuild their lives after addiction, incarceration, and trauma. Her ministry reaches far beyond the walls of traditional churches. As a member of Katie Souza's prison ministry team, Susan brings hope and healing to incarcerated men and women. She also travels nationally with Dr. Shanicka Williams and Healing Hands Global Ministries, spreading the gospel and witnessing miraculous transformations. She resides in Alabama, inspiring others with her testimony of God's redemption and grace.",
      image: "/images/susan-mcdonald-author.jpeg",
      featured: true,
    },
  ]

  const books: Book[] = [
    {
      id: "extraordinary-love",
      title: "Extraordinary Love",
      author: "Susan McDonald",
      authorId: "susan-mcdonald",
      description:
        "From a Dope-Filled Past to a Christ-Filled Future. Susan McDonald's powerful testimony chronicles her incredible journey from the depths of drug addiction to becoming an ordained minister and advocate for those seeking redemption. With a forward by Dr. Shanicka, this inspiring memoir reveals how God's extraordinary love can transform even the most broken life. Through raw honesty and unwavering faith, Susan shares how she overcame addiction, found her calling in ministry, and now dedicates her life to helping others rebuild after trauma, incarceration, and addiction. Her story serves as a beacon of hope for anyone who feels too far gone, proving that no past is too dark for God's redemptive power. This book will encourage readers to believe in second chances, embrace God's grace, and discover that extraordinary love can heal any wound and restore any life.",
      image: "/images/extraordinary-love-book.jpeg",
      genre: "Christian Living",
      publishedDate: "2024",
      featured: true,
      purchaseLink: "https://a.co/d/eLmb79I",
    },
  ]

  const displayBooks = books

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-full">
                <BookOpen className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Featured Authors</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover inspiring books from faith-based authors who are sharing their God-given stories with the world
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Award-Winning Authors</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Diverse Genres</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Authors Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 mb-4">
                Meet Our Featured Authors
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get to know the talented authors behind these inspiring works
              </p>
            </div>

            <div className="flex justify-center">
              <div className="max-w-md">
                {authors.map((author) => (
                  <Card key={author.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center pb-4">
                      <div className="w-full h-64 mx-auto mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={author.image || "/placeholder.svg"}
                          alt={author.name}
                          width={400}
                          height={256}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <CardTitle className="text-xl font-serif text-blue-900">{author.name}</CardTitle>
                      <p className="text-blue-600 font-medium">{author.title}</p>
                      {author.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Featured Author</Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{author.bio}</p>
                      {author.socialLinks && (
                        <div className="flex justify-center space-x-3">
                          {author.socialLinks.website && (
                            <a
                              href={author.socialLinks.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 mb-4">Featured Books</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Explore our collection of inspiring books that will strengthen your faith and transform your life
              </p>
            </div>

            <div className="flex justify-center">
              <div className="max-w-4xl w-full">
                {displayBooks.map((book) => (
                  <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Book Image */}
                      <div className="aspect-[3/4] relative">
                        <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                        {book.featured && (
                          <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">Featured</Badge>
                        )}
                      </div>

                      {/* Book Details */}
                      <CardContent className="p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-blue-900 mb-2">{book.title}</h3>
                          <p className="text-blue-600 font-medium mb-4">by {book.author}</p>

                          {/* Full Description */}
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{book.description}</p>
                        </div>

                        {/* Purchase Button */}
                        <div className="mt-auto">
                          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                            <a href={book.purchaseLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Purchase Book
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {displayBooks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found in this category</h3>
                <p className="text-gray-500">
                  Try selecting a different category or check back later for new releases.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Are You an Author?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community of featured authors and share your faith-inspired story with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                  Submit Your Book
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold bg-transparent"
                >
                  Publishing Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
