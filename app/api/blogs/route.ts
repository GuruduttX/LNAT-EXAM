// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { getBlogsArchive } from "@/services/blogService";
import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const category = searchParams.get("category") || undefined;

    // NEW: Handle status parameter
    const status = searchParams.get("status") || "published";

    // Build the query object
    const query: any = {};
    if (category) query.category = category;

    // If status is 'all', we don't filter by status (returns both drafts and published)
    if (status !== "all") {
      query.status = status;
    }
    // Update your getBlogsArchive service to accept the raw query object,
    // or pass the status down to it if you prefer.
    const data = await getBlogsArchive({ page, limit, category, status });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

// POST Create (Admin/CMS)
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
