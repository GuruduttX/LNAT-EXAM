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
  title: "LNAT Universities Hub | LNAT Exam India",
  description:
    "Explore LNAT universities through a premium topic hub with rankings, city context, admissions fit, and detailed university profiles.",
};

const faqItems = [
  {
    question: "How should I use this page to shortlist universities?",
    answer:
      "Start by comparing cities, law-school reputation, LNAT requirements, and the kind of student experience you want. Then open the universities that feel strongest for your shortlist.",
  },
  {
    question: "What should I compare before opening an individual university guide?",
    answer:
      "Start with country, city, LNAT requirement, law-school reputation, teaching environment, and your likely admissions competitiveness. Then open the full profile for detail.",
  },
  {
    question: "Should I use this hub only for UK universities?",
    answer:
      "No. The hub can include any university relevant to LNAT-driven law admissions, but it is especially useful for comparing the strongest LNAT-linked options in one place.",
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
      {
        "@type": "CollectionPage",
        name: "LNAT Universities Hub",
        description:
          "A topic hub for exploring LNAT universities, comparing fit, and moving into detailed university guides.",
        url: "https://www.lnatexamindia.com/universities",
      },
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Universities", href: "/universities" },
      ]),
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
                What To Compare
              </p>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </div>

            <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start max-w-3xl">
              The questions that matter when choosing a{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                university
              </span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Globe2,
                title: "Admissions Fit",
                description:
                  "Compare LNAT requirement, deadlines, selectivity, and how competitive a university may feel for your profile.",
              },
              {
                icon: GraduationCap,
                title: "Law-School Positioning",
                description:
                  "Use rankings and reputation as a starting point, then go deeper into the full university guide.",
              },
              {
                icon: Compass,
                title: "City And Student Life",
                description:
                  "The right law school also has to match the city you will live in and the kind of student life you want.",
              },
              {
                icon: CheckCircle2,
                title: "Next-Step Research",
                description:
                  "Once a university looks promising, open its full guide and compare admissions, city life, and outcomes in more detail.",
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
        </div>
      </section>

      <ArchiveClient universities={universities} />

      <FAQSection faqItems={faqItems}/>

      <NextStepCTA />
    </main>
  );
}
