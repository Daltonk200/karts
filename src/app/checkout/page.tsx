"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: "invoice" | "bank-transfer" | "other";
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "invoice",
    notes: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTax = () => {
    return getTotalPrice() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return items.length > 0 ? 29.99 : 0; // Fixed shipping cost
  };

  const calculateTotal = () => {
    return getTotalPrice() + calculateTax() + calculateShipping();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate invoice number
      const invoiceNumber = `INV-${Date.now()}`;

      // Transform cart items to match Order model structure
      const orderItems = items.map((item) => ({
        productId: item.id, // Use the item id as productId
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      // Create order data
      const orderData = {
        items: orderItems,
        customer: formData,
        paymentMethod: formData.paymentMethod,
        total: calculateTotal(),
        subtotal: getTotalPrice(),
        tax: calculateTax(),
        shipping: calculateShipping(),
        invoiceNumber,
        status: "pending",
      };

      // Send order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const orderResult = await response.json();

        // Send invoice email
        try {
          const invoiceResponse = await fetch(
            `/api/orders/${orderResult.order._id}/invoice`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (invoiceResponse.ok) {
            toast.success(
              `Order successful! Invoice #${invoiceNumber} has been generated and sent to your email.`
            );
          } else {
            console.error("Failed to send invoice email");
            toast.success(
              `Order successful! Invoice #${invoiceNumber} has been generated.`
            );
          }
        } catch (emailError) {
          console.error("Invoice email error:", emailError);
          toast.success(
            `Order successful! Invoice #${invoiceNumber} has been generated.`
          );
        }

        // Clear cart
        clearCart();

        // Redirect to invoice page
        setTimeout(() => {
          router.push(`/invoice/${invoiceNumber}`);
        }, 2000);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="mt-4 text-zinc-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 bg-zinc-900">
        <Image
          src="https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg"
          alt="Checkout"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Complete Your Order</h1>
            <p className="text-xl">Secure your guitars today</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-50 p-6 border border-zinc-200">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-zinc-900">
                        {item.name}
                      </h3>
                      <p className="text-zinc-600 text-sm">{item.brand}</p>
                      <p className="text-zinc-600 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-zinc-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Subtotal:</span>
                  <span className="font-semibold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Tax (8%):</span>
                  <span className="font-semibold">
                    ${calculateTax().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Shipping:</span>
                  <span className="font-semibold">
                    ${calculateShipping().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-zinc-200 pt-3">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="invoice"
                      checked={formData.paymentMethod === "invoice"}
                      onChange={handleInputChange}
                      className="text-zinc-600 focus:ring-zinc-500"
                    />
                    <span className="text-zinc-900">Invoice</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === "bank-transfer"}
                      onChange={handleInputChange}
                      className="text-zinc-600 focus:ring-zinc-500"
                    />
                    <span className="text-zinc-900">Bank Transfer</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="other"
                      checked={formData.paymentMethod === "other"}
                      onChange={handleInputChange}
                      className="text-zinc-600 focus:ring-zinc-500"
                    />
                    <span className="text-zinc-900">Other</span>
                  </label>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                  placeholder="Any special instructions or notes..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                  className="px-8 py-3 border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Complete Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
