"use client";

import { useCartStore } from "@/store/cartStore";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getUniqueItems,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
    toast.success("Cart updated");
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeFromCart(itemId);
    toast.success(`${itemName} removed from cart`);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    router.push("/checkout");
  };

  const handleClearCart = () => {
    if (items.length === 0) {
      toast.error("Your cart is already empty");
      return;
    }
    clearCart();
    toast.success("Cart cleared");
  };

  if (items.length === 0) {
    return (
      <>
        {/* Hero Section */}
        <section className="relative bg-zinc-50 border-b border-zinc-200 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/236910/pexels-photo-236910.jpeg"
              alt="Shopping Cart"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-zinc-900/30"></div>
          </div>
          <Container className="relative py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                Shopping Cart
              </h1>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Your cart is empty. Start shopping to add some amazing guitars
                to your collection.
              </p>
            </div>
          </Container>
        </section>

        {/* Empty Cart */}
        <section className="py-16">
          <Container>
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-zinc-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any guitars to your cart yet.
                Browse our collection and find your perfect instrument.
              </p>
              <Link
                href="/guitars"
                className="inline-flex items-center px-8 py-3 bg-zinc-900 text-white font-medium tracking-wide uppercase hover:bg-zinc-800 transition-colors duration-200"
              >
                Browse Guitars
              </Link>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-zinc-50 border-b border-zinc-200 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/236910/pexels-photo-236910.jpeg"
            alt="Shopping Cart"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-zinc-900/30"></div>
        </div>
        <Container className="relative py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              Shopping Cart
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Review your selected guitars and proceed to checkout.
            </p>
          </div>
        </Container>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-zinc-200">
                <div className="p-6 border-b border-zinc-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-zinc-900">
                      Cart Items ({getUniqueItems()})
                    </h2>
                    <button
                      onClick={handleClearCart}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-zinc-200">
                  {items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-zinc-100 relative overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-zinc-600 mb-2">
                                {item.brand} • {item.category} •{" "}
                                {item.condition}
                              </p>
                              <p className="text-lg font-bold text-zinc-900">
                                ${item.price.toLocaleString()}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() =>
                                handleRemoveItem(item.id, item.name)
                              }
                              className="text-zinc-400 hover:text-red-600 transition-colors duration-200"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <label className="text-sm font-medium text-zinc-700">
                                Quantity:
                              </label>
                              <div className="flex items-center border border-zinc-300">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="px-3 py-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors duration-200"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-zinc-900 font-medium min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="px-3 py-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors duration-200"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-zinc-900">
                                ${(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-zinc-200 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">
                      Subtotal ({getTotalItems()} items)
                    </span>
                    <span className="font-medium">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Shipping</span>
                    <span className="font-medium">$49.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Tax</span>
                    <span className="font-medium">
                      ${(getTotalPrice() * 0.08).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-zinc-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>
                        $
                        {(
                          getTotalPrice() +
                          49.99 +
                          getTotalPrice() * 0.08
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full px-6 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/guitars"
                    className="text-sm text-zinc-600 hover:text-zinc-900 font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
