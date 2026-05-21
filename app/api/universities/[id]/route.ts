// app/api/universities/[id]/route.ts
import { NextResponse } from "next/server";
import { getUniversityById } from "@/services/universityService";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const university = await getUniversityById(params.id);
    if (!university) {
      return NextResponse.json(
        { error: "University file record not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(university);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to pull single entity map profile" },
      { status: 500 },
    );
  }
}