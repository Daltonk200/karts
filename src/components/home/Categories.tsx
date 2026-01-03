"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { useState, useEffect } from "react";

interface Category {
  _id: string;
  name: string;
  productType: string;
  description?: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Product type based categories with images
  const productTypeCategories = [
    {
      _id: "go-karts",
      name: "Go-Karts",
      productType: "go-karts",
      description: "High-performance racing go-karts for competitive racing and fun",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
    {
      _id: "scooters",
      name: "Scooters",
      productType: "scooters",
      description: "Electric and gas-powered scooters for speed and style",
      image: "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
    },
    {
      _id: "spare-parts",
      name: "Spare Parts",
      productType: "spare-parts",
      description: "Premium parts and accessories for your racing machines",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    },
  ];

  // Use API categories if available, otherwise use product type categories
  const displayCategories = categories.length > 0 
    ? categories.map(cat => {
        // Find matching product type category for image
        const productTypeCat = productTypeCategories.find(
          ptc => ptc.productType === cat.productType
        );
        return {
          _id: cat._id,
          name: cat.name,
          description: cat.description || productTypeCat?.description || `Browse our ${cat.name} collection`,
          image: productTypeCat?.image || productTypeCategories[0].image,
          productType: cat.productType,
        };
      })
    : productTypeCategories;

  if (loading) {
    return (
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Explore Our Collection
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              From professional racing karts to high-speed scooters and premium parts, find everything you need for your racing journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] bg-zinc-100 rounded-[5px] animate-pulse"></div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Explore Our Collection
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            From professional racing karts to high-speed scooters and premium parts, find everything you need for your racing journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {displayCategories.map((category) => (
            <Link
              key={category._id}
              href={`/products?productType=${encodeURIComponent(category.productType)}`}
              className="group block"
            >
              <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden border border-zinc-200 rounded-[5px] shadow-sm hover:shadow-sm transition-all duration-500 transform hover:-translate-y-1">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent opacity-90 group-hover:opacity-95 transition-all duration-500"></div>

                {/* Hover Arrow Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Enhanced Text Content */}
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300 text-2xl font-caveat">
                    {category.name}
                  </h3>
                  <p className="text-zinc-200 text-sm group-hover:text-zinc-100 transition-colors duration-300 font-outfit">
                    {category.description}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-200 rounded-[5px] transition-colors duration-500 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
