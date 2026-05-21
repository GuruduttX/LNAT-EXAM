

"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3 } from "lucide-react";
import type { Blog } from "@/types/blog";

interface BlogDetailsHeroProps {
  blog: Blog;
}

export default function BlogDetailsHero({
  blog,
}: BlogDetailsHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#050B14] px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pb-14 lg:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,163,94,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-[#C2A35E]/30 bg-[#C2A35E]/10 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-[#E7D3A2] uppercase">
            {blog.category}
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-[#F8F5EE] sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#B8C1CC] sm:text-lg">
            {blog.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6 text-sm text-[#C7D0DB]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-[#F8F5EE]">
                {blog.author.name.charAt(0)}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#7F8A99]">
                  Written By
                </p>
                <p className="mt-1 font-medium text-[#F8F5EE]">
                  {blog.author.name}
                </p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-white/10 sm:block" />

            <div className="flex items-center gap-2 text-[#B8C1CC]">
              <CalendarDays className="h-4 w-4 text-[#C2A35E]" />
              <span>{blog.publishedAt}</span>
            </div>

            <div className="flex items-center gap-2 text-[#B8C1CC]">
              <Clock3 className="h-4 w-4 text-[#C2A35E]" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-[#D4DCE5]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#C2A35E]/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A1320] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/70 via-transparent to-transparent" />

            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="h-[420px] w-full object-cover object-center"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#07111F]/80 px-4 py-2 backdrop-blur-xl">
                <div className="h-2 w-2 rounded-full bg-[#C2A35E]" />
                <span className="text-xs uppercase tracking-[0.18em] text-[#E7D3A2]">
                  Editorial Insight
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}