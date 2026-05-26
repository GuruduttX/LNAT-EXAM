import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, Globe2, GraduationCap } from "lucide-react";

import ArchiveClient from "@/components/universities/ArchiveClient";
import ArchiveHero from "@/components/universities/ArchiveHero";
import { getPublishedUniversities } from "@/services/universityService";
import { IUniversity } from "@/types/backend.types";

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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.lnatexamindia.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Universities",
            item: "https://www.lnatexamindia.com/universities",
          },
        ],
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

      <section className="border-b border-[#ece5d8] bg-white/75 px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
              University Research
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a] md:text-4xl">
              Find the right LNAT universities for your shortlist
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Explore universities that use the LNAT, compare where they are
              located, and understand which ones may suit your academic goals,
              city preferences, and application strategy.
            </p>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Each university page goes deeper into admissions context, law
              school reputation, city life, and the kind of student who may fit
              best there.
            </p>
          </div>

          <div className="rounded-[32px] border border-[#e4dccf] bg-[#f6f0e6] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8f6c35]">
              How To Shortlist
            </p>
            <div className="mt-6 space-y-5">
              {[
                "Decide which countries and cities you would genuinely be happy living in.",
                "Compare LNAT requirement, rankings, and overall law-school reputation.",
                "Open the full guide for the universities that feel strongest for your goals and budget.",
              ].map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0e1b2a] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {spotlightUniversities.length ? (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
                  Featured Universities
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a] md:text-4xl">
                  Good places to begin your research
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Start with these universities if you want a clear sense of how
                  different law schools compare on reputation, location, and
                  admissions fit.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
              {spotlightUniversities.map((university) => (
                <Link
                  key={university.slug}
                  href={`/universities/${university.slug}`}
                  className="rounded-[28px] border border-[#e4dccf] bg-white p-7 shadow-[0_16px_36px_rgba(20,31,45,0.05)] transition hover:border-[#c5a059]/60"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b08d4f]">
                    {university.country}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#0e1b2a]">
                    {university.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {getLeadDescription(university)}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-[#efe7d8] bg-[#fbfaf7] p-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Global Ranking
                      </p>
                      <p className="mt-2 text-sm font-medium text-[#0e1b2a]">
                        {university.globalRanking}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        LNAT Status
                      </p>
                      <p className="mt-2 text-sm font-medium text-[#0e1b2a]">
                        {university.lnatRequirement}
                      </p>
                    </div>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0e1b2a]">
                    View full university guide
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-[#ece5d8] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
              What To Compare
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a] md:text-4xl">
              The questions that matter when choosing a university
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
                className="rounded-[28px] border border-[#e4dccf] bg-[#fbfaf7] p-6"
              >
                <item.icon className="h-5 w-5 text-[#b08d4f]" />
                <h3 className="mt-5 text-xl font-semibold text-[#0e1b2a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArchiveClient universities={universities} />

      <section className="border-t border-[#ece5d8] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a] md:text-4xl">
              Common questions when comparing LNAT universities
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-[24px] border border-[#e4dccf] bg-[#fbfaf7] px-6 py-5"
              >
                <summary className="cursor-pointer list-none text-lg font-medium text-[#0e1b2a]">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-8">
        <div className="mx-auto max-w-7xl rounded-[34px] bg-[#14263a] px-8 py-12 text-[#f7f3ec] md:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c39a]">
            Next Step
          </p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">
                Turn this shortlist into a smarter LNAT application plan
              </h2>
              <p className="mt-4 text-base leading-8 text-[#d7e0ea]">
                Once you have 3 to 5 credible targets, move into the individual university
                guides and pair them with your preparation strategy, essay planning, and
                application timeline.
              </p>
            </div>
            <Link
              href="/how-to-apply"
              className="inline-flex items-center gap-2 rounded-full bg-[#c5a059] px-6 py-3 text-sm font-semibold text-[#14263a] transition hover:bg-[#d9c39a]"
            >
              Explore Application Guidance
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
