import { getSiteUrl } from "@/lib/siteUrl";
import { createSitemapIndex, createXmlResponse } from "@/lib/sitemapXml";

export async function GET() {
  const siteUrl = getSiteUrl();
  const sitemapNames = [
    "sitemap-pages.xml",
    "sitemap-topics.xml",
    "sitemap-blogs.xml",
    "sitemap-universities.xml",
    "sitemap-resources.xml",
  ];

  const xml = createSitemapIndex(
    sitemapNames.map((name) => ({ loc: `${siteUrl}/${name}` })),
  );

  return createXmlResponse(xml);
}
