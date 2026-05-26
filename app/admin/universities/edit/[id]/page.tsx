import UniversityForm from "@/components/Admin/University/UniversityForm";
import { getUniversityById } from "@/services/universityService";

export default async function EditUniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const university = await getUniversityById(id);

  if (!university) {
    return (
      <div className="py-12 text-slate-300">
        University not found.
      </div>
    );
  }

  const initialData = JSON.parse(JSON.stringify(university));

  return <UniversityForm mode="edit" initialData={initialData} />;
}
