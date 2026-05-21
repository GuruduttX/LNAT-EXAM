import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { FAQ } from "@/models/FAQ";

// GET: Fetch a single FAQ for the Edit Page
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params; // Unwrap the params Promise

    const faq = await FAQ.findById(id);

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
  }
}

// PUT: Update the FAQ when submitting the Edit Form
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = await params; // Unwrap the params Promise

    const updatedFaq = await FAQ.findByIdAndUpdate(
      id,
      body,
      // new: true returns the updated document, runValidators ensures enum constraints are respected
      { new: true, runValidators: true },
    );

    if (!updatedFaq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFaq);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 },
    );
  }
}

// DELETE: Handle deletion from the Archive Page table
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params; // Unwrap the params Promise

    const deletedFaq = await FAQ.findByIdAndDelete(id);

    if (!deletedFaq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 },
    );
  }
}
