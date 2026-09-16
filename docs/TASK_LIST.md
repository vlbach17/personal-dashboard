# Task List

Derived from `personal-dashboard-plan.md` and `CLAUDE.md`. Update as decisions are made and work progresses.

## 0. Decisions Needed Before/During Build

- [x] Pick edit/delete interaction pattern — decided: edit icon, used consistently everywhere
- [x] Pick color palette/design direction — decided 2026-09-11: stock Material Design 3 baseline palette ("Purple" seed) + Roboto, taken as-is; custom palette/personality deferred to a later pass. **Superseded 2026-09-12**: a full color/typography system (Zilla Slab + Courier Prime, halftone paper ground, safety-orange accent) was confirmed and implemented for Home — see `PRODUCT.md` Brand Commitments and `docs/brand/color_typography-design-style-guide_v1/`.
- [ ] Pick PWA icon and short name
- [ ] Scope the mechanism for Claude Code auto-logging project "where I left off" notes when a session ends without a manual note
- [ ] Decide if Betta quick-log capture needs special handling once Bettabase moves off Supabase to Cloudflare
- [x] Evaluate the Subframe design tool/plugin — decided 2026-09-11: not adopting it for this project yet; tried designing the root dashboard page with it, backed out before any theme/page was created. Plugin was installed via `/plugin` and a Subframe cloud project ("Dashboard") was created holding only its default empty scaffold (no custom theme, pages, or components) — nothing was synced into this repo. The `subframe-testing` git branch used for the experiment had zero commits and was deleted, back on `master`. If the Subframe plugin still shows as connected, disconnect it via `/plugin`; the empty "Dashboard" project can optionally be deleted from the Subframe web app.

## 1. Project Setup

- [x] Scaffold repo: Vite + React (frontend) + Cloudflare Pages Functions (backend), TypeScript, npm, Tailwind config, Phosphor icons
- [x] Fill in `CLAUDE.md` Commands and Project Structure sections
- [x] Write `PRODUCT.md` (Impeccable design-system product record: users, purpose, positioning, constraints, brand commitments)
- [x] Set up GitHub repo (remote + push) — created `vlbach17/personal-dashboard` (private), pushed 2026-09-11
- [ ] Connect repo to Cloudflare Pages — **gotcha (2026-09-13):** the dashboard's unified Workers & Pages "Connect to Git" flow can default the project's **Deploy command** to `npx wrangler deploy` (the Workers command), which fails on a Pages project with "Missing entry-point to Worker script or to assets directory" even though the build step succeeds. Fix in Settings → Builds & deployments → Deploy command: use `npx wrangler pages deploy dist` instead (matches the repo's own `npm run deploy`). Check this setting first if a future reconnect fails the same way.
- [ ] **Unresolved blocker (2026-09-13):** after fixing the deploy command above, the deploy step now fails with `Authentication error [code: 10000]` — the project's `CLOUDFLARE_API_TOKEN` environment variable (a User API Token) lacks Cloudflare Pages permission, even though the account itself is Super Administrator. Next step: either remove the manually-set `CLOUDFLARE_API_TOKEN` project env var and retry (Cloudflare's git-connected Pages builds may auto-provision their own scoped deploy credentials, making a manual token unnecessary/wrong), or if a manual token is required, recreate it at dash.cloudflare.com/profile/api-tokens with **Account → Cloudflare Pages → Edit** permission and update the env var as a Secret.
- [ ] Provision Cloudflare D1 database, then fill in the `d1_databases` binding in `wrangler.jsonc`
- [ ] Provision Cloudflare R2 bucket (if/when needed), then fill in the `r2_buckets` binding in `wrangler.jsonc`
- [ ] Configure Cloudflare Access (magic link auth, persistent session)
- [ ] Point vanessab.design (Namecheap) at Cloudflare
- [ ] Set a Cloudflare spending alert (day-one safety net)
- [ ] Enable D1 backup/export from day one
- [ ] Fill in `CLAUDE.md` Database and Conventions sections once the schema and code conventions exist

## 2. Core Screens

Status: the color/typography system was confirmed 2026-09-12 (`docs/brand/color_typography-design-style-guide_v1/`) and all six screens are now built as real React/Tailwind components against it, extending the confirmed Home visual language (Zilla Slab/Courier Prime, halftone ground, rules not cards) into the previously-undesigned screens since that was an explicit ask, not an inference. Data lives in per-feature React contexts (`src/state/`) seeded from mock data (`src/data/`) — no backend wiring yet, that's tracked in section 1, so nothing persists across a reload. The earlier stock-Material-3 static HTML comp is superseded. Checkboxes below track real React implementation.

