import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  PencilSimpleIcon,
  PlusCircleIcon,
  TrashSimpleIcon,
  ProhibitIcon,
  FloppyDiskIcon,
  ShareIcon,
} from "@phosphor-icons/react";
import { useNotes } from "../state/NotesContext";
import { useProjects } from "../state/ProjectsContext";
import { useHabits } from "../state/HabitsContext";
import type { Note } from "../types/note";

type LinkType = "none" | "project" | "habit";
type Draft = { title: string; category: string; body: string; linkType: LinkType; linkId: string };
const EMPTY_DRAFT: Draft = { title: "", category: "", body: "", linkType: "none", linkId: "" };
type Sort = "newest" | "title";

function draftFromNote(note: Note): Draft {
  if (note.linkedProjectId) return { title: note.title, category: note.category, body: note.body, linkType: "project", linkId: note.linkedProjectId };
  if (note.linkedHabitId) return { title: note.title, category: note.category, body: note.body, linkType: "habit", linkId: note.linkedHabitId };
  return { title: note.title, category: note.category, body: note.body, linkType: "none", linkId: "" };
}

/**
 * List rather than a card grid -- a grid would pull in the "card" surface
 * this system deliberately avoids ("rules, not cards"). Filter by category,
 * sort newest/A-Z, inline add/edit/delete per the shared list convention.
 * Notes are general-purpose (Kingshot guides included, not exclusive) and
 * can optionally link to one existing project or habit.
 */
