"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  productId: {
    image: string;
  };  
}

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: string;
  invoiceNumber: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderDetailPage() {
  // Set this to true to bypass authentication
  const BYPASS_AUTH = false;

  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("dashboard_token");
    if (!BYPASS_AUTH) {
      // Check authentication
      if (!token) {
        router.push("/dashboard/login");
        return;
      }
    }

    // Fetch order data
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);
        } else {
          toast.error("Failed to load order");
          router.push("/dashboard/orders");
        }
      } catch (error) {
        toast.error("An error occurred while loading the order");
        router.push("/dashboard/orders");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [params.id, router]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem("dashboard_token");
      const response = await fetch(`/api/orders/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
        toast.success("Order status updated successfully!");
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("An error occurred while updating the order status");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboard_token");
    localStorage.removeItem("dashboard_user");
    router.push("/dashboard/login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Order not found</p>
        </div>
      </div>
    );
  }
  console.log("order", order);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #{order.orderNumber}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Invoice: {order.invoiceNumber}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard/orders")}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Orders
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Status
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">
                    {formatDate(order.updatedAt)}
                  </span>
                </div>
              </div>
              {order.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-2">Notes:</h3>
                  <p className="text-gray-600">{order.notes}</p>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={item.productId?.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-500">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Info & Actions */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Customer Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{order.customer.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{order.customer.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium">{order.customer.phone}</p>
                </div>
                <div>
                  <span className="text-gray-600">Address:</span>
                  <div className="font-medium">
                    <p>{order.customer.address.street}</p>
                    <p>
                      {order.customer.address.city},{" "}
                      {order.customer.address.state}{" "}
                      {order.customer.address.zipCode}
                    </p>
                    <p>{order.customer.address.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    ${order.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total:
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Update */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Update Status
              </h2>
              <div className="space-y-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  disabled={updating}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {updating && (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-sm text-gray-600">
                      Updating...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    window.open(`/invoice/${order.invoiceNumber}`, "_blank")
                  }
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Invoice
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Print Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
