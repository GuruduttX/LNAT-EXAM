import ApplyHero from "@/components/how-to-apply/ApplyHero"; // Use your existing hero
import ApplyTimeline from "@/components/how-to-apply/ApplyTimeline";
import ApplyHowWeHelp from "@/components/how-to-apply/ApplyHowWeHelp";
import FAQFinalCTA from "@/components/faq/FAQFinalCTA"; // Reuse your high-converting CTA

export default function HowToApplyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <ApplyHero />
      <ApplyTimeline />
      <ApplyHowWeHelp />
      <FAQFinalCTA />
    </main>
  );
}
