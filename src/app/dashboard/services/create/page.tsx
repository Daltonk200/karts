"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  image: string;
  images: string[];
  features: string[];
  benefits: string[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  requirements: string[];
  preparation: string;
  aftercare: string;
}

const categories = [
  "Facial Treatments",
  "Hair Treatments",
  "Body Treatments",
  "Nail Services",
  "Makeup Services",
  "Massage Therapy",
  "Skin Care",
  "Hair Styling",
];

export default function CreateServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    description: "",
    category: "",
    price: 0,
    duration: 60,
    image: "",
    images: [],
    features: [],
    benefits: [],
    isActive: true,
    isFeatured: false,
    tags: [],
    requirements: [],
    preparation: "",
    aftercare: "",
  });

  const [newFeature, setNewFeature] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleNumberChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.image) {
      toast.error("Please upload a cover image for the service");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("dashboard_token");
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Service created successfully!");
        router.push("/dashboard/services");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create service");
      }
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-1">
        <div className=" mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Service
            </h1>
            <p className="mt-2 text-gray-600">
              Add a new service to your beauty salon offerings
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="e.g., Deep Cleansing Facial"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (XAF) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={(e) =>
                      handleNumberChange("price", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="0"
                    min="0"
                    step="100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      handleNumberChange("duration", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="60"
                    min="15"
                    step="15"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                  placeholder="Describe the service in detail..."
                  required
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Cover Image
              </h2>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Cover Image *
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setIsSubmitting(true);
                        try {
                          const formData = new FormData();
                          formData.append("images", file);
                          formData.append("folder", "glowbeauty/services");

                          const response = await fetch("/api/upload", {
                            method: "POST",
                            body: formData,
                          });

                          if (response.ok) {
                            const data = await response.json();
                            setFormData((prev) => ({
                              ...prev,
                              image: data.images[0].secureUrl,
                            }));
                            toast.success("Image uploaded successfully!");
                          } else {
                            toast.error("Failed to upload image");
                          }
                        } catch (error) {
                          console.error("Upload error:", error);
                          toast.error("Failed to upload image");
                        } finally {
                          setIsSubmitting(false);
                        }
                      }
                    }}
                    className="hidden"
                    id="service-image-upload"
                  />

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                      isSubmitting
                        ? "border-rose-300 bg-rose-50"
                        : "border-zinc-300 hover:border-rose-400 hover:bg-rose-50"
                    }`}
                    onClick={() =>
                      document.getElementById("service-image-upload")?.click()
                    }
                  >
                    <div className="space-y-2">
                      <svg
                        className="mx-auto h-12 w-12 text-zinc-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div className="text-sm text-zinc-600">
                        <span className="font-medium text-rose-600 hover:text-rose-500">
                          {formData.image ? "Change Image" : "Click to upload"}
                        </span>{" "}
                        or drag and drop
                      </div>

                      <p className="text-xs text-zinc-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>

                    {isSubmitting && (
                      <div className="mt-4">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-600"></div>
                          <span className="text-sm text-zinc-600">
                            Uploading...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="relative w-32 h-32 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={formData.image}
                        alt="Service preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Service Features
              </h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1 px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="Add a feature..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-3 bg-rose-500 text-white rounded-[8px] hover:bg-rose-600 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>

                {formData.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-rose-100 text-rose-800"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-2 text-rose-600 hover:text-rose-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Service Benefits
              </h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="flex-1 px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="Add a benefit..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addBenefit())
                    }
                  />
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="px-4 py-3 bg-rose-500 text-white rounded-[8px] hover:bg-rose-600 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>

                {formData.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {benefit}
                        <button
                          type="button"
                          onClick={() => removeBenefit(index)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Tags</h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="Add a tag..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-rose-500 text-white rounded-[8px] hover:bg-rose-600 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Requirements
              </h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    className="flex-1 px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="Add a requirement..."
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addRequirement())
                    }
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-4 py-3 bg-rose-500 text-white rounded-[8px] hover:bg-rose-600 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>

                {formData.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.map((requirement, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                      >
                        {requirement}
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="ml-2 text-yellow-600 hover:text-yellow-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Preparation & Aftercare */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Preparation & Aftercare
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preparation Instructions
                  </label>
                  <textarea
                    name="preparation"
                    value={formData.preparation}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="Instructions for client preparation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aftercare Instructions
                  </label>
                  <textarea
                    name="aftercare"
                    value={formData.aftercare}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all duration-200 font-outfit"
                    placeholder="Instructions for post-treatment care..."
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Status
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Active Service
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Featured Service
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard/services")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? "Creating..." : "Create Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
