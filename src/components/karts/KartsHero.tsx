"use client";

import Image from "next/image";
import Container from "@/components/Container";

export default function KartsHero() {
  return (
    <section className="relative bg-black border-b border-zinc-200 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&q=80"
          alt="Go-Kart Collection"
          fill
          className="object-cover opacity-50"
        />
      </div>

      <Container className="py-12 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Go-Kart Collection
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Discover premium go-karts and racing equipment from the world's finest
            manufacturers. From professional racing karts to family recreational
            models, find your perfect ride.
          </p>
        </div>
      </Container>
    </section>
  );
}
