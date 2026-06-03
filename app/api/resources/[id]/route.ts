import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { getResourceById } from "@/services/resourceService";
import {
  createSlugConflictResponse,
  getSlugConflictResponse,
  isMongoDuplicateSlugError,
} from "@/lib/slugValidation";
import { requireAdminRequest } from "@/lib/adminAuth";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const authError = requireAdminRequest(_request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const resource = await getResourceById(id);

    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json(resource);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteProps) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  let submittedSlug = "";

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    submittedSlug = typeof body.slug === "string" ? body.slug : "";

    const slugConflict = await getSlugConflictResponse(
      Resource,
      "resource",
      body.slug,
      id,
    );
    if (slugConflict) return slugConflict;

    const updated = await Resource.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (isMongoDuplicateSlugError(error)) {
      return createSlugConflictResponse("resource", submittedSlug);
    }

    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  const authError = requireAdminRequest(_request);
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Resource.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 },
    );
  }
}
