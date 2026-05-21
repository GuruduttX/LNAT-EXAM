// CMSSeoSection.tsx
import React from "react";

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-slate-900/50 text-[#FDFBF7]
  placeholder-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition
`;

const CMSSeoSection = ({
  metaTitle,
  metaDescription,
  onChange,
}: {
  metaTitle: string;
  metaDescription: string;
  onChange: any;
  editorType: string;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0B1221] p-6 rounded-xl border border-slate-800 shadow-sm">
      <div>
        <label className="text-sm font-medium text-slate-400">Meta Title</label>
        <input
          value={metaTitle}
          required
          placeholder="SEO Title..."
          className={inputClass}
          onChange={(e) => onChange("metaTitle", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-400">
          Meta Description
        </label>
        <input
          value={metaDescription}
          required
          placeholder="SEO Description..."
          className={inputClass}
          onChange={(e) => onChange("metaDescription", e.target.value)}
        />
      </div>
    </div>
  );
};

export default CMSSeoSection;
