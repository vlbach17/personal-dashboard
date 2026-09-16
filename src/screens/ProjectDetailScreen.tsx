import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, FolderSimpleIcon, PlusCircleIcon } from "@phosphor-icons/react";
import { useProjects } from "../state/ProjectsContext";
import { useCaptures } from "../state/CapturesContext";
import { useNotes } from "../state/NotesContext";
import { SectionLabel } from "../components/layout/SectionLabel";

interface HistoryItem {
  id: string;
  timestamp: string;
  note: string;
  origin: "capture" | "log";
}

/** Long-reading surface -- rendered on Ground variant B (halftone over dye) via AppShell's route match. */
export function ProjectDetailScreen() {
  const { id } = useParams();
  const { projects, appendLogEntry } = useProjects();
  const { captures } = useCaptures();
  const { notes } = useNotes();
  const [note, setNote] = useState("");
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
        <Link
          to="/projects"
          aria-label="Back to Projects"
          title="Projects"
          className="flex items-center gap-1.5 font-mono text-xs text-label"
        >
          <ArrowLeftIcon size={22} weight="duotone" />
        </Link>
        <p className="mt-[34px] text-[18px] text-body">This project no longer exists.</p>
      </div>
    );
  }

  /**
   * A project's history is its originating capture(s), if any, followed by
   * its own append-only "where I left off" log -- one merged reverse-chron
   * timeline. Captures precede the log chronologically (they're what started
   * the project), so they're listed first here and land last once reversed.
   */
  const originCaptures: HistoryItem[] = captures
    .filter((capture) => capture.projectId === project.id)
    .map((capture) => ({ id: capture.id, timestamp: capture.createdAtLabel, note: capture.text, origin: "capture" }));
  const logHistory: HistoryItem[] = project.log.map((entry) => ({
    id: entry.id,
    timestamp: entry.timestamp,
    note: entry.note,
    origin: "log",
  }));
  const historyNewestFirst = [...originCaptures, ...logHistory].reverse();
  const relatedNotes = notes.filter((n) => n.linkedProjectId === project.id);

  function submitEntry() {
    if (!project) return;
    const text = note.trim();
    if (!text) return;
    appendLogEntry(project.id, text);
    setNote("");
  }

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <Link
        to="/projects"
        aria-label="Back to Projects"
        title="Projects"
        className="flex w-fit items-center gap-1.5 font-mono text-xs text-label"
      >
        <ArrowLeftIcon size={22} weight="duotone" />
      </Link>

      <div className="mt-[18px] flex items-baseline gap-3">
        <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">{project.name}</h1>
        <span className="font-mono text-xs tracking-[0.1em] text-label uppercase">
          {project.status === "active" ? "Active" : "Someday"}
        </span>
      </div>
      <div className="mt-1.5">
        <SectionLabel>Created {project.createdLabel}</SectionLabel>
      </div>

      <div className="mt-[26px] border-b border-hairline pb-3">
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Where did you leave off?"
          rows={2}
          className="field-input w-full resize-none text-[15px] leading-[23px] text-ink"
        />
        <button
          type="button"
          onClick={submitEntry}
          aria-label="Add entry"
          className="mt-2 font-mono text-xs text-accent-text"
        >
          <PlusCircleIcon size={22} weight="fill" /> 
        </button>
      </div>

      <div className="mt-[34px]">
        <SectionLabel>History</SectionLabel>
      </div>

      {historyNewestFirst.length === 0 ? (
        <p className="mt-3.5 text-[18px] text-body">No history yet.</p>
      ) : (
        <ul className="mt-3.5">
          {historyNewestFirst.map((item) => (
            <li key={item.id} className="border-b border-hairline py-3.5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-data">{item.timestamp}</span>
                {item.origin === "capture" && (
                  <span className="flex items-center gap-1 font-mono text-xs text-label">
                    <FolderSimpleIcon size={22} weight="duotone" /> from capture
                  </span>
                )}
              </div>
              <p className="mt-1 text-[15px] leading-[23px] text-pretty text-body">{item.note}</p>
            </li>
          ))}
        </ul>
      )}

      {relatedNotes.length > 0 && (
        <>
          <div className="mt-[34px]">
            <SectionLabel>Related notes</SectionLabel>
          </div>
          <ul className="mt-3.5">
            {relatedNotes.map((relatedNote) => (
              <li key={relatedNote.id} className="border-b border-hairline py-3.5">
                <Link to={`/notes/${relatedNote.id}`} className="text-[15px] leading-[23px] text-accent-text">
                  {relatedNote.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
