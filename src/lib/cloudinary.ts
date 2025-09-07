import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload multiple images
export const uploadMultipleImages = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "glowbeauty/products",
            transformation: [
              { width: 800, height: 800, crop: "fill", quality: "auto" },
              { format: "webp" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });
  });

  return Promise.all(uploadPromises);
};

// Helper function to upload single image
export const uploadSingleImage = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "glowbeauty/products",
          transformation: [
            { width: 800, height: 800, crop: "fill", quality: "auto" },
            { format: "webp" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
};

// Helper function to delete images
export const deleteImages = async (publicIds: string[]) => {
  if (publicIds.length === 0) return;

  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error("Error deleting images:", error);
    throw error;
  }
};

export default cloudinary;
