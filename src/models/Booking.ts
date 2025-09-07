import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    unique: true,
    required: true,
  },
  customer: {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  service: {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    servicePrice: {
      type: Number,
      required: true,
    },
    serviceDuration: {
      type: Number,
      required: true,
    },
  },
  appointment: {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "in-progress",
      "completed",
      "cancelled",
      "no-show",
    ],
    default: "pending",
  },
  notes: {
    type: String,
    default: "",
  },
  specialRequests: {
    type: String,
    default: "",
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "refunded", "partial"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "mobile_money", "bank_transfer"],
    default: "cash",
  },
  reminderSent: {
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
bookingSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Index for efficient queries
bookingSchema.index({ "appointment.date": 1, "appointment.time": 1 });
bookingSchema.index({ "customer.email": 1 });
bookingSchema.index({ status: 1 });

export default mongoose.models.GlowBooking ||
  mongoose.model("GlowBooking", bookingSchema);
