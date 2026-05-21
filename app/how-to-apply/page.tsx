import ApplyHero from "@/components/how-to-apply/ApplyHero";
import ApplyTimeline from "@/components/how-to-apply/ApplyTimeline";
import IndiaGuidance from "@/components/how-to-apply/IndiaGuidance";
import MentorCTA from "@/components/how-to-apply/MentorCTA";

export const metadata = {
  title: "How to Apply for the LNAT | Registration Guide | LNAT Exam India",
  description:
    "A step-by-step guide on how to register for the LNAT, book your test date, and integrate your scores with your UCAS application.",
};

export default function HowToApplyPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <ApplyHero />
      <ApplyTimeline />
      <IndiaGuidance />
      <MentorCTA />
    </main>
  );
}
