"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface MobilePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function MobilePagination({
  currentPage,
  totalPages,
  onPageChange,
}: MobilePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 md:px-6 py-1 md:py-3.5 rounded-full bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 disabled:opacity-30 transition-opacity"
      >
        <ChevronLeft size={20} className="text-white" />
      </button>

      <span className="text-xs text-white/90 font-medium tracking-[0.2em]">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 disabled:opacity-30 transition-opacity"
      >
        <ChevronRight size={20} className="text-white" />
      </button>
    </motion.div>
  );
}
