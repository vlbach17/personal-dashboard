import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, FolderSimple, PencilSimple, Trash, X } from "@phosphor-icons/react";
import { useCaptures } from "../state/CapturesContext";
import { useProjects } from "../state/ProjectsContext";
import type { Capture } from "../types/capture";

/**
 * One open input, no forced categories -- as fast as a sticky note. Smart
 * duplicate/related-topic detection on convert-to-project is flagged in
 * CLAUDE.md as "a real feature to scope," not a trivial add -- convert here
 * just creates a new active project from the capture's own text and links
 * the two, with no matching against existing projects yet.
 */
export function CaptureScreen() {
  const { captures, addCapture, updateCapture, deleteCapture, linkToProject } = useCaptures();
  const { addProject } = useProjects();
  const [draftText, setDraftText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function submitCapture() {
    const text = draftText.trim();
    if (!text) return;
    addCapture(text);
    setDraftText("");
  }

  function copyCapture(capture: Capture) {
    navigator.clipboard?.writeText(capture.text).catch(() => {});
    setCopiedId(capture.id);
    setTimeout(() => setCopiedId((current) => (current === capture.id ? null : current)), 1500);
  }

  function convertCapture(capture: Capture) {
    const project = addProject(capture.text, "active");
    linkToProject(capture.id, project.id);
  }

  function startEdit(capture: Capture) {
    setEditingId(capture.id);
    setEditText(capture.text);
  }

  function saveEdit() {
    if (!editText.trim() || !editingId) return;
    updateCapture(editingId, editText.trim());
    setEditingId(null);
  }

  function removeCapture(id: string) {
    deleteCapture(id);
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
                      onClick={() => removeCapture(capture.id)}
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
                      capture.projectId ? "text-done line-through decoration-2 decoration-accent" : "text-body"
                    }`}
                  >
                    {capture.text}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="font-mono text-xs text-data">{capture.createdAtLabel}</span>
                    {capture.projectId ? (
                      <Link
                        to={`/projects/${capture.projectId}`}
                        className="flex items-center gap-1 font-mono text-xs text-accent-text"
                      >
                        <FolderSimple size={14} /> converted
                      </Link>
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
                          onClick={() => convertCapture(capture)}
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
