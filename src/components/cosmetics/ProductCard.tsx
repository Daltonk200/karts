"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { Product } from "@/data/mockProducts";

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
      condition: product.skinType,
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
        skinType: product.skinType,
        size: product.sku || "",
        isFeatured: product.isFeatured,
      });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  if (viewMode === "grid") {
    return (
      <div className="bg-white border border-zinc-200 hover:border-rose-300 transition-all duration-300 flex flex-col rounded-[5px] shadow-sm hover:shadow-lg transform hover:-translate-y-1 group h-fit">
        {/* Image Container */}
        <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden group rounded-t-[5px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-rose-600 text-white text-xs font-medium uppercase tracking-wide rounded-full shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              {product.skinType}
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
                className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium hover:scale-110"
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
        <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow h-full">
          <div className="text-xs sm:text-sm text-rose-600 uppercase tracking-wide mb-1 sm:mb-2 font-outfit font-medium">
            {product.category}
          </div>
          <h3 className="text-sm sm:text-base md:text-xl font-semibold text-zinc-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-rose-700 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 mb-2 sm:mb-4">
            XAF {product.price.toFixed(0).toLocaleString()}
          </div>

          {/* Desktop Remove from Cart - positioned after price with minimal spacing */}
          <div className="h-4 mb-2">
            {isInCart(product._id) && (
              <button
                onClick={() => {
                  removeFromCart(product._id);
                  toast.success(`${product.name} removed from cart`);
                }}
                className="hidden md:block text-left text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline decoration-rose-300 hover:decoration-rose-500 transition-all cursor-pointer duration-200 font-outfit"
              >
                Remove from Cart
              </button>
            )}
          </div>

          <div className="mt-auto flex flex-col">
            {/* Mobile: Stacked layout, Desktop: Horizontal layout */}
            <div className="flex flex-col gap-2 sm:gap-2">
              {/* Top row: Remove from Cart (left) + View & Heart (right) - Mobile only */}
              <div className="flex items-end justify-between sm:hidden">
                {/* Remove from Cart - only show when in cart */}
                {isInCart(product._id) && (
                  <button
                    onClick={() => {
                      removeFromCart(product._id);
                      toast.success(`${product.name} removed from cart`);
                    }}
                    className="text-left text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline decoration-rose-300 hover:decoration-rose-500 transition-all duration-200 font-outfit"
                  >
                    Remove from Cart
                  </button>
                )}

                {/* Right side: View and Heart buttons */}
                <div className="flex gap-1 sm:gap-2 ml-auto">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`inline-flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 border text-xs sm:text-sm rounded-[5px] font-outfit transition-all duration-300 relative ${
                      isInWishlist(product._id)
                        ? "border-rose-300 text-rose-600 bg-rose-50 shadow-sm"
                        : "border-zinc-300 text-zinc-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 hover:scale-105"
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

                  <Link
                    href={`/cosmetics/${product._id}`}
                    className="inline-flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 border border-zinc-300 text-zinc-700 font-medium hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50 transition-all duration-300 text-xs sm:text-sm rounded-[5px] font-outfit gap-1 sm:gap-2"
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
                {isInCart(product._id) ? (
                  <button
                    disabled
                    className="w-full sm:flex-1 text-center px-4 py-2 bg-rose-300 cursor-not-allowed text-white font-medium text-sm rounded-[5px] font-outfit flex items-center justify-center gap-2"
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
                    className="w-full sm:flex-1 text-center px-4 py-2 bg-rose-600 text-white font-medium cursor-pointer hover:bg-rose-700 transition-all duration-300 text-sm rounded-[5px] font-outfit transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                )}

                {/* Desktop: Wishlist and View buttons on same line */}
                <div className="hidden sm:flex gap-2">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`inline-flex items-center justify-center px-3 py-2 border text-sm rounded-[5px] font-outfit transition-all duration-300 relative ${
                      isInWishlist(product._id)
                        ? "border-rose-300 text-rose-600 bg-rose-50 shadow-sm"
                        : "border-zinc-300 text-zinc-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 hover:scale-105"
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

                  <Link
                    href={`/cosmetics/${product._id}`}
                    className="inline-flex items-center justify-center px-3 py-2 border border-zinc-300 text-zinc-700 font-medium hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50 transition-all duration-300 text-sm rounded-[5px] font-outfit gap-2"
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
    );
  }

  // List View
  return (
    <div className="bg-white border border-zinc-200 hover:border-rose-300 transition-all duration-300 rounded-[5px] shadow-sm hover:shadow-lg group">
      <div className="flex flex-row">
        {/* Image Container */}
        <div className="w-32 sm:w-40 md:w-48 h-auto bg-zinc-100 relative overflow-hidden group rounded-l-[5px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-rose-600 text-white text-xs font-medium uppercase tracking-wide rounded-full shadow-lg">
              {product.skinType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 flex flex-col">
          <div className="text-xs sm:text-sm text-rose-600 uppercase tracking-wide mb-1 sm:mb-2 font-outfit font-medium">
            {product.category}
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-900 mb-1 sm:mb-2 group-hover:text-rose-700 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 mb-2 sm:mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 mb-2 sm:mb-4">
            XAF {product.price.toFixed(0).toLocaleString()}
          </div>

          {/* Remove from Cart - Desktop */}
          <div className="h-4 mb-2">
            {isInCart(product._id) && (
              <button
                onClick={() => {
                  removeFromCart(product._id);
                  toast.success(`${product.name} removed from cart`);
                }}
                className="hidden md:block text-left text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline decoration-rose-300 hover:decoration-rose-500 transition-all cursor-pointer duration-200 font-outfit"
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
                className="w-full sm:flex-1 text-center px-4 py-2 bg-rose-300 cursor-not-allowed text-white font-medium text-sm rounded-[5px] font-outfit flex items-center justify-center gap-2"
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
                className="w-full sm:flex-1 text-center px-4 py-2 bg-rose-600 text-white font-medium cursor-pointer hover:bg-rose-700 transition-all duration-300 text-sm rounded-[5px] font-outfit transform hover:scale-105"
              >
                Add to Cart
              </button>
            )}

            {/* Wishlist and View buttons */}
            <div className="flex gap-2">
              {/* Wishlist Button */}
              <button
                onClick={() => handleWishlistToggle(product)}
                className={`flex-1 inline-flex items-center justify-center px-3 py-2 border text-sm rounded-[5px] font-outfit transition-all duration-300 relative ${
                  isInWishlist(product._id)
                    ? "border-rose-300 text-rose-600 bg-rose-50 shadow-sm"
                    : "border-zinc-300 text-zinc-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 hover:scale-105"
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

              <Link
                href={`/cosmetics/${product._id}`}
                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-zinc-300 text-zinc-700 font-medium hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50 transition-all duration-300 text-sm rounded-[5px] font-outfit gap-2"
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

          {/* Remove from Cart - Mobile */}
          {isInCart(product._id) && (
            <button
              onClick={() => {
                removeFromCart(product._id);
                toast.success(`${product.name} removed from cart`);
              }}
              className="md:hidden text-left text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline decoration-rose-300 hover:decoration-rose-500 transition-all duration-200 font-outfit mt-2"
            >
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
