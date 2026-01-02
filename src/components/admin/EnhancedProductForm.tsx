"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ProductType, ProductFormData, Category } from "@/types/product";
import { PRODUCT_TYPES, getProductTypeFields } from "@/config/productTypes";
import SearchableSelect from "@/components/forms/SearchableSelect";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import FormCheckbox from "@/components/forms/FormCheckbox";
import SlideableDrawer from "@/components/ui/SlideableDrawer";

interface EnhancedProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EnhancedProductForm({
  onSuccess,
  onCancel,
}: EnhancedProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<ProductType | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      productType: "" as ProductType,
      category: "",
      price: 0,
      originalPrice: 0,
      brand: "",
      sku: "",
      stock: 1,
      images: [],
      imagePublicIds: [],
      isFeatured: false,
      isOnSale: false,
      tags: [],
      specifications: {},
    },
  });

  const productType = watch("productType");

  // Mock categories
  const mockCategories: Category[] = [
    {
      id: "1",
      name: "Electric Go-Karts",
      productType: "go-karts",
      slug: "electric-go-karts",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Gas-Powered Go-Karts",
      productType: "go-karts",
      slug: "gas-powered-go-karts",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Racing Go-Karts",
      productType: "go-karts",
      slug: "racing-go-karts",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Electric Scooters",
      productType: "scooters",
      slug: "electric-scooters",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Gas Scooters",
      productType: "scooters",
      slug: "gas-scooters",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "6",
      name: "Engine Parts",
      productType: "spare-parts",
      slug: "engine-parts",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "7",
      name: "Body Parts",
      productType: "spare-parts",
      slug: "body-parts",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    setCategories(mockCategories);
  }, []);

  useEffect(() => {
    if (productType) {
      setSelectedProductType(productType);
      // Reset category when product type changes
      setValue("category", "");
    }
  }, [productType, setValue]);

  const filteredCategories = categories.filter(
    (cat) => cat.productType === selectedProductType && cat.isActive
  );

  const categoryOptions = [
    ...filteredCategories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })),
    { value: "__add_new__", label: "➕ Add New Category..." },
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      // For demo purposes, create mock image URLs
      const mockImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setImages([...images, ...mockImages]);
      setValue("images", [...images, ...mockImages]);

      toast.success(`${files.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages);
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!data.productType) {
      toast.error("Please select a product type");
      return;
    }

    if (!data.category) {
      toast.error("Please select a category");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Product data:", data);
      toast.success("Product created successfully");
      onSuccess();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const productTypeConfig = PRODUCT_TYPES.find(
    (type) => type.id === selectedProductType
  );
  const dynamicFields = getProductTypeFields(selectedProductType);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Type Selection */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <SearchableSelect
            name="productType"
            control={control}
            label="Product Type"
            options={PRODUCT_TYPES.map((type) => ({
              value: type.id,
              label: `${type.icon} ${type.name}`,
            }))}
            placeholder="Select product type..."
            required
            error={errors.productType?.message}
          />
          <p className="text-xs text-gray-600 mt-2">
            💡 Select the product type first to see relevant fields
          </p>
        </div>

        {/* Category Selection - Only show if product type is selected */}
        {selectedProductType && (
          <SearchableSelect
            name="category"
            control={control}
            label="Category"
            options={categoryOptions}
            placeholder="Select or add category..."
            required
            error={errors.category?.message}
            onCreateOption={() => setShowAddCategoryModal(true)}
          />
        )}

        {/* Basic Information */}
        {selectedProductType && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">{productTypeConfig?.icon}</span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  name="name"
                  register={register}
                  label="Product Name"
                  placeholder="Enter product name"
                  required
                  error={errors.name?.message}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    name="brand"
                    register={register}
                    label="Brand"
                    placeholder="Enter brand name"
                    required
                    error={errors.brand?.message}
                  />
                  <FormInput
                    name="sku"
                    register={register}
                    label="SKU"
                    placeholder="Auto-generated if empty"
                    error={errors.sku?.message}
                  />
                </div>

                <FormTextarea
                  name="description"
                  register={register}
                  label="Description"
                  placeholder="Enter product description"
                  rows={3}
                  error={errors.description?.message}
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Pricing & Inventory
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <FormInput
                  name="price"
                  register={register}
                  label="Price"
                  type="number"
                  placeholder="0.00"
                  required
                  unit="$"
                  step="0.01"
                  min={0}
                  error={errors.price?.message}
                />
                <FormInput
                  name="originalPrice"
                  register={register}
                  label="Original Price"
                  type="number"
                  placeholder="0.00"
                  unit="$"
                  step="0.01"
                  min={0}
                  error={errors.originalPrice?.message}
                />
                <FormInput
                  name="stock"
                  register={register}
                  label="Stock"
                  type="number"
                  placeholder="0"
                  required
                  min={0}
                  error={errors.stock?.message}
                />
              </div>
            </div>

            {/* Dynamic Fields Based on Product Type */}
            {dynamicFields.length > 0 && (
              <div className="space-y-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {productTypeConfig?.name} Specifications
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {dynamicFields.map((field) => {
                    if (field.type === "select") {
                      return (
                        <SearchableSelect
                          key={field.name}
                          name={`specifications.${field.name}` as any}
                          control={control}
                          label={field.label}
                          options={field.options || []}
                          placeholder={field.placeholder}
                          required={field.required}
                          isSearchable={false}
                        />
                      );
                    }

                    if (field.type === "textarea") {
                      return (
                        <FormTextarea
                          key={field.name}
                          name={`specifications.${field.name}` as any}
                          register={register}
                          label={field.label}
                          placeholder={field.placeholder}
                          required={field.required}
                          rows={3}
                        />
                      );
                    }

                    if (field.type === "checkbox") {
                      return (
                        <FormCheckbox
                          key={field.name}
                          name={`specifications.${field.name}` as any}
                          register={register}
                          label={field.label}
                        />
                      );
                    }

                    return (
                      <FormInput
                        key={field.name}
                        name={`specifications.${field.name}` as any}
                        register={register}
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        unit={field.unit}
                        min={field.type === "number" ? 0 : undefined}
                        step={field.type === "number" ? "0.01" : undefined}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Images
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImages}
                  className="hidden"
                  id="product-images-upload"
                />

                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    uploadingImages
                      ? "border-red-300 bg-red-50"
                      : "border-zinc-300 hover:border-red-400 hover:bg-red-50"
                  }`}
                  onClick={() =>
                    document.getElementById("product-images-upload")?.click()
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
                      <span className="font-medium text-red-600 hover:text-red-500">
                        {images.length > 0 ? "Add More Images" : "Click to upload"}
                      </span>{" "}
                      or drag and drop
                    </div>

                    <p className="text-xs text-zinc-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>

                  {uploadingImages && (
                    <div className="mt-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        <span className="text-sm text-zinc-600">Uploading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Uploaded Images:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Settings
              </h3>
              <div className="space-y-3">
                <FormCheckbox
                  name="isFeatured"
                  register={register}
                  label="Featured Product"
                  description="Display this product in featured sections"
                />
                <FormCheckbox
                  name="isOnSale"
                  register={register}
                  label="On Sale"
                  description="Mark this product as on sale"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-white text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </form>

      {/* Add Category Modal */}
      <SlideableDrawer
        open={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        title="Add New Category"
        width="400px"
      >
        <QuickCategoryForm
          productType={selectedProductType}
          onSuccess={(newCategory) => {
            setCategories([...categories, newCategory]);
            setValue("category", newCategory.id);
            setShowAddCategoryModal(false);
            toast.success("Category created successfully");
          }}
          onCancel={() => setShowAddCategoryModal(false)}
        />
      </SlideableDrawer>
    </>
  );
}

// Quick Category Form Component
interface QuickCategoryFormProps {
  productType: ProductType | "";
  onSuccess: (category: Category) => void;
  onCancel: () => void;
}

function QuickCategoryForm({
  productType,
  onSuccess,
  onCancel,
}: QuickCategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!productType) {
      toast.error("Product type is required");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newCategory: Category = {
        id: Date.now().toString(),
        name: categoryName,
        productType: productType as ProductType,
        slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onSuccess(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="e.g., Youth Racing Karts"
          required
          autoFocus
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-800">
          <strong>Product Type:</strong>{" "}
          {PRODUCT_TYPES.find((t) => t.id === productType)?.name}
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-white text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {loading ? "Creating..." : "Add Category"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

