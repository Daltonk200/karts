"use client";

import Container from "@/components/Container";
import Image from "next/image";

export default function ShippingPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-zinc-900 text-white py-20">
        <Image
          src="https://images.pexels.com/photos/4506249/pexels-photo-4506249.jpeg"
          alt="Shipping & Delivery"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shipping & Delivery
              </h1>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                Fast, secure, and reliable shipping to get your guitar to you
                safely
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="py-16">
          {/* Shipping Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Shipping Options
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold mb-3">
                  Standard Shipping
                </h3>
                <p className="text-zinc-600 mb-4">5-7 business days delivery</p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Free on orders over $500</li>
                  <li>• $25 for orders under $500</li>
                  <li>• Tracking included</li>
                  <li>• Signature required</li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Express Shipping</h3>
                <p className="text-zinc-600 mb-4">2-3 business days delivery</p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• $45 flat rate</li>
                  <li>• Priority handling</li>
                  <li>• Real-time tracking</li>
                  <li>• Signature required</li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">
                  Overnight Shipping
                </h3>
                <p className="text-zinc-600 mb-4">Next business day delivery</p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• $75 flat rate</li>
                  <li>• Premium handling</li>
                  <li>• Live tracking updates</li>
                  <li>• Signature required</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Our Shipping Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Order Processing</h3>
                <p className="text-zinc-600 text-sm">
                  Orders are processed within 24 hours of placement
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Check</h3>
                <p className="text-zinc-600 text-sm">
                  Each guitar undergoes final inspection before shipping
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Packaging</h3>
                <p className="text-zinc-600 text-sm">
                  Professional packaging ensures safe delivery
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Delivery</h3>
                <p className="text-zinc-600 text-sm">
                  Your guitar arrives safely at your doorstep
                </p>
              </div>
            </div>
          </div>

          {/* Packaging Information */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Professional Packaging
            </h2>
            <div className="bg-zinc-50 p-8 ">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    How We Protect Your Guitar
                  </h3>
                  <ul className="space-y-3 text-zinc-700">
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>
                        Hard-shell case or gig bag included with every guitar
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Custom foam padding for extra protection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>
                        Climate-controlled packaging to prevent damage
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Double-boxed for maximum security</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Fragile handling instructions clearly marked</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-zinc-600">
                    Your guitar is our priority - we treat every instrument with
                    the care it deserves
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Areas */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Delivery Areas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-xl font-semibold mb-4">
                  Domestic Shipping
                </h3>
                <p className="text-zinc-600 mb-4">
                  We ship to all 50 states in the United States
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Continental US: All shipping options available</li>
                  <li>• Alaska & Hawaii: Standard shipping only</li>
                  <li>• Additional fees may apply for remote areas</li>
                  <li>• Delivery times may vary by location</li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-xl font-semibold mb-4">
                  International Shipping
                </h3>
                <p className="text-zinc-600 mb-4">
                  Currently available to select countries
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Canada: Standard shipping available</li>
                  <li>• Mexico: Standard shipping available</li>
                  <li>• Additional customs fees may apply</li>
                  <li>• Contact us for other countries</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tracking & Support */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Tracking & Support
            </h2>
            <div className="bg-zinc-900 text-white p-8  text-center">
              <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Track your order in real-time and get notifications at every
                step of the delivery process
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl mb-2">📱</div>
                  <h4 className="font-semibold mb-2">Email Updates</h4>
                  <p className="text-sm text-zinc-300">
                    Receive detailed tracking information via email
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🔍</div>
                  <h4 className="font-semibold mb-2">Online Tracking</h4>
                  <p className="text-sm text-zinc-300">
                    Track your order on our website or carrier's site
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📞</div>
                  <h4 className="font-semibold mb-2">Customer Support</h4>
                  <p className="text-sm text-zinc-300">
                    24/7 support for any shipping questions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  When will my order ship?
                </h3>
                <p className="text-zinc-600">
                  Most orders ship within 24 hours of placement. You'll receive
                  a shipping confirmation email with tracking information.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Do you ship internationally?
                </h3>
                <p className="text-zinc-600">
                  Yes, we currently ship to Canada and Mexico. Additional
                  customs fees and longer delivery times may apply.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  What if my guitar arrives damaged?
                </h3>
                <p className="text-zinc-600">
                  While rare, if damage occurs during shipping, please contact
                  us immediately. We'll work with the carrier to resolve the
                  issue.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Can I change my shipping address?
                </h3>
                <p className="text-zinc-600">
                  Address changes can be made within 2 hours of order placement.
                  Contact our customer service team for assistance.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Is signature required for delivery?
                </h3>
                <p className="text-zinc-600">
                  Yes, all guitar deliveries require a signature to ensure safe
                  receipt of your valuable instrument.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
