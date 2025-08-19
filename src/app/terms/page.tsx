"use client";

import Container from "@/components/Container";

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-lg text-zinc-200 max-w-2xl mx-auto">
              Please read these terms carefully before using our website and
              services.
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
                    Acceptance of Terms
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    By accessing and using the Guitar & Strings Co website, you
                    accept and agree to be bound by the terms and provision of
                    this agreement. If you do not agree to abide by the above,
                    please do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Use License
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    Permission is granted to temporarily download one copy of
                    the materials (information or software) on Guitar & Strings
                    Co's website for personal, non-commercial transitory viewing
                    only. This is the grant of a license, not a transfer of
                    title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>
                      Use the materials for any commercial purpose or for any
                      public display
                    </li>
                    <li>
                      Attempt to reverse engineer any software contained on the
                      website
                    </li>
                    <li>
                      Remove any copyright or other proprietary notations from
                      the materials
                    </li>
                    <li>
                      Transfer the materials to another person or "mirror" the
                      materials on any other server
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Product Information and Pricing
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    While we strive to provide accurate product information and
                    pricing, we reserve the right to correct any errors,
                    inaccuracies, or omissions and to change or update
                    information at any time without prior notice. Prices are
                    subject to change without notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Order Acceptance and Cancellation
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    All orders are subject to acceptance and availability. We
                    reserve the right to refuse service to anyone for any reason
                    at any time. We may cancel orders if:
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
                    <li>The product is out of stock</li>
                    <li>There are issues with payment verification</li>
                    <li>The order violates our terms of service</li>
                    <li>We suspect fraudulent activity</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Payment and Billing
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    Payment is due at the time of order placement. We accept
                    major credit cards and other payment methods as indicated on
                    our website. By providing payment information, you represent
                    and warrant that you have the legal right to use the payment
                    method.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Shipping and Delivery
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    Delivery times are estimates only. We are not responsible
                    for delays beyond our control. Risk of loss and title for
                    items purchased pass to you upon delivery of the items to
                    the carrier.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Returns and Refunds
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    We accept returns within 30 days of delivery for items in
                    original condition. Return shipping costs are the
                    responsibility of the customer unless the item is defective.
                    Refunds will be processed within 5-7 business days of
                    receiving the returned item.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Warranty and Disclaimers
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    All products come with manufacturer warranties as
                    applicable. We disclaim all other warranties, express or
                    implied, including but not limited to implied warranties of
                    merchantability and fitness for a particular purpose.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    In no event shall Guitar & Strings Co be liable for any
                    damages arising out of the use or inability to use the
                    materials on our website, even if we have been notified
                    orally or in writing of the possibility of such damage.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    User Accounts
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    You are responsible for maintaining the confidentiality of
                    your account and password. You agree to accept
                    responsibility for all activities that occur under your
                    account.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Prohibited Uses
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    You may not use our website:
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
                    <li>
                      For any unlawful purpose or to solicit others to perform
                      unlawful acts
                    </li>
                    <li>
                      To violate any international, federal, or state
                      regulations, rules, or laws
                    </li>
                    <li>
                      To infringe upon or violate our intellectual property
                      rights or the intellectual property rights of others
                    </li>
                    <li>
                      To harass, abuse, insult, harm, defame, slander,
                      disparage, intimidate, or discriminate
                    </li>
                    <li>To submit false or misleading information</li>
                    <li>
                      To upload viruses or any other type of malicious code
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Intellectual Property
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    The content on this website, including text, graphics,
                    logos, images, and software, is the property of Guitars &
                    Strings Co and is protected by copyright and other
                    intellectual property laws.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Governing Law
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    These terms shall be governed by and construed in accordance
                    with the laws of the state of New York, without regard to
                    its conflict of law provisions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Changes to Terms
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    We reserve the right to modify these terms at any time.
                    Changes will be effective immediately upon posting on the
                    website. Your continued use of the website constitutes
                    acceptance of the modified terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Contact Information
                  </h2>
                  <p className="text-zinc-600 mb-4">
                    If you have any questions about these terms of service,
                    please contact us at:
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
