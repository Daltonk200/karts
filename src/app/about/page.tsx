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
            src="https://img.freepik.com/set-decorative-cosmetics-pink-background_93675-100352.jpg?W=2000"
            alt="About Beauty & Glow"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-caveat">
              About Beauty & Glow
            </h1>
            <p className="text-lg text-zinc-200 max-w-3xl mx-auto font-outfit">
              For over a decade, we've been passionate about enhancing natural
              beauty and boosting confidence. Our story is one of dedication,
              expertise, and an unwavering commitment to helping you look and
              feel your best.
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
                  Founded in 2012 by Sarah Johnson, a passionate beauty
                  therapist and skincare expert, Beauty & Glow began as a small
                  beauty salon in downtown New York. What started as a place to
                  provide basic beauty treatments quickly grew into something
                  much bigger.
                </p>
                <p>
                  Sarah's philosophy was simple: every person deserves to feel
                  beautiful and confident in their own skin. This belief drove
                  her to establish relationships with the world's finest beauty
                  brands and to develop a team of experts who share her passion
                  for enhancing natural beauty.
                </p>
                <p>
                  Today, Beauty & Glow stands as one of the most respected
                  beauty and wellness centers in the country, serving clients
                  from all walks of life, from teenagers taking their first
                  steps into beauty to professionals seeking premium treatments.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden">
                <Image
                  src="https://img.freepik.com/free-photo/flat-lay-skincare-products-with-copy-space_23-2148317636.jpg?t=st=1755770033~exp=1755773633~hmac=299dbf22ca1740cad6bf4545280d9ffc6fc42dacab926d886482fd0f0e34683c&w=2000"
                  alt="Beauty & Glow salon interior"
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
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
              <h3 className="text-xl font-semibold text-zinc-900 mb-4 font-caveat">
                Quality & Expertise
              </h3>
              <p className="text-zinc-600 font-outfit">
                We believe that every beauty treatment should be exceptional. We
                carefully select each product and service in our collection,
                ensuring it meets our high standards for quality, safety, and
                effectiveness.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
                Community & Education
              </h3>
              <p className="text-zinc-600 font-outfit">
                We're more than just a beauty salon - we're a community of
                beauty enthusiasts. We host workshops, consultations, and events
                to help clients understand their skin and beauty needs better.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
              <h3 className="text-xl font-semibold text-zinc-900 mb-4 font-caveat">
                Passion & Dedication
              </h3>
              <p className="text-zinc-600 font-outfit">
                Our team is made up of beauty professionals who understand the
                importance of feeling confident and beautiful. We're passionate
                about helping you discover the treatments and products that
                enhance your natural beauty.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-zinc-50">
        <Container>
          <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center font-caveat">
            Why Choose Beauty & Glow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-zinc-900 mb-2 font-caveat">
                    Expert Knowledge
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    Our team consists of certified beauty therapists and
                    skincare specialists who understand the nuances of different
                    skin types and can guide you to the perfect treatments and
                    products.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-zinc-900 mb-2 font-caveat">
                    Quality Assurance
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    Every product and treatment in our salon is carefully
                    selected and tested to ensure optimal results and safety for
                    all skin types.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-zinc-900 mb-2 font-caveat">
                    Ongoing Support
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    We provide ongoing support for all our clients, including
                    follow-up consultations, skincare advice, and product
                    recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-zinc-900 mb-2 font-caveat">
                    Comprehensive Services
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    From facial treatments to makeup services, we offer a
                    complete range of beauty and wellness services to meet all
                    your needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-zinc-900 mb-2 font-caveat">
                    Beauty Events
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    Join our community through workshops, beauty consultations,
                    and events designed to help you learn about skincare and
                    beauty techniques.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
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
                  <h3 className="font-semibold text-zinc-900 mb-2 font-caveat">
                    Fair Pricing
                  </h3>
                  <p className="text-zinc-600 font-outfit">
                    We believe quality beauty services should be accessible to
                    everyone, which is why we offer competitive pricing and
                    flexible booking options.
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
