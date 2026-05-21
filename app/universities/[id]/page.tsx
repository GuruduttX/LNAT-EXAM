import { notFound } from "next/navigation";
import { universitiesData } from "@/data/universities";
import UniversityHero from "@/components/universities/detail/UniversityHero";
import UniversityStats from "@/components/universities/detail/UniversityStats";
import UniversityContent from "@/components/universities/detail/UniversityContent";

// Updated: params is now a Promise in Next.js 15+
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 1. Generate static paths at build time based on our data
export function generateStaticParams() {
  return universitiesData.map((uni) => ({
    id: uni.id,
  }));
}

// 2. Generate dynamic metadata for SEO (Updated to async)
export async function generateMetadata({ params }: PageProps) {
  // Await the params promise before using it
  const resolvedParams = await params;
  const university = universitiesData.find(
    (uni) => uni.id === resolvedParams.id,
  );

  if (!university) return { title: "Not Found | LNAT Exam India" };

  return {
    title: `${university.name} LNAT Admissions Guide | LNAT Exam India`,
    description: `Learn about the LNAT requirements, application process, and deadlines for ${university.name}.`,
  };
}

// 3. The Server Component (Updated to async)
export default async function UniversityDetailPage({ params }: PageProps) {
  // Await the params promise before using it
  const resolvedParams = await params;
  const university = universitiesData.find(
    (uni) => uni.id === resolvedParams.id,
  );

  if (!university) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <UniversityHero university={university} />
      <UniversityStats university={university} />
      <UniversityContent university={university} />
    </main>
  );
}
