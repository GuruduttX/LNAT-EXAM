"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CMSActions from "@/components/Admin/CMS/CMSActions";
import CMSHeader from "@/components/Admin/CMS/CMSHeader";
import CMSMediaSection from "@/components/Admin/CMS/CMSMediaSection";
import CMSSeoSection from "@/components/Admin/CMS/CMSSeoSection";
import CMSSchema from "@/components/Admin/CMS/CMSSchema";
import { getCmsErrorMessage } from "@/components/Admin/CMS/getCmsErrorMessage";
import { adminFetch } from "@/lib/adminApiClient";
import RichTextEditor from "@/shared/RichTextEditor";
import { IBlog } from "@/types/backend.types";

const inputClass = `
  w-full px-4 py-3 rounded-md
  bg-slate-900/50 text-[#FDFBF7]
  placeholder:text-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition-colors
`;

const textareaClass = `${inputClass} min-h-[120px]`;
const labelClass = "block text-sm font-medium text-slate-400 mb-2";
const sectionClass =
  "bg-[#0B1221] p-6 rounded-xl border border-slate-800 space-y-5 shadow-sm";

const blogCategories = [
  "Admissions Advice",
  "LNAT Preparation",
  "University Specifics",
  "Essay Writing",
  "Success Stories",
  "Comparisons",
  "Studying Law in the UK",
];

const LOCKED_BLOG_AUTHOR = {
  name: "Mr. Alastair Murray",
  role: "LNAT Mentor",
} as const;

type FAQItem = { question: string; answer: string };

interface BlogFormProps {
  mode: "create" | "edit";
  initialData?: Partial<IBlog> & { _id?: string };
}

const emptyFaq = (): FAQItem => ({ question: "", answer: "" });

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getWordCount(html: string) {
  const text = stripHtml(html);
  return text ? text.split(" ").length : 0;
}

function getReadTime(html: string) {
  const words = getWordCount(html);
  return words > 0 ? Math.max(1, Math.ceil(words / 220)) : 0;
}

function createInitialState(initialData?: Partial<IBlog> & { _id?: string }) {
  return {
    title: initialData?.title || "",
    category: initialData?.category || "",
    primaryCategorySlug: initialData?.primaryCategorySlug || "",
    slug: initialData?.slug || "",
    image: initialData?.image || initialData?.featuredImage || "",
    alt: initialData?.alt || initialData?.heroImage?.alt || "",
    excerpt: initialData?.excerpt || "",
    tldr: initialData?.tldr || "",
    keyTakeaways: (initialData?.keyTakeaways || []).join("\n"),
    tags: (initialData?.tags || []).join(", "),
    content: initialData?.content || "",
    sources: (initialData?.sources || []).join("\n"),
    relatedPostSlugs: (initialData?.relatedPostSlugs || []).join("\n"),
    isCornerstone: initialData?.isCornerstone || false,
    freshnessReviewDue: initialData?.freshnessReviewDue
      ? initialData.freshnessReviewDue.slice(0, 10)
      : "",
    wordCountTarget: String(initialData?.wordCountTarget || ""),
    metaTitle: initialData?.meta?.title || "",
    metaDescription: initialData?.meta?.description || "",
    schemaTitle: initialData?.structuredData?.title || "",
    schemaDescription: initialData?.structuredData?.description || "",
    status: initialData?.status || "draft",
    faqs: initialData?.faqs?.length ? initialData.faqs : [emptyFaq(), emptyFaq(), emptyFaq()],
  };
}

type BlogFormState = ReturnType<typeof createInitialState>;

