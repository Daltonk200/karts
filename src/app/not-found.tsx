"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Illustration */}

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-caveat font-bold text-red-600 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-caveat font-bold text-zinc-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 font-outfit max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the
            beauty universe. Don't worry, we'll help you find your way back to
            our amazing products and services.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/"
            className="group bg-white rounded-2xl shadow-sm p-6 border border-zinc-200 hover:border-red-200 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors duration-300">
              <AiOutlineHome className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-caveat font-bold text-zinc-900 mb-2">
              Go Home
            </h3>
            <p className="text-zinc-600 font-outfit text-sm">
              Return to our homepage and discover our beauty collection
            </p>
          </Link>

          <Link
            href="/products"
            className="group bg-white rounded-2xl shadow-sm p-6 border border-zinc-200 hover:border-red-200 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors duration-300">
              <AiOutlineShoppingCart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-caveat font-bold text-zinc-900 mb-2">
              Shop Products
            </h3>
            <p className="text-zinc-600 font-outfit text-sm">
              Explore our premium skincare, makeup, and fragrance collection
            </p>
          </Link>

          <Link
            href="/services"
            className="group bg-white rounded-2xl shadow-sm p-6 border border-zinc-200 hover:border-red-200 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors duration-300">
              <AiOutlineUser className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-caveat font-bold text-zinc-900 mb-2">
              Our Services
            </h3>
            <p className="text-zinc-600 font-outfit text-sm">
              Book a consultation with our beauty experts
            </p>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-zinc-200 max-w-2xl mx-auto">
          <h3 className="text-2xl font-caveat font-bold text-zinc-900 mb-4">
            Looking for Something Specific?
          </h3>
          <p className="text-zinc-600 font-outfit mb-6">
            Try searching for popular categories or contact us for assistance.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/products?category=Racing Karts"
              className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-outfit hover:bg-red-200 transition-colors duration-300"
            >
              Racing Karts
            </Link>
            <Link
              href="/products?category=Scooters"
              className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-outfit hover:bg-red-200 transition-colors duration-300"
            >
              Scooters
            </Link>
            <Link
              href="/products?category=Parts & Accessories"
              className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-outfit hover:bg-red-200 transition-colors duration-300"
            >
              Parts & Accessories
            </Link>
            <Link
              href="/products?category=Safety Equipment"
              className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-outfit hover:bg-red-200 transition-colors duration-300"
            >
              Safety Equipment
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-outfit hover:bg-red-200 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] font-outfit"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
