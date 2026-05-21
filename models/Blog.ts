// models/Blog.ts
import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
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
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
    },
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    subContent: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    structuredData: {
      title: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    readTime: {
      type: Number,
      required: true, // Enforces that the CMS must send this value
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
