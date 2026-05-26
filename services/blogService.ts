// services/blogService.ts
import { Blog } from "@/models/Blog";
import connectDB from "@/lib/db";

export async function getBlogsArchive({
  page = 1,
  limit = 9,
  category,
  status,
}: {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
}) {
  await connectDB();

  const query: Record<string, unknown> =
    status === "all" ? {} : { status: status || "published" };
  if (category) query.category = category;

  const skip = (page - 1) * limit;

  // Run count and fetch in parallel for performance
  const [blogs, total] = await Promise.all([
    Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      // Exclude heavy HTML 'content' for the archive cards
      .select("-content -faqs -sources"),
    Blog.countDocuments(query),
  ]);

  return {
    blogs,
    meta: {
      total,
      page,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getPublishedBlogs(limit = 24) {
  await connectDB();

  return Blog.find({ status: "published" })
    .sort({ isCornerstone: -1, publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();
}

export async function getBlogBySlug(slug: string) {
  await connectDB();
  return Blog.findOne({ slug, status: "published" });
}

export async function getBlogById(id: string) {
  await connectDB();
  return Blog.findById(id);
}

export async function getPublishedBlogSlugs() {
  await connectDB();
  const blogs = await Blog.find({ status: "published" }).select("slug").lean();

  return blogs.map((blog) => blog.slug).filter(Boolean);
}
