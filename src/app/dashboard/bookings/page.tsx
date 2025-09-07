"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface Booking {
  _id: string;
  bookingNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  service: {
    serviceName: string;
    servicePrice: number;
    serviceDuration: number;
  };
  appointment: {
    date: string;
    time: string;
    duration: number;
  };
  status: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState<{
    from: string;
    to: string;
  }>({ from: "", to: "" });
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const statuses = [
    "All",
    "pending",
    "confirmed",
    "in-progress",
    "completed",
    "cancelled",
    "no-show",
  ];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    "in-progress": "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    "no-show": "bg-gray-100 text-gray-800",
  };

  const paymentStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    refunded: "bg-red-100 text-red-800",
    partial: "bg-orange-100 text-orange-800",
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, searchQuery, selectedStatus, selectedDateRange, sortBy]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("dashboard_token");
      const headers: HeadersInit = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        sortBy,
        sortOrder: "desc",
      });

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      if (selectedStatus !== "All") {
        params.append("status", selectedStatus);
      }

      if (selectedDateRange.from) {
        params.append("dateFrom", selectedDateRange.from);
      }
      if (selectedDateRange.to) {
        params.append("dateTo", selectedDateRange.to);
      }

      const response = await fetch(`/api/bookings?${params}`, { headers });
      const data = await response.json();

      if (response.ok) {
        setBookings(data.bookings || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      setUpdatingId(bookingId);
      const token = localStorage.getItem("dashboard_token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Booking status updated successfully");
        fetchBookings();
      } else {
        toast.error("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking status");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600">
            Manage customer appointments and bookings
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Bookings
              </label>
              <input
                type="text"
                placeholder="Search by name, email, booking number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full py-5 !shadow-none">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "All"
                        ? "All Statuses"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <DateRangePicker
                value={selectedDateRange}
                onChange={setSelectedDateRange}
                placeholder="Select date range"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full py-5 !shadow-none">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Date Created</SelectItem>
                  <SelectItem value="appointment.date">
                    Appointment Date
                  </SelectItem>
                  <SelectItem value="customer.firstName">
                    Customer Name
                  </SelectItem>
                  <SelectItem value="totalAmount">Total Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("All");
                  setSelectedDateRange({ from: "", to: "" });
                  setSortBy("createdAt");
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : bookings.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Appointment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.bookingNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(booking.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.customer.firstName}{" "}
                              {booking.customer.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.customer.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.service.serviceName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.service.serviceDuration} min
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(booking.appointment.date)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatTime(booking.appointment.time)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[
                                booking.status as keyof typeof statusColors
                              ] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                paymentStatusColors[
                                  booking.paymentStatus as keyof typeof paymentStatusColors
                                ] || "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {booking.paymentStatus.charAt(0).toUpperCase() +
                                booking.paymentStatus.slice(1)}
                            </span>
                            <div className="text-sm text-gray-900 mt-1">
                              XAF {booking.totalAmount.toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Select
                              value={booking.status}
                              onValueChange={(value) =>
                                updateBookingStatus(booking._id, value)
                              }
                              disabled={updatingId === booking._id}
                            >
                              <SelectTrigger className="w-32 h-7 text-xs px-2 py-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                  Confirmed
                                </SelectItem>
                                <SelectItem value="in-progress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
                                <SelectItem value="no-show">No Show</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2  font-medium text-gray-900 text-lg">
              No bookings found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ||
              selectedStatus !== "All" ||
              selectedDateRange.from ||
              selectedDateRange.to
                ? "Try adjusting your search or filter criteria."
                : "No bookings have been made yet."}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
