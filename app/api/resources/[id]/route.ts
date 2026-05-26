import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { getResourceById } from "@/services/resourceService";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const resource = await getResourceById(id);

    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json(resource);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await Resource.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Resource.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 },
    );
  }
}
