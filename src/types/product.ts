// Product Type Definitions

export type ProductType = 'go-karts' | 'scooters' | 'spare-parts';

export interface Category {
  id: string;
  name: string;
  productType: ProductType;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTypeConfig {
  id: ProductType;
  name: string;
  icon: string;
  fields: ProductField[];
}

export interface ProductField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox';
  required: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  unit?: string;
}

// Go-Karts specific fields
export interface GoKartSpecs {
  engineType: 'electric' | 'gas' | 'hybrid';
  maxSpeed: number;
  maxSpeedUnit: 'mph' | 'kmh';
  weightCapacity: number;
  weightCapacityUnit: 'lbs' | 'kg';
  ageRange: string;
  batteryCapacity?: string;
  chargingTime?: string;
  range?: string;
  safetyFeatures: string[];
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'inches' | 'cm';
  };
}

// Scooters specific fields
export interface ScooterSpecs {
  scooterType: 'electric' | 'gas' | 'manual' | 'kick';
  maxSpeed: number;
  maxSpeedUnit: 'mph' | 'kmh';
  range?: string;
  weightCapacity: number;
  weightCapacityUnit: 'lbs' | 'kg';
  isFoldable: boolean;
  wheelSize: string;
  batteryCapacity?: string;
  chargingTime?: string;
  brakeType: string;
  suspensionType?: string;
  ageRange: string;
}

// Spare Parts specific fields
export interface SparePartSpecs {
  compatibleWith: ('go-karts' | 'scooters' | 'both')[];
  partNumber: string;
  compatibleModels: string[];
  material: string;
  warrantyPeriod: string;
  manufacturer: string;
  dimensions?: string;
  weight?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  productType: ProductType;
  category: string;
  categoryName?: string;
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
  rating?: number;
  reviews?: number;
  specifications: GoKartSpecs | ScooterSpecs | SparePartSpecs;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  productType: ProductType;
  category: string;
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
  specifications: Record<string, any>;
}

