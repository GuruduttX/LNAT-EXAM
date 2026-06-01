"use client";

import React, { useState, useEffect } from "react";
// Assuming blogCategories is still exported from your data file or a types file
import { blogCategories } from "@/data/blogs";
import { BlogCategory } from "@/types/blog";
import { IBlog } from "@/types/backend.types";

import BlogArchiveHeader from "./BlogArchiveHeader";
import BlogFilters from "./BlogFilters";
import BlogGrid from "./BlogArchiveGrid";
import BlogPagination from "./BlogPagination";
import MobilePagination from "./MobilePagination";

const BLOGS_PER_PAGE = 6;

export default function BlogArchive() {
  // UI Control State
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [currentPage, setCurrentPage] = useState(1);

  // API Data State
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data whenever page or category changes
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        // Construct the URL with query parameters cleanly
        const url = new URL("/api/blogs", window.location.origin);
        url.searchParams.append("page", currentPage.toString());
        url.searchParams.append("limit", BLOGS_PER_PAGE.toString());

        if (activeCategory !== "All") {
          url.searchParams.append("category", activeCategory);
        }

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        setBlogs(data.blogs);
        setTotalPages(data.meta.totalPages || 1);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, activeCategory]);

  const handleCategoryChange = (category: BlogCategory) => {
    setActiveCategory(category);
    setCurrentPage(1); // Always reset to page 1 when switching categories
  };

  return (
    <section className="relative w-full bg-[#FDFBF7] py-12 md:py-16 px-6 lg:px-12 selection:bg-[#C4A47C]/20">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
        <BlogArchiveHeader />

        <BlogFilters
          categories={blogCategories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Subtle transition effect prevents jarring flashes while maintaining the key trigger for Framer Motion */}
        <div
          key={`${activeCategory}-${currentPage}`}
          className={`transition-opacity duration-300 ${isLoading ? "opacity-40" : "opacity-100"}`}
        >
          <BlogGrid blogs={blogs} />
        </div>

        {/* Prevent rendering empty pagination controls if there aren't enough blogs */}
        {totalPages > 1 && (
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {totalPages > 1 && (
        <MobilePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
