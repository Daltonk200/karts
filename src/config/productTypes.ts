import { ProductTypeConfig } from '@/types/product';

export const PRODUCT_TYPES: ProductTypeConfig[] = [
  {
    id: 'go-karts',
    name: 'Go-Karts',
    icon: '🏎️',
    fields: [
      {
        name: 'engineType',
        label: 'Engine Type',
        type: 'select',
        required: true,
        options: [
          { value: 'electric', label: 'Electric' },
          { value: 'gas', label: 'Gas-Powered' },
          { value: 'hybrid', label: 'Hybrid' },
        ],
      },
      {
        name: 'maxSpeed',
        label: 'Max Speed',
        type: 'number',
        required: true,
        unit: 'mph',
        placeholder: '45',
      },
      {
        name: 'weightCapacity',
        label: 'Weight Capacity',
        type: 'number',
        required: true,
        unit: 'lbs',
        placeholder: '250',
      },
      {
        name: 'ageRange',
        label: 'Age Range',
        type: 'text',
        required: true,
        placeholder: '8-14 years',
      },
      {
        name: 'batteryCapacity',
        label: 'Battery Capacity (for electric)',
        type: 'text',
        required: false,
        placeholder: '48V 20Ah',
      },
      {
        name: 'chargingTime',
        label: 'Charging Time (for electric)',
        type: 'text',
        required: false,
        placeholder: '4-6 hours',
      },
      {
        name: 'range',
        label: 'Range (for electric)',
        type: 'text',
        required: false,
        placeholder: '15-20 miles',
      },
      {
        name: 'safetyFeatures',
        label: 'Safety Features',
        type: 'textarea',
        required: false,
        placeholder: 'Seat belt, roll cage, speed limiter...',
      },
      {
        name: 'length',
        label: 'Length',
        type: 'number',
        required: false,
        unit: 'inches',
        placeholder: '60',
      },
      {
        name: 'width',
        label: 'Width',
        type: 'number',
        required: false,
        unit: 'inches',
        placeholder: '40',
      },
      {
        name: 'height',
        label: 'Height',
        type: 'number',
        required: false,
        unit: 'inches',
        placeholder: '30',
      },
    ],
  },
  {
    id: 'scooters',
    name: 'Scooters',
    icon: '🛴',
    fields: [
      {
        name: 'scooterType',
        label: 'Scooter Type',
        type: 'select',
        required: true,
        options: [
          { value: 'electric', label: 'Electric' },
          { value: 'gas', label: 'Gas-Powered' },
          { value: 'manual', label: 'Manual/Push' },
          { value: 'kick', label: 'Kick Scooter' },
        ],
      },
      {
        name: 'maxSpeed',
        label: 'Max Speed',
        type: 'number',
        required: true,
        unit: 'mph',
        placeholder: '25',
      },
      {
        name: 'range',
        label: 'Range (for electric)',
        type: 'text',
        required: false,
        placeholder: '20-25 miles',
      },
      {
        name: 'weightCapacity',
        label: 'Weight Capacity',
        type: 'number',
        required: true,
        unit: 'lbs',
        placeholder: '220',
      },
      {
        name: 'isFoldable',
        label: 'Foldable',
        type: 'checkbox',
        required: false,
      },
      {
        name: 'wheelSize',
        label: 'Wheel Size',
        type: 'text',
        required: true,
        placeholder: '8.5 inches',
      },
      {
        name: 'batteryCapacity',
        label: 'Battery Capacity (for electric)',
        type: 'text',
        required: false,
        placeholder: '36V 10Ah',
      },
      {
        name: 'chargingTime',
        label: 'Charging Time (for electric)',
        type: 'text',
        required: false,
        placeholder: '3-4 hours',
      },
      {
        name: 'brakeType',
        label: 'Brake Type',
        type: 'text',
        required: true,
        placeholder: 'Disc brake, electronic brake',
      },
      {
        name: 'suspensionType',
        label: 'Suspension Type',
        type: 'text',
        required: false,
        placeholder: 'Front and rear suspension',
      },
      {
        name: 'ageRange',
        label: 'Age Range',
        type: 'text',
        required: true,
        placeholder: '14+ years',
      },
    ],
  },
  {
    id: 'spare-parts',
    name: 'Spare Parts',
    icon: '🔧',
    fields: [
      {
        name: 'compatibleWith',
        label: 'Compatible With',
        type: 'select',
        required: true,
        options: [
          { value: 'go-karts', label: 'Go-Karts Only' },
          { value: 'scooters', label: 'Scooters Only' },
          { value: 'both', label: 'Both Go-Karts & Scooters' },
        ],
      },
      {
        name: 'partNumber',
        label: 'Part Number',
        type: 'text',
        required: true,
        placeholder: 'GK-ENG-001',
      },
      {
        name: 'compatibleModels',
        label: 'Compatible Models',
        type: 'textarea',
        required: true,
        placeholder: 'Model A, Model B, Model C...',
      },
      {
        name: 'material',
        label: 'Material',
        type: 'text',
        required: true,
        placeholder: 'Aluminum alloy, Steel, Plastic...',
      },
      {
        name: 'warrantyPeriod',
        label: 'Warranty Period',
        type: 'text',
        required: true,
        placeholder: '6 months, 1 year...',
      },
      {
        name: 'manufacturer',
        label: 'Manufacturer',
        type: 'text',
        required: true,
        placeholder: 'OEM, Aftermarket brand...',
      },
      {
        name: 'dimensions',
        label: 'Dimensions',
        type: 'text',
        required: false,
        placeholder: '10 x 5 x 3 inches',
      },
      {
        name: 'weight',
        label: 'Weight',
        type: 'text',
        required: false,
        placeholder: '2 lbs',
      },
    ],
  },
];

export const getProductTypeConfig = (productType: string) => {
  return PRODUCT_TYPES.find((type) => type.id === productType);
};

export const getProductTypeFields = (productType: string) => {
  const config = getProductTypeConfig(productType);
  return config?.fields || [];
};

