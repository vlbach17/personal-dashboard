# Task List

Derived from `personal-dashboard-plan.md` and `CLAUDE.md`. Update as decisions are made and work progresses.

## 0. Decisions Needed Before/During Build

- [x] Pick edit/delete interaction pattern — decided: edit icon, used consistently everywhere
- [ ] Pick PWA icon and short name
- [ ] Scope the mechanism for Claude Code auto-logging project "where I left off" notes when a session ends without a manual note
- [ ] Decide if Betta quick-log capture needs special handling once Bettabase moves off Supabase to Cloudflare

## 1. Project Setup

- [x] Scaffold repo: Vite + React (frontend) + Cloudflare Pages Functions (backend), TypeScript, npm, Tailwind config, Phosphor icons
- [x] Fill in `CLAUDE.md` Commands and Project Structure sections
- [ ] Set up GitHub repo (remote + push) — local git initialized, not yet connected to a remote
- [ ] Connect repo to Cloudflare Pages
- [ ] Provision Cloudflare D1 database, then fill in the `d1_databases` binding in `wrangler.jsonc`
- [ ] Provision Cloudflare R2 bucket (if/when needed), then fill in the `r2_buckets` binding in `wrangler.jsonc`
- [ ] Configure Cloudflare Access (magic link auth, persistent session)
- [ ] Point vanessab.design (Namecheap) at Cloudflare
- [ ] Set a Cloudflare spending alert (day-one safety net)
- [ ] Enable D1 backup/export from day one
- [ ] Fill in `CLAUDE.md` Database and Conventions sections once the schema and code conventions exist

## 2. Core Screens

- [ ] Login (Cloudflare Access magic link)
- [ ] Home / Right Now — today's habit checklist, active projects preview (1–3 cards), persistent floating quick-capture button, linked-apps cards/icons
- [ ] Habits — list, add, per-habit settings incl. reminder time
- [ ] Capture — open input, reverse-chron list, convert-to-project action
- [ ] Projects — Active / Someday tabs, detail view with running "where I left off" log
- [ ] Guides — grid/list, add, filter/sort, detail/read view
- [ ] Settings/Account — manage all habit reminder times, log out, manual backup/export trigger
- [ ] Empty states for every list view (consistent, plain-language copy)
- [ ] First-open/install flow guiding the user to add to home screen (needed for push notifications)

## 3. Navigation & Search

- [ ] Mobile hamburger menu → sidebar
- [ ] Desktop sidebar (per reference wireframe photo)
- [ ] Shared search bar across habits, captures, projects, guides
- [ ] Search empty state ("No results found")

## 4. Feature Behavior

- [ ] Habit tracker: custom reminder time per habit, quiet reset on a miss (no streak-shaming)
- [ ] Capture: fast single input, no forced categories
- [ ] Capture → Project conversion with smart duplicate/related-topic detection
- [ ] Project tracker: Active vs. Someday split, no due dates on Someday, running (not overwritten) "where I left off" log
- [ ] Kingshot guide database: stored in D1, simple in-app editor, filter/sort by category or tag
- [ ] Notification permission prompt triggered only on first habit reminder set (not first app open)
- [ ] Notifications follow current timezone, not home timezone
- [ ] Copy option on captures/notes
- [ ] Session stays signed in (no aggressive timeout)
- [ ] Dark mode designed in from the start (not bolted on later)

## 5. Linked-Out Apps (not built in)

- [ ] Add linked-app cards/icons for Markdown Press and DSM artifact tools
- [ ] Add link to Spunk's Bettabase
- [ ] Once Bettabase migrates to Cloudflare: add a quick water-log shortcut from the floating capture button

## 6. Notifications & Scheduling

- [ ] Set up Web Push
- [ ] Set up Cloudflare Cron Triggers for scheduled reminders

## 7. Explicitly Out of Scope for v1 (do not build)

- Lovable / Supabase for this app

## 8. Automation

- [x] `CLAUDE.md` scaffolded and filled in from the plan
- [x] Session-end hook added to summarize changes into `docs/CHANGELOG.md`
- [x] Session-end hook extended to also review and update this task list
