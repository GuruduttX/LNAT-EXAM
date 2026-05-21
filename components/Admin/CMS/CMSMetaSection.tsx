import React from "react";

export const BlogCategories = [
  "Admissions Advice",
  "LNAT Preparation",
  "University Specifics",
  "Essay Writing",
  "Success Stories",
];

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-slate-900/50 text-[#FDFBF7]
  placeholder-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition
`;

const CMSMetaSection = ({
  title,
  category,
  slug,
  onChange,
  editorType,
}: {
  title: string;
  category: string;
  slug: string;
  onChange: any;
  editorType: "Blog" | "University" | "FAQ" | "Resource";
}) => {
  return (
    <div className="space-y-6 bg-[#0B1221] p-6 rounded-xl border border-slate-800 shadow-sm">
      <div>
        <label className="text-sm font-medium text-slate-400">
          {editorType} Title
        </label>
        <input
          value={title}
          placeholder="Enter the title here..."
          className={inputClass}
          required
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-slate-400">Category</label>
          <select
            required
            value={category}
            onChange={(e) => onChange("category", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-[#0B1221]">
              Select Category
            </option>
            {editorType === "Blog" &&
              BlogCategories.map((cat, idx) => (
                <option key={idx} value={cat} className="bg-[#0B1221]">
                  {cat}
                </option>
              ))}
            {/* Add other entity categories here if needed */}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-400">
            Slug <span className="text-red-400">*</span>
          </label>
          <input
            value={slug}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="e.g., how-to-ace-the-lnat"
            className={inputClass}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CMSMetaSection;
