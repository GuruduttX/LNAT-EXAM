import React from 'react'

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition
`;

const CMSSchema = ({
  schemaTitle, schemaDescription, onChange, editorType
}: {
  schemaTitle: string;
  schemaDescription: string;
  onChange: any;
  editorType: "Blog" | "University" | "Resource" | "Faq";
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0B1221] p-6 rounded-xl border border-slate-800 shadow-sm">
      <div>
        <label className="text-sm font-medium text-slate-400">
          Schema Title
        </label>
        <input
          
          value={schemaTitle}
          required
          placeholder={`e.g., ${editorType} Overview & Guide`}
          className={inputClass}
          onChange={(e) => onChange("schemaTitle", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-400">
          Schema Description
        </label>
        <input
          value={schemaDescription}
          required
          placeholder="Enter a brief description for search engine rich results..."
          className={inputClass}
          onChange={(e) => onChange("schemaDescription", e.target.value)}
        />
      </div>
    </div>
  );
};

export default CMSSchema;