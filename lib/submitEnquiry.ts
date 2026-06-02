import type { EnquirySource, EnquiryType } from "@/types/backend.types";

interface SubmitEnquiryInput {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  enquiryType: EnquiryType;
  source: EnquirySource;
  resource?: {
    id?: string;
    slug?: string;
    title?: string;
    category?: string;
    fileUrl?: string;
  };
}

export async function submitEnquiry(input: SubmitEnquiryInput) {
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error || "Unable to submit enquiry");
  }

  return response.json() as Promise<{ success: true; enquiryId: string }>;
}
