"use client";

import React from "react";
import { IBlog } from "@/types/backend.types";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface BlogGridProps {
  blogs: IBlog[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
    >
      {blogs.map((blog) => (
        <motion.div key={blog._id} variants={cardVariants} className="h-full">
          <Link
            href={`/blog/${blog.slug}`}
            className="block h-full outline-none"
          >
            <BlogCard blog={blog} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}