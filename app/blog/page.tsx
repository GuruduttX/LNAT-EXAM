import { BookOpen, Compass, Sparkles } from "lucide-react";

import FinalCTA from "@/components/Home/FinalCTA";
import { getPublishedBlogs } from "@/services/blogService";
import { getPublishedCategories } from "@/services/categoryService";
import { IBlog, ICategory } from "@/types/backend.types";
import BlogArchiveHero from "@/components/BlogArchive/blogArchiveHero";
import BlogArchiveGrid from "@/components/BlogArchive/BlogArchiveGrid";
import TopicHubsArchive from "@/components/TopicHub/TopicHubArchive";
import LatestBlogsGrid from "@/components/BlogArchive/LatestBlogsGrid";

export const metadata = {
  title: "LNAT Blog | Guides, Analysis, and Editorial Insights",
  description:
    "Explore LNAT guides, strategy articles, and university-focused insights organised into topic hubs for easier research and smarter preparation.",
};

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
  const { blogs, latestBlogs, hubCards } = await getBlogIndexData();

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

     <BlogArchiveHero />

      <BlogArchiveGrid blogs={blogs}/>

     <TopicHubsArchive hubCards={hubCards}/>

      <LatestBlogsGrid latestBlogs={latestBlogs} />

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
