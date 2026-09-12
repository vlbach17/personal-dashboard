export interface ProjectLogEntry {
  id: string;
  /** Display string, e.g. "2h ago", "Tue". */
  timestamp: string;
  note: string;
}

export interface Project {
  id: string;
  name: string;
  status: "active" | "someday";
  /** Append-only "where I left off" log, oldest first. Never overwritten -- only appended to. */
  log: ProjectLogEntry[];
}
