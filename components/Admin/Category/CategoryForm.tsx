"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CMSActions from "@/components/Admin/CMS/CMSActions";
import CMSHeader from "@/components/Admin/CMS/CMSHeader";
import CMSMediaSection from "@/components/Admin/CMS/CMSMediaSection";
import CMSSeoSection from "@/components/Admin/CMS/CMSSeoSection";
import { ICategory } from "@/types/backend.types";

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

type CategoryFaqItem = { question: string; answer: string };
type CategorySubtopicFormItem = {
  title: string;
  description: string;
  postSlugsText: string;
  universitySlugsText: string;
};

interface CategoryFormProps {
  mode: "create" | "edit";
  initialData?: Partial<ICategory> & { _id?: string; id?: string };
}

const emptyFaq = (): CategoryFaqItem => ({ question: "", answer: "" });
const emptySubtopic = (): CategorySubtopicFormItem => ({
  title: "",
  description: "",
  postSlugsText: "",
  universitySlugsText: "",
});

function createInitialState(
  initialData?: Partial<ICategory> & { _id?: string; id?: string },
) {
  return {
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    primaryKeyword: initialData?.primaryKeyword || "",
    intro: initialData?.intro || "",
    topicDefinition: initialData?.topicDefinition || "",
    parentCategorySlug: initialData?.parentCategorySlug || "",
    image: initialData?.heroImage?.url || "",
    alt: initialData?.heroImage?.alt || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    featuredPostSlugs: (initialData?.featuredPostSlugs || []).join("\n"),
    featuredUniversitySlugs: (initialData?.featuredUniversitySlugs || []).join(
      "\n",
    ),
    relatedCategorySlugs: (initialData?.relatedCategorySlugs || []).join("\n"),
    ctaLabel: initialData?.cta?.label || "",
    ctaHref: initialData?.cta?.href || "",
    ctaType: initialData?.cta?.type || "primary",
    isIndexed: initialData?.isIndexed ?? true,
    minPostsToIndex: String(initialData?.minPostsToIndex || 4),
    postOrder: initialData?.postOrder || "curated",
    faqs: initialData?.faqs?.length ? initialData.faqs : [emptyFaq()],
    subtopics: initialData?.subtopics?.length
      ? initialData.subtopics.map((subtopic) => ({
          title: subtopic.title || "",
          description: subtopic.description || "",
          postSlugsText: (subtopic.postSlugs || []).join("\n"),
          universitySlugsText: (subtopic.universitySlugs || []).join("\n"),
        }))
      : [emptySubtopic()],
  };
}

type CategoryFormState = ReturnType<typeof createInitialState>;

