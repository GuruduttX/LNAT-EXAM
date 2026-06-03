"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ExternalLink } from "lucide-react";

const pdfCompressionTools = [
  {
    label: "iLovePDF",
    href: "https://www.ilovepdf.com/compress_pdf",
  },
  {
    label: "PDF24 Tools",
    href: "https://tools.pdf24.org/en/compress-pdf",
  },
  {
    label: "Adobe Acrobat",
    href: "https://www.adobe.com/acrobat/online/compress-pdf.html",
  },
];

interface ResourcePdfSectionProps {
  fileUrl: string;
  fileName: string;
  onUploaded: (payload: {
    url: string;
    publicId?: string;
    format?: string;
    bytes?: number;
    originalFilename?: string;
  }) => void;
}

export default function ResourcePdfSection({
  fileUrl,
  fileName,
  onUploaded,
}: ResourcePdfSectionProps) {
  const [loading, setLoading] = useState(false);

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("PDF must be under 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "LNAT_EXAM/Resources");

    try {
      setLoading(true);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!data.success) {
        toast.error("PDF upload failed");
        return;
      }

      onUploaded({
        url: data.url,
        publicId: data.publicId,
        format: data.format,
        bytes: data.bytes,
        originalFilename: data.originalFilename,
      });
      toast.success("PDF uploaded successfully");
    } catch {
      toast.error("PDF upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border border-slate-800 bg-[#0B1221] p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium text-slate-400">
          Resource PDF
        </label>

        <label
          htmlFor="resource-pdf-upload"
          className="relative mt-3 block cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/30 p-6 text-center transition hover:border-[#C4A47C]/50 hover:bg-slate-800/50"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C4A47C]/30 border-t-[#C4A47C]" />
            </div>
          ) : fileUrl ? (
            <div>
              <p className="text-sm font-medium text-[#FDFBF7]">
                {fileName || "Uploaded PDF"}
              </p>
              <p className="mt-2 text-xs text-slate-500 break-all">{fileUrl}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-400">
                Upload a PDF resource or{" "}
                <span className="text-[#C4A47C]">browse</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">Only .pdf up to 10MB</p>
            </>
          )}

          <input
            id="resource-pdf-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handlePdfUpload}
          />
        </label>

        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/30 p-4">
          <p className="text-xs font-medium text-slate-400">
            PDF larger than 10MB? Compress it using one of these free tools:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pdfCompressionTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-[#C4A47C] transition hover:border-[#C4A47C]/60 hover:bg-slate-800"
              >
                {tool.label}
                <ExternalLink size={13} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
