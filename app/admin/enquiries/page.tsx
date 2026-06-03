"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import {
  Inbox,
  Mail,
  MessageSquareText,
  Phone,
  Save,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  enquirySources,
  enquiryStatuses,
  enquiryTypes,
  type EnquiryStatus,
  type IEnquiry,
} from "@/types/backend.types";
import { adminFetch } from "@/lib/adminApiClient";

interface EnquiryListItem extends Omit<IEnquiry, "createdAt" | "updatedAt"> {
  _id?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

const statusBadgeClasses: Record<EnquiryStatus, string> = {
  new: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  contacted: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  converted: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  closed: "border-slate-600 bg-slate-800 text-slate-300",
};

const formatLabel = (value: string) =>
  value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const getEnquiryId = (enquiry: EnquiryListItem) =>
  enquiry.id || enquiry._id || "";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] =
    useState<EnquiryListItem | null>(null);
  const [internalNotes, setInternalNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  useEffect(() => {
    let isCancelled = false;

    adminFetch("/api/admin/enquiries")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch enquiries");
        return response.json();
      })
      .then((data: { enquiries?: EnquiryListItem[] }) => {
        if (!isCancelled) {
          startTransition(() => setEnquiries(data.enquiries || []));
        }
      })
      .catch(() => {
        if (!isCancelled) toast.error("Error loading enquiries");
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const searchableText = [
      enquiry.name,
      enquiry.phone,
      enquiry.email,
      enquiry.resource?.title,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(deferredSearch) &&
      (statusFilter === "all" || enquiry.status === statusFilter) &&
      (typeFilter === "all" || enquiry.enquiryType === typeFilter) &&
      (sourceFilter === "all" || enquiry.source === sourceFilter)
    );
  });

  const patchEnquiry = async (
    enquiry: EnquiryListItem,
    updates: Pick<Partial<IEnquiry>, "status" | "internalNotes">,
  ) => {
    const enquiryId = getEnquiryId(enquiry);
    const response = await adminFetch(`/api/admin/enquiries/${enquiryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Failed to update enquiry");
    }

    return response.json() as Promise<EnquiryListItem>;
  };

  const handleStatusChange = async (
    enquiry: EnquiryListItem,
    status: EnquiryStatus,
  ) => {
    try {
      const updated = await patchEnquiry(enquiry, { status });
      setEnquiries((current) =>
        current.map((item) =>
          getEnquiryId(item) === getEnquiryId(enquiry) ? updated : item,
        ),
      );
      toast.success("Enquiry status updated");
    } catch {
      toast.error("Failed to update enquiry");
    }
  };

  const openDetails = (enquiry: EnquiryListItem) => {
    setSelectedEnquiry(enquiry);
    setInternalNotes(enquiry.internalNotes || "");
  };

  const saveNotes = async () => {
    if (!selectedEnquiry) return;
    setIsSaving(true);

    try {
      const updated = await patchEnquiry(selectedEnquiry, { internalNotes });
      setEnquiries((current) =>
        current.map((item) =>
          getEnquiryId(item) === getEnquiryId(selectedEnquiry) ? updated : item,
        ),
      );
      setSelectedEnquiry(updated);
      toast.success("Internal notes saved");
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in py-8 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#FDFBF7]">Enquiries</h1>
        <p className="mt-1 text-sm text-slate-400">
          Review frontend enquiries and track follow-up progress.
        </p>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name, email or phone..."
          className="rounded-md border border-slate-800 bg-[#0B1221] px-4 py-2.5 text-sm text-[#FDFBF7] outline-none transition-colors placeholder:text-slate-500 focus:border-slate-600"
        />
        <FilterSelect
          value={statusFilter}
          onChange={setStatusFilter}
          options={enquiryStatuses}
          placeholder="All Statuses"
        />
        <FilterSelect
          value={typeFilter}
          onChange={setTypeFilter}
          options={enquiryTypes}
          placeholder="All Enquiry Types"
        />
        <FilterSelect
          value={sourceFilter}
          onChange={setSourceFilter}
          options={enquirySources}
          placeholder="All Sources"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0B1221]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Received</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-[#FDFBF7]">
              {isLoading ? (
                <EmptyRow message="Loading enquiries..." />
              ) : filteredEnquiries.length === 0 ? (
                <EmptyRow message="No enquiries found." />
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr
                    key={getEnquiryId(enquiry)}
                    className="transition-colors hover:bg-slate-800/20"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium">{enquiry.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {enquiry.phone || enquiry.email || "No contact detail"}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <p>{formatLabel(enquiry.enquiryType)}</p>
                      {enquiry.resource?.title ? (
                        <p className="mt-1 max-w-48 truncate text-xs text-[#C4A47C]">
                          {enquiry.resource.title}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {formatLabel(enquiry.source)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={enquiry.status}
                        onChange={(event) =>
                          void handleStatusChange(
                            enquiry,
                            event.target.value as EnquiryStatus,
                          )
                        }
                        className={`rounded-full border px-2.5 py-1 text-xs outline-none ${statusBadgeClasses[enquiry.status]}`}
                      >
                        {enquiryStatuses.map((status) => (
                          <option key={status} value={status}>
                            {formatLabel(status)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-400">
                      {enquiry.createdAt
                        ? new Date(enquiry.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => openDetails(enquiry)}
                          className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-[#C4A47C]"
                          aria-label={`View enquiry from ${enquiry.name}`}
                        >
                          <MessageSquareText size={16} />
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

      {selectedEnquiry ? (
        <DetailsModal
          enquiry={selectedEnquiry}
          internalNotes={internalNotes}
          isSaving={isSaving}
          onNotesChange={setInternalNotes}
          onSave={() => void saveNotes()}
          onClose={() => setSelectedEnquiry(null)}
        />
      ) : null}

    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="cursor-pointer rounded-md border border-slate-800 bg-[#0B1221] px-4 py-2.5 text-sm text-[#FDFBF7] outline-none transition-colors focus:border-slate-600"
    >
      <option value="all">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {formatLabel(option)}
        </option>
      ))}
    </select>
  );
}

function EmptyRow({ message }: { message: string }) {
  return (
    <tr>
      <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
        <Inbox className="mx-auto mb-3" size={24} />
        {message}
      </td>
    </tr>
  );
}

function DetailsModal({
  enquiry,
  internalNotes,
  isSaving,
  onNotesChange,
  onSave,
  onClose,
}: {
  enquiry: EnquiryListItem;
  internalNotes: string;
  isSaving: boolean;
  onNotesChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-slate-800 bg-[#0B1221] shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-800 p-6">
          <div>
            <h2 className="text-lg font-semibold text-[#FDFBF7]">
              {enquiry.name}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {formatLabel(enquiry.enquiryType)} from{" "}
              {formatLabel(enquiry.source)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <ContactItem icon={Phone} value={enquiry.phone || "Not provided"} />
            <ContactItem icon={Mail} value={enquiry.email || "Not provided"} />
          </div>

          {enquiry.message ? (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                Message
              </p>
              <p className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-sm leading-6 text-slate-300">
                {enquiry.message}
              </p>
            </div>
          ) : null}

          {enquiry.resource?.title ? (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                Requested Resource
              </p>
              <p className="text-sm text-[#C4A47C]">{enquiry.resource.title}</p>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="internal-notes"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Internal Notes
            </label>
            <textarea
              id="internal-notes"
              value={internalNotes}
              onChange={(event) => onNotesChange(event.target.value)}
              rows={4}
              placeholder="Add follow-up notes..."
              className="w-full resize-none rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-sm text-[#FDFBF7] outline-none placeholder:text-slate-600 focus:border-slate-600"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-md border border-[#C4A47C]/30 bg-[#C4A47C]/10 px-4 py-2 text-sm font-medium text-[#C4A47C] transition-colors hover:bg-[#C4A47C]/20 disabled:opacity-50"
          >
            <Save size={15} />
            {isSaving ? "Saving..." : "Save Notes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  value,
}: {
  icon: typeof Phone;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-slate-300">
      <Icon size={15} className="text-[#C4A47C]" />
      <span>{value}</span>
    </div>
  );
}
