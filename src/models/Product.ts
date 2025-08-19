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
  brand: {
    type: String,
    trim: true,
    default: "",
  },
  model: {
    type: String,
    trim: true,
    default: "",
  },
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  condition: {
    type: String,
    enum: [
      "New",
      "Used",
      "Vintage",
      "Excellent",
      "Very Good",
      "Good",
      "Fair",
      "Poor",
    ],
    default: "New",
  },
  color: {
    type: String,
    default: "",
  },
  body: {
    type: String,
    default: "",
  },
  neck: {
    type: String,
    default: "",
  },
  fretboard: {
    type: String,
    default: "",
  },
  pickups: {
    type: String,
    default: "",
  },
  bridge: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    enum: ["Electric Guitars", "Acoustic Guitars", "Bass Guitars"],
    default: "Electric Guitars",
  },
  isFeatured: {
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

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
