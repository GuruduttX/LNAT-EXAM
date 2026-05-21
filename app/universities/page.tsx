import ArchiveHero from "@/components/universities/ArchiveHero";
import ArchiveClient from "@/components/universities/ArchiveClient";

export const metadata = {
  title: "LNAT Universities Archive | LNAT Exam India",
  description:
    "Explore the prestigious global universities accepting the LNAT, including Oxford, Cambridge, UCL, and LSE.",
};

export default function UniversitiesArchivePage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <ArchiveHero />
      <ArchiveClient />
    </main>
  );
}
