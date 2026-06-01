"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Trash2,
  Edit,
  LayoutGrid,
  List,
  AlertTriangle,
  Clock,
  User,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import { IBlog } from "@/types/backend.types";

export default function BlogArchivePage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filtering States
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "published"
  >("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null as string | null,
    title: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs?limit=50&status=all");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      startTransition(() => {
        setBlogs(data.blogs || []);
      });
    } catch {
      toast.error("Error loading blogs");
    } finally {
      startTransition(() => {
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    void fetchBlogs();
  }, []);

  const executeDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/blogs/admin/${deleteModal.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setBlogs((prev) => prev.filter((b) => b._id !== deleteModal.id));
      toast.success("Blog deleted successfully");
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
      setDeleteModal({ isOpen: false, id: null, title: "" });
    }
  };

  // Dual Filtering: Search Text AND Status Dropdown
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-8 animate-in fade-in duration-500 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#FDFBF7]">
            Editorial Blogs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage articles, drafts, and resources
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* View Toggle */}
          <div className="flex items-center p-1 bg-[#0B1221] border border-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-slate-800 text-[#C4A47C]"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-slate-800 text-[#C4A47C]"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          {/* Add New Button */}
          <Link href="/admin/blogs/create" className="flex-1 md:flex-none">
            <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#C4A47C]/10 text-[#C4A47C] border border-[#C4A47C]/30 hover:bg-[#C4A47C]/20 transition-colors font-medium text-sm">
              <Plus size={16} /> Write Blog
            </button>
          </Link>
        </div>
      </div>

      {/* Filters Bar: Search & Status */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            placeholder="Search blogs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1221] border border-slate-800 pl-9 pr-4 py-2.5 rounded-md text-[#FDFBF7] text-sm focus:border-slate-600 outline-none transition-colors"
          />
        </div>

        <div className="relative shrink-0">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <Filter size={14} />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "draft" | "published")
            }
            className="w-full sm:w-auto bg-[#0B1221] border border-slate-800 pl-9 pr-10 py-2.5 rounded-md text-[#FDFBF7] text-sm focus:border-slate-600 outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
          {/* Custom dropdown arrow to match theme */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-slate-500"></div>
        </div>
      </div>

      {/* CONTENT AREA */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 border border-slate-800 rounded-xl bg-[#0B1221]">
          Loading editorial content...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-20 text-center text-slate-500 border border-slate-800 rounded-xl bg-[#0B1221]">
          No blogs match your filters.
        </div>
      ) : viewMode === "table" ? (
        // --- TABLE VIEW ---
        <div className="bg-[#0B1221] border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Article</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Date Saved
                  </th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[#FDFBF7]">
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-12 h-10 rounded-md bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[#FDFBF7] line-clamp-1">
                          {blog.title}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <User size={12} /> {blog.author?.name || "Editorial Team"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          blog.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/20" // Yellow-ish for drafts
                        }`}
                      >
                        {blog.status.charAt(0).toUpperCase() +
                          blog.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Recently saved"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/admin/blogs/edit/${blog._id}`}>
                          <button className="text-slate-400 hover:text-[#C4A47C] transition-colors">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              id: blog._id,
                              title: blog.title,
                            })
                          }
                          className="text-slate-400 hover:text-red-400 transition-colors"
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
      ) : (
        // --- GRID / CARDS VIEW ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#0B1221] border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-colors flex flex-col"
            >
              <div className="h-44 w-full bg-slate-900 relative border-b border-slate-800">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                    No Image Available
                  </div>
                )}

                <div
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-md border text-xs font-medium backdrop-blur-md ${
                    blog.status === "published"
                      ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-100"
                      : "bg-amber-500/20 border-amber-500/30 text-amber-100" // Yellow-ish for drafts
                  }`}
                >
                  {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <span className="text-[#C4A47C] text-xs font-semibold tracking-wide uppercase mb-2">
                  {blog.category}
                </span>

                <h3 className="text-[#FDFBF7] font-semibold text-lg leading-tight line-clamp-2 mb-3">
                  {blog.title}
                </h3>

                <div className="flex items-center gap-3 text-slate-400 text-xs mt-auto">
                  <span className="flex items-center gap-1.5">
                    <User size={14} /> {blog.author?.name || "Editorial Team"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {blog.readTime || 0} min
                  </span>
                </div>

                <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-800/50">
                  <Link href={`/admin/blogs/edit/${blog._id}`}>
                    <button className="text-slate-400 hover:text-[#C4A47C] transition-colors p-1">
                      <Edit size={16} />
                    </button>
                  </Link>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        id: blog._id,
                        title: blog.title,
                      })
                    }
                    className="text-slate-400 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0B1221] border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-semibold text-[#FDFBF7]">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-slate-300 text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#FDFBF7]">
                &quot;{deleteModal.title}&quot;
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() =>
                  setDeleteModal({ isOpen: false, id: null, title: "" })
                }
                disabled={isDeleting}
                className="px-4 py-2 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
