import FAQHero from "@/components/faq/FAQHero";
import FAQCategoryNav from "@/components/faq/FAQCategoryNav";
import FAQCategoryGrid from "@/components/faq/FAQAccordion";
import type { FAQItem } from "@/components/faq/FAQAccordion";
import FAQFinalCTA from "@/components/faq/FAQFinalCTA";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getPublishedFAQs } from "@/services/faqService";

export const metadata = {
  title: "LNAT FAQ 2027: Format, Score, Fees, Deadlines, Universities & India",
  description:
    "The most complete LNAT FAQ for Indian students — format, scoring, universities, JGLS, fees, registration, deadlines, results and preparation.",
  alternates: {
    canonical: "/faq",
  },
};

const contentPackFaqs = [
  {
    category: "LNAT basics",
    question: "What is the LNAT?",
    answer:
      "The Law National Aptitude Test is a 2h15m computer-based admissions test for undergraduate law, with 42 multiple-choice questions in Section A, scored out of 42, and one essay in Section B, 40 minutes. It tests reasoning and writing, not legal knowledge.",
  },
  {
    category: "LNAT basics",
    question: "What is the full form of LNAT?",
    answer:
      "LNAT stands for Law National Aptitude Test, also called the National Admissions Test for Law.",
  },
  {
    category: "LNAT basics",
    question: "Who administers the LNAT?",
    answer:
      "Content is managed by the LNAT Consortium, based at the University of Oxford, and the test is delivered worldwide by Pearson VUE.",
  },
  {
    category: "LNAT basics",
    question: "Is the LNAT hard?",
    answer:
      "It is challenging mainly because of time pressure, not specialist content. With timed practice and feedback, most students improve their score.",
  },
  {
    category: "Format & scoring",
    question: "What is the LNAT exam pattern?",
    answer:
      "Section A has 42 multiple-choice questions on 12 passages in 95 minutes, scored out of 42. Section B is one essay from three prompts in 40 minutes. Total test time is 2 hours 15 minutes.",
  },
  {
    category: "Format & scoring",
    question: "How is the LNAT scored?",
    answer:
      "Section A is scored automatically out of 42: your LNAT score. Section B is not auto-scored; it is sent to universities, some of which read it. Oxford marks it centrally.",
  },
  {
    category: "Format & scoring",
    question: "What is a good LNAT score?",
    answer:
      "There is no universal pass mark. A score of 25+ is broadly competitive; Oxford's shortlisted and offer-holder averages are near 29-31. Target your chosen universities.",
  },
  {
    category: "Format & scoring",
    question: "What is the average LNAT score?",
    answer:
      "Across all candidates the average typically sits in the low-to-mid 20s out of 42. Selective universities' applicants average higher.",
  },
  {
    category: "Format & scoring",
    question: "Is the Section B essay scored?",
    answer:
      "Not numerically by the test. It is provided to universities; some assess it, including Oxford, while others rely on Section A.",
  },
  {
    category: "Universities",
    question: "Which universities require the LNAT?",
    answer:
      "Nine UK universities require the LNAT: Oxford, Cambridge, UCL, LSE, KCL, Durham, Bristol, Glasgow and SOAS, plus IE University in Spain, NUS and SUSS in Singapore and JGLS in India.",
  },
  {
    category: "Universities",
    question: "Does every university use the essay?",
    answer:
      "No. Oxford reads it; Bristol weights it; others use it variably or rely on Section A. JGLS uses Section A only.",
  },
  {
    category: "Universities",
    question: "Can one LNAT score go to multiple universities?",
    answer:
      "Yes. Results are sent automatically to the LNAT universities among your UCAS choices, so you sit the test once.",
  },
  {
    category: "Universities",
    question: "Which universities stopped using the LNAT?",
    answer:
      "Nottingham stopped from 2022 entry. The list can change, so confirm requirements for your application year.",
  },
  {
    category: "India & JGLS",
    question: "Is the LNAT required in India?",
    answer:
      "Yes. JGLS now requires the LNAT-UK as its mandatory entrance test, and UK applications from India have always required it for LNAT universities.",
  },
  {
    category: "India & JGLS",
    question: "Does JGLS use the essay?",
    answer: "No. Only Section A is assessed for JGLS admissions.",
  },
  {
    category: "India & JGLS",
    question: "Where can I take the LNAT in India?",
    answer:
      "At 40+ Pearson VUE centres including Delhi, Mumbai, Bengaluru, Chennai, Hyderabad and Pune.",
  },
  {
    category: "India & JGLS",
    question: "How much does the LNAT cost in India?",
    answer:
      "GBP 120 outside the UK/EU, paid in GBP. Budget for currency conversion and bank charges.",
  },
  {
    category: "Registration, deadlines & results",
    question: "When does registration open?",
    answer:
      "Registration opens on 1 August for entry the following year; testing runs from 1 September to 31 July. For 2027 entry, registration opens 1 August 2026.",
  },
  {
    category: "Registration, deadlines & results",
    question: "When is the LNAT deadline?",
    answer:
      "It varies by university. Oxford and Cambridge are earliest, usually requiring candidates to sit by mid-October. London universities ask for earlier sittings than most, while others align with the main UCAS cycle.",
  },
  {
    category: "Registration, deadlines & results",
    question: "Can I retake the LNAT?",
    answer: "No. You get one sitting per cycle, and only the first attempt counts.",
  },
  {
    category: "Registration, deadlines & results",
    question: "When do I get my LNAT results?",
    answer:
      "Universities receive results automatically, usually within about 24 hours. Candidates can access their own results at set points in the year.",
  },
  {
    category: "Preparation",
    question: "How long should I prepare?",
    answer:
      "Usually 6-12 weeks of timed practice; Oxbridge applicants should start earlier.",
  },
  {
    category: "Preparation",
    question: "How do I prepare for Section A?",
    answer:
      "Use timed sets, review every error, focus on assumptions and conclusions, and practise pacing the final questions.",
  },
  {
    category: "Preparation",
    question: "How do I prepare for Section B?",
    answer:
      "Write timed essays with feedback. Focus on a clear position, both sides of the argument and a real conclusion.",
  },
  {
    category: "Preparation",
    question: "Are official practice papers free?",
    answer:
      "Yes. The official LNAT website offers free practice papers and sample essays. Do not rely on unofficial copies.",
  },
  {
    category: "Preparation",
    question: "Do you offer LNAT coaching?",
    answer:
      "Yes. We offer online and in-person LNAT coaching with mentor feedback and full mocks. Message us for details.",
  },
];

const allFaqs: FAQItem[] = contentPackFaqs.map((faq, index) => ({
  _id: `content-pack-faq-${index + 1}`,
  category: faq.category,
  question: faq.question,
  answerHtml: `<p>${faq.answer}</p>`,
}));

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
  const backendFaqs = await getFaqsFromDB();
  const visibleFaqs = backendFaqs.length ? backendFaqs : allFaqs;
  const categories = Array.from(new Set(visibleFaqs.map((f) => f.category)));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: visibleFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answerHtml.replace(/<[^>]*>?/gm, ""),
          },
        })),
      },
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "FAQs", href: "/faq" },
      ]),
    ],
  };

  return (
    <main className="bg-[#F7F3EC] min-h-screen">
      {/* Inject AEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
            faqs={visibleFaqs.filter((f) => f.category === category)}
          />
        ))}
      </div>
      <FAQFinalCTA />
    </main>
  );
}
