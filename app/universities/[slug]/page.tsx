import { notFound } from "next/navigation";

import {
  getPublishedUniversitySlugs,
  getUniversityBySlug,
} from "@/services/universityService";
import { IUniversity } from "@/types/backend.types";
import UniversityHero from "@/components/universities/detail/UniversityHero";
import UniversityOverview from "@/components/universities/detail/UniversityOverview";
import UniversityWhyChoose from "@/components/universities/detail/UniversityWhyChoose";
import UniversityCityLife from "@/components/universities/detail/UniversityCityLife";
import UniversityAdmissions from "@/components/universities/detail/UniversityAdmissions";
import UniversityCareers from "@/components/universities/detail/UniversityCareers";
import FAQSection from "@/components/universities/FAQSection";
import UniversitySources from "@/components/universities/detail/UniversitySources";
import UniversityFinalCTA from "@/components/universities/detail/UniversityFinalCTA";
import UniversityQuickFacts from "@/components/universities/detail/UniversityQuickFacts";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedUniversitySlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const university = await getUniversityBySlug(slug);

  if (!university) {
    return {
      title: "University Not Found | LNAT Exam India",
    };
  }

  return {
    title:
      university.metaTitle || `${university.name} LNAT Guide | LNAT Exam India`,
    description:
      university.metaDescription ||
      university.shortDescription ||
      `Explore LNAT admissions, student life, and application guidance for ${university.name}.`,
  };
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 text-center md:text-start">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#0e1b2a] md:text-4xl text-center md:text-start">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export default async function UniversityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const universityDocument = await getUniversityBySlug(slug);
  if (!universityDocument || universityDocument.status !== "published") {
    notFound();
  }

  const university = JSON.parse(
    JSON.stringify(universityDocument),
  ) as IUniversity;
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": university.schemaType || "CollegeOrUniversity",
        name: university.name,
        url: `${siteUrl}/universities/${university.slug}`,
        description: university.schemaDescription || university.shortDescription,
        sameAs: university.sameAs,
      },
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Universities", href: "/universities" },
        {
          label: university.shortName || university.name,
          href: `/universities/${university.slug}`,
        },
      ]),
    ],
  };

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-clip bg-[#fbfaf7] text-[#0e1b2a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <UniversityHero university={university} />
      {/* <section className="border-y border-[#e3ddd1] bg-white/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-10 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            icon={Globe2}
            label="Global Ranking"
            value={university.globalRanking}
          />
          <StatCard
            icon={Trophy}
            label="Law Ranking"
            value={university.lawSchoolRanking}
          />
          <StatCard
            icon={Calendar}
            label="Application Deadline"
            value={university.applicationDeadline}
          />
          <StatCard
            icon={GraduationCap}
            label="Tuition Fee"
            value={university.tuitionFee}
          />
          <StatCard
            icon={Users}
            label="Acceptance Rate"
            value={university.acceptanceRate}
          />
        </div>
      </section> */}
      <UniversityQuickFacts university={{
    globalRanking: university.globalRanking,
    lawSchoolRanking: university.lawSchoolRanking,
    applicationDeadline: university.applicationDeadline,
    tuitionFee: university.tuitionFee,
    acceptanceRate: university.acceptanceRate,
  }}/>
      <Section
        eyebrow="Quick Answer"
        title={`Why study at ${university.name}?`}
      >
        <div className="max-w-4xl">
          <p className="text-lg leading-8 text-slate-700 text-center md:text-start">
            {university.excerpt40to60 ||
              university.shortDescription ||
              `${university.name} offers a strong academic environment, a credible law-school reputation, and a distinctive student experience for ambitious law applicants.`}
          </p>
        </div>
      </Section>

      <UniversityOverview university={university} />

      <UniversityWhyChoose
        university={{
          name: university.name,
          shortName: university.shortName,
          whyChooseThisUniversity: university.whyChooseThisUniversity,
        }}
      />

      <UniversityCityLife
        university={{
          city: university.city,
          location: university.location,
          cityLife: {
            cityOverview: university.cityLife?.cityOverview,
          },
          gallery: {
            cityLifeImages: university.gallery?.cityLifeImages,
          },
        }}
      />

      <UniversityAdmissions
        university={{
          name: university.name,
          lnatRequirement: university.lnatRequirement,
          applicationDeadline: university.applicationDeadline,
          admissions: {
            overview: university.admissions?.overview,
            howLNATIsUsed: university.admissions?.howLNATIsUsed,
            targetLNATScore: university.admissions?.targetLNATScore,
            applicationTips: university.admissions?.applicationTips,
          },
        }}
      />

      <UniversityCareers
        university={{
          careers: {
            employabilityOverview: university.careers?.employabilityOverview,
            topRecruiters: university.careers?.topRecruiters,
          },
          famousAlumni: university.famousAlumni,
        }}
      />

      <FAQSection faqItems={university.faqs} />

      <UniversitySources university={{
        sourceReferences: university.sourceReferences
      }}/>

      <UniversityFinalCTA university={{
    name: university.name,
    shortName: university.shortName
  }
} />
    </main>
  );
}
