"use client";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiOutlineGift, AiOutlineTruck } from "react-icons/ai";
import { BiShield } from "react-icons/bi";

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
  const { addToWishlist, isInWishlist } = useWishlistStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [savedForLater, setSavedForLater] = useState<any[]>([]);
  const [recommendations] = useState([
    {
      _id: "rec1",
      name: "Hydrating Face Serum",
      price: 28000,
      image:
        "https://img.freepik.com/premium-photo/beauty-product-bottle-serum_93675-123583.jpg?W=2000",
      category: "Skincare",
      brand: "GlowBeauty",
      skinType: "All Types",
      size: "30ml",
    },
    {
      _id: "rec2",
      name: "Matte Lipstick Set",
      price: 35000,
      image:
        "https://img.freepik.com/high-angle-view-pen-table_1048944-18511898.jpg?W=2000",
      category: "Makeup",
      brand: "GlowBeauty",
      skinType: "All Types",
      size: "3.5g each",
    },
    {
      _id: "rec3",
      name: "Anti-Aging Night Cream",
      price: 42000,
      image:
        "https://img.freepik.com/premium-photo/beauty-cream-jar-isolated_93675-123583.jpg?W=2000",
      category: "Skincare",
      brand: "GlowBeauty",
      skinType: "Mature Skin",
      size: "50ml",
    },
  ]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
    toast.success("Cart updated");
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeFromCart(itemId);
    toast.success(`${itemName} removed from cart`);
  };

  const handleSaveForLater = (item: any) => {
    removeFromCart(item.id);
    setSavedForLater((prev) => [...prev, item]);
    toast.success(`${item.name} saved for later`);
  };

  const handleMoveToCart = (item: any) => {
    setSavedForLater((prev) => prev.filter((saved) => saved._id !== item._id));
    // Add back to cart with original structure
    const cartItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      brand: item.brand,
      condition: item.skinType,
      stock: 1,
      model: item.size || "",
    };
    // Use the cart store's addToCart method
    const { addToCart } = useCartStore.getState();
    addToCart(cartItem);
    toast.success(`${item.name} moved to cart`);
  };

  const handleAddToWishlist = (product: any) => {
    addToWishlist({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      skinType: product.skinType || product.condition,
      size: product.size || product.model,
      isFeatured: false,
    });
    toast.success(`${product.name} added to wishlist`);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      router.push("/checkout");
    }, 1000);
  };

  const handleClearCart = () => {
    if (items.length === 0) {
      toast.error("Your cart is already empty");
      return;
    }
    clearCart();
    toast.success("Cart cleared");
  };

  // Calculate shipping based on total
  const getShippingCost = () => {
    const total = getTotalPrice();
    if (total >= 50000) return 0; // Free shipping over XAF 50K
    if (total >= 25000) return 2500; // Reduced shipping over XAF 25K
    return 5000; // Standard shipping
  };

  const shippingCost = getShippingCost();
  const total = getTotalPrice() + shippingCost;

  if (items.length === 0) {
    return (
      <>
        {/* Hero Section */}
        <section className="relative  border-b border-rose-200 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://img.freepik.com/free-photo/supermarket-trolleys-gift-boxes_23-2148663146.jpg?t=st=1755685004~exp=1755688604~hmac=7fbf3c9f68d42b024c4b15f88dd3ecf14b9a18cb0541525f71d1b731e519b073&w=2000"
              alt="Shopping Cart"
              fill
              className="object-cover "
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-pink-900/20"></div> */}
          </div>
          <Container className="relative py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-caveat">
                Shopping Cart
              </h1>
              <p className="text-lg text-white max-w-2xl mx-auto font-outfit">
                Your cart is empty. Start shopping to add some amazing beauty
                products to your collection.
              </p>
            </div>
          </Container>
        </section>

        {/* Empty Cart */}
        <section className="py-16 bg-zinc-50">
          <Container>
            <div className="text-center py-12">
              <div className="text-6xl mb-6">💄</div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-4 font-caveat">
                Your cart is empty
              </h2>
              <p className="text-zinc-600 mb-8 max-w-md mx-auto font-outfit">
                Looks like you haven't added any beauty products to your cart
                yet. Browse our collection and find your perfect cosmetics.
              </p>
              <Link
                href="/cosmetics"
                className="inline-flex items-center px-8 py-3 bg-rose-600 text-white font-medium tracking-wide uppercase hover:bg-rose-700 transition-all duration-300 rounded-[5px] font-outfit transform hover:scale-105 hover:shadow-sm"
              >
                Browse Cosmetics
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
      <section className="relative  border-b border-rose-200 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://img.freepik.com/free-photo/supermarket-trolleys-gift-boxes_23-2148663146.jpg?t=st=1755685004~exp=1755688604~hmac=7fbf3c9f68d42b024c4b15f88dd3ecf14b9a18cb0541525f71d1b731e519b073&w=2000"
            alt="Shopping Cart"
            fill
            className="object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/60 to-black/60"></div>
        </div>
        <Container className="relative py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-caveat">
              Shopping Cart
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto font-outfit">
              Review your selected beauty products and proceed to checkout.
            </p>
          </div>
        </Container>
      </section>

      {/* Cart Content */}
      <section className="py-16 bg-zinc-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="bg-white border border-zinc-200 rounded-[5px] shadow-sm">
                <div className="p-6 border-b border-zinc-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-zinc-900 font-caveat">
                      Cart Items ({getUniqueItems()})
                    </h2>
                    <button
                      onClick={handleClearCart}
                      className="text-sm text-rose-600 hover:text-rose-700 font-medium font-outfit transition-colors duration-200"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-zinc-200">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-6 cart-item-hover animate-cart-item-enter"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-zinc-100 relative overflow-hidden rounded-[5px]">
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
                              <h3 className="text-lg font-semibold text-zinc-900 mb-1 font-caveat">
                                {item.name}
                              </h3>
                              <p className="text-sm text-zinc-600 mb-2 font-outfit">
                                {item.brand} • {item.category} •{" "}
                                {item.condition}
                              </p>
                              <p className="text-lg font-bold text-rose-600 font-caveat">
                                XAF {item.price.toLocaleString()}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              {/* Save for Later */}
                              <button
                                onClick={() => handleSaveForLater(item)}
                                className="p-2 text-zinc-400 hover:text-rose-600 transition-colors duration-200 rounded-full hover:bg-rose-50 save-later-btn"
                                title="Save for Later"
                              >
                                <AiOutlineHeart className="w-4 h-4" />
                              </button>

                              {/* Remove Button */}
                              <button
                                onClick={() =>
                                  handleRemoveItem(item.id, item.name)
                                }
                                className="p-2 text-zinc-400 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-red-50"
                                title="Remove Item"
                              >
                                <svg
                                  className="w-4 h-4"
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
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <label className="text-sm font-medium text-zinc-700 font-outfit">
                                Quantity:
                              </label>
                              <div className="flex items-center border border-zinc-300 rounded-[5px] overflow-hidden">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors duration-200 font-outfit quantity-control"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1.5 text-zinc-900 font-medium min-w-[2rem] text-center font-outfit bg-zinc-50">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors duration-200 font-outfit quantity-control"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-rose-600 font-caveat">
                                XAF{" "}
                                {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved for Later */}
              {savedForLater.length > 0 && (
                <div className="bg-white border border-zinc-200 rounded-[5px] shadow-sm">
                  <div className="p-6 border-b border-zinc-200">
                    <h3 className="text-lg font-semibold text-zinc-900 font-caveat">
                      Saved for Later ({savedForLater.length})
                    </h3>
                  </div>
                  <div className="divide-y divide-zinc-200">
                    {savedForLater.map((item) => (
                      <div key={item._id} className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-24 h-24 bg-zinc-100 relative overflow-hidden rounded-[5px]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-zinc-900 mb-1 font-caveat">
                              {item.name}
                            </h4>
                            <p className="text-sm text-zinc-600 mb-2 font-outfit">
                              {item.brand} • {item.category} • {item.skinType}
                            </p>
                            <p className="text-lg font-bold text-rose-600 font-caveat mb-3">
                              XAF {item.price.toLocaleString()}
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleMoveToCart(item)}
                                className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-[5px] hover:bg-rose-700 transition-colors duration-200 font-outfit"
                              >
                                Move to Cart
                              </button>
                              <button
                                onClick={() => handleAddToWishlist(item)}
                                className={`px-4 py-2 border text-sm font-medium rounded-[5px] transition-all duration-200 font-outfit ${
                                  isInWishlist(item._id)
                                    ? "border-rose-300 text-rose-600 bg-rose-50"
                                    : "border-zinc-300 text-zinc-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50"
                                }`}
                              >
                                {isInWishlist(item._id)
                                  ? "In Wishlist"
                                  : "Add to Wishlist"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-white border border-zinc-200 rounded-[5px] shadow-sm">
                <div className="p-6 border-b border-zinc-200">
                  <h3 className="text-lg font-semibold text-zinc-900 font-caveat">
                    You might also like
                  </h3>
                </div>
                <div className="p-6">
                  {/* Mobile Carousel */}
                  <div className="lg:hidden">
                    <div className="relative">
                      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide carousel-container">
                        {recommendations.map((product) => (
                          <div
                            key={product._id}
                            className="flex-shrink-0 w-48 text-center group carousel-item"
                          >
                            <div className="aspect-square bg-zinc-100 relative overflow-hidden rounded-[5px] mb-3">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <h4 className="text-sm font-medium text-zinc-900 mb-1 font-outfit line-clamp-2">
                              {product.name}
                            </h4>
                            <p className="text-sm text-rose-600 font-bold font-caveat mb-2">
                              XAF {product.price.toLocaleString()}
                            </p>
                            <button
                              onClick={() => handleAddToWishlist(product)}
                              className={`w-full px-3 py-2 text-xs font-medium rounded-[5px] transition-all duration-200 font-outfit ${
                                isInWishlist(product._id)
                                  ? "border-rose-300 text-rose-600 bg-rose-50"
                                  : "border border-zinc-300 text-zinc-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50"
                              }`}
                            >
                              {isInWishlist(product._id)
                                ? "In Wishlist"
                                : "Add to Wishlist"}
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Carousel Scroll Indicator */}
                      <div className="flex justify-center mt-4 space-x-2">
                        {recommendations.map((_, index) => (
                          <div
                            key={index}
                            className="w-2 h-2 rounded-full bg-zinc-300 transition-colors duration-200 hover:bg-rose-400 cursor-pointer"
                            title={`View item ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Mobile Carousel Hint */}
                      <p className="text-xs text-zinc-500 text-center mt-2 font-outfit">
                        Swipe to see more products →
                      </p>
                    </div>
                  </div>

                  {/* Desktop Grid */}
                  <div className="hidden lg:grid grid-cols-3 gap-4">
                    {recommendations.map((product) => (
                      <div key={product._id} className="text-center group">
                        <div className="aspect-square bg-zinc-100 relative overflow-hidden rounded-[5px] mb-3">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-sm font-medium text-zinc-900 mb-1 font-outfit line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-sm text-rose-600 font-bold font-caveat mb-2">
                          XAF {product.price.toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleAddToWishlist(product)}
                          className={`w-full px-3 py-2 text-xs font-medium rounded-[5px] transition-all duration-200 font-outfit ${
                            isInWishlist(product._id)
                              ? "border-rose-300 text-rose-600 bg-rose-50"
                              : "border border-zinc-300 text-zinc-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50"
                          }`}
                        >
                          {isInWishlist(product._id)
                            ? "In Wishlist"
                            : "Add to Wishlist"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-zinc-200 rounded-[5px] shadow-sm p-6 sticky top-24 order-summary">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4 font-caveat">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm font-outfit">
                    <span className="text-zinc-600">
                      Subtotal ({getTotalItems()} items)
                    </span>
                    <span className="font-medium">
                      XAF {getTotalPrice().toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-outfit">
                    <span className="text-zinc-600 flex items-center gap-2">
                      <AiOutlineTruck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `XAF ${shippingCost.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-zinc-200 pt-3">
                    <div className="flex justify-between text-lg font-bold font-caveat">
                      <span>Total</span>
                      <span className="text-rose-600">
                        XAF {total.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                {shippingCost === 0 && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-[5px] animate-shipping-badge">
                    <div className="flex items-center gap-2 text-green-700 text-sm font-outfit">
                      <AiOutlineGift className="w-5 h-5" />
                      <span>Free shipping on orders over XAF 50K!</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full px-6 py-3 bg-rose-600 text-white font-medium hover:bg-rose-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-[5px] font-outfit transform hover:scale-105 hover:shadow-sm"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      Processing...
                    </div>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/cosmetics"
                    className="text-sm text-zinc-600 hover:text-rose-600 font-medium font-outfit transition-colors duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-zinc-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="text-xs text-zinc-500 font-outfit trust-badge">
                      <BiShield className="w-5 h-5 mx-auto mb-1 text-rose-600" />
                      Secure Checkout
                    </div>
                    <div className="text-xs text-zinc-500 font-outfit trust-badge">
                      <AiOutlineTruck className="w-5 h-5 mx-auto mb-1 text-rose-500" />
                      Fast Delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
