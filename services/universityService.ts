// services/universityService.ts
import { University } from "@/models/University";
import connectDB from "@/lib/db";
import { IUniversity } from "@/types/backend.types";

interface GetUniversitiesParams {
  page?: number;
  limit?: number;
  country?: string;
  lnatRequirement?: string;
  search?: string;
  status?: "draft" | "published";
}

export async function getUniversitiesArchive({
  page = 1,
  limit = 6,
  country,
  lnatRequirement,
  search,
  status,
}: GetUniversitiesParams) {
  await connectDB();

  const query: Record<string, unknown> = {};

  if (status) {
    query.status = status;
  }

  // Dynamic Filtering
  if (country && country !== "all") {
    query.country = country;
  }
  if (lnatRequirement && lnatRequirement !== "all") {
    query.lnatRequirement = lnatRequirement;
  }

  // Partial Text Search across Name or Location
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
      { locationLabel: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [universities, total] = await Promise.all([
    University.find(query)
      .sort({ name: 1 }) // Alphabetic sorting default for luxury archive directories
      .skip(skip)
      .limit(limit)
      .select("-overview -hero -gallery -strengths -cityLife -studentExperience -admissions -careers -faqs"), // Drops heavy page-builder style payloads for archive cards
    University.countDocuments(query),
  ]);

  return {
    universities,
    meta: {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
    },
  };
}

export async function getPublishedUniversities() {
  await connectDB();

  return University.find({ status: "published" })
    .sort({ name: 1 })
    .lean();
}

export async function getFeaturedUniversities(limit = 6) {
  await connectDB();

  return University.find({ status: "published" })
    .sort({ featured: -1, name: 1 })
    .limit(limit)
    .select(
      "name slug location locationLabel city country image cardImage shortDescription excerpt40to60 globalRanking nationalRanking lawSchoolRanking lnatRequirement",
    )
    .lean();
}

export async function getUniversityById(id: string) {
  await connectDB();
  return University.findById(id);
}

export async function getUniversityBySlug(slug: string) {
  await connectDB();
  return University.findOne({ slug });
}

export async function getPublishedUniversitySlugs() {
  await connectDB();
  const universities = await University.find({ status: "published" })
    .select("slug")
    .lean();

  return universities
    .map((university) => university.slug)
    .filter(Boolean);
}

export async function updateUniversity(id: string, data: Partial<IUniversity>) {
  await connectDB();
  return await University.findByIdAndUpdate(
    id,
    data,
    // new: true returns the updated document
    // runValidators: true ensures our lnatRequirement enums are respected
    { new: true, runValidators: true },
  );
}

export async function deleteUniversity(id: string) {
  await connectDB();
  return University.findByIdAndDelete(id);
}
