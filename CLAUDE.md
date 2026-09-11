# CLAUDE.md

Guidance for Claude Code when working in this repo. Keep this file short and current — prune anything that goes stale.

## Project Overview

A personal dashboard, accessible on mobile, tablet, and desktop (Windows, Mac, iPhone, iPad), for daily/weekly use. Combines built-in ADHD-friendly tools (habit tracker, quick capture, project tracker, guide database) with quick links to other apps already in use (Markdown Press, DSM artifact tools, Bettabase).

## Tech Stack

- **Build:** Claude Code (main driver)
- **UI Design:** Claude Design
- **Framework:** Vite + React (frontend), Cloudflare Pages Functions (backend/API routes) — Hono was considered and passed on; see decision note below
- **Language:** TypeScript
- **Package manager:** npm
- **Version Control:** GitHub
- **Hosting:** Cloudflare Pages / Workers
- **Domain:** vanessab.design (registered via Namecheap, pointed at Cloudflare)
- **Database:** Cloudflare D1
- **File Storage:** Cloudflare R2 (if/when needed)
- **Auth:** Cloudflare Access (magic link, persistent session — stay signed in)
- **CSS:** Tailwind
- **Icons:** Phosphor
- **Notifications:** Web push + Cloudflare Cron Triggers for scheduling
- **Design system:** Material Design 3 (M3) principles (spacing, elevation, color roles, motion), while keeping Vanessa's own color palette/personality
- **Cost target:** $0/month under normal single-user use (free tiers on Pages, Workers, D1, R2, Access); set a Cloudflare spending alert on day one

## Commands

- Install: `npm install`
- Dev server (frontend only, HMR): `npm run dev`
- Dev server (full stack incl. Pages Functions + bindings, closer to prod): `npm run pages:dev`
- Build: `npm run build`
- Test: `TODO` — no test setup yet
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Deploy: `npm run deploy` (builds, then `wrangler pages deploy`)

## Project Structure

- `src/` — React frontend (Vite)
- `functions/` — Cloudflare Pages Functions (backend/API routes), file-based routing under `functions/api/`
- `wrangler.jsonc` — Cloudflare Pages config; D1/R2 bindings are commented out until those resources are provisioned (see `docs/TASK_LIST.md`)
- `tsconfig.app.json` / `tsconfig.node.json` / `tsconfig.functions.json` — separate TS project references for the frontend, Vite config, and Pages Functions (functions/ needs `@cloudflare/workers-types`, not DOM types)

## Screens

- Login (Cloudflare Access magic link)
- Home / Right Now — today's habit checklist, active projects preview (1–3 cards: name + last resume note), persistent floating quick-capture button, linked-apps cards/icons
- Habits (list + add + per-habit settings incl. reminder time)
- Capture (input + reverse-chron list of past captures; convert-to-project action)
- Projects (Active / Someday tabs; detail view with running "where I left off" log)
- Guides (grid/list + add + filter/sort + detail/read view)
- Settings/Account (manage all habit reminder times in one place, log out, manual backup/export trigger)
- Empty states and first-open/install flow

## Navigation

- Mobile: hamburger menu opens as a sidebar
- Desktop: sidebar per the reference wireframe photo
- Search bar across all content (habits, captures, projects, guides) — one shared bar, not per-section

## Key Behavior Decisions

- **Empty states:** consistent, plain-language, no cute filler (e.g., "No incomplete projects to display," "No habits added yet," "Nothing captured yet"). Active and Someday projects share one empty message.
- **Search empty state:** general "No results found" message.
- **Dark mode:** designed for from day one, not bolted on later.
- **Timezone:** notifications always follow current location/timezone, not fixed to home.
- **Session:** stays signed in (no aggressive timeout).
- **Share:** copy option on captures/notes.
- **Notification permission prompt:** triggered only when the first habit reminder is set (not at first app open).
- **First-open/install flow:** required — push notifications only work after the app is added to the home screen, so guide the user to install first.
- **Capture → Project conversion:** includes smart duplicate/related-topic detection (auto-flagging likely matches) — a real feature to scope, not a trivial add.
- **Backups:** Cloudflare D1 backup/export enabled from day one.
- **Offline:** not needed — always-online is fine.
- **Edit/delete pattern:** edit icon, used consistently across all lists (habits, captures, projects, guides).
- **Habits:** quiet reset on a miss, no streak-shaming/red flags.
- **Capture:** one open input, no forced categories, as fast as a sticky note.
- **Guides:** stored directly in D1 (not synced from files), simple in-app editor, filter/sort by category or tag.
- **Projects:** Active vs. Someday split, no pressure/due dates on Someday; "where I left off" is a running log per project (not overwritten each time).

## Database

<!-- D1 schema location/migrations approach once decided -->

## Conventions

<!-- Naming, file organization, component patterns, styling approach, etc. -->

## Do Not

- Don't introduce Lovable or Supabase (explicitly out of scope for this app)
- Don't bolt dark mode on later — design for it from the start
- Don't add aggressive session timeouts or streak-shaming habit UI

## Open Decisions to Respect

Don't unilaterally decide these — flag them and ask:

- PWA icon and short name
- Exact mechanism for Claude Code auto-logging project "where I left off" notes when a coding session ends without a manual note
- Whether Betta quick-log capture flow needs special handling once Bettabase moves off Supabase to Cloudflare

## Notes

- Full product plan: `personal-dashboard-plan.md`
- Framework decision: Pages Functions over Hono — this app is single-user, ~15-20 endpoints, and deeply tied to Cloudflare D1/R2/Access/Cron regardless of framework, so Hono's portability/middleware-composition benefits don't pay off here. Revisit only if the backend grows real complexity (many shared middleware needs, route count balloons); a Hono app can be dropped into a single catch-all Pages Function later without restructuring.
- Task list: `docs/TASK_LIST.md` — reviewed and updated (items checked off, new items added) at the end of every session or timeout by the same SessionEnd hook below; keep it current manually too if you finish something mid-session
- Changelog: `docs/CHANGELOG.md` — auto-appended by a SessionEnd hook (`.claude/settings.json`) that summarizes each session's file changes; don't hand-edit around it, just let it accumulate
- Linked-out apps (not built in): Markdown Press, DSM artifact tools, Spunk's Bettabase (add a quick water-log shortcut from the floating capture button once Bettabase is on Cloudflare)
