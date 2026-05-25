"use client";

import RichTextEditor from "@/shared/RichTextEditor";

const CMSContentSection = ({
  subContent,
  content,
  onChange,
}: {
  subContent: string;
  content: string;
  onChange: any;
  editorType: string;
}) => {
  return (
    <div className="space-y-6 bg-[#0B1221] border border-slate-800 rounded-xl w-full p-6 shadow-sm">
      {/* ================= SUB CONTENT ================= */}
      <div>
        <label className="text-sm font-medium text-slate-400">
          Sub Content / Excerpt
        </label>

        <textarea
          required
          rows={4}
          value={subContent}
          onChange={(e) => onChange("subContent", e.target.value)}
          placeholder="A brief summary for the preview card..."
          className="mt-2 w-full px-5 py-3 rounded-xl
          bg-slate-900/50 text-[#FDFBF7] placeholder-slate-600
          border border-slate-800
          focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
          transition resize-none"
        />
      </div>

      {/* ================= EDITOR ================= */}
      <div>
        <label className="text-sm font-medium text-slate-400 mb-2 block">
          Main Content Body
        </label>

        {/* Note: The RichTextEditor itself handles its own white background styling internally. 
            We just wrap it in text-gray-900 to ensure the text typed inside is dark. */}
        <div className="text-gray-900 rounded-xl border border-slate-800 overflow-hidden">
          <RichTextEditor
            value={content}
            onChange={(val) => onChange("content", val)}
            minHeight="60vh"
            maxHeight="65vh"
          />
        </div>
      </div>
    </div>
  );
};

export default CMSContentSection;
