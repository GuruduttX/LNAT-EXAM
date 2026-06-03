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
  const lnatExamId = `${siteUrl}/#lnat-exam`;
  const lnatGuideId = `${siteUrl}/#lnat-exam-pattern-guide`;

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
          { "@id": lnatExamId },
          { "@id": lnatGuideId },
          { "@id": `${siteUrl}/#faq` },
          { "@id": `${siteUrl}/#key-pages` },
          { "@id": `${siteUrl}/#featured-universities` },
        ],
      },
      {
        "@type": "Thing",
        "@id": lnatExamId,
        name: "Law National Aptitude Test",
        alternateName: "LNAT",
        description:
          "The Law National Aptitude Test (LNAT) is a 2-hour and 15-minute computer-based admissions assessment used by leading UK universities. It evaluates critical reasoning and analytical thinking through Section A multiple-choice questions and a Section B argumentative essay.",
        subjectOf: { "@id": lnatGuideId },
      },
      {
        "@type": "LearningResource",
        "@id": lnatGuideId,
        url: `${siteUrl}/#exam-pattern`,
        name: "LNAT Exam Pattern Guide",
        description:
          "A detailed guide to the LNAT exam pattern, including Section A, Section B, timings, question format, essay requirements, and skills assessed.",
        learningResourceType: "Exam preparation guide",
        educationalUse: "Exam preparation",
        inLanguage: "en-IN",
        about: { "@id": lnatExamId },
        publisher: { "@id": organizationId },
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
          audienceType: "Students applying for undergraduate law programmes",
        },
        timeRequired: "PT2H15M",
        teaches: [
          "LNAT exam format",
          "Critical reasoning",
          "Reading comprehension",
          "Analytical thinking",
          "Argumentative essay writing",
        ],
        competencyRequired: "No prior legal knowledge is required",
        hasPart: [
          {
            "@type": "LearningResource",
            name: "LNAT Section A",
            description:
              "Section A contains 42 multiple-choice questions to be completed in 95 minutes.",
            learningResourceType: "Exam section",
            timeRequired: "PT1H35M",
            assesses: [
              "Reading comprehension",
              "Critical reasoning",
              "Analytical thinking",
            ],
          },
          {
            "@type": "LearningResource",
            name: "LNAT Section B",
            description:
              "Section B is a 40-minute argumentative essay chosen from three prompts.",
            learningResourceType: "Exam section",
            timeRequired: "PT40M",
            assesses: [
              "Argumentative writing",
              "Structured reasoning",
              "Persuasive communication",
            ],
          },
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
