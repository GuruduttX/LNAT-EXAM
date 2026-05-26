import { NextResponse } from "next/server";

import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/categoryService";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateCategory(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const deleted = await deleteCategory(id);

    if (!deleted) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
