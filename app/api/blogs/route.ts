// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { getBlogsArchive } from "@/services/blogService";
import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";

// GET Archive (Public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const category = searchParams.get("category") || undefined;

    const data = await getBlogsArchive({ page, limit, category });
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