export default function CategoryForm({
  mode,
  initialData,
}: CategoryFormProps) {
  const router = useRouter();
  const storageKey = useMemo(
    () =>
      mode === "create"
        ? "lnat_category_draft_v1"
        : `lnat_category_edit_${initialData?.id || initialData?._id || "draft"}`,
    [initialData?._id, initialData?.id, mode],
  );

  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [form, setForm] = useState<CategoryFormState>(() => {
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

  const persistDraft = (nextForm: CategoryFormState) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(nextForm));
    }
  };

  const updateForm = (field: string, value: string | boolean) => {
    setForm((prev: CategoryFormState) => {
      const next = { ...prev, [field]: value };
      persistDraft(next);
      return next;
    });
  };

  const updateFaq = (index: number, key: keyof CategoryFaqItem, value: string) => {
    setForm((prev: CategoryFormState) => {
      const nextFaqs = [...prev.faqs];
      nextFaqs[index] = { ...nextFaqs[index], [key]: value };
      const next = { ...prev, faqs: nextFaqs };
      persistDraft(next);
      return next;
    });
  };

  const updateSubtopic = (
    index: number,
    key: keyof CategorySubtopicFormItem,
    value: string,
  ) => {
    setForm((prev: CategoryFormState) => {
      const nextSubtopics = [...prev.subtopics];
      nextSubtopics[index] = { ...nextSubtopics[index], [key]: value };
      const next = { ...prev, subtopics: nextSubtopics };
      persistDraft(next);
      return next;
    });
  };

  const addFaq = () => {
    setForm((prev: CategoryFormState) => {
      const next = { ...prev, faqs: [...prev.faqs, emptyFaq()] };
      persistDraft(next);
      return next;
    });
  };

  const addSubtopic = () => {
    setForm((prev: CategoryFormState) => {
      const next = { ...prev, subtopics: [...prev.subtopics, emptySubtopic()] };
      persistDraft(next);
      return next;
    });
  };

  const removeFaq = (index: number) => {
    setForm((prev: CategoryFormState) => {
      const nextFaqs = prev.faqs.filter(
        (_: CategoryFaqItem, itemIndex: number) => itemIndex !== index,
      );
      const next = { ...prev, faqs: nextFaqs.length ? nextFaqs : [emptyFaq()] };
      persistDraft(next);
      return next;
    });
  };

  const removeSubtopic = (index: number) => {
    setForm((prev: CategoryFormState) => {
      const nextSubtopics = prev.subtopics.filter(
        (_: CategorySubtopicFormItem, itemIndex: number) => itemIndex !== index,
      );
      const next = {
        ...prev,
        subtopics: nextSubtopics.length ? nextSubtopics : [emptySubtopic()],
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

  const buildPayload = (statusOverride: "draft" | "published") => ({
    name: form.name,
    slug: form.slug,
    primaryKeyword: form.primaryKeyword,
    intro: form.intro,
    topicDefinition: form.topicDefinition,
    parentCategorySlug: form.parentCategorySlug || undefined,
    heroImage: form.image
      ? {
          url: form.image,
          alt: form.alt || form.name || "Category hero image",
          category: "hero",
        }
      : undefined,
    metaTitle: form.metaTitle,
    metaDescription: form.metaDescription,
    featuredPostSlugs: toLines(form.featuredPostSlugs),
    featuredUniversitySlugs: toLines(form.featuredUniversitySlugs),
    relatedCategorySlugs: toLines(form.relatedCategorySlugs),
    subtopics: form.subtopics
      .map((subtopic: CategorySubtopicFormItem) => ({
        title: subtopic.title.trim(),
        description: subtopic.description.trim(),
        postSlugs: toLines(subtopic.postSlugsText),
        universitySlugs: toLines(subtopic.universitySlugsText),
      }))
      .filter((subtopic: { title: string }) => subtopic.title),
    faqs: form.faqs.filter(
      (faq: CategoryFaqItem) => faq.question.trim() && faq.answer.trim(),
    ),
    cta:
      form.ctaLabel && form.ctaHref
        ? {
            label: form.ctaLabel,
            href: form.ctaHref,
            type: form.ctaType as "primary" | "secondary",
          }
        : undefined,
    isIndexed: form.isIndexed,
    minPostsToIndex: Number(form.minPostsToIndex) || 4,
    postOrder: form.postOrder as "curated" | "recent" | "popular",
    status: statusOverride,
    lastUpdated: new Date().toISOString(),
  });

  const submitCategory = async (statusOverride: "draft" | "published") => {
    const requiredFields =
      statusOverride === "published"
        ? [
            form.name,
            form.slug,
            form.primaryKeyword,
            form.intro,
            form.topicDefinition,
            form.metaTitle,
            form.metaDescription,
          ]
        : [form.name, form.slug];

    if (requiredFields.some((field) => !field.trim())) {
      toast.error(
        statusOverride === "published"
          ? "Please complete the core category fields before publishing."
          : "Name and slug are required to save a category draft.",
      );
      return;
    }

    if (statusOverride === "published" && form.faqs.length < 3) {
      toast.error("Please add at least 3 FAQs before publishing this hub.");
      return;
    }

    if (statusOverride === "published" && form.topicDefinition.length < 40) {
      toast.error("Topic definition should be at least 40 characters.");
      return;
    }

    const setter =
      statusOverride === "published" ? setIsPublishing : setIsSavingDraft;
    setter(true);

    try {
      const payload = buildPayload(statusOverride);
      const endpoint =
        mode === "create"
          ? "/api/categories"
          : `/api/categories/${initialData?.id || initialData?._id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save category");
      }

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(storageKey);
      }

      toast.success(
        statusOverride === "published"
          ? "Category published successfully"
          : "Category draft saved successfully",
      );
      router.push("/admin/categories");
      router.refresh();
    } catch {
      toast.error(
        statusOverride === "published"
          ? "Failed to publish category"
          : "Failed to save category draft",
      );
    } finally {
      setter(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      <CMSHeader editorType="Category" />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submitCategory("published");
        }}
        className="space-y-8"
      >
        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">Core Hub Info</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Category Name</label>
              <input
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="e.g. LNAT Preparation"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                value={form.slug}
                onChange={(event) => updateForm("slug", event.target.value)}
                placeholder="e.g. lnat-guide"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Primary Keyword</label>
              <input
                value={form.primaryKeyword}
                onChange={(event) =>
                  updateForm("primaryKeyword", event.target.value)
                }
                placeholder="e.g. LNAT preparation"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Parent Category Slug</label>
              <input
                value={form.parentCategorySlug}
                onChange={(event) =>
                  updateForm("parentCategorySlug", event.target.value)
                }
                placeholder="Optional"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Topic Definition</label>
            <textarea
              value={form.topicDefinition}
              onChange={(event) =>
                updateForm("topicDefinition", event.target.value)
              }
              placeholder="40 to 60 word answer to what this topic is."
              className={textareaClass}
            />
          </div>

          <div>
            <label className={labelClass}>Editorial Intro</label>
            <textarea
              value={form.intro}
              onChange={(event) => updateForm("intro", event.target.value)}
              placeholder="Use this to explain the topic, how the hub should be used, and what the reader will find here."
              className="min-h-[220px] w-full rounded-md border border-slate-800 bg-slate-900/50 px-4 py-3 text-[#FDFBF7] placeholder:text-slate-600 focus:border-[#C4A47C]/50 focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50"
            />
          </div>
        </section>

        <CMSMediaSection
          image={form.image}
          alt={form.alt}
          onChange={(field: string, value: string) => updateForm(field, value)}
          editorType="Category"
        />

        <CMSSeoSection
          metaTitle={form.metaTitle}
          metaDescription={form.metaDescription}
          onChange={(field: string, value: string) => updateForm(field, value)}
          editorType="Category"
        />

        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">
            Content Relationships
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Featured Blog Slugs</label>
              <textarea
                value={form.featuredPostSlugs}
                onChange={(event) =>
                  updateForm("featuredPostSlugs", event.target.value)
                }
                placeholder={"One blog slug per line"}
                className={textareaClass}
              />
            </div>
            <div>
              <label className={labelClass}>Featured University Slugs</label>
              <textarea
                value={form.featuredUniversitySlugs}
                onChange={(event) =>
                  updateForm("featuredUniversitySlugs", event.target.value)
                }
                placeholder={"One university slug per line"}
                className={textareaClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Related Category Slugs</label>
            <textarea
              value={form.relatedCategorySlugs}
              onChange={(event) =>
                updateForm("relatedCategorySlugs", event.target.value)
              }
              placeholder={"One related category slug per line"}
              className={textareaClass}
            />
          </div>
        </section>

        <section className={sectionClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#FDFBF7]">
              Subtopic Groups
            </h2>
            <button
              type="button"
              onClick={addSubtopic}
              className="text-sm font-medium text-[#C4A47C]"
            >
              + Add Subtopic
            </button>
          </div>

          <div className="space-y-5">
            {form.subtopics.map(
              (subtopic: CategorySubtopicFormItem, index: number) => (
              <div
                key={`subtopic-${index}`}
                className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-300">
                    Subtopic {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeSubtopic(index)}
                    className="text-xs font-medium text-rose-400"
                  >
                    Remove
                  </button>
                </div>

                <input
                  value={subtopic.title}
                  onChange={(event) =>
                    updateSubtopic(index, "title", event.target.value)
                  }
                  placeholder="Subtopic title"
                  className={inputClass}
                />
                <textarea
                  value={subtopic.description}
                  onChange={(event) =>
                    updateSubtopic(index, "description", event.target.value)
                  }
                  placeholder="Short explanation for this subtopic"
                  className={textareaClass}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <textarea
                    value={subtopic.postSlugsText}
                    onChange={(event) =>
                      updateSubtopic(index, "postSlugsText", event.target.value)
                    }
                    placeholder="Blog slugs for this subtopic"
                    className={textareaClass}
                  />
                  <textarea
                    value={subtopic.universitySlugsText}
                    onChange={(event) =>
                      updateSubtopic(
                        index,
                        "universitySlugsText",
                        event.target.value,
                      )
                    }
                    placeholder="University slugs for this subtopic"
                    className={textareaClass}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#FDFBF7]">Category FAQs</h2>
            <button
              type="button"
              onClick={addFaq}
              className="text-sm font-medium text-[#C4A47C]"
            >
              + Add FAQ
            </button>
          </div>

          <div className="space-y-5">
            {form.faqs.map((faq: CategoryFaqItem, index: number) => (
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
          <h2 className="text-lg font-semibold text-[#FDFBF7]">CTA + Publishing</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className={labelClass}>CTA Label</label>
              <input
                value={form.ctaLabel}
                onChange={(event) => updateForm("ctaLabel", event.target.value)}
                placeholder="e.g. Book a consultation"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>CTA Link</label>
              <input
                value={form.ctaHref}
                onChange={(event) => updateForm("ctaHref", event.target.value)}
                placeholder="/how-to-apply"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>CTA Type</label>
              <select
                value={form.ctaType}
                onChange={(event) => updateForm("ctaType", event.target.value)}
                className={inputClass}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <label className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-900/30 px-4 py-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.isIndexed}
                onChange={(event) => updateForm("isIndexed", event.target.checked)}
              />
              Indexed
            </label>
            <div>
              <label className={labelClass}>Min Posts To Index</label>
              <input
                type="number"
                min="1"
                value={form.minPostsToIndex}
                onChange={(event) =>
                  updateForm("minPostsToIndex", event.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Post Order</label>
              <select
                value={form.postOrder}
                onChange={(event) => updateForm("postOrder", event.target.value)}
                className={inputClass}
              >
                <option value="curated">Curated</option>
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>
        </section>

        <CMSActions
          actionType={mode === "create" ? "create" : "update"}
          editorType="Category"
          onSaveDraft={() => void submitCategory("draft")}
          loading={isPublishing || isSavingDraft}
        />
      </form>
    </div>
  );
}
