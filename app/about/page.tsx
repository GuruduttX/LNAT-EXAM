import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

import AboutCTA from "@/components/about/AboutCTA";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "About LNAT Exam India | Admissions Guidance for Indian Students",
  description:
    "Learn how LNAT Exam India helps Indian students navigate LNAT preparation and UK law admissions through structured guidance, university research, and carefully reviewed resources.",
  alternates: {
    canonical: "/about",
  },
};

const purposeItems = [
  {
    icon: GraduationCap,
    title: "LNAT preparation",
    description:
      "Clear explanations of the exam format, reasoning skills, essay expectations, and preparation milestones.",
  },
  {
    icon: Landmark,
    title: "University research",
    description:
      "Structured university guides that help students compare LNAT requirements, admissions context, and academic fit.",
  },
  {
    icon: BookOpenCheck,
    title: "Admissions clarity",
    description:
      "Practical guidance that connects exam preparation with the wider UK law application journey.",
  },
];

const editorialSteps = [
  {
    icon: SearchCheck,
    title: "Start with authoritative sources",
    description:
      "Time-sensitive exam details should be checked against official LNAT and university sources before publication.",
  },
  {
    icon: FileCheck2,
    title: "Show when facts were reviewed",
    description:
      "University guides and editorial content are designed to surface freshness dates and source references where relevant.",
  },
  {
    icon: ShieldCheck,
    title: "Avoid unsupported claims",
    description:
      "Results, testimonials, and credentials should only be published when they can be verified and represented accurately.",
  },
];

export default function AboutPage() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "LNAT Exam India",
        url: siteUrl,
        email: "contact@lnatexamindia.com",
        description:
          "LNAT preparation and UK law admissions guidance for Indian students.",
      },
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}/about#webpage`,
        url: `${siteUrl}/about`,
        name: "About LNAT Exam India",
        description:
          "How LNAT Exam India approaches LNAT preparation, UK law admissions guidance, and editorial accuracy.",
        about: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ]),
    ],
  };

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden border-b border-black/[0.07] bg-[#F7F3EC] px-4 pb-12 pt-10 sm:px-6 md:pb-16 lg:px-8">
        <DotGrid />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
              ]}
              className="mb-7 justify-center lg:justify-start"
            />
            <SectionLabel text="About LNAT Exam India" />
            <h1 className="text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1.08] tracking-tight text-[#0D1B3E]">
              Clearer guidance for an{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                ambitious law journey
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.85] text-slate-600 md:text-[16px] lg:mx-0">
              LNAT Exam India is built to help Indian students understand the
              LNAT and explore UK law admissions with greater clarity. We bring
              exam guidance, university research, and practical resources into
              one focused platform.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link
                href="/how-to-apply"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0D1B3E] px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#162447] sm:w-auto"
              >
                Explore how to apply
                <ArrowRight
                  size={15}
                  className="text-[#C9A84C] transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/free-resources"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-6 py-3.5 text-[14px] font-bold text-[#0D1B3E] transition-colors hover:border-[#C9A84C]/45 sm:w-auto"
              >
                Browse free resources
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="absolute -bottom-4 -right-4 h-[88%] w-[88%] rounded-3xl bg-[#C9A84C]/15" />
            <div className="relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_20px_54px_rgba(13,27,62,0.14)]">
              <Image
                src="/images/most-beautiful-campuses-oxford-university.webp"
                alt="Historic university architecture representing UK law admissions"
                width={1200}
                height={900}
                priority
                className="h-[320px] w-full object-cover md:h-[460px] lg:h-[540px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent px-6 pb-6 pt-20">
                <p className="max-w-md text-[13px] font-medium leading-relaxed text-white/85">
                  Focused on the questions Indian students face while preparing
                  for the LNAT and researching UK law universities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <DotGrid />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel text="Our Purpose" centered />
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              A focused starting point for better decisions
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
              The LNAT is only one part of a larger admissions process. Our aim
              is to make that process easier to understand without reducing it
              to shortcuts or unsupported promises.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {purposeItems.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-[18px] font-bold text-[#0D1B3E]">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.07] bg-[#FDFBF7] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div>
            <SectionLabel text="Our Approach" />
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Structured guidance, not information overload
            </h2>
            <p className="mt-5 text-[14px] leading-[1.85] text-slate-600">
              Students should be able to move from a broad question to the
              right level of detail without getting lost in disconnected
              articles. That is why this site is organised around topic hubs,
              university guides, practical FAQs, and free resources.
            </p>
            <Link
              href="/topics"
              className="group mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-[#8B6914]"
            >
              Explore topic hubs
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="rounded-3xl border border-[#C9A84C]/15 bg-[#0D1B3E] p-6 shadow-[0_16px_40px_rgba(13,27,62,0.18)] md:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <HeartHandshake size={20} className="text-[#C9A84C]" />
              <h3 className="text-[18px] font-bold text-white">
                What students should expect
              </h3>
            </div>
            <div className="mt-6 space-y-5">
              {[
                "Plain-language explanations before deeper detail.",
                "Clear links between LNAT preparation and university admissions.",
                "Transparent references for facts that can change over time.",
                "No fabricated outcomes, urgency, or unsupported guarantees.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-[#C9A84C]"
                  />
                  <p className="text-[13px] leading-relaxed text-white/70">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <DotGrid />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="max-w-3xl">
            <SectionLabel text="Editorial Accuracy" />
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Trust depends on keeping important facts current
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
              Exam fees, dates, and university requirements can change. Our
              content structure is designed to keep source references,
              fact-check dates, and editorial review visible where they matter.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {editorialSteps.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1B3E]/5 text-[#0D1B3E]">
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-bold text-[#C9A84C]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-[16px] font-bold text-[#0D1B3E]">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <a
            href="https://lnat.ac.uk/"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-[#8B6914]"
          >
            Visit the official LNAT website
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      <section className="border-t border-black/[0.07] bg-[#FDFBF7] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionLabel text="People And Proof" />
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Credibility should be verifiable
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-[1.85] text-slate-600">
              Faculty profiles, reviewer credentials, results, and student
              stories should only appear when the underlying details have been
              verified and publication consent is in place. This page is
              intentionally structured to add those trust signals without
              inventing them.
            </p>
          </div>

          <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/[0.06] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B6914]">
              Publication Standard
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#0D1B3E]">
              Named mentors, author profiles, and success stories will be added
              as verified records with clear attribution, credentials, and
              consent.
            </p>
          </div>
        </div>
      </section>

      <AboutCTA />
    </main>
  );
}

function SectionLabel({
  text,
  centered = false,
}: {
  text: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
    >
      <div className="h-px w-8 bg-[#C9A84C]/40" />
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
        {text}
      </span>
      <div className="h-px w-8 bg-[#C9A84C]/40" />
    </div>
  );
}

function DotGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
  );
}
