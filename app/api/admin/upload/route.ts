import { NextResponse } from "next/server";
import { uploadImageService } from "@/services/admin/uploadImageServices";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    // Default to 'LNAT_EXAM' if no folder is specified by the frontend
    const folder = (formData.get("folder") as string) || "LNAT_EXAM";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 400 },
      );
    }

    const imageUrl = await uploadImageService(file, folder);

    return NextResponse.json({
      success: true,
      url: imageUrl,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image" },
      { status: 500 },
    );
  }
}
