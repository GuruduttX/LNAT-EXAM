import ResourcesHero from "@/components/free-resources/ResourcesHero";
import ResourcesClient from "@/components/free-resources/ResourcesClient";

export const metadata = {
  title: "Free LNAT Resources | LNAT Exam India",
  description:
    "Access curated guides, essay frameworks, and strategic checklists to prepare for the LNAT and elite UK law admissions.",
};

export default function FreeResourcesPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <ResourcesHero />
      <ResourcesClient />
    </main>
  );
}
