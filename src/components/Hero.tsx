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
          src="https://img.freepik.com/makeup-brush-decorative-cosmetics-red-background-with-empty-space-top-view_250469-11169.jpg?W=6000"
          alt="Luxury cosmetics and beauty products background"
          fill
          className={`object-cover transition-opacity duration-1000 ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
          priority
        />

        {/* Video (fades in after delay) */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            showVideo ? "opacity-100" : "opacity-0"
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
                Premium Cosmetics,
                <br />
                <span className="text-zinc-200">Timeless Beauty</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-outfit">
                Luxury beauty products with the quality and effectiveness that
                only comes from decades of beauty expertise. Each product
                enhances your natural beauty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cosmetics"
                className="group rounded-sm relative inline-flex items-center justify-center px-8 py-4 bg-rose-600 text-white font-medium tracking-wide uppercase border border-rose-600 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Shop Collection
                </span>
                <div className="absolute inset-0 bg-rose-700 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              </Link>
              <Link
                href="/about"
                className="group relative rounded-sm inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium tracking-wide uppercase overflow-hidden transition-all duration-300 hover:border-rose-200"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-rose-600">
                  Our Story
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
