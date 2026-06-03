import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";
import type { IMediaAsset, IUniversity } from "@/types/backend.types";

function stripHtml(value?: string) {
  return value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toIsoDate(value?: Date | string) {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function getUniversityImages(university: IUniversity) {
  const mediaAssets: IMediaAsset[] = [
    ...(university.hero?.carouselImages || []),
    ...(university.gallery?.campusImages || []),
    ...(university.gallery?.cityLifeImages || []),
    ...(university.gallery?.studentLifeImages || []),
    ...(university.gallery?.academicImages || []),
    ...(university.cardImage ? [university.cardImage] : []),
  ];
  const seenUrls = new Set<string>();
  const imageObjects = mediaAssets
    .filter((image) => {
      if (!image.url || seenUrls.has(image.url)) return false;
      seenUrls.add(image.url);
      return true;
    })
    .map((image) => ({
      "@type": "ImageObject",
      contentUrl: image.url,
      caption: image.caption || image.alt,
      creditText: image.credit,
      width: image.width,
      height: image.height,
    }));

  if (university.image && !seenUrls.has(university.image)) {
    imageObjects.push({
      "@type": "ImageObject",
      contentUrl: university.image,
      caption: university.name,
      creditText: undefined,
      width: undefined,
      height: undefined,
    });
  }

  return imageObjects;
}

function getQuickFacts(university: IUniversity) {
  return [
    ["LNAT requirement", university.lnatRequirement],
    ["Global ranking", university.globalRanking],
    ["National ranking", university.nationalRanking],
    ["Law school ranking", university.lawSchoolRanking],
    ["Tuition fee", university.tuitionFee],
    ["Application deadline", university.applicationDeadline],
    ["Acceptance rate", university.acceptanceRate],
    ["Course duration", university.courseDuration],
    ["Intake", university.intake],
    ["Target LNAT score", university.admissions?.targetLNATScore],
    ["Interview required", university.admissions?.interviewRequired],
    ["LNAT essay considered", university.admissions?.essayConsidered],
  ]
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value: typeof value === "boolean" ? (value ? "Yes" : "No") : value,
    }));
}

export function createUniversityPageSchema(university: IUniversity) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/universities/${university.slug}`;
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${pageUrl}#webpage`;
  const articleId = `${pageUrl}#article`;
  const universityId = `${pageUrl}#university`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const faqId = `${pageUrl}#faq`;
  const description =
    university.schemaDescription ||
    university.metaDescription ||
    university.shortDescription;
  const imageObjects = getUniversityImages(university);
  const imageUrls = imageObjects.map((image) => image.contentUrl);
  const citations = (university.sourceReferences || []).map(
    (source) => source.url,
  );
  const sameAs = Array.from(
    new Set(
      [university.officialWebsite, ...(university.sameAs || [])].filter(
        (url): url is string => Boolean(url),
      ),
    ),
  );
  const datePublished = toIsoDate(university.createdAt);
  const dateModified =
    toIsoDate(university.lastFactCheckedAt) ||
    toIsoDate(university.updatedAt) ||
    datePublished;
  const breadcrumbSchema = {
    ...createBreadcrumbSchema([
      { label: "Home", href: "/" },
      { label: "Universities", href: "/universities" },
      {
        label: university.shortName || university.name,
        href: `/universities/${university.slug}`,
      },
    ]),
    "@id": breadcrumbId,
  };
  const faqSchema = university.faqs?.length
    ? {
        "@type": "FAQPage",
        "@id": faqId,
        isPartOf: { "@id": webpageId },
        mainEntity: university.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: stripHtml(faq.answer),
          },
        })),
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: pageUrl,
        name:
          university.schemaTitle ||
          university.metaTitle ||
          `${university.name} LNAT Guide`,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": websiteId },
        about: { "@id": universityId },
        mainEntity: { "@id": universityId },
        publisher: { "@id": organizationId },
        breadcrumb: { "@id": breadcrumbId },
        primaryImageOfPage: imageObjects[0],
        datePublished,
        dateModified,
        citation: citations,
        hasPart: faqSchema ? [{ "@id": faqId }] : undefined,
      },
      {
        "@type": "Article",
        "@id": articleId,
        mainEntityOfPage: { "@id": webpageId },
        headline:
          university.schemaTitle ||
          university.metaTitle ||
          `${university.name} LNAT Guide`,
        description,
        articleSection: "LNAT university guide",
        image: imageUrls,
        author: {
          "@type": "Organization",
          "@id": organizationId,
          name: "LNAT Exam India",
        },
        publisher: { "@id": organizationId },
        about: { "@id": universityId },
        datePublished,
        dateModified,
        citation: citations,
      },
      {
        "@type": university.schemaType || "CollegeOrUniversity",
        "@id": universityId,
        name: university.name,
        alternateName: university.shortName,
        description:
          university.schemaDescription ||
          university.shortDescription ||
          stripHtml(university.overview),
        url: university.officialWebsite || pageUrl,
        mainEntityOfPage: { "@id": webpageId },
        image: imageObjects,
        foundingDate: university.established,
        address: {
          "@type": "PostalAddress",
          addressLocality: university.city || university.location,
          addressRegion: university.region,
          addressCountry: university.country,
        },
        sameAs,
        subjectOf: { "@id": articleId },
        additionalProperty: getQuickFacts(university),
        alumni: university.famousAlumni?.map((alumnus) => ({
          "@type": "Person",
          name: alumnus.name,
          jobTitle: alumnus.designation,
        })),
        award: university.awardsAndRecognition,
      },
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : []),
    ],
  };
}
