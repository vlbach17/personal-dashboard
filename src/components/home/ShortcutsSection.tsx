import { BookOpenText, Code, FileText, Fish, MapTrifold } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SectionLabel } from "../layout/SectionLabel";

/**
 * Per the confirmed Home comp (Style Guide 04 / README "Bottom strip"), minus
 * the quick-capture button, which is now a global floating control
 * (QuickCaptureFab) instead of living inline here. KS Guide is a real in-app
 * link now that /guides exists; the other three linked-out apps have no
 * recorded URL anywhere in the repo, so they render inert rather than
 * guessing a destination.
 *
 * Hidden below the `md` breakpoint per direct feedback: on a phone this sat
 * between the Projects list and the bottom tab bar and made for a bad
 * experience. Reserved for tablet/desktop, which have the extra room for it.
 */
const SHORTCUTS = [
  { icon: BookOpenText, label: "KS Guide", to: "/guides" },
  { icon: Fish, label: "BettaBase", to: null },
  { icon: Code, label: "Dev Stack", to: null },
  { icon: MapTrifold, label: "Roadmap", to: null },
  { icon: FileText, label: "MD Press", to: null },
];

export function ShortcutsSection() {
  return (
    <section className="hidden px-[26px] pt-[34px] pb-[34px] md:block">
      <SectionLabel>Shortcuts</SectionLabel>
      <div className="mt-3.5 flex items-center justify-between">
        {SHORTCUTS.map(({ icon: Icon, label, to }) =>
          to ? (
            <Link key={label} to={to} aria-label={label} title={label} className="text-ink">
              <Icon size={23} />
            </Link>
          ) : (
            <button key={label} type="button" aria-label={label} title={label} className="text-ink">
              <Icon size={23} />
            </button>
          ),
        )}
      </div>
    </section>
  );
}
