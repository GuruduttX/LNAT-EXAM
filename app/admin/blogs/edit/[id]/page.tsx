import { notFound } from "next/navigation";

import BlogForm from "@/components/Admin/Blog/BlogForm";
import { getBlogById } from "@/services/blogService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  const blogDocument = await getBlogById(id);

  if (!blogDocument) {
    notFound();
  }

  const blog = JSON.parse(JSON.stringify(blogDocument));

  return <BlogForm mode="edit" initialData={blog} />;
}
