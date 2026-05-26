import { notFound } from "next/navigation";

import ResourceForm from "@/components/Admin/Resource/ResourceForm";
import { getResourceById } from "@/services/resourceService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditResourcePage({ params }: PageProps) {
  const { id } = await params;
  const resourceDocument = await getResourceById(id);

  if (!resourceDocument) {
    notFound();
  }

  const resource = JSON.parse(JSON.stringify(resourceDocument));

  return <ResourceForm mode="edit" initialData={resource} />;
}
