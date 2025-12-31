"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import UserDashboardLayout from "@/components/user/UserDashboardLayout";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    productId: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  notes?: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock order data for frontend-only mode
    const mockOrder: Order = {
      _id: params.id as string,
      orderNumber: `ORD-${params.id}`,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+1234567890",
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
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      paymentMethod: "credit_card",
      paymentStatus: "paid",
      notes: "Please handle with care",
    };

    setOrder(mockOrder);
    setLoading(false);
  }, [params.id]);

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

  if (loading) {
    return (
      <UserDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </UserDashboardLayout>
    );
  }

  if (!order) {
    return (
      <UserDashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
          <Link
            href="/account/orders"
            className="mt-4 inline-block text-red-600 hover:text-red-700"
          >
            Back to Orders
          </Link>
        </div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/account/orders"
              className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
            >
              ← Back to Orders
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
            <p className="mt-2 text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
              order.status
            )}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.productId}`}
                        className="text-base font-medium text-gray-900 hover:text-red-600"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold text-gray-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      {order.status === "completed" && (
                        <Link
                          href={`/products/${item.productId}`}
                          className="mt-2 inline-block text-sm text-red-600 hover:text-red-700"
                        >
                          Write Review
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="text-gray-600">
                <p className="font-medium">{order.customerName}</p>
                <p className="mt-1">{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-bold text-red-600">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium capitalize">
                    {order.paymentMethod.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span
                    className={`font-medium ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {order.status === "shipped" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Track Package</h2>
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Track Shipment
                </button>
              </div>
            )}

            <div className="bg-white rounded-lg shadow p-6">
              <Link
                href={`/invoice/${order._id}`}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Download Invoice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
}

