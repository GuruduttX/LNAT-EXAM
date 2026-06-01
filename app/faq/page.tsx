import FAQHero from "@/components/faq/FAQHero";
import FAQCategoryNav from "@/components/faq/FAQCategoryNav";
import FAQCategoryGrid from "@/components/faq/FAQAccordion";
import type { FAQItem } from "@/components/faq/FAQAccordion";
import { getPublishedFAQs } from "@/services/faqService";
import FAQFinalCTA from "@/components/faq/FAQFinalCTA";

async function getFaqsFromDB(): Promise<FAQItem[]> {
  const faqDocuments = await getPublishedFAQs();

  return faqDocuments.map((faq) => ({
    _id: faq._id.toString(),
    category: faq.category,
    question: faq.question,
    answerHtml: faq.answer,
    sourceUrl: faq.sourceUrl,
    lastReviewedAt: faq.lastUpdated?.toISOString(),
  }));
}

export default async function FAQPage() {
  const allFaqs = await getFaqsFromDB();

  // 1. Extract unique categories for the Nav
  const categories = Array.from(new Set(allFaqs.map((f) => f.category)));

  // 2. Generate JSON-LD Schema for Google SGE / Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Strip HTML tags for the JSON-LD schema, keep raw text
        text: faq.answerHtml.replace(/<[^>]*>?/gm, ""),
      },
    })),
  };

  return (
    <main className="bg-[#F7F3EC] min-h-screen">
      {/* Inject AEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Featured FAQs & Hero Hook */}
      <FAQHero />

      {/* 2. Sticky Category Navigation */}
      {categories.length > 0 && <FAQCategoryNav categories={categories} />}

      {/* 3. Render an Accordion Group for each Category */}
      <div className="pb-24">
        {categories.map((category) => (
          <FAQCategoryGrid
            key={category}
            category={category}
            faqs={allFaqs.filter((f) => f.category === category)}
          />
        ))}
      </div>
      <FAQFinalCTA />
    </main>
  );
}
