"use client";

import Container from "@/components/Container";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
            alt="About Guitar & Strings Co"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Guitar & Strings Co
            </h1>
            <p className="text-lg text-zinc-200 max-w-3xl mx-auto">
              For over three decades, we've been passionate about connecting
              musicians with their perfect instruments. Our story is one of
              dedication, craftsmanship, and an unwavering love for music.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-zinc-600">
                <p>
                  Founded in 2008 by  George Corporative , a passionate
                  guitarist and luthier, Guitar & Strings Co began as a small
                  workshop in downtown New York. What started as a place to
                  repair and customize guitars for local musicians quickly grew
                  into something much bigger.
                </p>
                <p>
                  John's philosophy was simple: every musician deserves access
                  to quality instruments that inspire creativity and deliver
                  exceptional sound. This belief drove him to establish
                  relationships with the world's finest guitar manufacturers and
                  to develop a team of experts who share his passion.
                </p>
                <p>
                  Today, Guitar & Strings Co stands as one of the most respected
                  guitar retailers in the country, serving musicians from
                  beginners to professionals, from local artists to
                  international touring bands.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-zinc-100 border border-zinc-200">
                <Image
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=400&fit=crop"
                  alt="Guitar & Strings Co store interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-zinc-900">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                10+
              </div>
              <div className="text-zinc-300">Years of Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                1000+
              </div>
              <div className="text-zinc-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                100+
              </div>
              <div className="text-zinc-300">Guitars in Stock</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-zinc-300">Expert Support</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4">
                Quality & Craftsmanship
              </h3>
              <p className="text-zinc-600">
                We believe that every guitar should be a work of art. We
                carefully select each instrument in our collection, ensuring it
                meets our high standards for quality, sound, and playability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4">
                Community & Education
              </h3>
              <p className="text-zinc-600">
                We're more than just a store - we're a community of musicians.
                We host workshops, clinics, and events to help musicians grow
                and connect with each other.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4">
                Passion & Dedication
              </h3>
              <p className="text-zinc-600">
                Our team is made up of musicians who understand the importance
                of finding the right instrument. We're passionate about helping
                you discover the guitar that speaks to your soul.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">
            Why Choose Guitar & Strings Co?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    Expert Knowledge
                  </h3>
                  <p className="text-zinc-600">
                    Our team consists of experienced musicians and technicians
                    who understand the nuances of different guitars and can
                    guide you to the perfect choice.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    Quality Assurance
                  </h3>
                  <p className="text-zinc-600">
                    Every guitar in our store is carefully inspected and set up
                    by our master technicians to ensure optimal playability and
                    sound.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    Lifetime Support
                  </h3>
                  <p className="text-zinc-600">
                    We provide ongoing support for all guitars purchased from
                    us, including maintenance, repairs, and upgrades.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    Extensive Selection
                  </h3>
                  <p className="text-zinc-600">
                    From vintage classics to modern masterpieces, we offer one
                    of the largest selections of guitars in the region.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    Community Events
                  </h3>
                  <p className="text-zinc-600">
                    Join our community through workshops, clinics, and events
                    designed to help musicians grow and connect.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    Fair Pricing
                  </h3>
                  <p className="text-zinc-600">
                    We believe quality instruments should be accessible to all
                    musicians, which is why we offer competitive pricing and
                    flexible payment options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
