// models/Blog.ts
import mongoose, { Schema } from "mongoose";

const heroImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
    caption: { type: String, trim: true },
    credit: { type: String, trim: true },
    width: { type: Number },
    height: { type: Number },
    category: {
      type: String,
      enum: ["hero", "campus", "city", "student-life", "academic", "og"],
    },
  },
  { _id: false },
);

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false },
);

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
    primaryCategorySlug: {
      type: String,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    tldr: {
      type: String,
      trim: true,
    },
    keyTakeaways: [{ type: String, trim: true }],
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    author: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      role: {
        type: String,
        trim: true,
      },
    },
    reviewedBy: {
      name: {
        type: String,
        trim: true,
      },
      role: {
        type: String,
        trim: true,
      },
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
    heroImage: {
      type: heroImageSchema,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    faqs: [faqSchema],
    sources: [{ type: String, trim: true }],
    relatedPostSlugs: [{ type: String, trim: true }],
    isCornerstone: {
      type: Boolean,
      default: false,
    },
    freshnessReviewDue: {
      type: Date,
    },
    wordCountTarget: {
      type: Number,
      min: 0,
    },
    wordCount: {
      type: Number,
      min: 0,
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
    publishedAt: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
