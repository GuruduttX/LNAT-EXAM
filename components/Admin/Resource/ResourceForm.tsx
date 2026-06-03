"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CMSActions from "@/components/Admin/CMS/CMSActions";
import CMSHeader from "@/components/Admin/CMS/CMSHeader";
import CMSSeoSection from "@/components/Admin/CMS/CMSSeoSection";
import { getCmsErrorMessage } from "@/components/Admin/CMS/getCmsErrorMessage";
import { adminFetch } from "@/lib/adminApiClient";
import { IResource } from "@/types/backend.types";
import ResourcePdfSection from "./ResourcePdfSection";

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

const resourceCategories = [
  "Foundation Guide",
  "Section A Strategy",
  "Section B Guide",
  "Admissions Toolkit",
  "University Shortlisting",
  "Exam Planning",
  "Application Support",
];

interface ResourceFormProps {
  mode: "create" | "edit";
  initialData?: Partial<IResource> & { _id?: string; id?: string };
}

function createInitialState(
  initialData?: Partial<IResource> & { _id?: string; id?: string },
) {
  return {
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "",
    primaryCategorySlug: initialData?.primaryCategorySlug || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    iconName: initialData?.iconName || "FileText",
    fileUrl: initialData?.fileUrl || "",
    filePublicId: initialData?.filePublicId || "",
    fileFormat: initialData?.fileFormat || "",
    fileBytes: String(initialData?.fileBytes || ""),
    fileName: initialData?.filePublicId?.split("/").pop() || "",
    downloadLabel: initialData?.downloadLabel || "Download PDF",
    tags: (initialData?.tags || []).join(", "),
    relatedBlogSlugs: (initialData?.relatedBlogSlugs || []).join("\n"),
    relatedUniversitySlugs: (initialData?.relatedUniversitySlugs || []).join(
      "\n",
    ),
    relatedCategorySlugs: (initialData?.relatedCategorySlugs || []).join("\n"),
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    status: initialData?.status || "draft",
  };
}

type ResourceFormState = ReturnType<typeof createInitialState>;

