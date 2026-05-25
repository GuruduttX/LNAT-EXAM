"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Modular CMS Components
import CMSHeader from "@/components/Admin/CMS/CMSHeader";
import CMSMetaSection from "@/components/Admin/CMS/CMSMetaSection";
import CMSMediaSection from "@/components/Admin/CMS/CMSMediaSection";
import CMSContentSection from "@/components/Admin/CMS/CMSContentSection";
import CMSSeoSection from "@/components/Admin/CMS/CMSSeoSection";
import CMSSchema from "@/components/Admin/CMS/CMSSchema";
import CMSActions from "@/components/Admin/CMS/CMSActions";

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-slate-900/50 text-[#FDFBF7]
  placeholder-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition
`;

export default function CreateBlogPage() {
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Flat state mapping for the UI
  const [form, setForm] = useState({
    title: "",
    category: "",
    slug: "",
    author: "Editorial Team", // Default author
    readTime: "",
    image: "",
    alt: "",
    subContent: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    schemaTitle: "",
    schemaDescription: "",
  });

  // 1. READ EFFECT (Load from local storage backup)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem("lnat_blog_draft");
      if (savedDraft) setForm(JSON.parse(savedDraft));
      setIsLoaded(true);
    }
  }, []);

  // 2. WRITE EFFECT (Auto-save locally on keystroke)
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("lnat_blog_draft", JSON.stringify(form));
    }
  }, [form, isLoaded]);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 3. CORE SUBMISSION LOGIC (Handles both Draft and Publish)
  const submitToDatabase = async (status: "draft" | "published") => {
    // 1. Determine which fields are required based on the action
    const requiredFields =
      status === "published"
        ? [
            "title",
            "category",
            "slug",
            "author",
            "readTime",
            "image",
            "alt",
            "subContent",
            "content",
            "metaTitle",
            "metaDescription",
          ]
        : ["title", "slug", "image"]; // Relaxed requirements for drafts

    const missing = requiredFields.filter(
      (key) => !form[key as keyof typeof form],
    );

    if (missing.length > 0) {
      if (status === "published") {
        toast.error("Please fill in all required fields to publish.");
      } else {
        toast.error(
          "Title, Slug, and Hero Image are required to save a draft.",
        );
      }
      return;
    }

    // 2. Validate readTime (Strict for publish, safe fallback for drafts)
    let parsedReadTime = Number(form.readTime);
    if (
      status === "published" &&
      (isNaN(parsedReadTime) || form.readTime === "")
    ) {
      toast.error("Read Time must be a valid number.");
      return;
    }
    if (isNaN(parsedReadTime)) parsedReadTime = 0; // Fallback so MongoDB doesn't reject the draft

    setIsPublishing(true);
    try {
      // 3. Map flat UI state to nested Mongoose schema structure.
      // Fallbacks are provided so MongoDB doesn't throw a validation error on 'required: true' fields during a draft save.
      const payload = {
        title: form.title,
        category: form.category || "Uncategorized",
        slug: form.slug,
        author: form.author || "Editorial Team",
        readTime: parsedReadTime,
        image: form.image,
        alt: form.alt || "Draft Image",
        subContent: form.subContent || "Draft Subcontent",
        content: form.content || "<p>Draft Content</p>",
        meta: {
          title: form.metaTitle || "Draft Meta Title",
          description: form.metaDescription || "Draft Meta Description",
        },
        structuredData: {
          title: form.schemaTitle || "",
          description: form.schemaDescription || "",
        },
        status: status, // "draft" or "published"
      };

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save blog");

      toast.success(
        `Blog ${
          status === "published" ? "published" : "draft saved to database"
        } successfully!`,
      );
      localStorage.removeItem("lnat_blog_draft"); // Clear local backup
      router.push("/admin/blogs");
    } catch (error) {
      toast.error(
        `Failed to ${status === "published" ? "publish" : "save"} blog.`,
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    submitToDatabase("published");
  };

  const handleSaveDraft = () => {
    submitToDatabase("draft");
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      <CMSHeader editorType="Blog" />

      <form onSubmit={handlePublish} className="space-y-8">
        {/* 1. Meta Section (Title, Category, Slug) */}
        <CMSMetaSection
          title={form.title}
          category={form.category}
          slug={form.slug}
          onChange={updateForm}
          editorType="Blog"
        />

        {/* 2. Custom Row for Author & Read Time (Specific to Blogs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0B1221] p-6 rounded-xl border border-slate-800 shadow-sm">
          <div>
            <label className="text-sm font-medium text-slate-400">Author</label>
            <input
              required
              value={form.author}
              onChange={(e) => updateForm("author", e.target.value)}
              placeholder="e.g., John Doe"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-400">
              Estimated Read Time (Minutes)
            </label>
            <input
              required
              type="number"
              min="1"
              value={form.readTime}
              onChange={(e) => updateForm("readTime", e.target.value)}
              placeholder="e.g., 5"
              className={inputClass}
            />
          </div>
        </div>

        {/* 3. Media Section */}
        <CMSMediaSection
          image={form.image}
          alt={form.alt}
          onChange={updateForm}
          editorType="Blog"
        />

        {/* 4. Content Section (Sub Content & Rich Text Body) */}
        <CMSContentSection
          subContent={form.subContent}
          content={form.content}
          onChange={updateForm}
          editorType="Blog"
        />

        {/* 5. SEO Section */}
        <CMSSeoSection
          metaTitle={form.metaTitle}
          metaDescription={form.metaDescription}
          onChange={updateForm}
          editorType="Blog"
        />

        {/* 6. Schema / Structured Data Section */}
        <CMSSchema
          schemaTitle={form.schemaTitle}
          schemaDescription={form.schemaDescription}
          onChange={updateForm}
          editorType="Blog"
        />

        {/* 7. Actions (Publish & Save Draft) */}
        <CMSActions
          actionType="create"
          editorType="Blog"
          onSaveDraft={handleSaveDraft}
          loading={isPublishing}
        />
      </form>
    </div>
  );
}
