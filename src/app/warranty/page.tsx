"use client";

import Container from "@/components/Container";
import Image from "next/image";

export default function WarrantyPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-zinc-900 text-white py-20">
        <Image
          src="https://images.pexels.com/photos/357514/pexels-photo-357514.jpeg"
          alt="Warranty Information"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Warranty Information
              </h1>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                Comprehensive protection for your investment in quality
                instruments
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="py-16">
          {/* Warranty Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Our Warranty Coverage
            </h2>
            <div className="bg-zinc-50 p-8 ">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Lifetime Warranty
                  </h3>
                  <p className="text-zinc-700 mb-4">
                    We stand behind the quality of every guitar we sell. Our
                    comprehensive warranty covers manufacturing defects and
                    structural issues for the lifetime of your instrument.
                  </p>
                  <ul className="space-y-2 text-zinc-700">
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Lifetime coverage on structural defects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>2-year coverage on electronics and hardware</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Free repairs or replacement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-zinc-900 mr-2">•</span>
                      <span>Transferable to subsequent owners</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">🛡️</div>
                  <p className="text-zinc-600">
                    Your guitar is protected from day one - we're committed to
                    your musical journey
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Warranty Types
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-semibold mb-3">
                  Structural Warranty
                </h3>
                <p className="text-zinc-600 mb-4">
                  Lifetime coverage on structural integrity
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Neck warping or twisting</li>
                  <li>• Body cracks or splits</li>
                  <li>• Bridge lifting or failure</li>
                  <li>• Fretboard separation</li>
                  <li>• Headstock breaks</li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">
                  Electronics Warranty
                </h3>
                <p className="text-zinc-600 mb-4">
                  2-year coverage on electronic components
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Pickup failure</li>
                  <li>• Volume/tone control issues</li>
                  <li>• Output jack problems</li>
                  <li>• Switch malfunctions</li>
                  <li>• Wiring defects</li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold mb-3">
                  Hardware Warranty
                </h3>
                <p className="text-zinc-600 mb-4">
                  2-year coverage on mechanical parts
                </p>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Tuning machine failure</li>
                  <li>• Bridge saddle issues</li>
                  <li>• Nut cracking</li>
                  <li>• Strap button failure</li>
                  <li>• Hardware corrosion</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What's Not Covered */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              What's Not Covered
            </h2>
            <div className="bg-red-50 border border-red-200 p-8 ">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-red-700">
                    Normal Wear & Tear
                  </h3>
                  <ul className="space-y-3 text-red-700">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Fret wear from normal playing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Finish scratches and dings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>String breakage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Pickguard wear</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-red-700">
                    Damage & Modifications
                  </h3>
                  <ul className="space-y-3 text-red-700">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Accidental damage or drops</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Unauthorized modifications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Environmental damage (water, heat)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Improper storage or handling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Warranty Claim Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p className="text-zinc-600 text-sm">
                  Email or call us with your warranty claim
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Assessment</h3>
                <p className="text-zinc-600 text-sm">
                  We'll evaluate the issue and determine coverage
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Repair/Replace</h3>
                <p className="text-zinc-600 text-sm">
                  We'll repair or replace the covered component
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Return</h3>
                <p className="text-zinc-600 text-sm">
                  Your guitar is returned in perfect condition
                </p>
              </div>
            </div>
          </div>

          {/* Extended Warranty */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Extended Warranty Options
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-xl font-semibold mb-4">
                  Premium Protection Plan
                </h3>
                <p className="text-zinc-600 mb-4">
                  Additional coverage beyond our standard warranty
                </p>
                <ul className="space-y-3 text-zinc-700">
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Accidental damage coverage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Free annual setup and maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Priority repair service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Loaner guitar during repairs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>15% off accessories for life</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-lg font-semibold text-zinc-900">
                    $99/year
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-xl font-semibold mb-4">
                  Lifetime Service Plan
                </h3>
                <p className="text-zinc-600 mb-4">
                  One-time payment for lifetime coverage
                </p>
                <ul className="space-y-3 text-zinc-700">
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>All Premium Protection benefits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Lifetime free string changes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Unlimited setup appointments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Free shipping for warranty work</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-zinc-900 mr-2">•</span>
                    <span>Exclusive member events</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-lg font-semibold text-zinc-900">
                    $299 one-time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Care & Maintenance */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Care & Maintenance Tips
            </h2>
            <div className="bg-zinc-50 p-8 ">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Storage</h3>
                  <ul className="space-y-2 text-zinc-700">
                    <li>• Keep in a climate-controlled environment</li>
                    <li>• Use a hard case when not playing</li>
                    <li>• Avoid extreme temperature changes</li>
                    <li>• Store in a dry location</li>
                    <li>• Keep away from direct sunlight</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Cleaning</h3>
                  <ul className="space-y-2 text-zinc-700">
                    <li>• Wipe down after each use</li>
                    <li>• Use guitar-specific cleaning products</li>
                    <li>• Clean fretboard regularly</li>
                    <li>• Polish hardware as needed</li>
                    <li>• Change strings regularly</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Maintenance</h3>
                  <ul className="space-y-2 text-zinc-700">
                    <li>• Annual professional setup</li>
                    <li>• Check neck relief regularly</li>
                    <li>• Monitor action height</li>
                    <li>• Inspect electronics periodically</li>
                    <li>• Keep humidity levels stable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Warranty Support
            </h2>
            <div className="bg-zinc-900 text-white p-8  text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Need Warranty Service?
              </h3>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Our warranty team is here to help you get your guitar back in
                perfect playing condition
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl mb-2">📧</div>
                  <h4 className="font-semibold mb-2">Warranty Claims</h4>
                  <p className="text-sm text-zinc-300">
                  contact@guitarstringsco.com
                  </p>
                </div>
                
                <div>
                  <div className="text-3xl mb-2">🔧</div>
                  <h4 className="font-semibold mb-2">Service Center</h4>
                  <p className="text-sm text-zinc-300">
                    Professional repairs & maintenance
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
                  How long is the warranty valid?
                </h3>
                <p className="text-zinc-600">
                  Our structural warranty is valid for the lifetime of the
                  guitar. Electronics and hardware are covered for 2 years from
                  the date of purchase.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Is the warranty transferable?
                </h3>
                <p className="text-zinc-600">
                  Yes, our warranty is transferable to subsequent owners. The
                  new owner will need to provide proof of purchase and register
                  the guitar in their name.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  What if I need warranty service?
                </h3>
                <p className="text-zinc-600">
                  Contact our warranty department with photos and a description
                  of the issue. We'll assess the problem and arrange for repair
                  or replacement if covered.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Does warranty cover shipping costs?
                </h3>
                <p className="text-zinc-600">
                  Standard warranty covers return shipping for covered repairs.
                  Extended warranty plans include free shipping both ways for
                  all warranty work.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  Can I upgrade to an extended warranty later?
                </h3>
                <p className="text-zinc-600">
                  Yes, you can purchase an extended warranty at any time within
                  the first year of ownership. Premium Protection can be
                  upgraded to Lifetime Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
