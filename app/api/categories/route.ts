import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Category } from "@/models/Category";
import { getCategories } from "@/services/categoryService";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid category data" },
      { status: 400 },
    );
  }
}
