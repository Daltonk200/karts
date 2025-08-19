"use client";

import { useState, useEffect, Suspense } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  condition: string;
  isFeatured: boolean;
  stock: number;
  sku: string;
  description: string;
}

const categories = [
  "All",
  "Electric Guitars",
  "Acoustic Guitars",
  "Bass Guitars",
];
const brands = ["All"]; // Will be populated dynamically
const conditions = [
  "All",
  "New",
  "Used",
  "Vintage",
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Poor",
];

const ITEMS_PER_PAGE = 8;

function GuitarsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableBrands, setAvailableBrands] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      condition: product.condition,
      stock: product.stock || 1,
      model: product.sku || "",
    });
    toast.success(`${product.name} added to cart`);
  };

  // Fetch available brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/products/brands");
        const data = await response.json();

        if (response.ok && data.brands) {
          setAvailableBrands(["All", ...data.brands]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
          sortBy:
            sortBy === "featured"
              ? "isFeatured"
              : sortBy === "price-low"
              ? "price"
              : sortBy === "price-high"
              ? "price"
              : "name",
          sortOrder: sortBy === "price-high" ? "desc" : "asc",
        });

        if (searchQuery) params.append("search", searchQuery);
        if (selectedCategory !== "All")
          params.append("category", selectedCategory);
        if (selectedBrand !== "All") params.append("brand", selectedBrand);

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products || []);
          setTotalPages(data.pagination?.pages || 1);
          setTotalProducts(data.pagination?.total || 0);
        } else {
          console.error("Failed to fetch products:", data.error);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    currentPage,
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedCondition,
    sortBy,
  ]);

  // Filter products by condition (client-side since API doesn't support it yet)
  const filteredProducts = products.filter((product) => {
    if (selectedCondition === "All") return true;
    return product.condition === selectedCondition;
  });

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        condition: product.condition,
        rating: 4.5, // Default rating since API doesn't provide it
        reviews: 0, // Default reviews since API doesn't provide it
        isFeatured: product.isFeatured,
        isOnSale: false, // Default since API doesn't provide it
        originalPrice: product.price,
      });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filters change
  };

  console.log(filteredProducts);
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black border-b border-zinc-200 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/165971/pexels-photo-165971.jpeg"
            alt="Guitar Collection"
            fill
            className="object-cover opacity-50"
          />
        </div>

        <Container className="py-12 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Guitar Collection
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Discover handpicked guitars from the world's finest makers. From
              classic acoustics to vintage electrics, find your perfect
              instrument.
            </p>
          </div>
        </Container>
      </section>

      {/* Custom Guitar Alert */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-amber-900">
                  Can't find your perfect guitar?
                </h3>
                <p className="text-sm text-amber-800">
                  We can build it custom for you!
                </p>
              </div>
            </div>
            <Link
              href="/custom-guitar"
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors duration-200 whitespace-nowrap"
            >
              Custom Build
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-zinc-200">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search guitars..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-3 pr-12 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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
                </div>
              </div>
            </div>

            {/* Sort and Filter Toggle */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  handleFilterChange();
                }}
                className="px-4 py-3 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-200"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-3 border border-zinc-300 text-sm font-medium hover:bg-zinc-50 transition-colors duration-200"
              >
                Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-6 p-4 bg-zinc-50 border border-zinc-200">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full px-3 py-2 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-2">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full px-3 py-2 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500"
                  >
                    {availableBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-2">
                    Condition
                  </label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => {
                      setSelectedCondition(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full px-3 py-2 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500"
                  >
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Desktop Filters */}
      <section className="hidden lg:block py-8 border-b border-zinc-200">
        <Container>
          <div className="flex items-center gap-8">
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  handleFilterChange();
                }}
                className="px-4 py-2 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  handleFilterChange();
                }}
                className="px-4 py-2 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-200"
              >
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">
                Condition
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                  handleFilterChange();
                }}
                className="px-4 py-2 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-200"
              >
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-auto">
              <span className="text-sm text-zinc-600">
                {totalProducts} guitar
                {totalProducts !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <Container>
          {loading ? (
            <Loader />
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-md hover:shadow-lg transition-colors duration-200 flex flex-col group"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isFeatured && (
                          <span className="px-2 py-1 bg-zinc-900 text-white text-xs font-medium uppercase tracking-wide">
                            Featured
                          </span>
                        )}
                        <span className="px-2 py-1 bg-white text-zinc-900 text-xs font-medium uppercase tracking-wide border border-zinc-200">
                          {product.condition}
                        </span>
                      </div>

                      {/* Floating Add to Cart Button */}
                      <div className="absolute z-[50] top-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                          title="Add to Cart"
                        >
                          <svg
                            className="w-4 h-4"
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
                          {/* <span>Add to Cart</span> */}
                        </button>
                      </div>

                      {/* Quick View Button */}
                      <div className="absolute inset-0 bg-black/30 hidden bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300  group-hover:flex items-center justify-center">
                        <Link
                          href={`/guitars/${product._id}`}
                          className="opacity-0 group-hover:opacity-100 px-6 py-3 bg-white text-zinc-900 font-medium uppercase tracking-wide transition-all duration-300 hover:bg-zinc-100"
                        >
                          Quick View
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="text-sm text-zinc-500 uppercase tracking-wide mb-2">
                        {product.brand} • {product.category}
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-zinc-900">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto space-y-2">
                        <Link
                          href={`/guitars/${product._id}`}
                          className="block w-full text-center px-4 py-2 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/purchase/${product._id}`}
                          className="block w-full text-center px-4 py-2 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-200"
                        >
                          Purchase
                        </Link>
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className={`w-full px-4 whitespace-nowrap py-2 border font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                            isInWishlist(product._id)
                              ? "border-red-300 text-red-700 bg-red-50 hover:bg-red-100"
                              : "border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                          }`}
                        >
                          <svg
                            className={`w-4 h-4 ${
                              isInWishlist(product._id)
                                ? "fill-current"
                                : "fill-none"
                            }`}
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
                          {isInWishlist(product._id)
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                              currentPage === page
                                ? "bg-zinc-900 text-white"
                                : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Page Info */}
              <div className="mt-4 text-center text-sm text-zinc-600">
                Showing {currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of{" "}
                {totalProducts} guitars
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎸</div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                No guitars found
              </h3>
              <p className="text-zinc-600 mb-6">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedBrand("All");
                  setSelectedCondition("All");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="px-6 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default function GuitarsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <GuitarsContent />
    </Suspense>
  );
}
