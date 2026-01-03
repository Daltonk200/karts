"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import ProductCard from "@/components/karts/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string | any;
  brand: string;
  rating?: number;
  reviews?: number;
  createdAt?: string;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products?limit=8&sortBy=createdAt&sortOrder=desc");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2 font-caveat">New Arrivals</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Explore the latest additions to our lineup.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-zinc-200 rounded-[5px] animate-pulse"></div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2 font-caveat">New Arrivals</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">Explore the latest additions to our lineup.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product as any} viewMode="grid" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
