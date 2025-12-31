"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Container from "@/components/Container";
import toast from "react-hot-toast";

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Professional Racer",
    rating: 5,
    comment:
      "The performance of the Apex Pro Kart is unmatched. I've been racing for 10 years and this is the best chassis I've ever driven. Precision and speed at its finest!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Karting Enthusiast",
    rating: 5,
    comment:
      "Found exactly what I needed at Apex Rush. Their maintenance service is top-notch, and my kart has never run better. Highly recommend for any track day regular.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Mike Davis",
    role: "Track Manager",
    rating: 5,
    comment:
      "We rely on Apex Rush for our fleet parts. Their reliability and expert knowledge make them the best partner for any racing facility.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Emily Wilson",
    role: "Junior League Parent",
    rating: 5,
    comment:
      "The Youth series karts are perfect for my kids. Safe, reliable, and incredibly fun. The team helped us find the perfect fit and safety gear.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "David Brown",
    role: "Electric Kart Racer",
    rating: 5,
    comment:
      "The instant torque on the Velocity Electric Kart is insane! Perfect for indoor tracks. Apex Rush is definitely leading the way in electric racing.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Lisa Garcia",
    role: "Weekend Warrior",
    rating: 5,
    comment:
      "I love my recreational kart from Apex. It's the highlight of our family weekends. Great build quality and easy to maintain.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
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
    toast.success("Thank you for your review! We appreciate your feedback.");
    setFormData({ name: "", role: "", rating: 5, comment: "" });
    setShowReviewForm(false);
  };

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 font-caveat">
            What Our Racers Say
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-outfit">
            Hear from the drivers and enthusiasts who trust Apex Rush Karts
            for their ultimate racing experience.
          </p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="mt-6 inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 rounded-[5px] font-outfit"
          >
            Write a Review
          </button>
        </div>

        {showReviewForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 max-w-md w-full rounded-[5px] shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-zinc-900 font-caveat">
                  Write a Review
                </h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-zinc-500 hover:text-zinc-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1 font-outfit">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-[5px] font-outfit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1 font-outfit">
                    Role/Occupation
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-[5px] font-outfit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1 font-outfit">
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
                        className={`text-2xl transition-transform hover:scale-110 ${
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
                  <label className="block text-sm font-medium text-zinc-700 mb-1 font-outfit">
                    Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-[5px] resize-none font-outfit"
                    placeholder="Share your experience with our karts and services..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 px-4 py-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-50 rounded-[5px] transition-colors font-outfit"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-[5px] transition-colors font-outfit"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
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
              <div className="bg-white p-6 border border-zinc-200 rounded-[5px] h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex-1">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
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

                  {/* Comment */}
                  <p className="text-zinc-600 mb-6 italic flex-grow font-outfit leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
                  <div className="w-12 h-12 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 font-outfit">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-zinc-500 font-outfit">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

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
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .testimonials-swiper .swiper-button-next:hover,
        .testimonials-swiper .swiper-button-prev:hover {
          background: #fafafa;
          border-color: #dc2626;
          transform: scale(1.05);
        }

        .testimonials-swiper .swiper-button-next::after,
        .testimonials-swiper .swiper-button-prev::after {
          font-size: 18px;
          color: #dc2626;
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
          background: #dc2626;
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


