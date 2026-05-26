"use client";

import { motion } from "framer-motion";

import { IBlog } from "@/types/backend.types";

import StickySidebar from "./StickySidebar";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface BlogContentLayoutProps {
  blog: IBlog;
  tocItems: TocItem[];
  displayUpdatedAt: string | null;
}

export default function BlogContentLayout({
  blog,
  tocItems,
  displayUpdatedAt,
}: BlogContentLayoutProps) {
  return (
    <section className="bg-[#F8F5EE] px-4 py-10 text-black sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mx-auto w-full max-w-3xl lg:mx-0"
          >
            {(blog.tldr || blog.keyTakeaways?.length || blog.sources?.length) ? (
              <aside className="mb-10 rounded-[30px] border border-[#D9D0C1] bg-white p-6 shadow-[0_14px_32px_rgba(20,31,45,0.05)] lg:p-7">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
                      In Brief
                    </p>
                    {blog.tldr ? (
                      <p className="mt-3 text-base leading-8 text-slate-700">
                        {blog.tldr}
                      </p>
                    ) : (
                      <p className="mt-3 text-base leading-8 text-slate-700">
                        This page is structured to help you understand the key
                        idea fast, then move into the deeper context below.
                      </p>
                    )}
                  </div>

                  <div className="rounded-[24px] border border-[#E5DCCB] bg-[#FCFBF8] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B08D4F]">
                      Freshness Snapshot
                    </p>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                      <div className="flex items-center justify-between gap-3">
                        <span>Updated</span>
                        <span className="font-medium text-[#0E1B2A]">
                          {displayUpdatedAt || "Recently"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Read time</span>
                        <span className="font-medium text-[#0E1B2A]">
                          {blog.readTime} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Sources</span>
                        <span className="font-medium text-[#0E1B2A]">
                          {blog.sources?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {blog.keyTakeaways?.length ? (
                  <div className="mt-6 border-t border-[#E7DECF] pt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
                      Key Takeaways
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                      {blog.keyTakeaways.map((item, index) => (
                        <li key={`${item}-${index}`} className="flex gap-3">
                          <span className="font-semibold text-[#B08D4F]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </aside>
            ) : null}

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {blog.sources?.length ? (
              <section className="mt-12 rounded-[30px] border border-[#D9D0C1] bg-white p-6 shadow-[0_14px_32px_rgba(20,31,45,0.05)] lg:p-7">
                <h2 className="text-2xl font-semibold text-[#0E1B2A]">
                  Sources
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  We use source links to support factual clarity and make this
                  article easier to verify, compare, and cite responsibly.
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                  {blog.sources.map((source, index) => (
                    <li key={`${source}-${index}`}>
                      <a
                        href={source}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#B08D4F] underline underline-offset-4 transition-colors hover:text-[#8F6C2D]"
                      >
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {blog.faqs?.length ? (
              <section className="mt-12">
                <div className="mb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
                    Answer Engine Layer
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#0E1B2A]">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-4">
                  {blog.faqs.map((faq, index) => (
                    <details
                      key={`${faq.question}-${index}`}
                      className="rounded-[24px] border border-[#D9D0C1] bg-white px-6 py-5 shadow-[0_10px_24px_rgba(20,31,45,0.04)]"
                    >
                      <summary className="cursor-pointer list-none text-lg font-medium text-[#0E1B2A]">
                        {faq.question}
                      </summary>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </motion.article>

          <StickySidebar
            blog={blog}
            tocItems={tocItems}
            displayUpdatedAt={displayUpdatedAt}
          />
        </div>
      </div>
    </section>
  );
}
