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

### Later session (theme toggle, tabbed Settings)

- Added `src/state/ThemeContext.tsx` (new): a real Light/Dark/Match-system theme toggle backed by `localStorage["pd-theme"]`, layered on top of the prior system-only dark mode; wired into the app via a `ThemeProvider` in `src/App.tsx`.
- Added a tiny inline boot script in `index.html` that applies the stored theme before paint, so there's no flash on load/reload.
- Extended `src/index.css` dark-mode tokens to agree across three paths: OS preference, a manual `data-theme="dark"` override, or a manual `data-theme="light"` override that holds even when the OS is dark.
- Rebuilt `src/screens/SettingsScreen.tsx` with an Appearance / Habits / Account tab bar (reusing the existing underline-tab pattern from the Projects Active/Someday tabs), moving the reminder list and log out/backup rows behind tabs and adding a Sun/Moon/Desktop theme picker with an accent check for the active choice.
- Verified with typecheck, lint, the impeccable layout-detector scan, and a live check in Chrome at desktop and mobile widths — theme switching is instant across the whole shell, survives a full reload with no flash, and all three tabs preserve their original behavior.
- Committed this session's work together with the previously uncommitted "Later session" work above (Captures/Projects linking, Home shortcuts removal) as a single commit (`202a173`), then pushed to `origin/master`.

## 2026-09-14 session summary

- Ran `/impeccable` against `src/screens/SettingsScreen.tsx` per the user's request to add the missing dark/light mode toggle and consider tabbed navigation for settings topics.
- Added `src/state/ThemeContext.tsx` (new) — Light/Dark/Match-system theme state backed by `localStorage["pd-theme"]`, applying `data-theme` on `<html>`; wired in via `ThemeProvider` in `src/App.tsx`.
- Edited `index.html` (pre-paint boot script to avoid a theme flash) and `src/index.css` (dark tokens now agree across OS preference, manual `data-theme="dark"`, and manual `data-theme="light"` override paths).
- Rewrote `src/screens/SettingsScreen.tsx` with an Appearance / Habits / Account tab bar and a Sun/Moon/Desktop theme picker, reusing the app's existing underline-tab and check-row idioms.
- Verified with `npm run typecheck`, `npm run lint`, the impeccable layout-detector scan, and a live check in Chrome at desktop and mobile widths — all clean; this work was folded into commit `202a173` (see entry above).

### Later session (form field visibility)

- Ran `/frontend-design` per the user's request: form fields were `bg-transparent` with a ~18%-opacity hairline border, visually indistinguishable from static text or list dividers until focused.
- Added `--field-fill` / `--field-border` tokens (light mode + both dark paths) and a shared `.field-input` class in `src/index.css` — a paper-bright resting fill, a visible resting border (up from the near-invisible hairline), a solid ink border on focus, and a 150ms transition with no layout shift.
- Applied `.field-input` to every real form field: `CaptureScreen.tsx`'s two textareas, `ProjectDetailScreen.tsx`'s "where I left off" note, `GuidesScreen.tsx`'s title/category/body fields, `HabitsScreen.tsx`'s habit name/schedule fields, `SettingsScreen.tsx`'s per-habit reminder-time input, and `TopStrip.tsx`'s persistent search bar (icon + input wrapped as one field).
- Verified visually in Chrome across Capture/Habits/Guides/Settings in both light and dark mode, at rest and focused; `npm run typecheck` and `npm run lint` both clean.
- Flagged an open follow-up, not yet built: a `:focus-visible` outline for keyboard-only users, beyond the border-color change.

### Later session (icon size normalization)

- Per the user's request, standardized every Phosphor icon's `size` prop to `22` across the app — previously sizes varied ad hoc from 12 to 23 depending on context (nav, add buttons, edit/delete, back arrows, checkmarks, search, etc.).
- Changed all 39 `size={...}` occurrences across 11 files: `CaptureScreen.tsx`, `GuideDetailScreen.tsx`, `GuidesScreen.tsx`, `SettingsScreen.tsx`, `HabitsScreen.tsx`, `ProjectsScreen.tsx`, `ProjectDetailScreen.tsx`, `components/home/HabitsSection.tsx`, `components/layout/BottomNav.tsx`, `components/layout/TopStrip.tsx`, `components/layout/QuickCaptureFab.tsx`.
- Verified with `npm run typecheck` — clean, no other changes needed.
