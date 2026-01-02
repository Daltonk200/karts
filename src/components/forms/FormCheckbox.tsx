"use client";

import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export default function FormCheckbox<T extends FieldValues>({
  name,
  register,
  label,
  description,
  disabled = false,
  className = '',
}: FormCheckboxProps<T>) {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          {...register(name)}
          type="checkbox"
          disabled={disabled}
          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="ml-3">
        <label className="text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}

