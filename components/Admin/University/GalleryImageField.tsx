"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { IMediaAsset } from "@/types/backend.types";
import { uploadCmsImage } from "./uploadCmsImage";

const inputClass = `
  w-full px-4 py-3 rounded-md
  bg-slate-900/50 text-[#FDFBF7]
  placeholder:text-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition-colors
`;

interface GalleryImageFieldProps {
  folder: string;
  image: IMediaAsset;
  onChange: (key: keyof IMediaAsset, value: string) => void;
  onRemove: () => void;
}

export default function GalleryImageField({
  folder,
  image,
  onChange,
  onRemove,
}: GalleryImageFieldProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    if (file.type !== "image/webp") {
      toast.error("Only WEBP images are allowed");
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await uploadCmsImage(file, folder);
      onChange("url", imageUrl);

      if (!image.alt) {
        onChange("alt", "Describe this image for accessibility and SEO");
      }

      toast.success("Gallery image uploaded");
    } catch {
      toast.error("Failed to upload gallery image");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.4fr_1.2fr_auto] gap-4 items-start border border-slate-800 rounded-lg p-4">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-400">
          Image
        </label>

        <label
          className="flex min-h-32 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-slate-700 bg-slate-900/30 p-3 text-center hover:border-[#C4A47C]/50 hover:bg-slate-800/40 transition"
          htmlFor={`gallery-upload-${folder}-${image.url || "new"}`}
        >
          {isUploading ? (
            <div className="h-8 w-8 rounded-full border-4 border-[#C4A47C]/30 border-t-[#C4A47C] animate-spin" />
          ) : image.url ? (
            <Image
              src={image.url}
              alt={image.alt || "Gallery preview"}
              width={224}
              height={112}
              className="max-h-28 w-auto rounded-md object-cover"
            />
          ) : (
            <div>
              <p className="text-sm text-slate-300">Upload WEBP image</p>
              <p className="mt-1 text-xs text-slate-500">Max 2MB</p>
            </div>
          )}
        </label>

        <input
          id={`gallery-upload-${folder}-${image.url || "new"}`}
          type="file"
          accept=".webp,image/webp"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-400">
          Alt Text
        </label>
        <input
          className={inputClass}
          placeholder="Describe the image"
          value={image.alt}
          onChange={(event) => onChange("alt", event.target.value)}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-400">
          Caption
        </label>
        <input
          className={inputClass}
          placeholder="Optional caption"
          value={image.caption || ""}
          onChange={(event) => onChange("caption", event.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="pt-10 text-sm text-red-400 hover:text-red-300 transition-colors"
      >
        Remove
      </button>
    </div>
  );
}
