import FAQHero from "@/components/faq/FAQHero";
import FAQClient from "@/components/faq/FAQClient";

export const metadata = {
  title: "Frequently Asked Questions | LNAT Exam India",
  description:
    "Answers to common questions regarding the LNAT admissions process, preparation timelines, and scoring logistics.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <FAQHero />
      <FAQClient />
    </main>
  );
}
