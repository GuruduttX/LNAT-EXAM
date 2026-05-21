"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlogContentProps {
  /**
   * HTML string from the rich text editor / CMS
   */
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* 
        Editorial CSS rules.
        We use arbitrary Tailwind child selectors ([&_element]:...) 
        to guarantee absolute control over the CMS-provided HTML 
        without relying on external typography plugins.
      */}
      <div
        className={`
          w-full 
          
          /* ================= Base Typography ================= */
          text-[#B8C1CC] font-light text-base sm:text-lg leading-[1.8] tracking-wide
          
          /* ================= Headings ================= */
          [&_h1]:text-3xl sm:[&_h1]:text-5xl [&_h1]:font-serif [&_h1]:font-medium [&_h1]:text-[#F8F5EE] [&_h1]:tracking-tight [&_h1]:mb-8 [&_h1]:leading-[1.15]
          
          [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-serif [&_h2]:font-medium [&_h2]:text-[#F8F5EE] [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:pt-8 [&_h2]:border-t [&_h2]:border-white/10 [&_h2]:tracking-tight
          
          [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-serif [&_h3]:font-medium [&_h3]:text-[#E7D3A2] [&_h3]:mt-10 [&_h3]:mb-4
          
          [&_h4]:text-lg [&_h4]:font-serif [&_h4]:font-medium [&_h4]:text-[#F8F5EE] [&_h4]:mt-8 [&_h4]:mb-3
          
          /* ================= Paragraphs & Inline Styles ================= */
          [&_p]:mb-7 last:[&_p]:mb-0
          [&_strong]:text-[#F8F5EE] [&_strong]:font-medium
          
          /* ================= Links ================= */
          [&_a]:text-[#C2A35E] [&_a]:underline [&_a]:underline-offset-[6px] [&_a]:decoration-[#C2A35E]/30 hover:[&_a]:decoration-[#C2A35E] [&_a]:transition-all [&_a]:duration-300 hover:[&_a]:text-[#E7D3A2]
          
          /* ================= Lists ================= */
          [&_ul]:mb-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_ul]:marker:text-[#C2A35E]
          [&_ol]:mb-8 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-3 [&_ol]:marker:text-[#C2A35E]
          [&_li]:pl-2 [&_li>p]:mb-0
          
          /* ================= Blockquotes ================= */
          [&_blockquote]:my-10 [&_blockquote]:border-l-[3px] [&_blockquote]:border-[#C2A35E]/40 [&_blockquote]:bg-linear-to-r [&_blockquote]:from-[#C2A35E]/5 [&_blockquote]:to-transparent [&_blockquote]:px-6 sm:[&_blockquote]:px-8 [&_blockquote]:py-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic [&_blockquote]:text-[#F8F5EE] [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:leading-relaxed
          [&_blockquote>p]:mb-0
          
          /* ================= Images ================= */
          [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10 [&_img]:my-12 [&_img]:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] [&_img]:object-cover
          
          /* ================= Tables ================= */
          /* Uses a horizontal scroll wrapper natively via block/overflow behavior on mobile */
          [&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_table]:my-10 [&_table]:block [&_table]:overflow-x-auto sm:[&_table]:table [&_table]:whitespace-nowrap sm:[&_table]:whitespace-normal
          
          [&_thead]:bg-[#0A1320]/80 [&_thead]:border-b [&_thead]:border-[#C2A35E]/20
          
          [&_th]:py-4 [&_th]:px-5 [&_th]:font-serif [&_th]:text-[#E7D3A2] [&_th]:font-medium [&_th]:text-sm sm:[&_th]:text-base
          
          [&_tbody_tr]:border-b [&_tbody_tr]:border-white/5 hover:[&_tbody_tr]:bg-white/2 [&_tbody_tr]:transition-colors
          
          [&_td]:py-4 [&_td]:px-5 [&_td]:text-sm sm:[&_td]:text-base
          
          /* ================= Code Blocks ================= */
          /* Inline code */
          [&_code]:bg-[#0A1320] [&_code]:text-[#E7D3A2] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[0.9em] [&_code]:border [&_code]:border-white/10 [&_code]:font-mono
          
          /* Preformatted code blocks */
          [&_pre]:bg-[#0A1320] [&_pre]:p-6 [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:overflow-x-auto [&_pre]:my-10 [&_pre]:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
          
          /* Reset inline code styles when inside a pre block */
          [&_pre>code]:bg-transparent [&_pre>code]:p-0 [&_pre>code]:border-none [&_pre>code]:text-[#B8C1CC]
          
          /* ================= Dividers (HR) ================= */
          [&_hr]:border-t [&_hr]:border-white/10 [&_hr]:my-14
        `}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </motion.article>
  );
}
