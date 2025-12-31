"use client";

import { useState, useEffect } from "react";
import UserDashboardLayout from "@/components/user/UserDashboardLayout";
import Link from "next/link";
import Image from "next/image";

interface Order {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    productId?: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Mock orders data for frontend-only mode
    const mockOrders: Order[] = [
      {
        _id: "1",
        orderNumber: "ORD-001",
        total: 4500,
        status: "pending",
        createdAt: new Date().toISOString(),
        items: [
          {
            productId: "1",
            name: "Apex Pro Racing Kart",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
            quantity: 1,
            price: 4500,
          },
        ],
      },
      {
        _id: "2",
        orderNumber: "ORD-002",
        total: 3800,
        status: "shipped",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        items: [
          {
            productId: "2",
            name: "Thunder 250cc Racing Kart",
            image: "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=500",
            quantity: 1,
            price: 3800,
          },
        ],
      },
      {
        _id: "3",
        orderNumber: "ORD-003",
        total: 180,
        status: "completed",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        items: [
          {
            productId: "16",
            name: "Pro Racing Helmet",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
            quantity: 1,
            price: 180,
          },
        ],
      },
      {
        _id: "4",
        orderNumber: "ORD-004",
        total: 5200,
        status: "processing",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        items: [
          {
            productId: "3",
            name: "Velocity Electric Kart",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500",
            quantity: 1,
            price: 5200,
          },
        ],
      },
      {
        _id: "5",
        orderNumber: "ORD-005",
        total: 2500,
        status: "completed",
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        items: [
          {
            productId: "4",
            name: "Junior Racer Kart",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
            quantity: 1,
            price: 2500,
          },
        ],
      },
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) {
    return (
      <UserDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">
            View and track all your orders in one place.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: "all", label: "All Orders" },
                { id: "pending", label: "Pending" },
                { id: "processing", label: "Processing" },
                { id: "shipped", label: "Shipped" },
                { id: "completed", label: "Completed" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    filter === tab.id
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === "all"
                ? "You haven't placed any orders yet."
                : `You don't have any ${filter} orders.`}
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Link href={`/account/orders/${order._id}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${order.total.toLocaleString()}
                        </p>
                        <span
                          className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} × ${item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <p className="text-sm text-gray-500">
                          +{order.items.length - 3} more item{order.items.length - 3 > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex space-x-4">
                        <Link
                          href={`/account/orders/${order._id}`}
                          className="text-sm font-medium text-red-600 hover:text-red-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Details
                        </Link>
                        {order.status === "completed" && (
                          <Link
                            href={`/products/${order.items[0]?.productId || "1"}`}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Write Review
                          </Link>
                        )}
                      </div>
                      {order.status === "shipped" && (
                        <button
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Track package functionality
                          }}
                        >
                          Track Package
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserDashboardLayout>
  );
}

