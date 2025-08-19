"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
  onImageUpload: (urls: string[]) => void;
  currentImages?: string[];
  label?: string;
}

export default function ImageUpload({
  onImageUpload,
  currentImages = [],
  label = "Upload Images",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }

    const oversizedFiles = imageFiles.filter(
      (file) => file.size > 5 * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      toast.error("Some images are larger than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const uploadPromises = imageFiles.map(async (file) => {
        const base64 = await fileToBase64(file);
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64 }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();
        return data.url;
      });

      const urls = await Promise.all(uploadPromises);
      onImageUpload(urls);
      toast.success(`${urls.length} images uploaded successfully!`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload images. Please check your Cloudinary configuration."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    onImageUpload(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Current Images Preview */}
      {currentImages.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images ({currentImages.length})
            {currentImages.length > 0 && (
              <span className="text-xs text-gray-500 ml-2">
                (First image is the main display image)
              </span>
            )}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  title="Remove image"
                >
                  ×
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="text-sm text-gray-600">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-medium text-blue-600 hover:text-blue-500"
                disabled={isUploading}
              >
                {currentImages.length > 0
                  ? "Add More Images"
                  : "Click to upload"}
              </button>{" "}
              or drag and drop
            </div>

            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB - Select multiple images
            </p>
          </div>

          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Uploading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
