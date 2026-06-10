import type { Metadata } from "next";
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
import FAQSection from "@/components/universities/FAQSection";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";
import AboutHero from "@/components/about/AboutHero";
import MentorIntroduction from "@/components/about/Mentor";

export const metadata: Metadata = {
  title: "About LNAT Exam India | Specialist LNAT Coaching for India",
  description:
    "LNAT Exam India is a specialist LNAT coaching brand for Indian law aspirants — meet our mentors, method and mission.",
  alternates: {
    canonical: "/about",
  },
};

const purposeItems = [
  {
    icon: GraduationCap,
    title: "Section A reasoning and timing",
    description:
      "We coach the reasoning, passage analysis, assumptions, conclusions and time pressure that cause most lost marks.",
  },
  {
    icon: Landmark,
    title: "Section B essay coaching",
    description:
      "Students practise essays under real exam conditions and receive feedback on argument, structure and clarity.",
  },
  {
    icon: BookOpenCheck,
    title: "Mocks and application guidance",
    description:
      "Full-length mocks, registration support, UCAS/JGLS timelines and university shortlisting are connected into one plan.",
  },
];

const editorialSteps = [
  {
    icon: SearchCheck,
    title: "Timed deliberate practice",
    description:
      "Scores move through repeated timed work, review of every error and clear targets tied to the student’s test date.",
  },
  {
    icon: FileCheck2,
    title: "Honest mentor feedback",
    description:
      "Students receive specific feedback on weak question types, essay habits and the next practice priority.",
  },
  {
    icon: ShieldCheck,
    title: "No score guarantees",
    description:
      "We promise current preparation and straight answers, not invented statistics, guaranteed scores or admission promises.",
  },
];

const aboutFaqItems = [
  {
    question: "Who is LNAT Exam India for?",
    answer:
      "Indian students and parents preparing for the LNAT for UK law universities or JGLS, from first-time researchers to applicants who need a stronger score.",
  },
  {
    question: "Do you offer online or in-person classes?",
    answer:
      "Both formats can be supported depending on the programme and location. Message us for the current online and in-person options.",
  },
  {
    question: "How long are your LNAT programmes?",
    answer:
      "Programmes typically run several weeks and are scaled to the student’s test date. We build the timeline around the earliest university deadline.",
  },
  {
    question: "What does a programme include?",
    answer:
      "Section A teaching and drills, Section B essay coaching with marked feedback, full-length mocks and mentor support, depending on the programme chosen.",
  },
  {
    question: "How much does coaching cost?",
    answer:
      "Fees depend on the programme format and support level. Message us for current options; we recommend the most cost-effective fit, not the most expensive one.",
  },
  {
    question: "Do you offer a free trial or consultation?",
    answer:
      "You can request an initial consultation to discuss your target universities, test date and preparation stage.",
  },
  {
    question: "Who are your mentors?",
    answer:
      "Our mentors bring language assessment, exam preparation and admissions guidance experience. Full mentor details are shown on this page where credentials can be verified.",
  },
  {
    question: "Do you guarantee a score or admission?",
    answer:
      "No. The LNAT is one part of a competitive application and outcomes depend on many factors. We promise honest, expert preparation, not guarantees.",
  },
  {
    question: "What results have your students achieved?",
    answer:
      "We only publish outcomes that can be verified and shared with consent. We do not publish invented score improvements or admission claims.",
  },
  {
    question: "Do you help with JGLS preparation?",
    answer:
      "Yes. Since JGLS uses the LNAT-UK Section A only, we offer focused India-route preparation as well as full UK-application coaching.",
  },
  {
    question: "Do you help with the UCAS application?",
    answer:
      "Our core focus is the LNAT, with support around timelines, university shortlisting and application planning where relevant.",
  },
  {
    question: "Can I prepare alongside school or boards?",
    answer:
      "Yes. Most students do; timed practice and mocks can be spread across the weeks before the test.",
  },
  {
    question: "How do I enrol?",
    answer:
      "Message us on WhatsApp or use the enquiry form. We will discuss your target universities, timeline and the right programme.",
  },
  {
    question: "What are your batch sizes?",
    answer:
      "Batch structure depends on the programme. We keep feedback-focused formats so students can receive individual correction and guidance.",
  },
  {
    question: "Do you provide study materials and mocks?",
    answer:
      "Yes. Programmes can include practice sets, marked essays and full-length mocks. We also point students to official LNAT practice papers.",
  },
  {
    question: "What payment options do you accept?",
    answer:
      "Payment options are shared during enrolment based on the current programme and location.",
  },
  {
    question: "What is your refund or rescheduling policy?",
    answer:
      "Policy details are shared before enrolment so students and parents can make an informed decision.",
  },
  {
    question: "Which universities do you prepare students for?",
    answer:
      "All nine UK LNAT universities, with Oxbridge focus where needed, plus JGLS in India.",
  },
  {
    question: "How is your coaching different from generic tutoring?",
    answer:
      "We specialise in the LNAT and the universities that use it, with India-specific guidance rather than general tutoring with LNAT added as an extra subject.",
  },
  {
    question: "How can I contact you?",
    answer:
      "Use the enquiry form or WhatsApp button on the website. We usually reply as soon as the admissions guidance team is available.",
  },
];

export default function AboutPage() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
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
      {
        "@type": "FAQPage",
        mainEntity: aboutFaqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ]),
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <AboutHero />

      <section className="relative px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <DotGrid />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel text="Our Purpose" centered />
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Why we exist
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
              Indian test-prep is built around CLAT, LSAT-India and domestic
              entrances; few coaches understand the LNAT or how UK universities
              use it. Families researching law abroad often get generic advice
              or material written for UK students. We exist to fix that with
              rigorous, honest, India-specific LNAT preparation.
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
      
      <MentorIntroduction />
      <section className="border-y border-black/[0.07] bg-[#FDFBF7] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div>
            <SectionLabel text="Our Approach" />
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              What we do
            </h2>
            <p className="mt-5 text-[14px] leading-[1.85] text-slate-600">
              We coach Section A reasoning and timing, teach and mark Section B
              essays, run full-length mocks that reflect the real test
              environment, and guide the whole journey across shortlisting,
              UCAS/JGLS timelines, registration and deadlines.
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
                Our method & promise
              </h3>
            </div>
            <div className="mt-6 space-y-5">
              {[
                "A plan matched to target universities and deadlines.",
                "Regular timed practice and full-length mocks.",
                "Specific feedback on reasoning, timing and essay writing.",
                "Expert, current preparation without guaranteed score or admission claims.",
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
              Current guidance matters because LNAT details can change
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
              Exam fees, dates, test formats and university requirements can
              change. We check time-sensitive claims against official LNAT and
              university sources before relying on them in student guidance.
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

      <FAQSection
        faqItems={aboutFaqItems}
        eyebrow="Coaching FAQ"
        heading="Frequently asked questions about"
        highlightedHeading="our coaching"
      />

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
