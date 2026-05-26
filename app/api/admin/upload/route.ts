import { NextResponse } from "next/server";
import { uploadAssetService } from "@/services/admin/uploadAssetService";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "LNAT_EXAM";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 400 },
      );
    }

    const uploadedAsset = await uploadAssetService(file, folder);

    return NextResponse.json({
      success: true,
      ...uploadedAsset,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to upload asset";
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
