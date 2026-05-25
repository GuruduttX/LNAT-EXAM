"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Modular CMS Components
import CMSHeader from "@/components/Admin/CMS/CMSHeader";
import CMSMediaSection from "@/components/Admin/CMS/CMSMediaSection";
import CMSSeoSection from "@/components/Admin/CMS/CMSSeoSection";
import CMSSchema from "@/components/Admin/CMS/CMSSchema";
import CMSActions from "@/components/Admin/CMS/CMSActions";
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

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
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
    alt: "", // Used by CMSMediaSection
    metaTitle: "",
    metaDescription: "",
    schemaTitle: "",
    schemaDescription: "",
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

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 3. SAVE DRAFT HANDLER
  const handleSaveDraft = () => {
    toast.success("Draft saved locally!");
    router.push("/admin/universities");
  };

  // 4. PUBLISH HANDLER
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation check (excluding optional SEO/Schema fields if desired, but slug is required)
    const requiredFields = [
      "name",
      "slug",
      "location",
      "country",
      "established",
      "lnatRequirement",
      "globalRanking",
      "acceptanceRate",
      "applicationDeadline",
      "tuitionFee",
      "shortDescription",
      "overview",
      "image",
    ];

    const missing = requiredFields.filter(
      (key) => !form[key as keyof typeof form],
    );

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
      <CMSHeader editorType="University" />

      <form onSubmit={handlePublish} className="space-y-8">
        {/* TOP ROW: Basic Info & Admissions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION 1: Basic Information */}
          <div className="bg-[#0B1221] p-6 rounded-xl border border-slate-800 space-y-5 shadow-sm">
            <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div>
                <label className={labelClass}>
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => updateForm("slug", e.target.value)}
                  className={inputClass}
                  placeholder="e.g., university-of-oxford"
                />
              </div>
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

        {/* SECTION 3: Reusable Media Upload */}
        <CMSMediaSection
          image={form.image}
          alt={form.alt}
          onChange={updateForm}
          editorType="University"
        />

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

          <div className="text-gray-900 border border-slate-800 rounded-xl overflow-hidden">
            <RichTextEditor
              value={form.overview}
              onChange={(val) => updateForm("overview", val)}
              minHeight="60vh"
              maxHeight="65vh"
            />
          </div>
        </div>

        {/* SECTION 5: SEO and Schema */}
        <CMSSeoSection
          metaTitle={form.metaTitle}
          metaDescription={form.metaDescription}
          onChange={updateForm}
          editorType="University"
        />

        <CMSSchema
          schemaTitle={form.schemaTitle}
          schemaDescription={form.schemaDescription}
          onChange={updateForm}
          editorType="University"
        />

        {/* Reusable Actions Bar */}
        <CMSActions
          actionType="create"
          editorType="University"
          onSaveDraft={handleSaveDraft}
          loading={isPublishing}
        />
      </form>
    </div>
  );
}
