import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-300 mt-12">
      <Container className="py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="relative w-26 h-16 flex items-center justify-center">
                  <Image
                    src="/apex_logo.png"
                    alt="Apex Logo"
                    width={3000}
                    height={3000}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </div>
              <p className="text-zinc-600 leading-relaxed max-w-md">
                Since 2012, we've been delivering the finest collection of
                high-performance go-karts and racing equipment. Our passion for
                speed and innovation drives everything we do.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-zinc-600">
                <svg
                  className="w-4 h-4 mr-3 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                contact@apexrushkarts.com
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-6 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Shop Karts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-6 uppercase tracking-wide">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-zinc-200 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end gap-6">
            {/* Newsletter */}
            <div className="lg:text-right">
              <h4 className="text-sm font-medium text-zinc-900 mb-4 uppercase tracking-wide">
                Stay Updated
              </h4>
              <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-200"
                />
                <button className="px-6 py-2 bg-red-600 text-white text-sm font-medium uppercase tracking-wide hover:bg-red-800 transition-colors duration-200 border border-red-600 cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-zinc-600">
            <div>
              © {new Date().getFullYear()} Apex Rush Karts - Premium Go-Karts & Racing Equipment. All
              rights reserved.
            </div>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/privacy"
                className="hover:text-zinc-900 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-zinc-900 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-zinc-900 transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
