import React from "react";

interface CMSActionsProps {
  actionType: "create" | "update";
  editorType: "Blog" | "University" | "FAQ" | "Resource" | "Category";
  onSaveDraft: () => void;
  loading?: boolean;
}

const CMSActions = ({
  actionType,
  editorType,
  onSaveDraft,
  loading = false,
}: CMSActionsProps) => {
  return (
    <div className="mt-10 flex gap-4 items-center pt-6 border-t border-slate-800">
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 rounded-lg text-sm font-medium
          bg-[#C4A47C] text-[#0B1221] border border-[#C4A47C]
          hover:bg-[#b0916a] hover:border-[#b0916a]
          transition active:scale-95 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {actionType === "update" ? "Update" : "Publish"}
      </button>

      <button
        type="button"
        onClick={onSaveDraft}
        className="px-6 py-2.5 rounded-lg text-sm font-medium
          bg-slate-800/50 text-slate-300 border border-slate-700
          hover:bg-slate-800 hover:text-[#FDFBF7] hover:border-slate-600
          transition active:scale-95 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Draft
      </button>

      <span className="ml-auto text-xs text-slate-500 self-center hidden sm:block">
        Editing {editorType}
      </span>
    </div>
  );
};

export default CMSActions;
