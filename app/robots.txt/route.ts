import { getSiteUrl } from "@/lib/siteUrl";

export async function GET() {
  const siteUrl = getSiteUrl();

  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: GPTBot
Disallow: /admin/
Disallow: /api/

User-agent: ClaudeBot
Disallow: /admin/
Disallow: /api/

User-agent: PerplexityBot
Disallow: /admin/
Disallow: /api/

User-agent: Google-Extended
Disallow: /admin/
Disallow: /api/

User-agent: CCBot
Disallow: /admin/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
