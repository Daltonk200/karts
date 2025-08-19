"use client";

import Container from "@/components/Container";
import Image from "next/image";

export default function ReturnsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-zinc-900 text-white py-20">
        <Image
          src="https://images.pexels.com/photos/6721922/pexels-photo-6721922.jpeg"
          alt="Returns & Exchanges"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Returns & Exchanges
              </h1>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                We want you to be completely satisfied with your guitar purchase
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="py-16">
          {/* Return Policy Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Our Return Policy
            </h2>
            <div className="bg-zinc-50 p-8 ">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    30-Day Return Window
                  </h3>
                  <p className="text-zinc-700 mb-4">
                    You have 30 days from the date of delivery to return your
                    guitar for a full refund or exchange. We understand that
                    finding the perfect guitar is a personal journey, and we're
                    here to help you find the right one.
                  </p>
                  <ul className="space-y-2 text-zinc-700">
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Full refund or exchange within 30 days</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Free return shipping for defective items</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Original packaging and accessories required</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Guitar must be in original condition</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">🔄</div>
                  <p className="text-zinc-600">
                    Your satisfaction is our top priority - we want you to love
                    your guitar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              How to Return Your Guitar
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p className="text-zinc-600 text-sm">
                  Email or call us to initiate your return within 30 days
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Return Label</h3>
                <p className="text-zinc-600 text-sm">
                  We'll provide a return shipping label and instructions
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Pack & Ship</h3>
                <p className="text-zinc-600 text-sm">
                  Securely pack your guitar and ship it back to us
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Refund/Exchange</h3>
                <p className="text-zinc-600 text-sm">
                  Receive your refund or exchange within 5-7 business days
                </p>
              </div>
            </div>
          </div>

          {/* Return Conditions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Return Conditions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-xl font-semibold mb-4 text-green-600">
                  ✅ Acceptable Returns
                </h3>
                <ul className="space-y-3 text-zinc-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Guitar in original condition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>All original packaging included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>All accessories and documentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>No signs of damage or wear</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Returned within 30 days</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-xl font-semibold mb-4 text-red-600">
                  ❌ Non-Returnable Items
                </h3>
                <ul className="space-y-3 text-zinc-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Damaged or modified guitars</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Missing packaging or accessories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Custom or personalized guitars</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Guitars with signs of use</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Returns after 30 days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Exchange Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Exchange Options
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-zinc-200 p-6  text-center">
                <div className="text-4xl mb-4">🎸</div>
                <h3 className="text-xl font-semibold mb-3">Different Guitar</h3>
                <p className="text-zinc-600 mb-4">
                  Exchange for any guitar of equal or greater value
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Pay difference if upgrading</li>
                  <li>• Receive refund if downgrading</li>
                  <li>• Free shipping on exchange</li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 p-6  text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-3">Different Color</h3>
                <p className="text-zinc-600 mb-4">
                  Exchange for the same model in a different finish
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Same model, different color</li>
                  <li>• No additional cost</li>
                  <li>• Subject to availability</li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 p-6  text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3">Full Refund</h3>
                <p className="text-zinc-600 mb-4">
                  Get your money back, no questions asked
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Full purchase price refund</li>
                  <li>• Original payment method</li>
                  <li>• Processed within 5-7 days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping Costs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Return Shipping Costs
            </h2>
            <div className="bg-zinc-50 p-8 ">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Free Returns</h3>
                  <ul className="space-y-3 text-zinc-700">
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Defective or damaged guitars</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Wrong item received</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Quality issues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Manufacturing defects</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Customer Pays</h3>
                  <ul className="space-y-3 text-zinc-700">
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Change of mind returns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Size or style preference</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Standard return shipping: $25</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Deducted from refund amount</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Refund Timeline
            </h2>
            <div className="bg-white border border-zinc-200 p-6 ">
              <div className="grid md:grid-cols-5 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    1-2
                  </div>
                  <h4 className="font-semibold mb-1">Days</h4>
                  <p className="text-xs text-zinc-600">Return received</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    1
                  </div>
                  <h4 className="font-semibold mb-1">Day</h4>
                  <p className="text-xs text-zinc-600">Inspection</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    1
                  </div>
                  <h4 className="font-semibold mb-1">Day</h4>
                  <p className="text-xs text-zinc-600">Processing</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    1-3
                  </div>
                  <h4 className="font-semibold mb-1">Days</h4>
                  <p className="text-xs text-zinc-600">Bank processing</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    ✓
                  </div>
                  <h4 className="font-semibold mb-1">Complete</h4>
                  <p className="text-xs text-zinc-600">Refund received</p>
                </div>
              </div>
              <p className="text-center text-zinc-600 mt-6">
                Total timeline: 5-7 business days from when we receive your
                return
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Need Help with Your Return?
            </h2>
            <div className="bg-zinc-900 text-white p-8  text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Contact Our Support Team
              </h3>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Our customer service team is here to help you with any questions
                about returns or exchanges
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl mb-2">📧</div>
                  <h4 className="font-semibold mb-2">Email Support</h4>
                  <p className="text-sm text-zinc-300">
                  contact@guitarstringsco.com
                  </p>
                </div>
                
                <div>
                  <div className="text-3xl mb-2">💬</div>
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm text-zinc-300">Available 24/7</p>
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
                  Can I return a guitar after 30 days?
                </h3>
                <p className="text-zinc-600">
                  Unfortunately, we cannot accept returns after 30 days.
                  However, if your guitar has a manufacturing defect, it may be
                  covered under warranty.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  What if I don't have the original packaging?
                </h3>
                <p className="text-zinc-600">
                  Original packaging is required for returns. If you don't have
                  it, we may not be able to accept the return or may charge a
                  restocking fee.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  How long does it take to get my refund?
                </h3>
                <p className="text-zinc-600">
                  Refunds are typically processed within 5-7 business days after
                  we receive and inspect your return. Bank processing times may
                  vary.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Can I exchange for a different brand?
                </h3>
                <p className="text-zinc-600">
                  Yes, you can exchange for any guitar we carry, regardless of
                  brand. You'll pay the difference if upgrading or receive a
                  refund if downgrading.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  What if my guitar arrives damaged?
                </h3>
                <p className="text-zinc-600">
                  If your guitar arrives damaged, contact us immediately. We'll
                  arrange a free return and replacement or full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
