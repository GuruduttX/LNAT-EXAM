import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Blog } from "@/models/Blog";
import { FAQ } from "@/models/FAQ";
import { Resource } from "@/models/Resource";
import { University } from "@/models/University";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  try {
    await connectDB();

    const [
      universityCount,
      blogCount,
      faqCount,
      resourceCount,
      draftUniversityCount,
      draftBlogCount,
      draftFaqCount,
      draftResourceCount,
    ] = await Promise.all([
      University.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "published" }),
      FAQ.countDocuments({
        $or: [{ status: "published" }, { status: { $exists: false } }],
      }),
      Resource.countDocuments({ status: "published" }),
      University.countDocuments({ status: "draft" }),
      Blog.countDocuments({ status: "draft" }),
      FAQ.countDocuments({ status: "draft" }),
      Resource.countDocuments({ status: "draft" }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        universityCount,
        blogCount,
        faqCount,
        resourceCount,
        draftUniversityCount,
        draftBlogCount,
        draftFaqCount,
        draftResourceCount,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch dashboard data";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
