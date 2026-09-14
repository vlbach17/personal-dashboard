import { createContext, useContext, useState, type ReactNode } from "react";
import type { Capture } from "../types/capture";
import { mockCaptures } from "../data/mockCaptures";

interface CapturesContextValue {
  captures: Capture[];
  addCapture: (text: string) => void;
  updateCapture: (id: string, text: string) => void;
  deleteCapture: (id: string) => void;
  linkToProject: (id: string, projectId: string) => void;
}

const CapturesContext = createContext<CapturesContextValue | null>(null);

function makeId() {
  return `capture-${Math.random().toString(36).slice(2, 9)}`;
}

/** Capture and each project's detail view (related-capture history) both need the same list, so it's lifted here. */
export function CapturesProvider({ children }: { children: ReactNode }) {
  const [captures, setCaptures] = useState<Capture[]>(mockCaptures);

  function addCapture(text: string) {
    setCaptures((current) => [{ id: makeId(), text, createdAtLabel: "just now", projectId: null }, ...current]);
  }

  function updateCapture(id: string, text: string) {
    setCaptures((current) => current.map((c) => (c.id === id ? { ...c, text } : c)));
  }

  function deleteCapture(id: string) {
    setCaptures((current) => current.filter((c) => c.id !== id));
  }

  /** Marks a capture as converted by pointing it at the project it became. */
  function linkToProject(id: string, projectId: string) {
    setCaptures((current) => current.map((c) => (c.id === id ? { ...c, projectId } : c)));
  }

  return (
    <CapturesContext.Provider value={{ captures, addCapture, updateCapture, deleteCapture, linkToProject }}>
      {children}
    </CapturesContext.Provider>
  );
}

export function useCaptures() {
  const ctx = useContext(CapturesContext);
  if (!ctx) throw new Error("useCaptures must be used within CapturesProvider");
  return ctx;
}
