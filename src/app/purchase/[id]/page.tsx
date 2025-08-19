"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  condition: string;
  isFeatured: boolean;
  stock: number;
  sku: string;
  description: string;
}

interface PurchaseForm {
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

export default function PurchasePage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<PurchaseForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    paymentMethod: "invoice",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          toast.error("Product not found");
          router.push("/guitars");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
        router.push("/guitars");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

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
    return product ? product.price * 0.08 : 0; // 8% tax
  };

  const calculateShipping = () => {
    return product ? 49.99 : 0; // Fixed shipping cost
  };

  const calculateTotal = () => {
    if (!product) return 0;
    return product.price + calculateTax() + calculateShipping();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order data
      const orderData = {
        items: [
          {
            productId: product!._id,
            name: product!.name,
            price: product!.price,
            quantity: 1,
          },
        ],
        customer: formData,
        paymentMethod: formData.paymentMethod,
        total: calculateTotal(),
        subtotal: product!.price,
        tax: calculateTax(),
        shipping: calculateShipping(),
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
              "Order placed successfully! Invoice sent to your email."
            );
          } else {
            toast.success(
              "Order placed successfully! Invoice will be sent shortly."
            );
          }
        } catch (emailError) {
          console.error("Error sending invoice:", emailError);
          toast.success(
            "Order placed successfully! Invoice will be sent shortly."
          );
        }

        // Redirect to invoice page
        setTimeout(() => {
          router.push(`/invoice/${orderResult.order.invoiceNumber}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎸</div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-zinc-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/guitars")}
            className="px-6 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200"
          >
            Back to Guitars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Details */}
          <div className="bg-white p-8 border border-zinc-200">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
              Product Details
            </h2>
            <div className="flex flex-col md:flex-row gap-2 items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-zinc-100 relative overflow-hidden border border-zinc-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-zinc-600 mb-4">{product.description}</p>
                <div className="space-y-2 text-sm text-zinc-600">
                  <div>
                    <span className="font-medium">Brand:</span> {product.brand}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span>{" "}
                    {product.category}
                  </div>
                  <div>
                    <span className="font-medium">Condition:</span>{" "}
                    {product.condition}
                  </div>
                  <div>
                    <span className="font-medium">SKU:</span> {product.sku}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-3xl font-bold text-zinc-900">
                    ${product.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Form */}
          <div className="bg-white p-8 border border-zinc-200">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
              Customer Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-zinc-900 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-zinc-900 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-900 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-zinc-900 mb-2"
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-zinc-900 mb-2"
                >
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-zinc-900 mb-2"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-zinc-900 mb-2"
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-zinc-900 mb-2"
                  >
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-zinc-900 mb-2"
                >
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-zinc-900 mb-2"
                >
                  Payment Method *
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                >
                  <option value="invoice">Invoice</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-zinc-900 mb-2"
                >
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  placeholder="Any special requests or notes..."
                />
              </div>

              {/* Order Summary */}
              <div className="bg-zinc-50 p-6 border border-zinc-200">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-zinc-300 pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-900 text-white py-3 px-6 font-medium hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Complete Purchase"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
