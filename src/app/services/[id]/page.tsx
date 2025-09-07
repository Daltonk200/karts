"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  image: string;
  isActive: boolean;
  isFeatured: boolean;
  features: string[];
  benefits: string[];
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const serviceId = params.id as string;
    if (serviceId) {
      fetchService(serviceId);
    }
  }, [params.id]);

  const fetchService = async (serviceId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/services/${serviceId}`);
      const data = await response.json();

      if (response.ok) {
        setService(data.service);
      } else {
        console.error("Failed to fetch service:", data);
        setService(null);
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      setService(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = () => {
    router.push(`/book-appointment?service=${service?._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading service...</p>
        </div>
      </div>
    );
  }
  console.log(service);
  

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-4">
            Service Not Found
          </h1>
          <p className="text-zinc-600 mb-6">
            The service you're looking for doesn't exist.
          </p>
          <Link
            href="/services"
            className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black border-b border-zinc-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.name}
            width={1000}
            height={1000}
            // fill
            className="object-cover opacity-60 w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-zinc-900/40"></div>
        </div>

        <Container className="py-16 md:py-20 lg:py-24 relative z-10">
          <div className=" mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-full shadow-lg">
                {service.duration}
              </span>
              <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-zinc-800 text-sm font-medium rounded-full shadow-lg">
                {service.price}
              </span>
            </div>
            <h1 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              {service.name}
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-outfit mb-8 max-w-3xl">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBookAppointment}
                className="bg-rose-600 text-white font-medium py-4 px-8 rounded-xl hover:bg-rose-700 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-lg shadow-lg"
              >
                Book Appointment Now
              </button>
              <Link
                href="/services"
                className="border-2 border-white text-white font-medium py-4 px-8 rounded-xl hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-lg text-center"
              >
                Back to Services
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Features Section */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mr-6">
                <svg
                  className="w-8 h-8 text-rose-600"
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
              <h2 className="text-3xl font-bold text-zinc-900 font-caveat">
                What's Included
              </h2>
            </div>
            <ul className="space-y-6">
              {service?.features?.map((feature, index) => (
                <li key={index} className="flex items-start group">
                  <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-5 h-5 text-white"
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
                  <span className="text-zinc-700 text-lg leading-relaxed group-hover:text-zinc-900 transition-colors duration-200 font-outfit">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mr-6">
                <svg
                  className="w-8 h-8 text-teal-600"
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
              <h2 className="text-3xl font-bold text-zinc-900 font-caveat">
                Benefits
              </h2>
            </div>
            <ul className="space-y-6">
              {service?.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-start group">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-5 h-5 text-white"
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
                  <span className="text-zinc-700 text-lg leading-relaxed group-hover:text-zinc-900 transition-colors duration-200 font-outfit">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 py-16 md:py-20">
        <Container>
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-caveat">
              Ready to Transform Your Beauty?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 font-outfit">
              Book your appointment now and experience the difference. Our
              expert professionals are ready to provide you with the best
              service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookAppointment}
                className="bg-white text-rose-600 font-medium py-4 px-8 rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-lg shadow-lg"
              >
                Book Appointment Now
              </button>
              <Link
                href="/services"
                className="border-2 border-white text-white font-medium py-4 px-8 rounded-xl hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-lg"
              >
                View All Services
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
