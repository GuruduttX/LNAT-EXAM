interface SitemapUrl {
  loc: string;
  lastmod?: Date | string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
}

interface SitemapIndexEntry {
  loc: string;
  lastmod?: Date | string;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(value?: Date | string) {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString();
}

function renderLastModified(value?: Date | string) {
  const formattedDate = formatDate(value);
  return formattedDate ? `<lastmod>${formattedDate}</lastmod>` : "";
}

export function createUrlSet(urls: SitemapUrl[]) {
  const entries = urls
    .map(
      ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${escapeXml(loc)}</loc>
    ${renderLastModified(lastmod)}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
    ${typeof priority === "number" ? `<priority>${priority.toFixed(1)}</priority>` : ""}
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}
</urlset>`;
}

export function createSitemapIndex(sitemaps: SitemapIndexEntry[]) {
  const entries = sitemaps
    .map(
      ({ loc, lastmod }) => `
  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    ${renderLastModified(lastmod)}
  </sitemap>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}
</sitemapindex>`;
}

export function createXmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
