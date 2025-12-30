"use client";

import { useState, useEffect, useRef } from "react";
import { Product } from "@/data/mockProducts";
import KartsHero from "@/components/karts/KartsHero";
import KartsFilters from "@/components/karts/KartsFilters";
import ProductsGrid from "@/components/karts/ProductsGrid";
import Loader from "@/components/Loader";

const ITEMS_PER_PAGE = 12;

function KartsContent() {
  const [loading, setLoading] = useState(false);
  const hasInitialized = useRef(false);

  // Debug component lifecycle
  useEffect(() => {
    console.log("🔄 KartsContent component MOUNTED");
    return () => {
      console.log("🔄 KartsContent component UNMOUNTED");
    };
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedKartType, setSelectedKartType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Debug function to track search query changes
  const debugSetSearchQuery = (newQuery: string, source: string) => {
    console.log(
      `Search query changed from "${searchQuery}" to "${newQuery}" (source: ${source})`
    );
    setSearchQuery(newQuery);

    // Update sessionStorage
    if (typeof window !== "undefined") {
      if (newQuery) {
        sessionStorage.setItem("karts_search_query", newQuery);
      } else {
        sessionStorage.removeItem("karts_search_query");
      }
    }
  };

  // Initialize state from URL params only once
  useEffect(() => {
    if (!hasInitialized.current && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSearchQuery = urlParams.get("search") || "";
      const urlCategory = urlParams.get("category") || "All";

      console.log("🏗️ Initializing state from URL:", {
        search: urlSearchQuery,
        category: urlCategory,
      });

      if (urlSearchQuery) {
        debugSetSearchQuery(urlSearchQuery, "URL initialization");
        // Store in sessionStorage to persist across remounts
        sessionStorage.setItem("karts_search_query", urlSearchQuery);
      }
      if (urlCategory !== "All") {
        setSelectedCategory(urlCategory);
        sessionStorage.setItem("karts_category", urlCategory);
      }

      hasInitialized.current = true;
    }
  }, []);

  // Restore state from sessionStorage if component remounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSearchQuery = sessionStorage.getItem("karts_search_query");
      const savedCategory = sessionStorage.getItem("karts_category");

      if (savedSearchQuery && savedSearchQuery !== searchQuery) {
        console.log(
          "🔄 Restoring search query from sessionStorage:",
          savedSearchQuery
        );
        debugSetSearchQuery(savedSearchQuery, "sessionStorage restore");
      }

      if (savedCategory && savedCategory !== selectedCategory) {
        console.log(
          "🔄 Restoring category from sessionStorage:",
          savedCategory
        );
        setSelectedCategory(savedCategory);
      }
    }
  }, []);

  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Handle URL parameter changes (for navigation within the app)
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSearchQuery = urlParams.get("search");
      const urlCategory = urlParams.get("category");

      console.log("URL params changed via popstate:", {
        urlSearchQuery,
        urlCategory,
        currentSearchQuery: searchQuery,
      });

      // Only update if the URL parameter is different from current state
      if (urlSearchQuery !== searchQuery) {
        // console.log("Updating search query from URL:", urlSearchQuery);
        debugSetSearchQuery(urlSearchQuery || "", "URL params effect");
      }

      if (urlCategory !== selectedCategory) {
        setSelectedCategory(urlCategory || "All");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [searchQuery, selectedCategory]);

  // Fetch products from API
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
        // console.log("Search query being sent to API:", searchQuery);
      }

      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }

      if (selectedBrand !== "All") {
        params.append("brand", selectedBrand);
      }

      if (selectedKartType !== "All") {
        params.append("kartType", selectedKartType);
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
        setAvailableBrands(brands as string[]);
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
    setSelectedKartType("All");
    setSelectedPriceRange("All");
    debugSetSearchQuery("", "clearAllFilters");
    setCurrentPage(1);
  };

  return (
    <>
      <KartsHero />

      <KartsFilters
        searchQuery={searchQuery}
        setSearchQuery={(query) =>
          debugSetSearchQuery(query, "KartsFilters input")
        }
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
        selectedKartType={selectedKartType}
        setSelectedKartType={setSelectedKartType}
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

export default function KartsPage() {
  return <KartsContent />;
}
