"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { AiOutlineSchedule } from "react-icons/ai";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  skinType: string;
  brand: string;
  size: string;
  isFeatured: boolean;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      condition: product.skinType,
      stock: 1, // Default stock
      model: product.size || "",
    });
    toast.success(`${product.name} added to cart`);
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products?featured=true&limit=4");
        const data = await response.json();
        setFeaturedProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        // Fallback to empty array if API fails
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Mock data for categories (keeping this as is since it's static)
  const categories = [
    {
      name: "Skincare",
      description: "Premium skincare products for all skin types and concerns",
      image:
        "https://img.freepik.com/bottles-with-massage-oils-bamboo-stick-straw-mat_93675-123583.jpg?W=2000",
    },
    {
      name: "Makeup",
      description: "Professional makeup products for every occasion and style",
      image:
        "https://img.freepik.com/high-angle-view-pen-table_1048944-18511898.jpg?W=2000",
    },
    {
      name: "Fragrance",
      description: "Luxury perfumes and fragrances for men and women",
      image: "https://img.freepik.com/bottle-perfume_266732-14623.jpg?W=2000",
    },
  ];

  return (
    <>
      <Hero />

      {/* Beauty Consultation Alert */}
      <section className="bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-200">
        <Container className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <AiOutlineSchedule size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-rose-900 mb-1">
                  Book Beauty Consultation
                </h3>
                <p className="text-rose-800">
                  Schedule a personalized appointment with our certified beauty
                  experts for professional consultation.
                </p>
              </div>
            </div>
            <Link
              href="/consultation"
              className="inline-flex items-center px-6 py-3 bg-rose-600 text-white font-medium  hover:bg-rose-700 rounded-sm transition-colors duration-200 whitespace-nowrap"
            >
              Book Appointment
              <svg
                className="w-4 h-4 ml-2"
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
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-zinc-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Handpicked beauty products from our finest collection. Each
              product is carefully selected for quality and effectiveness.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white border border-zinc-200 animate-pulse"
                >
                  <div className="aspect-[4/3] bg-zinc-200"></div>
                  <div className="p-4 md:p-6">
                    <div className="h-4 bg-zinc-200 rounded mb-2"></div>
                    <div className="h-6 bg-zinc-200 rounded mb-2"></div>
                    <div className="h-5 bg-zinc-200 rounded mb-4"></div>
                    <div className="h-10 bg-zinc-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-zinc-200 hover:border-zinc-300 transition-colors duration-200 flex flex-col"
                >
                  <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden group">
                    <Image
                      src={
                        product.image ||
                        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop"
                      }
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-zinc-900 text-white text-xs font-medium uppercase tracking-wide">
                        {product.skinType}
                      </span>
                    </div>
                    {/* Floating Add to Cart Button */}
                    <div className="absolute top-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                        title="Add to Cart"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <div className="text-sm text-zinc-500 uppercase tracking-wide mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-zinc-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="text-lg md:text-xl font-bold text-zinc-900 mb-4">
                      XAF {product.price.toFixed(0).toLocaleString()}
                    </div>
                    <div className="mt-auto space-y-2">
                      <Link
                        href={`/cosmetics/${product._id}`}
                        className="inline-block w-full text-center px-4 py-2 border border-zinc-900 text-zinc-900 font-medium hover:bg-zinc-900 hover:text-white transition-colors rounded-sm duration-200 text-sm"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/purchase/${product._id}`}
                        className="inline-block w-full text-center px-4 py-2 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200 text-sm"
                      >
                        Purchase
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💄</div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                No featured products available
              </h3>
              <p className="text-zinc-600 mb-6">
                Check back soon for our latest featured collection.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/cosmetics"
              className="inline-flex items-center px-8 py-3 bg-zinc-900 text-white font-medium tracking-wide uppercase hover:bg-zinc-800 transition-colors duration-200 border border-zinc-900"
            >
              View All Products
            </Link>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Explore Our Collection
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              From skincare essentials to luxury makeup, find the perfect
              instrument for your musical journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/cosmetics?category=${encodeURIComponent(
                  category.name
                )}`}
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

                  {/* Floating Category Badge */}

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
                    <h3 className="font-bold text-white mb-2 group-hover:text-rose-400 transition-colors duration-300 text-2xl font-caveat">
                      {category.name}
                    </h3>
                    <p className="text-zinc-200 text-sm group-hover:text-zinc-100 transition-colors duration-300 font-outfit">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-rose-200 rounded-[5px] transition-colors duration-500 pointer-events-none"></div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-zinc-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                Why Choose GlowBeauty?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-900 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                      Expert Selection
                    </h3>
                    <p className="text-zinc-600">
                      Every product is handpicked by our team of experts with
                      decades of experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-900 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                      Quality Assurance
                    </h3>
                    <p className="text-zinc-600">
                      All instruments are thoroughly inspected and set up by our
                      master technicians.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-900 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                      Lifetime Support
                    </h3>
                    <p className="text-zinc-600">
                      We provide ongoing support and consultation for all
                      products purchased from us.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-zinc-100 border border-zinc-200">
                <Image
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=400&fit=crop"
                  alt="GlowBeauty store interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Testimonials />

      {/* Call to Action */}
      <section className="py-16 bg-zinc-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Beauty Products?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              browse our online collection. Our experts are here to help you
              find the beauty products of your dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cosmetics"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-zinc-900 font-medium tracking-wide uppercase hover:bg-zinc-100 transition-colors duration-200 border border-white"
              >
                Shop Online
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium tracking-wide uppercase hover:bg-white hover:text-zinc-900 transition-colors duration-200"
              >
                Visit Store
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
