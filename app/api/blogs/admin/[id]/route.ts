import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";
import { getBlogById } from "@/services/blogService";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
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
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
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
