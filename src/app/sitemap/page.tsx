"use client";

import Container from "@/components/Container";
import Link from "next/link";

export default function SitemapPage() {
  const pages = [
    {
      title: "Main Pages",
      links: [
        {
          name: "Home",
          href: "/",
          description: "Welcome to Guitar & Strings Co",
        },
        {
          name: "About Us",
          href: "/about",
          description: "Learn about our story and mission",
        },
        {
          name: "Contact",
          href: "/contact",
          description: "Get in touch with us",
        },
      ],
    },
    {
      title: "Shopping",
      links: [
        {
          name: "Shop Guitars",
          href: "/guitars",
          description: "Browse our complete guitar collection",
        },
        {
          name: "Wishlist",
          href: "/wishlist",
          description: "Your saved guitars",
        },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          name: "Privacy Policy",
          href: "/privacy",
          description: "How we protect your data",
        },
        {
          name: "Terms of Service",
          href: "/terms",
          description: "Terms and conditions",
        },
        {
          name: "Sitemap",
          href: "/sitemap",
          description: "Complete site structure",
        },
      ],
    },
  ];

  const categories = ["Electric Guitars", "Acoustic Guitars", "Bass Guitars"];

  const brands = [
    "Fender",
    "Gibson",
    "Martin",
    "Taylor",
    "Yamaha",
    "Ibanez",
    "Epiphone",
    "Gretsch",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 opacity-90"></div>
        </div>
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sitemap
            </h1>
            <p className="text-lg text-zinc-200 max-w-2xl mx-auto">
              Navigate through all pages and sections of our website.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Main Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
              {pages.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.links.map((link) => (
                      <div
                        key={link.name}
                        className="border-l-4 border-zinc-200 pl-4"
                      >
                        <Link
                          href={link.href}
                          className="text-lg font-medium text-zinc-900 hover:text-zinc-600 transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                        <p className="text-sm text-zinc-600 mt-1">
                          {link.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                Guitar Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/guitars?category=${category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="block p-4 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 text-center"
                  >
                    <span className="text-zinc-900 font-medium">
                      {category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                Popular Brands
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {brands.map((brand) => (
                  <Link
                    key={brand}
                    href={`/guitars?brand=${brand.toLowerCase()}`}
                    className="block p-4 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 text-center"
                  >
                    <span className="text-zinc-900 font-medium">{brand}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Homepage Sections */}
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                Homepage Sections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-50 p-6 border border-zinc-200">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                    Featured Products
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    Discover our handpicked selection of premium guitars,
                    carefully curated for quality and performance.
                  </p>
                  <Link
                    href="/guitars"
                    className="text-zinc-900 font-medium hover:text-zinc-600 transition-colors duration-200"
                  >
                    View All Guitars →
                  </Link>
                </div>

                <div className="bg-zinc-50 p-6 border border-zinc-200">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                    Guitar Categories
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    Explore different types of guitars - from acoustic to
                    electric, classical to bass.
                  </p>
                  <Link
                    href="/guitars"
                    className="text-zinc-900 font-medium hover:text-zinc-600 transition-colors duration-200"
                  >
                    Browse Categories →
                  </Link>
                </div>

                <div className="bg-zinc-50 p-6 border border-zinc-200">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                    Why Choose Us
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    Learn about our commitment to quality, expert service, and
                    decades of experience in the guitar industry.
                  </p>
                  <Link
                    href="/about"
                    className="text-zinc-900 font-medium hover:text-zinc-600 transition-colors duration-200"
                  >
                    Learn More →
                  </Link>
                </div>

                <div className="bg-zinc-50 p-6 border border-zinc-200">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                    Customer Testimonials
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    Read what our customers have to say about their experience
                    with Guitar & Strings Co.
                  </p>
                  <Link
                    href="/about"
                    className="text-zinc-900 font-medium hover:text-zinc-600 transition-colors duration-200"
                  >
                    Read Reviews →
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-16 p-8 bg-zinc-900 text-white rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Need Help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                  <p className="text-zinc-300">
                    Get in touch for questions, support, or to schedule a visit.
                  </p>
                  <Link
                    href="/contact"
                    className="text-white font-medium hover:text-zinc-300 transition-colors duration-200"
                  >
                    Contact Page →
                  </Link>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                  <p className="text-zinc-300">
                    Monday - Friday: 9AM - 8PM
                    <br />
                    Saturday: 10AM - 6PM
                    <br />
                    Sunday: 12PM - 5PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
