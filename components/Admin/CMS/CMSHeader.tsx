import React from "react";

const CMSHeader = ({ editorType }: { editorType: string }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#FDFBF7] flex items-center gap-2">
        ✍️ {editorType} Editor
      </h2>
      <div className="mt-3 h-[2px] w-32 bg-[#C4A47C]/50 rounded-full" />
    </div>
  );
};

export default CMSHeader;
