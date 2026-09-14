# Changelog

## 2026-09-11 session summary

- User handed UI design work over to Claude Design; this session paused frontend/UI work and stayed on backend/infra/admin tasks in the meantime.
- Committed and pushed the pending `docs/TASK_LIST.md` edit checking off "Evaluate the Subframe design tool/plugin" (decided not to adopt Subframe for this project; the design/branch cleanup itself had already happened, this session finalized the commit — `3afcc35`).
- No frontend, backend, or config code was changed this session.

## 2026-09-12 session summary

- Scaffolded the Vite + React + TypeScript frontend and Cloudflare Pages Functions backend (Tailwind v4, Phosphor icons, `functions/api/health.ts`), verified end-to-end via `wrangler pages dev`.
- Filled in `CLAUDE.md`'s Commands and Project Structure sections with real values.
- Created `docs/TASK_LIST.md` to track setup and build progress.
- Added a SessionEnd hook (`.claude/settings.json`) that auto-summarizes each session's file changes into `docs/CHANGELOG.md`, then extended it to also review and update `docs/TASK_LIST.md`.
- Confirmed `npm run build`, `lint`, and `typecheck` all pass, then made the initial local git commit (`f915424`) scaffolding the repo — no GitHub remote or push yet.
- Confirmed a full design system (Zilla Slab + Courier Prime, halftone-dot paper ground, ink/body/accent color roles, `border-radius: 0`, "rules not cards") from `docs/brand/color_typography-design-style-guide_v1/`, superseding the earlier stock Material 3/Roboto placeholder.
- Built the shared layout/token foundation (`src/index.css` tokens, `src/components/layout/`: Ground, SectionLabel, TopStrip, Sidebar, AppShell) plus a temporary minimal sidebar nav and `PlaceholderScreen` for the screens not yet designed.
- Implemented the Home / Right Now screen end-to-end (`src/screens/HomeScreen.tsx` with Masthead, HabitsSection, ProjectsSection, BottomStrip) — interactive habit checklist, active-projects preview, floating quick-capture button, linked-app icon row — backed by mock data/types (`src/types/`, `src/data/`, `src/lib/date.ts`).
- Updated `PRODUCT.md`'s Brand Commitments and `CLAUDE.md`'s design-system entry to record the confirmed system and its Home-only implementation status.
- Updated `docs/TASK_LIST.md` to check off the design-system decision and Home screen, and to log the temporary sidebar nav as a stand-in pending real navigation design.
- Session ended with Habits, Capture, Projects, Guides, and Settings screens, plus real (non-placeholder) navigation, still to be designed and built.

## 2026-09-13 session summary

- Diagnosed a failed Cloudflare Pages build from a build log the user saved to `docs/logs/`: the dashboard's "Connect to Git" flow had defaulted the project's Deploy command to `npx wrangler deploy` (the Workers command) instead of `npx wrangler pages deploy dist`, so the build succeeded but deploy failed with "Missing entry-point to Worker script or to assets directory."
- Added a gotcha note to `docs/TASK_LIST.md` under "Connect repo to Cloudflare Pages" documenting that fix.
- After the deploy command was corrected, a second deploy attempt failed with a Cloudflare API authentication error — the project's `CLOUDFLARE_API_TOKEN` env var lacks Pages permissions. Diagnosed the cause and proposed two fixes (remove the manual token so Cloudflare auto-provisions deploy credentials, or recreate the token with Account → Cloudflare Pages → Edit permission); session ended before this was confirmed resolved.
- No frontend/backend code was changed this session.

### Later session
- Redesigned `ProjectDetailScreen.tsx` (via `/impeccable`) to add a "Created {date}" line and a merged, reverse-chron **History** section combining the existing "where I left off" log with any capture that started the project (tagged "from capture"); empty state now reads "No history yet."
- Corrected a wrong assumption mid-task: habits are never related to projects — only captures can optionally convert to and link back to a project. `Capture.convertedToProject: boolean` became `Capture.projectId: string | null`, and `Project` gained `createdLabel`, so a capture can point at the real project it became.
- Added `src/state/CapturesContext.tsx` (new, mirrors the Habits/Projects/Guides pattern) and wired it into `src/App.tsx`; `ProjectsContext.addProject` now returns the created project so a capture can link to it.
- `CaptureScreen.tsx`'s "to project" action now actually creates and links a project (previously it only flipped a fake "converted" flag); the "converted" label is now a working link to that project.
- Updated `mockCaptures.ts` / `mockProjects.ts` to match the new data model; verified with typecheck, lint, the impeccable design detector, and a live check in Chrome at mobile and desktop widths — all clean.
- Removed the Home screen's shortcuts/linked-apps icon row per explicit user decision ("this component will not be used"): deleted `src/components/home/ShortcutsSection.tsx` and its usage in `HomeScreen.tsx`.
- Updated `CLAUDE.md`'s Screens section to drop the now-removed "linked-apps cards/icons" mention from the Home / Right Now description.
