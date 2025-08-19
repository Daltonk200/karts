"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist } = useWishlistStore();

  const totalValue = wishlistItems.reduce(
    (sum, guitar) => sum + guitar.price,
    0
  );

  const handleRemoveFromWishlist = (guitarId: string, guitarName: string) => {
    removeFromWishlist(guitarId);
    toast.success(`${guitarName} removed from wishlist`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-zinc-50 border-b border-zinc-200">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              My Wishlist
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Your saved guitars. Keep track of the instruments you love and
              want to add to your collection.
            </p>
          </div>
        </Container>
      </section>

      {/* Wishlist Content */}
      <section className="py-12">
        <Container>
          {wishlistItems.length > 0 ? (
            <>
              {/* Summary */}
              <div className="mb-8 p-6 bg-white border border-zinc-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900 mb-2">
                      Wishlist Summary
                    </h2>
                    <p className="text-zinc-600">
                      {wishlistItems.length} guitar
                      {wishlistItems.length !== 1 ? "s" : ""} in your wishlist
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-zinc-900">
                      ${totalValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-zinc-600">Total Value</div>
                  </div>
                </div>
              </div>

              {/* Guitar Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((guitar) => (
                  <div
                    key={guitar.id}
                    className="bg-white border border-zinc-200 hover:border-zinc-300 transition-colors duration-200 flex flex-col group"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                      <Image
                        src={guitar.image}
                        alt={guitar.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {guitar.isOnSale && (
                          <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium uppercase tracking-wide">
                            Sale
                          </span>
                        )}
                        {guitar.isFeatured && (
                          <span className="px-2 py-1 bg-zinc-900 text-white text-xs font-medium uppercase tracking-wide">
                            Featured
                          </span>
                        )}
                        <span className="px-2 py-1 bg-white text-zinc-900 text-xs font-medium uppercase tracking-wide border border-zinc-200">
                          {guitar.condition}
                        </span>
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          handleRemoveFromWishlist(guitar.id.toString(), guitar.name)
                        }
                        className="absolute top-3 right-3 w-8 h-8 bg-white border border-zinc-300 hover:bg-red-50 hover:border-red-300 transition-all duration-200 flex items-center justify-center group/btn"
                      >
                        <svg
                          className="w-4 h-4 text-zinc-600 group-hover/btn:text-red-600 transition-colors duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-sm text-zinc-500 uppercase tracking-wide mb-2">
                        {guitar.brand} • {guitar.category}
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2 line-clamp-2">
                        {guitar.name}
                      </h3>

                    

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-zinc-900">
                          ${guitar.price.toLocaleString()}
                        </span>
                        {guitar.isOnSale && (
                          <span className="text-sm text-zinc-500 line-through">
                            ${guitar.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto space-y-2">
                        <Link
                          href={`/guitars/${guitar.id}`}
                          className="block w-full text-center px-4 py-2 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200"
                        >
                          View Details
                        </Link>
                        <button className="w-full px-4 py-2 border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 transition-colors duration-200">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/guitars"
                  className="px-8 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200 text-center"
                >
                  Continue Shopping
                </Link>
                <button className="px-8 py-3 border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 transition-colors duration-200">
                  Share Wishlist
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">💔</div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-zinc-600 mb-8 max-w-md mx-auto">
                Start building your collection by browsing our guitars and
                adding your favorites to your wishlist.
              </p>
              <Link
                href="/guitars"
                className="inline-block px-8 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200"
              >
                Browse Guitars
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
