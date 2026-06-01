"use client";

import { motion, Variants } from "framer-motion";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IBlog } from "@/types/backend.types";

interface LatestBlogsGridProps {
  latestBlogs?: IBlog[];
}

// ─────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function LatestBlogsGrid({
  latestBlogs = [],
}: LatestBlogsGridProps) {
  if (!latestBlogs || latestBlogs.length === 0) return null;

  return (
    <section className="relative w-full border-t border-black/[0.05] bg-[#F7F3EC] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      {/* Subtle Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:20px_20px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header Area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={fadeUp}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                More To Read
              </span>
            </div>
            <h2 className="mb-4 text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Recent guides and useful reads
            </h2>
            <p className="max-w-xl text-[14px] leading-relaxed text-slate-500 md:text-[15px]">
              Keep exploring with newer guides on preparation tactics,
              deadlines, application strategy, and university-specific
              questions.
            </p>
          </div>

          {/* Premium Info Badge */}
          <div className="flex shrink-0 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm backdrop-blur-md md:w-auto">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EC] text-[#C9A84C]">
                <BookOpen size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0D1B3E]">
                  Best used with
                </p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Topic Hubs & Resources
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {latestBlogs.map((blog) => (
            <motion.div key={blog.slug} variants={fadeUp}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-component: BlogCard
// (Identical to the one in BlogArchiveGrid for perfect consistency)
// ─────────────────────────────────────────────────────────────
function BlogCard({ blog }: { blog: IBlog }) {
  const imageUrl = blog.heroImage?.url || blog.featuredImage || blog.image;

  // Date Formatter helper
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "Recently updated";

    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return String(dateString);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_16px_40px_rgba(13,27,62,0.06)]">
      {/* Image Container */}
      <Link
        href={`/blog/${blog.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-[#0D1B3E]/5"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={blog.heroImage?.alt || blog.alt || blog.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-[#0A1628] to-[#162447]">
            <span className="text-[40px] font-serif text-white/10">LNAT</span>
          </div>
        )}

        {/* Floating Category Pill */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E] shadow-sm backdrop-blur-md">
          {blog.category}
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Meta Info */}
        <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold tracking-wider text-slate-400">
          <span className="uppercase">
            {formatDate(blog.publishedAt)}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#C9A84C]/50" />
          <span className="flex items-center gap-1.5 uppercase">
            <Clock size={12} className="text-[#C9A84C]" />
            {blog.readTime} min read
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="mb-3 block outline-none">
          <h3 className="line-clamp-2 text-[18px] font-bold leading-snug text-[#0D1B3E] transition-colors group-hover:text-[#C9A84C]">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mb-6 line-clamp-3 text-[13px] leading-relaxed text-slate-500">
          {blog.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${blog.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E] transition-colors group-hover:text-[#C9A84C]"
        >
          Read Article
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
