import dynamic from "next/dynamic";
import type { Metadata } from "next";

import HomeHero from "@/components/Home/Homehero";
import type { FeaturedUniversityCardData } from "@/components/Home/FeaturedUniversities/UniversityGrid";
import type { HomeTopicHubCardData } from "@/components/Home/TopicHubsPreview";
import type { ICategorySubtopic } from "@/types/backend.types";
import { getFeaturedUniversities } from "@/services/universityService";
import { getPublishedCategoriesBySlugs } from "@/services/categoryService";
import { createHomePageSchema } from "@/lib/homePageSchema";
import { getSiteUrl } from "@/lib/siteUrl";
import HowWePrepare from "@/components/Home/HowWePrepare";
import MeetYourMentor from "@/components/Home/MeetYourMentor";
import FreeResourcesIndex from "@/components/Home/FreeResourcesIndex";

const TrustedUniversities = dynamic(
  () => import("@/components/Home/Trusteduniversities"),
);
const LNATOverview = dynamic(() => import("@/components/Home/LNATOverview"));
const ExamPattern = dynamic(
  () => import("@/components/Home/ExamPattern/ExamPattern"),
);
const LNATTimeline = dynamic(
  () => import("@/components/Home/TimeLine/LNATTimeline"),
);
const FeaturedUniversities = dynamic(
  () => import("@/components/Home/FeaturedUniversities/FeaturedUniversities"),
);
const TopicHubsPreview = dynamic(
  () => import("@/components/Home/TopicHubsPreview"),
);
const WhyChooseUs = dynamic(() => import("@/components/Home/WhyChooseUs"));
const ProgrammesPreview = dynamic(
  () => import("@/components/Home/ProgrammesPreview"),
);
const PreparationProcess = dynamic(
  () => import("@/components/Home/PreparationProcess"),
);
const WhoWeHelp = dynamic(() => import("@/components/Home/WhoWeHelp"));
const MentorPreview = dynamic(() => import("@/components/Home/MentorPreview"));
const FAQPreview = dynamic(() => import("@/components/Home/FAQPreview"));
const FinalCTA = dynamic(() => import("@/components/Home/FinalCTA"));

const title = "LNAT Coaching in India | LNAT Exam Preparation & Classes";
const description =
  "Expert LNAT coaching in India for Oxford, Cambridge, UCL, LSE & JGLS law admissions. Section A drills, essay feedback & full mock tests. Talk to a mentor on WhatsApp.";

// Change these slugs whenever you want different topic hubs on the home page.
const homeTopicHubSlugs = [
  "lnat-guide",
  "lnat-preparation",
  "uk-law-universities",
  "law-admissions",
];

export const revalidate = 3600;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: getSiteUrl(),
  },
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    title,
    description,
    siteName: "LNAT Exam India",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function Home() {
  const [universityDocuments, topicHubDocuments] = await Promise.all([
    getFeaturedUniversities(6),
    getPublishedCategoriesBySlugs(homeTopicHubSlugs),
  ]);
  const universities = universityDocuments.map(
    (university): FeaturedUniversityCardData => ({
      id: university._id.toString(),
      slug: university.slug,
      name: university.name,
      location:
        university.locationLabel ||
        [university.city || university.location, university.country]
          .filter(Boolean)
          .join(", "),
      description:
        university.excerpt40to60 ||
        university.shortDescription ||
        `Explore admissions guidance for ${university.name}.`,
      imageUrl: university.cardImage?.url || university.image,
      ranking:
        university.lawSchoolRanking ||
        university.globalRanking ||
        university.nationalRanking,
      lnatRequired: university.lnatRequirement === "Required",
    }),
  );
  const topicHubs = topicHubDocuments.slice(0, 4).map(
    (category): HomeTopicHubCardData => {
      const guideSlugs = new Set([
        ...(category.featuredPostSlugs || []),
        ...(category.subtopics || []).flatMap(
          (subtopic: ICategorySubtopic) => subtopic.postSlugs || [],
        ),
      ]);
      const universitySlugs = new Set([
        ...(category.featuredUniversitySlugs || []),
        ...(category.subtopics || []).flatMap(
          (subtopic: ICategorySubtopic) => subtopic.universitySlugs || [],
        ),
      ]);

      return {
        slug: category.slug,
        name: category.name,
        primaryKeyword: category.primaryKeyword,
        topicDefinition: category.topicDefinition,
        subtopicCount: category.subtopics?.length || 0,
        guideCount: guideSlugs.size,
        universityCount: universitySlugs.size,
      };
    },
  );
  const structuredData = createHomePageSchema(universities);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeHero />
      <TrustedUniversities />
      <LNATOverview />
      <HowWePrepare/>
      <FreeResourcesIndex />
      <MeetYourMentor />
      <ExamPattern />
      <LNATTimeline />
      <FeaturedUniversities universities={universities} />
      <TopicHubsPreview topicHubs={topicHubs} />
      <WhyChooseUs />
      <FAQPreview />
      <FinalCTA />
    </main>
  );
}