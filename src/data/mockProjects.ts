import type { Project } from "../types/project";

/**
 * Ordered by recency within each status (most recently touched first) --
 * Home and the Projects list both read position 0 of the active set as the
 * one project that gets the accent rule, per the style guide's "exactly one
 * orange per region" rule.
 */
export const mockProjects: Project[] = [
  {
    id: "personal-dashboard",
    name: "Personal Dashboard",
    status: "active",
    log: [
      { id: "pd-1", timestamp: "3 Sep", note: "Scaffolded the repo: Vite + React + TS, Cloudflare Pages Functions." },
      { id: "pd-2", timestamp: "Mon", note: "Wrote PRODUCT.md and locked the behavior decisions in CLAUDE.md." },
      {
        id: "pd-3",
        timestamp: "2h ago",
        note: "Left off picking type pairings — palette locked, waiting on the Home comp.",
      },
    ],
  },
  {
    id: "bettabase-cloudflare",
    name: "Bettabase → Cloudflare",
    status: "active",
    log: [
      { id: "bc-1", timestamp: "last week", note: "Decided to migrate off Supabase once the schema stabilizes." },
      { id: "bc-2", timestamp: "Tue", note: "Schema exported. Next: D1 import and rewrite the water-log endpoint." },
    ],
  },
  {
    id: "kingshot-guide-rewrite",
    name: "Kingshot guide rewrite",
    status: "someday",
    log: [{ id: "kg-1", timestamp: "2 weeks ago", note: "Old notes are scattered across three apps — worth consolidating whenever there's a slow week." }],
  },
  {
    id: "portfolio-css-project",
    name: "DIY CSS portfolio piece",
    status: "someday",
    log: [{ id: "pc-1", timestamp: "3 weeks ago", note: "Idea: build a small CSS-only toy to show off in the portfolio. No rush." }],
  },
];
