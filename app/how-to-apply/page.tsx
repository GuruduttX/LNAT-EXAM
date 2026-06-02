import ApplyHero from "@/components/how-to-apply/ApplyHero"; // Use your existing hero
import ApplyTimeline from "@/components/how-to-apply/ApplyTimeline";
import ApplyHowWeHelp from "@/components/how-to-apply/ApplyHowWeHelp";
import FAQFinalCTA from "@/components/faq/FAQFinalCTA"; // Reuse your high-converting CTA
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";

export default function HowToApplyPage() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "How to Apply for UK Law",
        url: `${siteUrl}/how-to-apply`,
        description:
          "A structured guide to the UCAS application, LNAT booking, and UK law admissions journey.",
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
      <ApplyTimeline />
      <ApplyHowWeHelp />
      <FAQFinalCTA />
    </main>
  );
}
