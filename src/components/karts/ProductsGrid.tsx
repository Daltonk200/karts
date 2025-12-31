"use client";

import Container from "@/components/Container";
import Loader from "@/components/Loader";
import ProductCard from "./ProductCard";
import { Product } from "@/data/mockProducts";

interface ProductsGridProps {
  loading: boolean;
  filteredProducts: Product[];
  viewMode: "grid" | "list";
  paginatedProducts: Product[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
  handlePageChange: (page: number) => void;
  clearAllFilters: () => void;
}

const ITEMS_PER_PAGE = 12;

export default function ProductsGrid({
  loading,
  filteredProducts,
  viewMode,
  paginatedProducts,
  totalPages,
  currentPage,
  totalProducts,
  handlePageChange,
  clearAllFilters,
}: ProductsGridProps) {
  return (
    <section className="py-12 bg-gradient-to-br from-red-50 via-white to-red-50">
      <Container>
        {loading ? (
          <Loader />
        ) : filteredProducts.length > 0 ? (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    viewMode="grid"
                  />
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    viewMode="list"
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-red-300 text-red-700 font-outfit font-medium hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-[6px]"
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
                          className={`px-3 py-2 text-sm font-outfit font-medium transition-colors duration-200 rounded-[6px] ${currentPage === page
                              ? "bg-red-600 text-white"
                              : "border border-red-300 text-red-700 hover:bg-red-50"
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
                    className="px-4 py-2 border border-red-300 text-red-700 font-outfit font-medium hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-[6px]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Page Info */}
            <div className="mt-4 text-center text-sm font-outfit text-red-600">
              Showing {currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of{" "}
              {totalProducts} products
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-8 animate-bounce">🏎️</div>
            <h3 className="text-3xl font-caveat font-bold text-red-900 mb-4">
              No products found
            </h3>
            <p className="text-xl font-outfit text-red-700 mb-8 max-w-2xl mx-auto">
              Try adjusting your search terms to find the perfect racing equipment.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-600 text-white font-outfit font-semibold hover:from-red-700 hover:to-red-700 transition-all duration-300 rounded-[8px] shadow-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
