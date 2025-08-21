"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineMessage,
} from "react-icons/ai";

export default function BookAppointmentPage() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  });

  // Get service from URL parameter and set it in form
  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      setFormData((prev) => ({
        ...prev,
        service: serviceFromUrl,
      }));
    }
  }, [searchParams]);

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success(
      "Appointment booked successfully! We'll confirm via email shortly."
    );
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      message: "",
    });
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.date &&
    formData.time &&
    formData.service;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://img.freepik.com/red-pen-is-calendar-that-says-date_1000124-259178.jpg?W=2000"
            alt="Beauty consultation background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/60 to-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-caveat font-bold mb-6">
              Book Your Beauty Consultation
            </h1>
            <p className="text-xl md:text-2xl font-outfit text-white max-w-3xl mx-auto">
              Schedule a personalized appointment with our beauty experts for
              professional consultation and tailored recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Booking Form */}
          <div className="bg-white rounded-[15px] shadow-xl p-8 border border-rose-100">
            <div className="mb-8">
              <h2 className="text-3xl font-caveat font-bold text-zinc-900 mb-4">
                Schedule Your Session
              </h2>
              <p className="text-zinc-600 font-outfit">
                Choose your preferred service and time slot. Our experts will
                help you discover your perfect beauty routine.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                    <AiOutlineUser className="inline w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                    <AiOutlinePhone className="inline w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                  <AiOutlineMail className="inline w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Service Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                  What service do you need?
                </label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                  placeholder="e.g., Skincare consultation, Makeup lesson, Product recommendations..."
                  required
                />
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                    <AiOutlineCalendar className="inline w-4 h-4 mr-2" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                    <AiOutlineClockCircle className="inline w-4 h-4 mr-2" />
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                  <AiOutlineMessage className="inline w-4 h-4 mr-2" />
                  Special Requests or Concerns
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit resize-none"
                  placeholder="Tell us about your skin concerns, makeup preferences, or any specific questions..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 px-6 rounded-[8px] font-semibold font-outfit text-lg transition-all duration-300 transform hover:scale-105 ${
                  isFormValid && !isSubmitting
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
                    : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Booking Appointment...
                  </div>
                ) : (
                  "Book Your Consultation"
                )}
              </button>
            </form>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-8">
            {/* Why Choose Us */}
            <div className="bg-white rounded-[15px] shadow-xl p-8 border border-rose-100">
              <h3 className="text-2xl font-caveat font-bold text-zinc-900 mb-6">
                Why Choose GlowBeauty?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-zinc-700 font-outfit">
                    Expert beauty consultants with 10+ years experience
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-zinc-700 font-outfit">
                    Personalized recommendations for your unique needs
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-zinc-700 font-outfit">
                    Premium product selection from top beauty brands
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-zinc-700 font-outfit">
                    Follow-up support and ongoing beauty guidance
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-[15px] shadow-xl p-8 border border-rose-100">
              <h3 className="text-2xl font-caveat font-bold text-zinc-900 mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <AiOutlinePhone className="w-5 h-5 text-rose-600" />
                  <span className="text-zinc-700 font-outfit">
                    +237 XXX XXX XXX
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <AiOutlineMail className="w-5 h-5 text-rose-600" />
                  <span className="text-zinc-700 font-outfit">
                    consultation@glowbeauty.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <AiOutlineClockCircle className="w-5 h-5 text-rose-600" />
                  <span className="text-zinc-700 font-outfit">
                    Mon-Sat: 9:00 AM - 6:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-caveat font-bold mb-4">
            Ready to Shop Our Products?
          </h2>
          <p className="text-xl font-outfit text-rose-100 mb-8 max-w-2xl mx-auto">
            While you wait for your consultation, explore our premium collection
            of skincare, makeup, and fragrance products.
          </p>
          <button
            onClick={() => (window.location.href = "/cosmetics")}
            className="bg-white text-rose-600 px-8 py-4 rounded-[8px] font-semibold font-outfit text-lg hover:bg-rose-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Products
          </button>
        </div>
      </div>
    </div>
  );
}
