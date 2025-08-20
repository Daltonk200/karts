"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Container from "./Container";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items: wishlistItems } = useWishlistStore();
  const { getUniqueItems: getCartItems } = useCartStore();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Check if we're on the homepage
  const isHomePage = pathname === "/";

  // Scroll detection for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
      // Also set overflow directly for immediate effect
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Search functionality
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/products?search=${encodeURIComponent(searchQuery)}&limit=5`
        );
        const data = await response.json();
        setSearchResults(data.products || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/cosmetics?search=${encodeURIComponent(searchQuery.trim())}`
      );
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleResultClick = (productId: string) => {
    router.push(`/cosmetics/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <header
      className={`sticky top-0 z-[999] transition-all duration-300 -mt-1 ${
        isScrolled || !isHomePage
          ? "bg-white/95 border-b border-rose-200 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="flex items-center space-x-3 group-hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-700 rounded-[5px] flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-caveat text-xl font-bold bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">
                GlowBeauty
              </h1>
              <p className="text-xs text-rose-500 font-medium font-outfit">
                Premium Cosmetics
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <Link
            href="/cosmetics?category=skincare"
            className={`px-4 py-2 rounded-[5px] font-medium transition-all duration-200 relative group ${
              isActive("/cosmetics") && pathname.includes("skincare")
                ? " text-rose-700"
                : isScrolled || !isHomePage
                ? "text-zinc-700 hover:text-rose-600 "
                : "text-white hover:text-rose-600 "
            }`}
          >
            Skincare
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-200 ${
                isActive("/cosmetics") && pathname.includes("skincare")
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/cosmetics?category=makeup"
            className={`px-4 py-2 rounded-[5px] font-medium transition-all duration-200 relative group ${
              isActive("/cosmetics") && pathname.includes("makeup")
                ? " text-rose-700"
                : isScrolled || !isHomePage
                ? "text-zinc-700 hover:text-rose-600 "
                : "text-white hover:text-rose-600 "
            }`}
          >
            Makeup
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-200 ${
                isActive("/cosmetics") && pathname.includes("makeup")
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/cosmetics?category=fragrance"
            className={`px-4 py-2 rounded-[5px] font-medium transition-all duration-200 relative group ${
              isActive("/cosmetics") && pathname.includes("fragrance")
                ? " text-rose-700"
                : isScrolled || !isHomePage
                ? "text-zinc-700 hover:text-rose-600 "
                : "text-white hover:text-rose-600 "
            }`}
          >
            Fragrance
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-200 ${
                isActive("/cosmetics") && pathname.includes("fragrance")
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/cosmetics"
            className={`px-4 py-2 rounded-[5px] font-medium transition-all duration-200 relative group ${
              isActive("/cosmetics") && !pathname.includes("category")
                ? " text-rose-700"
                : isScrolled || !isHomePage
                ? "text-zinc-700 hover:text-rose-600 "
                : "text-white hover:text-rose-600 "
            }`}
          >
            All Products
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-200 ${
                isActive("/cosmetics") && !pathname.includes("category")
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        </nav>

        {/* Right side - Search, Cart, Wishlist and Mobile menu */}
        <div className="flex items-center space-x-3">
          {/* Enhanced Search - Hidden on Mobile */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className={`w-64 px-4 py-2.5 pr-10 text-sm rounded-[5px] focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all duration-200 ${
                  isScrolled || !isHomePage
                    ? "bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:bg-white"
                    : "bg-white/20 border border-white/30 text-white placeholder-white/70 focus:border-white/50 focus:bg-white/30"
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isSearching ? (
                  <div
                    className={`w-4 h-4 border-2 rounded-full animate-spin ${
                      isScrolled || !isHomePage
                        ? "border-rose-200 border-t-rose-500"
                        : "border-white/50 border-t-white"
                    }`}
                  ></div>
                ) : (
                  <svg
                    className={`w-4 h-4 ${
                      isScrolled || !isHomePage
                        ? "text-zinc-400"
                        : "text-white/70"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Enhanced Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-[5px] shadow-xl z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product) => (
                      <button
                        key={product._id}
                        onClick={() => handleResultClick(product._id)}
                        className="w-full px-4 py-3 text-left  border-b border-zinc-100 last:border-b-0 flex items-center space-x-3 transition-colors duration-200"
                      >
                        <div className="w-12 h-12 bg-rose-100 flex-shrink-0 rounded-[5px] overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-zinc-900 truncate">
                            {product.name}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {product.brand} • ${product.price.toLocaleString()}
                          </div>
                        </div>
                      </button>
                    ))}
                    <div className="px-4 py-3 bg-rose-50 border-t border-rose-200">
                      <button
                        type="submit"
                        onClick={handleSearchSubmit}
                        className="w-full text-sm text-rose-600 hover:text-rose-700 text-center font-medium"
                      >
                        View all results ({searchResults.length})
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <div className="text-zinc-400 mb-2">
                      <svg
                        className="w-8 h-8 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-zinc-500">No products found</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Try different keywords
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className={`relative flex items-center justify-center w-11 h-11 transition-all duration-200 rounded-[5px] group ${
              isScrolled || !isHomePage
                ? "bg-zinc-50 border border-zinc-200  hover:border-rose-200"
                : "bg-white/20 border border-white/30 hover:bg-white/30 hover:border-white/50"
            }`}
          >
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                isScrolled || !isHomePage
                  ? "text-zinc-600 group-hover:text-rose-600"
                  : "text-white/80 group-hover:text-white"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {getCartItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {getCartItems()}
              </span>
            )}
          </Link>

          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            className={`relative flex items-center justify-center w-11 h-11 transition-all duration-200 rounded-[5px] group ${
              isScrolled || !isHomePage
                ? "bg-zinc-50 border border-zinc-200  hover:border-rose-200"
                : "bg-white/20 border border-white/30 hover:bg-white/30 hover:border-white/50"
            }`}
          >
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                wishlistItems.length > 0
                  ? isScrolled || !isHomePage
                    ? "text-rose-600"
                    : "text-white"
                  : isScrolled || !isHomePage
                  ? "text-zinc-600 group-hover:text-rose-600"
                  : "text-white/80 group-hover:text-white"
              }`}
              fill={wishlistItems.length > 0 ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden flex items-center justify-center w-11 h-11 transition-all duration-200 rounded-[5px] ${
              isScrolled || !isHomePage
                ? "bg-zinc-50 border border-zinc-200  hover:border-rose-200"
                : "bg-white/20 border border-white/30 hover:bg-white/30 hover:border-white/50"
            }`}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col space-y-1">
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isScrolled || !isHomePage ? "bg-zinc-600" : "bg-white/80"
                } ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isScrolled || !isHomePage ? "bg-zinc-600" : "bg-white/80"
                } ${isOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isScrolled || !isHomePage ? "bg-zinc-600" : "bg-white/80"
                } ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>
      </Container>

      {/* Mobile Navigation - Slide from right */}
      <div
        className={`lg:hidden mobile-menu-container w-80 bg-white border-l border-rose-200 shadow-2xl transform transition-all duration-300 ease-in-out mobile-menu-full-height z-[9999] ${
          isOpen
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto overscroll-contain">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-zinc-900 font-caveat">
              Menu
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-zinc-50 border border-zinc-200 text-sm rounded-[5px] focus:outline-none focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-5 h-5 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-3">
            <Link
              href="/cosmetics?category=skincare"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 font-medium transition-all duration-200 font-outfit ${
                isActive("/cosmetics") && pathname.includes("skincare")
                  ? "bg-rose-100 text-rose-700 border-l-4 border-rose-600"
                  : "text-zinc-700 hover:text-rose-600 hover:bg-rose-50"
              }`}
            >
              Skincare
            </Link>
            <Link
              href="/cosmetics?category=makeup"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3  font-medium transition-all duration-200 font-outfit ${
                isActive("/cosmetics") && pathname.includes("makeup")
                  ? "bg-rose-100 text-rose-700 border-l-4 border-rose-600"
                  : "text-zinc-700 hover:text-rose-600 hover:bg-rose-50"
              }`}
            >
              Makeup
            </Link>
            <Link
              href="/cosmetics?category=fragrance"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3  font-medium transition-all duration-200 font-outfit ${
                isActive("/cosmetics") && pathname.includes("fragrance")
                  ? "bg-rose-100 text-rose-700 border-l-4 border-rose-600"
                  : "text-zinc-700 hover:text-rose-600 hover:bg-rose-50"
              }`}
            >
              Fragrance
            </Link>
            <Link
              href="/cosmetics"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3  font-medium transition-all duration-200 font-outfit ${
                isActive("/cosmetics") && !pathname.includes("category")
                  ? "bg-rose-100 text-rose-700 border-l-4 border-rose-600"
                  : "text-zinc-700 hover:text-rose-600 hover:bg-rose-50"
              }`}
            >
              All Products
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3  font-medium transition-all duration-200 font-outfit ${
                isActive("/about")
                  ? "bg-rose-100 text-rose-700 border-l-4 border-rose-600"
                  : "text-zinc-700 hover:text-rose-600 hover:bg-rose-50"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3  font-medium transition-all duration-200 font-outfit ${
                isActive("/contact")
                  ? "bg-rose-100 text-rose-700 border-l-4 border-rose-600"
                  : "text-zinc-700 hover:text-rose-600 hover:bg-rose-50"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Click outside to close search */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSearchOpen(false)}
        />
      )}

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 mobile-menu-backdrop lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
