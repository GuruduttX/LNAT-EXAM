import { NextResponse } from "next/server";

import {
  getEnquiryById,
  updateEnquiry,
} from "@/services/enquiryService";
import { enquiryStatuses, type EnquiryStatus } from "@/types/backend.types";

interface RouteProps {
  params: Promise<{ id: string }>;
}

interface UpdateEnquiryBody {
  status?: unknown;
  internalNotes?: unknown;
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const enquiry = await getEnquiryById(id);

    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json(enquiry);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch enquiry" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = (await request.json()) as UpdateEnquiryBody;
    const status = body.status as EnquiryStatus | undefined;

    if (status && !enquiryStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid enquiry status" },
        { status: 400 },
      );
    }

    const internalNotes =
      typeof body.internalNotes === "string"
        ? body.internalNotes.trim()
        : undefined;

    const updated = await updateEnquiry(id, { status, internalNotes });

    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 400 },
    );
  }
}
