"use client";

import Container from "@/components/Container";
import Image from "next/image";

export default function RepairsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-zinc-900 text-white py-20">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
          alt="Guitar Repairs"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Guitar Repairs
              </h1>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                Professional repair and restoration services to keep your guitar
                playing perfectly
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="py-16">
          {/* Services Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Our Repair Services
            </h2>
            <div className="bg-zinc-50 p-8 ">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Expert Luthier Services
                  </h3>
                  <p className="text-zinc-700 mb-4">
                    Our certified luthiers have decades of experience working
                    with all types of guitars. From simple setups to complex
                    repairs, we treat every instrument with the care it
                    deserves.
                  </p>
                  <ul className="space-y-2 text-zinc-700">
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Certified master luthiers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>All guitar types and brands</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Quality guaranteed work</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Fast turnaround times</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">🔧</div>
                  <p className="text-zinc-600">
                    Your guitar deserves the best care - trust our experts to
                    restore it to perfect playing condition
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Repair Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Available Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">
                  Setup & Adjustment
                </h3>
                <p className="text-zinc-600 mb-4">
                  Professional setup for optimal playability
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Action adjustment</li>
                  <li>• Intonation setup</li>
                  <li>• Neck relief adjustment</li>
                  <li>• String height optimization</li>
                  <li>• Pickup height adjustment</li>
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-zinc-900">
                    From $75
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🔌</div>
                <h3 className="text-xl font-semibold mb-3">
                  Electronics Repair
                </h3>
                <p className="text-zinc-600 mb-4">
                  Fix electrical issues and upgrade components
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Pickup replacement</li>
                  <li>• Wiring repairs</li>
                  <li>• Potentiometer replacement</li>
                  <li>• Output jack repair</li>
                  <li>• Switch replacement</li>
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-zinc-900">
                    From $50
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-semibold mb-3">Fretwork</h3>
                <p className="text-zinc-600 mb-4">
                  Complete fret maintenance and replacement
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Fret leveling</li>
                  <li>• Fret crowning</li>
                  <li>• Fret replacement</li>
                  <li>• Fretboard cleaning</li>
                  <li>• Fret end dressing</li>
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-zinc-900">
                    From $150
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🛠️</div>
                <h3 className="text-xl font-semibold mb-3">
                  Structural Repair
                </h3>
                <p className="text-zinc-600 mb-4">
                  Fix cracks, breaks, and structural damage
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Headstock repair</li>
                  <li>• Body crack repair</li>
                  <li>• Bridge repair</li>
                  <li>• Neck reset</li>
                  <li>• Wood restoration</li>
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-zinc-900">
                    From $200
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-3">
                  Finish & Refinishing
                </h3>
                <p className="text-zinc-600 mb-4">
                  Restore and protect your guitar's finish
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Finish touch-up</li>
                  <li>• Complete refinishing</li>
                  <li>• Color matching</li>
                  <li>• Clear coat application</li>
                  <li>• Vintage finish restoration</li>
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-zinc-900">
                    From $300
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold mb-3">
                  Hardware Replacement
                </h3>
                <p className="text-zinc-600 mb-4">
                  Upgrade or replace worn hardware
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Tuning machine replacement</li>
                  <li>• Bridge replacement</li>
                  <li>• Nut replacement</li>
                  <li>• Strap button repair</li>
                  <li>• Hardware upgrades</li>
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-zinc-900">
                    From $40
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Repair Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Our Repair Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Assessment</h3>
                <p className="text-zinc-600 text-sm">
                  We thoroughly inspect your guitar and provide a detailed quote
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Approval</h3>
                <p className="text-zinc-600 text-sm">
                  Once you approve the work, we begin the repair process
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Repair</h3>
                <p className="text-zinc-600 text-sm">
                  Our expert luthiers perform the necessary repairs
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Check</h3>
                <p className="text-zinc-600 text-sm">
                  Final inspection and testing before return
                </p>
              </div>
            </div>
          </div>

          {/* Specialized Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Specialized Services
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-xl font-semibold mb-4">
                  Vintage Guitar Restoration
                </h3>
                <p className="text-zinc-600 mb-4">
                  Expert restoration of vintage and collectible guitars
                </p>
                <ul className="space-y-3 text-zinc-700">
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Historical accuracy preservation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Period-correct materials and techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Value preservation and enhancement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Documentation and certification</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-zinc-900">
                    Custom Quote
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-xl font-semibold mb-4">
                  Custom Modifications
                </h3>
                <p className="text-zinc-600 mb-4">
                  Personalized modifications to suit your playing style
                </p>
                <ul className="space-y-3 text-zinc-700">
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Custom pickup installations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Coil splitting and switching</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Locking tuner installation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Custom wiring configurations</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-zinc-900">
                    From $100
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Pricing & Turnaround Times
            </h2>
            <div className="bg-zinc-50 p-8 ">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Basic Services</h3>
                  <ul className="space-y-3 text-zinc-700">
                    <li className="flex justify-between">
                      <span>Setup & Adjustment</span>
                      <span className="font-semibold">$75-125</span>
                    </li>
                    <li className="flex justify-between">
                      <span>String Change</span>
                      <span className="font-semibold">$25-35</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Electronics Repair</span>
                      <span className="font-semibold">$50-150</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Hardware Replacement</span>
                      <span className="font-semibold">$40-200</span>
                    </li>
                  </ul>
                  <p className="text-sm text-zinc-600 mt-4">
                    Turnaround: 1-3 days
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Advanced Services
                  </h3>
                  <ul className="space-y-3 text-zinc-700">
                    <li className="flex justify-between">
                      <span>Fretwork</span>
                      <span className="font-semibold">$150-300</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Structural Repair</span>
                      <span className="font-semibold">$200-500</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Finish Work</span>
                      <span className="font-semibold">$300-800</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Custom Modifications</span>
                      <span className="font-semibold">$100-400</span>
                    </li>
                  </ul>
                  <p className="text-sm text-zinc-600 mt-4">
                    Turnaround: 3-7 days
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Premium Services
                  </h3>
                  <ul className="space-y-3 text-zinc-700">
                    <li className="flex justify-between">
                      <span>Vintage Restoration</span>
                      <span className="font-semibold">$500+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Complete Refinish</span>
                      <span className="font-semibold">$800+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Neck Reset</span>
                      <span className="font-semibold">$400+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Major Structural</span>
                      <span className="font-semibold">$600+</span>
                    </li>
                  </ul>
                  <p className="text-sm text-zinc-600 mt-4">
                    Turnaround: 1-2 weeks
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Why Choose Our Repair Service?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍🔧</div>
                <h3 className="text-lg font-semibold mb-2">Expert Luthiers</h3>
                <p className="text-zinc-600 text-sm">
                  Certified master luthiers with decades of experience
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Fast Turnaround</h3>
                <p className="text-zinc-600 text-sm">
                  Most repairs completed within 1-3 business days
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-semibold mb-2">
                  Quality Guarantee
                </h3>
                <p className="text-zinc-600 text-sm">
                  All work guaranteed with 90-day warranty
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-lg font-semibold mb-2">
                  Competitive Pricing
                </h3>
                <p className="text-zinc-600 text-sm">
                  Fair, transparent pricing with no hidden fees
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Schedule Your Repair
            </h2>
            <div className="bg-zinc-900 text-white p-8  text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Contact our repair department to schedule an assessment or get a
                quote for your guitar repair needs
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl mb-2">📧</div>
                  <h4 className="font-semibold mb-2">Email Us</h4>
                  <p className="text-sm text-zinc-300">
                   contact@guitarstringsco.com
                  </p>
                </div>
               
                <div>
                  <div className="text-3xl mb-2">📅</div>
                  <h4 className="font-semibold mb-2">Book Appointment</h4>
                  <p className="text-sm text-zinc-300">
                    Online scheduling available
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
                  How long does a typical repair take?
                </h3>
                <p className="text-zinc-600">
                  Most basic repairs (setup, string change, electronics) are
                  completed within 1-3 business days. More complex repairs may
                  take 3-7 days, and major restoration work can take 1-2 weeks.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Do you work on all guitar brands?
                </h3>
                <p className="text-zinc-600">
                  Yes, we work on all guitar brands and types - acoustic,
                  electric, bass, classical, and more. Our luthiers are
                  experienced with vintage, modern, and custom instruments.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Is there a warranty on repairs?
                </h3>
                <p className="text-zinc-600">
                  Yes, all our repair work comes with a 90-day warranty. This
                  covers any issues related to our workmanship and parts we
                  install.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Can I get a quote before the repair?
                </h3>
                <p className="text-zinc-600">
                  Absolutely! We provide detailed quotes after inspecting your
                  guitar. We'll explain what needs to be done and provide an
                  accurate cost estimate before starting any work.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Do you offer pickup installation services?
                </h3>
                <p className="text-zinc-600">
                  Yes, we offer pickup installation and custom wiring services.
                  We can install any brand of pickups and create custom wiring
                  configurations to suit your playing style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
