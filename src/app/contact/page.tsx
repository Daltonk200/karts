"use client";

import { useState } from "react";
import Container from "@/components/Container";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: serviceId ? "appointment" : "",
    message: serviceId ? `I am interested in the service with ID: ${serviceId}` : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          data.message ||
          "Thank you for your message! We'll get back to you soon."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative bg-black border-b border-zinc-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516209503378-2c2ea5579295?w=2000"
            alt="Contact Apex Rush Karts"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-zinc-900/40"></div>
        </div>

        <Container className="py-16 md:py-20 lg:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-outfit mb-8 max-w-3xl mx-auto">
              Have questions about our karts, parts, or services? Looking for
              custom modifications? We'd love to hear from you and help you
              get on the track.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 !h-fit lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white   rounded-xl shadow-sm p-6 border border-zinc-200 flex flex-col h-fit">
              <div className="flex-1">
                <div>
                  <h2 className="text-3xl font-caveat font-bold text-zinc-900 mb-6">
                    Send us a Message
                  </h2>
                  <p className="text-zinc-600 font-outfit mb-6">
                    We're here to help you with all your racing needs. Send us a
                    message and we'll get back to you within 24 hours.
                  </p>

                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-zinc-700 mb-1.5 font-outfit"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-700 mb-1.5 font-outfit"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-zinc-700 mb-1.5 font-outfit"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit"
                        placeholder="+237 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-zinc-700 mb-1.5 font-outfit"
                      >
                        Subject *
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }
                      >
                        <SelectTrigger className="w-full !py-6 font-outfit">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="product">
                            Product Information
                          </SelectItem>
                          <SelectItem value="service">
                            Kart Services
                          </SelectItem>
                          <SelectItem value="appointment">
                            Service Inquiry
                          </SelectItem>
                          <SelectItem value="order">Order Status</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-zinc-700 mb-1.5 font-outfit"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-200 font-outfit resize-none"
                      placeholder="Tell us about your kart needs, product questions, or how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-[8px] font-semibold font-outfit text-lg transition-all duration-300 transform hover:scale-[1.02] ${!isSubmitting
                      ? "bg-gradient-to-r from-red-600 to-red-600 text-white hover:from-red-700 hover:to-red-700 shadow-lg hover:shadow-xl"
                      : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-zinc-200">
                <h2 className="text-3xl font-caveat font-bold text-zinc-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AiOutlineMail className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2 font-outfit">
                        Email Us
                      </h3>
                      <p className="text-zinc-600 font-outfit">
                        <Link
                          href="mailto:contact@glowbeauty.com"
                          className="hover:text-red-600 transition-colors"
                        >
                          contact@glowbeauty.com
                        </Link>
                      </p>
                      <p className="text-sm text-zinc-500 mt-1 font-outfit">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AiOutlinePhone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2 font-outfit">
                        Call Us
                      </h3>
                      <p className="text-zinc-600 font-outfit">
                        <Link
                          href="tel:+237XXXXXXXXX"
                          className="hover:text-red-600 transition-colors"
                        >
                          +237 XXX XXX XXX
                        </Link>
                      </p>
                      <p className="text-sm text-zinc-500 mt-1 font-outfit">
                        Available during business hours
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AiOutlineClockCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2 font-outfit">
                        Business Hours
                      </h3>
                      <p className="text-zinc-600 font-outfit">
                        Monday - Saturday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-sm text-zinc-500 mt-1 font-outfit">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AiOutlineEnvironment className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2 font-outfit">
                        Visit Us
                      </h3>
                      <p className="text-zinc-600 font-outfit">
                        123 Racing Circuit Rd
                        <br />
                        Douala, Cameroon
                      </p>
                      <p className="text-sm text-zinc-500 mt-1 font-outfit">
                        Free parking available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-zinc-200">
                <h3 className="text-2xl font-caveat font-bold text-zinc-900 mb-4">
                  Follow Us
                </h3>
                <p className="text-zinc-600 font-outfit mb-4">
                  Stay updated with our latest race results, product launches,
                  and track day events.
                </p>
                <div className="flex space-x-3">
                  <Link
                    href="https://instagram.com/glowbeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-zinc-100 border border-zinc-200 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                  >
                    <AiOutlineInstagram className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://facebook.com/glowbeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-zinc-100 border border-zinc-200 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                  >
                    <AiOutlineFacebook className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://twitter.com/glowbeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-zinc-100 border border-zinc-200 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                  >
                    <AiOutlineTwitter className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-600 py-16 md:py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 md:mb-6 font-caveat">
              Ready to Hit the Track?
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-10 text-white opacity-90 font-outfit">
              Contact our racing experts and get the best performance out of your kart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-red-600 font-medium py-3 px-6 md:px-8 rounded-lg hover:bg-zinc-100 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-sm md:text-base"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="border-2 border-white text-white font-medium py-3 px-6 md:px-8 rounded-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-[1.02] font-outfit text-sm md:text-base"
              >
                Home
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
