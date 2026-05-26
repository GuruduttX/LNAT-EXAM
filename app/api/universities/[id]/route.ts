// app/api/universities/[id]/route.ts
import { NextResponse } from "next/server";
import {
  deleteUniversity,
  getUniversityById,
  updateUniversity,
} from "@/services/universityService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const university = await getUniversityById(id);
    if (!university) {
      return NextResponse.json(
        { error: "University file record not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(university);
  } catch {
    return NextResponse.json(
      { error: "Failed to pull single entity map profile" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedUniversity = await updateUniversity(id, body);

    if (!updatedUniversity) {
      return NextResponse.json(
        { error: "University record not found for update" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedUniversity);
  } catch {
    return NextResponse.json(
      { error: "Failed to update university record" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const deletedUniversity = await deleteUniversity(id);

    if (!deletedUniversity) {
      return NextResponse.json(
        { error: "University record not found for deletion" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete university record" },
      { status: 500 },
    );
  }
}
