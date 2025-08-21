"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  features: string[];
  benefits: string[];
}

const services: Service[] = [
  {
    id: "facial-treatments",
    title: "Facial Treatments",
    description:
      "Professional facial treatments tailored to your skin type and concerns",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop",
    price: "25,000 - 45,000 XAF",
    duration: "60-90 minutes",
    features: [
      "Deep cleansing and exfoliation",
      "Customized mask application",
      "Moisturizing and hydration",
      "Anti-aging treatments",
      "Acne and blemish control",
      "Skin brightening treatments",
    ],
    benefits: [
      "Improves skin texture and tone",
      "Reduces fine lines and wrinkles",
      "Unclogs pores and prevents breakouts",
      "Boosts collagen production",
      "Enhances skin radiance",
    ],
  },
  {
    id: "makeup-services",
    title: "Makeup Services",
    description:
      "Professional makeup application for special occasions and everyday glamour",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
    price: "15,000 - 35,000 XAF",
    duration: "45-90 minutes",
    features: [
      "Bridal makeup",
      "Party and event makeup",
      "Natural everyday makeup",
      "Contouring and highlighting",
      "False lash application",
      "Makeup lessons available",
    ],
    benefits: [
      "Professional finish for special occasions",
      "Long-lasting makeup application",
      "Customized to your style and preferences",
      "High-quality products used",
      "Expert techniques and tips",
    ],
  },
  {
    id: "skincare-consultation",
    title: "Skincare Consultation",
    description: "Personalized skincare advice and product recommendations",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop",
    price: "10,000 - 20,000 XAF",
    duration: "30-45 minutes",
    features: [
      "Skin analysis and assessment",
      "Personalized skincare routine",
      "Product recommendations",
      "Lifestyle and diet advice",
      "Follow-up consultations",
      "Home care instructions",
    ],
    benefits: [
      "Understand your skin type and concerns",
      "Get personalized product recommendations",
      "Learn proper skincare techniques",
      "Address specific skin issues",
      "Long-term skin health improvement",
    ],
  },
  {
    id: "body-treatments",
    title: "Body Treatments",
    description: "Relaxing and rejuvenating body treatments for total wellness",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
    price: "30,000 - 60,000 XAF",
    duration: "90-120 minutes",
    features: [
      "Body scrubs and exfoliation",
      "Moisturizing body wraps",
      "Cellulite reduction treatments",
      "Anti-aging body treatments",
      "Relaxation massages",
      "Detoxifying treatments",
    ],
    benefits: [
      "Improves skin texture and firmness",
      "Reduces cellulite appearance",
      "Promotes relaxation and stress relief",
      "Enhances skin hydration",
      "Boosts circulation and detoxification",
    ],
  },
  {
    id: "nail-services",
    title: "Nail Services",
    description: "Professional nail care and beautiful nail art designs",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
    price: "8,000 - 25,000 XAF",
    duration: "45-90 minutes",
    features: [
      "Manicure and pedicure",
      "Gel and acrylic nails",
      "Nail art and designs",
      "Nail extensions",
      "Nail repair and maintenance",
      "Hand and foot massages",
    ],
    benefits: [
      "Professional nail care and maintenance",
      "Beautiful and long-lasting results",
      "Custom nail art designs",
      "Hand and foot relaxation",
      "Improved nail health",
    ],
  },
  {
    id: "hair-treatments",
    title: "Hair Treatments",
    description: "Nourishing hair treatments for healthy, beautiful hair",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
    price: "20,000 - 40,000 XAF",
    duration: "60-120 minutes",
    features: [
      "Hair conditioning treatments",
      "Scalp treatments and massages",
      "Hair repair and restoration",
      "Anti-dandruff treatments",
      "Hair growth stimulation",
      "Color protection treatments",
    ],
    benefits: [
      "Improves hair texture and shine",
      "Strengthens hair follicles",
      "Reduces hair loss and breakage",
      "Promotes healthy scalp",
      "Enhances hair manageability",
    ],
  },
];

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const serviceId = params.id as string;
    const foundService = services.find((s) => s.id === serviceId);
    setService(foundService || null);
  }, [params.id]);

  const handleBookAppointment = () => {
    router.push(`/book-appointment?service=${service?.id}`);
  };

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
            alt={service.title}
            fill
            className="object-cover opacity-60"
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
              {service.title}
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
              {service.features.map((feature, index) => (
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
              {service.benefits.map((benefit, index) => (
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
