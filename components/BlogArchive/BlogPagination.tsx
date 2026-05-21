"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="hidden md:flex items-center justify-between w-full pt-6 border-t border-[#0F172A]/5">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wide text-slate-600 transition-colors hover:text-[#0F172A] disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft size={16} />
        <span>Previous</span>
      </button>

      {/* Page Indicators */}
      <div className="flex items-center gap-1.5 text-sm font-medium">
        <span className="text-[#0F172A]">{currentPage}</span>
        <span className="text-slate-400 mx-1">of</span>
        <span className="text-slate-400">{totalPages}</span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wide text-slate-600 transition-colors hover:text-[#0F172A] disabled:opacity-30 disabled:pointer-events-none"
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
