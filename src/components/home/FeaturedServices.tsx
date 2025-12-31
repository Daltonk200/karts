"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { AiOutlineSchedule } from "react-icons/ai";

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
}

export default function FeaturedServices() {
  const router = useRouter();
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedServices();
  }, []);

  const fetchFeaturedServices = async () => {
    try {
      setServicesLoading(true);
      const response = await fetch(
        "/api/services?isFeatured=true&isActive=true&limit=3"
      );
      const data = await response.json();

      if (response.ok) {
        setFeaturedServices(data.services || []);
      } else {
        console.error("Failed to fetch featured services:", data);
      }
    } catch (error) {
      console.error("Error fetching featured services:", error);
    } finally {
      setServicesLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 font-caveat">
            Featured Services
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-outfit">
            Experience our professional racing services designed to keep your
            machine in peak performance and dominate the track.
          </p>
        </div>

        {servicesLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col h-full group"
              >
                {/* Service Image */}
                <div className="relative h-48 md:h-56 bg-zinc-100 overflow-hidden">
                  <Image
                    src={
                      service.image ||
                      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                    }
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium font-outfit">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2 font-outfit">
                    {service.name}
                  </h3>
                  <p className="text-zinc-600 mb-4 flex-grow font-outfit line-clamp-3">
                    {service.description}
                  </p>

                  {/* Service Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-zinc-500">
                      <AiOutlineSchedule className="w-4 h-4 mr-1" />
                      <span className="font-outfit">
                        {service.duration} min
                      </span>
                    </div>
                    <div className="text-lg font-bold text-red-600 font-outfit">
                      ${service.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/services/${service._id}`}
                      className="flex-1 bg-zinc-100 text-zinc-700 font-medium py-2.5 px-4 rounded-lg hover:bg-zinc-200 transition-all duration-300 font-outfit border border-zinc-200 text-sm md:text-base text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() =>
                        router.push(
                          `/contact?service=${service._id}`
                        )
                      }
                      className="flex-[2] bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-sm md:text-base"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Featured Services Available
            </h3>
            <p className="text-gray-600">
              Please check back later for our latest services.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-red-600 border-none text-white font-medium tracking-wide uppercase hover:bg-zinc-800 transition-all duration-300 border border-zinc-900 rounded-[5px] font-outfit transform hover:scale-105 hover:shadow-lg"
          >
            View All Services
          </Link>
        </div>
      </Container>
    </section>
  );
}


