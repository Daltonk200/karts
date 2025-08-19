"use client";

import { useState } from "react";
import Container from "@/components/Container";
import { toast } from "react-hot-toast";

interface CustomGuitarForm {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Basic Guitar Specifications
  guitarType: string;
  bodyStyle: string;
  woodType: string;

  // Detailed Specifications
  neckWood: string;
  fretboardWood: string;
  pickups: string;
  bridge: string;
  color: string;
  finish: string;
  scaleLength: string;
  nutWidth: string;
  bodyDepth: string;

  // Project Details
  budget: string;
  timeline: string;
  specialRequirements: string;

  // Additional Preferences
  playingStyle: string;
  tonePreference: string;
  aestheticPreference: string;
}

export default function CustomGuitarPage() {
  const [formData, setFormData] = useState<CustomGuitarForm>({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Basic Guitar Specifications
    guitarType: "",
    bodyStyle: "",
    woodType: "",

    // Detailed Specifications
    neckWood: "",
    fretboardWood: "",
    pickups: "",
    bridge: "",
    color: "",
    finish: "",
    scaleLength: "",
    nutWidth: "",
    bodyDepth: "",

    // Project Details
    budget: "",
    timeline: "",
    specialRequirements: "",

    // Additional Preferences
    playingStyle: "",
    tonePreference: "",
    aestheticPreference: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/custom-guitar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Custom guitar request submitted! We'll contact you within 24 hours."
        );
        setFormData({
          // Personal Information
          firstName: "",
          lastName: "",
          email: "",
          phone: "",

          // Basic Guitar Specifications
          guitarType: "",
          bodyStyle: "",
          woodType: "",

          // Detailed Specifications
          neckWood: "",
          fretboardWood: "",
          pickups: "",
          bridge: "",
          color: "",
          finish: "",
          scaleLength: "",
          nutWidth: "",
          bodyDepth: "",

          // Project Details
          budget: "",
          timeline: "",
          specialRequirements: "",

          // Additional Preferences
          playingStyle: "",
          tonePreference: "",
          aestheticPreference: "",
        });
      } else {
        toast.error(
          data.error || "Failed to submit request. Please try again."
        );
      }
    } catch (error) {
      console.error("Custom guitar request error:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-zinc-50 border-b border-zinc-200">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              Custom Guitar Request
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Dreaming of the perfect guitar? Let our master luthiers bring your
              vision to life.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                  Guitar Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="guitarType"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Guitar Type *
                    </label>
                    <select
                      id="guitarType"
                      name="guitarType"
                      value={formData.guitarType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select guitar type</option>
                      <option value="electric-guitar">Electric Guitar</option>
                      <option value="acoustic-guitar">Acoustic Guitar</option>
                      <option value="bass-guitar">Bass Guitar</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="bodyStyle"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Body Style
                    </label>
                    <select
                      id="bodyStyle"
                      name="bodyStyle"
                      value={formData.bodyStyle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select body style</option>
                      <option value="dreadnought">Dreadnought</option>
                      <option value="concert">Concert</option>
                      <option value="stratocaster">Stratocaster</option>
                      <option value="telecaster">Telecaster</option>
                      <option value="les-paul">Les Paul</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="woodType"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Body Wood
                    </label>
                    <select
                      id="woodType"
                      name="woodType"
                      value={formData.woodType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select body wood</option>
                      <option value="mahogany">Mahogany</option>
                      <option value="maple">Maple</option>
                      <option value="rosewood">Rosewood</option>
                      <option value="alder">Alder</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                  Detailed Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="neckWood"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Neck Wood
                    </label>
                    <select
                      id="neckWood"
                      name="neckWood"
                      value={formData.neckWood}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select neck wood</option>
                      <option value="maple">Maple</option>
                      <option value="mahogany">Mahogany</option>
                      <option value="rosewood">Rosewood</option>
                      <option value="walnut">Walnut</option>
                      <option value="wenge">Wenge</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="fretboardWood"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Fretboard Wood
                    </label>
                    <select
                      id="fretboardWood"
                      name="fretboardWood"
                      value={formData.fretboardWood}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select fretboard wood</option>
                      <option value="rosewood">Rosewood</option>
                      <option value="maple">Maple</option>
                      <option value="ebony">Ebony</option>
                      <option value="pau-ferro">Pau Ferro</option>
                      <option value="wenge">Wenge</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="pickups"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Pickups (Electric Only)
                    </label>
                    <select
                      id="pickups"
                      name="pickups"
                      value={formData.pickups}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select pickups</option>
                      <option value="single-coil">Single Coil</option>
                      <option value="humbucker">Humbucker</option>
                      <option value="p90">P-90</option>
                      <option value="active">Active Pickups</option>
                      <option value="custom">Custom Wound</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="bridge"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Bridge Type
                    </label>
                    <select
                      id="bridge"
                      name="bridge"
                      value={formData.bridge}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select bridge</option>
                      <option value="fixed">Fixed Bridge</option>
                      <option value="tremolo">Tremolo</option>
                      <option value="floyd-rose">Floyd Rose</option>
                      <option value="bigsby">Bigsby</option>
                      <option value="acoustic">Acoustic Bridge</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="color"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Color/Stain
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="e.g., Natural, Sunburst, Black, Custom..."
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="finish"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Finish Type
                    </label>
                    <select
                      id="finish"
                      name="finish"
                      value={formData.finish}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select finish</option>
                      <option value="nitrocellulose">Nitrocellulose</option>
                      <option value="polyurethane">Polyurethane</option>
                      <option value="oil">Oil Finish</option>
                      <option value="varnish">Varnish</option>
                      <option value="satin">Satin</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="scaleLength"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Scale Length
                    </label>
                    <select
                      id="scaleLength"
                      name="scaleLength"
                      value={formData.scaleLength}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select scale length</option>
                      <option value="24.75">24.75" (Gibson)</option>
                      <option value="25.5">25.5" (Fender)</option>
                      <option value="25">25" (PRS)</option>
                      <option value="24.625">24.625" (Custom)</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="nutWidth"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Nut Width
                    </label>
                    <select
                      id="nutWidth"
                      name="nutWidth"
                      value={formData.nutWidth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select nut width</option>
                      <option value="1.625">1.625" (Standard)</option>
                      <option value="1.6875">1.6875" (Wide)</option>
                      <option value="1.75">1.75" (Extra Wide)</option>
                      <option value="1.5">1.5" (Narrow)</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="bodyDepth"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Body Depth
                    </label>
                    <select
                      id="bodyDepth"
                      name="bodyDepth"
                      value={formData.bodyDepth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select body depth</option>
                      <option value="1.75">1.75" (Standard)</option>
                      <option value="2">2" (Thick)</option>
                      <option value="1.5">1.5" (Thin)</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                  Playing Style & Preferences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="playingStyle"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Primary Playing Style
                    </label>
                    <select
                      id="playingStyle"
                      name="playingStyle"
                      value={formData.playingStyle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select playing style</option>
                      <option value="rock">Rock</option>
                      <option value="blues">Blues</option>
                      <option value="jazz">Jazz</option>
                      <option value="country">Country</option>
                      <option value="folk">Folk</option>
                      <option value="classical">Classical</option>
                      <option value="fingerstyle">Fingerstyle</option>
                      <option value="shred">Shred/Metal</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="tonePreference"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Tone Preference
                    </label>
                    <select
                      id="tonePreference"
                      name="tonePreference"
                      value={formData.tonePreference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select tone preference</option>
                      <option value="bright">Bright & Clear</option>
                      <option value="warm">Warm & Mellow</option>
                      <option value="balanced">Balanced</option>
                      <option value="aggressive">Aggressive</option>
                      <option value="vintage">Vintage</option>
                      <option value="modern">Modern</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="aestheticPreference"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Aesthetic Preferences
                    </label>
                    <textarea
                      id="aestheticPreference"
                      name="aestheticPreference"
                      value={formData.aestheticPreference}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Describe your preferred visual style, inlays, binding, headstock design, etc..."
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                  Project Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select budget range</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000+">$10,000+</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">Select timeline</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="12+months">12+ months</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="specialRequirements"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    Special Requirements & Notes
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about any special features, modifications, or specific requirements..."
                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-zinc-900 text-white font-medium tracking-wide uppercase hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Custom Guitar Request"}
                </button>
                <p className="text-sm text-zinc-600 mt-4">
                  We'll review your request and contact you within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
