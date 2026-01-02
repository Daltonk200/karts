"use client";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSaveForLaterStore } from "@/store/saveForLaterStore";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiOutlineGift, AiOutlineTruck } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { BiShield } from "react-icons/bi";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  skinType: string;
  size: string;
  isOnSale?: boolean;
  originalPrice?: number;
}

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
    addToCart,
  } = useCartStore();
  const { addToWishlist, isInWishlist } = useWishlistStore();
  const {
    items: savedItems,
    addToSaved,
    removeFromSaved,
    moveToCart: moveSavedToCart,
    getSavedCount,
  } = useSaveForLaterStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);

  // Fetch recommendations from backend
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setRecommendationsLoading(true);
        const response = await fetch(
          "/api/products?limit=6&sortBy=createdAt&sortOrder=desc"
        );
        const data = await response.json();

        if (response.ok) {
          setRecommendations(data.products || []);
        } else {
          console.error("Failed to fetch recommendations:", data);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setRecommendationsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

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
    addToSaved({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      brand: item.brand,
      skinType: item.condition,
      size: item.model || "",
    });
    toast.success(`${item.name} saved for later`);
  };

  const handleMoveToCart = (item: any) => {
    const movedItem = moveSavedToCart(item.id);
    if (movedItem) {
      // Add back to cart with original structure
      const cartItem = {
        id: movedItem.id,
        name: movedItem.name,
        price: movedItem.price,
        image: movedItem.image,
        category: movedItem.category,
        brand: movedItem.brand,
        condition: movedItem.skinType,
        stock: 1,
        model: movedItem.size || "",
      };
      addToCart(cartItem);
      toast.success(`${movedItem.name} moved to cart`);
    }
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
    if (total >= 50) return 0; // Free shipping over $50
    if (total >= 25) return 2.50; // Reduced shipping over $25
    return 5000; // Standard shipping
  };

  const shippingCost = getShippingCost();
  const total = getTotalPrice() + shippingCost;

  if (items.length === 0) {
    return (
      <>
        {/* Hero Section */}
        <section className="relative  border-b border-red-200 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://img.freepik.com/free-photo/supermarket-trolleys-gift-boxes_23-2148663146.jpg?t=st=1755685004~exp=1755688604~hmac=7fbf3c9f68d42b024c4b15f88dd3ecf14b9a18cb0541525f71d1b731e519b073&w=2000"
              alt="Shopping Cart"
              fill
              className="object-cover "
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-red-900/20"></div> */}
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
                yet. Browse our collection and find your perfect karts.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3 bg-white text-red-600 border-2 border-red-600 font-medium tracking-wide uppercase hover:bg-red-50 transition-all duration-300 rounded-[5px] font-outfit transform hover:scale-105 hover:shadow-sm"
              >
                Browse Products
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
      <section className="relative  border-b border-red-200 overflow-hidden">
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
                    <h2 className="md:text-2xl text-lg font-semibold text-zinc-900 font-caveat">
                      Cart Items ({getUniqueItems()})
                    </h2>
                    <button
                      onClick={handleClearCart}
                      className="text-sm text-red-600 hover:text-red-700 font-medium font-outfit transition-colors duration-200"
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
                              <h3 className="md:text-2xl text-lg font-semibold text-zinc-900 mb-1 font-caveat">
                                {item.name}
                              </h3>
                              <p className="text-sm text-zinc-600 mb-2 font-outfit">
                                {item.brand} • {item.category} •{" "}
                                {item.condition}
                              </p>
                              <p className="text-lg font-bold text-red-600 font-caveat">
                                ${item.price.toLocaleString()}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              {/* Save for Later */}
                              <button
                                onClick={() => handleSaveForLater(item)}
                                className="p-2 text-zinc-400 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-red-50 save-later-btn"
                                title="Save for Later"
                              >
                                <BiBookmark className="w-4 h-4" />
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
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4">
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
                              <p className="text-lg font-bold text-red-600 font-caveat">
                                ${" "}
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
              {savedItems.length > 0 && (
                <div className="bg-white border border-zinc-200 rounded-[5px] shadow-sm">
                  <div className="p-6 border-b border-zinc-200">
                    <div className="flex justify-between items-center">
                      <h3 className="md:text-2xl text-lg font-semibold text-zinc-900 font-caveat">
                        Saved for Later ({getSavedCount()})
                      </h3>
                      <button
                        onClick={() => {
                          savedItems.forEach((item) =>
                            removeFromSaved(item.id)
                          );
                          toast.success("All saved items cleared");
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium font-outfit transition-colors duration-200"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-zinc-200">
                    {savedItems.map((item) => (
                      <div key={item.id} className="p-6 saved-item-hover">
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
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-zinc-900 mb-1 font-caveat">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-zinc-600 mb-2 font-outfit">
                                  {item.brand} • {item.category} •{" "}
                                  {item.skinType}
                                </p>
                                <p className="text-lg font-bold text-red-600 font-caveat mb-3">
                                  ${item.price.toLocaleString()}
                                </p>
                                <p className="text-xs text-zinc-500 font-outfit">
                                  Saved on{" "}
                                  {new Date(item.savedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  removeFromSaved(item.id);
                                  toast.success(
                                    `${item.name} removed from saved items`
                                  );
                                }}
                                className="p-2 text-zinc-400 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-red-50"
                                title="Remove from Saved"
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
                            <div className="flex flex-col md:flex-row gap-2 mt-3">
                              <button
                                onClick={() => handleMoveToCart(item)}
                                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-[5px] hover:bg-red-700 transition-colors duration-200 font-outfit w-[150px] md:w-auto flex items-center gap-2"
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
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                  />
                                </svg>
                                Move to Cart
                              </button>
                              <button
                                onClick={() => handleAddToWishlist(item)}
                                className={`px-4 py-2 border text-sm font-medium rounded-[5px] transition-all duration-200 font-outfit w-[150px] md:w-auto flex items-center gap-2 ${
                                  isInWishlist(item.id)
                                    ? "border-red-300 text-red-600 bg-red-50"
                                    : "border-zinc-300 text-zinc-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
                                }`}
                              >
                                <AiOutlineHeart
                                  className={`w-4 h-4 ${
                                    isInWishlist(item.id) ? "fill-current" : ""
                                  }`}
                                />
                                {isInWishlist(item.id)
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
                  <h3 className="text-2xl font-semibold text-zinc-900 font-caveat">
                    You might also like
                  </h3>
                </div>
                <div className="p-6">
                  {recommendationsLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                      <span className="ml-3 text-zinc-600">
                        Loading recommendations...
                      </span>
                    </div>
                  ) : recommendations.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-zinc-500">
                        No recommendations available
                      </p>
                    </div>
                  ) : (
                    <div className="flex overflow-x-scroll snap-x snap-proximity gap-4 md:gap-6 pb-4 scrollbar-hide">
                      {recommendations.map((product) => (
                        <div
                          key={product._id}
                          className="bg-white snap-start border min-w-[230px] md:min-w-[280px] border-zinc-200 hover:border-red-300 transition-all duration-300 flex flex-col rounded-[5px] shadow-sm hover:shadow-md transform hover:-translate-y-1 group"
                        >
                          <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden rounded-t-[5px]">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h4 className="text-sm font-medium text-zinc-900 mb-2 font-outfit line-clamp-2">
                              {product.name}
                            </h4>
                            <p className="text-lg text-red-600 font-bold font-caveat mb-3">
                              ${product.price.toLocaleString()}
                            </p>
                            <button
                              onClick={() => handleAddToWishlist(product)}
                              className={`w-full px-3 py-2 text-xs font-medium rounded-[5px] transition-all duration-200 font-outfit mt-auto ${
                                isInWishlist(product._id)
                                  ? "border-red-300 text-red-600 bg-red-50"
                                  : "border border-zinc-300 text-zinc-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
                              }`}
                            >
                              {isInWishlist(product._id)
                                ? "In Wishlist"
                                : "Add to Wishlist"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-zinc-200 rounded-[5px] shadow-sm p-6 sticky top-24 order-summary">
                <h3 className="text-xl font-semibold text-zinc-900 mb-4 font-caveat">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm font-outfit">
                    <span className="text-zinc-600">
                      Subtotal ({getTotalItems()} items)
                    </span>
                    <span className="font-medium">
                      ${getTotalPrice().toLocaleString()}
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
                        `$${shippingCost.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-zinc-200 pt-3">
                    <div className="flex justify-between text-xl font-bold font-caveat">
                      <span>Total</span>
                      <span className="text-red-600">
                        ${total.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                {shippingCost === 0 && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-[2px] ">
                    <div className="flex items-center gap-2 text-green-700 text-sm font-outfit">
                      <AiOutlineGift className="w-5 h-5" />
                      <span>Free shipping on orders over $50!</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full px-6 py-3 bg-white text-green-600 border-2 border-green-600 font-medium hover:bg-green-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-[5px] font-outfit transform hover:scale-105 hover:shadow-sm"
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
                    href="/products"
                    className="text-sm text-zinc-600 hover:text-red-600 font-medium font-outfit transition-colors duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-zinc-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="text-xs text-zinc-500 font-outfit trust-badge">
                      <BiShield className="w-5 h-5 mx-auto mb-1 text-red-600" />
                      Secure Checkout
                    </div>
                    <div className="text-xs text-zinc-500 font-outfit trust-badge">
                      <AiOutlineTruck className="w-5 h-5 mx-auto mb-1 text-red-500" />
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
