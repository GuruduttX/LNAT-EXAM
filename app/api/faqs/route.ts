// app/api/faqs/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { FAQ } from "@/models/FAQ";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Build functional query block
    const filterQuery = category && category !== "all" ? { category } : {};

    // Sort by creation or custom sorting metrics if required
    const faqs = await FAQ.find(filterQuery).sort({ createdAt: 1 });

    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to request accordion blocks" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const newFaq = await FAQ.create(body);
    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    // Mongoose enum validation catches schema injection discrepancies natively
    return NextResponse.json(
      { error: "Invalid parameter or non-supported FAQ category" },
      { status: 400 },
    );
  }
}
