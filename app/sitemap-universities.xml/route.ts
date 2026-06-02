import connectDB from "@/lib/db";
import { getSiteUrl } from "@/lib/siteUrl";
import { createUrlSet, createXmlResponse } from "@/lib/sitemapXml";
import { University } from "@/models/University";

export async function GET() {
  const siteUrl = getSiteUrl();

  await connectDB();
  const universities = await University.find({ status: "published" })
    .select("slug updatedAt")
    .lean();

  const xml = createUrlSet(
    universities.map((university) => ({
      loc: `${siteUrl}/universities/${university.slug}`,
      lastmod: university.updatedAt,
      changefreq: "monthly",
      priority: 0.8,
    })),
  );

  return createXmlResponse(xml);
}
