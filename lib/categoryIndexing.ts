interface CategoryIndexingInput {
  isIndexed?: boolean;
  minPostsToIndex?: number;
  featuredPostSlugs?: string[];
  subtopics?: Array<{
    postSlugs?: string[];
  }>;
}

export function getCategoryPostSlugs(category: CategoryIndexingInput) {
  return Array.from(
    new Set([
      ...(category.featuredPostSlugs || []),
      ...(category.subtopics || []).flatMap(
        (subtopic) => subtopic.postSlugs || [],
      ),
    ]),
  ).filter(Boolean);
}

export function shouldIndexCategory(
  category: CategoryIndexingInput,
  publishedPostCount: number,
) {
  const minPostsToIndex =
    typeof category.minPostsToIndex === "number" && category.minPostsToIndex > 0
      ? category.minPostsToIndex
      : 4;

  return category.isIndexed === true && publishedPostCount >= minPostsToIndex;
}
