"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API delay for frontend-only mode
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setEmailSent(true);
      toast.success("Password reset link sent to your email!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with Glass Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80"
            alt="Racing Kart"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Glass Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-red-700/70 to-red-900/80 backdrop-blur-sm">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        {/* Content on Image */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <div className="max-w-md text-center space-y-6">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-4">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold font-caveat">
              Reset Your Password
            </h2>
            <p className="text-lg text-white/90 font-outfit">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <h1 className="text-3xl font-bold text-gray-900 font-caveat">
                  Apex Rush
                </h1>
              </Link>
              <h2 className="text-2xl font-semibold text-gray-900 mt-4">
                Forgot Password
              </h2>
              <p className="text-gray-600 mt-2 font-outfit">
                {emailSent
                  ? "Check your email for reset instructions"
                  : "Enter your email to receive a password reset link"}
              </p>
            </div>

            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2 font-outfit"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors font-outfit"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-outfit"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="inline-block p-4 bg-green-100 rounded-full">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Email Sent!
                  </h3>
                  <p className="text-gray-600 font-outfit">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-gray-500 mt-2 font-outfit">
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium font-outfit"
                >
                  Send to a different email
                </button>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-red-600 hover:text-red-700 font-outfit"
              >
                ← Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

