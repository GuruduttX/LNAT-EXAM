import { notFound } from "next/navigation";
import BlogDetailsHero from "@/components/blog/BlogDetailsHero";
import BlogContentLayout from "@/components/blog/BlogContentLayout";
import { blogs } from "@/data/blogs";

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] ">
      <BlogDetailsHero blog={blog} />

      <BlogContentLayout blog={blog} />
    </main>
  );
}
