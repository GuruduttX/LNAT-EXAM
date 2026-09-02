"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import RichTextEditor from "@/shared/RichTextEditor";
import FaqPasteHint from "@/components/Admin/CMS/FaqPasteHint";
import { handleSingleFaqPaste } from "@/components/Admin/CMS/handleSingleFaqPaste";
import { faqCategories } from "@/types/backend.types";
import { adminFetch } from "@/lib/adminApiClient";
import { faqAnswerToHtml } from "@/lib/faqParser";
 
const inputClass = `
  mt-2 w-full px-4 py-3 rounded-md
  bg-slate-900/50 text-[#FDFBF7]
  placeholder:text-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition-colors
`;

export default function EditFAQPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const [form, setForm] = useState({
    category: "",
    question: "",
    answer: "",
    sourceUrl: "",
  });

  // 1. Fetch the existing FAQ data
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const res = await adminFetch(`/api/faqs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch FAQ");

        const data = await res.json();
        setForm({
          category: data.category || "",
          question: data.question || "",
          answer: data.answer || "",
          sourceUrl: data.sourceUrl || "",
        });
      } catch (error) {
        toast.error("Error loading FAQ data");
        console.log(error)
        // router.push("/admin/faqs");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchFAQ();
  }, [id, router]);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onQuestionPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    handleSingleFaqPaste(event, (pair) => {
      setForm((prev) => ({
        ...prev,
        question: pair.question,
        answer: faqAnswerToHtml(pair.answer),
      }));
    });
  };

  const submitFAQ = async (status: "draft" | "published") => {
    if (!form.category || !form.question || !form.answer) {
      toast.error("Category, question, and answer are required.");
      return;
    }

    const setLoading = status === "published" ? setIsUpdating : setIsSavingDraft;
    setLoading(true);

    try {
      const res = await adminFetch(`/api/faqs/${id}`, {
        method: "PUT", // Use PUT for updating
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status }),
      });

      if (!res.ok) throw new Error("Failed to save FAQ");

      toast.success(
        status === "published"
          ? "FAQ published successfully!"
          : "FAQ draft saved to the database!",
      );
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFAQ("published");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-slate-400">Loading FAQ data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#FDFBF7] flex items-center gap-2">
          ✍️ Edit FAQ
        </h1>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-[#C4A47C]/50 to-transparent" />
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-[#0B1221] p-6 md:p-8 rounded-xl border border-slate-800 shadow-sm"
      >
        <div className="space-y-6">
          <FaqPasteHint variant="single" />

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
              onPaste={onQuestionPaste}
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
            disabled={isUpdating || isSavingDraft}
            className="px-6 py-2.5 rounded-md bg-[#C4A47C] text-[#0B1221] font-medium hover:bg-[#b0916a] transition-colors disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update FAQ"}
          </button>

          <button
            type="button"
            onClick={() => submitFAQ("draft")}
            disabled={isUpdating || isSavingDraft}
            className="px-6 py-2.5 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {isSavingDraft ? "Saving Draft..." : "Save Draft & Exit"}
          </button>
        </div>
      </form>
    </div>
  );
}
