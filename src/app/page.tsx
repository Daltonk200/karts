"use client";

import Hero from "@/components/Hero";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import NewArrivals from "@/components/home/NewArrivals";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div>

      {/* Hero */}
      <Hero />

      {/* Featured Go-Karts */}
      <FeaturedProducts />

      {/* Featured Categories */}
      <Categories />

      {/* Best Sellers / Trending */}
      <BestSellers />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Promotional Banner / Highlight */}
      <PromotionalBanner />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Use cases - left out (will use existing image sections elsewhere) */}

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter / CTA */}
      <CallToAction />

      {/* Footer (already included globally in Layout) */}
    </div>
  );
}
