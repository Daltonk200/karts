"use client";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show banner for 3 seconds, then trigger video
    const timer = setTimeout(() => {
      setShowVideo(true);
      // Start playing the video
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-white border-b border-zinc-200 -mt-20">
      {/* Background - Banner Image or Video */}
      <div className="absolute inset-0 z-0">
        {/* Banner Image (shown first) */}
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&q=80"
          alt="High-speed go-kart racing action"
          fill
          className={`object-cover transition-opacity duration-1000 ${showVideo ? "opacity-0" : "opacity-100"
            }`}
          priority
        />

        {/* Video (fades in after delay) */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showVideo ? "opacity-100" : "opacity-0"
            }`}
          muted
          loop
          playsInline
        >
          <source src="/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-zinc-900/60"></div>
      </div>

      {/* Content */}
      <Container className="relative z-10 pt-44 md:pt-52 lg:pt-60 pb-24 md:pb-32 lg:pb-40">
        <div className="max-w-2xl">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Premium Go-Karts,
                <br />
                <span className="text-zinc-200">Ultimate Racing</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-outfit">
                High-performance go-karts engineered for speed and precision.
                Experience the thrill of racing with our cutting-edge karts
                designed for both professionals and enthusiasts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/karts"
                className="group rounded-sm relative inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium tracking-wide uppercase border border-red-600 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Shop Karts
                </span>
                <div className="absolute inset-0 bg-red-700 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              </Link>
              <Link
                href="/about"
                className="group relative rounded-sm inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium tracking-wide uppercase overflow-hidden transition-all duration-300 hover:border-red-200"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-red-600">
                  Learn More
                </span>
                <div className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
