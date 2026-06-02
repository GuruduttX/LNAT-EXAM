import { getSiteUrl } from "@/lib/siteUrl";

export interface BreadcrumbSchemaItem {
  label: string;
  href: string;
}

function getAbsoluteUrl(href: string) {
  if (/^https?:\/\//i.test(href)) return href;

  const siteUrl = getSiteUrl();
  if (href === "/") return `${siteUrl}/`;

  return `${siteUrl}${href.startsWith("/") ? href : `/${href}`}`;
}

export function createBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: getAbsoluteUrl(item.href),
    })),
  };
}
