"use client";

import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedServices from "@/components/home/FeaturedServices";
import Categories from "@/components/home/Categories";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <FeaturedServices />
      <Categories />
      <PromotionalBanner />
      <Testimonials />
      <CallToAction />
    </>
  );
}
