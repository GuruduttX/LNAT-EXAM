import connectDB from "@/lib/db";
import {
  getCategoryPostSlugs,
  shouldIndexCategory,
} from "@/lib/categoryIndexing";
import { getSiteUrl } from "@/lib/siteUrl";
import { createUrlSet, createXmlResponse } from "@/lib/sitemapXml";
import { Blog } from "@/models/Blog";
import { Category } from "@/models/Category";

export async function GET() {
  const siteUrl = getSiteUrl();

  await connectDB();
  const categories = await Category.find({
    status: "published",
    isIndexed: true,
  })
    .select(
      "slug lastUpdated updatedAt isIndexed minPostsToIndex featuredPostSlugs subtopics",
    )
    .lean();

  const indexableCategories = (
    await Promise.all(
      categories.map(async (category) => {
        const postSlugs = getCategoryPostSlugs(category);
        const publishedPostCount = postSlugs.length
          ? await Blog.countDocuments({
              slug: { $in: postSlugs },
              status: "published",
            })
          : 0;

        return shouldIndexCategory(category, publishedPostCount)
          ? category
          : null;
      }),
    )
  ).filter(Boolean);

  const xml = createUrlSet(
    indexableCategories.map((category) => ({
      loc: `${siteUrl}/topics/${category.slug}`,
      lastmod: category.lastUpdated || category.updatedAt,
      changefreq: "weekly",
      priority: 0.9,
    })),
  );

  return createXmlResponse(xml);
}
