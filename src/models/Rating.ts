import mongoose, { Schema, model, models, Types } from 'mongoose';

export interface IRating extends Document {
  productId: Types.ObjectId;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  review?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema = new Schema<IRating>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    userId: {
      type: String,
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
      lowercase: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      maxlength: 1000,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate ratings
RatingSchema.index({ productId: 1, userId: 1 }, { unique: true });

// Index for faster queries
RatingSchema.index({ productId: 1 });
RatingSchema.index({ rating: 1 });

const Rating = models.Rating || model<IRating>('Rating', RatingSchema);

export default Rating;

