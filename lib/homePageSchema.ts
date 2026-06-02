import { homeFaqs } from "@/data/homeFaqs";
import { getSiteUrl } from "@/lib/siteUrl";

interface FeaturedUniversitySchemaItem {
  name: string;
  slug: string;
}

const homepageDescription =
  "Comprehensive LNAT guidance for Indian students exploring UK law admissions, university requirements, exam preparation, and application strategy.";

export function createHomePageSchema(
  featuredUniversities: FeaturedUniversitySchemaItem[],
) {
  const siteUrl = getSiteUrl();
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${siteUrl}/#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "LNAT Exam India",
        url: `${siteUrl}/`,
        email: "contact@lnatexamindia.com",
        description:
          "LNAT preparation and UK law admissions guidance for Indian students.",
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        knowsAbout: [
          "Law National Aptitude Test (LNAT)",
          "UK undergraduate law admissions",
          "LNAT preparation",
          "UCAS applications",
          "LNAT university requirements",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteUrl}/`,
        name: "LNAT Exam India",
        description: homepageDescription,
        inLanguage: "en-IN",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: `${siteUrl}/`,
        name: "LNAT Exam India | Premium Preparation & Admissions Guide",
        description: homepageDescription,
        inLanguage: "en-IN",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        publisher: { "@id": organizationId },
        mainEntity: [
          { "@id": `${siteUrl}/#faq` },
          { "@id": `${siteUrl}/#key-pages` },
          { "@id": `${siteUrl}/#featured-universities` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: homeFaqs.map((faq) => ({
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
        "@id": `${siteUrl}/#key-pages`,
        name: "LNAT Exam India key guidance pages",
        itemListElement: [
          ["LNAT Universities", "/universities"],
          ["LNAT Topic Hubs", "/topics"],
          ["LNAT Blog", "/blog"],
          ["Free LNAT Resources", "/free-resources"],
          ["Frequently Asked Questions", "/faq"],
          ["How to Apply for UK Law", "/how-to-apply"],
          ["About LNAT Exam India", "/about"],
        ].map(([name, path], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          url: `${siteUrl}${path}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#featured-universities`,
        name: "Featured LNAT university guides",
        itemListElement: featuredUniversities.map((university, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: university.name,
          url: `${siteUrl}/universities/${university.slug}`,
        })),
      },
    ],
  };
}