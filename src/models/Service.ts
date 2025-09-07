import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Facial Treatments",
      "Hair Treatments",
      "Body Treatments",
      "Nail Services",
      "Makeup Services",
      "Massage Therapy",
      "Skin Care",
      "Hair Styling",
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 15,
  },
  image: {
    type: String,
    default: "",
  },
  images: {
    type: [String],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
  benefits: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
  requirements: {
    type: String,
    default: "",
  },
  preparation: {
    type: String,
    default: "",
  },
  aftercare: {
    type: String,
    default: "",
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
serviceSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.GlowService ||
  mongoose.model("GlowService", serviceSchema);
