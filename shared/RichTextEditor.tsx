"use client";

import { useEditor, useEditorState, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeaderBase from "@tiptap/extension-table-header";
import TableCellBase from "@tiptap/extension-table-cell";

/* Strip colwidth from schema so Tiptap never stores or renders <col> widths */
const TableCell = TableCellBase.extend({
  addAttributes() {
    const attrs = this.parent?.() ?? {};
    delete (attrs as Record<string, unknown>).colwidth;
    return attrs;
  },
});
const TableHeader = TableHeaderBase.extend({
  addAttributes() {
    const attrs = this.parent?.() ?? {};
    delete (attrs as Record<string, unknown>).colwidth;
    return attrs;
  },
});
import { useEffect, useState, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, ImageIcon, Table as TableIcon,
  Undo2, Redo2, Strikethrough, Code, Minus, X, Bookmark, Loader2,
} from "lucide-react";

/* ── Image extension: alignment + explicit width / height ── */
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      "data-align": {
        default: "basic",
        parseHTML: (el) => el.getAttribute("data-align") ?? "basic",
        renderHTML: ({ "data-align": align }) =>
          align && align !== "basic" ? { "data-align": align } : {},
      },
      width: {
        default: null,
        parseHTML: (el) => el.getAttribute("width"),
        renderHTML: (attrs) => (attrs.width ? { width: attrs.width } : {}),
      },
      height: {
        default: null,
        parseHTML: (el) => el.getAttribute("height"),
        renderHTML: (attrs) => (attrs.height ? { height: attrs.height } : {}),
      },
    };
  },
});

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  minHeight?: string;
  maxHeight?: string;
}

const FORMAT_OPTIONS = [
  { label: "Paragraph", value: "paragraph" },
  { label: "Heading 1",  value: "h1" },
  { label: "Heading 2",  value: "h2" },
  { label: "Heading 3",  value: "h3" },
  { label: "Heading 4",  value: "h4" },
  { label: "Heading 5",  value: "h5" },
  { label: "Heading 6",  value: "h6" },
];

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */

