"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";

interface ProductForm {
  name: string;
  description?: string;
  price: number;
  brand?: string;
  model?: string;
  year?: number;
  condition?: string;
  color?: string;
  body?: string;
  neck?: string;
  fretboard?: string;
  pickups?: string;
  bridge?: string;
  image?: string;
  images: string[];
  category?: string;
  isFeatured: boolean;
  stock: number;
  sku: string;
}

export default function CreateProductPage() {
  // Set this to true to bypass authentication
  const BYPASS_AUTH = false;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    condition: "New",
    color: "",
    body: "",
    neck: "",
    fretboard: "",
    pickups: "",
    bridge: "",
    image: "",
    images: [],
    category: "Electric Guitars",
    isFeatured: false,
    stock: 1,
    sku: "",
  });

  // on the homepage the collection tabs , products and guatr ptoduct page should all work and also the purchase page for invoice creation too

  useEffect(() => {
    if (!BYPASS_AUTH) {
      // Check authentication
      const token = localStorage.getItem("dashboard_token");
      if (!token) {
        router.push("/dashboard/login");
        return;
      }
    }
  }, [router]);

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

  const handleImageUpload = (urls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      image: urls[0] || "", // First image becomes main image
      images: urls, // All images stored in images array
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("dashboard_token");
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Product created successfully!");
        router.push("/dashboard/products");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create product");
      }
    } catch (error) {
      toast.error("An error occurred while creating the product");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboard_token");
    localStorage.removeItem("dashboard_user");
    router.push("/dashboard/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Product
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Add a new guitar to your inventory
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard/products")}
                className="bg-gray-600 text-white px-4 py-2  hover:bg-gray-700 transition-colors"
              >
                Back to Products
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2  hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Model *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="Auto-generated if left empty"
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Electric Guitars">Electric Guitars</option>
                    <option value="Acoustic Guitars">Acoustic Guitars</option>
                    <option value="Bass Guitars">Bass Guitars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the guitar's features, sound, and any notable characteristics..."
              />
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Body Type
                  </label>
                  <input
                    type="text"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Solid Body, Semi-Hollow, Hollow Body"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Neck Type
                  </label>
                  <input
                    type="text"
                    name="neck"
                    value={formData.neck}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Maple, Mahogany"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fretboard
                  </label>
                  <input
                    type="text"
                    name="fretboard"
                    value={formData.fretboard}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Rosewood, Ebony"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pickups
                  </label>
                  <input
                    type="text"
                    name="pickups"
                    value={formData.pickups}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Humbucker, Single Coil"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bridge Type
                  </label>
                  <input
                    type="text"
                    name="bridge"
                    value={formData.bridge}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Fixed Bridge, Tremolo"
                  />
                </div>
              </div>
            </div>

            {/* Product Images Upload */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Product Images
              </h3>
              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImages={formData.images}
                label="Upload Product Images"
              />
            </div>

            {/* Featured Product */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Feature this product on the homepage
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard/products")}
                className="bg-gray-600 text-white px-6 py-2  hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2  hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
