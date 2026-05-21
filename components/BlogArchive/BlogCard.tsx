import React from "react";
import { Blog } from "@/types/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col w-full h-full bg-white rounded-[1.25rem] overflow-hidden border border-[#0F172A]/5 transition-all duration-[600ms] ease-out hover:border-[#C4A47C]/30 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.06)]">
      {/* Cinematic Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0F172A]/5">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
        />
        {/* Subtle Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow p-6 md:p-8">
        {/* Category Badge */}
        <div className="flex items-center mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#C4A47C]">
          <span>{blog.category}</span>
        </div>

        {/* Title & Excerpt */}
        <h3 className="text-[1.35rem] md:text-2xl font-serif text-[#0F172A] leading-snug mb-3 line-clamp-2 group-hover:text-[#C4A47C] transition-colors duration-500">
          {blog.title}
        </h3>
        <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-3 mb-6 flex-grow">
          {blog.excerpt}
        </p>

        {/* Editorial Footer */}
        <div className="pt-5 mt-auto border-t border-[#0F172A]/5 flex items-center justify-between text-xs text-slate-400 font-medium tracking-wide">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#C4A47C]" />
            <span>{blog.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#C4A47C]" />
            <span>{blog.readTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}