export default function RichTextEditor({
  value,
  onChange,
  minHeight = "300px",
  maxHeight  = "500px",
}: RichTextEditorProps) {
  const [linkOpen,        setLinkOpen]        = useState(false);
  const [imageOpen,       setImageOpen]       = useState(false);
  const [tablePickerOpen, setTablePickerOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      CustomImage.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    editorProps: {
      attributes: { class: "rte-content", spellcheck: "true" },
      /* Strip ALL column-width hints injected by Word / Google Sheets on paste */
      transformPastedHTML(html: string) {
        const doc = new DOMParser().parseFromString(html, "text/html");

        /* Remove <colgroup> and <col> entirely — Tiptap re-creates them from
           colwidth node attributes, so keeping them just re-injects widths */
        doc.querySelectorAll("colgroup, col").forEach((el) => el.remove());

        /* Strip explicit widths from every table element */
        doc.querySelectorAll("table, thead, tbody, tr, td, th").forEach((el) => {
          const h = el as HTMLElement;
          h.removeAttribute("width");
          h.removeAttribute("colwidth");
          h.removeAttribute("data-colwidth");
          h.style.removeProperty("width");
          h.style.removeProperty("min-width");
          h.style.removeProperty("max-width");
          h.style.removeProperty("text-align");
        });

        return doc.body.innerHTML;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  /* Sync external value only while editor is idle */
  useEffect(() => {
    if (!editor || editor.isFocused) return;
    if (value !== editor.getHTML()) editor.commands.setContent(value || "");
  }, [value, editor]);

  /* Close table picker on outside click */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(e.target as Node))
        setTablePickerOpen(false);
    };
    if (tablePickerOpen) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [tablePickerOpen]);

  /* Toolbar state — subscribes to every transaction (incl. pure caret moves),
     which plain `useEditor` no longer re-renders on in Tiptap v3 */
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      if (!e) return null;

      let format = "paragraph";
      for (let i = 1; i <= 6; i++)
        if (e.isActive("heading", { level: i })) { format = `h${i}`; break; }

      return {
        format,
        bold:        e.isActive("bold"),
        italic:      e.isActive("italic"),
        underline:   e.isActive("underline"),
        strike:      e.isActive("strike"),
        code:        e.isActive("code"),
        bulletList:  e.isActive("bulletList"),
        orderedList: e.isActive("orderedList"),
        link:        e.isActive("link"),
        alignLeft:    e.isActive({ textAlign: "left" }),
        alignCenter:  e.isActive({ textAlign: "center" }),
        alignRight:   e.isActive({ textAlign: "right" }),
        alignJustify: e.isActive({ textAlign: "justify" }),
        canUndo: e.can().undo(),
        canRedo: e.can().redo(),
      };
    },
  });

  const handleFormat = (val: string) => {
    if (!editor) return;
    if (val === "paragraph") editor.chain().focus().setParagraph().run();
    else {
      const level = parseInt(val.replace("h", "")) as 1|2|3|4|5|6;
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  if (!editor) return null;

  return (
    <>
      <div className="rounded-xl border border-gray-300 shadow-sm">

        {/* ── Toolbar ─────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-2 bg-gray-100 border-b border-gray-300 rounded-t-xl">

          <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!state?.canUndo} tooltip="Undo">
            <Undo2 size={14} />
          </Btn>
          <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!state?.canRedo} tooltip="Redo">
            <Redo2 size={14} />
          </Btn>

          <Sep />

          <select
            value={state?.format ?? "paragraph"}
            onChange={(e) => handleFormat(e.target.value)}
            className="h-7 px-2 rounded-md text-xs bg-white text-gray-700 border border-gray-300 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 cursor-pointer"
          >
            {FORMAT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <Sep />

          <Btn onClick={() => editor.chain().focus().toggleBold().run()}      active={state?.bold}      tooltip="Bold">         <Bold          size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleItalic().run()}    active={state?.italic}    tooltip="Italic">       <Italic        size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={state?.underline} tooltip="Underline">    <UnderlineIcon size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleStrike().run()}    active={state?.strike}    tooltip="Strikethrough"><Strikethrough size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleCode().run()}      active={state?.code}      tooltip="Inline Code">  <Code          size={14} /></Btn>

          <Sep />

          <Btn onClick={() => editor.chain().focus().toggleBulletList().run()}  active={state?.bulletList}  tooltip="Bullet List">   <List        size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={state?.orderedList} tooltip="Ordered List">  <ListOrdered size={14} /></Btn>

          <Sep />

          <Btn onClick={() => editor.chain().focus().setTextAlign("left").run()}    active={state?.alignLeft}    tooltip="Align Left">   <AlignLeft    size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign("center").run()}  active={state?.alignCenter}  tooltip="Align Center"> <AlignCenter  size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign("right").run()}   active={state?.alignRight}   tooltip="Align Right">  <AlignRight   size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={state?.alignJustify} tooltip="Justify">       <AlignJustify size={14} /></Btn>

          <Sep />

          <Btn onClick={() => setLinkOpen(true)}  active={state?.link} tooltip="Insert Link">  <LinkIcon  size={14} /></Btn>
          <Btn onClick={() => setImageOpen(true)}                                   tooltip="Insert Image"> <ImageIcon size={14} /></Btn>

          {/* Table button with grid picker */}
          <div className="relative" ref={tableRef}>
            <Btn onClick={() => setTablePickerOpen((v) => !v)} active={tablePickerOpen} tooltip="Insert Table">
              <TableIcon size={14} />
            </Btn>
            {tablePickerOpen && (
              <TablePicker
                onSelect={(rows, cols) => {
                  editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
                  setTablePickerOpen(false);
                }}
              />
            )}
          </div>

          <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} tooltip="Horizontal Rule">
            <Minus size={14} />
          </Btn>
        </div>

        {/* ── Editable area ───────────────────────── */}
        <div
          className="bg-white overflow-y-auto rounded-b-xl"
          style={{ minHeight, maxHeight }}
          onClick={() => editor.commands.focus()}
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Modals rendered above everything */}
      {linkOpen  && <LinkModal  editor={editor} onClose={() => setLinkOpen(false)}  />}
      {imageOpen && <ImageModal editor={editor} onClose={() => setImageOpen(false)} />}
    </>
  );
}

