"use client";

import React from "react";
import { BlogCategory } from "@/types/blog";

interface BlogFiltersProps {
  categories: BlogCategory[];
  activeCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
}

export default function BlogFilters({
  categories,
  activeCategory,
  onSelectCategory,
}: BlogFiltersProps) {
  return (
    <div className="relative w-full border-b border-[#0F172A]/5 pb-4">
      {/* Horizontal Scroll Container (Scrollbar hidden) */}
      <div className="flex items-center gap-2 overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`relative px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.08em] uppercase transition-all duration-300 whitespace-nowrap ${
              activeCategory === cat
                ? "bg-[#0F172A] text-[#C4A47C] shadow-md"
                : "bg-transparent text-slate-500 hover:text-[#0F172A] hover:bg-[#0F172A]/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
