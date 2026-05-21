// app/api/universities/route.ts
import { NextResponse } from "next/server";
import { getUniversitiesArchive } from "@/services/universityService";
import connectDB from "@/lib/db";
import { University } from "@/models/University";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const country = searchParams.get("country") || undefined;
    const lnatRequirement = searchParams.get("lnatRequirement") || undefined;
    const search = searchParams.get("search") || undefined;

    const data = await getUniversitiesArchive({
      page,
      limit,
      country,
      lnatRequirement,
      search,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to query universities directory" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newUniversity = await University.create(body);
    return NextResponse.json(newUniversity, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid document structure data passed" },
      { status: 400 },
    );
  }
}
