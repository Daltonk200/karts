"use client";

import Select, { StylesConfig, GroupBase } from 'react-select';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  error?: string;
  onCreateOption?: (inputValue: string) => void;
  isLoading?: boolean;
}

export default function SearchableSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = 'Select...',
  required = false,
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  error,
  onCreateOption,
  isLoading = false,
}: SearchableSelectProps<T>) {
  const customStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
    control: (base, state) => ({
      ...base,
      borderColor: error ? '#dc2626' : state.isFocused ? '#dc2626' : '#d1d5db',
      borderWidth: '1px',
      borderRadius: '0.5rem',
      padding: '0.125rem',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(220, 38, 38, 0.1)' : 'none',
      '&:hover': {
        borderColor: error ? '#dc2626' : '#dc2626',
      },
      minHeight: '42px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#dc2626'
        : state.isFocused
        ? '#fef2f2'
        : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#dc2626',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#fef2f2',
      borderRadius: '0.25rem',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#dc2626',
      fontWeight: '500',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#dc2626',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#dc2626',
        color: 'white',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
    }),
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            styles={customStyles}
            placeholder={placeholder}
            isMulti={isMulti}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isLoading={isLoading}
            value={
              isMulti
                ? options.filter((option) =>
                    (field.value as string[])?.includes(option.value)
                  )
                : options.find((option) => option.value === field.value) || null
            }
            onChange={(newValue) => {
              if (isMulti) {
                field.onChange(
                  (newValue as Option[]).map((option) => option.value)
                );
              } else {
                field.onChange((newValue as Option)?.value || '');
              }
            }}
            onCreateOption={onCreateOption}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        )}
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

