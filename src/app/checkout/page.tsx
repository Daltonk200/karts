"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineCreditCard,
  AiOutlineShoppingCart,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative bg-black border-b border-zinc-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg"
            alt="Checkout Apex Rush Karts"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-zinc-900/40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Complete Your Order
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-outfit max-w-3xl mx-auto">
              Secure your beauty products with our safe and convenient checkout
              process. We'll have your order ready for you in no time.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-zinc-200 sticky top-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AiOutlineShoppingCart className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-caveat font-bold text-zinc-900">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-3 bg-zinc-50 rounded-lg"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-zinc-900 font-outfit text-sm">
                          {item.name}
                        </h3>
                        <p className="text-zinc-600 text-xs font-outfit">
                          {item.brand}
                        </p>
                        <p className="text-zinc-600 text-xs font-outfit">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600 font-outfit">
                          XAF {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-zinc-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 font-outfit">Subtotal:</span>
                    <span className="font-semibold font-outfit">
                      XAF {getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 font-outfit">Tax (8%):</span>
                    <span className="font-semibold font-outfit">
                      XAF {calculateTax().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 font-outfit">Shipping:</span>
                    <span className="font-semibold font-outfit">
                      XAF {calculateShipping().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-zinc-200 pt-3">
                    <span className="font-outfit">Total:</span>
                    <span className="font-outfit text-red-600">
                      XAF {calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-zinc-200">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AiOutlineUser className="w-5 h-5 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-caveat font-bold text-zinc-900">
                        Personal Information
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                          <AiOutlineUser className="inline w-4 h-4 mr-2" />
                          First Name *
                        </Label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                          <AiOutlineUser className="inline w-4 h-4 mr-2" />
                          Last Name *
                        </Label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                          <AiOutlineMail className="inline w-4 h-4 mr-2" />
                          Email *
                        </Label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                          <AiOutlinePhone className="inline w-4 h-4 mr-2" />
                          Phone *
                        </Label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AiOutlineEnvironment className="w-5 h-5 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-caveat font-bold text-zinc-900">
                        Shipping Address
                      </h2>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                          <AiOutlineEnvironment className="inline w-4 h-4 mr-2" />
                          Street Address *
                        </Label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                          placeholder="Enter your street address"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                            City *
                          </Label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                            placeholder="Enter your city"
                          />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                            State *
                          </Label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                            placeholder="Enter your state"
                          />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                            ZIP Code *
                          </Label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                            placeholder="Enter your ZIP code"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                          Country *
                        </Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) =>
                            setFormData({ ...formData, country: value })
                          }
                        >
                          <SelectTrigger className="w-full font-outfit">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">
                              United States
                            </SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">
                              United Kingdom
                            </SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Japan">Japan</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AiOutlineCreditCard className="w-5 h-5 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-caveat font-bold text-zinc-900">
                        Payment Method
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3 p-4 border border-zinc-200 rounded-lg hover:border-red-200 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="invoice"
                          checked={formData.paymentMethod === "invoice"}
                          onChange={handleInputChange}
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-zinc-900 font-outfit">
                          Invoice
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 p-4 border border-zinc-200 rounded-lg hover:border-red-200 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={formData.paymentMethod === "bank-transfer"}
                          onChange={handleInputChange}
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-zinc-900 font-outfit">
                          Bank Transfer
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 p-4 border border-zinc-200 rounded-lg hover:border-red-200 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="other"
                          checked={formData.paymentMethod === "other"}
                          onChange={handleInputChange}
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-zinc-900 font-outfit">Other</span>
                      </label>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                      Additional Notes
                    </Label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit resize-none"
                      placeholder="Any special instructions or notes..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => router.push("/cart")}
                      className="inline-flex items-center px-6 py-3 border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all duration-300 transform hover:scale-[1.02] font-outfit rounded-lg"
                    >
                      <AiOutlineArrowLeft className="w-4 h-4 mr-2" />
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 rounded-lg font-semibold font-outfit text-lg transition-all duration-300 transform hover:scale-[1.02] ${!isSubmitting
                          ? "bg-gradient-to-r from-red-600 to-red-600 text-white hover:from-red-700 hover:to-red-700 shadow-lg hover:shadow-xl"
                          : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                        }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Processing...
                        </div>
                      ) : (
                        "Complete Order"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
