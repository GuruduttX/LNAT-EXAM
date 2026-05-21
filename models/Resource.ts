// models/Resource.ts
import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    iconName: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: Record<string, any>) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const Resource =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);
