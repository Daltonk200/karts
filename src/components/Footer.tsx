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
                  href="/racing-guide"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Racing Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/maintenance-tips"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Maintenance Tips
                </Link>
              </li>
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

        {/* Social Media & Newsletter */}
        <div className="border-t border-zinc-200 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Social Media */}
            <div>
              <h4 className="text-sm font-medium text-zinc-900 mb-4 uppercase tracking-wide">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {/* Instagram */}
                <Link
                  href="https://www.instagram.com/apexrushkarts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 border border-zinc-300 hover:bg-zinc-50 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 text-zinc-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>

                {/* TikTok */}
                <Link
                  href="https://www.tiktok.com/@apexrushkarts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 border border-zinc-300 hover:bg-zinc-50 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 text-zinc-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </Link>

                {/* YouTube */}
                <Link
                  href="https://www.youtube.com/@apexrushkarts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 border border-zinc-300 hover:bg-zinc-50 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 text-zinc-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link>
              </div>
            </div>

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
