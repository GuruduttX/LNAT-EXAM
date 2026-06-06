"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, FileDown, GraduationCap, GitCompare } from "lucide-react";

interface RelatedLink {
  label: string;
  href: string;
}

interface UniversityRelatedLinksProps {
  university: {
    relatedBlogs?: string[];
    relatedResources?: string[];
    relatedUniversities?: string[];
    comparisonLinks?: RelatedLink[];
  };
}

function formatSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function LinkCard({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const isExternal = href.startsWith("http");
  const className =
    "group flex items-center justify-between gap-4 rounded-2xl border border-black/[0.05] bg-white px-4 py-3 text-[13px] font-bold text-[#0D1B3E] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A84C]/35 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]";

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        <span>{label}</span>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#C9A84C] transition-transform group-hover:translate-x-1" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 shrink-0 text-[#C9A84C] transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export default function UniversityRelatedLinks({
  university,
}: UniversityRelatedLinksProps) {
  const groups = [
    {
      title: "Related guides",
      icon: BookOpen,
      links: (university.relatedBlogs || []).map((slug) => ({
        label: formatSlug(slug),
        href: `/blog/${slug}`,
      })),
    },
    {
      title: "Free resources",
      icon: FileDown,
      links: (university.relatedResources || []).map((slug) => ({
        label: formatSlug(slug),
        href: "/free-resources",
      })),
    },
    {
      title: "Related universities",
      icon: GraduationCap,
      links: (university.relatedUniversities || []).map((slug) => ({
        label: formatSlug(slug),
        href: `/universities/${slug}`,
      })),
    },
    {
      title: "Compare next",
      icon: GitCompare,
      links: university.comparisonLinks || [],
    },
  ].filter((group) => group.links.length);

  if (!groups.length) return null;

  return (
    <section className="border-t border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 max-w-3xl text-center md:text-start">
          <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
            <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Continue Exploring
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </div>
          <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
            Useful links for your next step
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => {
            const Icon = group.icon;

            return (
              <article
                key={group.title}
                className="rounded-[24px] border border-black/[0.07] bg-[#FDFBF7] p-5 shadow-[0_12px_30px_rgba(20,31,45,0.04)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C]">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-[15px] font-extrabold text-[#0D1B3E]">
                    {group.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {group.links.map((link) => (
                    <LinkCard
                      key={`${group.title}-${link.href}-${link.label}`}
                      href={link.href}
                      label={link.label}
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
