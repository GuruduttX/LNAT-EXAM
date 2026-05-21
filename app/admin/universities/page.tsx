"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Trash2,
  Edit,
  LayoutGrid,
  List,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

// Matches our backend interface
interface IUniversity {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  lnatRequirement: string;
  globalRanking: string;
}

export default function UniversityArchivePage() {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null as string | null,
    name: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      // Fetching from the API route we created earlier
      const res = await fetch("/api/universities?limit=50"); // Get a larger batch for the archive
      if (!res.ok) throw new Error("Failed to fetch universities");
      const data = await res.json();

      // The API returns { universities: [...], meta: {...} }
      setUniversities(data.universities || []);
    } catch (error) {
      toast.error("Error loading universities");
    } finally {
      setIsLoading(false);
    }
  };

  const executeDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/universities/${deleteModal.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setUniversities((prev) => prev.filter((u) => u.id !== deleteModal.id));
      toast.success("University deleted successfully");
    } catch (error) {
      toast.error("Failed to delete university");
    } finally {
      setIsDeleting(false);
      setDeleteModal({ isOpen: false, id: null, name: "" });
    }
  };

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    // Added py-8 to give comfortable padding below the fixed Topbar
    <div className="py-8 animate-in fade-in duration-500 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#FDFBF7]">
            Universities
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage the LNAT university directory
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
          <Link
            href="/admin/universities/create"
            className="flex-1 md:flex-none"
          >
            <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#C4A47C]/10 text-[#C4A47C] border border-[#C4A47C]/30 hover:bg-[#C4A47C]/20 transition-colors font-medium text-sm">
              <Plus size={16} /> Add University
            </button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          placeholder="Search universities by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0B1221] border border-slate-800 pl-9 pr-4 py-2.5 rounded-md text-[#FDFBF7] text-sm focus:border-slate-600 outline-none transition-colors"
        />
      </div>

      {/* CONTENT AREA */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 border border-slate-800 rounded-xl bg-[#0B1221]">
          Loading directory...
        </div>
      ) : filteredUniversities.length === 0 ? (
        <div className="py-20 text-center text-slate-500 border border-slate-800 rounded-xl bg-[#0B1221]">
          No universities found.
        </div>
      ) : viewMode === "table" ? (
        // --- TABLE VIEW ---
        <div className="bg-[#0B1221] border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">University</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    LNAT Req.
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Ranking
                  </th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[#FDFBF7]">
                {filteredUniversities.map((uni) => (
                  <tr
                    key={uni.id}
                    className="hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                        <img
                          src={uni.image}
                          alt={uni.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-[#FDFBF7]">
                        {uni.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {uni.location}, {uni.country}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs border ${
                          uni.lnatRequirement === "Required"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-slate-800 text-slate-300 border-slate-700"
                        }`}
                      >
                        {uni.lnatRequirement}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      #{uni.globalRanking}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/admin/universities/edit/${uni.id}`}>
                          <button className="text-slate-400 hover:text-[#C4A47C] transition-colors">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              id: uni.id,
                              name: uni.name,
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
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="bg-[#0B1221] border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-colors flex flex-col"
            >
              <div className="h-40 w-full bg-slate-900 relative border-b border-slate-800">
                <img
                  src={uni.image}
                  alt={uni.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 text-xs font-medium text-white">
                  Rank: #{uni.globalRanking}
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-[#FDFBF7] font-semibold text-lg line-clamp-1">
                  {uni.name}
                </h3>

                <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-1.5">
                  <MapPin size={14} />
                  <span className="line-clamp-1">
                    {uni.location}, {uni.country}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                  <span className="text-xs text-slate-400">
                    LNAT:{" "}
                    <span
                      className={
                        uni.lnatRequirement === "Required"
                          ? "text-emerald-400"
                          : "text-slate-300"
                      }
                    >
                      {uni.lnatRequirement}
                    </span>
                  </span>

                  <div className="flex items-center gap-3">
                    <Link href={`/admin/universities/edit/${uni.id}`}>
                      <button className="text-slate-400 hover:text-[#C4A47C] transition-colors">
                        <Edit size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        setDeleteModal({
                          isOpen: true,
                          id: uni.id,
                          name: uni.name,
                        })
                      }
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
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
                {deleteModal.name}
              </span>
              ? This action cannot be undone and will remove it from the
              directory permanently.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() =>
                  setDeleteModal({ isOpen: false, id: null, name: "" })
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
                {isDeleting ? "Deleting..." : "Delete University"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
