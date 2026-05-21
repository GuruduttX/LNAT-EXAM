import BlogArchive from "@/components/BlogArchive/BlogArchive";
import BlogArchiveHero from "@/components/BlogArchive/blogArchiveHero";
import FinalCTA from "@/components/Home/FinalCTA";

const page = () => {
  return (
    <div>
      <BlogArchiveHero />
      <BlogArchive />
      <FinalCTA />
    </div>
  );
};

export default page;
