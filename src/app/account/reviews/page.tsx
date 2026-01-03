"use client";

import { useState, useEffect } from "react";
import UserDashboardLayout from "@/components/user/UserDashboardLayout";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";

interface Review {
  _id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    rating: 0,
    review: "",
  });

  useEffect(() => {
    fetchReviewsAndProducts();
  }, []);

  const fetchReviewsAndProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth_token");
      const userDataStr = localStorage.getItem("user_data");
      const userData = userDataStr ? JSON.parse(userDataStr) : null;

      if (!token || !userData) {
        setLoading(false);
        return;
      }

      // TODO: When reviews API is available, fetch user's reviews
      // For now, set empty arrays
      setReviews([]);
      
      // Fetch products for reviewing
      const productsResponse = await fetch("/api/products?limit=20");
      const productsData = await productsResponse.json();
      
      if (productsResponse.ok) {
        const products = (productsData.products || []).map((p: any) => ({
          _id: p._id,
          name: p.name,
          image: p.images?.[0] || p.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
          price: p.price,
        }));
        setProducts(products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching reviews and products:", error);
      setReviews([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;
    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newReview: Review = {
      _id: Date.now().toString(),
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      rating: formData.rating,
      review: formData.review,
      createdAt: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    setProducts(products.filter(p => p._id !== selectedProduct._id));
    setShowReviewForm(false);
    setSelectedProduct(null);
    setFormData({ rating: 0, review: "" });
    toast.success("Review submitted successfully!");
  };

  const handleDeleteReview = async (reviewId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setReviews(reviews.filter(r => r._id !== reviewId));
    toast.success("Review deleted successfully");
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={() => interactive && onStarClick?.(star)}
            className={interactive ? "cursor-pointer hover:scale-125 transition-transform" : ""}
            disabled={!interactive}
          >
            <FaStar
              className={`w-5 h-5 ${
                star <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
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

  return (
    <UserDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
            <p className="mt-2 text-gray-600">
              Share your experience and help other customers make informed decisions.
            </p>
          </div>
        </div>

        {/* Products Pending Review */}
        {products.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Products Pending Review ({products.length})
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">${product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowReviewForm(true);
                      }}
                      className="mt-4 w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Write Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Review Form Modal */}
        {showReviewForm && selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 bg-black opacity-30"
                onClick={() => {
                  setShowReviewForm(false);
                  setSelectedProduct(null);
                  setFormData({ rating: 0, review: "" });
                }}
              ></div>
              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Write a Review
                </h2>
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${selectedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    {renderStars(formData.rating, true, (rating) =>
                      setFormData({ ...formData, rating })
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={formData.review}
                      onChange={(e) =>
                        setFormData({ ...formData, review: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Share your experience with this product..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setSelectedProduct(null);
                        setFormData({ rating: 0, review: "" });
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* My Reviews */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              My Reviews ({reviews.length})
            </h2>
          </div>
          {reviews.length === 0 ? (
            <div className="p-12 text-center">
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
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start reviewing products you've purchased.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reviews.map((review) => (
                <div key={review._id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <Link href={`/products/${review.productId}`}>
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={review.productImage}
                          alt={review.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/products/${review.productId}`}
                            className="text-lg font-semibold text-gray-900 hover:text-red-600"
                          >
                            {review.productName}
                          </Link>
                          <div className="mt-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="mt-2 text-gray-600">{review.review}</p>
                          <p className="mt-2 text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserDashboardLayout>
  );
}

