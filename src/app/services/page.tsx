"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { services } from "@/data/services";

export default function ServicesPage() {
  const router = useRouter();

  const handleBookAppointment = (serviceId: string) => {
    router.push(`/book-appointment?service=${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Following the proper pattern */}
      <section className="relative bg-black border-b border-zinc-200 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&h=600&fit=crop"
            alt="Beauty Services"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-zinc-900/40"></div>
        </div>

        <Container className="py-16 md:py-20 lg:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-outfit mb-8 max-w-3xl mx-auto">
              Discover our comprehensive range of beauty and wellness services,
              designed to enhance your natural beauty and boost your confidence.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col h-full group"
            >
              {/* Service Image */}
              <div className="relative h-48 md:h-56 bg-zinc-100 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-rose-600 text-white text-xs font-medium uppercase tracking-wide rounded-full shadow-lg">
                    {service.duration}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base font-medium">
                    {service.price}
                  </p>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-zinc-600 mb-4 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-zinc-900 mb-3 flex items-center text-sm md:text-base">
                    <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
                    What's Included
                  </h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-zinc-600 flex items-start"
                      >
                        <svg
                          className="w-4 h-4 text-rose-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons - Always at bottom */}
                <div className="flex gap-3 mt-auto">
                  {/* View Details Button */}
                  <Link
                    href={`/services/${service.id}`}
                    className="flex-1 bg-zinc-100 text-zinc-700 font-medium py-2.5 px-4 rounded-lg hover:bg-zinc-200 transition-all duration-300 font-outfit border border-zinc-200 text-sm md:text-base text-center"
                  >
                    View Details
                  </Link>

                  {/* Book Appointment Button */}
                  <button
                    onClick={() => handleBookAppointment(service.id)}
                    className="flex-[2] bg-rose-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-rose-700 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-sm md:text-base"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Why Choose Us Section */}
      <div className="bg-zinc-50 py-16 md:py-20">
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 font-caveat">
              Why Choose Our Services?
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto font-outfit">
              We combine expertise, premium products, and personalized care to
              deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mb-2 md:mb-3">
                Expert Professionals
              </h3>
              <p className="text-zinc-600 text-sm md:text-base">
                Certified and experienced beauty specialists
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mb-2 md:mb-3">
                Premium Products
              </h3>
              <p className="text-zinc-600 text-sm md:text-base">
                High-quality, safe, and effective products
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-rose-600"
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
              <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mb-2 md:mb-3">
                Personalized Care
              </h3>
              <p className="text-zinc-600 text-sm md:text-base">
                Tailored treatments for your unique needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mb-2 md:mb-3">
                Convenient Booking
              </h3>
              <p className="text-zinc-600 text-sm md:text-base">
                Easy online booking and flexible scheduling
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 py-16 md:py-20">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-caveat">
              Ready to Transform Your Beauty?
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-10 opacity-90 font-outfit">
              Book your appointment today and experience the difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-appointment"
                className="bg-white text-rose-600 font-medium py-3 px-6 md:px-8 rounded-lg hover:bg-zinc-100 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-sm md:text-base"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-medium py-3 px-6 md:px-8 rounded-lg hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-sm md:text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
