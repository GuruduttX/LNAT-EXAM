import { NextResponse } from "next/server";

import { getEnquiries } from "@/services/enquiryService";
import {
  enquirySources,
  enquiryStatuses,
  enquiryTypes,
  type EnquirySource,
  type EnquiryStatus,
  type EnquiryType,
} from "@/types/backend.types";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as EnquiryStatus | null;
    const enquiryType = searchParams.get("enquiryType") as EnquiryType | null;
    const source = searchParams.get("source") as EnquirySource | null;

    const enquiries = await getEnquiries({
      status: status && enquiryStatuses.includes(status) ? status : undefined,
      enquiryType:
        enquiryType && enquiryTypes.includes(enquiryType)
          ? enquiryType
          : undefined,
      source: source && enquirySources.includes(source) ? source : undefined,
    });

    return NextResponse.json({ enquiries });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 },
    );
  }
}
