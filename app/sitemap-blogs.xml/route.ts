import connectDB from "@/lib/db";
import { getSiteUrl } from "@/lib/siteUrl";
import { createUrlSet, createXmlResponse } from "@/lib/sitemapXml";
import { Blog } from "@/models/Blog";

export async function GET() {
  const siteUrl = getSiteUrl();

  await connectDB();
  const blogs = await Blog.find({ status: "published" })
    .select("slug updatedAt isCornerstone")
    .lean();

  const xml = createUrlSet(
    blogs.map((blog) => ({
      loc: `${siteUrl}/blog/${blog.slug}`,
      lastmod: blog.updatedAt,
      changefreq: "monthly",
      priority: blog.isCornerstone ? 0.9 : 0.8,
    })),
  );

  return createXmlResponse(xml);
}
