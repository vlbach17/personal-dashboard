import { BookOpenText, FolderSimple, House, ListChecks, NotePencil } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/habits", label: "Habits", icon: ListChecks },
  { to: "/capture", label: "Capture", icon: NotePencil },
  { to: "/projects", label: "Projects", icon: FolderSimple },
  { to: "/guides", label: "Guides", icon: BookOpenText },
];

/**
 * Primary in-app navigation. Replaces the earlier hamburger + slide-out
 * drawer with an always-visible bottom bar -- the confirmed system's own
 * chrome pattern (2px ink rule, faint wash, bare Phosphor icons, evenly
 * spaced) turned into app-wide navigation instead of a single screen's
 * linked-apps row. Settings lives behind the top strip's gear icon instead
 * of here, since it isn't a daily-use destination.
 */
export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="bg-ground-bottom fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t-2 border-ink px-[26px] pt-3"
      style={{ height: "var(--nav-height)", paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          aria-label={label}
          title={label}
          className={({ isActive }) => (isActive ? "text-accent" : "text-ink")}
        >
          {({ isActive }) => <Icon size={23} weight={isActive ? "fill" : "regular"} />}
        </NavLink>
      ))}
    </nav>
  );
}
