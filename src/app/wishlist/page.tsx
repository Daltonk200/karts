"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineEye,
} from "react-icons/ai";

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const totalValue = wishlistItems.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative b text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://img.freepik.com/free-photo/young-woman-enjoys-beauty-spa-home-siting-bathrobe_273609-37081.jpg?t=st=1755708749~exp=1755712349~hmac=84a2126f99762e8aaa35963ed72a9cb90459f6e11da4d8e4913a84a840d507fb&w=2000"
            alt="Wishlist background"
            fill
            className="object-cover object-[50%_40%]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/60 to-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-caveat font-bold mb-6 text-">
              My Wishlist
            </h1>
            <p className="text-xl md:text-2xl font-outfit text-white max-w-3xl mx-auto">
              Your saved beauty treasures. Keep track of the products you love
              and want to add to your collection.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {wishlistItems.length > 0 ? (
          <>
            {/* Summary Card */}
            <div className="bg-white rounded-[15px] shadow-sm p-8 border border-rose-100 mb-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-caveat font-bold text-zinc-900 mb-2">
                    Wishlist Summary
                  </h2>
                  <p className="text-zinc-600 font-outfit">
                    {wishlistItems.length} product
                    {wishlistItems.length !== 1 ? "s" : ""} in your wishlist
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-caveat font-bold text-rose-600">
                    XAF {totalValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-zinc-600 font-outfit">
                    Total Value
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[3px]  border border-rose-100 hover:shadow-sm transition-all duration-300 transform hover:-translate-y-2 group animate-wishlist-pop"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-rose-50 to-pink-50 relative overflow-hidden rounded-t-[3px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isOnSale && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg">
                          SALE
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="px-3 py-1 bg-rose-600 text-white text-xs font-semibold rounded-full shadow-lg">
                          FEATURED
                        </span>
                      )}
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-zinc-700 text-xs font-semibold rounded-full shadow-lg">
                        {product.category}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        handleRemoveFromWishlist(
                          product.id.toString(),
                          product.name
                        )
                      }
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm border border-rose-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300 flex items-center justify-center rounded-full shadow-lg group/btn"
                    >
                      <AiOutlineHeart className="w-5 h-5 text-rose-600 group-hover/btn:text-red-600 transition-colors duration-300" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-sm text-rose-500 uppercase tracking-wide mb-2 font-outfit font-semibold">
                      {product.brand} • {product.category}
                    </div>
                    <h3 className="text-lg font-caveat font-bold text-zinc-900 mb-3 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl font-caveat font-bold text-rose-600">
                        XAF {product.price.toLocaleString()}
                      </span>
                      {product.isOnSale && (
                        <span className="text-sm text-zinc-500 line-through font-outfit">
                          XAF {product.originalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold font-outfit rounded-[8px] hover:from-rose-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <AiOutlineShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <Link
                        href={`/products/${product.id}`}
                        className="block w-full py-3 px-4 border-2 border-rose-200 text-rose-600 font-semibold font-outfit rounded-[8px] hover:bg-rose-50 hover:border-rose-300 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <AiOutlineEye className="w-5 h-5" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/cosmetics"
                className="px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold font-outfit rounded-[8px] hover:from-rose-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Continue Shopping
              </Link>
              <button className="px-8 py-4 border-2 border-rose-200 text-rose-600 font-semibold font-outfit rounded-[8px] hover:bg-rose-50 hover:border-rose-300 transition-all duration-300">
                Share Wishlist
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-8 animate-bounce">💔</div>
            <h2 className="text-4xl font-caveat font-bold text-zinc-900 mb-6">
              Your wishlist is empty
            </h2>
            <p className="text-xl text-zinc-600 mb-10 max-w-2xl mx-auto font-outfit">
              Start building your beauty collection by browsing our premium
              products and adding your favorites to your wishlist.
            </p>
            <Link
              href="/cosmetics"
              className="inline-block px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold font-outfit rounded-[8px] hover:from-rose-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
