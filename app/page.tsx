import HomeHero from "@/components/Home/Homehero";
import TrustedUniversities from "@/components/Home/Trusteduniversities";
import LNATOverview from "@/components/Home/LNATOverview";
import ExamPattern from "@/components/Home/ExamPattern/ExamPattern";
import LNATTimeline from "@/components/Home/TimeLine/LNATTimeline";
import FeaturedUniversities from "@/components/Home/FeaturedUniversities/FeaturedUniversities";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import FreeResourcesPreview from "@/components/Home/FreeResourcesPreview";
import FAQPreview from "@/components/Home/FAQPreview";
import FinalCTA from "@/components/Home/FinalCTA";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <TrustedUniversities />
      <LNATOverview />
      <ExamPattern />
      <LNATTimeline />
      <FeaturedUniversities />
      <WhyChooseUs />
      <FreeResourcesPreview />
      <FAQPreview />
      <FinalCTA />
    </main>
  );
}
