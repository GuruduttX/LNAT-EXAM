import mongoose, { Schema } from "mongoose";

const mediaAssetSchema = new Schema(
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

const ctaSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    type: { type: String, enum: ["primary", "secondary"] },
  },
  { _id: false },
);

const subtopicSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    postSlugs: [{ type: String, trim: true }],
    universitySlugs: [{ type: String, trim: true }],
  },
  { _id: false },
);

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    primaryKeyword: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    intro: {
      type: String,
      required: true,
    },
    topicDefinition: {
      type: String,
      required: true,
      trim: true,
    },
    parentCategorySlug: {
      type: String,
      trim: true,
    },
    heroImage: {
      type: mediaAssetSchema,
    },
    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
    },
    featuredPostSlugs: [{ type: String, trim: true }],
    featuredUniversitySlugs: [{ type: String, trim: true }],
    subtopics: [subtopicSchema],
    faqs: [faqSchema],
    relatedCategorySlugs: [{ type: String, trim: true }],
    cta: ctaSchema,
    postOrder: {
      type: String,
      required: true,
      enum: ["curated", "recent", "popular"],
      default: "curated",
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    lastUpdated: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
