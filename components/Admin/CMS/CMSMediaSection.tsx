"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { adminFetch } from "@/lib/adminApiClient";

type EditorType = "Blog" | "University" | "FAQ" | "Resource" | "Category";

interface CMSMediaSectionProps {
  image: string;
  alt: string;
  editorType: EditorType;
  onChange: (field: "image" | "alt", value: string) => void;
}

const CMSMediaSection = ({
  image,
  alt,
  onChange,
  editorType,
}: CMSMediaSectionProps) => {
  const [loading, setLoading] = useState(false);

  // next/image calls `new URL()` on the src, which throws on a non-URL value
  // (e.g. a leftover placeholder). Only treat absolute URLs or root-relative
  // paths as renderable; anything else falls back to the upload prompt.
  const isRenderableSrc =
    /^https?:\/\//i.test(image) || image.startsWith("/");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    if (file.type !== "image/webp") {
      toast.error("Only WEBP images are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", `LNAT_EXAM/${editorType}s`); // Adjusted for LNAT

    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        toast.error("Upload failed");
        return;
      }

      onChange("image", data.url);
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-[#0B1221] p-6 rounded-xl border border-slate-800 shadow-sm">
      <div>
        <label className="text-sm font-medium text-slate-400">
          {editorType} Hero Image
        </label>

        <label
          htmlFor="image-upload"
          className="relative mt-3 block rounded-xl border-2 border-dashed border-slate-700
            p-6 text-center cursor-pointer bg-slate-900/30
            hover:border-[#C4A47C]/50 hover:bg-slate-800/50
            transition overflow-hidden"
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
              <div className="w-10 h-10 border-4 border-[#C4A47C]/30 border-t-[#C4A47C] rounded-full animate-spin"></div>
            </div>
          )}

          {isRenderableSrc ? (
            <Image
              src={image}
              alt={alt}
              width={640}
              height={320}
              className="mx-auto max-h-40 w-auto rounded-lg object-contain"
            />
          ) : (
            <>
              <p className="text-slate-400 text-sm">
                Drag & drop image or{" "}
                <span className="text-[#C4A47C]">Browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Only .webp up to 2MB
              </p>
            </>
          )}

          <input
            id="image-upload"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-400">
          Alt Tag For Image
        </label>
        <input
          value={alt}
          required
          onChange={(e) => onChange("alt", e.target.value)}
          placeholder="Describe the image for SEO"
          className={`mt-2 w-full px-5 py-3 rounded-xl bg-slate-900/50 text-[#FDFBF7] placeholder-slate-600 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50 transition`}
        />
      </div>
    </div>
  );
};

export default CMSMediaSection;
