import Link from "next/link";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
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
    <main className="min-h-screen bg-[#fbfaf7] px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Topics", href: "/topics" },
          ]}
          className="mb-8"
        />
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
          Topic Hubs
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#0e1b2a] md:text-5xl">
          Explore the major LNAT content hubs
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
          These hubs are designed to organise the site into broader themes, so users
          can move from overview pages into detailed blogs and university profiles.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`topics/${category.slug}`}
              className="rounded-[28px] border border-[#e4dccf] bg-white p-7 shadow-[0_16px_36px_rgba(20,31,45,0.05)] transition hover:border-[#c5a059]/60"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b08d4f]">
                {category.primaryKeyword}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#0e1b2a]">
                {category.name}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {category.topicDefinition}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
