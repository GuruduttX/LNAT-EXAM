import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";
import { getBlogById } from "@/services/blogService";
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
    const blog = await getBlogById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
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
      Blog,
      "blog",
      body.slug,
      id,
    );
    if (slugConflict) return slugConflict;

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    if (isMongoDuplicateSlugError(error)) {
      return createSlugConflictResponse("blog", submittedSlug);
    }

    return NextResponse.json(
      { error: "Failed to update blog" },
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
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
