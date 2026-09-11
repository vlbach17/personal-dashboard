# Personal Dashboard App — Plan

## Purpose
A personal dashboard, accessible on mobile, tablet, and desktop (Windows, Mac, iPhone, iPad), for daily/weekly use. Combines built-in ADHD-friendly tools with quick links to other apps and tools already in use.

## Tech Stack
- **Build:** Claude Code (main driver)
- **UI Design:** Claude Design
- **Framework:** Vite + React (frontend), Cloudflare Pages Functions (backend/API routes)
- **Language:** TypeScript
- **Version Control:** GitHub
- **Hosting:** Cloudflare Pages / Workers
- **Database:** Cloudflare D1
- **File Storage:** Cloudflare R2 (if/when needed)
- **Login:** Cloudflare Access (magic link, persistent session — stay signed in)
- **CSS:** Tailwind
- **Icons:** Phosphor
- **Domain:** vanessab.design (registered via Namecheap, pointed at Cloudflare)
- **Notifications:** Web push + Cloudflare Cron Triggers for scheduling
- **Design system:** Material Design 3 (M3) principles — structural rules (spacing, elevation, color roles, motion), while keeping Vanessa's own color palette/personality
- Not using: Lovable, Supabase (for this app specifically)

### Cost expectations
Should run at $0/month under normal single-user use (Pages, Workers, D1, R2, and Access all have free tiers well above what one person's daily use would hit). Set a spending alert on the Cloudflare dashboard on day one as a safety net.

## Structure

### Built-in features
1. **Habit tracker** — create habits, check off daily, fully custom reminder time per habit, quiet reset on a miss (no streaks-shaming/red flags)
2. **Thought/Task capture** — one open input, no forced categories, as fast as a sticky note; supports converting a capture into a project (see below)
3. **Kingshot guide database** — guides stored directly in D1 (not synced from files), simple in-app editor, filter/sort by category or tag
4. **Project tracker** — Active vs. Someday split (no pressure/due dates on Someday); "where I left off" is a running log per project (not overwritten each time), with entries also auto-added by Claude Code/Claude AI when a coding session ends without a manual note (separate integration piece, to be scoped later)
5. **Settings/Account screen** — manage all habit reminder times in one place, log out, manual backup/export trigger

### Linked out (not built in)
- Markdown Press
- DSM artifact tools
- Spunk's Bettabase — link now; once Bettabase migrates off Supabase to Cloudflare, add a quick water-log shortcut accessible from the persistent floating capture button

### Explicitly deferred / out of scope for v1
- Google Calendar integration (considered, decided against for v1 — not solving a real friction point yet; revisit if the habit of checking elsewhere persists after v1 ships)
- DIY CSS framework — saved as a separate seed project for the portfolio site, not the dashboard

## Home / "Right Now" View
- Today's habit checklist
- Active projects preview (1–3 cards: name + last resume note)
- Persistent floating quick-capture button, everywhere in the app (will include a nested Betta quick-log option once that integration is live)
- Linked-apps cards/icons section (Bettabase, Markdown Press, DSM tools)

## Navigation
- Mobile: hamburger menu opens as a sidebar
- Desktop: sidebar per the reference wireframe photo
- Search bar across all content (habits, captures, projects, guides) — one shared bar, not per-section

## Screen List
- Login (Cloudflare Access magic link)
- Home / Right Now
- Habits (list + add + per-habit settings incl. reminder time)
- Capture (input + reverse-chron list of past captures; convert-to-project action)
- Projects (Active / Someday tabs; detail view with running "where I left off" log)
- Guides (grid/list + add + filter/sort + detail/read view)
- Settings/Account
- Empty states and first-open/install flow (see below)

## Key Behavior Decisions
- **Empty states:** consistent, plain-language, no cute filler (e.g., "No incomplete projects to display," "No habits added yet," "Nothing captured yet"). Active and Someday projects share one empty message.
- **Search empty state:** general "No results found" message.
- **Edit/delete pattern:** edit icon — tap an edit icon to modify/delete; used consistently everywhere.
- **Dark mode:** designed for from day one, not bolted on later.
- **Timezone:** notifications always follow current location/timezone, not fixed to home.
- **Session:** stays signed in (no aggressive timeout).
- **Share:** copy option on captures/notes.
- **PWA icon/name:** decision deferred.
- **Notification permission prompt:** triggered only when the first habit reminder is set (not at first app open).
- **First-open/install flow:** needed, since push notifications only work after the app is added to the home screen — should clearly guide the user to install first.
- **Capture → Project conversion:** includes smart duplicate/related-topic detection (auto-flagging likely matches) — a real feature to scope, not a trivial add.
- **Backups:** Cloudflare D1 backup/export enabled from day one.
- **Offline:** not needed — always-online is fine.

## Open / Still To Decide
- PWA icon and short name
- Exact mechanism for Claude Code auto-logging project "left off" notes (scope as its own integration)
- Whether Betta quick-log capture flow needs any special handling once Bettabase is on Cloudflare

## Reference
- Hand-drawn low-fi wireframe (mobile: home, projects, calendar/bored-tasks section, linked-app icon row, floating quick-capture)
- Desktop sidebar layout photo (referenced, not embedded here)
