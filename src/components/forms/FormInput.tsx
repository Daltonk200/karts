"use client";

import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  error?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: string;
  disabled?: boolean;
  className?: string;
}

export default function FormInput<T extends FieldValues>({
  name,
  register,
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  unit,
  min,
  max,
  step,
  disabled = false,
  className = '',
}: FormInputProps<T>) {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          {...register(name, { 
            required: required ? `${label} is required` : false,
            valueAsNumber: type === 'number',
            min: min,
            max: max,
          })}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          step={step}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
            error
              ? 'border-red-600 focus:ring-red-500'
              : 'border-gray-300 focus:border-red-500'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${
            unit ? 'pr-16' : ''
          }`}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">{unit}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

