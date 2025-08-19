"use client";

import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>("general");

  const faqData = {
    general: [
      {
        question: "What types of guitars do you sell?",
        answer:
          "We offer a comprehensive selection of guitars including Electric Guitars, Acoustic Guitars, and Bass Guitars collections. Our inventory includes both new and vintage instruments from top brands like Fender, Gibson, Martin, Taylor, PRS, and many others.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we currently ship to Canada and Mexico. Additional customs fees and longer delivery times may apply. For other countries, please contact us directly to discuss shipping options and costs.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers. We also offer financing options through our partner lenders for qualifying purchases.",
      },
      {
        question: "Can I visit your store in person?",
        answer:
          "Currently, we operate as an online-only store. However, we offer virtual consultations and can arrange private appointments for serious buyers. Contact us to schedule a virtual tour of our inventory.",
      },
      {
        question: "Do you offer trade-ins?",
        answer:
          "Yes, we accept trade-ins on guitars and other musical instruments. We'll provide a fair market value assessment and can apply the trade-in value toward your new purchase. Contact us for a trade-in evaluation.",
      },
    ],
    ordering: [
      {
        question: "How do I place an order?",
        answer:
          "You can place an order directly through our website by selecting your desired guitar, adding it to your cart, and completing the checkout process. You can also call us at 1-800-GUITAR-1 to place an order over the phone.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Orders can be cancelled or modified within 2 hours of placement. After that time, the order will be processed and shipped. Contact our customer service team immediately if you need to make changes.",
      },
      {
        question: "Do you offer financing?",
        answer:
          "Yes, we offer financing options through our partner lenders. You can apply for financing during checkout, and qualified buyers can get 0% APR for up to 12 months on purchases over $500.",
      },
      {
        question: "When will my order ship?",
        answer:
          "Most orders ship within 24 hours of placement. You'll receive a shipping confirmation email with tracking information once your order is shipped. Delivery times vary based on your chosen shipping method.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes, you'll receive tracking information via email once your order ships. You can also track your order through your account on our website or by contacting our customer service team.",
      },
    ],
    shipping: [
      {
        question: "How much does shipping cost?",
        answer:
          "Standard shipping is free on orders over $500, or $25 for orders under $500. Express shipping is $45, and overnight shipping is $75. All shipping includes tracking and signature confirmation.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and overnight shipping delivers the next business day. Delivery times may vary based on your location.",
      },
      {
        question: "Do you ship to PO boxes?",
        answer:
          "No, we cannot ship guitars to PO boxes due to size and signature requirements. Please provide a physical address for delivery. We require a signature upon delivery for all guitar shipments.",
      },
      {
        question: "What if my guitar arrives damaged?",
        answer:
          "If your guitar arrives damaged, contact us immediately. Take photos of the damage and we'll arrange a free return and replacement or full refund. We work with our shipping partners to resolve any issues.",
      },
      {
        question: "Can I change my shipping address?",
        answer:
          "Address changes can be made within 2 hours of order placement. After that time, the order will be processed and shipped. Contact our customer service team for assistance with address changes.",
      },
    ],
    returns: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return window for all guitars. The guitar must be in original condition with all packaging and accessories included. Return shipping is free for defective items, or $25 for change of mind returns.",
      },
      {
        question: "How do I return a guitar?",
        answer:
          "Contact us within 30 days to initiate a return. We'll provide a return shipping label and instructions. Pack the guitar securely in its original packaging and ship it back to us. Refunds are processed within 5-7 business days.",
      },
      {
        question: "Can I exchange for a different guitar?",
        answer:
          "Yes, you can exchange for any guitar we carry. You'll pay the difference if upgrading or receive a refund if downgrading. Exchanges include free shipping and are processed within 5-7 business days.",
      },
      {
        question: "What if I don't have the original packaging?",
        answer:
          "Original packaging is required for returns. If you don't have it, we may not be able to accept the return or may charge a restocking fee. Please keep all packaging until you're sure you want to keep the guitar.",
      },
      {
        question: "How long does it take to get my refund?",
        answer:
          "Refunds are typically processed within 5-7 business days after we receive and inspect your return. The time for the refund to appear in your account depends on your bank's processing time.",
      },
    ],
    warranty: [
      {
        question: "What warranty do you provide?",
        answer:
          "All guitars come with our lifetime structural warranty and 2-year warranty on electronics and hardware. This covers manufacturing defects and structural issues for the lifetime of the instrument.",
      },
      {
        question: "Is the warranty transferable?",
        answer:
          "Yes, our warranty is transferable to subsequent owners. The new owner will need to provide proof of purchase and register the guitar in their name to activate the warranty transfer.",
      },
      {
        question: "What's not covered by warranty?",
        answer:
          "Normal wear and tear, accidental damage, unauthorized modifications, environmental damage, and improper storage are not covered. The warranty only covers manufacturing defects and structural issues.",
      },
      {
        question: "How do I make a warranty claim?",
        answer:
          "Contact our warranty department with photos and a description of the issue. We'll assess the problem and arrange for repair or replacement if covered. You can email contact@guitarstringsco.com or call 1-800-GUITAR-2.",
      },
      {
        question: "Do you offer extended warranties?",
        answer:
          "Yes, we offer Premium Protection ($99/year) and Lifetime Service ($299 one-time) plans. These provide additional coverage including accidental damage, free maintenance, and priority service.",
      },
    ],
    repairs: [
      {
        question: "Do you offer repair services?",
        answer:
          "Yes, we offer comprehensive repair services through our certified luthiers. Services include setup, electronics repair, fretwork, structural repair, finish work, and custom modifications.",
      },
      {
        question: "How much do repairs cost?",
        answer:
          "Repair costs vary based on the service needed. Basic services start at $25-75, advanced services range from $150-500, and premium services start at $500+. We provide detailed quotes after inspection.",
      },
      {
        question: "How long do repairs take?",
        answer:
          "Basic repairs take 1-3 days, advanced repairs take 3-7 days, and major restoration work can take 1-2 weeks. We'll provide an estimated timeline when you bring in your guitar.",
      },
      {
        question: "Do you work on all guitar brands?",
        answer:
          "Yes, our luthiers work on all guitar brands and types - acoustic, electric, bass, classical, and more. We're experienced with vintage, modern, and custom instruments.",
      },
      {
        question: "Is there a warranty on repairs?",
        answer:
          "Yes, all our repair work comes with a 90-day warranty. This covers any issues related to our workmanship and parts we install. Extended warranty plans provide additional coverage.",
      },
    ],
  };

  const categories = [
    { id: "general", name: "General Questions", icon: "❓" },
    { id: "ordering", name: "Ordering & Payment", icon: "🛒" },
    { id: "shipping", name: "Shipping & Delivery", icon: "📦" },
    { id: "returns", name: "Returns & Exchanges", icon: "🔄" },
    { id: "warranty", name: "Warranty & Service", icon: "🛡️" },
    { id: "repairs", name: "Repairs & Maintenance", icon: "🔧" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-zinc-900 text-white py-20">
        <Image
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=600&fit=crop"
          alt="Frequently Asked Questions"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                Find answers to common questions about our guitars, services,
                and policies
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="py-16">
          {/* Category Navigation */}
          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setOpenCategory(category.id)}
                  className={`px-2 py-3 whitespace-nowrap border overflow-hidden transition-colors duration-200 ${
                    openCategory === category.id
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className={openCategory === category.id ? "block" : "hidden"}
              >
                <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
                  {category.name}
                </h2>
                <div className="space-y-6">
                  {faqData[category.id as keyof typeof faqData].map(
                    (faq, index) => (
                      <div
                        key={index}
                        className="bg-white border border-zinc-200  overflow-hidden"
                      >
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                            {faq.question}
                          </h3>
                          <p className="text-zinc-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <div className="bg-zinc-50 p-8  text-center">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our customer service
                team is here to help you with any questions about our guitars,
                services, or policies.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl mb-2">📧</div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-zinc-600">
                    contact@guitarstringsco.com
                  </p>
                </div>

                <div>
                  <div className="text-3xl mb-2">💬</div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-zinc-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Quick Links
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/shipping"
                className="bg-white border border-zinc-200 p-6  text-center hover:bg-zinc-50 transition-colors duration-200"
              >
                <div className="text-3xl mb-3">🚚</div>
                <h3 className="font-semibold mb-2">Shipping Info</h3>
                <p className="text-sm text-zinc-600">
                  Learn about our shipping options and policies
                </p>
              </Link>
              <Link
                href="/returns"
                className="bg-white border border-zinc-200 p-6  text-center hover:bg-zinc-50 transition-colors duration-200"
              >
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-semibold mb-2">Returns</h3>
                <p className="text-sm text-zinc-600">
                  Understand our return and exchange policy
                </p>
              </Link>
              <Link
                href="/warranty"
                className="bg-white border border-zinc-200 p-6  text-center hover:bg-zinc-50 transition-colors duration-200"
              >
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-semibold mb-2">Warranty</h3>
                <p className="text-sm text-zinc-600">
                  View warranty coverage and terms
                </p>
              </Link>
              <Link
                href="/repairs"
                className="bg-white border border-zinc-200 p-6  text-center hover:bg-zinc-50 transition-colors duration-200"
              >
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="font-semibold mb-2">Repairs</h3>
                <p className="text-sm text-zinc-600">
                  Explore our repair and maintenance services
                </p>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
