"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { Product } from "@/data/mockProducts";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { addToCart, removeFromCart, isInCart } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      kartType: product.kartType,
      stock: product.stock || 1,
      model: product.sku || "",
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        kartType: product.kartType,
        size: product.sku || "",
        isFeatured: product.isFeatured,
      });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  if (viewMode === "grid") {
    return (
      <div className="bg-white border border-zinc-200 hover:border-red-300 transition-all duration-300 flex flex-col rounded-[5px] shadow-sm hover:shadow-lg transform hover:-translate-y-1 group h-fit">
        {/* Image Container */}
        <Link href={`/products/${product._id}`} className="aspect-[4/3] bg-zinc-100 relative overflow-hidden group rounded-t-[5px] block cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium uppercase tracking-wide rounded-full shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              {product.kartType}
            </span>
          </div>
          {/* Floating Add to Cart Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {isInCart(product._id) ? (
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
        <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow h-full">
          <div className="text-xs sm:text-sm text-red-600 uppercase tracking-wide mb-1 sm:mb-2 font-outfit font-medium">
            {product.category}
          </div>
          <h3 className="text-sm sm:text-base md:text-xl font-semibold text-zinc-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-red-700 transition-colors duration-300">
            {product.name.length > 25
              ? `${product.name.slice(0, 25)}...`
              : product.name}
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
          <div className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 mb-2 sm:mb-4">
            ${product.price.toFixed(0).toLocaleString()}
          </div>

          {/* Desktop Remove from Cart - positioned after price with minimal spacing */}
          <div className="h-4 mb-2">
            {isInCart(product._id) && (
              <button
                onClick={() => {
                  removeFromCart(product._id);
                  toast.success(`${product.name} removed from cart`);
                }}
                className="hidden md:block text-left text-xs text-red-600 hover:text-red-700 font-medium hover:underline decoration-red-300 hover:decoration-red-500 transition-all cursor-pointer duration-200 font-outfit"
              >
                Remove from Cart
              </button>
            )}
          </div>

          <div className="mt-auto flex flex-col">
            {/* Mobile: Stacked layout, Desktop: Horizontal layout */}
            <div className="flex flex-col gap-2 sm:gap-2">
              {/* Top row: Remove from Cart (left) + Heart (right) - Mobile only */}
              <div className="flex items-end justify-between sm:hidden">
                {/* Remove from Cart - only show when in cart */}
                {isInCart(product._id) && (
                  <button
                    onClick={() => {
                      removeFromCart(product._id);
                      toast.success(`${product.name} removed from cart`);
                    }}
                    className="text-left text-xs text-red-600 hover:text-red-700 font-medium hover:underline decoration-red-300 hover:decoration-red-500 transition-all duration-200 font-outfit"
                  >
                    Remove from Cart
                  </button>
                )}

                {/* Right side: Heart button */}
                <div className="flex gap-1 sm:gap-2 ml-auto">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`inline-flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 border text-xs sm:text-sm rounded-[5px] font-outfit transition-all duration-300 relative ${isInWishlist(product._id)
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
                        className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300"
                        fill={
                          isInWishlist(product._id) ? "currentColor" : "none"
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
                    </div>
                  </button>
                </div>
              </div>

              {/* Bottom row: All buttons - Mobile: Stacked, Desktop: Horizontal */}
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Add to Cart Button */}
                {isInCart(product._id) ? (
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
                        className="w-4 h-4 transition-all duration-300"
                        fill={
                          isInWishlist(product._id) ? "currentColor" : "none"
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
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="bg-white border border-zinc-200 hover:border-red-300 transition-all duration-300 rounded-[5px] shadow-sm hover:shadow-lg group">
      <div className="flex flex-row">
        {/* Image Container */}
        <Link href={`/products/${product._id}`} className="w-32 sm:w-40 md:w-48 h-auto bg-zinc-100 relative overflow-hidden group rounded-l-[5px] block cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium uppercase tracking-wide rounded-full shadow-lg">
              {product.kartType}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 flex flex-col">
          <div className="text-xs sm:text-sm text-red-600 uppercase tracking-wide mb-1 sm:mb-2 font-outfit font-medium">
            {product.category}
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-900 mb-1 sm:mb-2 group-hover:text-red-700 transition-colors duration-300">
            {product.name.length > 60
              ? `${product.name.slice(0, 60)}...`
              : product.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 mb-2 sm:mb-4 line-clamp-2">
            {product.description}
          </p>
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
          <div className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 mb-2 sm:mb-4">
            ${product.price.toFixed(0).toLocaleString()}
          </div>

          {/* Remove from Cart - Desktop */}
          <div className="h-4 mb-2">
            {isInCart(product._id) && (
              <button
                onClick={() => {
                  removeFromCart(product._id);
                  toast.success(`${product.name} removed from cart`);
                }}
                className="hidden md:block text-left text-xs text-red-600 hover:text-red-700 font-medium hover:underline decoration-red-300 hover:decoration-red-500 transition-all cursor-pointer duration-200 font-outfit"
              >
                Remove from Cart
              </button>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-auto flex flex-col sm:flex-row gap-2">
            {/* Add to Cart Button */}
            {isInCart(product._id) ? (
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

            {/* Wishlist button */}
            <div className="flex gap-2">
              {/* Wishlist Button */}
              <button
                onClick={() => handleWishlistToggle(product)}
                className={`flex-1 inline-flex items-center justify-center px-3 py-2 border text-sm rounded-[5px] font-outfit transition-all duration-300 relative ${isInWishlist(product._id)
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
                    className="w-4 h-4 transition-all duration-300"
                    fill={isInWishlist(product._id) ? "currentColor" : "none"}
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
              </button>
            </div>
          </div>

          {/* Remove from Cart - Mobile */}
          {isInCart(product._id) && (
            <button
              onClick={() => {
                removeFromCart(product._id);
                toast.success(`${product.name} removed from cart`);
              }}
              className="md:hidden text-left text-xs text-red-600 hover:text-red-700 font-medium hover:underline decoration-red-300 hover:decoration-red-500 transition-all duration-200 font-outfit mt-2"
            >
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