export default function BlogForm({ mode, initialData }: BlogFormProps) {
  const router = useRouter();
  const storageKey = useMemo(
    () =>
      mode === "create"
        ? "lnat_blog_draft_v2"
        : `lnat_blog_edit_${initialData?._id || "draft"}`,
    [initialData?._id, mode],
  );

  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [form, setForm] = useState<BlogFormState>(() => {
    if (mode === "create" && typeof window !== "undefined") {
      const savedDraft = window.localStorage.getItem(storageKey);
      if (savedDraft) {
        try {
          return { ...createInitialState(initialData), ...JSON.parse(savedDraft) };
        } catch {
          return createInitialState(initialData);
        }
      }
    }

    return createInitialState(initialData);
  });

  const persistDraft = (nextForm: BlogFormState) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(nextForm));
    }
  };

  const updateForm = (field: string, value: string | boolean) => {
    setForm((prev: BlogFormState) => {
      const next = { ...prev, [field]: value };
      persistDraft(next);
      return next;
    });
  };

  const updateFaq = (index: number, key: keyof FAQItem, value: string) => {
    setForm((prev: BlogFormState) => {
      const nextFaqs = [...prev.faqs];
      nextFaqs[index] = { ...nextFaqs[index], [key]: value };
      const next = { ...prev, faqs: nextFaqs };
      persistDraft(next);
      return next;
    });
  };

  const addFaq = () => {
    setForm((prev: BlogFormState) => {
      const next = { ...prev, faqs: [...prev.faqs, emptyFaq()] };
      persistDraft(next);
      return next;
    });
  };

  const removeFaq = (index: number) => {
    setForm((prev: BlogFormState) => {
      const nextFaqs = prev.faqs.filter(
        (_: FAQItem, itemIndex: number) => itemIndex !== index,
      );
      const next = {
        ...prev,
        faqs: nextFaqs.length ? nextFaqs : [emptyFaq(), emptyFaq(), emptyFaq()],
      };
      persistDraft(next);
      return next;
    });
  };

  const toLines = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const buildPayload = (statusOverride: "draft" | "published") => {
    const wordCount = getWordCount(form.content);
    const readTime = getReadTime(form.content);
    const publishedAt =
      statusOverride === "published" && mode === "create"
        ? new Date().toISOString()
        : initialData?.publishedAt || new Date().toISOString();

    return {
      title: form.title,
      category: form.category,
      primaryCategorySlug: form.primaryCategorySlug || undefined,
      slug: form.slug,
      author: {
        name: LOCKED_BLOG_AUTHOR.name,
        role: LOCKED_BLOG_AUTHOR.role,
      },
      excerpt: form.excerpt,
      tldr: form.tldr || undefined,
      keyTakeaways: toLines(form.keyTakeaways),
      image: form.image,
      featuredImage: form.image,
      heroImage: form.image
        ? {
            url: form.image,
            alt: form.alt || `${form.title} hero image`,
            category: "hero",
          }
        : undefined,
      alt: form.alt,
      content: form.content,
      meta: {
        title: form.metaTitle,
        description: form.metaDescription,
      },
      structuredData: {
        title: form.schemaTitle || "",
        description: form.schemaDescription || "",
      },
      tags: form.tags
        .split(",")
        .map((item: string) => item.trim())
        .filter(Boolean),
      faqs: form.faqs.filter(
        (item: FAQItem) => item.question.trim() && item.answer.trim(),
      ),
      sources: toLines(form.sources),
      relatedPostSlugs: toLines(form.relatedPostSlugs),
      isCornerstone: form.isCornerstone,
      freshnessReviewDue: form.freshnessReviewDue || undefined,
      wordCountTarget: form.wordCountTarget ? Number(form.wordCountTarget) : undefined,
      wordCount,
      readTime,
      publishedAt,
      status: statusOverride,
    };
  };

  const submitBlog = async (statusOverride: "draft" | "published") => {
    const requiredFields =
      statusOverride === "published"
        ? [
            form.title,
            form.category,
            form.primaryCategorySlug,
            form.slug,
            form.image,
            form.alt,
            form.excerpt,
            form.tldr,
            form.content,
            form.metaTitle,
            form.metaDescription,
          ]
        : [form.title, form.slug, form.image];

    if (requiredFields.some((field) => !field.trim())) {
      toast.error(
        statusOverride === "published"
          ? "Please complete the core SOP fields before publishing."
          : "Title, slug, and hero image are required to save a draft.",
      );
      return;
    }

    const tldrWordCount = form.tldr ? stripHtml(form.tldr).split(" ").filter(Boolean).length : 0;
    if (statusOverride === "published" && (tldrWordCount < 40 || tldrWordCount > 60)) {
      toast.error("TL;DR should be between 40 and 60 words.");
      return;
    }

    const validFaqs = form.faqs.filter(
      (item: FAQItem) => item.question.trim() && item.answer.trim(),
    );
    if (statusOverride === "published" && validFaqs.length < 3) {
      toast.error("Please add at least 3 FAQs before publishing.");
      return;
    }

    const setter =
      statusOverride === "published" ? setIsPublishing : setIsSavingDraft;
    setter(true);

    try {
      const payload = buildPayload(statusOverride);
      const endpoint =
        mode === "create"
          ? "/api/blogs"
          : `/api/blogs/admin/${initialData?._id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await adminFetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          await getCmsErrorMessage(response, "Failed to save blog"),
        );
      }

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(storageKey);
      }

      toast.success(
        statusOverride === "published"
          ? mode === "create"
            ? "Blog published successfully"
            : "Blog updated successfully"
          : "Blog draft saved successfully",
      );

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : statusOverride === "published"
            ? "Failed to publish blog"
            : "Failed to save draft",
      );
    } finally {
      setter(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      <CMSHeader editorType="Blog" />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submitBlog("published");
        }}
        className="space-y-8"
      >
        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">Core Blog Setup</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Blog Title</label>
              <input
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
                placeholder="e.g. LNAT Syllabus 2026"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                value={form.slug}
                onChange={(event) => updateForm("slug", event.target.value)}
                placeholder="e.g. lnat-syllabus-2026"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Display Category</label>
              <select
                value={form.category}
                onChange={(event) => updateForm("category", event.target.value)}
                className={inputClass}
              >
                <option value="">Select Category</option>
                {blogCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Primary Category Hub Slug</label>
              <input
                value={form.primaryCategorySlug}
                onChange={(event) =>
                  updateForm("primaryCategorySlug", event.target.value)
                }
                placeholder="e.g. lnat-guide"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>Author</label>
              <div className="rounded-md border border-slate-800 bg-slate-900/50 px-4 py-3">
                <p className="text-sm font-semibold text-[#FDFBF7]">
                  {LOCKED_BLOG_AUTHOR.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {LOCKED_BLOG_AUTHOR.role}
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Blog authorship is locked for editorial consistency, so every
                  post uses the same trusted publisher identity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CMSMediaSection
          image={form.image}
          alt={form.alt}
          onChange={(field, value) => updateForm(field, value)}
          editorType="Blog"
        />

        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">
            Answer Layer
          </h2>
          <div>
            <label className={labelClass}>Archive Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(event) => updateForm("excerpt", event.target.value)}
              placeholder="Short summary for archive cards and the blog hero."
              className={textareaClass}
            />
          </div>
          <div>
            <label className={labelClass}>TL;DR (40 to 60 words)</label>
            <textarea
              value={form.tldr}
              onChange={(event) => updateForm("tldr", event.target.value)}
              placeholder="Concise top-of-page answer for snippets and LLM extraction."
              className={textareaClass}
            />
          </div>
          <div>
            <label className={labelClass}>Key Takeaways</label>
            <textarea
              value={form.keyTakeaways}
              onChange={(event) =>
                updateForm("keyTakeaways", event.target.value)
              }
              placeholder={"One takeaway per line"}
              className={textareaClass}
            />
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">
            Main Article Content
          </h2>
          <p className="text-sm leading-7 text-slate-400">
            Write the full blog body in the editor below. This is the HTML that will
            be rendered on the individual blog page.
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-800 text-gray-900">
            <RichTextEditor
              value={form.content}
              onChange={(value) => updateForm("content", value)}
              minHeight="70vh"
              maxHeight="75vh"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Tags</label>
              <input
                value={form.tags}
                onChange={(event) => updateForm("tags", event.target.value)}
                placeholder="LNAT, syllabus, India"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Related Post Slugs</label>
              <textarea
                value={form.relatedPostSlugs}
                onChange={(event) =>
                  updateForm("relatedPostSlugs", event.target.value)
                }
                placeholder={"One related blog slug per line"}
                className={textareaClass}
              />
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#FDFBF7]">Post FAQs</h2>
            <button
              type="button"
              onClick={addFaq}
              className="text-sm font-medium text-[#C4A47C]"
            >
              + Add FAQ
            </button>
          </div>

          <div className="space-y-5">
            {form.faqs.map((faq: FAQItem, index: number) => (
              <div
                key={`faq-${index}`}
                className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-300">
                    FAQ {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-xs font-medium text-rose-400"
                  >
                    Remove
                  </button>
                </div>
                <input
                  value={faq.question}
                  onChange={(event) =>
                    updateFaq(index, "question", event.target.value)
                  }
                  placeholder="Question"
                  className={inputClass}
                />
                <textarea
                  value={faq.answer}
                  onChange={(event) =>
                    updateFaq(index, "answer", event.target.value)
                  }
                  placeholder="Answer"
                  className={textareaClass}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">
            Trust + Freshness
          </h2>
          <div>
            <label className={labelClass}>Sources</label>
            <textarea
              value={form.sources}
              onChange={(event) => updateForm("sources", event.target.value)}
              placeholder={"One source URL per line"}
              className={textareaClass}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <label className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-900/30 px-4 py-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.isCornerstone}
                onChange={(event) =>
                  updateForm("isCornerstone", event.target.checked)
                }
              />
              Cornerstone Post
            </label>
            <div>
              <label className={labelClass}>Freshness Review Due</label>
              <input
                type="date"
                value={form.freshnessReviewDue}
                onChange={(event) =>
                  updateForm("freshnessReviewDue", event.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Word Count Target</label>
              <input
                type="number"
                min="0"
                value={form.wordCountTarget}
                onChange={(event) =>
                  updateForm("wordCountTarget", event.target.value)
                }
                placeholder="e.g. 1800"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <CMSSeoSection
          metaTitle={form.metaTitle}
          metaDescription={form.metaDescription}
          onChange={(field: string, value: string) => updateForm(field, value)}
          editorType="Blog"
        />

        <CMSSchema
          schemaTitle={form.schemaTitle}
          schemaDescription={form.schemaDescription}
          onChange={(field: string, value: string) => updateForm(field, value)}
          editorType="Blog"
        />

        <CMSActions
          actionType={mode === "create" ? "create" : "update"}
          editorType="Blog"
          onSaveDraft={() => void submitBlog("draft")}
          loading={isPublishing || isSavingDraft}
        />
      </form>
    </div>
  );
}
