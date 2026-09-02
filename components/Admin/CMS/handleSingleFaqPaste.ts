import type React from "react";
import toast from "react-hot-toast";

import { parseFaqClipboardText, type ParsedFaq } from "@/lib/faqParser";

/**
 * Paste handler for a standalone single-FAQ editor: fills the question and
 * answer boxes from the first parsed pair and tells the editor about any extra
 * pairs so they are never silently dropped.
 */
export function handleSingleFaqPaste(
  event: React.ClipboardEvent<HTMLInputElement>,
  applyPair: (pair: ParsedFaq) => void,
) {
  const pairs = parseFaqClipboardText(event.clipboardData.getData("text/plain"));
  if (!pairs) return;

  event.preventDefault();
  applyPair(pairs[0]);

  const extras = pairs.length - 1;
  if (extras > 0) {
    toast(
      `${extras} more FAQ${extras === 1 ? "" : "s"} were found in that paste. ` +
        "Only the first was filled in — add the rest as separate FAQ entries.",
      { duration: 6000 },
    );
  }
}
