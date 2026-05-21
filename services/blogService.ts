// services/blogService.ts
import { Blog } from "@/models/Blog";
import connectDB from "@/lib/db";

export async function getBlogsArchive({
  page = 1,
  limit = 9,
  category,
}: {
  page?: number;
  limit?: number;
  category?: string;
}) {
  await connectDB();

  const query: any = { status: "published" };
  if (category) query.category = category;

  const skip = (page - 1) * limit;

  // Run count and fetch in parallel for performance
  const [blogs, total] = await Promise.all([
    Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      // Exclude heavy HTML 'content' for the archive cards
      .select("-content"),
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

export async function getBlogBySlug(slug: string) {
  await connectDB();
  return Blog.findOne({ slug, status: "published" });
}
