import type { Habit } from "../types/habit";

export const mockHabits: Habit[] = [
  { id: "meds", label: "Meds", schedule: "07:40", doneToday: true },
  { id: "water", label: "Water, 60oz", schedule: "all day", doneToday: false },
  { id: "stretch", label: "Stretch, 10 min", schedule: "18:00", doneToday: false },
  { id: "outside", label: "Step outside", schedule: "—", doneToday: false },
];
