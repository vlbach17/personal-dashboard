import { createContext, useContext, useState, type ReactNode } from "react";
import type { Guide } from "../types/guide";
import { mockGuides } from "../data/mockGuides";

interface GuidesContextValue {
  guides: Guide[];
  addGuide: (title: string, category: string, body: string) => void;
  updateGuide: (id: string, patch: Partial<Pick<Guide, "title" | "category" | "body">>) => void;
  deleteGuide: (id: string) => void;
}

const GuidesContext = createContext<GuidesContextValue | null>(null);

function makeId() {
  return `guide-${Math.random().toString(36).slice(2, 9)}`;
}

export function GuidesProvider({ children }: { children: ReactNode }) {
  const [guides, setGuides] = useState<Guide[]>(mockGuides);

  function addGuide(title: string, category: string, body: string) {
    setGuides((current) => [
      { id: makeId(), title, category: category || "Uncategorized", updatedLabel: "just now", body },
      ...current,
    ]);
  }

  function updateGuide(id: string, patch: Partial<Pick<Guide, "title" | "category" | "body">>) {
    setGuides((current) =>
      current.map((g) => (g.id === id ? { ...g, ...patch, updatedLabel: "just now" } : g)),
    );
  }

  function deleteGuide(id: string) {
    setGuides((current) => current.filter((g) => g.id !== id));
  }

  return (
    <GuidesContext.Provider value={{ guides, addGuide, updateGuide, deleteGuide }}>
      {children}
    </GuidesContext.Provider>
  );
}

export function useGuides() {
  const ctx = useContext(GuidesContext);
  if (!ctx) throw new Error("useGuides must be used within GuidesProvider");
  return ctx;
}
