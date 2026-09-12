export interface Habit {
  id: string;
  label: string;
  /** Display string for the row's right-aligned time column, e.g. "07:40", "all day", "—". */
  schedule: string;
  doneToday: boolean;
}
