"use client";

import Container from "@/components/Container";
import ProductCard from "@/components/karts/ProductCard";
import { mockProducts } from "@/data/mockProducts";

export default function NewArrivals() {
  const sorted = [...mockProducts]
    .slice()
    .reverse()
    .slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2 font-caveat">New Arrivals</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">Explore the latest additions to our lineup.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sorted.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} viewMode="grid" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
