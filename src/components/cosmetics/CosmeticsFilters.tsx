"use client";

import { AiOutlineSearch, AiOutlineFilter } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/components/Container";

interface CosmeticsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedSkinType: string;
  setSelectedSkinType: (type: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  availableBrands: string[];
  handleFilterChange: () => void;
}

const categories = [
  "All",
  "Skincare",
  "Makeup",
  "Hair Care",
  "Fragrances",
  "Body Care",
  "Tools & Accessories",
  "Men's Grooming",
];

const skinTypes = [
  "All",
  "All Types",
  "Dry Skin",
  "Oily Skin",
  "Combination Skin",
  "Sensitive Skin",
  "Mature Skin",
  "Acne-Prone Skin",
];

const priceRanges = [
  "All",
  "Under XAF 5,000",
  "XAF 5,000 - XAF 15,000",
  "XAF 15,000 - XAF 30,000",
  "XAF 30,000 - XAF 50,000",
  "Over XAF 50,000",
];

export default function CosmeticsFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedSkinType,
  setSelectedSkinType,
  selectedPriceRange,
  setSelectedPriceRange,
  availableBrands,
  handleFilterChange,
}: CosmeticsFiltersProps) {
  return (
    <>
      {/* Search and Filters */}
      <section className="py-8 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-200">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search beauty products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-3 pr-12 border border-rose-300 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200 rounded-[8px] bg-white"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AiOutlineSearch className="w-5 h-5 text-rose-400" />
                </div>
              </div>
            </div>

            {/* Sort and View Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                  <Select
                    value={sortBy}
                    onValueChange={(value) => {
                      setSortBy(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[160px] !py-5 lg:w-[180px] border-rose-300 focus:border-rose-500 !rounded-[6px] focus:ring-2 focus:ring-rose-200 bg-white text-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden w-full sm:w-auto px-4 py-3 border border-rose-300 text-sm font-medium hover:bg-rose-50 transition-colors duration-200 rounded-[8px] bg-white"
                  >
                    <AiOutlineFilter className="w-4 h-4 inline mr-2" />
                    Filters
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-rose-300 rounded-[8px] overflow-hidden bg-white w-full sm:w-auto">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 sm:flex-none px-3 py-2 text-sm transition-colors duration-200 flex items-center justify-center gap-1 ${
                      viewMode === "grid"
                        ? "bg-rose-600 text-white"
                        : "text-rose-600 hover:bg-rose-50"
                    }`}
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
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 sm:flex-none px-3 py-2 text-sm transition-colors duration-200 flex items-center justify-center gap-1 ${
                      viewMode === "list"
                        ? "bg-rose-600 text-white"
                        : "text-rose-600 hover:bg-rose-50"
                    }`}
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
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-6 p-6 bg-white border border-rose-200 rounded-[8px] shadow-sm">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-outfit font-medium text-rose-900 mb-2">
                    Category
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full border-rose-300 focus:border-rose-500 bg-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-outfit font-medium text-rose-900 mb-2">
                    Brand
                  </label>
                  <Select
                    value={selectedBrand}
                    onValueChange={(value) => {
                      setSelectedBrand(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full border-rose-300 focus:border-rose-500 bg-white">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-outfit font-medium text-rose-900 mb-2">
                    Skin Type
                  </label>
                  <Select
                    value={selectedSkinType}
                    onValueChange={(value) => {
                      setSelectedSkinType(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full border-rose-300 focus:border-rose-500 bg-white">
                      <SelectValue placeholder="Select skin type" />
                    </SelectTrigger>
                    <SelectContent>
                      {skinTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-outfit font-medium text-rose-900 mb-2">
                    Price Range
                  </label>
                  <Select
                    value={selectedPriceRange}
                    onValueChange={(value) => {
                      setSelectedPriceRange(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full border-rose-300 focus:border-rose-500 bg-white">
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Desktop Filters */}
      <section className="hidden lg:block py-8 bg-white border-b border-rose-200">
        <Container>
          <div className="flex items-center gap-8">
            <div>
              <label className="block text-sm font-outfit font-medium text-rose-900 mb-2">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="w-[140px] border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-outfit font-medium text-rose-900 mb-2">
                Brand
              </label>
              <Select
                value={selectedBrand}
                onValueChange={(value) => {
                  setSelectedBrand(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="w-[140px] border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-white">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {availableBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-outfit font-medium text-rose-900 mb-2">
                Skin Type
              </label>
              <Select
                value={selectedSkinType}
                onValueChange={(value) => {
                  setSelectedSkinType(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="w-[140px] border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-white">
                  <SelectValue placeholder="Skin Type" />
                </SelectTrigger>
                <SelectContent>
                  {skinTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-outfit font-medium text-rose-900 mb-2">
                Price Range
              </label>
              <Select
                value={selectedPriceRange}
                onValueChange={(value) => {
                  setSelectedPriceRange(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="w-[160px] border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-white">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
