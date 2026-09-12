import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { useProjects } from "../state/ProjectsContext";

/** Long-reading surface -- rendered on Ground variant B (halftone over dye) via AppShell's route match. */
export function ProjectDetailScreen() {
  const { id } = useParams();
  const { projects, appendLogEntry } = useProjects();
  const [note, setNote] = useState("");
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
        <Link to="/projects" className="flex items-center gap-1.5 font-mono text-xs text-label">
          <ArrowLeft size={14} /> Projects
        </Link>
        <p className="mt-[34px] text-[18px] text-body">This project no longer exists.</p>
      </div>
    );
  }

  const entriesNewestFirst = [...project.log].reverse();

  function submitEntry() {
    if (!project) return;
    const text = note.trim();
    if (!text) return;
    appendLogEntry(project.id, text);
    setNote("");
  }

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <Link to="/projects" className="flex w-fit items-center gap-1.5 font-mono text-xs text-label">
        <ArrowLeft size={14} /> Projects
      </Link>

      <div className="mt-[18px] flex items-baseline gap-3">
        <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">{project.name}</h1>
        <span className="font-mono text-xs tracking-[0.1em] text-label uppercase">
          {project.status === "active" ? "Active" : "Someday"}
        </span>
      </div>

      <div className="mt-[26px] border-b border-hairline pb-3">
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Where did you leave off?"
          rows={2}
          className="w-full resize-none bg-transparent text-[15px] leading-[23px] text-ink placeholder:text-label focus:outline-none"
        />
        <button type="button" onClick={submitEntry} className="mt-2 font-mono text-xs text-accent-text">
          Add entry
        </button>
      </div>

      {entriesNewestFirst.length === 0 ? (
        <p className="mt-[26px] text-[18px] text-body">No log entries yet.</p>
      ) : (
        <ul className="mt-[8px]">
          {entriesNewestFirst.map((entry) => (
            <li key={entry.id} className="border-b border-hairline py-3.5">
              <span className="font-mono text-xs text-data">{entry.timestamp}</span>
              <p className="mt-1 text-[15px] leading-[23px] text-pretty text-body">{entry.note}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
