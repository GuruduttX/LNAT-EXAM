export type BlogCategory =
  | "All"
  | "LNAT Preparation"
  | "Essay Writing"
  | "University Guides"
  | "Admissions Process"
  | "UCAS Guidance";

export interface Blog {
  title: string;
  category: string;
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
