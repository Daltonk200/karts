"use client";

import Image from "next/image";
import Container from "@/components/Container";

export default function KartsHero() {
  return (
    <section className="relative bg-black border-b border-zinc-200 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about.jpg"
          alt="Go-Kart Collection"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <Container className="py-12 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-caveat">
            Our Products
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto font-outfit">
            Discover premium go-karts, scooters, parts, and racing equipment from the world's finest
            manufacturers. From professional racing karts to accessories and safety gear, find everything you need.
          </p>
        </div>
      </Container>
    </section>
  );
}
