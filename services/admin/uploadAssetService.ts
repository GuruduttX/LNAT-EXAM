import cloudinary from "@/lib/cloudinary";

interface UploadAssetResult {
  secure_url: string;
  public_id?: string;
  format?: string;
  bytes?: number;
  resource_type?: string;
  original_filename?: string;
}

export const uploadAssetService = async (file: File, folder: string) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const isPdf = file.type === "application/pdf";

  const upload = await new Promise<UploadAssetResult>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Upload failed"));
            return;
          }

          resolve(result as UploadAssetResult);
        },
      )
      .end(buffer);
  });

  return {
    url: upload.secure_url,
    publicId: upload.public_id,
    format: upload.format,
    bytes: upload.bytes,
    resourceType: upload.resource_type,
    originalFilename: upload.original_filename,
  };
};
