import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, Globe2, GraduationCap } from "lucide-react";

import ArchiveClient from "@/components/universities/ArchiveClient";
import ArchiveHero from "@/components/universities/ArchiveHero";
import FAQSection from "@/components/universities/FAQSection";
import { getPublishedUniversities } from "@/services/universityService";
import { IUniversity } from "@/types/backend.types";
import NextStepCTA from "@/components/universities/NextStepCTA";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";

export const metadata = {
  title: "LNAT Universities 2027: Full List of UK Unis + JGLS (India)",
  description:
    "Every university that requires the LNAT — Oxford, Cambridge, UCL, LSE, KCL, Durham, Bristol, Glasgow, SOAS and JGLS — with scores and guides.",
};

const faqItems = [
  {
    question: "Which universities require the LNAT?",
    answer:
      "Nine UK universities: Oxford, Cambridge, UCL, LSE, King's College London, Durham, Bristol, Glasgow and SOAS. Internationally, IE University (Spain), NUS and SUSS (Singapore) and Jindal Global Law School (India) also require it.",
  },
  {
    question: "How many universities use the LNAT?",
    answer:
      "Currently nine in the UK, plus a handful internationally. The list changes occasionally as universities join or leave the consortium, so confirm for your entry year.",
  },
  {
    question: "Is the LNAT only for UK universities?",
    answer:
      "No. Beyond the nine UK universities, IE University in Spain, NUS and SUSS in Singapore, and JGLS in India use the LNAT. JGLS is the only Indian member of the LNAT Consortium.",
  },
  {
    question: "Do all Russell Group universities require the LNAT?",
    answer:
      "No. Only some Russell Group law schools use the LNAT. Many top UK law courses do not require it at all, so always check each university individually.",
  },
  {
    question: "Which universities stopped using the LNAT?",
    answer:
      "The University of Nottingham stopped requiring the LNAT from 2022 entry. Requirements can change, so verify the current list on the official LNAT website before applying.",
  },
  {
    question: "Does Oxford require the LNAT?",
    answer:
      "Yes, for the BA in Jurisprudence and Law with Law Studies in Europe, including overseas and Indian applicants. Oxford uses both Section A and the Section B essay.",
  },
  {
    question: "Does Cambridge require the LNAT?",
    answer:
      "Yes. Cambridge introduced the LNAT for 2022 entry, replacing its earlier Cambridge Law Test, and uses both sections in assessment.",
  },
  {
    question: "Does UCL require the LNAT?",
    answer:
      "Yes. UCL requires the LNAT and applies a benchmark score approach, considering it alongside your academic record and personal statement.",
  },
  {
    question: "Does LSE require the LNAT?",
    answer:
      "Yes. LSE requires the LNAT and relies mainly on the Section A multiple-choice score; it typically asks applicants to sit the test earlier than some other universities.",
  },
  {
    question: "Does King's College London require the LNAT?",
    answer:
      "Yes. KCL requires the LNAT for its law programmes and, like other London universities, asks applicants to sit it relatively early in the cycle.",
  },
  {
    question: "Which universities use the Section B essay?",
    answer:
      "Oxford reads and centrally marks the essay; Bristol weights it at around 40%. Several others consider it variably, while some rely mainly on Section A. Check each university for your year.",
  },
  {
    question: "What LNAT score do top universities want?",
    answer:
      "There is no fixed cut-off anywhere. A score of 25+ is broadly competitive; Oxford and Cambridge see shortlisted or offer averages near 29-31. Set your target against your specific universities.",
  },
  {
    question: "Which LNAT university is easiest to get into?",
    answer:
      "No university publishes a cut-off, so none is officially easiest. Competitiveness depends on the course, the year and the whole application, not the LNAT alone.",
  },
  {
    question: "Can I use one LNAT score for several universities?",
    answer:
      "Yes. You sit the LNAT once per cycle and your results are sent automatically to all the LNAT universities among your UCAS choices. You do not take it separately for each.",
  },
  {
    question: "Do universities see which other universities I applied to?",
    answer:
      "No. Universities receive your LNAT results, but UCAS does not show them the other course choices on your application, so each assesses you independently.",
  },
  {
    question: "How long is an LNAT score valid?",
    answer:
      "Your LNAT result is used for the admissions cycle in which you take it. If you apply again in a later cycle, you generally need to sit the test again. Confirm the current rule before relying on an old score.",
  },
  {
    question: "Do Scottish universities require the LNAT?",
    answer:
      "The University of Glasgow requires the LNAT for its main law programmes. Other Scottish universities may not, so check each one's admissions page.",
  },
  {
    question: "Which university weights the LNAT most heavily?",
    answer:
      "Bristol has stated a 60/40 split between Section A and the essay, with the LNAT forming a large part of the application. UCL uses a benchmark. Weighting varies, so research your targets.",
  },
  {
    question: "Does JGLS in India require the LNAT?",
    answer:
      "Yes. JGLS has made the LNAT-UK its mandatory entrance test for its integrated law programmes and assesses only Section A. It is the first Indian law school to adopt the LNAT.",
  },
  {
    question: "How do I decide which LNAT universities to target?",
    answer:
      "Match your academic profile, target score and essay strength to how each university uses the test, then balance ambitious and realistic choices across your five UCAS slots. We can help you build that shortlist.",
  },
];

