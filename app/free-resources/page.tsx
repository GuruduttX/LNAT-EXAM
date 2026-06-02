import ResourcesHero from "@/components/free-resources/ResourcesHero";
import ResourcesClient from "@/components/free-resources/ResourcesClient";
import { getResources } from "@/services/resourceService";
import { IResource } from "@/types/backend.types";
import { createBreadcrumbSchema } from "@/lib/breadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  title: "Free LNAT Resources | LNAT Exam India",
  description:
    "Access curated guides, essay frameworks, and strategic checklists to prepare for the LNAT and elite UK law admissions.",
};

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
        name: "Free LNAT Resources",
        url: `${siteUrl}/free-resources`,
        description:
          "Curated LNAT guides, essay frameworks, and strategic checklists for UK law admissions preparation.",
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
      <ResourcesClient resources={clientResources} />
    </main>
  );
}
