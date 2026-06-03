"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { Edit, FileText, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { adminFetch } from "@/lib/adminApiClient";

interface ResourceListItem {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  fileUrl: string;
  createdAt?: string;
}

const getStatusBadgeClass = (status: "draft" | "published") =>
  status === "published"
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : "bg-amber-500/10 text-amber-300 border-amber-500/20";

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchResources = async () => {
    try {
      const response = await adminFetch("/api/resources?status=all");
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }

      const data = await response.json();
      startTransition(() => {
        setResources(data.resources || []);
      });
    } catch {
      toast.error("Error loading resources");
    } finally {
      startTransition(() => {
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    void fetchResources();
  }, []);

  const deleteResource = async (id: string) => {
    if (!window.confirm("Delete this resource?")) {
      return;
    }

    try {
      const response = await adminFetch(`/api/resources/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      startTransition(() => {
        setResources((prev) =>
          prev.filter((resource) => (resource.id || resource._id) !== id),
        );
      });
      toast.success("Resource deleted");
    } catch {
      toast.error("Failed to delete resource");
    }
  };

  const filteredResources = resources.filter((resource) => {
    const query = search.toLowerCase();
    return (
      resource.title.toLowerCase().includes(query) ||
      resource.slug.toLowerCase().includes(query) ||
      resource.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="animate-in fade-in duration-500 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#FDFBF7]">Resources</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage free PDF resources used across topic hubs and blog pages.
          </p>
        </div>

        <Link
          href="/admin/resources/create"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#C4A47C]/30 bg-[#C4A47C]/10 px-5 py-2.5 text-sm font-medium text-[#C4A47C] transition-colors hover:bg-[#C4A47C]/20"
        >
          <Plus size={16} />
          Add Resource
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          placeholder="Search resources..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-md border border-slate-800 bg-[#0B1221] py-2.5 pl-9 pr-4 text-sm text-[#FDFBF7] outline-none transition-colors focus:border-slate-600"
        />
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-800 bg-[#0B1221] py-20 text-center text-slate-500">
          Loading resources...
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#0B1221] py-20 text-center text-slate-500">
          No resources found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0B1221]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Resource</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">PDF</th>
                  <th className="px-6 py-4 font-medium">Created</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[#FDFBF7]">
                {filteredResources.map((resource) => {
                  const resourceId = resource.id || resource._id || "";

                  return (
                    <tr
                      key={resourceId}
                      className="transition-colors hover:bg-slate-800/20"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-[#C4A47C]">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {resource.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {resource.category}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${getStatusBadgeClass(
                            resource.status,
                          )}`}
                        >
                          {resource.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#C4A47C] hover:text-[#FDFBF7]"
                        >
                          View PDF
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {resource.createdAt
                          ? new Date(resource.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/resources/edit/${resourceId}`}
                            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-[#C4A47C]"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => void deleteResource(resourceId)}
                            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
