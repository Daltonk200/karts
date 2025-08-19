"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: string;
  paymentMethod: string;
  invoiceNumber: string;
  createdAt: string;
}

export default function OrdersPage() {
  // Set this to true to bypass authentication
  const BYPASS_AUTH = false;

  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (loading) return;
    fetchOrders();
  }, [page, search, status, sortBy, sortOrder]);

  useEffect(() => {
    fetchOrders();
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

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search,
        status,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/orders?${params}`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
        setTotalPages(data.pagination.pages);
        setTotalOrders(data.pagination.total);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("dashboard_token");
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Order status updated successfully");
        fetchOrders();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating the order status");
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const token = localStorage.getItem("dashboard_token");
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Order deleted successfully");
        fetchOrders();
      } else {
        toast.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("An error occurred while deleting the order");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboard_token");
    localStorage.removeItem("dashboard_user");
    router.push("/dashboard/login");
    toast.success("Logged out successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-zinc-100 text-zinc-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="mt-4 text-zinc-600">Loading orders...</p>
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
                Orders Management
              </h1>
              <p className="text-zinc-600">Track and manage customer orders</p>
            </div>
            <div className="flex items-center space-x-4">
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
              className="text-zinc-600 hover:text-zinc-900 pb-2 font-medium"
            >
              Products
            </Link>
            <Link
              href="/dashboard/orders"
              className="text-zinc-900 border-b-2 border-zinc-900 pb-2 font-medium"
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
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
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
                <option value="total-desc">Total High to Low</option>
                <option value="total-asc">Total Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-zinc-200">
          <div className="px-6 py-4 border-b border-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900">
              Orders ({totalOrders})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-zinc-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-zinc-900">
                          {order.orderNumber}
                        </div>
                        <div className="text-sm text-zinc-500">
                          {formatDate(order.createdAt)}
                        </div>
                        <div className="text-sm text-zinc-500">
                          Invoice: {order.invoiceNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-zinc-900">
                          {order.customer.firstName} {order.customer.lastName}
                        </div>
                        <div className="text-sm text-zinc-500">
                          {order.customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-900">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </div>
                      <div className="text-sm text-zinc-500">
                        {order.items.map((item) => item.name).join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      {order.paymentMethod === "invoice"
                        ? "Invoice"
                        : "Bank Transfer"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col space-y-1">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusUpdate(order._id, e.target.value)
                          }
                          className="text-xs border border-zinc-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <Link
                          href={`/dashboard/orders/${order._id}`}
                          className="text-blue-600 hover:text-blue-900 text-xs"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="text-red-600 hover:text-red-900 text-xs text-left"
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
