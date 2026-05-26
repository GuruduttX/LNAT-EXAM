import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { IBlog } from "@/types/backend.types";

interface BlogCardProps {
  blog: IBlog;
}

function formatDate(dateValue?: string | Date) {
  if (!dateValue) return "Recently updated";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return String(dateValue);
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function BlogCard({ blog }: BlogCardProps) {
  const imageSrc = blog.heroImage?.url || blog.featuredImage || blog.image;
  const imageAlt = blog.heroImage?.alt || blog.alt || blog.title;

  return (
    <Link href={`/blog/${blog.slug}`} className="block h-full">
      <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-[#E6DDD0] bg-white transition-all duration-500 ease-out hover:border-[#C4A47C]/50 hover:shadow-[0_18px_40px_-10px_rgba(15,23,42,0.12)]">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F172A]/5">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 via-transparent to-transparent opacity-60" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 bg-[#07111F]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E4CD97] backdrop-blur-md">
              {blog.category}
            </span>
            {blog.isCornerstone ? (
              <span className="rounded-full border border-[#C4A47C]/20 bg-[#F7F0DE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8E6B32]">
                Cornerstone
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-grow flex-col p-6 md:p-7">
          <h3 className="text-[1.35rem] font-serif leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#9A7B4F] md:text-2xl">
            {blog.title}
          </h3>
          <p className="mt-3 flex-grow text-sm leading-7 text-slate-600">
            {blog.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-[#0F172A]/6 pt-5 text-xs font-medium tracking-wide text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#C4A47C]" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#C4A47C]" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
