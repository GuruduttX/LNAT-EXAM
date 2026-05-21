// types/backend.types.ts
export interface IBlog {
  _id: string;
  title: string;
  category: string;
  excerpt: string,
  slug: string;
  author: string;
  meta: {
    title: string;
    description: string;
  };
  image: string;
  alt: string;
  subContent: string;
  content: string;
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

export interface IUniversity {
  name: string;
  location: string;
  image: string; // URL for the hero/card image
  country: string;
  established: string;
  lnatRequirement: LNATStatus;
  shortDescription: string;
  
  // Individual Page Fields
  overview: string; // HTML string from rich text editor
  globalRanking: string;
  tuitionFee: string;
  applicationDeadline: string;
  acceptanceRate: string;
  
  createdAt?: Date;
  updatedAt?: Date;
}

// types/backend.types.ts

export interface IResource {
  title: string;
  category: string;
  description: string;
  iconName: string; // Stored as a string (e.g., "FileText")
  fileUrl: string;  // The Cloudinary URL for the PDF
  createdAt?: Date;
  updatedAt?: Date;
}