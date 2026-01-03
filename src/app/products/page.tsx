"use client";

import React, { useState, useEffect, useRef } from "react";
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

  const [products, setProducts] = useState<any[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>(["All"]);
  const [availableEngineTypes, setAvailableEngineTypes] = useState<string[]>(["All"]);
  const [availableMaxSpeeds, setAvailableMaxSpeeds] = useState<string[]>(["All"]);
  const [availableWeightCapacities, setAvailableWeightCapacities] = useState<string[]>(["All"]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedKartType, setSelectedKartType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedEngineType, setSelectedEngineType] = useState("All");
  const [selectedMaxSpeed, setSelectedMaxSpeed] = useState("All");
  const [selectedWeightCapacity, setSelectedWeightCapacity] = useState("All");
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

  // Fetch categories, brands, and filter options from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/products/brands");
        const data = await response.json();
        setAvailableBrands(["All", ...(data.brands || [])]);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchFilterOptions = async () => {
      try {
        // Fetch all products to extract filter options
        const response = await fetch("/api/products?limit=1000");
        const data = await response.json();
        const products = data.products || [];

        // Extract unique engine types
        const engineTypes = new Set<string>();
        const maxSpeeds = new Set<number>();
        const weightCapacities = new Set<number>();

        products.forEach((product: any) => {
          if (product.specifications?.engineType) {
            engineTypes.add(product.specifications.engineType);
          }
          if (product.specifications?.maxSpeed && typeof product.specifications.maxSpeed === 'number') {
            maxSpeeds.add(product.specifications.maxSpeed);
          }
          if (product.specifications?.weightCapacity && typeof product.specifications.weightCapacity === 'number') {
            weightCapacities.add(product.specifications.weightCapacity);
          }
        });

        // Set engine types (sorted)
        setAvailableEngineTypes(["All", ...Array.from(engineTypes).sort()]);

        // Set max speeds (grouped into ranges, sorted)
        const speedRanges = Array.from(maxSpeeds).sort((a, b) => a - b);
        const speedOptions = ["All"];
        if (speedRanges.length > 0) {
          const min = Math.min(...speedRanges);
          const max = Math.max(...speedRanges);
          if (min < 30) speedOptions.push("Under 30 mph");
          if (min < 50 && max >= 30) speedOptions.push("30 - 50 mph");
          if (min < 70 && max >= 50) speedOptions.push("50 - 70 mph");
          if (min < 85 && max >= 70) speedOptions.push("70 - 85 mph");
          if (max >= 85) speedOptions.push("Over 85 mph");
        }
        setAvailableMaxSpeeds(speedOptions);

        // Set weight capacities (grouped into ranges, sorted)
        const weightRanges = Array.from(weightCapacities).sort((a, b) => a - b);
        const weightOptions = ["All"];
        if (weightRanges.length > 0) {
          const min = Math.min(...weightRanges);
          const max = Math.max(...weightRanges);
          if (min < 150) weightOptions.push("Under 150 lbs");
          if (min < 200 && max >= 150) weightOptions.push("150 - 200 lbs");
          if (min < 250 && max >= 200) weightOptions.push("200 - 250 lbs");
          if (max >= 250) weightOptions.push("Over 250 lbs");
        }
        setAvailableWeightCapacities(weightOptions);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    
    fetchCategories();
    fetchBrands();
    fetchFilterOptions();
  }, []);

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
    selectedEngineType,
    selectedMaxSpeed,
    selectedWeightCapacity,
    sortBy,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", ITEMS_PER_PAGE.toString());
      
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      
      if (selectedCategory !== "All") {
        // Find category ID from name
        const category = categories.find(cat => cat.name === selectedCategory);
        if (category) {
          params.append("category", category._id);
        }
      }
      
      if (selectedBrand !== "All") {
        params.append("brand", selectedBrand);
      }
      
      // Map price range to min/max
      if (selectedPriceRange !== "All") {
        const ranges: { [key: string]: [number, number] } = {
          "Under $500": [0, 500],
          "$500 - $2,000": [500, 2000],
          "$2,000 - $4,000": [2000, 4000],
          "$4,000 - $6,000": [4000, 6000],
          "Over $6,000": [6000, 999999],
        };
        const [min, max] = ranges[selectedPriceRange] || [0, 999999];
        params.append("minPrice", min.toString());
        params.append("maxPrice", max.toString());
      }
      
      // Map sortBy
      const sortMap: { [key: string]: string } = {
        "featured": "createdAt",
        "price": "price",
        "price-desc": "price",
        "rating": "createdAt",
        "name": "name",
      };
      const apiSortBy = sortMap[sortBy] || "createdAt";
      params.append("sortBy", apiSortBy);
      params.append("sortOrder", sortBy === "price-desc" ? "desc" : sortBy === "price" ? "asc" : "desc");
      
      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        let filteredProducts = data.products || [];
        
        // Client-side filtering for specifications (not supported by API yet)
        if (selectedEngineType !== "All") {
          filteredProducts = filteredProducts.filter(
            (product: any) => product.productType === "go-karts" && product.specifications?.engineType === selectedEngineType
          );
        }
        
        if (selectedMaxSpeed !== "All") {
          const speedRanges: { [key: string]: [number, number] } = {
            "Under 30 mph": [0, 30],
            "30 - 50 mph": [30, 50],
            "50 - 70 mph": [50, 70],
            "70 - 85 mph": [70, 85],
            "Over 85 mph": [85, 999],
          };
          const [min, max] = speedRanges[selectedMaxSpeed] || [0, 999];
          filteredProducts = filteredProducts.filter((product: any) => {
            const maxSpeed = product.specifications?.maxSpeed;
            if (typeof maxSpeed === "number") {
              return maxSpeed >= min && maxSpeed <= max;
            }
            return false;
          });
        }
        
        if (selectedWeightCapacity !== "All") {
          const weightRanges: { [key: string]: [number, number] } = {
            "Under 150 lbs": [0, 150],
            "150 - 200 lbs": [150, 200],
            "200 - 250 lbs": [200, 250],
            "Over 250 lbs": [250, 9999],
          };
          const [min, max] = weightRanges[selectedWeightCapacity] || [0, 9999];
          filteredProducts = filteredProducts.filter((product: any) => {
            const weightCapacity = product.specifications?.weightCapacity;
            if (typeof weightCapacity === "number") {
              return weightCapacity >= min && weightCapacity <= max;
            }
            return false;
          });
        }
        
        // Transform category objects to names for display
        filteredProducts = filteredProducts.map((product: any) => {
          if (product.category && typeof product.category === 'object') {
            product.categoryName = product.category.name;
            product.category = product.category.name || product.category._id;
          }
          return product;
        });
        
        setProducts(filteredProducts);
        setTotalProducts(data.pagination?.total || filteredProducts.length);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        setProducts([]);
        setTotalProducts(0);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(1);
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
    setSelectedEngineType("All");
    setSelectedMaxSpeed("All");
    setSelectedWeightCapacity("All");
    setSearchQueryHandler("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedBrand !== "All" ||
    selectedKartType !== "All" ||
    selectedPriceRange !== "All" ||
    selectedEngineType !== "All" ||
    selectedMaxSpeed !== "All" ||
    selectedWeightCapacity !== "All" ||
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
                    <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === "All"}
                        onChange={() => {
                          setSelectedCategory("All");
                          handleFilterChange();
                        }}
                        className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                      />
                      <FaBox className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700 font-outfit">All Categories</span>
                    </label>
                    {categories.map((category: any) => {
                      const isSelected = selectedCategory === category.name;
                      const IconComponent = categoryIcons[category.name] || FaBox;
                      
                      return (
                        <label
                          key={category._id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                        >
                          <input
                            type="radio"
                            name="category"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedCategory(category.name);
                              handleFilterChange();
                            }}
                            className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                          />
                          <IconComponent className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-gray-700 font-outfit flex-1">
                            {category.name}
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

                {/* Engine Type (for Go-Karts) */}
                {availableEngineTypes.length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 font-outfit">
                      Engine Type
                    </h3>
                    <div className="space-y-2">
                      {availableEngineTypes.map((type) => {
                        const isSelected = selectedEngineType === type || (selectedEngineType === "All" && type === "All");
                        const displayName = type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ');
                        return (
                          <label
                            key={type}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name="engineType"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedEngineType(type);
                                handleFilterChange();
                              }}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                            />
                            <span className="text-sm text-gray-700 font-outfit">
                              {displayName}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Max Speed */}
                {availableMaxSpeeds.length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 font-outfit">
                      Max Speed
                    </h3>
                    <div className="space-y-2">
                      {availableMaxSpeeds.map((speed) => {
                        const isSelected = selectedMaxSpeed === speed;
                        return (
                          <label
                            key={speed}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name="maxSpeed"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedMaxSpeed(speed);
                                handleFilterChange();
                              }}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                            />
                            <span className="text-sm text-gray-700 font-outfit">
                              {speed}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Weight Capacity */}
                {availableWeightCapacities.length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 font-outfit">
                      Weight Capacity
                    </h3>
                    <div className="space-y-2">
                      {availableWeightCapacities.map((weight) => {
                        const isSelected = selectedWeightCapacity === weight;
                        return (
                          <label
                            key={weight}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name="weightCapacity"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedWeightCapacity(weight);
                                handleFilterChange();
                              }}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2 border-gray-300"
                            />
                            <span className="text-sm text-gray-700 font-outfit">
                              {weight}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
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
