import TopicsArchiveSection from "@/components/Topic/TopicsArchiveSection";
import TopicsArchiveHero from "@/components/Topic/TopicsArchiveHero";
import TopicsEnquiryCTA from "@/components/Topic/TopicsEnquiryCTA";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getPublishedCategories } from "@/services/categoryService";
import { ICategory } from "@/types/backend.types";

export const metadata = {
  title: "Topic Hubs | LNAT Exam India",
  description:
    "Explore the major topic hubs that organise LNAT preparation, universities, and admissions content.",
};

export default async function TopicsPage() {
  const categoryDocuments = await getPublishedCategories();
  const categories = JSON.parse(
    JSON.stringify(categoryDocuments),
  ) as ICategory[];
  const totalSubtopics = categories.reduce(
    (total, category) => total + (category.subtopics?.length || 0),
    0,
  );
  const totalLinkedContent = new Set(
    categories.flatMap((category) => [
      ...(category.featuredPostSlugs || []).map((slug) => `post:${slug}`),
      ...(category.featuredUniversitySlugs || []).map(
        (slug) => `university:${slug}`,
      ),
      ...(category.subtopics || []).flatMap((subtopic) => [
        ...(subtopic.postSlugs || []).map((slug) => `post:${slug}`),
        ...(subtopic.universitySlugs || []).map(
          (slug) => `university:${slug}`,
        ),
      ]),
    ]),
  ).size;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "LNAT Topic Hubs",
        url: "https://www.lnatexamindia.com/topics",
        description:
          "Explore the major topic hubs that organise LNAT preparation, universities, and admissions content.",
      },
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Topics", href: "/topics" },
      ]),
    ],
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicsArchiveHero
        totalHubs={categories.length}
        totalSubtopics={totalSubtopics}
        totalLinkedContent={totalLinkedContent}
      />
      <TopicsArchiveSection categories={categories} />
      <TopicsEnquiryCTA />
    </main>
  );
}
