import mongoose, { Schema, model, models, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  productType: 'go-karts' | 'scooters' | 'spare-parts';
  category: Types.ObjectId;
  price: number;
  originalPrice?: number;
  brand: string;
  sku: string;
  stock: number;
  images: string[];
  imagePublicIds: string[];
  isFeatured: boolean;
  isOnSale: boolean;
  tags: string[];
  specifications: Record<string, any>; // Dynamic specs based on productType
  rating?: number;
  reviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
      enum: ['go-karts', 'scooters', 'spare-parts'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
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
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
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
    tags: {
      type: [String],
      default: [],
    },
    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
ProductSchema.index({ category: 1 });
ProductSchema.index({ productType: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ isOnSale: 1 });
ProductSchema.index({ sku: 1 });
ProductSchema.index({ name: 'text', description: 'text', brand: 'text' }); // Text search

const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;

