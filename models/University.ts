// models/University.ts
import mongoose, { Schema } from "mongoose";
import { lnatStatuses } from "@/types/backend.types";

// Fields tagged with this are OPTIONAL while the document is a draft and only
// become required once `status === "published"`. This lets us create/import
// drafts (e.g. via scripts/importUniversity.ts) with incomplete data — a
// missing hero image, unverified rankings, etc. — while still guaranteeing a
// complete record before it goes live.
//
// `this` is the document on .create()/.save(), which is the path used by both
// the import script and the POST /api/universities route, so publish-time
// validation is enforced there. On findByIdAndUpdate (the PUT edit route) the
// update-validator's `this` is the query, not the doc, so publish completeness
// on edits is additionally guarded client-side in the CMS form.
function requiredForPublish(this: { status?: string }): boolean {
  return this?.status === "published";
}

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

// --- NEW SUB-SCHEMAS ---

const courseSchema = new Schema(
  {
    name: { type: String, trim: true },
    ucasCode: { type: String, trim: true },
    durationYears: { type: String, trim: true },
    structure: { type: String, trim: true },
    yearAbroadNote: { type: String, trim: true },
    languageRequirementNote: { type: String, trim: true },
  },
  { _id: false },
);

const admissionsStatsSchema = new Schema(
  {
    cycleLabel: { type: String, trim: true },
    applicants: { type: String, trim: true },
    offers: { type: String, trim: true },
    interviewed: { type: String, trim: true },
    avgLnatScore: { type: String, trim: true },
    avgEssayOffer: { type: String, trim: true },
  },
  { _id: false },
);

const interviewSchema = new Schema(
  {
    answer40to60: { type: String, trim: true },
    format: { type: String, trim: true },
    whatTheyAssess: { type: String, trim: true },
    sampleThemes: [{ type: String, trim: true }],
    prepTips: [{ type: String, trim: true }],
  },
  { _id: false },
);

const collegeForLawSchema = new Schema(
  {
    name: { type: String, trim: true },
    whyForLaw: { type: String, trim: true },
    note: { type: String, trim: true },
  },
  { _id: false },
);

const conversionTableSchema = new Schema(
  {
    board: { type: String, trim: true },
    indianGrade: { type: String, trim: true },
    oxfordEquivalent: { type: String, trim: true },
    note: { type: String, trim: true },
  },
  { _id: false },
);

const scholarshipSchema = new Schema(
  {
    name: { type: String, trim: true },
    level: { type: String, trim: true },
    coverage: { type: String, trim: true },
    openToIndians: { type: Boolean, default: false },
    eligibilityNote: { type: String, trim: true },
    applyNote: { type: String, trim: true },
    sourceUrl: { type: String, trim: true },
  },
  { _id: false },
);

const timelineStepSchema = new Schema(
  {
    step: { type: String, trim: true },
    date: { type: String, trim: true },
    note: { type: String, trim: true },
  },
  { _id: false },
);

const personSchema = new Schema(
  {
    name: { type: String, trim: true },
    role: { type: String, trim: true },
    bio: { type: String, trim: true },
    credentials: { type: String, trim: true },
    photoUrl: { type: String, trim: true },
    profileUrl: { type: String, trim: true },
    sameAs: [{ type: String, trim: true }],
  },
  { _id: false },
);

const factCitationSchema = new Schema(
  {
    claim: { type: String, trim: true },
    sourceName: { type: String, trim: true },
    sourceUrl: { type: String, trim: true },
    dateVerified: { type: Date },
  },
  { _id: false },
);

// --- MAIN SCHEMA ---

const universitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
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
      required: requiredForPublish,
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
      required: requiredForPublish,
    },
    cardImage: {
      type: mediaAssetSchema,
    },
    country: {
      type: String,
      required: requiredForPublish,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    // SEO & Schema
    metaTitle: { type: String },
    metaDescription: { type: String },
    schemaTitle: { type: String },
    schemaDescription: { type: String },
    schemaType: {
      type: String,
      enum: ["CollegeOrUniversity", "EducationalOrganization"],
      default: "CollegeOrUniversity",
    },
    schemaFlags: {
      emitFAQPage: { type: Boolean, default: false },
      emitCourseSchema: { type: Boolean, default: false },
      hasGenuineOnPageReviews: { type: Boolean, default: false },
    },
    llmsSummary: { type: String, trim: true },

    established: {
      type: String,
      required: requiredForPublish,
      trim: true,
    },
    lnatRequirement: {
      type: String,
      required: requiredForPublish,
      enum: lnatStatuses,
      index: true,
    },
    shortDescription: {
      type: String,
      required: requiredForPublish,
      trim: true,
    },
    excerpt40to60: {
      type: String,
      trim: true,
    },
    overview: {
      type: String,
      required: requiredForPublish,
    },
    globalRanking: {
      type: String,
      required: requiredForPublish,
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
      required: requiredForPublish,
      trim: true,
    },
    applicationDeadline: {
      type: String,
      required: requiredForPublish,
      trim: true,
    },
    acceptanceRate: {
      type: String,
      required: requiredForPublish,
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

    // UI & Content Blocks
    hero: {
      eyebrow: { type: String, trim: true },
      headline: { type: String, trim: true },
      subheadline: { type: String, trim: true },
      primaryCTA: ctaSchema,
      secondaryCTA: ctaSchema,
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

    // Academics & Admissions
    courses: [courseSchema],
    admissionsStats: admissionsStatsSchema,
    interview: interviewSchema,

    collegesForLaw: [collegeForLawSchema],
    bestCollegesForLawSummary: { type: String, trim: true },

    // India Localization
    indianEligibility: {
      answer40to60: { type: String, trim: true },
      acceptedBoards: [{ type: String, trim: true }],
      stateBoardAccepted: { type: Boolean, default: false },
      niosAccepted: { type: Boolean, default: false },
      conversionTable: [conversionTableSchema],
      predictedGradesNote: { type: String, trim: true },
    },
    feesForIndians: {
      answer40to60: { type: String, trim: true },
      tuitionGBPPerYear: { type: String, trim: true },
      tuitionINRPerYear: { type: String, trim: true },
      livingCostGBPPerMonth: { type: String, trim: true },
      totalEstimateINR: { type: String, trim: true },
      fxRateNote: { type: String, trim: true },
    },
    scholarships: [scholarshipSchema],
    testCentresInIndia: {
      answer40to60: { type: String, trim: true },
      cities: [{ type: String, trim: true }],
      bookingNote: { type: String, trim: true },
      deadlineISTNote: { type: String, trim: true },
      sourceUrl: { type: String, trim: true },
    },

    applicationTimeline: [timelineStepSchema],

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
      sqeRouteNote: { type: String, trim: true },
      bciRecognitionNote: { type: String, trim: true },
      indiaReturnPathNote: { type: String, trim: true },
      ukPracticeNote: { type: String, trim: true },
    },

    // Funnel & Linking
    moneyFunnel: {
      primaryMoneyCTA: ctaSchema,
      courseCTA: ctaSchema,
      leadMagnet: { type: String, trim: true },
      moneyAnchorVariants: [{ type: String, trim: true }],
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

    // Governance & E-E-A-T
    sourceReferences: [sourceReferenceSchema],
    factCitations: [factCitationSchema],
    author: personSchema,
    mentors: [personSchema],
    reviewedBy: {
      name: { type: String, trim: true },
      role: { type: String, trim: true },
      profileUrl: { type: String, trim: true },
    },
    lastFactCheckedAt: {
      type: Date,
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
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
          ret.id = ret._id.toString();
        }
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const University =
  mongoose.models.University || mongoose.model("University", universitySchema);
