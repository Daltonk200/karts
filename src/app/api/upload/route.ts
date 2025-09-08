import { NextRequest, NextResponse } from "next/server";
import { uploadMultipleImages, uploadSingleImage } from "@/lib/cloudinary";

// POST /api/upload - Upload images to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images") as File[];
    const folder = (formData.get("folder") as string) || "glowbeauty/products";

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    // Validate file types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file sizes (max 10MB per file)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = files.filter((file) => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 10MB per file." },
        { status: 400 }
      );
    }

    let uploadResults;

    if (files.length === 1) {
      // Upload single image
      const result = await uploadSingleImage(files[0], folder);
      uploadResults = [result];
    } else {
      // Upload multiple images
      uploadResults = await uploadMultipleImages(files, folder);
    }

    // Extract relevant data from upload results
    const uploadedImages = uploadResults.map((result: any) => ({
      publicId: result.public_id,
      secureUrl: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
    }));

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      count: uploadedImages.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}
