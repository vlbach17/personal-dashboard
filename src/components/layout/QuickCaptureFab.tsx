import { Plus } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

/**
 * "A persistent floating quick-capture control is reachable from anywhere in
 * the app" (CLAUDE.md). Floats above the bottom nav on every screen except
 * Capture itself, where it would just sit on top of the same destination.
 */
export function QuickCaptureFab() {
  const location = useLocation();
  if (location.pathname === "/capture") return null;

  return (
    <Link
      to="/capture"
      aria-label="Quick capture"
      className="fixed right-[26px] z-30 flex h-12 w-12 items-center justify-center border-2 border-ink"
      style={{
        bottom: "calc(var(--nav-height) + max(12px, env(safe-area-inset-bottom)))",
        backgroundImage: "linear-gradient(#FF8F3C, #F26A08)",
      }}
    >
      <Plus size={21} weight="bold" className="text-ink" />
    </Link>
  );
}
