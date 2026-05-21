"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HelpCircle, Plus, Search, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";

// Matches the backend schema exact enums
const faqCategories = [
  "Admissions Process",
  "LNAT Preparation",
  "University Specifics",
  "Logistics & Scoring",
];

interface IFAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  createdAt: string;
}

export default function FAQArchivePage() {
  const [faqs, setFaqs] = useState<IFAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      // Pointing to the API route we designed earlier
      const res = await fetch("/api/faqs");
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      toast.error("Error loading FAQs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      setFaqs((prev) => prev.filter((faq) => faq.id !== id));
      toast.success("FAQ deleted successfully");
    } catch (error) {
      toast.error("Failed to delete FAQ");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#FDFBF7]">
            FAQ Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage platform accordion questions
          </p>
        </div>
        <Link href="/admin/faqs/create">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#C4A47C]/10 text-[#C4A47C] border border-[#C4A47C]/30 hover:bg-[#C4A47C]/20 transition-colors font-medium text-sm">
            <Plus size={16} /> Add New FAQ
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[250px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1221] border border-slate-800 pl-9 pr-4 py-2.5 rounded-md text-[#FDFBF7] text-sm focus:border-slate-600 outline-none transition-colors"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#0B1221] border border-slate-800 px-4 py-2.5 rounded-md text-[#FDFBF7] text-sm focus:border-slate-600 outline-none cursor-pointer"
        >
          <option value="all">All Categories</option>
          {faqCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#0B1221] border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Question</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Category
                </th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-[#FDFBF7]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Loading FAQs...
                  </td>
                </tr>
              ) : filteredFaqs.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No FAQs found.
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((faq) => (
                  <tr
                    key={faq.id}
                    className="hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#FDFBF7] line-clamp-1">
                        {faq.question}
                      </p>
                      <p className="text-slate-500 text-xs mt-1 line-clamp-1">
                        {faq.answer}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">
                        {faq.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-3">
                        <Link href={`/admin/faqs/edit/${faq.id}`}>
                          <button className="text-slate-400 hover:text-[#C4A47C] transition-colors">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          disabled={deletingId === faq.id}
                          className="text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
