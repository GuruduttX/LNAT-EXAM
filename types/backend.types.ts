// types/backend.types.ts
export interface IBlog {
  _id: string;
  title: string;
  category: string;
  primaryCategorySlug?: string;
  excerpt: string;
  tldr?: string;
  keyTakeaways?: string[];
  slug: string;
  author: {
    name: string;
    role?: string;
  };
  reviewedBy?: {
    name: string;
    role?: string;
  };
  meta: {
    title: string;
    description: string;
  };
  image: string;
  heroImage?: IMediaAsset;
  publishedAt: string;
  featuredImage: string;
  tags: string[];
  alt: string;
  content: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
  sources?: string[];
  relatedPostSlugs?: string[];
  isCornerstone?: boolean;
  freshnessReviewDue?: string;
  wordCountTarget?: number;
  wordCount?: number;
  structuredData?: {
    title?: string;
    description?: string;
  };
  status: "draft" | "published";
  readTime: number; // Provided directly by the CMS
  createdAt?: Date;
  updatedAt?: Date;
}


// types/backend.types.ts

export const faqCategories = [
  "Admissions Process",
  "LNAT Preparation",
  "University Specifics",
  "Logistics & Scoring",
] as const;

export type FAQCategory = typeof faqCategories[number];

export interface IFAQ {
  // Mongoose automatically generates _id, which you can map to 'id' on the frontend
  category: FAQCategory;
  question: string;
  answer: string; // This can store HTML if your CMS uses a rich text editor for links/formatting
  createdAt?: Date;
  updatedAt?: Date;
}


// types/backend.types.ts

// Adjust these based on your exact UI dropdown/filter needs
export const lnatStatuses = ["Required", "Not Required", "Optional"] as const;
export type LNATStatus = typeof lnatStatuses[number];

export interface IMediaAsset {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  category?:
    | "hero"
    | "campus"
    | "city"
    | "student-life"
    | "academic"
    | "og";
}

export interface IStatItem {
  label: string;
  value: string;
  note?: string;
}

export interface IFeatureBlock {
  title: string;
  description: string;
  iconName?: string;
}

export interface ICTA {
  label: string;
  href: string;
  type?: "primary" | "secondary";
}

export interface IUniversityFAQ {
  question: string;
  answer: string;
}

export interface ITestimonial {
  name: string;
  course?: string;
  quote: string;
  outcome?: string;
  consentVerified?: boolean;
}

export interface IRelatedLink {
  label: string;
  href: string;
}

export interface ISourceReference {
  label: string;
  url: string;
  type?: "official" | "ranking" | "news" | "internal";
}

export interface IFamousAlumnus {
  name: string;
  designation: string;
}

export interface IUniversity {
  name: string;
  shortName?: string;
  slug: string;
  primaryCategorySlug?: string;
  relatedCategorySlugs?: string[];
  location: string;
  locationLabel?: string;
  city?: string;
  region?: string;
  image: string; // Legacy URL for the hero/card image / archive card
  cardImage?: IMediaAsset;
  country: string;
  established: string;
  lnatRequirement: LNATStatus;
  shortDescription: string;
  excerpt40to60?: string;

  // SEO / schema
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  schemaTitle?: string;
  schemaDescription?: string;
  schemaType?: "CollegeOrUniversity" | "EducationalOrganization";
  sameAs?: string[];

  // Hero / premium storytelling
  hero?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    primaryCTA?: ICTA;
    secondaryCTA?: ICTA;
    heroStats?: IStatItem[];
    carouselImages?: IMediaAsset[];
  };

  gallery?: {
    campusImages?: IMediaAsset[];
    cityLifeImages?: IMediaAsset[];
    studentLifeImages?: IMediaAsset[];
    academicImages?: IMediaAsset[];
  };

  // Individual Page Fields
  overview: string; // HTML string from rich text editor
  globalRanking: string;
  nationalRanking?: string;
  lawSchoolRanking?: string;
  tuitionFee: string;
  applicationDeadline: string;
  acceptanceRate: string;
  courseDuration?: string;
  intake?: string;
  officialWebsite?: string;

  directAnswers?: {
    whatIsSpecial?: string;
    whyStudyLawHere?: string;
    doesItRequireLNAT?: string;
    whatKindOfStudentFits?: string;
  };

  whyBestSummary?: string;
  whyChooseThisUniversity?: IFeatureBlock[];

  strengths?: {
    academicStrengths?: IFeatureBlock[];
    facultyHighlights?: IFeatureBlock[];
    teachingStyle?: string;
    notableFacilities?: IFeatureBlock[];
    standoutPrograms?: string[];
  };

  cityLife?: {
    cityOverview?: string;
    whyStudentsLoveTheCity?: IFeatureBlock[];
    neighbourhoodHighlights?: IFeatureBlock[];
    transportAndConnectivity?: string;
    cultureAndLifestyle?: string;
    safetyAndPracticality?: string;
    costOfLiving?: string;
  };

  studentExperience?: {
    campusAtmosphere?: string;
    societiesAndClubs?: string;
    accommodation?: string;
    internationalStudentSupport?: string;
    lifeOutsideClassroom?: string;
  };

  admissions?: {
    overview?: string;
    howLNATIsUsed?: string;
    targetLNATScore?: string;
    essayPolicy?: string;
    applicationTips?: string[];
    requiredQualifications?: string;
    deadlinesNotes?: string;
    interviewRequired?: boolean;
    essayConsidered?: boolean;
  };

  careers?: {
    employabilityOverview?: string;
    topRecruiters?: string[];
    alumniOutcomes?: string;
    internshipsAndPlacements?: string;
    reputationForLaw?: string;
  };

  famousAlumni?: IFamousAlumnus[];
  testimonials?: ITestimonial[];
  notableAlumni?: string[];
  awardsAndRecognition?: string[];
  faqs?: IUniversityFAQ[];
  relatedBlogs?: string[];
  relatedResources?: string[];
  relatedUniversities?: string[];
  comparisonLinks?: IRelatedLink[];
  sourceReferences?: ISourceReference[];
  lastFactCheckedAt?: Date;
  reviewedBy?: {
    name: string;
    role?: string;
    profileUrl?: string;
  };
  featured?: boolean;
  sortOrder?: number;
  status?: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}

export type CategoryPostOrder = "curated" | "recent" | "popular";

export interface ICategorySubtopic {
  title: string;
  description?: string;
  postSlugs?: string[];
  universitySlugs?: string[];
}

export interface ICategory {
  name: string;
  slug: string;
  primaryKeyword: string;
  intro: string;
  topicDefinition: string;
  parentCategorySlug?: string;
  heroImage?: IMediaAsset;
  metaTitle: string;
  metaDescription: string;
  featuredPostSlugs?: string[];
  featuredUniversitySlugs?: string[];
  subtopics?: ICategorySubtopic[];
  faqs?: IUniversityFAQ[];
  relatedCategorySlugs?: string[];
  cta?: ICTA;
  isIndexed: boolean;
  minPostsToIndex: number;
  postOrder: CategoryPostOrder;
  status: "draft" | "published";
  lastUpdated?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// types/backend.types.ts

export interface IResource {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  primaryCategorySlug?: string;
  shortDescription: string;
  description: string;
  iconName?: string;
  fileUrl: string;
  filePublicId?: string;
  fileFormat?: string;
  fileBytes?: number;
  downloadLabel?: string;
  tags?: string[];
  relatedBlogSlugs?: string[];
  relatedUniversitySlugs?: string[];
  relatedCategorySlugs?: string[];
  metaTitle?: string;
  metaDescription?: string;
  status: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}
