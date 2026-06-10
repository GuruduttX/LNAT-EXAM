"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  ExternalLink,
  FileText,
  Lock,
} from "lucide-react";

import LeadCaptureModal from "./LeadCaptureModal";
import type { IResource } from "./ResourcesClient";

const officialItems = [
  "Official practice papers: full Section A practice from the LNAT Consortium.",
  "Sample Section B essays: official prompts and example responses.",
  "Familiarisation tour: the real Pearson VUE interface.",
];

interface ResourcesOfficialPracticeProps {
  resources: IResource[];
}

export default function ResourcesOfficialPractice({
  resources,
}: ResourcesOfficialPracticeProps) {
  const [selectedResource, setSelectedResource] = useState<IResource | null>(
    null,
  );
  const highlightedResources = resources.slice(0, 5);

  return (
    <>
      <section className="relative overflow-hidden border-b border-black/[0.07] bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-black/[0.07] bg-[#FDFBF7] p-6 shadow-[0_12px_32px_rgba(13,27,62,0.05)] md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D1B3E] text-[#C9A84C]">
              <BookOpenCheck size={20} strokeWidth={1.7} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                Official LNAT practice
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-[#0D1B3E]">
                Start with official material
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {officialItems.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-white p-4">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                <p className="text-[13px] leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>

          <a
            href="https://lnat.ac.uk/"
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-2 text-[13px] font-bold text-[#8B6914]"
          >
            Visit official LNAT practice materials
            <ExternalLink
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <p className="mt-4 text-[12px] leading-6 text-slate-500">
            Always start with official material and link to lnat.ac.uk. We do
            not republish copyrighted LNAT papers.
          </p>
        </article>

        <article className="rounded-3xl border border-[#C9A84C]/20 bg-[#0D1B3E] p-6 text-white shadow-[0_20px_52px_rgba(13,27,62,0.18)] md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#C9A84C]">
              <FileText size={20} strokeWidth={1.7} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                LNAT Exam India guides
              </p>
              <h2 className="mt-1 text-xl font-extrabold">
                Use free guides with a plan
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            {highlightedResources.length ? (
              highlightedResources.map((resource) => (
                <button
                  key={resource.id}
                  type="button"
                  onClick={() => setSelectedResource(resource)}
                  className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left transition-colors hover:bg-white/[0.07]"
                >
                  <span>
                    <span className="block text-[13px] font-semibold text-white/85">
                      {resource.title}
                    </span>
                    <span className="mt-1 line-clamp-1 block text-[11px] leading-5 text-white/45">
                      {resource.shortDescription}
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#C9A84C]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#C9A84C]">
                    <Lock size={11} />
                    Access
                  </span>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5">
                <p className="text-[13px] leading-6 text-white/60">
                  Published resources from the CMS will appear here once they
                  are available.
                </p>
              </div>
            )}

            {highlightedResources.length ? (
              <a
                href="#resource-library"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:bg-white/[0.07]"
              >
                <span className="text-[13px] font-semibold text-white/80">
                  Browse the full resource library
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-[#C9A84C] transition-transform group-hover:translate-x-1"
                />
              </a>
            ) : null}
          </div>
        </article>
      </div>
    </section>
      <LeadCaptureModal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        resource={selectedResource}
      />
    </>
  );
}
