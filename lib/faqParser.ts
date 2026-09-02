export type ParsedFaq = { question: string; answer: string };

/**
 * Paste styles the parser understands. Rendered as the editor-facing hint above
 * every FAQ section so the note and the parser cannot drift apart.
 */
export const FAQ_PASTE_FORMATS = [
  "Q. / A. markers (also Que., Ques., Question:, Ans., Answer: — any of . ) : - works)",
  "Numbered questions — 1. Question, with the answer on the lines below",
  "A plain line ending in “?”, followed by its answer paragraph",
  "Any of the above with markdown — **bold**, # headings, > quotes and - bullets are stripped automatically",
];

const QUESTION_MARKER = /^(?:q|que|ques|question)\s*[.):\-]\s*/i;
const ANSWER_MARKER = /^(?:a|ans|answer)\s*[.):\-]\s*/i;
const NUMBERED_LINE = /^(\d{1,3})\s*[.):\-]\s+(.*)$/;

/** A long sentence that happens to end in "?" is prose, not a heading. */
const MAX_PLAIN_QUESTION_LENGTH = 200;

function stripMarkdown(line: string) {
  return line
    .replace(/^\s*>+\s*/, "")
    .replace(/^\s*#{1,6}\s+/, "")
    .replace(/^\s*[-*+]\s+/, "")
    .replace(/`+/g, "")
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}

function isPlainQuestion(line: string) {
  return line.endsWith("?") && line.length <= MAX_PLAIN_QUESTION_LENGTH;
}

type Draft = { question: string; answerLines: string[] };

/**
 * Parses a question/answer list copied out of a doc or a chat answer.
 * Pairs missing either half are dropped.
 */
export function parseFaqText(text: string): ParsedFaq[] {
  if (!text || !text.trim()) return [];

  const lines = text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map(stripMarkdown);

  const pairs: ParsedFaq[] = [];
  const state: { current: Draft | null } = { current: null };
  let inAnswer = false;
  let pendingBlank = false;

  const commit = () => {
    const draft = state.current;
    if (!draft) return;
    const question = draft.question.trim();
    const answer = draft.answerLines.join("\n").trim();
    if (question && answer) pairs.push({ question, answer });
    state.current = null;
  };

  const startPair = (question: string) => {
    commit();
    state.current = { question, answerLines: [] };
    inAnswer = false;
    pendingBlank = false;
  };

  const appendAnswerLine = (line: string) => {
    const draft = state.current;
    if (!draft) return;
    // Keep paragraph breaks inside an answer, but never leading blanks.
    if (pendingBlank && draft.answerLines.length) draft.answerLines.push("");
    draft.answerLines.push(line);
    inAnswer = true;
    pendingBlank = false;
  };

  // Only apply the marker heuristics when the text actually has markers, and
  // only treat the text as a numbered list when it opens as one — otherwise a
  // numbered list inside an answer would split the pair.
  const hasMarkers = lines.some((line) => QUESTION_MARKER.test(line));
  const firstLine = lines.find((line) => line.length > 0) || "";
  const firstNumbered = hasMarkers ? null : NUMBERED_LINE.exec(firstLine);
  let expectedNumber = firstNumbered ? Number(firstNumbered[1]) : 0;
  const isNumberedList = Boolean(firstNumbered);

  for (const line of lines) {
    if (!line) {
      pendingBlank = true;
      continue;
    }

    if (hasMarkers) {
      if (QUESTION_MARKER.test(line)) {
        startPair(line.replace(QUESTION_MARKER, ""));
        continue;
      }
      if (state.current && !inAnswer && ANSWER_MARKER.test(line)) {
        appendAnswerLine(line.replace(ANSWER_MARKER, ""));
        continue;
      }
      if (state.current && !inAnswer) {
        // Question wrapped onto a second line before its answer marker.
        state.current.question =
          `${state.current.question} ${line}`.trim();
        continue;
      }
      appendAnswerLine(line);
      continue;
    }

    if (isNumberedList) {
      const numbered = NUMBERED_LINE.exec(line);
      if (numbered && Number(numbered[1]) === expectedNumber) {
        expectedNumber += 1;
        startPair(numbered[2]);
        continue;
      }
      appendAnswerLine(line);
      continue;
    }

    // Plain shape: a "?" line only starts a new pair once the pair in hand
    // already has answer text, so a rhetorical question stays in the answer.
    if (
      isPlainQuestion(line) &&
      (!state.current || state.current.answerLines.length > 0)
    ) {
      startPair(line);
      continue;
    }
    appendAnswerLine(line);
  }

  commit();
  return pairs;
}

/**
 * Parses clipboard text for an FAQ question field. Returns null when the paste
 * should keep its existing behaviour — a tab-separated spreadsheet/table paste,
 * or text that yields no complete question/answer pair.
 */
export function parseFaqClipboardText(text: string): ParsedFaq[] | null {
  if (!text || text.includes("\t")) return null;
  const pairs = parseFaqText(text);
  return pairs.length ? pairs : null;
}

/** Renders a parsed plain-text answer as HTML for the rich-text answer editors. */
export function faqAnswerToHtml(answer: string) {
  const escape = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  return answer
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escape(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}