export function NotesScreen() {
  const { notes, addNote, updateNote, deleteNote, setNoteLink } = useNotes();
  const { projects } = useProjects();
  const { habits } = useHabits();
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("newest");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [isAdding, setIsAdding] = useState(false);

  const categories = useMemo(() => ["All", ...new Set(notes.map((n) => n.category))], [notes]);

  const visible = useMemo(() => {
    const filtered = category === "All" ? notes : notes.filter((n) => n.category === category);
    return sort === "title" ? [...filtered].sort((a, b) => a.title.localeCompare(b.title)) : filtered;
  }, [notes, category, sort]);

  function startEdit(note: Note) {
    setIsAdding(false);
    setEditingId(note.id);
    setDraft(draftFromNote(note));
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
    setDraft(EMPTY_DRAFT);
  }

  function saveEdit() {
    if (!draft.title.trim()) return cancelEdit();
    const link =
      draft.linkType === "project"
        ? { projectId: draft.linkId || null, habitId: null }
        : draft.linkType === "habit"
          ? { projectId: null, habitId: draft.linkId || null }
          : { projectId: null, habitId: null };

    if (isAdding) {
      const created = addNote(draft.title.trim(), draft.category.trim(), draft.body.trim());
      if (link.projectId || link.habitId) setNoteLink(created.id, link);
    } else if (editingId) {
      updateNote(editingId, { title: draft.title.trim(), category: draft.category.trim() || "Uncategorized", body: draft.body.trim() });
      setNoteLink(editingId, link);
    }
    cancelEdit();
  }

  function linkedRoute(note: Note) {
    if (note.linkedProjectId) return `/projects/${note.linkedProjectId}`;
    if (note.linkedHabitId) return "/habits";
    return null;
  }

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">Notes</h1>

      <div className="mt-[22px] flex flex-wrap gap-x-5 gap-y-2">
        {categories.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setCategory(value)}
            className={`border-b-2 pb-1 font-mono text-xs tracking-[0.1em] uppercase ${
              category === value ? "border-accent text-ink" : "border-hairline text-label"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-3.5 flex gap-4">
        <button
          type="button"
          onClick={() => setSort("newest")}
          className={`font-mono text-xs ${sort === "newest" ? "text-accent-text" : "text-label"}`}
        >
          Newest
        </button>
        <button
          type="button"
          onClick={() => setSort("title")}
          className={`font-mono text-xs ${sort === "title" ? "text-accent-text" : "text-label"}`}
        >
          A–Z
        </button>
      </div>

      {visible.length === 0 && !isAdding && <p className="mt-[26px] text-[18px] text-body">No results found.</p>}

      <ul className="mt-[18px]">
        {visible.map((note) =>
          editingId === note.id ? (
            <li key={note.id} className="border-b border-hairline py-3.5">
              <NoteEditForm draft={draft} onChange={setDraft} onSave={saveEdit} onCancel={cancelEdit} projects={projects} habits={habits} />
              <button
                type="button"
                onClick={() => {
                  deleteNote(note.id);
                  cancelEdit();
                }}
                aria-label="Delete note"
                className="mt-2 flex items-center gap-1.5 font-mono text-xs text-accent-text"
              >
                <TrashSimpleIcon size={22} weight="duotone" />
              </button>
            </li>
          ) : (
            <li key={note.id} className="flex min-h-12 items-center gap-3.5 border-b border-hairline py-3.5">
              <Link to={`/notes/${note.id}`} className="min-w-0 flex-1">
                <div className="text-[18px] leading-[23px] text-ink">{note.title}</div>
                <div className="mt-0.5 font-mono text-xs text-label">
                  {note.category} · {note.updatedLabel}
                </div>
              </Link>
              {linkedRoute(note) && (
                <Link
                  to={linkedRoute(note)!}
                  aria-label={note.linkedProjectId ? "Linked project" : "Linked habit"}
                  title={note.linkedProjectId ? "Linked project" : "Linked habit"}
                  className="shrink-0 text-accent-text"
                >
                  <ShareIcon size={22} weight="duotone" />
                </Link>
              )}
              <button
                type="button"
                onClick={() => startEdit(note)}
                aria-label={`Edit ${note.title}`}
                className="shrink-0 text-ink"
              >
                <PencilSimpleIcon size={22} weight="duotone" />
              </button>
            </li>
          ),
        )}
      </ul>

      {isAdding ? (
        <div className="border-b border-hairline py-3.5">
          <NoteEditForm draft={draft} onChange={setDraft} onSave={saveEdit} onCancel={cancelEdit} projects={projects} habits={habits} isNew />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setDraft(EMPTY_DRAFT);
          }}
          aria-label="Add note"
          className="flex min-h-12 items-center gap-3.5 border-b border-hairline py-3.5 text-left"
        >
          <PlusCircleIcon size={22} weight="fill" className="text-accent" />
        </button>
      )}
    </div>
  );
}

function NoteEditForm({
  draft,
  onChange,
  onSave,
  onCancel,
  projects,
  habits,
  isNew = false,
}: {
  draft: Draft;
  onChange: (draft: Draft) => void;
  onSave: () => void;
  onCancel: () => void;
  projects: { id: string; name: string }[];
  habits: { id: string; label: string }[];
  isNew?: boolean;
}) {
  const linkOptions = draft.linkType === "project" ? projects.map((p) => ({ id: p.id, label: p.name })) : draft.linkType === "habit" ? habits.map((h) => ({ id: h.id, label: h.label })) : [];

  return (
    <div className="flex flex-col gap-2.5">
      <input
        autoFocus
        type="text"
        value={draft.title}
        onChange={(event) => onChange({ ...draft, title: event.target.value })}
        placeholder="Note title"
        className="field-input w-full text-[18px] text-ink"
      />
      <input
        type="text"
        value={draft.category}
        onChange={(event) => onChange({ ...draft, category: event.target.value })}
        placeholder="Category"
        className="field-input w-full font-mono text-xs text-label"
      />
      <textarea
        value={draft.body}
        onChange={(event) => onChange({ ...draft, body: event.target.value })}
        placeholder="Note content"
        rows={3}
        className="field-input w-full resize-none text-[15px] leading-[23px] text-body"
      />
      <div className="flex items-center gap-2.5">
        <select
          value={draft.linkType}
          onChange={(event) => onChange({ ...draft, linkType: event.target.value as LinkType, linkId: "" })}
          aria-label="Link to"
          className="field-input font-mono text-xs text-label"
        >
          <option value="none">No link</option>
          <option value="project">Link to project</option>
          <option value="habit">Link to habit</option>
        </select>
        {draft.linkType !== "none" && (
          <select
            value={draft.linkId}
            onChange={(event) => onChange({ ...draft, linkId: event.target.value })}
            aria-label={draft.linkType === "project" ? "Linked project" : "Linked habit"}
            className="field-input min-w-0 flex-1 font-mono text-xs text-label"
          >
            <option value="">Choose {draft.linkType}…</option>
            {linkOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSave}
          aria-label={isNew ? "Add note" : "Save note"}
          className="font-mono text-xs text-accent-text"
        >
          {isNew ? <PlusCircleIcon size={22} weight="fill" /> : <FloppyDiskIcon size={22} weight="duotone" />}
        </button>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel"
          className="flex items-center gap-1 font-mono text-xs text-label"
        >
          <ProhibitIcon size={22} weight="duotone" />
        </button>
      </div>
    </div>
  );
}
