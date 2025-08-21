"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { mockProducts, Product } from "@/data/mockProducts";
import CosmeticsHero from "@/components/cosmetics/CosmeticsHero";
import CosmeticsFilters from "@/components/cosmetics/CosmeticsFilters";
import ProductsGrid from "@/components/cosmetics/ProductsGrid";
import Loader from "@/components/Loader";

const ITEMS_PER_PAGE = 12;

function CosmeticsContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [availableBrands] = useState<string[]>([
    "All",
    "Luxe Beauty",
    "Glow Cosmetics",
    "Pure Skin",
    "Lash Luxe",
    "Aroma Luxe",
    "Gentleman's Choice",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedSkinType, setSelectedSkinType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(mockProducts.length);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Initialize search query and category from URL params
  useEffect(() => {
    const urlSearchQuery = searchParams.get("search");
    const urlCategory = searchParams.get("category");

    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }

    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  // Filter and sort products (client-side)
  const filteredProducts = mockProducts
    .filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== "All" && product.brand !== selectedBrand) {
        return false;
      }

      // Skin type filter
      if (selectedSkinType !== "All" && product.skinType !== selectedSkinType) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== "All") {
        const price = product.price;
        switch (selectedPriceRange) {
          case "Under XAF 5,000":
            if (price >= 5000) return false;
            break;
          case "XAF 5,000 - XAF 15,000":
            if (price < 5000 || price > 15000) return false;
            break;
          case "XAF 15,000 - XAF 30,000":
            if (price < 15000 || price > 30000) return false;
            break;
          case "XAF 30,000 - XAF 50,000":
            if (price < 30000 || price > 50000) return false;
            break;
          case "Over XAF 50,000":
            if (price <= 50000) return false;
            break;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return b.isFeatured ? 1 : -1;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Update total products count
  useEffect(() => {
    setTotalProducts(filteredProducts.length);
    setTotalPages(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  }, [filteredProducts]);

  // Get paginated products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
    setSelectedSkinType("All");
    setSelectedPriceRange("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <>
      <CosmeticsHero />

      <CosmeticsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedSkinType={selectedSkinType}
        setSelectedSkinType={setSelectedSkinType}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        availableBrands={availableBrands}
        handleFilterChange={handleFilterChange}
      />

      <ProductsGrid
        loading={loading}
        filteredProducts={filteredProducts}
        viewMode={viewMode}
        paginatedProducts={paginatedProducts}
        totalPages={totalPages}
        currentPage={currentPage}
        totalProducts={totalProducts}
        handlePageChange={handlePageChange}
        clearAllFilters={clearAllFilters}
      />
    </>
  );
}

export default function CosmeticsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CosmeticsContent />
    </Suspense>
  );
}
