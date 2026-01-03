import mongoose, { Schema, model, models } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  productType: 'go-karts' | 'scooters' | 'spare-parts';
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    productType: {
      type: String,
      required: true,
      enum: ['go-karts', 'scooters', 'spare-parts'],
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
CategorySchema.index({ productType: 1, isActive: 1 });

const Category = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;

