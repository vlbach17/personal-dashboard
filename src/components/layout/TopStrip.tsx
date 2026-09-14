import { GearSixIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

/**
 * Chrome strip: 2px ink rule + faint wash bleeding inward, per Style Guide 04
 * ("Chrome · rules, not cards"). Search results UI isn't designed yet, so
 * this accepts input but doesn't do anything with it. Settings sits here
 * (rather than in the bottom tab bar) since it isn't a daily-use screen.
 */
export function TopStrip() {
  return (
    <div className="chrome-wash-top flex items-center gap-3.5 border-b-2 border-ink px-[26px] pt-[22px] pb-4">
      <div className="field-input flex min-w-0 flex-1 items-center gap-2.5">
        <MagnifyingGlassIcon size={22} weight="duotone" className="shrink-0 text-ink" />
        <input
          type="search"
          placeholder="search everything"
          aria-label="Search habits, captures, projects and guides"
          className="min-w-0 flex-1 border-none bg-transparent p-0 font-mono text-[13px] text-label placeholder:text-label focus:outline-none"
        />
      </div>
      <Link to="/settings" aria-label="Settings" className="shrink-0 text-ink">
        <GearSixIcon size={22} weight="duotone" />
      </Link>
    </div>
  );
}
