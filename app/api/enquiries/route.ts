import { NextResponse } from "next/server";

import { createEnquiry } from "@/services/enquiryService";
import {
  enquirySources,
  enquiryTypes,
  type EnquirySource,
  type EnquiryType,
} from "@/types/backend.types";

interface CreateEnquiryBody {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  enquiryType?: unknown;
  source?: unknown;
  resource?: {
    id?: unknown;
    slug?: unknown;
    title?: unknown;
    category?: unknown;
    fileUrl?: unknown;
  };
}

function cleanOptionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateEnquiryBody;
    const name = cleanOptionalText(body.name);
    const phone = cleanOptionalText(body.phone);
    const email = cleanOptionalText(body.email);
    const enquiryType = body.enquiryType as EnquiryType;
    const source = body.source as EnquirySource;

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: "Name and at least one contact method are required" },
        { status: 400 },
      );
    }

    if (!enquiryTypes.includes(enquiryType)) {
      return NextResponse.json(
        { error: "Invalid enquiry type" },
        { status: 400 },
      );
    }

    if (!enquirySources.includes(source)) {
      return NextResponse.json(
        { error: "Invalid enquiry source" },
        { status: 400 },
      );
    }

    const resource =
      enquiryType === "resource-download"
        ? {
            id: cleanOptionalText(body.resource?.id),
            slug: cleanOptionalText(body.resource?.slug),
            title: cleanOptionalText(body.resource?.title),
            category: cleanOptionalText(body.resource?.category),
            fileUrl: cleanOptionalText(body.resource?.fileUrl),
          }
        : undefined;

    if (enquiryType === "resource-download" && !resource?.title) {
      return NextResponse.json(
        { error: "Resource details are required for a download enquiry" },
        { status: 400 },
      );
    }

    const enquiry = await createEnquiry({
      name,
      phone,
      email,
      message: cleanOptionalText(body.message),
      enquiryType,
      source,
      resource,
    });

    return NextResponse.json(
      { success: true, enquiryId: enquiry.id },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 },
    );
  }
}
