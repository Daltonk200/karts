import mongoose, { Schema, model, models } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number; // in minutes
  image?: string;
  images: string[];
  features: string[];
  benefits: string[];
  tags: string[];
  requirements: string[];
  preparation?: string;
  aftercare?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
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
    category: {
      type: String,
      required: true,
      enum: [
        'Maintenance',
        'Tuning',
        'Track Days',
        'Coaching',
        'Storage',
        'Customization',
        'Repairs',
      ],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 1, // at least 1 minute
    },
    image: {
      type: String,
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
    },
    aftercare: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Enforce maximum 3 featured services
ServiceSchema.pre('save', async function (next) {
  if (this.isFeatured && this.isNew) {
    const featuredCount = await mongoose.model('Service').countDocuments({ isFeatured: true });
    if (featuredCount >= 3) {
      return next(new Error('Maximum 3 featured services allowed'));
    }
  }
  next();
});

// Indexes
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ isFeatured: 1 });
ServiceSchema.index({ isActive: 1 });

const Service = models.Service || model<IService>('Service', ServiceSchema);

export default Service;

