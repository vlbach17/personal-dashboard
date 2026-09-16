# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript (frontend), Cloudflare Pages Functions (backend/API routes), Cloudflare D1 (database), Tailwind CSS, Phosphor icons. Decided prior to this session; see `CLAUDE.md`. Installable as a PWA (add-to-home-screen) so Web Push notifications work — this stays platform `web` per Impeccable's definition (a PWA/mobile web is not a native design language).

## Users

Single user (Vanessa) only — this is a personal, single-tenant dashboard, not a multi-user product. She uses it daily/weekly across Windows, Mac, iPhone, and iPad to run ADHD-friendly daily/weekly routines: checking off habits, capturing stray thoughts/tasks instantly, tracking active projects with a running "where I left off" log, and reading/editing a personal Kingshot (mobile game) guide database. She also uses several other apps day-to-day (Markdown Press, DSM artifact tools, Spunk's Bettabase) that this dashboard links out to rather than replacing.

## Product Purpose

Replace a scattered set of habit/task/notes tools with one always-signed-in home base that matches how she actually works with ADHD: near-zero friction to capture a thought, no shame mechanics on habits, and a running log per project instead of a single overwritten status line. Success is daily/weekly return use without dread — checking habits, capturing something in seconds, and picking a project back up without having to reconstruct context.

## Positioning

Not a general-purpose productivity app — it is deliberately narrow and personal, built around specific behavior decisions (no streak-shaming, no forced categories on capture, no due dates on "Someday" projects, running not overwritten resume-logs) that off-the-shelf habit/task tools don't offer, plus a built-in notes tool (general-purpose, with the Kingshot guide content living there too) no general tool would include. It also intentionally links out to, rather than absorbs, adjacent tools already in daily use (Markdown Press, DSM artifact tools, Bettabase).

## Operating Context

Daily/weekly use, always signed in via Cloudflare Access magic link (no aggressive session timeout). Always-online (no offline mode needed). Notifications must follow the device's current timezone, not a fixed home timezone. Must be installed to the home screen first (guided first-open flow) because Web Push only works post-install. A persistent floating quick-capture control is reachable from anywhere in the app. One shared search bar covers habits, captures, projects, and notes — not per-section search.

## Capabilities and Constraints

- Habit tracker: create/edit/delete habits, per-habit custom reminder time, daily check-off, quiet reset on a miss (never a streak counter or red "broken" indicator).
- Capture: one open text input, no forced categories/tags, fast as a sticky note; reverse-chronological list of past captures; copy action on any capture; convert-to-project action with smart duplicate/related-topic detection against existing projects (flagged, not auto-merged).
- Projects: Active vs. Someday split; Someday has no due-date pressure; each project has a running (append-only) "where I left off" log, not a single overwritten field. Claude Code should eventually auto-append a "left off" entry when a coding session ends without one — mechanism still unscoped, flagged as an open decision, do not build silently.
- Notes: general-purpose notes stored in Cloudflare D1 (not synced from files), with a simple in-app editor and filter/sort by category or tag. Kingshot (mobile game) guides live here but aren't the only content; a note can optionally link to one existing project or habit.
- Settings/Account: manage every habit's reminder time from one screen, log out, trigger a manual D1 backup/export (D1 backups are also on by day one regardless of manual trigger use).
- Notification permission is requested only the first time a habit reminder is set — never at first app open.
- Edit/delete affordance is a single edit icon, used identically across every list (habits, captures, projects, notes) — no separate delete icon/swipe pattern.
- Empty states are plain-language with no cute filler (e.g. "No incomplete projects to display," "No habits added yet," "Nothing captured yet"); Active and Someday projects share one empty message. Search has one general "No results found" empty state, shared across content types.
- Dark mode is a first-class target from the first screen built, not a retrofit.
- Cost constraint: must run at $0/month under normal single-user load (free tiers of Pages/Workers/D1/R2/Access) — this doesn't change visual design but rules out any feature implying paid third-party services.
- Out of scope for v1: Google Calendar integration, Lovable, Supabase, any DIY CSS framework work (that's a separate portfolio project).
- Linked-out (not built in, just linked from the dashboard): Markdown Press, DSM artifact tools, Spunk's Bettabase. A quick water-log shortcut from the floating capture button is planned once Bettabase migrates off Supabase to Cloudflare — not yet, and not to be built early.

## Brand Commitments

No existing logo or name beyond the working title "Personal Dashboard" and domain `vanessab.design`. Design system direction confirmed 2026-09-12, superseding the earlier stock-M3-palette/Roboto placeholder: Zilla Slab (reading) + Courier Prime (data/labels/section headings) on a halftone-dot paper ground that deepens from a warm cream top to a mauve-grey bottom (dark: forest green), ink at `#2E3A34`/`#EFE9EA`, and a single safety-orange accent (`#FF7A1A`) used once or twice per screen and never as decoration. Structural conventions (spacing rhythm, motion restraint) still draw on M3 thinking, but the palette, type, and "rules not cards" chrome are this system's own — full spec in `docs/brand/color_typography-design-style-guide_v1/README.md`. High-fidelity for Home / Right Now, and extended (2026-09-12, on direct request) into real, working versions of Habits, Capture, Projects, Notes, and Settings — all in `src/screens/`, sharing the layout/token foundation and per-feature state contexts (`src/state/`). Primary navigation is a persistent bottom tab bar rather than a hamburger/sidebar (see Navigation in `CLAUDE.md`); Settings lives behind a top-strip gear icon instead. Desktop still has no distinct composition — content is fluid at wide viewports; ask before designing one. PWA icon and short name remain an explicitly open, undecided design decision — do not invent one without asking.

## Evidence on Hand

`docs/refs/dashboard_low-fi_wireframe-v1.jpeg` — hand-drawn low-fi mobile Home wireframe, added 2026-09-11. Confirms: search bar + menu icon in the top strip; a "Habit/Selfcare" section and a "Projects" section (each with a small link-out affordance beside its heading — folded into the comp as "View all"); project entries pair a last-update timestamp with the project name, resume note below; a linked-apps icon row along the bottom with more icons sketched (KS Guide, BettaBase, Dev Stack, Roadmap, MD Press, plus an empty slot) than the 3 currently documented — resolved 2026-09-11: the written docs (Markdown Press, DSM artifact tools, Bettabase) stay the source of truth for now; the sketch's extra icons are not built without a separate ask; a bottom-right circled quick-capture control with a "nested Betta quick capture" note, matching the already-planned FAB + future Betta shortcut; an "if bored tasks / Calendar v2 / G.cal" idea explicitly crossed out, confirming Google Calendar integration stays deferred.

Desktop sidebar layout photo: still referenced but not present as a file in this repo — physical/external reference only, do not fabricate its contents; ask if it's needed for a specific layout decision.

## Product Principles

1. Friction is the enemy for capture and habit check-off; every other requirement bends around keeping those two actions near-instant.
2. No shame mechanics, ever — habits, streaks, and misses are always presented quietly and neutrally.
3. State is layered, not overwritten — project history (resume logs) and captures accumulate; nothing silently replaces prior entries.
4. The app is a hub, not a monopoly — it deliberately links out to already-adopted tools instead of rebuilding them.
5. Dark mode and mobile/tablet/desktop responsiveness are load-bearing requirements from the first screen, not later passes.

## Accessibility & Inclusion

No specific standard (e.g. WCAG level) or sensory constraint (motion, contrast, colorblindness) was required beyond the ADHD-friendly behavioral decisions already captured under Capabilities and Constraints (no streak-shaming, plain-language empty states, quiet habit resets). Confirmed explicitly: standard contrast/motion defaults are acceptable — no reduced-motion-by-default, no forced high-contrast, no colorblind-safe-palette requirement beyond ordinary good practice.
