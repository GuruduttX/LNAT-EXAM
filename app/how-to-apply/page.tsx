import type { Metadata } from "next";

import ApplyHero from "@/components/how-to-apply/ApplyHero"; // Use your existing hero
import ApplyTimeline from "@/components/how-to-apply/ApplyTimeline";
import ApplyDeadlines from "@/components/how-to-apply/ApplyDeadlines";
import ApplyHowWeHelp from "@/components/how-to-apply/ApplyHowWeHelp";
import FAQSection from "@/components/universities/FAQSection";
import FAQFinalCTA from "@/components/faq/FAQFinalCTA"; // Reuse your high-converting CTA
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "How to Apply for UK Law from India 2027: LNAT, UCAS & Steps",
  description:
    "Step-by-step guide to applying for law at UK universities and JGLS from India — qualifications, LNAT, UCAS, deadlines and interviews.",
  alternates: {
    canonical: "/how-to-apply",
  },
};

const applicationSteps = [
  "Choose your universities from the nine UK LNAT universities and JGLS if applying in India.",
  "Check academic requirements, including A-level, IB or accepted Indian-board equivalency.",
  "Register and sit the LNAT via Pearson VUE; pay GBP 120 outside the UK/EU; one attempt per cycle.",
  "Apply through UCAS with up to five choices, personal statement and reference.",
  "Attend interviews if shortlisted, especially for Oxbridge, then respond to offers.",
];

const faqItems = [
  {
    question: "How do Indian students apply to UK universities for law?",
    answer:
      "Through UCAS: one online application with up to five course choices, plus the LNAT for LNAT universities, a personal statement, a reference and, where required, an interview.",
  },
  {
    question: "Do I need the LNAT to apply for UK law?",
    answer:
      "For the nine LNAT universities, yes. Many other UK law courses do not require it, so it depends on your shortlist.",
  },
  {
    question: "What grades do I need for UK law?",
    answer:
      "Top universities expect strong grades. Oxford, for example, asks for A-levels AAA or IB 38 with 6,6,6 at Higher Level, or an accepted equivalent. Requirements vary by university.",
  },
  {
    question: "Can I apply with CBSE or ISC results?",
    answer:
      "Indian Standard XII alone is often not accepted as a direct equivalent at the most selective universities. Many Indian applicants offer A-levels, the IB or a recognised foundation route. Check each university's international page.",
  },
  {
    question: "Do I need IELTS for UK law?",
    answer:
      "Usually yes, unless exempt. Selective universities ask for a high IELTS score, often around 7.0-7.5. Verify the exact threshold for your university.",
  },
  {
    question: "What is UCAS?",
    answer:
      "UCAS is the centralised UK undergraduate application service. You submit one application listing up to five courses; your LNAT results are sent to universities automatically.",
  },
  {
    question: "How many universities can I apply to?",
    answer:
      "Up to five course choices on UCAS. Note that you cannot apply to both Oxford and Cambridge in the same cycle.",
  },
  {
    question: "When is the UCAS deadline for law?",
    answer:
      "Oxford and Cambridge: 15 October. The main UCAS deadline falls in mid-to-late January; verify the exact date for your cycle on ucas.com.",
  },
  {
    question: "When should I start my application?",
    answer:
      "Begin 12-18 months ahead. For 2027 entry, plan your LNAT and UCAS work across 2026, with Oxbridge applicants finishing earliest.",
  },
  {
    question: "What goes in a law personal statement?",
    answer:
      "Genuine engagement with law: relevant reading, reasoning and motivation shown through specific examples rather than generic statements.",
  },
  {
    question: "Do I need work experience for UK law?",
    answer:
      "It is not required for undergraduate law, though reading and reasoning matter. Demonstrated interest counts more than formal legal experience.",
  },
  {
    question: "Will I be interviewed?",
    answer:
      "Some universities, notably Oxford and Cambridge, interview shortlisted applicants. Interviews test how you think, not what you have memorised.",
  },
  {
    question: "How do offers work?",
    answer:
      "Universities make conditional or unconditional offers via UCAS. Conditional offers require you to meet stated grades, such as AAA.",
  },
  {
    question: "Do I need a visa to study law in the UK?",
    answer:
      "Yes. International students typically need a UK Student visa once they accept a place and meet the requirements. Apply after you have an offer and check current UKVI rules.",
  },
  {
    question: "How much does it cost to study law in the UK?",
    answer:
      "Overseas tuition is substantial and varies by university, plus living costs. Budget carefully and check each university's international fees.",
  },
  {
    question: "Can I apply to JGLS and UK universities with one LNAT?",
    answer:
      "Yes. The same LNAT sitting can support both, though JGLS assesses only Section A while UK universities may use both sections.",
  },
  {
    question: "Is the LNAT the only test I need?",
    answer:
      "For LNAT universities it is the admissions test for law. You will not usually need another admissions test, but always confirm course-specific requirements.",
  },
  {
    question: "Can I apply after the deadline?",
    answer:
      "Late applications are limited and university-dependent, mainly for international applicants, and Oxbridge deadlines are firm. Apply on time.",
  },
  {
    question: "Do I apply to JGLS through UCAS?",
    answer:
      "No. JGLS has its own admission process in India; you sit the LNAT and apply directly to JGLS within its windows.",
  },
  {
    question: "What if I miss my conditional offer grades?",
    answer:
      "You may be reconsidered, placed in Clearing, or lose the place depending on the university. Strong LNAT and grades reduce this risk.",
  },
];

export default function HowToApplyPage() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "How to Apply for UK & JGLS Law from India: Full Guide",
        name: "How to Apply for UK & JGLS Law from India: Full Guide",
        url: `${siteUrl}/how-to-apply`,
        description:
          "Step-by-step guide to applying for law at UK universities and JGLS from India: qualifications, LNAT, UCAS, deadlines and interviews.",
        author: {
          "@type": "Organization",
          name: "LNAT Exam India",
        },
        publisher: {
          "@type": "Organization",
          name: "LNAT Exam India",
        },
      },
      {
        "@type": "HowTo",
        name: "How to apply for UK law from India",
        description:
          "A practical application path for Indian students applying to UK law universities and JGLS.",
        step: applicationSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `Step ${index + 1}`,
          text: step,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
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
        { label: "How To Apply", href: "/how-to-apply" },
      ]),
    ],
  };

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ApplyHero />
      <ApplyDeadlines />
      <ApplyTimeline />
      <ApplyHowWeHelp />
      <FAQSection
        faqItems={faqItems}
        eyebrow="Application FAQ"
        heading="Frequently asked questions about"
        highlightedHeading="applying from India"
      />
      <FAQFinalCTA />
    </main>
  );
}
