import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  brand: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Skincare",
      "Makeup",
      "Fragrances",
      "Hair Care",
      "Body Care",
      "Men's Grooming",
      "Tools & Accessories",
    ],
    required: true,
  },
  skinType: {
    type: String,
    enum: [
      "All Types",
      "Mature Skin",
      "Dry Skin",
      "Sensitive Skin",
      "Acne-Prone Skin",
      "Oily Skin",
      "Combination Skin",
    ],
    default: "All Types",
  },
  size: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  ingredients: {
    type: [String],
    default: [],
  },
  benefits: {
    type: [String],
    default: [],
  },
  application: {
    type: String,
    default: "",
  },
  // Main product image (first image in the array)
  image: {
    type: String,
    default: "",
  },
  // Multiple product images
  images: {
    type: [String],
    default: [],
  },
  // Cloudinary public IDs for image management
  imagePublicIds: {
    type: [String],
    default: [],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    default: 1,
    min: 0,
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  weight: {
    type: String,
    default: "",
  },
  dimensions: {
    type: String,
    default: "",
  },
  expiryDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
productSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.GlowProduct ||
  mongoose.model("GlowProduct", productSchema);
