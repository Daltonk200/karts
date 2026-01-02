"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PromotionalBanner() {
  const [countdown, setCountdown] = useState({
    hours: 24,
    minutes: 45,
    seconds: 32,
  });

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
                    Free Shipping Over $50
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium font-outfit">
                    Premium Brands Only
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Link
                    href="/products?sale=mega"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-green-600 border-2 border-green-600 font-bold text-sm sm:text-base rounded-[3px] hover:bg-green-50 transition-all duration-300 font-outfit transform hover:scale-105 hover:shadow-xl w-fit"
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
            <div className="bg-white rounded-full p-1.5 sm:p-2 border-2 border-green-600">
              <div className="text-green-600 text-center">
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
  );
}


