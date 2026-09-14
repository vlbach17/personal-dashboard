export interface Capture {
  id: string;
  text: string;
  /** Display string, e.g. "2h ago", "Yesterday". */
  createdAtLabel: string;
  /** Set once this capture is converted -- the project it became. Never both a capture and unlinked. */
  projectId: string | null;
}
