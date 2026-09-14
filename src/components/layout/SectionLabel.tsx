import type { ReactNode } from "react";

/** Courier Prime, 12px, uppercase, tracked -- the "section label" role from the type scale. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-sm tracking-[0.1em] uppercase text-label">
      {children}
    </div>
  );
}
