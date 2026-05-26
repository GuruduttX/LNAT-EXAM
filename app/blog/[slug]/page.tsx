import { notFound } from "next/navigation";

import BlogDetailsHero from "@/components/blog/BlogDetailsHero";
import BlogContentLayout from "@/components/blog/BlogContentLayout";
import { getBlogBySlug, getPublishedBlogSlugs } from "@/services/blogService";
import { IBlog } from "@/types/backend.types";

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function enrichContentWithHeadingIds(content: string) {
  const tocItems: TocItem[] = [];

  const enhancedContent = content.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, rawLevel, attributes, innerHtml) => {
      const level = Number(rawLevel) as 2 | 3;
      const text = stripHtml(innerHtml);
      const id = slugifyHeading(text);
      tocItems.push({ id, text, level });

      if (/id\s*=/.test(attributes)) {
        return `<h${level}${attributes}>${innerHtml}</h${level}>`;
      }

      return `<h${level}${attributes} id="${id}">${innerHtml}</h${level}>`;
    },
  );

  return {
    enhancedContent,
    tocItems,
  };
}

function formatDate(dateValue?: string | Date) {
  if (!dateValue) return null;

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return String(dateValue);
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const blogDocument = await getBlogBySlug(slug);

  if (!blogDocument) {
    return {
      title: "Blog Not Found | LNAT Exam India",
    };
  }

  return {
    title: blogDocument.meta?.title || blogDocument.title,
    description: blogDocument.meta?.description || blogDocument.excerpt,
  };
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;
  const blogDocument = await getBlogBySlug(slug);

  if (!blogDocument) {
    notFound();
  }

  const blog = JSON.parse(JSON.stringify(blogDocument)) as IBlog;
  const { enhancedContent, tocItems } = enrichContentWithHeadingIds(
    blog.content || "",
  );
  const displayUpdatedAt =
    formatDate(blog.updatedAt) || formatDate(blog.publishedAt);
  const displayPublishedAt = formatDate(blog.publishedAt);
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    ...(blog.primaryCategorySlug
      ? [
          {
            label: blog.primaryCategorySlug
              .split("-")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(" "),
            href: `/topics/${blog.primaryCategorySlug}`,
          },
        ]
      : []),
    {
      label: blog.title,
      href: `/blog/${blog.slug}`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.meta?.description || blog.excerpt,
        image: [blog.heroImage?.url || blog.featuredImage || blog.image],
        datePublished: blog.publishedAt || blog.createdAt,
        dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
        author: {
          "@type": "Person",
          name: blog.author.name,
          jobTitle: blog.author.role || undefined,
        },
        reviewedBy: blog.reviewedBy?.name
          ? {
              "@type": "Person",
              name: blog.reviewedBy.name,
              jobTitle: blog.reviewedBy.role || undefined,
            }
          : undefined,
        mainEntityOfPage: `https://www.lnatexamindia.com/blog/${blog.slug}`,
        articleSection: blog.category,
        wordCount: blog.wordCount,
        citation: blog.sources || [],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: `https://www.lnatexamindia.com${item.href}`,
        })),
      },
      ...(blog.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: blog.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F5EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogDetailsHero
        blog={blog}
        breadcrumbItems={breadcrumbItems}
        displayPublishedAt={displayPublishedAt}
        displayUpdatedAt={displayUpdatedAt}
      />
      <BlogContentLayout
        blog={{ ...blog, content: enhancedContent }}
        tocItems={tocItems}
        displayUpdatedAt={displayUpdatedAt}
      />
    </main>
  );
}
