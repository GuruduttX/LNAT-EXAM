"use client";

export async function uploadCmsImage(file: File, folder: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success || !data.url) {
    throw new Error(data.error || data.message || "Upload failed");
  }

  return data.url as string;
}