function getLeadDescription(university: IUniversity) {
  return (
    university.excerpt40to60 ||
    university.shortDescription ||
    `Explore the admissions, student-life, and law-school profile for ${university.name}.`
  );
}

export default async function UniversitiesArchivePage() {
  const universityDocuments = await getPublishedUniversities();
  const universities = JSON.parse(
    JSON.stringify(universityDocuments),
  ) as IUniversity[];

  const featuredUniversities = universities
    .filter((university) => university.featured)
    .slice(0, 3);
  const fallbackFeatured = universities.slice(0, 3);
  const spotlightUniversities =
    featuredUniversities.length > 0 ? featuredUniversities : fallbackFeatured;

  const countryCount = new Set(
    universities.map((university) => university.country).filter(Boolean),
  ).size;
  const requiredLnatCount = universities.filter(
    (university) => university.lnatRequirement === "Required",
  ).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Universities", href: "/universities" },
      ]),
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
      {
        "@type": "ItemList",
        name: "Published LNAT University Profiles",
        itemListElement: universities.map((university, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: university.name,
          url: `https://www.lnatexamindia.com/universities/${university.slug}`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ArchiveHero
        totalUniversities={universities.length}
        totalCountries={countryCount}
        requiredLnatCount={requiredLnatCount}
      />

      <section className="relative overflow-hidden border-b border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        {/* Dot grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(13,27,62,0.04) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 items-center">
          {/* Left Column */}
          <div className="flex flex-col">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
              University Research
            </p>

            <h2 className="mt-3 text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start">
              Find the right{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                LNAT universities
              </span>{" "}
              for your shortlist
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-center text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-start">
              Explore universities that use the LNAT, compare where they are
              located, and understand which ones may suit your academic goals,
              city preferences, and application strategy.
            </p>

            <p className="mx-auto mt-5 max-w-xl text-center text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-start">
              Each university page goes deeper into admissions context, law
              school reputation, city life, and the kind of student who may fit
              best there.
            </p>
          </div>

          {/* Right Column: Card */}
          <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8">
            {/* Optional Gold Accent Bar */}
            <div className="mb-6 hidden h-[3px] w-12 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] md:block" />

            <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E] md:text-start">
              How To Shortlist
            </p>

            <div className="mt-6 space-y-5">
              {[
                "Decide which countries and cities you would genuinely be happy living in.",
                "Compare LNAT requirement, rankings, and overall law-school reputation.",
                "Open the full guide for the universities that feel strongest for your goals and budget.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 md:flex-row md:items-start md:gap-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0D1B3E] text-[12px] font-bold text-[#C9A84C] shadow-sm">
                    {index + 1}
                  </div>
                  <p className="mt-0 text-[13px] leading-relaxed text-slate-600 md:mt-1 md:text-start">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ArchiveClient universities={universities} />

      {spotlightUniversities.length > 0 ? (
        <section className="relative w-full overflow-hidden bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8">
          {/* Dot grid texture */}
          <div
            className="absolute inset-0 pointer-events-none
      [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
      [background-size:26px_26px]"
          />

          <div className="relative z-10 mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex max-w-3xl flex-col">
                {/* Eyebrow */}
                <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
                  <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
                  <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                    Featured Universities
                  </span>
                  <div className="h-px w-8 bg-[#C9A84C]/40" />
                </div>

                {/* Heading */}
                <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start">
                  Good places to begin your{" "}
                  <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                    research
                  </span>
                </h2>

                {/* Paragraph */}
                <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-start">
                  Start with these universities if you want a clear sense of how
                  different law schools compare on reputation, location, and
                  admissions fit.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {spotlightUniversities.map((university) => (
                <Link
                  key={university.slug}
                  href={`/universities/${university.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
                >
                  {/* Hover Accent Bar */}
                  <div className="h-[3px] w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex flex-grow flex-col p-5 md:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                      {university.country}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#0D1B3E]">
                      {university.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-slate-500">
                      {getLeadDescription(university)}
                    </p>

                    {/* Stats Block (pushed to bottom) */}
                    <div className="mt-auto pt-6">
                      <div className="grid grid-cols-2 gap-3 rounded-xl border border-black/[0.04] bg-[#F7F3EC] p-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            Global Ranking
                          </p>
                          <p className="mt-1 text-[13px] font-bold text-[#0D1B3E]">
                            {university.globalRanking}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            LNAT Status
                          </p>
                          <p className="mt-1 text-[13px] font-bold text-[#0D1B3E]">
                            {university.lnatRequirement}
                          </p>
                        </div>
                      </div>

                      {/* Interactive CTA */}
                      <div className="mt-5 flex items-center gap-2 text-[13px] font-bold text-[#0D1B3E] transition-colors duration-200 group-hover:text-[#C9A84C]">
                        View full university guide
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-black/[0.07] bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          {/* Header Block */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                Scores And Shortlisting
              </p>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </div>

            <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start max-w-3xl">
              What score do these{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                universities expect?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-center text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-start">
              There is no universal pass mark. A Section A score of 25+ out of
              42 is broadly competitive; the most selective, Oxford and
              Cambridge, see shortlisted and offer-holder averages near 29-31.
              Treat all figures as indicative, not official cut-offs.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Globe2,
                title: "Oxbridge",
                description:
                  "Aim for a top Section A score and a strong essay. Oxford and Cambridge also sit inside the earliest UCAS deadline window in mid-October.",
              },
              {
                icon: GraduationCap,
                title: "London Universities",
                description:
                  "UCL, LSE and King's College London tend to weight Section A heavily and often expect applicants to test earlier in the cycle.",
              },
              {
                icon: Compass,
                title: "Durham, Bristol, Glasgow And SOAS",
                description:
                  "These universities assess LNAT performance alongside grades, personal statement strength and the wider application context.",
              },
              {
                icon: CheckCircle2,
                title: "India: JGLS",
                description:
                  "JGLS assesses only Section A, so Indian applicants can prioritise multiple-choice preparation instead of essay-heavy LNAT strategy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/[0.07] bg-[#FDFBF7] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
              >
                {/* Design System Icon Container */}
                <div
                  className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl md:mx-0"
                  style={{ background: "#C9A84C18", color: "#C9A84C" }}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                </div>

                <h3 className="mt-5 text-center text-[15px] font-bold text-[#0D1B3E] md:text-start">
                  {item.title}
                </h3>

                <p className="mt-2 text-center text-[13px] leading-relaxed text-slate-500 md:text-start">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#C9A84C]/20 bg-[#F7F3EC] p-5 text-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] md:p-6 md:text-start">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Next Step
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
              Explore each university&apos;s guide above for its requirement,
              target score, deadlines and how it assesses applicants, written
              specifically for Indian students.
            </p>
          </div>
        </div>
      </section>

      <FAQSection faqItems={faqItems} />

      <NextStepCTA />
    </main>
  );
}
