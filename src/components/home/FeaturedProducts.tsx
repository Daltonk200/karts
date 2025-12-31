"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

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
  rating?: number;
  reviews?: number;
}

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<Set<string>>(new Set());
  const [wishlistAnimation, setWishlistAnimation] = useState<Set<string>>(
    new Set()
  );
  const { addToCart, removeFromCart, items } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();

  // Mock featured products data (fallback)
  const mockFeaturedProducts: Product[] = [
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
      rating: 4.8,
      reviews: 24,
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
      rating: 4.6,
      reviews: 18,
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
      rating: 4.9,
      reviews: 32,
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
      rating: 4.7,
      reviews: 15,
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
      rating: 4.5,
      reviews: 28,
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
      rating: 4.4,
      reviews: 12,
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
      rating: 4.6,
      reviews: 19,
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
      rating: 4.8,
      reviews: 21,
    },
  ];

  useEffect(() => {
    fetchFeaturedProducts();
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
        kartType: product.condition || "",
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
        kartType: product.condition || "",
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

  return (
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
                <Link href={`/products/${product._id}`} className="aspect-[4/3] bg-zinc-100 relative overflow-hidden group rounded-t-[5px] block cursor-pointer">
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
                </Link>
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <div className="text-sm text-red-600 uppercase tracking-wide mb-2 font-outfit font-medium">
                    {product.category}
                  </div>
                  <h3 className="text-base md:text-xl font-semibold text-zinc-900 mb-2 line-clamp-2  group-hover:text-red-700 transition-colors duration-300">
                    {product.name}
                  </h3>
                  {/* Rating Stars and Review Count */}
                  {(product.rating || product.reviews) && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(product.rating || 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      {product.rating && (
                        <span className="text-sm font-medium text-zinc-700">
                          {product.rating.toFixed(1)}
                        </span>
                      )}
                      {product.reviews !== undefined && product.reviews > 0 && (
                        <span className="text-sm text-zinc-500">
                          ({product.reviews} {product.reviews === 1 ? "review" : "reviews"})
                        </span>
                      )}
                    </div>
                  )}
                  <div className="text-lg md:text-xl font-bold text-zinc-900 mb-4 ">
                    ${product.price.toFixed(0).toLocaleString()}
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
                      {/* Top row: Remove from Cart (left) + Heart (right) - Mobile only */}
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

                        {/* Right side: Heart button */}
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
                            className="w-full sm:flex-1 text-center px-4 py-2 bg-red-600 text-white font-medium cursor-pointer hover:bg-red-700 transition-all duration-300 text-sm rounded-[5px] font-outfit transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <FaShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        )}

                        {/* Desktop: Wishlist button */}
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
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-medium tracking-wide uppercase hover:bg-red-700 transition-all duration-300 border border-red-600 rounded-[5px] font-outfit transform hover:scale-105 hover:shadow-lg"
          >
            View All Products
          </Link>
        </div>
      </Container>
    </section>
  );
}

