import { getSiteUrl } from "@/lib/siteUrl";
import { createUrlSet, createXmlResponse } from "@/lib/sitemapXml";

export async function GET() {
  const siteUrl = getSiteUrl();

  const xml = createUrlSet([
    {
      loc: `${siteUrl}/free-resources`,
      changefreq: "monthly",
      priority: 0.7,
    },
  ]);

  return createXmlResponse(xml);
}
