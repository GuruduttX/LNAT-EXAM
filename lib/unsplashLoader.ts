import type { ImageLoaderProps } from "next/image";

/**
 * Unsplash already performs responsive resizing and format conversion, so
 * routing its images through the Next.js optimizer only adds a second request
 * and an image-processing hop. This keeps next/image's responsive `srcset`
 * but points each candidate at the correctly sized Unsplash rendition.
 */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  return url.toString();
}
