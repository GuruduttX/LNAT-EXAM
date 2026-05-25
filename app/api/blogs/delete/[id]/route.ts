// app/api/blogs/[id]/route.ts (example setup if you haven't built it yet)
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
