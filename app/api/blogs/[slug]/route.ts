// app/api/blogs/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getBlogBySlug } from "@/services/blogService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 },
    );
  }
}
