import mongoose, { Schema } from "mongoose";
import {
  enquirySources,
  enquiryStatuses,
  enquiryTypes,
} from "@/types/backend.types";

const enquiryResourceSchema = new Schema(
  {
    id: { type: String, trim: true },
    slug: { type: String, trim: true },
    title: { type: String, trim: true },
    category: { type: String, trim: true },
    fileUrl: { type: String, trim: true },
  },
  { _id: false },
);

const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      trim: true,
    },
    enquiryType: {
      type: String,
      required: true,
      enum: enquiryTypes,
      default: "general",
      index: true,
    },
    source: {
      type: String,
      required: true,
      enum: enquirySources,
      index: true,
    },
    resource: {
      type: enquiryResourceSchema,
    },
    status: {
      type: String,
      required: true,
      enum: enquiryStatuses,
      default: "new",
      index: true,
    },
    internalNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (
        _doc: unknown,
        ret: Record<string, unknown> & {
          _id?: { toString(): string };
          __v?: unknown;
        },
      ) {
        if (ret._id) {
          ret.id = ret._id.toString();
        }
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

enquirySchema.index({ createdAt: -1 });

export const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
