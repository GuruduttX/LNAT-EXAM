// app/api/blogs/[id]/route.ts (example setup if you haven't built it yet)
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Blog.findByIdAndDelete(id);

    if (deleted) {
      revalidatePath("/blog");
      revalidatePath("/");
      revalidatePath(`/blog/${deleted.slug}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
