// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getBlogsArchive } from "@/services/blogService";
import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";
import {
  createSlugConflictResponse,
  getSlugConflictResponse,
  isMongoDuplicateSlugError,
} from "@/lib/slugValidation";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") || "published";

    if (status !== "published") {
      const authError = requireAdminRequest(request);
      if (authError) return authError;
    }

    const data = await getBlogsArchive({ page, limit, category, status });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

// POST Create (Admin/CMS)
export async function POST(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  let submittedSlug = "";

  try {
    await connectDB();
    const body = await request.json();
    submittedSlug = typeof body.slug === "string" ? body.slug : "";

    const slugConflict = await getSlugConflictResponse(
      Blog,
      "blog",
      body.slug,
    );
    if (slugConflict) return slugConflict;

    const newBlog = await Blog.create(body);

    // The public blog pages are statically rendered with no time-based
    // revalidation, so without this they'd keep serving stale/missing
    // content until the next deploy.
    revalidatePath("/blog");
    revalidatePath("/");
    if (newBlog.status === "published") {
      revalidatePath(`/blog/${newBlog.slug}`);
    }

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    if (isMongoDuplicateSlugError(error)) {
      return createSlugConflictResponse("blog", submittedSlug);
    }

    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
