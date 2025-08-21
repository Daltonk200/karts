"use client";

import Image from "next/image";
import Container from "@/components/Container";

export default function CosmeticsHero() {
  return (
    <section className="relative bg-black border-b border-zinc-200 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://img.freepik.com/decorative-cosmetics-grey-background_93675-59752.jpg?W=2000"
          alt="Beauty Collection"
          fill
          className="object-cover opacity-50"
        />
      </div>

      <Container className="py-12 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Beauty Collection
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Discover handpicked cosmetics and skincare from the world's finest
            brands. From luxury makeup to effective skincare, find your perfect
            beauty essentials.
          </p>
        </div>
      </Container>
    </section>
  );
}
