// app/api/resources/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query = category ? { category } : {};

    // Sort by newest first
    const resources = await Resource.find(query).sort({ createdAt: -1 });

    return NextResponse.json(resources);
  } catch (error) {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 },
    );
  }
}
