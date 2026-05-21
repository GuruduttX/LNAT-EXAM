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
  schemaTitle, schemaDescription, onChange,
}: {
  schemaTitle: string;
  schemaDescription: string;
  onChange: any;
  editorType: "Blog" | "Package" | "Temple" | "Pooja" | "Hotel";
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="text-sm text-pink-300/70">Schema Title</label>
        <input
          value={schemaTitle}
          required
          placeholder="A Human Approach to Meet Krishna"
          className={inputClass}
          onChange={(e) => onChange("schemaTitle", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-pink-300/70">Schema Description</label>
        <input
          value={schemaDescription}
          required
          placeholder="Growing Spirtuality In you"
          className={inputClass}
          onChange={(e) => onChange("schemaDescription", e.target.value)}
        />
      </div>

    </div>
  );
};

export default CMSSchema;