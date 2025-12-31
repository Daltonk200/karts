"use client";

import React, { useState, useEffect, useRef } from "react";
import { Product, mockProducts } from "@/data/mockProducts";
import KartsHero from "@/components/karts/KartsHero";
import ProductsGrid from "@/components/karts/ProductsGrid";
import Container from "@/components/Container";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { 
  FaStar, 
  FaCar, 
  FaCarSide, 
  FaBolt, 
  FaMotorcycle, 
  FaWrench, 
  FaFlagCheckered, 
  FaShieldAlt,
  FaBox,
  FaTh
} from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 12;

// Category icons mapping
const categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "All": FaTh,
  "Racing Karts": FaFlagCheckered,
  "Recreational Karts": FaCarSide,
  "Electric Karts": FaBolt,
  "Scooters": FaMotorcycle,
  "Parts & Accessories": FaWrench,
  "Racing Gear": FaFlagCheckered,
  "Safety Equipment": FaShieldAlt,
};

function ProductsContent() {
  const [loading, setLoading] = useState(false);
  const hasInitialized = useRef(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedKartType, setSelectedKartType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const setSearchQueryHandler = (newQuery: string) => {
    setSearchQuery(newQuery);
    if (typeof window !== "undefined") {
      if (newQuery) {
        sessionStorage.setItem("products_search_query", newQuery);
      } else {
        sessionStorage.removeItem("products_search_query");
      }
    }
  };

  // Initialize state from URL params
  useEffect(() => {
    if (!hasInitialized.current && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSearchQuery = urlParams.get("search") || "";
      const urlCategory = urlParams.get("category") || "All";

      if (urlSearchQuery) {
        setSearchQueryHandler(urlSearchQuery);
        sessionStorage.setItem("products_search_query", urlSearchQuery);
      }
      if (urlCategory !== "All") {
        setSelectedCategory(urlCategory);
        sessionStorage.setItem("products_category", urlCategory);
      }

      hasInitialized.current = true;
    }
  }, []);

  // Restore state from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSearchQuery = sessionStorage.getItem("products_search_query");
      const savedCategory = sessionStorage.getItem("products_category");

      if (savedSearchQuery && savedSearchQuery !== searchQuery) {
        setSearchQueryHandler(savedSearchQuery);
      }

      if (savedCategory && savedCategory !== selectedCategory) {
        setSelectedCategory(savedCategory);
      }
    }
  }, []);

  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Calculate category counts
  const getCategoryCounts = () => {
    const counts: { [key: string]: number } = {};
    mockProducts.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  const categories = [
    "All",
    "Racing Karts",
    "Recreational Karts",
    "Electric Karts",
    "Scooters",
    "Parts & Accessories",
    "Racing Gear",
    "Safety Equipment",
  ];

  const kartTypes = [
    "All",
    "All Types",
    "Professional",
    "Intermediate",
    "Youth",
    "Family",
    "Eco-Friendly",
  ];

  const priceRanges = [
    "All",
    "Under $500",
    "$500 - $2,000",
    "$2,000 - $4,000",
    "$4,000 - $6,000",
    "Over $6,000",
  ];

  // Filter products using mock data
  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedKartType,
    selectedPriceRange,
    sortBy,
  ]);

  const fetchProducts = () => {
    try {
      setLoading(true);
      
      // Start with all mock products
      let filteredProducts = [...mockProducts];

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.sku.toLowerCase().includes(query)
        );
      }

      // Filter by category
      if (selectedCategory !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === selectedCategory
        );
      }

      // Filter by brand
      if (selectedBrand !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.brand === selectedBrand
        );
      }

      // Filter by kart type
      if (selectedKartType !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.kartType === selectedKartType
        );
      }

      // Filter by price range
      if (selectedPriceRange !== "All") {
        const ranges: { [key: string]: [number, number] } = {
          "Under $500": [0, 500],
          "$500 - $2,000": [500, 2000],
          "$2,000 - $4,000": [2000, 4000],
          "$4,000 - $6,000": [4000, 6000],
          "Over $6,000": [6000, Infinity],
        };
        const [min, max] = ranges[selectedPriceRange] || [0, Infinity];
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= min && product.price <= max
        );
      }

      // Extract unique brands
      const brands = [
        "All",
        ...new Set(filteredProducts.map((p) => p.brand)),
      ];
      setAvailableBrands(brands);

      // Sort products
      filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case "featured":
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return 0;
          case "price":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });

      // Calculate pagination
      const total = filteredProducts.length;
      const pages = Math.ceil(total / ITEMS_PER_PAGE);
      setTotalPages(pages);
      setTotalProducts(total);

      // Paginate
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      setProducts(paginatedProducts);
    } catch (error) {
      console.error("Error filtering products:", error);
    } finally {
      setLoading(false);
    }
  };

  const paginatedProducts = products;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedKartType("All");
    setSelectedPriceRange("All");
    setSearchQueryHandler("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedBrand !== "All" ||
    selectedKartType !== "All" ||
    selectedPriceRange !== "All" ||
    searchQuery !== "";

  return (
    <>
      <KartsHero />

      <div className="min-h-screen bg-gray-50">
        <Container>
          <div className="flex gap-6 py-8">
            {/* Left Sidebar - Filters */}
            <aside
              className={`${
                showMobileFilters ? "fixed inset-0 z-50 lg:relative lg:z-auto" : "hidden"
              } lg:block w-full lg:w-80 flex-shrink-0`}
            >
              {/* Mobile Overlay */}
              {showMobileFilters && (
                <div
                  className="fixed inset-0 bg-black/50 lg:hidden"
                  onClick={() => setShowMobileFilters(false)}
                ></div>
              )}

              {/* Sidebar Content */}
              <div className="bg-white rounded-lg shadow-sm lg:sticky lg:top-8 flex flex-col max-h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-8rem)]">
                {/* Scrollable Filter Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Mobile Close Button */}
                  <div className="flex items-center justify-between mb-6 lg:hidden">
                    <h2 className="text-xl font-bold text-gray-900 font-caveat">Filters</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <AiOutlineClose className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Desktop Header */}
                  <div className="hidden lg:block mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-1 font-caveat">Filters</h2>
                    <p className="text-sm text-gray-500 font-outfit">Refine your search</p>
                  </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">
                    Search
                  </label>
                  <div className="relative">
                    <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQueryHandler(e.target.value);
                        handleFilterChange();
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 font-outfit"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 font-outfit">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const count = category === "All" 
                        ? mockProducts.length 
                        : categoryCounts[category] || 0;
                      const isSelected = selectedCategory === category;
                      const IconComponent = categoryIcons[category] || FaBox;
                      
                      return (
                        <label
                          key={category}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="radio"
                              name="category"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedCategory(category);
                                handleFilterChange();
                              }}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                            />
                            <IconComponent className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-700 font-outfit flex-1">
                              {category}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 font-outfit">
                            {count}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Brands */}
                {availableBrands.length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 font-outfit">
                      Brands
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {availableBrands.map((brand) => {
                        const isSelected = selectedBrand === brand;
                        return (
                          <label
                            key={brand}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name="brand"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedBrand(brand);
                                handleFilterChange();
                              }}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                            />
                            <span className="text-sm text-gray-700 font-outfit">
                              {brand}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Kart Type */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 font-outfit">
                    Type
                  </h3>
                  <div className="space-y-2">
                    {kartTypes.map((type) => {
                      const isSelected = selectedKartType === type;
                      return (
                        <label
                          key={type}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="kartType"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedKartType(type);
                              handleFilterChange();
                            }}
                            className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                          />
                          <span className="text-sm text-gray-700 font-outfit">
                            {type}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 font-outfit">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => {
                      const isSelected = selectedPriceRange === range;
                      return (
                        <label
                          key={range}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="priceRange"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedPriceRange(range);
                              handleFilterChange();
                            }}
                            className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                          />
                          <span className="text-sm text-gray-700 font-outfit">
                            {range}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                </div>

                {/* Reset Filters Button - Always Visible at Bottom */}
                <div className="p-6 pt-0 border-t border-gray-200 flex-shrink-0">
                  <button
                    onClick={clearAllFilters}
                    disabled={!hasActiveFilters}
                    className={`w-full px-4 py-2 rounded-lg transition-colors font-medium text-sm font-outfit flex items-center justify-center gap-2 ${
                      hasActiveFilters
                        ? "bg-gray-800 text-white hover:bg-gray-900 cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <AiOutlineClose className="w-4 h-4" />
                    Reset Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Top Bar - Sort, View Mode, Mobile Filter Toggle */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-outfit"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filters
                  </button>

                  <div className="text-sm text-gray-600 font-outfit">
                    {totalProducts} {totalProducts === 1 ? "product" : "products"} found
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 font-outfit whitespace-nowrap">
                      Sort by:
                    </label>
                    <Select value={sortBy} onValueChange={(value) => {
                      setSortBy(value);
                      handleFilterChange();
                    }}>
                      <SelectTrigger className="w-[180px] font-outfit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="name">Name: A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid"
                          ? "bg-red-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      title="Grid View"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list"
                          ? "bg-red-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      title="List View"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <ProductsGrid
                loading={loading}
                filteredProducts={products}
                viewMode={viewMode}
                paginatedProducts={paginatedProducts}
                totalPages={totalPages}
                currentPage={currentPage}
                totalProducts={totalProducts}
                handlePageChange={handlePageChange}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default function ProductsPage() {
  return <ProductsContent />;
}
