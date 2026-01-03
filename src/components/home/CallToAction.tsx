import Link from "next/link";
import Container from "@/components/Container";
import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/cta.jpg"
          alt="Call to action background"
          fill
          className="object-cover w-full h-full"
          priority={false}
        />
        {/* Gradient Overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/40 to-transparent"></div>
      </div>
      <Container className="relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Racing Machine?
          </h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Browse our elite collection. Our racing experts are here to help you
            find the high-performance machine of your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-zinc-900 font-medium tracking-wide uppercase hover:bg-zinc-100 transition-colors duration-200 border border-white"
            >
              Shop Online
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium tracking-wide uppercase hover:bg-white hover:text-zinc-900 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}


