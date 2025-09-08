import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GlowProduct",
    required: true,
  },
  userId: {
    type: String, // We'll use a simple string for now, can be ObjectId if you have user auth
    required: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  isVerified: {
    type: Boolean,
    default: false,
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
ratingSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Compound index to prevent duplicate ratings from same user for same product
ratingSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default mongoose.models.Rating || mongoose.model("Rating", ratingSchema);
