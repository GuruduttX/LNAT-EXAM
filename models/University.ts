// models/University.ts
import mongoose, { Schema } from "mongoose";
import { lnatStatuses } from "@/types/backend.types";

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

const statItemSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    note: { type: String, trim: true },
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

const featureBlockSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    iconName: { type: String, trim: true },
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

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    course: { type: String, trim: true },
    quote: { type: String, required: true, trim: true },
    outcome: { type: String, trim: true },
    consentVerified: { type: Boolean, default: false },
  },
  { _id: false },
);

const relatedLinkSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const sourceReferenceSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["official", "ranking", "news", "internal"],
      default: "official",
    },
  },
  { _id: false },
);

const famousAlumnusSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const universitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, // Indexed for quick search queries
    },
    shortName: {
      type: String,
      trim: true,
    },
    primaryCategorySlug: {
      type: String,
      trim: true,
      index: true,
    },
    relatedCategorySlugs: [{ type: String, trim: true }],
    location: {
      type: String,
      required: true,
      trim: true,
    },
    locationLabel: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      index: true,
    },
    region: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    cardImage: {
      type: mediaAssetSchema,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      index: true, // Indexed for fast filtering by country
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    metaTitle: { type: String },
    metaDescription: { type: String },
    canonicalUrl: { type: String, trim: true },
    focusKeyword: { type: String, trim: true },
    secondaryKeywords: [{ type: String, trim: true }],

    schemaTitle: { type: String },
    schemaDescription: { type: String },
    schemaType: {
      type: String,
      enum: ["CollegeOrUniversity", "EducationalOrganization"],
      default: "CollegeOrUniversity",
    },
    sameAs: [{ type: String, trim: true }],
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
    excerpt40to60: {
      type: String,
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
    nationalRanking: {
      type: String,
      trim: true,
    },
    lawSchoolRanking: {
      type: String,
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
    courseDuration: {
      type: String,
      trim: true,
    },
    intake: {
      type: String,
      trim: true,
    },
    officialWebsite: {
      type: String,
      trim: true,
    },
    hero: {
      eyebrow: { type: String, trim: true },
      headline: { type: String, trim: true },
      subheadline: { type: String, trim: true },
      primaryCTA: ctaSchema,
      secondaryCTA: ctaSchema,
      heroStats: [statItemSchema],
      carouselImages: [mediaAssetSchema],
    },
    gallery: {
      campusImages: [mediaAssetSchema],
      cityLifeImages: [mediaAssetSchema],
      studentLifeImages: [mediaAssetSchema],
      academicImages: [mediaAssetSchema],
    },
    directAnswers: {
      whatIsSpecial: { type: String, trim: true },
      whyStudyLawHere: { type: String, trim: true },
      doesItRequireLNAT: { type: String, trim: true },
      whatKindOfStudentFits: { type: String, trim: true },
    },
    whyBestSummary: {
      type: String,
      trim: true,
    },
    whyChooseThisUniversity: [featureBlockSchema],
    strengths: {
      academicStrengths: [featureBlockSchema],
      facultyHighlights: [featureBlockSchema],
      teachingStyle: { type: String, trim: true },
      notableFacilities: [featureBlockSchema],
      standoutPrograms: [{ type: String, trim: true }],
    },
    cityLife: {
      cityOverview: { type: String, trim: true },
      whyStudentsLoveTheCity: [featureBlockSchema],
      neighbourhoodHighlights: [featureBlockSchema],
      transportAndConnectivity: { type: String, trim: true },
      cultureAndLifestyle: { type: String, trim: true },
      safetyAndPracticality: { type: String, trim: true },
      costOfLiving: { type: String, trim: true },
    },
    studentExperience: {
      campusAtmosphere: { type: String, trim: true },
      societiesAndClubs: { type: String, trim: true },
      accommodation: { type: String, trim: true },
      internationalStudentSupport: { type: String, trim: true },
      lifeOutsideClassroom: { type: String, trim: true },
    },
    admissions: {
      overview: { type: String, trim: true },
      howLNATIsUsed: { type: String, trim: true },
      targetLNATScore: { type: String, trim: true },
      essayPolicy: { type: String, trim: true },
      applicationTips: [{ type: String, trim: true }],
      requiredQualifications: { type: String, trim: true },
      deadlinesNotes: { type: String, trim: true },
      interviewRequired: { type: Boolean, default: false },
      essayConsidered: { type: Boolean, default: false },
    },
    careers: {
      employabilityOverview: { type: String, trim: true },
      topRecruiters: [{ type: String, trim: true }],
      alumniOutcomes: { type: String, trim: true },
      internshipsAndPlacements: { type: String, trim: true },
      reputationForLaw: { type: String, trim: true },
    },
    famousAlumni: [famousAlumnusSchema],
    notableAlumni: [{ type: String, trim: true }],
    awardsAndRecognition: [{ type: String, trim: true }],
    testimonials: [testimonialSchema],
    faqs: [faqSchema],
    relatedBlogs: [{ type: String, trim: true }],
    relatedResources: [{ type: String, trim: true }],
    relatedUniversities: [{ type: String, trim: true }],
    comparisonLinks: [relatedLinkSchema],
    sourceReferences: [sourceReferenceSchema],
    lastFactCheckedAt: {
      type: Date,
    },
    reviewedBy: {
      name: { type: String, trim: true },
      role: { type: String, trim: true },
      profileUrl: { type: String, trim: true },
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
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
        doc: unknown,
        ret: Record<string, unknown> & {
          _id?: { toString(): string };
          __v?: unknown;
        },
      ) {
        if (ret._id) {
          ret.id = ret._id.toString(); // Maps _id to id for the frontend
        }
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const University =
  mongoose.models.University || mongoose.model("University", universitySchema);
