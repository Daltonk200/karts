"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import ProductCard from "@/components/karts/ProductCard";
import { Product } from "@/data/mockProducts";

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist } = useWishlistStore();
  const { addToCart, removeFromCart, isInCart } = useCartStore();

  const totalValue = wishlistItems.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  // Convert wishlist items to Product format for ProductCard component
  const convertToProductFormat = (wishlistItem: any): Product => ({
    _id: wishlistItem.id,
    name: wishlistItem.name,
    price: wishlistItem.price,
    image: wishlistItem.image,
    category: wishlistItem.category,
    brand: wishlistItem.brand,
    skinType: wishlistItem.skinType,
    isFeatured: wishlistItem.isFeatured || false,
    stock: 1, // Default stock for wishlist items
    sku: wishlistItem.size || "",
    description: `Beautiful ${wishlistItem.category.toLowerCase()} product from ${
      wishlistItem.brand
    }`,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
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
            <div className="bg-white rounded-[15px] shadow-sm p-8 border border-red-100 mb-12">
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
                  <div className="text-3xl font-caveat font-bold text-red-600">
                    XAF {totalValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-zinc-600 font-outfit">
                    Total Value
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid - Using the same ProductCard component */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
              {wishlistItems.map((wishlistItem) => {
                const product = convertToProductFormat(wishlistItem);
                return (
                  <div key={product._id} className="relative group">
                    <ProductCard product={product} viewMode="grid" />

                    {/* Custom Remove from Wishlist Button - Overlay on the card */}
                    <button
                      onClick={() =>
                        handleRemoveFromWishlist(product._id, product.name)
                      }
                      className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100"
                      title="Remove from Wishlist"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
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
                );
              })}
            </div>

            {/* Actions */}
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/karts"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-600 text-white font-semibold font-outfit rounded-[8px] hover:from-red-700 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-center"
              >
                Continue Shopping
              </Link>
              <button className="px-8 py-4 border-2 border-red-200 text-red-600 font-semibold font-outfit rounded-[8px] hover:bg-red-50 hover:border-red-300 transition-all duration-300">
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
              href="/karts"
              className="inline-block px-10 py-4 bg-gradient-to-r from-red-600 to-red-600 text-white font-semibold font-outfit rounded-[8px] hover:from-red-700 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
