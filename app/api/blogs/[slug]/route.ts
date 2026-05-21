// app/api/blogs/[slug]/route.ts
import { NextResponse } from "next/server";
import { getBlogBySlug } from "@/services/blogService";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const blog = await getBlogBySlug(params.slug);
    if (!blog)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 },
    );
  }
}
