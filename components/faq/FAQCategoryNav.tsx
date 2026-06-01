"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";

interface FAQCategoryNavProps {
  categories: string[];
}

export default function FAQCategoryNav({ categories }: FAQCategoryNavProps) {
  const [activeTab, setActiveTab] = useState(categories[0]);

  // Smooth scroll to the category section
  const scrollToCategory = (categoryId: string) => {
    setActiveTab(categoryId);
    const element = document.getElementById(`faq-category-${categoryId}`);
    if (element) {
      const yOffset = -120; // Slightly larger offset to account for the new taller nav
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div className="sticky top-20 z-40 mx-auto mt-8 w-full max-w-7xl px-2 md:px-4 sm:px-6 md:mt-12 lg:px-8">
      {/* Design System Glass Card Container */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-black/[0.07] bg-white px-2 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl md:px-4 md:py-4">
        {/* Centered Heading */}
        <div className="mb-3 flex w-full items-center justify-center gap-4 text-center">
          {/* Left Scroll Hint Arrow (Visible mostly on smaller screens where scrolling is needed) */}
          <div className="flex items-center text-slate-300 ">
            <ChevronLeft size={16} className="animate-pulse" />
          </div>

          {/* Main Heading Area */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#C9A84C]/10 text-[#C9A84C]">
              <ListFilter size={14} strokeWidth={2.5} />
            </div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E]">
              Filter by Category
            </h2>
          </div>

          {/* Right Scroll Hint Arrow */}
          <div className="flex items-center text-slate-300">
            <ChevronRight size={16} className="animate-pulse" />
          </div>
        </div>

        {/* Scrollable Tab Container */}
        <div className="w-full">
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden md:justify-center">
            {categories.map((category) => {
              const isActive = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className="shrink-0 whitespace-nowrap rounded-xl px-2 md:px-4 py-1.5 md:py-2.5 text-[10px] md:text-[13px] font-bold transition-all duration-300"
                  style={{
                    background: isActive ? "#0D1B3E" : "transparent",
                    color: isActive ? "#fff" : "#64748B",
                    boxShadow: isActive
                      ? "0 4px 12px rgba(13,27,62,0.25)"
                      : "none",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
