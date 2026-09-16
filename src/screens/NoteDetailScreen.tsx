import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, ShareIcon } from "@phosphor-icons/react";
import { useNotes } from "../state/NotesContext";
import { useProjects } from "../state/ProjectsContext";
import { useHabits } from "../state/HabitsContext";

/** Long-reading surface -- rendered on Ground variant B (halftone over dye) via AppShell's route match. */
export function NoteDetailScreen() {
  const { id } = useParams();
  const { notes } = useNotes();
  const { projects } = useProjects();
  const { habits } = useHabits();
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return (
      <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
        <Link
          to="/notes"
          aria-label="Back to Notes"
          title="Notes"
          className="flex w-fit items-center gap-1.5 font-mono text-xs text-label"
        >
          <ArrowLeftIcon size={22} weight="duotone" />
        </Link>
        <p className="mt-[34px] text-[18px] text-body">This note no longer exists.</p>
      </div>
    );
  }

  const linkedProject = note.linkedProjectId ? projects.find((p) => p.id === note.linkedProjectId) : undefined;
  const linkedHabit = note.linkedHabitId ? habits.find((h) => h.id === note.linkedHabitId) : undefined;

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <Link
        to="/notes"
        aria-label="Back to Notes"
        title="Notes"
        className="flex w-fit items-center gap-1.5 font-mono text-xs text-label"
      >
        <ArrowLeftIcon size={22} weight="duotone" />
      </Link>
      <div className="mt-[18px] font-mono text-xs tracking-[0.1em] text-label uppercase">
        {note.category} · {note.updatedLabel}
      </div>
      <h1 className="mt-2 text-[28px] leading-[1.2] font-semibold text-ink">{note.title}</h1>
      {(linkedProject || linkedHabit) && (
        <Link
          to={linkedProject ? `/projects/${linkedProject.id}` : "/habits"}
          className="mt-2 flex w-fit items-center gap-1.5 font-mono text-xs text-accent-text"
        >
          <ShareIcon size={22} weight="duotone" />
          Linked to {linkedProject ? linkedProject.name : linkedHabit!.label}
        </Link>
      )}
      <p className="mt-[26px] max-w-[62ch] text-[15px] leading-[23px] text-pretty text-body">{note.body}</p>
    </div>
  );
}
