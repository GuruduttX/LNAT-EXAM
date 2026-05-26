import { notFound } from "next/navigation";

import CategoryForm from "@/components/Admin/Category/CategoryForm";
import { getCategoryById } from "@/services/categoryService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const categoryDocument = await getCategoryById(id);

  if (!categoryDocument) {
    notFound();
  }

  const category = JSON.parse(JSON.stringify(categoryDocument));

  return <CategoryForm mode="edit" initialData={category} />;
}
