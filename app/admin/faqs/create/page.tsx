"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RichTextEditor from "@/shared/RichTextEditor";
import { faqCategories } from "@/types/backend.types";
import { adminFetch } from "@/lib/adminApiClient";

const inputClass = `
  mt-2 w-full px-4 py-3 rounded-md
  bg-slate-900/50 text-[#FDFBF7]
  placeholder:text-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition-colors
`;

export default function CreateFAQPage() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const [form, setForm] = useState(() => {
    const emptyForm = {
      category: "",
      question: "",
      answer: "",
      sourceUrl: "",
    };

    if (typeof window === "undefined") return emptyForm;

    const savedDraft = localStorage.getItem("lnat_faq_draft");
    if (!savedDraft) return emptyForm;

    try {
      return JSON.parse(savedDraft) as typeof emptyForm;
    } catch {
      return emptyForm;
    }
  });

  // Auto-save on each change so editors can safely resume unfinished FAQs.
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lnat_faq_draft", JSON.stringify(form));
    }
  }, [form]);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitFAQ = async (status: "draft" | "published") => {
    if (!form.category || !form.question || !form.answer) {
      toast.error("Category, question, and answer are required.");
      return;
    }

    const setLoading =
      status === "published" ? setIsPublishing : setIsSavingDraft;
    setLoading(true);

    try {
      const res = await adminFetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status }),
      });

      if (!res.ok) throw new Error("Failed to save FAQ");

      toast.success(
        status === "published"
          ? "FAQ published successfully!"
          : "FAQ draft saved to the database!",
      );
      localStorage.removeItem("lnat_faq_draft");
      router.push("/admin/faqs");
    } catch {
      toast.error(
        status === "published"
          ? "Failed to publish FAQ"
          : "Failed to save FAQ draft",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFAQ("published");
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#FDFBF7] flex items-center gap-2">
          ✍️ Create New FAQ
        </h1>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-[#C4A47C]/50 to-transparent" />
      </div>

      <form
        onSubmit={handlePublish}
        className="bg-[#0B1221] p-6 md:p-8 rounded-xl border border-slate-800 shadow-sm"
      >
        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="text-sm font-medium text-slate-400">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => updateForm("category", e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" className="bg-[#0B1221]">
                Select a category
              </option>
              {faqCategories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0B1221]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Question */}
          <div>
            <label className="text-sm font-medium text-slate-400">
              Question <span className="text-red-400">*</span>
            </label>
            <input
              required
              type="text"
              value={form.question}
              onChange={(e) => updateForm("question", e.target.value)}
              placeholder="e.g., What is a good LNAT score for Oxford?"
              className={inputClass}
            />
          </div>

          {/* Answer */}
          <div>
            <label className="text-sm font-medium text-slate-400">
              Answer <span className="text-red-400">*</span>
            </label>
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-800 text-gray-900">
              <RichTextEditor
              value={form.answer}
                onChange={(value) => updateForm("answer", value)}
                minHeight="35vh"
                maxHeight="50vh"
              />
            </div>
          </div>

          {/* Source URL */}
          <div>
            <label className="text-sm font-medium text-slate-400">
              Source URL
            </label>
            <input
              type="url"
              value={form.sourceUrl}
              onChange={(e) => updateForm("sourceUrl", e.target.value)}
              placeholder="https://www.example.com/official-guidance"
              className={inputClass}
            />
            <p className="mt-2 text-xs text-slate-500">
              Optional official source used to verify this answer.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex items-center gap-4 pt-6 border-t border-slate-800">
          <button
            type="submit"
            disabled={isPublishing || isSavingDraft}
            className="px-6 py-2.5 rounded-md bg-[#C4A47C] text-[#0B1221] font-medium hover:bg-[#b0916a] transition-colors disabled:opacity-50"
          >
            {isPublishing ? "Publishing..." : "Publish FAQ"}
          </button>

          <button
            type="button"
            onClick={() => submitFAQ("draft")}
            disabled={isPublishing || isSavingDraft}
            className="px-6 py-2.5 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {isSavingDraft ? "Saving Draft..." : "Save Draft & Exit"}
          </button>

          <span className="ml-auto text-xs text-slate-500 hidden sm:block">
            Auto-saving locally...
          </span>
        </div>
      </form>
    </div>
  );
}
