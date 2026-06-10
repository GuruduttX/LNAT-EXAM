import FAQSection from "@/components/universities/FAQSection";
import TopicsArchiveSection from "@/components/Topic/TopicsArchiveSection";
import TopicsArchiveHero from "@/components/Topic/TopicsArchiveHero";
import TopicsEnquiryCTA from "@/components/Topic/TopicsEnquiryCTA";
import TopicsKnowledgeMap from "@/components/Topic/TopicsKnowledgeMap";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getPublishedCategories } from "@/services/categoryService";
import { ICategory } from "@/types/backend.types";

export const metadata = {
  title: "LNAT Topics: Format, Sections, Scoring, Universities & Prep",
  description:
    "Every LNAT topic in one place — format, Section A, Section B, scoring, registration, deadlines, universities and India/JGLS.",
};

const faqItems = [
  {
    question: "What does the LNAT involve?",
    answer:
      "Two parts in 2h15m: Section A has 42 multiple-choice questions in 95 minutes and is scored out of 42; Section B is one essay in 40 minutes. It measures reasoning and writing, not legal knowledge.",
  },
  {
    question: "What skills does the LNAT test?",
    answer:
      "Reading comprehension, deductive and inductive reasoning, the ability to identify assumptions and conclusions, and clear written argument.",
  },
  {
    question: "Is the LNAT an aptitude or knowledge test?",
    answer:
      "An aptitude test. There is no syllabus of legal content; it assesses how you think and argue, which is why preparation focuses on technique.",
  },
  {
    question: "How is Section A structured?",
    answer:
      "Twelve argumentative passages with 42 multiple-choice questions in total, to be answered in 95 minutes. Each question tests your understanding of the passage's reasoning.",
  },
  {
    question: "How does Section B work?",
    answer:
      "You choose one of three essay prompts and write a response in 40 minutes. It is not auto-scored; universities receive it and some assess it directly.",
  },
  {
    question: "How is the LNAT scored?",
    answer:
      "Only Section A produces a number: your score out of 42. Section B is qualitative and read by universities that use it, such as Oxford.",
  },
  {
    question: "What is a competitive LNAT score?",
    answer:
      "Roughly 25+ is competitive generally; the most selective universities see offer averages near 29-31. There is no official pass mark.",
  },
  {
    question: "When can I take the LNAT?",
    answer:
      "Testing runs from 1 September to 31 July each cycle, with registration opening 1 August beforehand. Your deadline depends on your universities.",
  },
  {
    question: "How do I register for the LNAT?",
    answer:
      "Create an account on the Pearson VUE LNAT system, link your UCAS Personal ID, book a slot at a test centre and pay the fee.",
  },
  {
    question: "How much does the LNAT cost?",
    answer:
      "GBP 75 at UK/EU centres and GBP 120 elsewhere, including India. The fee is paid in GBP.",
  },
  {
    question: "Can I take the LNAT more than once a year?",
    answer:
      "No. One sitting per admissions cycle, and only the first attempt counts.",
  },
  {
    question: "Which universities require the LNAT?",
    answer:
      "Nine UK universities: Oxford, Cambridge, UCL, LSE, KCL, Durham, Bristol, Glasgow and SOAS, plus IE University, NUS, SUSS and JGLS internationally.",
  },
  {
    question: "Is the LNAT used in India?",
    answer:
      "Yes. JGLS requires the LNAT-UK, Section A only, and Indian students applying to the UK have always needed it for LNAT universities.",
  },
  {
    question: "Where can Indian students take the LNAT?",
    answer:
      "At 40+ Pearson VUE centres across major Indian cities; you choose your centre when booking.",
  },
  {
    question: "Do all universities use the Section B essay?",
    answer:
      "No. Oxford reads and marks it; others use it variably or rely on Section A. JGLS uses only Section A.",
  },
  {
    question: "How long should I prepare?",
    answer:
      "Typically 6-12 weeks of timed practice, started earlier for Oxbridge.",
  },
  {
    question: "Are official practice materials available?",
    answer:
      "Yes. The LNAT website provides practice papers and sample essays; use them with full-length mocks.",
  },
  {
    question: "How do I get my LNAT results?",
    answer:
      "Universities receive results automatically, usually within about 24 hours of your test. Candidates can access their own results at set points in the year.",
  },
  {
    question: "Does the LNAT replace A-levels or grades?",
    answer:
      "No. It sits alongside your academic qualifications, personal statement and, where used, interview. It is one part of the application.",
  },
  {
    question: "Where do I go deeper on each topic?",
    answer:
      "Open the linked guides above for full detail on each section, scoring, registration, deadlines and your target universities.",
  },
];

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
        name: "LNAT Topics: Everything About the Exam, in One Place",
        url: "https://www.lnatexamindia.com/topics",
        description:
          "This hub maps every LNAT topic: the exam format and sections, scoring, registration and deadlines, universities that use it, the India/JGLS route, and how to prepare.",
      },
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Topics", href: "/topics" },
      ]),
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "ItemList",
        name: "Published LNAT Topic Hubs",
        itemListElement: categories.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: category.name,
          url: `https://www.lnatexamindia.com/topics/${category.slug}`,
        })),
      },
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
      <TopicsKnowledgeMap />
      <TopicsArchiveSection categories={categories} />
      <FAQSection
        faqItems={faqItems}
        eyebrow="LNAT Overview FAQ"
        heading="Frequently asked questions about"
        highlightedHeading="LNAT topics"
      />
      <TopicsEnquiryCTA />
    </main>
  );
}
