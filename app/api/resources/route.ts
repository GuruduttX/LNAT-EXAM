import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { getResources } from "@/services/resourceService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const status =
      (searchParams.get("status") as "draft" | "published" | "all" | null) ||
      "published";

    const resources = await getResources({ status, category });

    return NextResponse.json({ resources });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newResource = await Resource.create(body);
    return NextResponse.json(newResource, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 },
    );
  }
}
