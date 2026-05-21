// models/University.ts
import mongoose, { Schema } from "mongoose";
import { lnatStatuses } from "@/types/backend.types";

const universitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, // Indexed for quick search queries
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      index: true, // Indexed for fast filtering by country
    },
    established: {
      type: String,
      required: true,
      trim: true,
    },
    lnatRequirement: {
      type: String,
      required: true,
      enum: lnatStatuses, // Restricts values to exactly what your frontend expects
      index: true, // Indexed for fast filtering by LNAT requirement
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    overview: {
      type: String,
      required: true,
    },
    globalRanking: {
      type: String,
      required: true,
      trim: true,
    },
    tuitionFee: {
      type: String,
      required: true,
      trim: true,
    },
    applicationDeadline: {
      type: String,
      required: true,
      trim: true,
    },
    acceptanceRate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: Record<string, any>) {
        ret.id = ret._id.toString(); // Maps _id to id for the frontend
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const University =
  mongoose.models.University || mongoose.model("University", universitySchema);