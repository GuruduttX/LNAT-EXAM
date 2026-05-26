import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";

export async function getResources({
  status,
  category,
}: {
  status?: "draft" | "published" | "all";
  category?: string;
} = {}) {
  await connectDB();

  const query: Record<string, unknown> = {};
  if (status && status !== "all") {
    query.status = status;
  }
  if (category) {
    query.category = category;
  }

  return Resource.find(query).sort({ createdAt: -1 }).lean();
}

export async function getResourceById(id: string) {
  await connectDB();
  return Resource.findById(id);
}
