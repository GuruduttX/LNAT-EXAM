"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    slug: "",
    author: "",
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

  // 1. FETCH EXISTING BLOG DATA
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Blog not found");
        const data = await res.json();

        // Map nested DB data back to our flat UI form state
        setForm({
          title: data.title || "",
          category: data.category || "",
          slug: data.slug || "",
          author: data.author || "",
          readTime: data.readTime?.toString() || "",
          image: data.image || "",
          alt: data.alt || "",
          subContent: data.subContent || "",
          content: data.content || "",
          metaTitle: data.meta?.title || "",
          metaDescription: data.meta?.description || "",
          schemaTitle: data.structuredData?.title || "",
          schemaDescription: data.structuredData?.description || "",
        });
      } catch (error) {
        toast.error("Failed to load blog data");
        router.push("/admin/blogs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 2. CORE SUBMISSION LOGIC (Handles both Draft and Publish updates)
  const submitToDatabase = async (status: "draft" | "published") => {
    // Dynamic requirements based on status
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
        : ["title", "slug", "image"];

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

    // Validate readTime
    let parsedReadTime = Number(form.readTime);
    if (
      status === "published" &&
      (isNaN(parsedReadTime) || form.readTime === "")
    ) {
      toast.error("Read Time must be a valid number.");
      return;
    }
    if (isNaN(parsedReadTime)) parsedReadTime = 0; // Fallback for drafts

    setIsPublishing(true);
    try {
      // Map flat UI state back to the nested Mongoose schema structure
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
        status: status,
      };

      // PUT request to update the specific ID
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update blog");

      toast.success(
        `Blog ${
          status === "published" ? "published" : "draft updated"
        } successfully!`,
      );
      router.push("/admin/blogs");
    } catch (error) {
      toast.error(
        `Failed to ${status === "published" ? "publish" : "update"} blog.`,
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

  if (isLoading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center animate-in fade-in">
        <div className="w-10 h-10 border-4 border-[#C4A47C]/30 border-t-[#C4A47C] rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      <CMSHeader editorType="Blog" />

      <form onSubmit={handlePublish} className="space-y-8">
        <CMSMetaSection
          title={form.title}
          category={form.category}
          slug={form.slug}
          onChange={updateForm}
          editorType="Blog"
        />

        {/* Custom Row for Author & Read Time */}
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

        <CMSMediaSection
          image={form.image}
          alt={form.alt}
          onChange={updateForm}
          editorType="Blog"
        />

        <CMSContentSection
          subContent={form.subContent}
          content={form.content}
          onChange={updateForm}
          editorType="Blog"
        />

        <CMSSeoSection
          metaTitle={form.metaTitle}
          metaDescription={form.metaDescription}
          onChange={updateForm}
          editorType="Blog"
        />

        <CMSSchema
          schemaTitle={form.schemaTitle}
          schemaDescription={form.schemaDescription}
          onChange={updateForm}
          editorType="Blog"
        />

        {/* CMS Actions handles the "Update" (Publish) and "Save Draft" buttons */}
        <CMSActions
          actionType="update"
          editorType="Blog"
          onSaveDraft={handleSaveDraft}
          loading={isPublishing}
        />
      </form>
    </div>
  );
}
