import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers3,
} from "lucide-react";

import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";
import { University } from "@/models/University";
import {
  getCategoryBySlug,
  getPublishedCategorySlugs,
} from "@/services/categoryService";
import { IBlog, ICategory, IUniversity } from "@/types/backend.types";
import TopicHubHero from "@/components/Topic/TopicHubHero";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";

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

  return {
    title: category.metaTitle,
    description: category.metaDescription,
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
  const { posts, universities, siblingCategories, subtopicSections } =
    await getTopicContent(category);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://www.lnatexamindia.com/topics/${category.slug}`,
        name: category.name,
        description: category.metaDescription,
        dateModified:
          category.lastUpdated || category.updatedAt || new Date().toISOString(),
      },
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Topics", href: "/topics" },
        { label: category.name, href: `/topics/${category.slug}` },
      ]),
      {
        "@type": "ItemList",
        name: `${category.name} content`,
        itemListElement: [
          ...posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: post.title,
            url: `https://www.lnatexamindia.com/blog/${post.slug}`,
          })),
          ...universities.map((university, index) => ({
            "@type": "ListItem",
            position: posts.length + index + 1,
            name: university.name,
            url: `https://www.lnatexamindia.com/universities/${university.slug}`,
          })),
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicHubHero category={category} stats={{posts:posts.length, universities: universities.length, subtopicSections: subtopicSections.length}} />
      

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-[#e4dccf] bg-white p-8 shadow-[0_16px_36px_rgba(20,31,45,0.05)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
              Overview
            </p>
            <div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-700">
              {category.intro}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#e4dccf] bg-[#f6f0e6] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8f6c35]">
              Best Way To Use This Page
            </p>
            <div className="mt-6 space-y-5">
              {[
                "Start with the featured guides if you want the strongest introduction to this topic.",
                "Use the subtopics below to move into the exact area you want to understand better.",
                "Open related university pages when you need entity-level detail, fit, and admissions context.",
              ].map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0e1b2a] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {posts.length ? (
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
                Featured Guides
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a]">
                Start with the most useful reads
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-[28px] border border-[#e4dccf] bg-white p-6 shadow-[0_16px_36px_rgba(20,31,45,0.05)] transition hover:border-[#c5a059]/60"
                >
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b08d4f]">
                    <BookOpen className="h-3.5 w-3.5" />
                    Guide
                  </div>
                  <p className="mt-4 text-xl font-semibold text-[#0e1b2a]">
                    {post.title}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {universities.length ? (
        <section className="px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
                Related Universities
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a]">
                Explore relevant university guides
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {universities.map((university) => (
                <Link
                  key={university.slug}
                  href={`/universities/${university.slug}`}
                  className="rounded-[28px] border border-[#e4dccf] bg-white p-5 shadow-[0_16px_36px_rgba(20,31,45,0.05)] transition hover:border-[#c5a059]/60"
                >
                  <div className="relative h-48 overflow-hidden rounded-[22px] bg-[#122337]">
                    {(university.cardImage?.url || university.image) && (
                      <Image
                        src={university.cardImage?.url || university.image}
                        alt={university.cardImage?.alt || university.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#0e1b2a]">
                    {university.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {university.excerpt40to60 || university.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {subtopicSections.length ? (
        <section className="px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
                What You&apos;ll Find Here
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a]">
                Explore this topic through clear sub-sections
              </h2>
            </div>

            <div className="mt-8 space-y-6">
              {subtopicSections.map((subtopic) => (
                <div
                  key={subtopic.title}
                  className="rounded-[28px] border border-[#e4dccf] bg-white p-6 shadow-[0_12px_30px_rgba(20,31,45,0.04)]"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b08d4f]">
                        <Layers3 className="h-3.5 w-3.5" />
                        Subtopic
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-[#0e1b2a]">
                        {subtopic.title}
                      </h3>
                      {subtopic.description ? (
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {subtopic.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[24px] border border-[#ece3d5] bg-[#fcfbf8] p-5">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b08d4f]">
                        <BookOpen className="h-3.5 w-3.5" />
                        Guides
                      </div>
                      <div className="mt-4 space-y-3">
                        {subtopic.posts.length ? (
                          subtopic.posts.map((post) => (
                            <Link
                              key={post.slug}
                              href={`/blog/${post.slug}`}
                              className="flex items-start justify-between gap-4 rounded-2xl py-1 text-sm text-slate-700 transition-colors hover:text-[#0e1b2a]"
                            >
                              <span className="leading-7">{post.title}</span>
                              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#b08d4f]" />
                            </Link>
                          ))
                        ) : (
                          <p className="text-sm leading-7 text-slate-500">
                            Detailed guides for this subtopic will appear here.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-[#ece3d5] bg-[#fcfbf8] p-5">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b08d4f]">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Universities
                      </div>
                      <div className="mt-4 space-y-3">
                        {subtopic.universities.length ? (
                          subtopic.universities.map((university) => (
                            <Link
                              key={university.slug}
                              href={`/universities/${university.slug}`}
                              className="flex items-start justify-between gap-4 rounded-2xl py-1 text-sm text-slate-700 transition-colors hover:text-[#0e1b2a]"
                            >
                              <span className="leading-7">{university.name}</span>
                              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#b08d4f]" />
                            </Link>
                          ))
                        ) : (
                          <p className="text-sm leading-7 text-slate-500">
                            University-specific links for this subtopic will
                            appear here.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {category.faqs?.length ? (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a]">
                Common questions on this topic
              </h2>
            </div>
            <div className="mt-8 space-y-4">
              {category.faqs.map((faq, index) => (
                <details
                  key={`${faq.question}-${index}`}
                  className="rounded-[24px] border border-[#e4dccf] bg-white px-6 py-5"
                >
                  <summary className="cursor-pointer list-none text-lg font-medium text-[#0e1b2a]">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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

      {category.cta?.label && category.cta?.href ? (
        <section className="px-6 pb-24 pt-6">
          <div className="mx-auto max-w-6xl rounded-[32px] bg-[#14263a] px-8 py-12 text-[#f7f3ec]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c39a]">
              Next Step
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Ready to go deeper?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#d7e0ea]">
              Use the next step below to continue your preparation, compare
              universities, or get structured support for your LNAT journey.
            </p>
            <Link
              href={category.cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f7f3ec] px-5 py-3 text-sm font-semibold text-[#14263a] transition hover:bg-white"
            >
              {category.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