export default function ResourceForm({
  mode,
  initialData,
}: ResourceFormProps) {
  const router = useRouter();
  const storageKey = useMemo(
    () =>
      mode === "create"
        ? "lnat_resource_draft_v1"
        : `lnat_resource_edit_${initialData?.id || initialData?._id || "draft"}`,
    [initialData?._id, initialData?.id, mode],
  );

  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [form, setForm] = useState<ResourceFormState>(() => {
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

  const persistDraft = (nextForm: ResourceFormState) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(nextForm));
    }
  };

  const updateForm = (field: string, value: string) => {
    setForm((prev: ResourceFormState) => {
      const next = { ...prev, [field]: value };
      persistDraft(next);
      return next;
    });
  };

  const toLines = (value: string) =>
    value
      .split("\n")
      .map((item: string) => item.trim())
      .filter(Boolean);

  const buildPayload = (statusOverride: "draft" | "published") => ({
    title: form.title,
    slug: form.slug,
    category: form.category,
    primaryCategorySlug: form.primaryCategorySlug || undefined,
    shortDescription: form.shortDescription,
    description: form.description,
    iconName: form.iconName || "FileText",
    fileUrl: form.fileUrl,
    filePublicId: form.filePublicId || undefined,
    fileFormat: form.fileFormat || undefined,
    fileBytes: form.fileBytes ? Number(form.fileBytes) : undefined,
    downloadLabel: form.downloadLabel || "Download PDF",
    tags: form.tags
      .split(",")
      .map((item: string) => item.trim())
      .filter(Boolean),
    relatedBlogSlugs: toLines(form.relatedBlogSlugs),
    relatedUniversitySlugs: toLines(form.relatedUniversitySlugs),
    relatedCategorySlugs: toLines(form.relatedCategorySlugs),
    metaTitle: form.metaTitle || undefined,
    metaDescription: form.metaDescription || undefined,
    status: statusOverride,
  });

  const submitResource = async (statusOverride: "draft" | "published") => {
    const requiredFields =
      statusOverride === "published"
        ? [
            form.title,
            form.slug,
            form.category,
            form.shortDescription,
            form.description,
            form.fileUrl,
          ]
        : [form.title, form.slug];

    if (requiredFields.some((field) => !field.trim())) {
      toast.error(
        statusOverride === "published"
          ? "Please complete the resource details before publishing."
          : "Title and slug are required to save a resource draft.",
      );
      return;
    }

    const setter =
      statusOverride === "published" ? setIsPublishing : setIsSavingDraft;
    setter(true);

    try {
      const payload = buildPayload(statusOverride);
      const endpoint =
        mode === "create"
          ? "/api/resources"
          : `/api/resources/${initialData?.id || initialData?._id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await adminFetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          await getCmsErrorMessage(response, "Failed to save resource"),
        );
      }

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(storageKey);
      }

      toast.success(
        statusOverride === "published"
          ? mode === "create"
            ? "Resource published successfully"
            : "Resource updated successfully"
          : "Resource draft saved successfully",
      );

      router.push("/admin/resources");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : statusOverride === "published"
            ? "Failed to publish resource"
            : "Failed to save resource draft",
      );
    } finally {
      setter(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      <CMSHeader editorType="Resource" />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submitResource("published");
        }}
        className="space-y-8"
      >
        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">Resource Setup</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Resource Title</label>
              <input
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
                placeholder="e.g. LNAT Beginner's Guide"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                value={form.slug}
                onChange={(event) => updateForm("slug", event.target.value)}
                placeholder="e.g. lnat-beginners-guide"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={form.category}
                onChange={(event) => updateForm("category", event.target.value)}
                className={inputClass}
              >
                <option value="">Select Category</option>
                {resourceCategories.map((category) => (
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
        </section>

        <ResourcePdfSection
          fileUrl={form.fileUrl}
          fileName={form.fileName}
          onUploaded={(payload) => {
            updateForm("fileUrl", payload.url);
            updateForm("filePublicId", payload.publicId || "");
            updateForm("fileFormat", payload.format || "");
            updateForm("fileBytes", payload.bytes ? String(payload.bytes) : "");
            updateForm(
              "fileName",
              payload.originalFilename || payload.publicId || "resource.pdf",
            );
          }}
        />

        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">
            Resource Content
          </h2>
          <div>
            <label className={labelClass}>Short Description</label>
            <textarea
              value={form.shortDescription}
              onChange={(event) =>
                updateForm("shortDescription", event.target.value)
              }
              placeholder="Short description for cards and inline links."
              className={textareaClass}
            />
          </div>
          <div>
            <label className={labelClass}>Detailed Description</label>
            <textarea
              value={form.description}
              onChange={(event) => updateForm("description", event.target.value)}
              placeholder="Explain what the PDF contains and why it is useful."
              className="min-h-[220px] w-full rounded-md border border-slate-800 bg-slate-900/50 px-4 py-3 text-[#FDFBF7] placeholder:text-slate-600 focus:border-[#C4A47C]/50 focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className={labelClass}>Icon Name</label>
              <input
                value={form.iconName}
                onChange={(event) => updateForm("iconName", event.target.value)}
                placeholder="e.g. FileText"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Download Label</label>
              <input
                value={form.downloadLabel}
                onChange={(event) =>
                  updateForm("downloadLabel", event.target.value)
                }
                placeholder="Download PDF"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tags</label>
              <input
                value={form.tags}
                onChange={(event) => updateForm("tags", event.target.value)}
                placeholder="LNAT, guide, section-a"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">
            Relationships
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className={labelClass}>Related Blog Slugs</label>
              <textarea
                value={form.relatedBlogSlugs}
                onChange={(event) =>
                  updateForm("relatedBlogSlugs", event.target.value)
                }
                placeholder={"One blog slug per line"}
                className={textareaClass}
              />
            </div>
            <div>
              <label className={labelClass}>Related University Slugs</label>
              <textarea
                value={form.relatedUniversitySlugs}
                onChange={(event) =>
                  updateForm("relatedUniversitySlugs", event.target.value)
                }
                placeholder={"One university slug per line"}
                className={textareaClass}
              />
            </div>
            <div>
              <label className={labelClass}>Related Category Slugs</label>
              <textarea
                value={form.relatedCategorySlugs}
                onChange={(event) =>
                  updateForm("relatedCategorySlugs", event.target.value)
                }
                placeholder={"One category slug per line"}
                className={textareaClass}
              />
            </div>
          </div>
        </section>

        <CMSSeoSection
          metaTitle={form.metaTitle}
          metaDescription={form.metaDescription}
          onChange={(field: string, value: string) => updateForm(field, value)}
          editorType="Resource"
        />

        <section className={sectionClass}>
          <h2 className="text-lg font-semibold text-[#FDFBF7]">Publishing</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={(event) => updateForm("status", event.target.value)}
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Uploaded PDF URL</label>
              <input value={form.fileUrl} readOnly className={inputClass} />
            </div>
          </div>
        </section>

        <CMSActions
          actionType={mode === "create" ? "create" : "update"}
          editorType="Resource"
          onSaveDraft={() => void submitResource("draft")}
          loading={isPublishing || isSavingDraft}
        />
      </form>
    </div>
  );
}
