import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Category } from "@/models/Category";
import { getCategories } from "@/services/categoryService";
import {
  createSlugConflictResponse,
  getSlugConflictResponse,
  isMongoDuplicateSlugError,
} from "@/lib/slugValidation";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
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
      Category,
      "category",
      body.slug,
    );
    if (slugConflict) return slugConflict;

    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (isMongoDuplicateSlugError(error)) {
      return createSlugConflictResponse("category", submittedSlug);
    }

    return NextResponse.json(
      { error: "Invalid category data" },
      { status: 400 },
    );
  }
}
