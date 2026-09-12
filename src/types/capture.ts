export interface Capture {
  id: string;
  text: string;
  /** Display string, e.g. "2h ago", "Yesterday". */
  createdAtLabel: string;
  convertedToProject: boolean;
}
