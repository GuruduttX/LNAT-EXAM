import connectDB from "@/lib/db";
import { getSiteUrl } from "@/lib/siteUrl";
import { createUrlSet, createXmlResponse } from "@/lib/sitemapXml";
import { Category } from "@/models/Category";

export async function GET() {
  const siteUrl = getSiteUrl();

  await connectDB();
  const categories = await Category.find({
    status: "published",
  })
    .select("slug lastUpdated updatedAt")
    .lean();

  const xml = createUrlSet(
    categories.map((category) => ({
      loc: `${siteUrl}/topics/${category.slug}`,
      lastmod: category.lastUpdated || category.updatedAt,
      changefreq: "weekly",
      priority: 0.9,
    })),
  );

  return createXmlResponse(xml);
}
