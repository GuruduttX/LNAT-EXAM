import { FAQ_PASTE_FORMATS } from "@/lib/faqParser";

/**
 * Editor-facing note above every FAQ section. The paste styles come from the
 * parser module so the hint and the parser cannot drift apart.
 */
export default function FaqPasteHint({
  variant = "rows",
  className = "",
}: {
  variant?: "rows" | "single";
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-400 ${className}`}
    >
      <p className="font-medium text-slate-300">
        {variant === "rows"
          ? "Paste a question/answer list into the first Question box and it will be split into rows automatically."
          : "Paste a question and its answer into the Question box and they will be split into the two fields automatically."}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {FAQ_PASTE_FORMATS.map((format) => (
          <li key={format}>{format}</li>
        ))}
      </ul>
      <p className="mt-2">
        {variant === "rows"
          ? "Always check the rows after pasting and fix anything that landed in the wrong box."
          : "Extra pairs in the paste are not saved here — add them as separate FAQ entries. Check both fields after pasting."}
      </p>
    </div>
  );
}
