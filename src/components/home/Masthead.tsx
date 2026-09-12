import { formatDayAndMonth, formatDayName, getIsoWeek } from "../../lib/date";

export function Masthead({ today = new Date() }: { today?: Date }) {
  return (
    <div className="flex items-baseline justify-between px-[26px] pt-[26px]">
      <div>
        <div className="font-mono text-xs tracking-[0.1em] uppercase text-label">
          {formatDayName(today)}
        </div>
        <div className="text-ink-gradient mt-0.5 font-sans text-[32px] leading-[37px] font-semibold tracking-[-0.01em]">
          {formatDayAndMonth(today)}
        </div>
      </div>
      <div className="font-mono text-xs text-accent-text">wk {getIsoWeek(today)}</div>
    </div>
  );
}
