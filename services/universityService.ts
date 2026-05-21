// services/universityService.ts
import { University } from "@/models/University";
import connectDB from "@/lib/db";

interface GetUniversitiesParams {
  page?: number;
  limit?: number;
  country?: string;
  lnatRequirement?: string;
  search?: string;
}

export async function getUniversitiesArchive({
  page = 1,
  limit = 6,
  country,
  lnatRequirement,
  search,
}: GetUniversitiesParams) {
  await connectDB();

  const query: any = {};

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
    ];
  }

  const skip = (page - 1) * limit;

  const [universities, total] = await Promise.all([
    University.find(query)
      .sort({ name: 1 }) // Alphabetic sorting default for luxury archive directories
      .skip(skip)
      .limit(limit)
      .select("-overview"), // Drops the heavy rich text HTML payload for standard cards
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

export async function getUniversityById(id: string) {
  await connectDB();
  return University.findById(id);
}

export async function updateUniversity(id: string, data: any) {
  await connectDB();
  return University.findByIdAndUpdate(
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