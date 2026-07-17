"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { adminFetch } from "@/lib/adminApiClient";

interface ICategoryListItem {
  _id: string;
  name: string;
  slug: string;
  primaryKeyword: string;
  status: "draft" | "published";
  updatedAt?: string;
}

const getStatusBadgeClass = (status: "draft" | "published") =>
  status === "published"
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : "bg-amber-500/10 text-amber-300 border-amber-500/20";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategoryListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await adminFetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      startTransition(() => {
        setCategories(data.categories || []);
      });
    } catch {
      toast.error("Error loading categories");
    } finally {
      startTransition(() => {
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    void fetchCategories();
  }, []);

  const deleteCategory = async (id: string) => {
    if (!window.confirm("Delete this category?")) {
      return;
    }

    try {
      const response = await adminFetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setCategories((prev) => prev.filter((category) => category._id !== id));
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const filteredCategories = categories.filter((category) => {
    const query = search.toLowerCase();
    return (
      category.name.toLowerCase().includes(query) ||
      category.slug.toLowerCase().includes(query) ||
      category.primaryKeyword.toLowerCase().includes(query)
    );
  });

  return (
    <div className="animate-in fade-in duration-500 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#FDFBF7]">Categories</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage topic hubs for universities, blogs, and other content clusters.
          </p>
        </div>

        <Link
          href="/admin/categories/create"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#C4A47C]/30 bg-[#C4A47C]/10 px-5 py-2.5 text-sm font-medium text-[#C4A47C] transition-colors hover:bg-[#C4A47C]/20"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          placeholder="Search categories..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-md border border-slate-800 bg-[#0B1221] py-2.5 pl-9 pr-4 text-sm text-[#FDFBF7] outline-none transition-colors focus:border-slate-600"
        />
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-800 bg-[#0B1221] py-20 text-center text-slate-500">
          Loading categories...
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#0B1221] py-20 text-center text-slate-500">
          No categories found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0B1221]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Primary Keyword</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Updated</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[#FDFBF7]">
                {filteredCategories.map((category) => (
                  <tr
                    key={category._id}
                    className="transition-colors hover:bg-slate-800/20"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium">{category.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{category.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {category.primaryKeyword}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs ${getStatusBadgeClass(
                          category.status,
                        )}`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {category.updatedAt
                        ? new Date(category.updatedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/categories/edit/${category._id}`}
                          className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-[#C4A47C]"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => void deleteCategory(category._id)}
                          className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
