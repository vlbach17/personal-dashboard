import { createContext, useContext, useState, type ReactNode } from "react";
import type { Habit } from "../types/habit";
import { mockHabits } from "../data/mockHabits";

interface HabitsContextValue {
  habits: Habit[];
  toggleDoneToday: (id: string) => void;
  addHabit: (label: string, schedule: string) => void;
  updateHabit: (id: string, patch: Partial<Pick<Habit, "label" | "schedule">>) => void;
  deleteHabit: (id: string) => void;
}

const HabitsContext = createContext<HabitsContextValue | null>(null);

function makeId() {
  return `habit-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Home (daily checklist), Habits (roster management), and Settings (reminder
 * times) all need the same list of habits, so it's lifted here instead of
 * living as three disconnected mock copies.
 */
export function HabitsProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);

  function toggleDoneToday(id: string) {
    setHabits((current) => current.map((h) => (h.id === id ? { ...h, doneToday: !h.doneToday } : h)));
  }

  function addHabit(label: string, schedule: string) {
    setHabits((current) => [...current, { id: makeId(), label, schedule: schedule || "—", doneToday: false }]);
  }

  function updateHabit(id: string, patch: Partial<Pick<Habit, "label" | "schedule">>) {
    setHabits((current) => current.map((h) => (h.id === id ? { ...h, ...patch } : h)));
  }

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((h) => h.id !== id));
  }

  return (
    <HabitsContext.Provider value={{ habits, toggleDoneToday, addHabit, updateHabit, deleteHabit }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used within HabitsProvider");
  return ctx;
}
