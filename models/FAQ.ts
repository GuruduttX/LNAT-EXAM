// models/FAQ.ts
import mongoose, { Schema } from "mongoose";
import { faqCategories } from "@/types/backend.types";

const faqSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: faqCategories, // Strictly enforces your UI categories
      index: true, // Critical for fast database filtering when users click a category tab
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    sourceUrl: { type: String, trim: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
    // This ensures that when you fetch the document and convert it to JSON,
    // Mongoose automatically maps the database '_id' to your frontend 'id' requirement.
    toJSON: {
      virtuals: true,
      transform: function (
        doc: unknown,
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

export const FAQ = mongoose.models.FAQ || mongoose.model("FAQ", faqSchema);
