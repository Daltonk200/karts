"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

export default function DashboardPage() {
  // Set this to true to bypass authentication
  const BYPASS_AUTH = false;

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (BYPASS_AUTH) {
      setUser({ username: "Admin", role: "admin" });
      setIsAuthenticated(true);
      fetchStats();
      return;
    }

    const token = localStorage.getItem("dashboard_token");
    const userData = localStorage.getItem("dashboard_user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
      fetchStats();
    } else {
      router.push("/dashboard/login");
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("dashboard_token");
      const headers: HeadersInit = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Fetch products count
      const productsRes = await fetch("/api/products?limit=1", { headers });
      const productsData = await productsRes.json();

      // Fetch orders count
      const ordersRes = await fetch("/api/orders?limit=1", { headers });
      const ordersData = await ordersRes.json();

      // Fetch pending orders
      const pendingRes = await fetch("/api/orders?status=pending&limit=1", {
        headers,
      });
      const pendingData = await pendingRes.json();

      // Fetch all orders for revenue calculation
      const allOrdersRes = await fetch("/api/orders?limit=1000", { headers });
      const allOrdersData = await allOrdersRes.json();

      const totalRevenue = allOrdersData.orders.reduce(
        (sum: number, order: any) => {
          return sum + (order.total || 0);
        },
        0
      );

      setStats({
        totalProducts: productsData.pagination?.total || 0,
        totalOrders: ordersData.pagination?.total || 0,
        pendingOrders: pendingData.pagination?.total || 0,
        totalRevenue,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboard_token");
    localStorage.removeItem("dashboard_user");
    setIsAuthenticated(false);
    router.push("/dashboard/login");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="mt-4 text-zinc-600">Loading dashboard...</p>
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
                Guitar Shop Dashboard
              </h1>
              <p className="text-zinc-600">Welcome back, {user?.username}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-zinc-600">Role: {user?.role}</span>
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
              className="text-zinc-900 border-b-2 border-zinc-900 pb-2 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/products"
              className="text-zinc-600 hover:text-zinc-900 pb-2 font-medium"
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 border border-zinc-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
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
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-zinc-900">
                  {stats.totalProducts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
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
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-zinc-900">
                  {stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-600">
                  Pending Orders
                </p>
                <p className="text-2xl font-bold text-zinc-900">
                  {stats.pendingOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
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
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-zinc-900">
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 border border-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/products/create"
                className="block w-full px-4 py-2 bg-zinc-900 text-white text-center hover:bg-zinc-800 transition-colors duration-200"
              >
                Add New Product
              </Link>
              <Link
                href="/dashboard/orders"
                className="block w-full px-4 py-2 border border-zinc-300 text-zinc-700 text-center hover:bg-zinc-50 transition-colors duration-200"
              >
                View All Orders
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">
              Recent Activity
            </h3>
            <div className="text-zinc-600 text-sm">
              <p>Dashboard is ready for use!</p>
              <p className="mt-2">• Manage your guitar inventory</p>
              <p>• Track customer orders</p>
              <p>• Monitor sales performance</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
