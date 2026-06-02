import { getSiteUrl } from "@/lib/siteUrl";
import { createUrlSet, createXmlResponse } from "@/lib/sitemapXml";

export async function GET() {
  const siteUrl = getSiteUrl();

  const xml = createUrlSet([
    { loc: siteUrl, changefreq: "weekly", priority: 1 },
    { loc: `${siteUrl}/universities`, changefreq: "weekly", priority: 0.9 },
    { loc: `${siteUrl}/blog`, changefreq: "weekly", priority: 0.9 },
    { loc: `${siteUrl}/topics`, changefreq: "weekly", priority: 0.8 },
    { loc: `${siteUrl}/faq`, changefreq: "monthly", priority: 0.7 },
    { loc: `${siteUrl}/about`, changefreq: "monthly", priority: 0.7 },
    { loc: `${siteUrl}/how-to-apply`, changefreq: "monthly", priority: 0.7 },
  ]);

  return createXmlResponse(xml);
}
