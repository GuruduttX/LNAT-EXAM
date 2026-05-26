import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema(
  {
    title: {
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
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    iconName: {
      type: String,
      trim: true,
      default: "FileText",
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    filePublicId: {
      type: String,
      trim: true,
    },
    fileFormat: {
      type: String,
      trim: true,
    },
    fileBytes: {
      type: Number,
      min: 0,
    },
    downloadLabel: {
      type: String,
      trim: true,
      default: "Download PDF",
    },
    tags: [{ type: String, trim: true }],
    relatedBlogSlugs: [{ type: String, trim: true }],
    relatedUniversitySlugs: [{ type: String, trim: true }],
    relatedCategorySlugs: [{ type: String, trim: true }],
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
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

export const Resource =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);
