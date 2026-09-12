import { useState } from "react";
import { Copy, FolderSimple, PencilSimple, Trash, X } from "@phosphor-icons/react";
import { mockCaptures } from "../data/mockCaptures";
import type { Capture } from "../types/capture";

function makeId() {
  return `capture-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * One open input, no forced categories -- as fast as a sticky note. Smart
 * duplicate/related-topic detection on convert-to-project is flagged in
 * CLAUDE.md as "a real feature to scope," not a trivial add, so convert here
 * only marks the capture as converted; it doesn't create or link an actual
 * project (there's no shared store across screens yet -- see Home/Projects).
 */
export function CaptureScreen() {
  const [captures, setCaptures] = useState<Capture[]>(mockCaptures);
  const [draftText, setDraftText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function submitCapture() {
    const text = draftText.trim();
    if (!text) return;
    setCaptures((current) => [
      { id: makeId(), text, createdAtLabel: "just now", convertedToProject: false },
      ...current,
    ]);
    setDraftText("");
  }

  function copyCapture(capture: Capture) {
    navigator.clipboard?.writeText(capture.text).catch(() => {});
    setCopiedId(capture.id);
    setTimeout(() => setCopiedId((current) => (current === capture.id ? null : current)), 1500);
  }

  function convertCapture(id: string) {
    setCaptures((current) => current.map((c) => (c.id === id ? { ...c, convertedToProject: true } : c)));
  }

  function startEdit(capture: Capture) {
    setEditingId(capture.id);
    setEditText(capture.text);
  }

  function saveEdit() {
    if (!editText.trim()) return;
    setCaptures((current) =>
      current.map((c) => (c.id === editingId ? { ...c, text: editText.trim() } : c)),
    );
    setEditingId(null);
  }

  function deleteCapture(id: string) {
    setCaptures((current) => current.filter((c) => c.id !== id));
    setEditingId(null);
  }

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">Capture</h1>

      <div className="mt-[26px] border-b border-hairline pb-3">
        <textarea
          value={draftText}
          onChange={(event) => setDraftText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submitCapture();
            }
          }}
          placeholder="Capture a thought…"
          rows={2}
          className="w-full resize-none bg-transparent text-[18px] leading-[23px] text-ink placeholder:text-label focus:outline-none"
        />
        <button type="button" onClick={submitCapture} className="mt-2 font-mono text-xs text-accent-text">
          Capture
        </button>
      </div>

      {captures.length === 0 ? (
        <p className="mt-[34px] text-[18px] text-body">Nothing captured yet.</p>
      ) : (
        <ul className="mt-[8px]">
          {captures.map((capture) => (
            <li key={capture.id} className="border-b border-hairline py-3.5">
              {editingId === capture.id ? (
                <div className="flex flex-col gap-2.5">
                  <textarea
                    autoFocus
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    rows={2}
                    className="w-full resize-none border-b border-hairline bg-transparent text-[15px] leading-[23px] text-body focus:border-ink focus:outline-none"
                  />
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={saveEdit} className="font-mono text-xs text-accent-text">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1 font-mono text-xs text-label"
                    >
                      <X size={12} /> Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCapture(capture.id)}
                      className="ml-auto flex items-center gap-1.5 font-mono text-xs text-accent-text"
                    >
                      <Trash size={14} /> Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p
                    className={`text-[15px] leading-[23px] text-pretty ${
                      capture.convertedToProject ? "text-done line-through decoration-2 decoration-accent" : "text-body"
                    }`}
                  >
                    {capture.text}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="font-mono text-xs text-data">{capture.createdAtLabel}</span>
                    {capture.convertedToProject ? (
                      <span className="flex items-center gap-1 font-mono text-xs text-accent-text">
                        <FolderSimple size={14} /> converted
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => copyCapture(capture)}
                          className="flex items-center gap-1 font-mono text-xs text-label"
                        >
                          <Copy size={14} /> {copiedId === capture.id ? "copied" : "copy"}
                        </button>
                        <button
                          type="button"
                          onClick={() => convertCapture(capture.id)}
                          className="flex items-center gap-1 font-mono text-xs text-label"
                        >
                          <FolderSimple size={14} /> to project
                        </button>
                        <button
                          type="button"
                          onClick={() => startEdit(capture)}
                          aria-label="Edit capture"
                          className="ml-auto text-ink"
                        >
                          <PencilSimple size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
