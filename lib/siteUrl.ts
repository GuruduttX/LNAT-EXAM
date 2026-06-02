const DEFAULT_SITE_URL = "https://www.lnatexamindia.com";

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_URL
      : DEFAULT_SITE_URL);

  return (configuredUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
}
