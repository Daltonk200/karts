"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Professional Musician",
    rating: 5,
    comment:
      "The quality of guitars from Guitar & Strings Co is exceptional. I've been playing for 20 years and this is by far the best purchase I've made. The craftsmanship is outstanding!",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Music Teacher",
    rating: 5,
    comment:
      "As a music teacher, I need reliable instruments. Guitar & Strings Co never disappoints. The sound quality and playability are perfect for my students and myself.",
  },
  {
    id: 3,
    name: "Mike Davis",
    role: "Studio Guitarist",
    rating: 5,
    comment:
      "I use these guitars in my professional studio work. The tone is incredible and they record beautifully. Highly recommended for any serious musician.",
  },
  {
    id: 4,
    name: "Emily Wilson",
    role: "Singer-Songwriter",
    rating: 5,
    comment:
      "The acoustic guitars from Guitars & Strings Co are simply amazing. Perfect for songwriting and live performances. The customer service is also top-notch!",
  },
  {
    id: 5,
    name: "David Brown",
    role: "Guitar Enthusiast",
    rating: 5,
    comment:
      "I've been collecting guitars for years, and the vintage pieces from Guitar & Strings Co are some of my favorites. Authentic sound and beautiful condition.",
  },
  {
    id: 6,
    name: "Lisa Garcia",
    role: "Band Leader",
    rating: 5,
    comment:
      "Our band uses Guitar & Strings Co exclusively. The consistency in quality and tone across all our instruments is remarkable. Great investment!",
  },
  {
    id: 7,
    name: "Alex Thompson",
    role: "Guitar Instructor",
    rating: 5,
    comment:
      "I've been teaching guitar for 15 years and always recommend Guitar & Strings Co to my students. The instruments are reliable, well-crafted, and perfect for learning.",
  },
  {
    id: 8,
    name: "Maria Rodriguez",
    role: "Jazz Guitarist",
    rating: 5,
    comment:
      "The jazz guitars from this store are incredible. The warm tone and smooth playability make every performance special. I couldn't be happier with my purchase.",
  },
  {
    id: 9,
    name: "Chris Anderson",
    role: "Rock Band Guitarist",
    rating: 5,
    comment:
      "Our band upgraded all our guitars through Guitar & Strings Co. The difference in sound quality is night and day. The staff really knows their instruments!",
  },
  {
    id: 10,
    name: "Jennifer Lee",
    role: "Classical Guitarist",
    rating: 5,
    comment:
      "The classical guitars here are exceptional. Perfect for both practice and performance. The attention to detail in craftsmanship is remarkable.",
  },
  {
    id: 11,
    name: "Robert Wilson",
    role: "Blues Musician",
    rating: 5,
    comment:
      "I found my perfect blues guitar here. The vintage models have that authentic sound I've been looking for. Highly recommend for blues enthusiasts!",
  },
  {
    id: 12,
    name: "Amanda Foster",
    role: "Folk Singer",
    rating: 5,
    comment:
      "The acoustic guitars are perfect for folk music. Great projection and beautiful tone. The customer service made the whole experience wonderful.",
  },
];

export default function Testimonials() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 5,
    comment: "",
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Thank you for your review.."
    );
    setFormData({ name: "", role: "", rating: 5, comment: "" });
    setShowReviewForm(false);
  };

  return (
    <section className="py-16 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what musicians and guitar
            enthusiasts have to say about their experience with Guitar & Strings
            Co.
          </p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="mt-6 bg-zinc-900 text-white px-6 py-3 font-medium hover:bg-zinc-800 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {showReviewForm && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-zinc-900">
                  Write a Review
                </h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-zinc-500 hover:text-zinc-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Role/Occupation
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className={`text-2xl ${
                          star <= formData.rating
                            ? "text-yellow-400"
                            : "text-zinc-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-900 resize-none"
                    placeholder="Share your experience with our guitars..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 px-4 py-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-800"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-6 border border-zinc-200 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-zinc-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-600 mb-6 italic flex-grow">
                    "{testimonial.comment}"
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-zinc-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonials-swiper {
          padding-bottom: 60px;
        }

        .testimonials-swiper .swiper-slide {
          height: auto;
        }

        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          width: 48px;
          height: 48px;
          background: white;
          border: 1px solid #d4d4d8;
          border-radius: 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .testimonials-swiper .swiper-button-next:hover,
        .testimonials-swiper .swiper-button-prev:hover {
          background: #fafafa;
          border-color: #a1a1aa;
          transform: scale(1.05);
        }

        .testimonials-swiper .swiper-button-next::after,
        .testimonials-swiper .swiper-button-prev::after {
          font-size: 18px;
          color: #52525b;
          font-weight: bold;
        }

        .testimonials-swiper .swiper-pagination {
          bottom: 0;
        }

        .testimonials-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d4d4d8;
          opacity: 1;
          transition: all 0.2s ease;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #52525b;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            display: flex !important;
            width: 40px;
            height: 40px;
          }

          .testimonials-swiper .swiper-button-next::after,
          .testimonials-swiper .swiper-button-prev::after {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
