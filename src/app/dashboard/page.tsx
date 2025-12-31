"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import Link from "next/link";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalServices: number;

}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalServices: 0,

  });
  const [loading, setLoading] = useState(true);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Use mock data for frontend-only mode
      const mockProducts = [
        {
          _id: "1",
          name: "Apex Pro Racing Kart",
          price: 4500000,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
          brand: "Apex Rush",
          stock: 5,
          createdAt: new Date().toISOString()
        },
        {
          _id: "2",
          name: "Thunder 250cc Racing Kart",
          price: 3800000,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
          brand: "Apex Rush",
          stock: 8,
          createdAt: new Date().toISOString()
        },
        {
          _id: "3",
          name: "Pro Racing Helmet",
          price: 180000,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
          brand: "Apex Rush",
          stock: 15,
          createdAt: new Date().toISOString()
        }
      ];

      const mockOrders = [
        { _id: "1", total: 4500000 },
        { _id: "2", total: 3800000 },
        { _id: "3", total: 180000 }
      ];

      const mockServices = [
        { _id: "1", name: "Kart Maintenance" },
        { _id: "2", name: "Performance Tuning" },
        { _id: "3", name: "Custom Paint Job" }
      ];


      const totalRevenue = mockOrders.reduce((sum: number, order: any) => {
        return sum + (order.total || 0);
      }, 0);

      setStats({
        totalProducts: mockProducts.length,
        totalOrders: mockOrders.length,
        totalRevenue,
        totalServices: mockServices.length,
      });

      setRecentProducts(mockProducts);
    } catch (error) {
      console.error("Error loading mock data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome to your Apex Rush Karts admin panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalProducts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
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
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Services</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalServices}
                </p>
              </div>
            </div>
          </div>


        </div>

        {/* Quick Actions and Recent Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/products/create"
                className="block w-full px-4 py-3 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Add New Product
              </Link>
              <Link
                href="/dashboard/orders"
                className="block w-full px-4 py-3 border border-gray-300 text-gray-700 text-center rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                View All Orders
              </Link>
              <Link
                href="/dashboard/products"
                className="block w-full px-4 py-3 border border-gray-300 text-gray-700 text-center rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Manage Products
              </Link>
              <Link
                href="/dashboard/services"
                className="block w-full px-4 py-3 border border-gray-300 text-gray-700 text-center rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Manage Services
              </Link>

            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Products
              </h3>
              <Link
                href="/dashboard/products"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.brand} • ${product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.stock <= 5
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                          }`}
                      >
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No products found</p>
              )}
            </div>
          </div>
        </div>

        {/* System Status */}
        {/* <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Database Connected</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">
                API Services Running
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Cloudinary Connected
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </DashboardLayout>
  );
}
