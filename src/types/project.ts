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
  /** Display string, e.g. "3 Sep 2026" -- fixed, unlike the relative log/capture timestamps. */
  createdLabel: string;
  /** Append-only "where I left off" log, oldest first. Never overwritten -- only appended to. */
  log: ProjectLogEntry[];
}
