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
import UniversityDirectAnswers from "@/components/universities/detail/UniversityDirectAnswers";
import UniversityAcademicStrengths from "@/components/universities/detail/UniversityAcademicStrengths";
import UniversityStudentExperience from "@/components/universities/detail/UniversityStudentExperience";
import UniversityTrustSignals from "@/components/universities/detail/UniversityTrustSignals";
import UniversityRelatedLinks from "@/components/universities/detail/UniversityRelatedLinks";
import { createUniversityPageSchema } from "@/lib/universityPageSchema";
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
  const canonicalUrl = `${getSiteUrl()}/universities/${slug}`;

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
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title:
        university.metaTitle ||
        `${university.name} LNAT Guide | LNAT Exam India`,
      description:
        university.metaDescription ||
        university.shortDescription ||
        `Explore LNAT admissions, student life, and application guidance for ${university.name}.`,
      images: [
        university.hero?.carouselImages?.[0]?.url ||
          university.cardImage?.url ||
          university.image,
      ],
    },
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
  const structuredData = createUniversityPageSchema(university);
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
      <UniversityQuickFacts
        university={{
          globalRanking: university.globalRanking,
          lawSchoolRanking: university.lawSchoolRanking,
          applicationDeadline: university.applicationDeadline,
          tuitionFee: university.tuitionFee,
          acceptanceRate: university.acceptanceRate,
        }}
      />
      <UniversityDirectAnswers
        university={{
          name: university.name,
          lnatRequirement: university.lnatRequirement,
          directAnswers: university.directAnswers,
        }}
      />
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

      <UniversityAcademicStrengths
        university={{
          name: university.name,
          strengths: university.strengths,
        }}
      />

      <UniversityCityLife
        university={{
          city: university.city,
          location: university.location,
          cityLife: university.cityLife,
          gallery: {
            cityLifeImages: university.gallery?.cityLifeImages,
          },
        }}
      />

      <UniversityStudentExperience
        university={{
          name: university.name,
          studentExperience: university.studentExperience,
          gallery: {
            studentLifeImages: university.gallery?.studentLifeImages,
            academicImages: university.gallery?.academicImages,
          },
        }}
      />

      <UniversityAdmissions
        university={{
          name: university.name,
          lnatRequirement: university.lnatRequirement,
          applicationDeadline: university.applicationDeadline,
          admissions: university.admissions,
        }}
      />

      <UniversityCareers
        university={{
          careers: university.careers,
          famousAlumni: university.famousAlumni,
          notableAlumni: university.notableAlumni,
        }}
      />

      <UniversityTrustSignals
        university={{
          reviewedBy: university.reviewedBy,
          lastFactCheckedAt: university.lastFactCheckedAt,
          awardsAndRecognition: university.awardsAndRecognition,
          notableAlumni: university.notableAlumni,
          testimonials: university.testimonials,
        }}
      />

      <FAQSection faqItems={university.faqs} />

      <UniversitySources
        university={{
          sourceReferences: university.sourceReferences,
        }}
      />

      <UniversityRelatedLinks
        university={{
          relatedBlogs: university.relatedBlogs,
          relatedResources: university.relatedResources,
          relatedUniversities: university.relatedUniversities,
          comparisonLinks: university.comparisonLinks,
        }}
      />

      <UniversityFinalCTA
        university={{
          name: university.name,
          shortName: university.shortName,
        }}
      />
    </main>
  );
}
