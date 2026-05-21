"use client";

import { motion } from "framer-motion";
import type { Blog } from "@/types/blog";
import StickySidebar from "./StickySidebar";

interface BlogContentLayoutProps {
  blog: Blog;
}

export default function BlogContentLayout({ blog }: BlogContentLayoutProps) {
  console.log(blog.content)
  return (
    <section className="bg-[#F8F5EE] text-black py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 items-start">
          {/* ========================================== */}
          {/* LEFT: Main Article Content                   */}
          {/* ========================================== */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="w-full max-w-3xl mx-auto lg:mx-0 blog-content"
          >
            {/* 
              Editorial typography configuration via Tailwind Prose.
              Ensures highly readable, cinematic text rendering. 
            */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.article>

          {/* ========================================== */}
          {/* RIGHT: Sticky Sidebar                        */}
          {/* ========================================== */}
          <StickySidebar />
        </div>
      </div>
    </section>
  );
}