- [ ] Login (Cloudflare Access magic link)
- [x] Home / Right Now — today's habit checklist, active projects preview, persistent floating quick-capture button. **Updated 2026-09-13**: the shortcuts row (linked-out apps + Guides icon) was removed per explicit user decision — see section 5
- [x] Habits — list, inline add/edit/delete, schedule text per habit (shares `HabitsContext` with Home and Settings). No reminder *scheduling* (push/cron) is wired — that's section 6.
- [x] Capture — open input, reverse-chron list, copy action, convert-to-project. **Updated 2026-09-13**: conversion now actually creates and links a real project via the new `CapturesContext` (`Capture.projectId`), not just a flag — smart duplicate/related-topic detection is still unscoped, see section 4
- [x] Projects — Active / Someday tabs, inline add/edit/delete, detail view at `/projects/:id` with the full running "where I left off" log and an append-only entry form (shares `ProjectsContext` with Home). **Updated 2026-09-13**: detail view now also shows a "Created {date}" line and merges the log with any originating capture into one reverse-chron History section (tagged "from capture")
- [x] Notes — list (not a card grid — see Navigation note below) with category filter + newest/A–Z sort, inline add/edit/delete, detail/read view at `/notes/:id` (shares `NotesContext`). **Relabeled 2026-09-14** from Guides — general-purpose notes now, Kingshot guides included but not exclusive; a note can optionally link to one existing project or habit, and Project detail shows a reverse "Related notes" section.
- [ ] Confirm the Guides→Notes rename (code + `CLAUDE.md`/`PRODUCT.md` updates) is finished, then commit and push it — still uncommitted in the working tree as of the 2026-09-15 session; a resumed session found it mid-tree and paused rather than assume it was done
- [x] Settings/Account — habit reminder *times* editable in place (shares `HabitsContext`); log out and manual backup/export are visually built but intentionally inert (Cloudflare Access and D1 aren't provisioned — see section 1). **Updated 2026-09-13**: rebuilt with an Appearance / Habits / Account tab bar; Appearance holds the new Light/Dark/Match-system theme toggle (`ThemeContext`)
- [x] Empty states for every list view (consistent, plain-language copy: "No habits added yet," "Nothing captured yet," "No active projects," "No results found," etc.)
- [ ] First-open/install flow guiding the user to add to home screen (needed for push notifications)

## 3. Navigation & Search

- [x] **Superseded 2026-09-12**: primary navigation is now a persistent bottom tab bar (`src/components/layout/BottomNav.tsx` — Home/Habits/Capture/Projects/Guides), not a hamburger + slide-out sidebar. Settings moved to a gear icon in the top strip since it isn't a daily-use screen. The quick-capture control is a separate, always-floating button (`QuickCaptureFab.tsx`) reachable from every screen except Capture itself, per CLAUDE.md. Same bar at every width — no distinct desktop composition yet (still ask before designing one; see below).
- [ ] Desktop composition (per reference wireframe photo) — the photo still isn't in this repo; content is full-bleed/fluid at wide viewports for now. Ask before designing a distinct desktop layout.
- [ ] Shared search bar across habits, captures, projects, notes — input is built and styled in the top strip but not wired to any results yet; results UI isn't designed
- [ ] Search empty state ("No results found") — copy exists as a convention, not yet reachable from a real search

## 4. Feature Behavior

- [ ] Habit tracker: custom reminder time per habit, quiet reset on a miss (no streak-shaming)
- [ ] Capture: fast single input, no forced categories
- [ ] Capture → Project conversion with smart duplicate/related-topic detection
- [ ] Project tracker: Active vs. Someday split, no due dates on Someday, running (not overwritten) "where I left off" log
- [ ] Notes (was "Kingshot guide database"): stored in D1, simple in-app editor, filter/sort by category or tag, general-purpose content with optional project/habit link
- [ ] Notification permission prompt triggered only on first habit reminder set (not first app open)
- [ ] Notifications follow current timezone, not home timezone
- [ ] Copy option on captures/notes
- [ ] Session stays signed in (no aggressive timeout)
- [x] Dark mode designed in from the start (not bolted on later) — **2026-09-13**: real Light/Dark/Match-system toggle added in Settings (`src/state/ThemeContext.tsx`), on top of the existing system-only dark tokens; a pre-paint boot script in `index.html` avoids a flash on load
- [x] Form fields visibly read as interactive/typeable at rest, not just on focus — **2026-09-14**: added `--field-fill`/`--field-border` tokens and a shared `.field-input` class (`src/index.css`), applied across Capture, Project detail, Guides, Habits, Settings, and the top-strip search bar
- [ ] Add a `:focus-visible` outline on form fields for keyboard-only users, beyond the border-color-only focus state — flagged 2026-09-14 during the form-field-visibility pass, not yet built

## 5. Linked-Out Apps (not built in)

- [x] **Removed 2026-09-13**: the Home shortcuts icon row (BettaBase, "Dev Stack," Roadmap, MD Press, KS Guide) was cut entirely per explicit user decision ("this component will not be used") — `src/components/home/ShortcutsSection.tsx` was deleted and its usage removed from `HomeScreen.tsx`. Do not re-add without asking.
- [ ] Get and wire the actual URLs for Markdown Press, DSM artifact tools, and Bettabase once you have them
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
