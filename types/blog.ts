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
  author: {
    name: string;
  }; 
  excerpt: string;
  meta: {
    title: string;
    description: string;
  };
  tags: string[];
  publishedAt: string;
  featuredImage: string;
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
