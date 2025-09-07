"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/data/mockProducts";
import CosmeticsHero from "@/components/cosmetics/CosmeticsHero";
import CosmeticsFilters from "@/components/cosmetics/CosmeticsFilters";
import ProductsGrid from "@/components/cosmetics/ProductsGrid";
import Loader from "@/components/Loader";

const ITEMS_PER_PAGE = 12;

function CosmeticsContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedSkinType, setSelectedSkinType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
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

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedSkinType,
    selectedPriceRange,
    sortBy,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        sortBy: sortBy === "featured" ? "isFeatured" : sortBy,
        sortOrder: "desc",
      });

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }

      if (selectedBrand !== "All") {
        params.append("brand", selectedBrand);
      }

      if (selectedSkinType !== "All") {
        params.append("skinType", selectedSkinType);
      }

      if (selectedPriceRange !== "All") {
        const [min, max] = selectedPriceRange.split("-").map(Number);
        if (min) params.append("minPrice", min.toString());
        if (max) params.append("maxPrice", max.toString());
      }

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.products || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);

        // Extract unique brands from products
        const brands = [
          "All",
          ...new Set(data.products?.map((p: Product) => p.brand) || []),
        ];
        setAvailableBrands(brands);
      } else {
        console.error("Failed to fetch products:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Products are already filtered and paginated by the API
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
        filteredProducts={products}
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
