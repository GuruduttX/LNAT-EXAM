import connectDB from "@/lib/db";
import { Category } from "@/models/Category";
import { ICategory } from "@/types/backend.types";

export async function getCategories() {
  await connectDB();
  return Category.find().sort({ updatedAt: -1 }).lean();
}

export async function getPublishedCategories() {
  await connectDB();
  return Category.find({ status: "published" })
    .sort({ updatedAt: -1, name: 1 })
    .lean();
}

export async function getPublishedCategorySlugs() {
  await connectDB();
  const categories = await Category.find({ status: "published" })
    .select("slug")
    .lean();

  return categories.map((category) => category.slug).filter(Boolean);
}

export async function getCategoryById(id: string) {
  await connectDB();
  return Category.findById(id);
}

export async function getCategoryBySlug(slug: string) {
  await connectDB();
  return Category.findOne({ slug });
}

export async function createCategory(data: ICategory) {
  await connectDB();
  return Category.create(data);
}

export async function updateCategory(id: string, data: Partial<ICategory>) {
  await connectDB();
  return Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteCategory(id: string) {
  await connectDB();
  return Category.findByIdAndDelete(id);
}
