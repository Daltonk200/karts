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
            src="/about.jpg"
            alt="About Apex Rush Karts"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-caveat">
              About Apex Rush Karts
            </h1>
            <p className="text-lg text-zinc-200 max-w-3xl mx-auto font-outfit">
              For over a decade, we've been passionate about delivering
              high-performance go-karts and unforgettable racing experiences. Our
              story is one of speed, innovation, and an unwavering commitment to
              racing excellence.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-6 font-caveat">
                Our Story
              </h2>
              <div className="space-y-4 text-zinc-600 font-outfit">
                <p>
                  Founded in 2012 by racing enthusiast Marcus Chen, Apex Rush
                  Karts began as a small go-kart shop with a big dream: to make
                  professional-grade racing accessible to everyone. What started
                  as a passion project quickly evolved into a leading provider of
                  premium go-karts and racing equipment.
                </p>
                <p>
                  Marcus's philosophy was simple: every racer deserves access to
                  top-tier equipment that delivers performance, safety, and
                  excitement. This belief drove him to partner with the world's
                  finest kart manufacturers and to build a team of racing experts
                  who share his passion for speed.
                </p>
                <p>
                  Today, Apex Rush Karts stands as one of the most trusted names
                  in karting, serving racers from beginners taking their first
                  lap to professionals competing at the highest levels of the
                  sport.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden">
                <Image
                  src="/story.avif"
                  alt="Apex Rush Karts showroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center font-caveat">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4 font-caveat">
                Performance & Innovation
              </h3>
              <p className="text-zinc-600 font-outfit">
                We believe every kart should deliver exceptional performance. We
                carefully select each product in our collection, ensuring it
                meets our high standards for speed, handling, and reliability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
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
              <h3 className="text-xl font-semibold text-zinc-900 mb-4 font-caveat">
                Community & Racing Culture
              </h3>
              <p className="text-zinc-600 font-outfit">
                We're more than just a kart shop - we're a community of racing
                enthusiasts. We host track days, racing clinics, and events to
                help racers improve their skills and connect with fellow speed
                lovers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4 font-caveat">
                Safety & Quality
              </h3>
              <p className="text-zinc-600 font-outfit">
                Our team is made up of racing professionals who understand the
                importance of safety. We're passionate about providing karts and
                equipment that not only perform exceptionally but also keep you
                safe on the track.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-zinc-50">
        <Container>
          <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center font-caveat">
            Why Choose Apex Rush Karts?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-lg md:text-xl text-zinc-900 mb-2 font-caveat">
                    Expert Racing Knowledge
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    Our team consists of experienced racers and mechanics who
                    understand the nuances of different kart types and can guide
                    you to the perfect setup for your racing style.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-lg md:text-xl text-zinc-900 mb-2 font-caveat">
                    Performance Guarantee
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    Every kart and component in our shop is rigorously tested to
                    ensure optimal performance, safety, and durability on the
                    track.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-lg md:text-xl text-zinc-900 mb-2 font-caveat">
                    Ongoing Support
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    We provide ongoing support for all our customers, including
                    maintenance advice, setup consultations, and performance
                    tuning recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-lg md:text-xl text-zinc-900 mb-2 font-caveat">
                    Complete Racing Solutions
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    From entry-level recreational karts to professional racing
                    machines, we offer a complete range of products and services
                    to meet all your karting needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-lg md:text-xl text-zinc-900 mb-2 font-caveat">
                    Racing Events & Track Days
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    Join our racing community through track days, racing clinics,
                    and competitive events designed to help you improve your
                    skills and experience the thrill of racing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-lg md:text-xl text-zinc-900 mb-2 font-caveat">
                    Competitive Pricing
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    We believe high-performance racing should be accessible,
                    which is why we offer competitive pricing and flexible
                    financing options for all our karts and equipment.
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
