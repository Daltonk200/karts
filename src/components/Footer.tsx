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
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                      GlowBeauty
                    </h1>
                    <p className="text-xs text-rose-500 font-medium">Premium Cosmetics</p>
                  </div>
                </div>
              </div>
              <p className="text-zinc-600 leading-relaxed max-w-md">
                Since 2008, we've been curating the finest collection of luxury
                cosmetics and beauty products. Our passion for quality and beauty
                drives everything we do.
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
                contact@guitarstringsco.com
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
                  href="/guitars"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Shop Guitars
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
              <li>
                <Link
                  href="/custom-guitar"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Custom Guitar
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
                  href="/shipping"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link
                  href="/repairs"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm"
                >
                  Guitar Repairs
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
                <Link
                  href="https://www.tiktok.com/@guitarandstrings?_t=ZM-8ynLK6PrDk5&_r=1"
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
                <button className="px-6 py-2 bg-zinc-900 text-white text-sm font-medium uppercase tracking-wide hover:bg-zinc-800 transition-colors duration-200 border border-zinc-900">
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
              © {new Date().getFullYear()} Guitar & Strings Co. All rights
              reserved.
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
