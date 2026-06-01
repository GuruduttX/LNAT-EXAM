import ResourcesHero from "@/components/free-resources/ResourcesHero";
import ResourcesClient from "@/components/free-resources/ResourcesClient";
import { getResources } from "@/services/resourceService";
import { IResource } from "@/types/backend.types";

export const metadata = {
  title: "Free LNAT Resources | LNAT Exam India",
  description:
    "Access curated guides, essay frameworks, and strategic checklists to prepare for the LNAT and elite UK law admissions.",
};

export default async function FreeResourcesPage() {
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

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <ResourcesHero />
      <ResourcesClient resources={clientResources} />
    </main>
  );
}
