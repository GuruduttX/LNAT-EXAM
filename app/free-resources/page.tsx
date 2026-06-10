import ResourcesHero from "@/components/free-resources/ResourcesHero";
import ResourcesOfficialPractice from "@/components/free-resources/ResourcesOfficialPractice";
import ResourcesClient from "@/components/free-resources/ResourcesClient";
import FAQSection from "@/components/universities/FAQSection";
import { getResources } from "@/services/resourceService";
import { IResource } from "@/types/backend.types";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  title: "Free LNAT Resources: Practice Papers, Guides & Sample Essays",
  description:
    "Free LNAT preparation resources for Indian students — official practice papers, study guides, sample essays and a reading list.",
};

const faqItems = [
  {
    question: "Are there free LNAT practice papers?",
    answer:
      "Yes. The official LNAT website provides free practice papers for Section A and sample essays for Section B. These are the most accurate practice available.",
  },
  {
    question: "Where can I find official LNAT practice?",
    answer:
      "On the official LNAT website, lnat.ac.uk. We link to it rather than hosting copyrighted papers ourselves.",
  },
  {
    question: "How many official practice tests are there?",
    answer:
      "A limited number of official Section A papers plus sample essay prompts. Use them carefully and supplement with full-length mocks.",
  },
  {
    question: "Are the free resources enough to prepare?",
    answer:
      "They are a strong foundation, especially for Section A. Many students add coaching for marked essay feedback and structured mocks, which are hard to self-assess.",
  },
  {
    question: "What is the best free way to improve Section A?",
    answer:
      "Do official papers under timed conditions, review every wrong answer, and read argumentative articles daily to build speed and comprehension.",
  },
  {
    question: "How do I practise the essay for free?",
    answer:
      "Write timed 40-minute essays on official or self-set prompts, then critique structure: clear position, counter-argument and genuine conclusion.",
  },
  {
    question: "Are there free LNAT mock tests?",
    answer:
      "Official papers are the best free timed practice. If we offer a free diagnostic mock, it will be listed in the resource library.",
  },
  {
    question: "What books help with the LNAT?",
    answer:
      "Books on critical thinking and argument can help, but timed past-paper practice matters most. Avoid memorising tricks; build genuine reasoning.",
  },
  {
    question: "What should I read to prepare?",
    answer:
      "Quality opinion and long-form journalism, including editorials, essays and analysis, helps build the comprehension and reasoning the test rewards.",
  },
  {
    question: "Is the official familiarisation test free?",
    answer:
      "Yes. The official site lets you experience the test interface so the real Pearson VUE format feels familiar on test day.",
  },
  {
    question: "Can I reuse practice papers?",
    answer:
      "You can revisit them, but their value drops once you know the answers. Treat your first timed attempt as the true benchmark.",
  },
  {
    question: "Do free resources cover JGLS preparation?",
    answer:
      "Yes. Since JGLS uses Section A only, official Section A practice is ideal for India-route applicants.",
  },
  {
    question: "How current are these resources?",
    answer:
      "We update our guides each cycle and link to the official site for rules and dates, which is always the primary source.",
  },
  {
    question: "Are paid resources necessary?",
    answer:
      "Not to start. Begin with free official practice; add paid coaching or mocks when you want feedback, structure or a higher target score.",
  },
  {
    question: "How do I use a sample essay?",
    answer:
      "Read it for structure and argument, not to copy. Then write your own on the same prompt under time and compare your reasoning.",
  },
  {
    question: "How many essays should I practise?",
    answer:
      "Several timed essays with feedback are more valuable than many unreviewed ones. Quality of review beats quantity.",
  },
  {
    question: "Do you offer a free study plan?",
    answer:
      "Our blog study-plan content gives a week-by-week structure you can follow for free when published.",
  },
  {
    question: "Can I get free LNAT updates?",
    answer:
      "Follow our blog and the official LNAT site. We post India-specific deadline and process updates each cycle.",
  },
  {
    question: "Are these resources suitable for beginners?",
    answer:
      "Yes. Start with the complete LNAT guide, then official practice, then build toward timed mocks.",
  },
  {
    question: "What is the single most useful free resource?",
    answer:
      "The official practice papers, used under real timing. Nothing mirrors the test better.",
  },
];

export default async function FreeResourcesPage() {
  const siteUrl = getSiteUrl();
  const resourceDocuments = await getResources({ status: "published" });
  const resources = JSON.parse(JSON.stringify(resourceDocuments)) as IResource[];

  const clientResources = resources.map((resource) => ({
    id: resource._id || resource.slug,
    title: resource.title,
    slug: resource.slug,
    category: resource.category,
    shortDescription: resource.shortDescription,
    iconName: resource.iconName,
    fileUrl: resource.fileUrl,
    fileFormat: resource.fileFormat,
    fileBytes: resource.fileBytes,
    downloadLabel: resource.downloadLabel,
    status: resource.status,
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Free LNAT Resources for Indian Students",
        url: `${siteUrl}/free-resources`,
        description:
          "Free LNAT preparation resources for Indian students, including official practice links, study guides, sample essays and downloadable PDFs.",
      },
      {
        "@type": "ItemList",
        name: "Published free LNAT resources",
        itemListElement: resources.map((resource, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: resource.title,
          url: `${siteUrl}/free-resources#${resource.slug}`,
        })),
      },
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
      createBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Free Resources", href: "/free-resources" },
      ]),
    ],
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ResourcesHero />
      <ResourcesOfficialPractice resources={clientResources} />
      <ResourcesClient resources={clientResources} />
      <FAQSection
        faqItems={faqItems}
        eyebrow="Resources FAQ"
        heading="Frequently asked questions about"
        highlightedHeading="LNAT resources"
      />
    </main>
  );
}
