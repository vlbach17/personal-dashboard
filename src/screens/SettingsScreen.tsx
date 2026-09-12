import { CloudArrowUp, SignOut } from "@phosphor-icons/react";
import { useHabits } from "../state/HabitsContext";
import { SectionLabel } from "../components/layout/SectionLabel";

/**
 * Log out and backup/export are visually complete but inert -- Cloudflare
 * Access and D1 aren't provisioned yet (see docs/TASK_LIST.md section 1), so
 * wiring real behavior here would fake a backend that doesn't exist.
 */
export function SettingsScreen() {
  const { habits, updateHabit } = useHabits();

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">Settings</h1>

      <section className="mt-[34px]">
        <SectionLabel>Habit reminders</SectionLabel>
        {habits.length === 0 ? (
          <p className="mt-3.5 text-[18px] text-body">No habits added yet.</p>
        ) : (
          <ul className="mt-1">
            {habits.map((habit) => (
              <li key={habit.id} className="flex min-h-12 items-center gap-3.5 border-b border-hairline py-3.5">
                <span className="flex-1 text-[18px] leading-[23px] text-ink">{habit.label}</span>
                <input
                  type="text"
                  value={habit.schedule}
                  onChange={(event) => updateHabit(habit.id, { schedule: event.target.value })}
                  aria-label={`Reminder time for ${habit.label}`}
                  className="w-24 shrink-0 border-b border-hairline bg-transparent text-right font-mono text-xs text-data focus:border-ink focus:outline-none"
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-[34px] pb-[34px]">
        <SectionLabel>Account</SectionLabel>
        <div className="mt-1">
          <button type="button" className="flex min-h-12 w-full items-center gap-3.5 border-b border-hairline py-3.5 text-left">
            <SignOut size={18} className="shrink-0 text-ink" />
            <span className="flex-1 text-[18px] leading-[23px] text-ink">Log out</span>
          </button>
          <p className="pt-2 font-mono text-xs text-label">Not wired up yet — Cloudflare Access isn't connected.</p>

          <button
            type="button"
            className="mt-3.5 flex min-h-12 w-full items-center gap-3.5 border-b border-hairline py-3.5 text-left"
          >
            <CloudArrowUp size={18} className="shrink-0 text-ink" />
            <span className="flex-1 text-[18px] leading-[23px] text-ink">Back up now</span>
          </button>
          <p className="pt-2 font-mono text-xs text-label">Not wired up yet — D1 isn't provisioned.</p>
        </div>
      </section>
    </div>
  );
}
