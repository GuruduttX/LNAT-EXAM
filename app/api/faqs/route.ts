// app/api/faqs/route.ts
import { NextResponse } from "next/server";
import { FAQ } from "@/models/FAQ";
import connectDB from "@/lib/db";
import { getFAQs } from "@/services/faqService";
import { faqCategories } from "@/types/backend.types";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const normalizedStatus =
      status === "draft" || status === "published" || status === "all"
        ? status
        : "published";

    if (normalizedStatus !== "published") {
      const authError = requireAdminRequest(request);
      if (authError) return authError;
    }

    const faqs = await getFAQs({
      category: category || undefined,
      status: normalizedStatus,
    });

    return NextResponse.json(faqs);
  } catch {
    return NextResponse.json(
      { error: "Unable to request accordion blocks" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  try {
    await connectDB();
    const body = await request.json();

    if (
      typeof body.category !== "string" ||
      !faqCategories.some((category) => category === body.category)
    ) {
      return NextResponse.json(
        {
          error: "Invalid FAQ category",
          allowedCategories: faqCategories,
        },
        { status: 400 },
      );
    }

    const newFaq = await FAQ.create(body);
    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to save FAQ",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
