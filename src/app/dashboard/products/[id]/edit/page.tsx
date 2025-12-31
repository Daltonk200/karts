"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";
import DashboardLayout from "@/components/admin/DashboardLayout";

interface ProductForm {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  brand: string;
  category: string;
  skinType: string;
  size: string;
  ingredients: string[];
  benefits: string[];
  application: string;
  isOnSale: boolean;
  isFeatured: boolean;
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  weight: string;
  dimensions: string;
  expiryDate: string;
  image: string;
  images: string[];
  sku: string;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    brand: "",
    category: "Skincare",
    skinType: "All Types",
    size: "",
    ingredients: [],
    benefits: [],
    application: "",
    isOnSale: false,
    isFeatured: false,
    stock: 1,
    rating: 0,
    reviews: 0,
    tags: [],
    weight: "",
    dimensions: "",
    expiryDate: "",
    image: "",
    images: [],
    sku: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);

        if (response.ok) {
          const product = await response.json();
          setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price || 0,
            originalPrice: product.originalPrice || 0,
            brand: product.brand || "",
            category: product.category || "Skincare",
            skinType: product.skinType || "All Types",
            size: product.size || "",
            ingredients: product.ingredients || [],
            benefits: product.benefits || [],
            application: product.application || "",
            isOnSale: product.isOnSale || false,
            isFeatured: product.isFeatured || false,
            stock: product.stock || 1,
            rating: product.rating || 0,
            reviews: product.reviews || 0,
            tags: product.tags || [],
            weight: product.weight || "",
            dimensions: product.dimensions || "",
            expiryDate: product.expiryDate || "",
            image: product.image || "",
            images: product.images || [],
            sku: product.sku || "",
          });
        } else {
          toast.error("Failed to load product");
          router.push("/dashboard/products");
        }
      } catch (error) {
        toast.error("An error occurred while loading the product");
        router.push("/dashboard/products");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

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

  const handleArrayChange = (field: string, value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addArrayItem = (field: string, value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [
          ...(prev[field as keyof ProductForm] as string[]),
          value.trim(),
        ],
      }));
    }
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof ProductForm] as string[]).filter(
        (_, i) => i !== index
      ),
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
    setSaving(true);

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/products");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
        </div>

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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Fragrances">Fragrances</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Men's Grooming">Men's Grooming</option>
                    <option value="Tools & Accessories">
                      Tools & Accessories
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skin Type *
                  </label>
                  <select
                    name="skinType"
                    value={formData.skinType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="All Types">All Types</option>
                    <option value="Mature Skin">Mature Skin</option>
                    <option value="Dry Skin">Dry Skin</option>
                    <option value="Sensitive Skin">Sensitive Skin</option>
                    <option value="Acne-Prone Skin">Acne-Prone Skin</option>
                    <option value="Oily Skin">Oily Skin</option>
                    <option value="Combination Skin">Combination Skin</option>
                  </select>
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="e.g., 30ml, 50g"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="e.g., 30g, 100ml"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g., 15cm x 3cm x 3cm"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
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
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Describe the product's features, benefits, and characteristics..."
              />
            </div>

            {/* Application */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Application Instructions
              </label>
              <textarea
                name="application"
                value={formData.application}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="How to use this product..."
              />
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients
              </label>
              <div className="space-y-2">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => {
                        const newIngredients = [...formData.ingredients];
                        newIngredients[index] = e.target.value;
                        handleArrayChange("ingredients", newIngredients);
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("ingredients", index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("ingredients", "")}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  + Add Ingredient
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefits
              </label>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...formData.benefits];
                        newBenefits[index] = e.target.value;
                        handleArrayChange("benefits", newBenefits);
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("benefits", index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("benefits", "")}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  + Add Benefit
                </button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="space-y-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => {
                        const newTags = [...formData.tags];
                        newTags[index] = e.target.value;
                        handleArrayChange("tags", newTags);
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("tags", index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("tags", "")}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  + Add Tag
                </button>
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

            {/* Product Options */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Feature this product on the homepage
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isOnSale"
                  checked={formData.isOnSale}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  This product is on sale
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard/products")}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
