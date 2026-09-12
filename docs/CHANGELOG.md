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
