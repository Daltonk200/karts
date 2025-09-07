"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

interface UserBooking {
  bookingNumber: string;
  serviceName: string;
  date: string;
  time: string;
  createdAt: string;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load bookings from localStorage
    const userBookings = JSON.parse(
      localStorage.getItem("userBookings") || "[]"
    );
    setBookings(userBookings);
    setLoading(false);
  }, []);

  const clearBookings = () => {
    localStorage.removeItem("userBookings");
    setBookings([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-zinc-900 mb-4 font-caveat">
              My Bookings
            </h1>
            <p className="text-lg text-zinc-600 font-outfit">
              Keep track of all your beauty appointments
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-rose-600"
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
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                No bookings yet
              </h3>
              <p className="text-zinc-600 mb-6">
                Book your first appointment to see it here
              </p>
              <Button asChild className="bg-rose-600 hover:bg-rose-700">
                <a href="/book-appointment">Book Appointment</a>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-zinc-600">
                  You have {bookings.length} booking
                  {bookings.length !== 1 ? "s" : ""}
                </p>
                <Button
                  variant="outline"
                  onClick={clearBookings}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {bookings.map((booking, index) => (
                  <div
                    key={index}
                    className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-rose-100 text-rose-800 text-sm font-medium rounded-full">
                            {booking.bookingNumber}
                          </span>
                          <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm font-medium rounded-full">
                            {booking.serviceName}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-zinc-500">Date:</span>
                            <p className="font-medium text-zinc-900">
                              {formatDate(booking.date)}
                            </p>
                          </div>
                          <div>
                            <span className="text-zinc-500">Time:</span>
                            <p className="font-medium text-zinc-900">
                              {formatTime(booking.time)}
                            </p>
                          </div>
                          <div>
                            <span className="text-zinc-500">Booked:</span>
                            <p className="font-medium text-zinc-900">
                              {formatDate(booking.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              booking.bookingNumber
                            );
                            // You could add a toast notification here
                          }}
                        >
                          Copy Booking Number
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
