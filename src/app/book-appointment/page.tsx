"use client";

import { useState, useEffect, Suspense } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineMessage,
} from "react-icons/ai";
// import { services, getServiceTitleById } from "@/data/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  image: string;
  isActive: boolean;
  isFeatured: boolean;
}

function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [urlServiceId, setUrlServiceId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // Fetch services and handle URL parameters
  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");

    const initializeServices = async () => {
      await fetchServices();
      // Set the service after services are loaded
      if (serviceFromUrl) {
        console.log("Setting service from URL:", serviceFromUrl);
        setUrlServiceId(serviceFromUrl);
      }
    };

    initializeServices();
  }, [searchParams]);

  // Set service from URL when both services and urlServiceId are available
  useEffect(() => {
    if (urlServiceId && services.length > 0) {
      console.log("Setting service in formData:", urlServiceId);
      setFormData((prev) => ({
        ...prev,
        service: urlServiceId,
      }));
    }
  }, [urlServiceId, services]);

  // Debug formData changes
  useEffect(() => {
    console.log("formData.service changed to:", formData.service);
  }, [formData.service]);

  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      const response = await fetch("/api/services?isActive=true&limit=50");
      const data = await response.json();

      if (response.ok) {
        console.log("Services loaded:", data.services?.length);
        console.log(
          "Service IDs:",
          data.services?.map((s: Service) => s._id)
        );
        setServices(data.services || []);
      } else {
        console.error("Failed to fetch services:", data);
        toast.error("Failed to load services. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services. Please try again.");
    } finally {
      setServicesLoading(false);
    }
  };

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

    try {
      // Find the selected service to get its details
      const selectedService = services.find(
        (service) => service._id === formData.service
      );

      if (!selectedService) {
        toast.error("Please select a valid service.");
        setIsSubmitting(false);
        return;
      }

      // Prepare booking data
      const bookingData = {
        customer: {
          firstName: formData.name.split(" ")[0] || formData.name,
          lastName: formData.name.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          phone: formData.phone,
        },
        service: {
          serviceId: selectedService._id,
          serviceName: selectedService.name,
          servicePrice: selectedService.price,
          serviceDuration: selectedService.duration,
        },
        appointment: {
          date: formData.date,
          time: formData.time,
          duration: selectedService.duration,
        },
        status: "pending",
        notes: formData.message,
        totalAmount: selectedService.price,
        paymentStatus: "pending",
        paymentMethod: "cash", // Default to cash, can be updated later
      };

      console.log("Sending booking data:", bookingData);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      console.log("Booking response:", response.status, data);

      if (response.ok) {
        const bookingNumber = data.booking?.bookingNumber || "N/A";

        // Store booking number in localStorage for user reference
        const userBookings = JSON.parse(
          localStorage.getItem("userBookings") || "[]"
        );
        userBookings.push({
          bookingNumber,
          serviceName: selectedService.name,
          date: formData.date,
          time: formData.time,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem("userBookings", JSON.stringify(userBookings));

        toast.success(
          `Appointment booked successfully! Your booking number is ${bookingNumber}. We'll confirm via email shortly.`
        );

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
        setSelectedDate(undefined);
      } else {
        console.error("Booking failed:", data);
        toast.error(
          data.message ||
            data.error ||
            "Failed to book appointment. Please try again."
        );
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    selectedDate &&
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

            {/* Selected Service Display */}
            {formData.service && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg">
                <h3 className="text-sm font-medium text-rose-800 mb-2 font-outfit">
                  Selected Service:
                </h3>
                <p className="text-rose-700 font-outfit">
                  {services.find((s) => s._id === formData.service)?.name ||
                    "Service not found"}
                </p>
                {services.find((s) => s._id === formData.service) && (
                  <p className="text-rose-600 text-sm font-outfit mt-1">
                    XAF{" "}
                    {services
                      .find((s) => s._id === formData.service)
                      ?.price.toLocaleString()}{" "}
                    -{" "}
                    {services.find((s) => s._id === formData.service)?.duration}{" "}
                    minutes
                  </p>
                )}
              </div>
            )}

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

              {/* Service Selection */}
              <div>
                <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                  What service do you need?
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service: value })
                  }
                >
                  <SelectTrigger className="w-full !py-6 font-outfit">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicesLoading ? (
                      <SelectItem value="all" disabled>
                        Loading services...
                      </SelectItem>
                    ) : services.length > 0 ? (
                      services.map((service) => (
                        <SelectItem key={service._id} value={service._id}>
                          {service.name} - XAF {service.price.toLocaleString()}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        No services available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                    <AiOutlineCalendar className="inline w-4 h-4 mr-2" />
                    Preferred Date
                  </Label>
                  <Popover
                    open={datePickerOpen}
                    onOpenChange={setDatePickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between font-normal font-outfit h-12 px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200"
                      >
                        {selectedDate
                          ? selectedDate.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setFormData({
                            ...formData,
                            date: date ? date.toISOString().split("T")[0] : "",
                          });
                          setDatePickerOpen(false);
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-zinc-700 mb-2 font-outfit">
                    <AiOutlineClockCircle className="inline w-4 h-4 mr-2" />
                    Preferred Time
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) =>
                      setFormData({ ...formData, time: value })
                    }
                  >
                    <SelectTrigger className="w-full !py-6 font-outfit">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

      {/* My Bookings Section */}
      <div className="bg-zinc-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-caveat font-bold mb-4 text-zinc-900">
            Track Your Appointments
          </h2>
          <p className="text-xl font-outfit text-zinc-600 mb-8 max-w-2xl mx-auto">
            View all your booking history and keep track of your upcoming
            appointments.
          </p>
          <button
            onClick={() => (window.location.href = "/my-bookings")}
            className="bg-rose-600 cursor-pointer text-white px-8 py-4 rounded-[8px] font-semibold font-outfit text-lg hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View My Bookings
          </button>
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

export default function BookAppointmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-600 font-outfit">Loading booking form...</p>
          </div>
        </div>
      }
    >
      <BookAppointmentForm />
    </Suspense>
  );
}
