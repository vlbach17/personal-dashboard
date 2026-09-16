export interface Note {
  id: string;
  title: string;
  category: string;
  /** Display string, e.g. "3 days ago". */
  updatedLabel: string;
  body: string;
  linkedProjectId: string | null;
  linkedHabitId: string | null;
}
