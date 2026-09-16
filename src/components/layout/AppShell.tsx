import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Ground } from "./Ground";
import { TopStrip } from "./TopStrip";
import { BottomNav } from "./BottomNav";
import { QuickCaptureFab } from "./QuickCaptureFab";

/** Long-reading surfaces get the halftone-over-dye ground (Style Guide 01, variant B). */
function isLongReadingRoute(pathname: string): boolean {
  return /^\/projects\/[^/]+$/.test(pathname) || /^\/notes\/[^/]+$/.test(pathname);
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const groundVariant = isLongReadingRoute(location.pathname) ? "dye" : "default";

  return (
    <div className="app-ground relative flex min-h-svh flex-col">
      <Ground variant={groundVariant} />
      <div className="relative z-10 flex min-h-svh flex-col">
        <TopStrip />
        <main className="flex flex-1 flex-col" style={{ paddingBottom: "var(--nav-height)" }}>
          {children}
        </main>
      </div>
      <QuickCaptureFab />
      <BottomNav />
    </div>
  );
}
