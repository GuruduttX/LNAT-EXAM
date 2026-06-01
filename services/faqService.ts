import connectDB from "@/lib/db";
import { FAQ } from "@/models/FAQ";

interface GetFAQsParams {
  category?: string;
  status?: "draft" | "published" | "all";
}

export async function getFAQs({
  category,
  status = "all",
}: GetFAQsParams = {}) {
  await connectDB();

  const query: Record<string, unknown> = {};

  if (category && category !== "all") {
    query.category = category;
  }

  if (status === "draft") {
    query.status = "draft";
  }

  if (status === "published") {
    // FAQs created before CMS statuses were introduced are existing public content.
    query.$or = [{ status: "published" }, { status: { $exists: false } }];
  }

  return FAQ.find(query).sort({ category: 1, createdAt: 1 }).lean();
}

export async function getPublishedFAQs() {
  return getFAQs({ status: "published" });
}
