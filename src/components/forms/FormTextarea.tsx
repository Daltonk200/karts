"use client";

import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export default function FormTextarea<T extends FieldValues>({
  name,
  register,
  label,
  placeholder,
  required = false,
  error,
  rows = 4,
  disabled = false,
  className = '',
}: FormTextareaProps<T>) {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <textarea
        {...register(name, { required: required ? `${label} is required` : false })}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none ${
          error
            ? 'border-red-600 focus:ring-red-500'
            : 'border-gray-300 focus:border-red-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      />
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

