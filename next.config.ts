import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.31.9"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lnatexamindia.com" }],
        destination: "https://lnatexamindia.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    // Next 16 only serves qualities on this allowlist (default [75]); anything
    // else passed to <Image quality> is snapped to the nearest entry.
    qualities: [45, 60, 70, 75],
    // AVIF is typically 30-50% smaller than WebP at the same visual quality.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