/* ── Portal: escapes any parent transform/overflow so fixed works ── */
function Portal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

/* ══════════════════════════════════════════════════
   MODAL SHELL
══════════════════════════════════════════════════ */

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <Portal>
      <div
        className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        /* Portals bubble through the React tree, so dialog submits/Enter would
           otherwise reach the CMS <form> wrapping the editor and save the page */
        onSubmit={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </Portal>
  );
}

/* ── Shared submit / cancel row ── */
function ModalActions({ onClose, submitLabel = "Submit" }: { onClose: () => void; submitLabel?: string }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer"
      >
        {submitLabel}
      </button>
    </div>
  );
}

/* ── Shared input style ── */
const inputCls =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 transition";

/* ══════════════════════════════════════════════════
   LINK MODAL
══════════════════════════════════════════════════ */

function LinkModal({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const linkAttrs = editor.getAttributes("link");
  const existing = linkAttrs.href as string | undefined;
  const { from, to } = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(from, to, "");

  const [url,       setUrl]       = useState(existing ?? "");
  const [linkText,  setLinkText]  = useState(selectedText);
  const [newWindow, setNewWindow] = useState(linkAttrs.target === "_blank");

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      /* extendMarkRange so a caret or partial selection still clears the
         whole link instead of leaving a fragment behind */
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      onClose();
      return;
    }

    const attrs = { href: url.trim(), target: newWindow ? "_blank" : "_self" };

    if (existing) {
      /* Rewrite the whole existing link, else a partial selection splits it in two */
      editor.chain().focus().extendMarkRange("link").setLink(attrs).run();
    } else if (selectedText) {
      /* Apply link to existing selection */
      editor.chain().focus().setLink(attrs).run();
    } else if (linkText.trim()) {
      /* Insert new text with link mark */
      editor.chain().focus().insertContent({
        type: "text",
        text: linkText.trim(),
        marks: [{ type: "link", attrs }],
      }).run();
    } else {
      editor.chain().focus().setLink(attrs).run();
    }
    onClose();
  };

  return (
    <Modal title="Insert Link" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">URL to link</label>
          <div className="relative">
            <input
              autoFocus
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className={`${inputCls} pr-10`}
            />
            <Bookmark size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {!selectedText && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Text to display</label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Link text"
              className={inputCls}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600">
            <input
              type="checkbox"
              checked={newWindow}
              onChange={(e) => setNewWindow(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
            />
            Open in new window
          </label>
        </div>

        <ModalActions onClose={onClose} />
      </form>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════
   IMAGE MODAL  (tabbed: Image | Link)
══════════════════════════════════════════════════ */

type ImgAlign = "basic" | "left" | "center" | "right";

const ALIGN_OPTIONS = ["basic", "left", "center", "right"] as const;

function AlignRow({ name, value, onChange }: { name: string; value: ImgAlign; onChange: (a: ImgAlign) => void }) {
  return (
    <div className="flex gap-4">
      {ALIGN_OPTIONS.map((a) => (
        <label key={a} className="flex items-center gap-1.5 cursor-pointer select-none text-sm text-gray-600 capitalize">
          <input
            type="radio"
            name={name}
            value={a}
            checked={value === a}
            onChange={() => onChange(a)}
            className="accent-blue-600 cursor-pointer"
          />
          {a}
        </label>
      ))}
    </div>
  );
}

function ImageModal({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const [tab, setTab] = useState<"image" | "link">("image");

  /* ── Image tab ── */
  const [fileName,    setFileName]    = useState("");
  const [imageUrl,    setImageUrl]    = useState("");
  const [alt,         setAlt]         = useState("");
  const [imgWidth,    setImgWidth]    = useState("");
  const [imgHeight,   setImgHeight]   = useState("");
  const [constrain,   setConstrain]   = useState(true);
  const [imgAlign,    setImgAlign]    = useState<ImgAlign>("basic");
  const [uploading,   setUploading]   = useState(false);
  const [uploadErr,   setUploadErr]   = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Link tab ── */
  const initSelectedText = () => {
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, "");
  };
  const [linkUrl,      setLinkUrl]      = useState("");
  const [linkText,     setLinkText]     = useState(initSelectedText);
  const [newWindow,    setNewWindow]    = useState(false);
  const [downloadLink, setDownloadLink] = useState(false);
  const [linkAlign,    setLinkAlign]    = useState<ImgAlign>("basic");

  /* ── File upload ── */
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    /* Webp-only guard */
    if (file.type !== "image/webp" && !file.name.toLowerCase().endsWith(".webp")) {
      setUploadErr("Only WebP images (.webp) are allowed.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    /* Size guard — max 1 MB */
    if (file.size > 1 * 1024 * 1024) {
      setUploadErr("Image must be smaller than 1 MB.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setFileName(file.name);
    setUploadErr("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "cms-content");
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        setUploadErr(data.error ?? "Upload failed");
        setFileName("");
      }
    } catch {
      setUploadErr("Upload failed. Please try again.");
      setFileName("");
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFileName("");
    setImageUrl("");
    setUploadErr("");
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ── Submit handlers ── */
  const submitImage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain().focus() as any).setImage({
      src:          imageUrl.trim(),
      alt:          alt.trim(),
      "data-align": imgAlign,
      ...(imgWidth  ? { width:  imgWidth  } : {}),
      ...(imgHeight ? { height: imgHeight } : {}),
    }).run();
    onClose();
  };

  const submitLink = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;
    const attrs = {
      href:   linkUrl.trim(),
      target: newWindow    ? "_blank" : "_self",
      ...(downloadLink ? { download: "" } : {}),
    };
    if (linkText.trim()) {
      editor.chain().focus().insertContent({
        type: "text",
        text: linkText.trim(),
        marks: [{ type: "link", attrs }],
      }).run();
    } else {
      editor.chain().focus().setLink(attrs).run();
    }
    onClose();
  };

  /* ── UI ── */
  return (
    <Portal>
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      /* See Modal: keep dialog submits/Enter out of the surrounding CMS form */
      onSubmit={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5">
          <h3 className="font-semibold text-gray-900 text-base">Insert image</h3>
          <button type="button" onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 mt-3 border-b border-gray-200">
          {(["image", "link"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors cursor-pointer ${
                tab === t
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "image" ? "Image" : "Link"}
            </button>
          ))}
        </div>

        <div className="px-6 py-5">

          {/* ════ IMAGE TAB ════ */}
          {tab === "image" && (
            <form onSubmit={submitImage} className="space-y-4">

              {/* File picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select from files</label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer">
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".webp,image/webp"
                      className="sr-only"
                      onChange={handleFile}
                    />
                    <div className={`flex items-center border rounded-md px-3 py-2 text-sm transition ${
                      uploading ? "border-blue-400 ring-2 ring-blue-400/30 bg-blue-50" : "border-blue-400 ring-2 ring-blue-400/20 bg-white hover:bg-gray-50"
                    }`}>
                      {uploading ? (
                        <span className="flex items-center gap-2 text-blue-600">
                          <Loader2 size={13} className="animate-spin" /> Uploading…
                        </span>
                      ) : (
                        <span className="text-gray-500 truncate">
                          {fileName || "Choose File   No file chosen"}
                        </span>
                      )}
                    </div>
                  </label>
                  {fileName && !uploading && (
                    <button type="button" onClick={clearFile}
                      className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                      <X size={15} />
                    </button>
                  )}
                </div>
                <p className="mt-1.5 text-xs text-gray-400">Only WebP images (.webp) under 1 MB are allowed.</p>
                {uploadErr && <p className="mt-1 text-xs text-red-500">{uploadErr}</p>}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={inputCls}
                />
              </div>

              <div className="border-t border-dashed border-gray-200" />

              {/* Alt text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Alternative text</label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Describe the image…"
                  className={inputCls}
                />
              </div>

              {/* Width / Height */}
              <div className="flex items-end gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-600">Width</span>
                  <input
                    type="text"
                    value={imgWidth}
                    onChange={(e) => setImgWidth(e.target.value)}
                    placeholder="auto"
                    className="w-20 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <span className="pb-2 text-gray-400 font-medium">x</span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-600">Height</span>
                  <input
                    type="text"
                    value={imgHeight}
                    onChange={(e) => setImgHeight(e.target.value)}
                    placeholder="auto"
                    className="w-20 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <label className="pb-1 flex items-center gap-1.5 cursor-pointer select-none text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={constrain}
                    onChange={(e) => setConstrain(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                  />
                  Constrain proportions
                </label>
              </div>

              {/* Alignment + Submit */}
              <div className="flex items-center justify-between pt-1">
                <AlignRow name="rte-img-align" value={imgAlign} onChange={setImgAlign} />
                <button
                  type="submit"
                  disabled={!imageUrl.trim() || uploading}
                  className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </form>
          )}

          {/* ════ LINK TAB ════ */}
          {tab === "link" && (
            <form onSubmit={submitLink} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL to link</label>
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className={`${inputCls} pr-10`}
                  />
                  <Bookmark size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Text to display</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text"
                  className={inputCls}
                />
              </div>

              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600">
                  <input type="checkbox" checked={newWindow} onChange={(e) => setNewWindow(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                  Open in new window
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600">
                  <input type="checkbox" checked={downloadLink} onChange={(e) => setDownloadLink(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                  Download link
                </label>
              </div>

              {/* Alignment + Submit */}
              <div className="flex items-center justify-between pt-1">
                <AlignRow name="rte-link-align" value={linkAlign} onChange={setLinkAlign} />
                <button
                  type="submit"
                  disabled={!linkUrl.trim()}
                  className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
    </Portal>
  );
}

/* ══════════════════════════════════════════════════
   TABLE GRID PICKER
══════════════════════════════════════════════════ */

function TablePicker({ onSelect }: { onSelect: (rows: number, cols: number) => void }) {
  const [hover, setHover] = useState({ r: 0, c: 0 });
  const MAX = 10;

  return (
    <div className="absolute top-full left-0 mt-1.5 p-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
      <div
        className="grid gap-0.75"
        style={{ gridTemplateColumns: `repeat(${MAX}, 1.25rem)` }}
        onMouseLeave={() => setHover({ r: 0, c: 0 })}
      >
        {Array.from({ length: MAX * MAX }).map((_, i) => {
          const r = Math.floor(i / MAX) + 1;
          const c = (i % MAX) + 1;
          const active = r <= hover.r && c <= hover.c;
          return (
            <div
              key={i}
              className={`w-5 h-5 rounded-[3px] border cursor-pointer transition-colors ${
                active
                  ? "bg-blue-200 border-blue-400"
                  : "bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200"
              }`}
              onMouseEnter={() => setHover({ r, c })}
              onClick={() => hover.r > 0 && hover.c > 0 && onSelect(hover.r, hover.c)}
            />
          );
        })}
      </div>
      <p className="text-center text-xs font-medium mt-2 text-gray-500">
        {hover.r > 0 ? `${hover.c} × ${hover.r}` : "Select table size"}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   TOOLBAR PRIMITIVES
══════════════════════════════════════════════════ */

function Btn({
  onClick, children, active, disabled, tooltip,
}: {
  onClick: () => void;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
}) {
  return (
    <div className="relative group/btn">
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); if (!disabled) onClick(); }}
        disabled={disabled}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer ${
          active
            ? "bg-white text-gray-900 shadow-sm border border-gray-300"
            : "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm hover:border hover:border-gray-300 border border-transparent"
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        {children}
      </button>

      {/* Custom tooltip */}
      {tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium bg-gray-800 text-white rounded-md whitespace-nowrap opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-opacity z-50">
          {tooltip}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
}

function Sep() {
  return <div className="w-px h-5 bg-gray-300 mx-1 self-center shrink-0" />;
}