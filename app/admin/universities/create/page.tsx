"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import RichTextEditor from "@/shared/RichTextEditor";

const lnatStatuses = ["Required", "Not Required", "Optional"];

const inputClass = `
  w-full px-4 py-3 rounded-md
  bg-slate-900/50 text-[#FDFBF7]
  placeholder:text-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition-colors
`;

const labelClass = "block text-sm font-medium text-slate-400 mb-2";

export default function CreateUniversityPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    country: "",
    established: "",
    lnatRequirement: "",
    globalRanking: "",
    acceptanceRate: "",
    applicationDeadline: "",
    tuitionFee: "",
    shortDescription: "",
    overview: "", // Stores HTML string
    image: "", // Stores Cloudinary URL
  });

  // 1. READ EFFECT (Load from local storage)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem("lnat_uni_draft");
      if (savedDraft) setForm(JSON.parse(savedDraft));
      setIsLoaded(true);
    }
  }, []);

  // 2. WRITE EFFECT (Auto-save)
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("lnat_uni_draft", JSON.stringify(form));
    }
  }, [form, isLoaded]);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 3. IMAGE UPLOAD HANDLER
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // --- VALIDATION START ---

    // 1. Check if the file is a WEBP image
    if (file.type !== "image/webp") {
      toast.error("Only WEBP images are allowed.");
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
      return;
    }

    // 2. Check if the file size is under 500KB (500 * 1024 bytes)
    const maxSizeInBytes = 500 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("Image size must be less than 500KB.");
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
      return;
    }

    // --- VALIDATION END ---

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "LNAT_EXAM/UNIVERSITY");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        updateForm("image", data.url);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 4. PUBLISH HANDLER
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation check
    const requiredFields = Object.keys(form) as (keyof typeof form)[];
    const missing = requiredFields.filter((key) => !form[key]);

    if (missing.length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsPublishing(true);
    try {
      const res = await fetch("/api/universities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to publish");

      toast.success("University added successfully!");
      localStorage.removeItem("lnat_uni_draft");
      router.push("/admin/universities");
    } catch (error) {
      toast.error("Failed to add university");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#FDFBF7]">
            Add New University
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Create a new entry in the LNAT directory
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 hidden sm:block">
            Auto-saving draft locally...
          </span>
          <button
            onClick={() => {
              toast.success("Draft saved!");
              router.push("/admin/universities");
            }}
            className="px-5 py-2 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            Save & Exit
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing || isUploading}
            className="px-5 py-2 rounded-md bg-[#C4A47C] text-[#0B1221] font-medium hover:bg-[#b0916a] transition-colors disabled:opacity-50 text-sm"
          >
            {isPublishing ? "Publishing..." : "Publish University"}
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-slate-800 mb-8" />

      <form className="space-y-8">
        {/* TOP ROW: Basic Info & Admissions (Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION 1: Basic Information */}
          <div className="bg-[#0B1221] p-6 rounded-xl border border-slate-800 space-y-5 shadow-sm">
            <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
              Basic Information
            </h2>

            <div>
              <label className={labelClass}>
                University Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                className={inputClass}
                placeholder="e.g., University of Oxford"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  City/Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => updateForm("location", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., Oxford"
                />
              </div>
              <div>
                <label className={labelClass}>
                  Country <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => updateForm("country", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., United Kingdom"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Year Established <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.established}
                  onChange={(e) => updateForm("established", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., 1096"
                />
              </div>
              <div>
                <label className={labelClass}>
                  Global Ranking <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.globalRanking}
                  onChange={(e) => updateForm("globalRanking", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., 1"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Admissions & Details */}
          <div className="bg-[#0B1221] p-6 rounded-xl border border-slate-800 space-y-5 shadow-sm">
            <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
              Admissions & Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  LNAT Requirement <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.lnatRequirement}
                  onChange={(e) =>
                    updateForm("lnatRequirement", e.target.value)
                  }
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" className="bg-[#0B1221]">
                    Select Status
                  </option>
                  {lnatStatuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-[#0B1221]"
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  Acceptance Rate <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.acceptanceRate}
                  onChange={(e) => updateForm("acceptanceRate", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., 17.5%"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Application Deadline <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.applicationDeadline}
                  onChange={(e) =>
                    updateForm("applicationDeadline", e.target.value)
                  }
                  className={inputClass}
                  placeholder="e.g., 15 October 2025"
                />
              </div>
              <div>
                <label className={labelClass}>
                  Tuition Fee <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.tuitionFee}
                  onChange={(e) => updateForm("tuitionFee", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., £9,250 / year"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Short Description (Archive Card){" "}
                <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={2}
                value={form.shortDescription}
                onChange={(e) => updateForm("shortDescription", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="A brief summary for the university card..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Hero Image Upload */}
        <div className="bg-[#0B1221] p-6 rounded-xl border border-slate-800 shadow-sm">
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            University Hero Image
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {form.image ? (
              <div className="relative w-full sm:w-72 h-40 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0 shadow-inner">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateForm("image", "")}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500/80 rounded-md backdrop-blur-sm text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-72 h-40 rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center text-slate-500 hover:border-[#C4A47C]/50 hover:text-[#C4A47C] transition-colors cursor-pointer shrink-0"
              >
                <ImageIcon size={32} className="mb-2" />
                <span className="text-sm font-medium">
                  Click to upload WEBP image
                </span>
                <span className="text-xs mt-1 opacity-70">Max size: 500KB</span>
              </div>
            )}

            <div className="flex-1">
              <input
                type="file"
                accept="image/webp"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />

              {isUploading ? (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-[#C4A47C] animate-pulse">
                    Uploading to Cloudinary securely...
                  </p>
                  <div className="w-full max-w-xs h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C4A47C] w-1/2 animate-pulse rounded-full" />
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-400 space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    Upload a high-quality WEBP image.
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    Ensure file size is strictly under 500KB.
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    The image URL is securely managed by the system.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4: Detailed HTML Overview */}
        <div className="bg-[#0B1221] p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex justify-between items-end border-b border-slate-800 pb-3 mb-5">
            <div>
              <h2 className="text-lg font-medium text-[#FDFBF7]">
                Comprehensive Overview
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Use the rich text editor to format headings, links, and tables.
                This content renders directly on the individual university page.
              </p>
            </div>
          </div>

          <div className="text-gray-900">
            <RichTextEditor
              value={form.overview}
              onChange={(val) => updateForm("overview", val)}
              minHeight="60vh"
              maxHeight="65vh"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
