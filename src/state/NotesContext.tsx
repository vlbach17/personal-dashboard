import { createContext, useContext, useState, type ReactNode } from "react";
import type { Note } from "../types/note";
import { mockNotes } from "../data/mockNotes";

interface NotesContextValue {
  notes: Note[];
  addNote: (title: string, category: string, body: string) => Note;
  updateNote: (id: string, patch: Partial<Pick<Note, "title" | "category" | "body">>) => void;
  deleteNote: (id: string) => void;
  setNoteLink: (id: string, link: { projectId: string | null; habitId: string | null }) => void;
}

const NotesContext = createContext<NotesContextValue | null>(null);

function makeId() {
  return `note-${Math.random().toString(36).slice(2, 9)}`;
}

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(mockNotes);

  /** Returns the created note so callers can immediately set its link. */
  function addNote(title: string, category: string, body: string) {
    const note: Note = {
      id: makeId(),
      title,
      category: category || "Uncategorized",
      updatedLabel: "just now",
      body,
      linkedProjectId: null,
      linkedHabitId: null,
    };
    setNotes((current) => [note, ...current]);
    return note;
  }

  function updateNote(id: string, patch: Partial<Pick<Note, "title" | "category" | "body">>) {
    setNotes((current) =>
      current.map((n) => (n.id === id ? { ...n, ...patch, updatedLabel: "just now" } : n)),
    );
  }

  function deleteNote(id: string) {
    setNotes((current) => current.filter((n) => n.id !== id));
  }

  /** A note links to at most one project or habit -- setting one clears the other. */
  function setNoteLink(id: string, link: { projectId: string | null; habitId: string | null }) {
    setNotes((current) =>
      current.map((n) =>
        n.id === id
          ? { ...n, linkedProjectId: link.projectId, linkedHabitId: link.habitId, updatedLabel: "just now" }
          : n,
      ),
    );
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, setNoteLink }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}
