import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";
import type { IBlog, ICategory, IUniversity } from "@/types/backend.types";

interface TopicHubSchemaContent {
  posts: IBlog[];
  universities: IUniversity[];
}

function stripHtml(value?: string) {
  return value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toIsoDate(value?: Date | string) {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function createTopicHubPageSchema(
  category: ICategory,
  { posts, universities }: TopicHubSchemaContent,
) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/topics/${category.slug}`;
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${pageUrl}#webpage`;
  const topicId = `${pageUrl}#topic`;
  const contentListId = `${pageUrl}#content-list`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const faqId = `${pageUrl}#faq`;
  const dateModified =
    toIsoDate(category.lastUpdated) ||
    toIsoDate(category.updatedAt) ||
    toIsoDate(category.createdAt);
  const breadcrumbSchema = {
    ...createBreadcrumbSchema([
      { label: "Home", href: "/" },
      { label: "Topics", href: "/topics" },
      { label: category.name, href: `/topics/${category.slug}` },
    ]),
    "@id": breadcrumbId,
  };
  const faqSchema = category.faqs?.length
    ? {
        "@type": "FAQPage",
        "@id": faqId,
        isPartOf: { "@id": webpageId },
        mainEntity: category.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: stripHtml(faq.answer),
          },
        })),
      }
    : null;
  const subtopicSchemas = (category.subtopics || []).map((subtopic, index) => ({
    "@type": "DefinedTerm",
    "@id": `${pageUrl}#subtopic-${index + 1}`,
    name: subtopic.title,
    description: subtopic.description,
    inDefinedTermSet: { "@id": topicId },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": webpageId,
        url: pageUrl,
        name: category.metaTitle || category.name,
        description: category.metaDescription || category.topicDefinition,
        inLanguage: "en-IN",
        isPartOf: { "@id": websiteId },
        about: { "@id": topicId },
        mainEntity: { "@id": contentListId },
        publisher: { "@id": organizationId },
        breadcrumb: { "@id": breadcrumbId },
        primaryImageOfPage: category.heroImage?.url
          ? {
              "@type": "ImageObject",
              contentUrl: category.heroImage.url,
              caption: category.heroImage.alt,
              creditText: category.heroImage.credit,
              width: category.heroImage.width,
              height: category.heroImage.height,
            }
          : undefined,
        datePublished: toIsoDate(category.createdAt),
        dateModified,
        keywords: category.primaryKeyword,
        hasPart: [
          ...(faqSchema ? [{ "@id": faqId }] : []),
          ...subtopicSchemas.map((subtopic) => ({ "@id": subtopic["@id"] })),
        ],
      },
      {
        "@type": "DefinedTerm",
        "@id": topicId,
        name: category.name,
        description: category.topicDefinition,
        termCode: category.primaryKeyword,
        url: pageUrl,
        subjectOf: { "@id": webpageId },
      },
      {
        "@type": "ItemList",
        "@id": contentListId,
        name: `${category.name} guides and university profiles`,
        numberOfItems: posts.length + universities.length,
        itemListElement: [
          ...posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: post.title,
            url: `${siteUrl}/blog/${post.slug}`,
          })),
          ...universities.map((university, index) => ({
            "@type": "ListItem",
            position: posts.length + index + 1,
            name: university.name,
            url: `${siteUrl}/universities/${university.slug}`,
          })),
        ],
      },
      breadcrumbSchema,
      ...subtopicSchemas,
      ...(faqSchema ? [faqSchema] : []),
    ],
  };
}
