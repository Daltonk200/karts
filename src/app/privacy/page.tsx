"use client";

import Container from "@/components/Container";

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 opacity-90"></div>
        </div>
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-zinc-200 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-zinc max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Information We Collect
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    We collect information you provide directly to us, such as
                    when you create an account, make a purchase, or contact us
                    for support. This may include:
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Billing and shipping addresses</li>
                    <li>
                      Payment information (processed securely through our
                      payment partners)
                    </li>
                    <li>Purchase history and preferences</li>
                    <li>Communications with our customer service team</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Improve our website and services</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Information Sharing
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties except in the following
                    circumstances:
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
                    <li>With payment processors to complete transactions</li>
                    <li>With shipping partners to deliver your orders</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Data Security
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    We implement appropriate security measures to protect your
                    personal information against unauthorized access,
                    alteration, disclosure, or destruction. These measures
                    include:
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure payment processing through trusted partners</li>
                    <li>Regular security assessments and updates</li>
                    <li>
                      Limited access to personal information on a need-to-know
                      basis
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Cookies and Tracking
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    We use cookies and similar technologies to enhance your
                    browsing experience, analyze website traffic, and
                    personalize content. You can control cookie settings through
                    your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Your Rights
                  </h2>
                  <p className="text-zinc-600 mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Children's Privacy
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    Our website is not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children under 13. If you believe we have collected
                    information from a child under 13, please contact us
                    immediately.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    We may update this privacy policy from time to time. We will
                    notify you of any material changes by posting the new policy
                    on this page and updating the "Last Updated" date.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Contact Us
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    If you have any questions about this privacy policy or our
                    data practices, please contact us at:
                  </p>
                  <div className="bg-zinc-50 p-6 rounded-lg">
                    <p className="text-zinc-600">
                      <strong>Email:</strong> contact@guitarstringsco.com
                      
                    </p>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-8">
                  <p className="text-sm text-zinc-500">
                    <strong>Last Updated:</strong>{" "}
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
