import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Sparkles } from "lucide-react";

import BlogCard from "@/components/BlogArchive/BlogCard";
import FinalCTA from "@/components/Home/FinalCTA";
import { getPublishedBlogs } from "@/services/blogService";
import { getPublishedCategories } from "@/services/categoryService";
import { IBlog, ICategory } from "@/types/backend.types";

export const metadata = {
  title: "LNAT Blog | Guides, Analysis, and Editorial Insights",
  description:
    "Explore LNAT guides, strategy articles, and university-focused insights organised into topic hubs for easier research and smarter preparation.",
};

function formatCategoryName(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function getBlogIndexData() {
  const [blogDocuments, categoryDocuments] = await Promise.all([
    getPublishedBlogs(30),
    getPublishedCategories(),
  ]);

  const blogs = JSON.parse(JSON.stringify(blogDocuments)) as IBlog[];
  const categories = JSON.parse(JSON.stringify(categoryDocuments)) as ICategory[];

  const cornerstoneBlogs = blogs.filter((blog) => blog.isCornerstone).slice(0, 3);
  const featuredBlogs =
    cornerstoneBlogs.length >= 3 ? cornerstoneBlogs : blogs.slice(0, 3);

  const latestBlogs = blogs
    .filter((blog) => !featuredBlogs.some((featured) => featured.slug === blog.slug))
    .slice(0, 9);

  const hubCards = categories
    .filter((category) => category.status === "published")
    .map((category) => {
      const relatedBlogs = blogs
        .filter((blog) => blog.primaryCategorySlug === category.slug)
        .slice(0, 3);

      return {
        category,
        relatedBlogs,
      };
    })
    .filter((item) => item.relatedBlogs.length > 0 || item.category.featuredPostSlugs?.length)
    .slice(0, 6);

  return {
    blogs,
    featuredBlogs,
    latestBlogs,
    hubCards,
  };
}

export default async function BlogIndexPage() {
  const { blogs, featuredBlogs, latestBlogs, hubCards } = await getBlogIndexData();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.lnatexamindia.com/blog",
        name: "LNAT Blog",
        description:
          "An editorial index of LNAT guides, admissions strategy, and topic-hub pathways for structured research.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.lnatexamindia.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://www.lnatexamindia.com/blog",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Published LNAT blog articles",
        itemListElement: blogs.map((blog, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: blog.title,
          url: `https://www.lnatexamindia.com/blog/${blog.slug}`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F5EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-[#07111F] px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.14),transparent_30%),radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_24%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D9C89A]">
              LNAT Blog
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#FDFBF5] sm:text-5xl lg:text-6xl">
              LNAT guides, university insights, and strategy articles for
              serious applicants
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#C9D2DD] sm:text-lg">
              Explore preparation guides, essay strategy, admissions advice,
              and university-focused explainers built to help you move from
              confusion to a confident LNAT plan.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8E9AA9]">
                Published Guides
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#FDFBF5]">
                {blogs.length}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#C9D2DD]">
                Practical articles covering preparation, admissions, essay
                writing, and university research.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8E9AA9]">
                Cornerstone Pieces
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#FDFBF5]">
                {featuredBlogs.length}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#C9D2DD]">
                Our best starting points if you want high-context guidance
                before going into narrower questions.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8E9AA9]">
                Topic Hubs
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#FDFBF5]">
                {hubCards.length}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#C9D2DD]">
                Browse broader themes like LNAT prep, universities, and law
                admissions to find the right next read faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
                Start Here
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0E1B2A]">
                Start with our most important guides
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                If you are new to the LNAT, begin here. These articles give you
                the clearest overview of the exam, the admissions context, and
                how to structure your preparation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {hubCards.length ? (
        <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
                Browse By Topic
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0E1B2A]">
                Explore the part of the LNAT journey you need most
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                Some students need exam strategy, others need university
                research, and others need admissions planning. Use these topic
                pages to stay focused and discover related guides more quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {hubCards.map(({ category, relatedBlogs }) => (
                <article
                  key={category.slug}
                  className="rounded-[30px] border border-[#E4DCCF] bg-white p-6 shadow-[0_16px_36px_rgba(20,31,45,0.05)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B08D4F]">
                        Topic
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-[#0E1B2A]">
                        {category.name}
                      </h3>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F3EC] text-[#9A7B4F]">
                      <Compass className="h-5 w-5" />
                    </div>
                  </div>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {category.topicDefinition}
                    </p>

                  <div className="mt-6 rounded-[24px] border border-[#ECE3D5] bg-[#FCFBF8] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B08D4F]">
                      Popular Guides
                    </p>
                    <div className="mt-4 space-y-3">
                      {relatedBlogs.slice(0, 3).map((blog) => (
                        <Link
                          key={blog.slug}
                          href={`/blog/${blog.slug}`}
                          className="flex items-start justify-between gap-4 rounded-2xl border border-transparent px-1 py-1 text-sm text-slate-700 transition-colors hover:text-[#0E1B2A]"
                        >
                          <span className="leading-7">{blog.title}</span>
                          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#B08D4F]" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/topics/${category.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0D1B3E] px-5 py-3 text-sm font-medium text-[#FDFBF5] transition-colors hover:bg-[#132850]"
                    >
                      Explore topic
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#E5DCCB] bg-[#FCFBF8] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {formatCategoryName(category.slug)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {latestBlogs.length ? (
        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
                  More To Read
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0E1B2A]">
                  Recent guides and useful reads
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                  Keep exploring with newer guides on preparation tactics,
                  deadlines, application strategy, and university-specific
                  questions.
              </p>
            </div>

              <div className="rounded-[24px] border border-[#E4DCCF] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(20,31,45,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7F3EC] text-[#9A7B4F]">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0E1B2A]">
                      Best used with
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                      Topic hubs and resources
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestBlogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-[#E4DCCF] bg-white p-8 shadow-[0_16px_36px_rgba(20,31,45,0.05)] lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
                How to Use This Page
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0E1B2A]">
                Build your LNAT reading path with intention
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Start with a broad guide if you are learning the basics, move to
                a topic page if you want focused research, and then use detailed
                blog posts to answer the exact question you are working on.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  title: "Topic pages",
                  description: "Use for broad themes like preparation, universities, and admissions planning.",
                  icon: Compass,
                },
                {
                  title: "Detailed guides",
                  description: "Use when you need a focused answer to one specific LNAT or admissions question.",
                  icon: BookOpen,
                },
                {
                  title: "Essential reads",
                  description: "Use when you want the strongest starting point before building a shortlist or prep plan.",
                  icon: Sparkles,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#ECE3D5] bg-[#FCFBF8] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7F3EC] text-[#9A7B4F]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0E1B2A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
