"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { toast } from "react-hot-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteConfirmationModal from "@/components/ui/delete-confirmation-modal";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    orderId: string | null;
    orderNumber: string;
  }>({
    isOpen: false,
    orderId: null,
    orderNumber: "",
  });

  useEffect(() => {
    fetchOrders();
  }, [page, search, status, sortBy, sortOrder]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Mock orders data for frontend-only mode
      const mockOrders: Order[] = [
        {
          _id: "1",
          orderNumber: "ORD-001",
          customerName: "John Doe",
          customerEmail: "john@example.com",
          total: 4500,
          status: "pending",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          orderNumber: "ORD-002",
          customerName: "Jane Smith",
          customerEmail: "jane@example.com",
          total: 3800,
          status: "processing",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          _id: "3",
          orderNumber: "ORD-003",
          customerName: "Bob Johnson",
          customerEmail: "bob@example.com",
          total: 180,
          status: "completed",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          _id: "4",
          orderNumber: "ORD-004",
          customerName: "Alice Williams",
          customerEmail: "alice@example.com",
          total: 5200,
          status: "shipped",
          createdAt: new Date(Date.now() - 259200000).toISOString(),
        },
        {
          _id: "5",
          orderNumber: "ORD-005",
          customerName: "Charlie Brown",
          customerEmail: "charlie@example.com",
          total: 2500,
          status: "pending",
          createdAt: new Date(Date.now() - 345600000).toISOString(),
        },
      ];

      // Filter by status
      let filteredOrders = mockOrders;
      if (status !== "all") {
        filteredOrders = mockOrders.filter(order => order.status === status);
      }

      // Filter by search
      if (search) {
        filteredOrders = filteredOrders.filter(order =>
          order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
          order.customerName.toLowerCase().includes(search.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Sort
      filteredOrders.sort((a, b) => {
        const aValue = a[sortBy as keyof Order];
        const bValue = b[sortBy as keyof Order];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      // Paginate
      const startIndex = (page - 1) * 10;
      const paginatedOrders = filteredOrders.slice(startIndex, startIndex + 10);

      setOrders(paginatedOrders);
      setTotalPages(Math.ceil(filteredOrders.length / 10));
      setTotalOrders(filteredOrders.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update order status locally (frontend-only mode)
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus as any } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating the order status");
    }
  };

  const handleDeleteClick = (orderId: string, orderNumber: string) => {
    setDeleteModal({
      isOpen: true,
      orderId,
      orderNumber,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.orderId) return;

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Delete order locally (frontend-only mode)
      setOrders(prevOrders =>
        prevOrders.filter(order => order._id !== deleteModal.orderId)
      );
      toast.success("Order deleted successfully");
      setDeleteModal({ isOpen: false, orderId: null, orderNumber: "" });
      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("An error occurred while deleting the order");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, orderId: null, orderNumber: "" });
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Orders
              </label>
              <input
                type="text"
                placeholder="Search by order number, customer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full py-5 !shadow-none">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <Select
                value={`${sortBy}-${sortOrder}`}
                onValueChange={(value) => {
                  const [field, order] = value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <SelectTrigger className="w-full py-5 !shadow-none">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest First</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                  <SelectItem value="total-desc">Total High to Low</SelectItem>
                  <SelectItem value="total-asc">Total Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearch("");
                  setStatus("");
                  setSortBy("createdAt");
                  setSortOrder("desc");
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : orders.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.orderNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(order.createdAt)}
                            </div>
                            <div className="text-sm text-gray-500">
                              Invoice: {order.invoiceNumber}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.customer.firstName}{" "}
                              {order.customer.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.customer.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.items.length} item
                            {order.items.length !== 1 ? "s" : ""}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items.map((item) => item.name).join(", ")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.total.toLocaleString()}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.paymentMethod === "invoice"
                            ? "Invoice"
                            : "Bank Transfer"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col space-y-1">
                            <Select
                              value={order.status}
                              onValueChange={(value) =>
                                handleStatusUpdate(order._id, value)
                              }
                            >
                              <SelectTrigger className="w-32 h-7 text-xs px-2 py-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                  Confirmed
                                </SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">
                                  Delivered
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Link
                              href={`/dashboard/orders/${order._id}`}
                              className="text-blue-600 hover:text-blue-900 text-xs"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() =>
                                handleDeleteClick(order._id, order.orderNumber)
                              }
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
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2  font-medium text-gray-900 text-lg">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {search || status !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No orders have been placed yet."}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
        itemName={`Order #${deleteModal.orderNumber}`}
        isLoading={false}
      />
    </DashboardLayout>
  );
}
