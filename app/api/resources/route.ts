import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { getResources } from "@/services/resourceService";
import {
  createSlugConflictResponse,
  getSlugConflictResponse,
  isMongoDuplicateSlugError,
} from "@/lib/slugValidation";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const status =
      (searchParams.get("status") as "draft" | "published" | "all" | null) ||
      "published";

    if (status !== "published") {
      const authError = requireAdminRequest(request);
      if (authError) return authError;
    }

    const resources = await getResources({ status, category });

    return NextResponse.json({ resources });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  let submittedSlug = "";

  try {
    await connectDB();
    const body = await request.json();
    submittedSlug = typeof body.slug === "string" ? body.slug : "";

    const slugConflict = await getSlugConflictResponse(
      Resource,
      "resource",
      body.slug,
    );
    if (slugConflict) return slugConflict;

    const newResource = await Resource.create(body);
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    if (isMongoDuplicateSlugError(error)) {
      return createSlugConflictResponse("resource", submittedSlug);
    }

    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 },
    );
  }
}
