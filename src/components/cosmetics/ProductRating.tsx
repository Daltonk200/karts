"use client";

import { useState, useEffect } from "react";
import { Star, StarIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Rating {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface ProductRatingProps {
  productId: string;
  currentRating: number;
  reviewCount: number;
}

export default function ProductRating({
  productId,
  currentRating,
  reviewCount,
}: ProductRatingProps) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    rating: 0,
    review: "",
  });

  // Fetch ratings
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/ratings`);
        if (response.ok) {
          const data = await response.json();
          setRatings(data.ratings);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [productId]);

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userName || !formData.userEmail || formData.rating === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/products/${productId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: `user_${Date.now()}`, // Simple user ID for demo
          userName: formData.userName,
          userEmail: formData.userEmail,
          rating: formData.rating,
          review: formData.review,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRatings([data.rating, ...ratings]);
        setFormData({ userName: "", userEmail: "", rating: 0, review: "" });
        setShowForm(false);
        toast.success("Rating submitted successfully!");
        // Refresh the page to update the product's average rating
        window.location.reload();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to submit rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onStarClick?: (rating: number) => void
  ) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onStarClick?.(star)}
            className={`${
              interactive
                ? "cursor-pointer hover:scale-125 transition-all duration-200"
                : "cursor-default"
            }`}
            disabled={!interactive}
          >
            <Star
              className={`${interactive ? "w-8 h-8" : "w-5 h-5"} ${
                star <= rating
                  ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
                  : interactive
                  ? "text-gray-300 hover:text-yellow-300"
                  : "text-gray-300"
              } transition-colors duration-200`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <svg
            className="w-6 h-6 mr-3 text-rose-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Customer Reviews
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-rose-600 mb-2">
                {currentRating}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(currentRating)}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-sm text-gray-600 mb-2">
                Rating Distribution
              </div>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-3">{star}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              className="w-4 h-4 mr-2 inline"
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
            Write a Review
          </button>
        </div>
      </div>

      {/* Rating Form */}
      {showForm && (
        <div className="bg-white border-2 border-rose-100 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-rose-600"
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
            </div>
            <h4 className="text-xl font-bold text-gray-900">
              Share Your Experience
            </h4>
          </div>

          <form onSubmit={handleRatingSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, userEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How would you rate this product? *
              </label>
              <div className="flex items-center space-x-2">
                {renderStars(formData.rating, true, (rating) =>
                  setFormData({ ...formData, rating })
                )}
                <span className="ml-3 text-sm text-gray-600">
                  {formData.rating > 0 && (
                    <>
                      {formData.rating === 1 && "Poor"}
                      {formData.rating === 2 && "Fair"}
                      {formData.rating === 3 && "Good"}
                      {formData.rating === 4 && "Very Good"}
                      {formData.rating === 5 && "Excellent"}
                    </>
                  )}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Review (Optional)
              </label>
              <textarea
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 resize-none"
                placeholder="Tell others about your experience with this product. What did you like? What could be improved?"
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.review.length}/1000 characters
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews Carousel */}
      {ratings.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold text-gray-900 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-rose-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              Customer Reviews ({ratings.length})
            </h4>
            <div className="text-sm text-gray-500">Swipe to see more</div>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-custom",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="reviews-swiper"
            >
              {ratings.map((rating) => (
                <SwiperSlide key={rating._id}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-rose-600 font-bold text-lg">
                            {rating.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">
                            {rating.userName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {new Date(rating.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderStars(rating.rating)}
                        <span className="text-sm text-gray-600 font-medium ml-2">
                          {rating.rating}/5
                        </span>
                      </div>
                    </div>

                    {rating.review && (
                      <div className="bg-gray-50 rounded-sm p-4 border-l-4 border-rose-200 mb-4">
                        <p className="text-gray-700 leading-relaxed line-clamp-4">
                          {rating.review}
                        </p>
                      </div>
                    )}

                    {/* Verified Purchase Badge */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified Review
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-rose-600 transition-colors">
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
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-rose-600 transition-colors">
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
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-rose-50 hover:border-rose-300 transition-all duration-200">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-rose-50 hover:border-rose-300 transition-all duration-200">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Custom Pagination */}
            <div className="swiper-pagination-custom flex justify-center mt-6 space-x-2"></div>
          </div>
        </div>
      )}
    </div>
  );
}
