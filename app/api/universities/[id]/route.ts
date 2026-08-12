// app/api/universities/[id]/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  deleteUniversity,
  getUniversityById,
  updateUniversity,
} from "@/services/universityService";
import connectDB from "@/lib/db";
import { University } from "@/models/University";
import {
  createSlugConflictResponse,
  getSlugConflictResponse,
  isMongoDuplicateSlugError,
} from "@/lib/slugValidation";
import { requireAdminRequest } from "@/lib/adminAuth";
import {
  UNIVERSITY_AUTHOR,
  UNIVERSITY_REVIEWER,
} from "@/lib/universityGovernance";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

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
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  let submittedSlug = "";

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    submittedSlug = typeof body.slug === "string" ? body.slug : "";

    // Author and reviewer are predefined site-wide; mentors are rendered by a
    // static component. Enforce here so no client payload can change them.
    body.author = { ...UNIVERSITY_AUTHOR };
    body.reviewedBy = { ...UNIVERSITY_REVIEWER };
    delete body.mentors;

    const slugConflict = await getSlugConflictResponse(
      University,
      "university",
      body.slug,
      id,
    );
    if (slugConflict) return slugConflict;

    const existingUniversity = await University.findById(id).select("slug");
    const previousSlug = existingUniversity?.slug as string | undefined;

    const updatedUniversity = await updateUniversity(id, body);

    if (!updatedUniversity) {
      return NextResponse.json(
        { error: "University record not found for update" },
        { status: 404 },
      );
    }

    // The public university pages are statically rendered with no
    // time-based revalidation, so without this an edit or publish
    // wouldn't show up until the next deploy.
    revalidatePath("/universities");
    revalidatePath("/");
    revalidatePath(`/universities/${updatedUniversity.slug}`);
    if (previousSlug && previousSlug !== updatedUniversity.slug) {
      revalidatePath(`/universities/${previousSlug}`);
    }

    return NextResponse.json(updatedUniversity);
  } catch (error) {
    if (isMongoDuplicateSlugError(error)) {
      return createSlugConflictResponse("university", submittedSlug);
    }

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
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const deletedUniversity = await deleteUniversity(id);

    if (!deletedUniversity) {
      return NextResponse.json(
        { error: "University record not found for deletion" },
        { status: 404 },
      );
    }

    revalidatePath("/universities");
    revalidatePath("/");
    revalidatePath(`/universities/${deletedUniversity.slug}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete university record" },
      { status: 500 },
    );
  }
}
