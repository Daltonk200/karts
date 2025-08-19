"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  category: string;
  condition: string;
  stock: number;
  isFeatured: boolean;
  image: string;
  sku: string;
  createdAt: string;
}

export default function ProductsPage() {
  // Set this to true to bypass authentication
  const BYPASS_AUTH = false;

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (loading) return;
    fetchProducts();
  }, [page, search, category, brand, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const checkAuth = () => {
    if (BYPASS_AUTH) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("dashboard_token");
    if (!token) {
      router.push("/dashboard/login");
    } else {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search,
        category,
        brand,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setProducts(data.products);
        console.log(data.products);
        setTotalPages(data.pagination.pages);
        setTotalProducts(data.pagination.total);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("An error occurred while fetching products");
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("dashboard_token");
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product");
    }
  };

  const handleToggleFeatured = async (
    productId: string,
    currentFeatured: boolean
  ) => {
    try {
      const token = localStorage.getItem("dashboard_token");
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isFeatured: !currentFeatured }),
      });

      if (response.ok) {
        toast.success(
          `Product ${currentFeatured ? "unfeatured" : "featured"} successfully`
        );
        fetchProducts();
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboard_token");
    localStorage.removeItem("dashboard_user");
    router.push("/dashboard/login");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="mt-4 text-zinc-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">
                Products Management
              </h1>
              <p className="text-zinc-600">Manage your guitar inventory</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard/products/create")}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Add New Product
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <Link
              href="/dashboard"
              className="text-zinc-600 hover:text-zinc-900 pb-2 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/products"
              className="text-zinc-900 border-b-2 border-zinc-900 pb-2 font-medium"
            >
              Products
            </Link>
            <Link
              href="/dashboard/orders"
              className="text-zinc-600 hover:text-zinc-900 pb-2 font-medium"
            >
              Orders
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Actions */}
        <div className="bg-white p-6 border border-zinc-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Electric Guitars">Electric Guitars</option>
                <option value="Acoustic Guitars">Acoustic Guitars</option>
                <option value="Bass Guitars">Bass Guitars</option>
              </select>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="px-3 py-2 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                <option value="Fender">Fender</option>
                <option value="Gibson">Gibson</option>
                <option value="Martin">Martin</option>
                <option value="Taylor">Taylor</option>
                <option value="PRS">PRS</option>
                <option value="Ibanez">Ibanez</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-3 py-2 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-desc">Price High to Low</option>
                <option value="price-asc">Price Low to High</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>
              <Link
                href="/dashboard/products/create"
                className="px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200"
              >
                Add New Product
              </Link>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-zinc-200">
          <div className="px-6 py-4 border-b border-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900">
              Products ({totalProducts})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-zinc-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 relative">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-zinc-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-zinc-500">
                            {product.brand} {product.model}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      ${product.price.toFixed(2)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.isFeatured
                            ? "bg-green-100 text-green-800"
                            : "bg-zinc-100 text-zinc-800"
                        }`}
                      >
                        {product.isFeatured ? "Featured" : "Regular"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/products/${product._id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() =>
                            handleToggleFeatured(
                              product._id,
                              product.isFeatured
                            )
                          }
                          className={`${
                            product.isFeatured
                              ? "text-yellow-600 hover:text-yellow-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                        >
                          {product.isFeatured ? "Unfeature" : "Feature"}
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-zinc-700">
                  Page {page} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border border-zinc-300 text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 border border-zinc-300 text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
