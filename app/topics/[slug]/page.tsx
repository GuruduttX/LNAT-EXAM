import Link from "next/link";
import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import {
  getCategoryPostSlugs,
  shouldIndexCategory,
} from "@/lib/categoryIndexing";
import { Blog } from "@/models/Blog";
import { University } from "@/models/University";
import {
  getCategoryBySlug,
  getPublishedCategorySlugs,
} from "@/services/categoryService";
import { IBlog, ICategory, IUniversity } from "@/types/backend.types";
import TopicHubHero from "@/components/Topic/TopicHubHero";
import { createTopicHubPageSchema } from "@/lib/topicHubPageSchema";
import TopicOverviewSection from "@/components/Topic/TopicOverviewSection";
import BlogArchiveGrid from "@/components/BlogArchive/BlogArchiveGrid";
import RelatedUniversities from "@/components/Topic/RelatedUniversities";
import TopicSubtopicSections from "@/components/Topic/TopicSubtopicSections";
import TopicFAQSection from "@/components/Topic/TopicFAQSection";
import TopicFinalCTA from "@/components/Topic/TopicFinalCTA";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface TopicHubContent {
  posts: IBlog[];
  universities: IUniversity[];
  siblingCategories: ICategory[];
  subtopicSections: Array<{
    title: string;
    description?: string;
    posts: IBlog[];
    universities: IUniversity[];
  }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Topic Not Found | LNAT Exam India",
    };
  }

  const postSlugs = getCategoryPostSlugs(category);
  const publishedPostCount = postSlugs.length
    ? await Blog.countDocuments({
        slug: { $in: postSlugs },
        status: "published",
      })
    : 0;
  const shouldIndex = shouldIndexCategory(category, publishedPostCount);

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: `/topics/${category.slug}`,
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: category.metaTitle,
      description: category.metaDescription,
      images: category.heroImage?.url ? [category.heroImage.url] : undefined,
    },
  };
}

async function getTopicContent(category: ICategory): Promise<TopicHubContent> {
  await connectDB();

  const featuredPostSlugs = category.featuredPostSlugs || [];
  const featuredUniversitySlugs = category.featuredUniversitySlugs || [];
  const subtopicPostSlugs = (category.subtopics || []).flatMap(
    (subtopic) => subtopic.postSlugs || [],
  );
  const subtopicUniversitySlugs = (category.subtopics || []).flatMap(
    (subtopic) => subtopic.universitySlugs || [],
  );

  const allPostSlugs = Array.from(
    new Set([...featuredPostSlugs, ...subtopicPostSlugs]),
  );
  const allUniversitySlugs = Array.from(
    new Set([...featuredUniversitySlugs, ...subtopicUniversitySlugs]),
  );

  const [posts, universities, siblingCategories] = await Promise.all([
    allPostSlugs.length
      ? Blog.find({
          slug: { $in: allPostSlugs },
          status: "published",
        })
          .select(
            "title slug image alt excerpt heroImage featuredImage readTime publishedAt category isCornerstone",
          )
          .lean()
      : [],
    allUniversitySlugs.length
      ? University.find({
          slug: { $in: allUniversitySlugs },
          status: "published",
        })
          .select(
            "name slug image cardImage shortDescription excerpt40to60 country city globalRanking lnatRequirement",
          )
          .lean()
      : [],
    category.relatedCategorySlugs?.length
      ? (
          await Promise.all(
            category.relatedCategorySlugs.map((slug) => getCategoryBySlug(slug)),
          )
        ).filter(Boolean)
      : [],
  ]);

  const orderedPosts = featuredPostSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter(Boolean) as IBlog[];
  const orderedUniversities = featuredUniversitySlugs
    .map((slug) => universities.find((university) => university.slug === slug))
    .filter(Boolean) as IUniversity[];

  const subtopicSections = (category.subtopics || []).map((subtopic) => ({
    title: subtopic.title,
    description: subtopic.description,
    posts: (subtopic.postSlugs || [])
      .map((slug) => posts.find((post) => post.slug === slug))
      .filter(Boolean) as IBlog[],
    universities: (subtopic.universitySlugs || [])
      .map((slug) => universities.find((university) => university.slug === slug))
      .filter(Boolean) as IUniversity[],
  }));

  return {
    posts: orderedPosts,
    universities: orderedUniversities,
    siblingCategories: siblingCategories as ICategory[],
    subtopicSections,
  };
}

export default async function TopicHubPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryDocument = await getCategoryBySlug(slug);

  if (!categoryDocument || categoryDocument.status !== "published") {
    notFound();
  }

  const category = JSON.parse(JSON.stringify(categoryDocument)) as ICategory;
  const topicContent = JSON.parse(
    JSON.stringify(await getTopicContent(category)),
  ) as TopicHubContent;
  const { posts, universities, siblingCategories, subtopicSections } =
    topicContent;
  const structuredData = createTopicHubPageSchema(category, {
    posts,
    universities,
  });

  return (
    <main className="min-h-screen bg-[#fbfaf7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicHubHero
        category={category}
        stats={{
          posts: posts.length,
          universities: universities.length,
          subtopicSections: subtopicSections.length,
        }}
      />

      <TopicOverviewSection intro={category.intro} />

      <BlogArchiveGrid blogs={posts} />

      <RelatedUniversities universities={universities} />

      <TopicSubtopicSections subtopics={subtopicSections} />

      <TopicFAQSection faqItems={category.faqs} />

      {siblingCategories.length ? (
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
                Continue Exploring
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a]">
                Related topic pages
              </h2>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {siblingCategories.map((relatedCategory) => (
                <Link
                  key={relatedCategory.slug}
                  href={`/topics/${relatedCategory.slug}`}
                  className="rounded-full border border-[#d9d2c4] bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#b08d4f] hover:text-[#0e1b2a]"
                >
                  {relatedCategory.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TopicFinalCTA />
    </main>
  );
}
