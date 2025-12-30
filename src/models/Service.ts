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

      "Maintenance",
      "Tuning",
      "Track Days",
      "Coaching",
      "Storage",
      "Customization",
      "Repairs"
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
    required: true,
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
    type: [String],
    default: [],
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
serviceSchema.pre("save", async function (next) {
  this.updatedAt = new Date();

  // If this service is being set as featured, check if we already have 3 featured services
  if (this.isFeatured && this.isNew) {
    const featuredCount = await (this.constructor as any).countDocuments({
      isFeatured: true,
    });
    if (featuredCount >= 3) {
      return next(new Error("Maximum of 3 services can be featured at a time"));
    }
  }

  // If this service is being updated to featured, check if we already have 3 featured services
  if (this.isFeatured && !this.isNew && this.isModified("isFeatured")) {
    const featuredCount = await (this.constructor as any).countDocuments({
      isFeatured: true,
      _id: { $ne: this._id },
    });
    if (featuredCount >= 3) {
      return next(new Error("Maximum of 3 services can be featured at a time"));
    }
  }

  next();
});

export default mongoose.models.ApexService ||
  mongoose.model("ApexService", serviceSchema);
