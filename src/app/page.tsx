"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import toast from "react-hot-toast";
import { AiOutlineSchedule } from "react-icons/ai";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  condition: string;
  brand: string;
  size: string;
  isFeatured: boolean;
}

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

export default function Home() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<Set<string>>(new Set());
  const [wishlistAnimation, setWishlistAnimation] = useState<Set<string>>(
    new Set()
  );
  const [countdown, setCountdown] = useState({
    hours: 24,
    minutes: 45,
    seconds: 32,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart, removeFromCart, items } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  // Mock data for categories (keeping this as is since it's static)
  const categories = [
    {
      name: "Racing Karts",
      description: "High-performance racing go-karts for competitive racing",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
    {
      name: "Recreational Karts",
      description: "Fun and safe go-karts perfect for leisure and family entertainment",
      image:
        "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
    },
    {
      name: "Electric Karts",
      description: "Eco-friendly electric go-karts with instant torque and quiet operation",
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    },
    {
      name: "Racing Gear",
      description:
        "Professional racing helmets, suits, gloves, and safety equipment for karting",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
  ];

  // Mock featured products data
  const mockFeaturedProducts = [
    {
      _id: "1",
      name: "Apex Pro Racing Kart",
      price: 4500000,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      category: "Racing Karts",
      condition: "Professional",
      brand: "Apex Rush",
      size: "Adult",
      isFeatured: true,
    },
    {
      _id: "2",
      name: "Thunder 250cc Racing Kart",
      price: 3800000,
      image:
        "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
      category: "Racing Karts",
      condition: "Professional",
      brand: "Apex Rush",
      size: "Adult",
      isFeatured: true,
    },
    {
      _id: "3",
      name: "Velocity Electric Kart",
      price: 5200000,
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
      category: "Electric Karts",
      condition: "Eco-Friendly",
      brand: "Apex Rush",
      size: "Adult",
      isFeatured: true,
    },
    {
      _id: "4",
      name: "Junior Racer Kart",
      price: 2500000,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      category: "Recreational Karts",
      condition: "Youth",
      brand: "Apex Rush",
      size: "Junior",
      isFeatured: true,
    },
    {
      _id: "5",
      name: "Pro Racing Helmet",
      price: 180000,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      category: "Racing Gear",
      condition: "Safety",
      brand: "Apex Rush",
      size: "M-XL",
      isFeatured: true,
    },
    {
      _id: "6",
      name: "Speed Master 200cc Kart",
      price: 3200000,
      image:
        "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
      category: "Racing Karts",
      condition: "Intermediate",
      brand: "Apex Rush",
      size: "Adult",
      isFeatured: true,
    },
    {
      _id: "7",
      name: "Racing Suit Pro Series",
      price: 280000,
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
      category: "Racing Gear",
      condition: "Professional",
      brand: "Apex Rush",
      size: "S-XXL",
      isFeatured: true,
    },
    {
      _id: "8",
      name: "Family Fun Kart",
      price: 2200000,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      category: "Recreational Karts",
      condition: "Family",
      brand: "Apex Rush",
      size: "Adult",
      isFeatured: true,
    },
    {
      _id: "9",
      name: "Racing Gloves Premium",
      price: 85000,
      image:
        "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
      category: "Racing Gear",
      condition: "Professional",
      brand: "Apex Rush",
      size: "S-XL",
      isFeatured: true,
    },
    {
      _id: "10",
      name: "Eco Racer Electric Kart",
      price: 4900000,
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
      category: "Electric Karts",
      condition: "Eco-Friendly",
      brand: "Apex Rush",
      size: "Adult",
      isFeatured: true,
    },
  ];

  const handleAddToCart = (product: Product) => {
    // Show loading state
    setAddingToCart((prev) => new Set(prev).add(product._id));

    // Simulate API call delay
    setTimeout(() => {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        condition: product.condition,
        stock: 1, // Default stock
        model: product.size || "",
      });

      // Remove loading state
      setAddingToCart((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product._id);
        return newSet;
      });

      toast.success(`${product.name} added to cart`);
    }, 800); // Simulate loading delay
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      // Add to wishlist with TikTok-style animation
      setWishlistAnimation((prev) => new Set(prev).add(product._id));

      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        condition: product.condition,
        size: product.size,
        isFeatured: product.isFeatured,
      });

      // Remove animation after it completes
      setTimeout(() => {
        setWishlistAnimation((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product._id);
          return newSet;
        });
      }, 600);

      toast.success(`${product.name} added to wishlist`);
    }
  };

  // Slider navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.ceil(featuredProducts.length / 4) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(featuredProducts.length / 4) - 1 : prev - 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    fetchFeaturedProducts();
    fetchFeaturedServices();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products?isFeatured=true&limit=8");
      const data = await response.json();

      if (response.ok) {
        setFeaturedProducts(data.products || []);
      } else {
        console.error("Failed to fetch featured products:", data);
        // Fallback to mock data if API fails
        setFeaturedProducts(mockFeaturedProducts);
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
      // Fallback to mock data if API fails
      setFeaturedProducts(mockFeaturedProducts);
    } finally {
      setLoading(false);
    }
  };

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

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 24 hours when countdown reaches 0
          hours = 24;
          minutes = 0;
          seconds = 0;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Hero />

      {/* Test Drive Alert */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
        <Container className="py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex md:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AiOutlineSchedule size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-red-900 mb-1">
                  Book Test Drive
                </h3>
                <p className="text-red-800">
                  Schedule a test drive with our racing experts and experience
                  the thrill of our premium go-karts.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium  hover:bg-red-700 rounded-sm w-fit transition-colors duration-200 whitespace-nowrap"
            >
              Contact for Test Drive
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
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 font-caveat">
              Featured Go-Karts
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-outfit">
              Premium go-karts from our elite collection. Each kart is
              engineered for performance, safety, and the ultimate racing experience.
            </p>
          </div>

          {loading ? (
            <div className=" gap-4 md:gap-8 flex overflow-x-scroll snap-x snap-proximity">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white border min-w-[230px]  md:min-w-[300px] border-zinc-200 animate-pulse rounded-[5px] shadow-sm"
                >
                  <div className="aspect-[4/3] bg-zinc-200 rounded-t-[5px]"></div>
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
            <div className="flex overflow-x-scroll snap-x snap-proximity grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-1 md:gap-2">
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white snap-start border min-w-[230px]  md:min-w-[300px] border-zinc-200 hover:border-red-300 transition-all duration-300 flex flex-col rounded-[5px] shadow-sm hover:shadow-sm transform hover:-translate-y-1 group"
                >
                  <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden group rounded-t-[5px]">
                    <Image
                      src={
                        product.image ||
                        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop"
                      }
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium uppercase tracking-wide rounded-full shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        {product.condition}
                      </span>
                    </div>
                    {/* Floating Add to Cart Button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {addingToCart.has(product._id) ? (
                        <div className="bg-red-500 text-white px-3 py-2 rounded-full shadow-lg flex items-center justify-center">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                            <div
                              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      ) : items.some((item) => item.id === product._id) ? (
                        <div className="bg-green-700 text-white px-3 py-2 rounded-full shadow-lg flex items-center justify-center group/float relative">
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {/* Remove from cart tooltip */}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/float:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeFromCart(product._id);
                                toast.success(
                                  `${product.name} removed from cart`
                                );
                              }}
                              className="whitespace-nowrap text-xs text-red-600 hover:text-red-700 font-medium underline decoration-red-300 hover:decoration-red-500 transition-all duration-200 font-outfit bg-white px-2 py-1 rounded shadow-lg"
                            >
                              Remove from Cart
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium hover:scale-110"
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
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <div className="text-sm text-red-600 uppercase tracking-wide mb-2 font-outfit font-medium">
                      {product.category}
                    </div>
                    <h3 className="text-base md:text-xl font-semibold text-zinc-900 mb-2 line-clamp-2  group-hover:text-red-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="text-lg md:text-xl font-bold text-zinc-900 mb-4 ">
                      XAF {product.price.toFixed(0).toLocaleString()}
                    </div>
                    <div className="mt-auto">
                      {items.some((item) => item.id === product._id) && (
                        <button
                          onClick={() => {
                            removeFromCart(product._id);
                            toast.success(`${product.name} removed from cart`);
                          }}
                          className="text-center hidden md:block text-xs text-red-600 hover:text-red-700 font-medium hover:underline decoration-red-300 hover:decoration-red-500 transition-all  mb-1 cursor-pointer duration-200 font-outfit"
                        >
                          Remove from Cart
                        </button>
                      )}

                      {/* Mobile: Stacked layout, Desktop: Horizontal layout */}
                      <div className="flex flex-col gap-3 sm:gap-2">
                        {/* Top row: Remove from Cart (left) + View & Heart (right) - Mobile only */}
                        <div className="flex items-end justify-between sm:hidden">
                          {/* Remove from Cart - only show when in cart */}
                          {items.some((item) => item.id === product._id) && (
                            <button
                              onClick={() => {
                                removeFromCart(product._id);
                                toast.success(
                                  `${product.name} removed from cart`
                                );
                              }}
                              className="text-left text-xs text-red-600 hover:text-red-700 font-medium hover:underline decoration-red-300 hover:decoration-red-500 transition-all duration-200 font-outfit"
                            >
                              Remove from Cart
                            </button>
                          )}

                          {/* Right side: View and Heart buttons */}
                          <div className="flex gap-2 ml-auto">
                            {/* Wishlist Button */}
                            <button
                              onClick={() => handleWishlistToggle(product)}
                              className={`inline-flex items-center justify-center px-3 py-2 border text-sm rounded-[5px] font-outfit transition-all duration-300 relative ${isInWishlist(product._id)
                                ? "border-red-300 text-red-600 bg-red-50 shadow-sm"
                                : "border-zinc-300 text-zinc-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 hover:scale-105"
                                }`}
                              title={
                                isInWishlist(product._id)
                                  ? "Remove from Wishlist"
                                  : "Add to Wishlist"
                              }
                            >
                              <div className="relative">
                                <svg
                                  className={`w-4 h-4 transition-all duration-300 ${wishlistAnimation.has(product._id)
                                    ? "animate-wishlist-pop"
                                    : ""
                                    }`}
                                  fill={
                                    isInWishlist(product._id)
                                      ? "currentColor"
                                      : "none"
                                  }
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

                                {/* TikTok-style popping animation - only around the heart */}
                                {wishlistAnimation.has(product._id) && (
                                  <div className="absolute -inset-2 pointer-events-none">
                                    <div className="absolute inset-0 bg-red-500 rounded-full animate-wishlist-ripple opacity-75"></div>
                                    <div
                                      className="absolute inset-0 bg-red-400 rounded-full animate-wishlist-ripple"
                                      style={{ animationDelay: "0.1s" }}
                                    ></div>
                                    <div
                                      className="absolute inset-0 bg-red-300 rounded-full animate-wishlist-ripple"
                                      style={{ animationDelay: "0.2s" }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </button>

                            <Link
                              href={`/karts/${product._id}`}
                              className="inline-flex items-center justify-center px-3 py-2 border border-zinc-300 text-zinc-700 font-medium hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-all duration-300 text-sm rounded-[5px] font-outfit gap-2"
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>

                        {/* Bottom row: All buttons - Mobile: Stacked, Desktop: Horizontal */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          {/* Add to Cart Button */}
                          {addingToCart.has(product._id) ? (
                            <button
                              disabled
                              className="w-full sm:flex-1 text-center px-4 py-2 bg-red-500 text-white font-medium text-sm rounded-[5px] font-outfit flex items-center justify-center gap-2"
                            >
                              <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                                <div
                                  className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                              Adding...
                            </button>
                          ) : items.some((item) => item.id === product._id) ? (
                            <button
                              disabled
                              className="w-full sm:flex-1 text-center px-4 py-2 bg-red-300 cursor-not-allowed text-white font-medium text-sm rounded-[5px] font-outfit flex items-center justify-center gap-2"
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
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              In Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full sm:flex-1 text-center px-4 py-2 bg-red-600 text-white font-medium cursor-pointer hover:bg-red-700 transition-all duration-300 text-sm rounded-[5px] font-outfit transform hover:scale-105"
                            >
                              Add to Cart
                            </button>
                          )}

                          {/* Desktop: Wishlist and View buttons on same line */}
                          <div className="hidden sm:flex gap-2">
                            {/* Wishlist Button */}
                            <button
                              onClick={() => handleWishlistToggle(product)}
                              className={`inline-flex items-center justify-center px-3 py-2 border text-sm rounded-[5px] font-outfit transition-all duration-300 relative ${isInWishlist(product._id)
                                ? "border-red-300 text-red-600 bg-red-50 shadow-sm"
                                : "border-zinc-300 text-zinc-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 hover:scale-105"
                                }`}
                              title={
                                isInWishlist(product._id)
                                  ? "Remove from Wishlist"
                                  : "Add to Wishlist"
                              }
                            >
                              <div className="relative">
                                <svg
                                  className={`w-4 h-4 transition-all duration-300 ${wishlistAnimation.has(product._id)
                                    ? "animate-wishlist-pop"
                                    : ""
                                    }`}
                                  fill={
                                    isInWishlist(product._id)
                                      ? "currentColor"
                                      : "none"
                                  }
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

                                {/* TikTok-style popping animation - only around the heart */}
                                {wishlistAnimation.has(product._id) && (
                                  <div className="absolute -inset-2 pointer-events-none">
                                    <div className="absolute inset-0 bg-red-500 rounded-full animate-wishlist-ripple opacity-75"></div>
                                    <div
                                      className="absolute inset-0 bg-red-400 rounded-full animate-wishlist-ripple"
                                      style={{ animationDelay: "0.1s" }}
                                    ></div>
                                    <div
                                      className="absolute inset-0 bg-red-300 rounded-full animate-wishlist-ripple"
                                      style={{ animationDelay: "0.2s" }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </button>

                            <Link
                              href={`/karts/${product._id}`}
                              className="inline-flex items-center justify-center px-3 py-2 border border-zinc-300 text-zinc-700 font-medium hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-all duration-300 text-sm rounded-[5px] font-outfit gap-2"
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏎️</div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2 font-caveat">
                No featured products available
              </h3>
              <p className="text-zinc-600 mb-6 font-outfit">
                Check back soon for our latest featured collection.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/karts"
              className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-medium tracking-wide uppercase hover:bg-red-700 transition-all duration-300 border border-red-600 rounded-[5px] font-outfit transform hover:scale-105 hover:shadow-lg"
            >
              View All Products
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Services */}
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
                        XAF {service.price.toLocaleString()}
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

      {/* Categories */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Explore Our Collection
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              From professional racing karts to high-speed e-bikes and premium parts, find everything you need for your racing journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/karts?category=${encodeURIComponent(
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

      {/* Wide Promotional Banner */}
      <section className="py-1">
        <div className="relative overflow-hidden group max-w-none">
          {/* Background Image */}
          <div className="aspect-[1.4] sm:aspect-[4/1] md:aspect-[4/1] lg:aspect-[4/1] bg-zinc-100 relative">
            <Image
              src="https://ebikesbyrevolve.com/wp-content/uploads/2020/08/The-Rocket-in-LI-1.png"
              alt="Special Racing Offers"
              fill
              className="object-cover object-right group-hover:scale-102 transition-transform duration-300 ease-out"
            />

            {/* Gradient Overlay - Darker on left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent transition-all duration-300"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 text-white w-full">
                <div className="max-w-[1500px] mx-auto">
                  {/* Badge with Timer */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                    <div className="inline-block bg-red-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium w-fit font-outfit">
                      ⏰ LIMITED TIME OFFER
                    </div>
                    {/* Live Countdown Timer */}
                    <div className="flex items-center gap-2 text-white">
                      <div className="text-center">
                        {/* <div className="text-xs text-red-200 font-outfit mb-2">
                          Time Left
                        </div> */}
                        <div className="flex items-center gap-1">
                          {/* Hours */}
                          <div className="bg-white/20 backdrop-blur-sm rounded-[5px] px-1.5 sm:px-2 py-1 sm:py-1.5 text-center border border-white/30 min-w-[32px] sm:min-w-[40px]">
                            <div className="text-xs sm:text-sm font-bold font-caveat">
                              {countdown.hours.toString().padStart(2, "0")}
                            </div>
                          </div>

                          {/* Separator */}
                          <div className="text-white font-bold text-base sm:text-lg">
                            :
                          </div>

                          {/* Minutes */}
                          <div className="bg-white/20 backdrop-blur-sm rounded-[5px] px-1.5 sm:px-2 py-1 sm:py-1.5 text-center border border-white/30 min-w-[32px] sm:min-w-[40px]">
                            <div className="text-xs sm:text-sm font-bold font-caveat">
                              {countdown.minutes.toString().padStart(2, "0")}
                            </div>
                          </div>

                          {/* Separator */}
                          <div className="text-white font-bold text-base sm:text-lg">
                            :
                          </div>

                          {/* Seconds */}
                          <div className="bg-white/20 backdrop-blur-sm rounded-[5px] px-1.5 sm:px-2 py-1 sm:py-1.5 text-center border border-white/30 min-w-[32px] sm:min-w-[40px]">
                            <div className="text-xs sm:text-sm font-bold font-caveat">
                              {countdown.seconds.toString().padStart(2, "0")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 font-caveat">
                    MEGA RACING SALE
                  </h2>

                  {/* Subheading */}
                  <p className="text-xs sm:text-sm md:text-base text-red-100 mb-3 sm:mb-4 font-outfit">
                    Up to 70% OFF on Premium Karts, E-Bikes & Parts
                  </p>

                  {/* Offer Details */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium font-outfit">
                      Free Gift with Purchase
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium font-outfit">
                      Free Shipping Over XAF 50K
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium font-outfit">
                      Premium Brands Only
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Link
                      href="/karts?sale=mega"
                      className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white font-bold text-sm sm:text-base rounded-[3px] hover:bg-red-700 transition-all duration-300 font-outfit transform hover:scale-105 hover:shadow-xl w-fit"
                    >
                      Shop Now
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"
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
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 border border-red-500/30">
                <div className="text-red-600 text-center">
                  <div className="text-base sm:text-lg font-bold font-caveat">
                    70%
                  </div>
                  <div className="text-[10px] sm:text-xs font-outfit">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Testimonials /> */}

      {/* Call to Action */}
      <section className="py-16 bg-zinc-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Racing Machine?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Browse our elite collection. Our racing experts are here to help you
              find the high-performance machine of your dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/karts"
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
