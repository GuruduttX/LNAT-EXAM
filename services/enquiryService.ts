import connectDB from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";
import type {
  EnquirySource,
  EnquiryStatus,
  EnquiryType,
  IEnquiry,
} from "@/types/backend.types";

interface GetEnquiriesParams {
  status?: EnquiryStatus;
  enquiryType?: EnquiryType;
  source?: EnquirySource;
}

export type CreateEnquiryInput = Omit<
  IEnquiry,
  "_id" | "id" | "status" | "internalNotes" | "createdAt" | "updatedAt"
>;

export async function getEnquiries({
  status,
  enquiryType,
  source,
}: GetEnquiriesParams = {}) {
  await connectDB();

  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  if (enquiryType) query.enquiryType = enquiryType;
  if (source) query.source = source;

  return Enquiry.find(query).sort({ createdAt: -1 }).lean();
}

export async function getEnquiryById(id: string) {
  await connectDB();
  return Enquiry.findById(id);
}

export async function createEnquiry(data: CreateEnquiryInput) {
  await connectDB();
  return Enquiry.create(data);
}

export async function updateEnquiry(
  id: string,
  data: Pick<Partial<IEnquiry>, "status" | "internalNotes">,
) {
  await connectDB();
  return Enquiry.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}
