import HomeHero from "@/components/Home/Homehero";
import TrustedUniversities from "@/components/Home/Trusteduniversities";
import LNATOverview from "@/components/Home/LNATOverview";
import ExamPattern from "@/components/Home/ExamPattern/ExamPattern";
import LNATTimeline from "@/components/Home/TimeLine/LNATTimeline";
import FeaturedUniversities from "@/components/Home/FeaturedUniversities/FeaturedUniversities";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import FAQPreview from "@/components/Home/FAQPreview";
import FinalCTA from "@/components/Home/FinalCTA";
import type { FeaturedUniversityCardData } from "@/components/Home/FeaturedUniversities/UniversityGrid";
import { getFeaturedUniversities } from "@/services/universityService";
import { createHomePageSchema } from "@/lib/homePageSchema";

export default async function Home() {
  const universityDocuments = await getFeaturedUniversities(6);
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
      <ExamPattern />
      <LNATTimeline />
      <FeaturedUniversities universities={universities} />
      <WhyChooseUs />
      <FAQPreview />
      <FinalCTA />
    </main>
  );
}