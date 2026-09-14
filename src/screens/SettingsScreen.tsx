import { useState } from "react";
import { Check, CloudArrowUp, Desktop, Moon, SignOut, Sun } from "@phosphor-icons/react";
import { useHabits } from "../state/HabitsContext";
import { useTheme, type Theme } from "../state/ThemeContext";
import { SectionLabel } from "../components/layout/SectionLabel";

type Tab = "appearance" | "habits" | "account";

const TABS: { value: Tab; label: string }[] = [
  { value: "appearance", label: "Appearance" },
  { value: "habits", label: "Habits" },
  { value: "account", label: "Account" },
];

const THEME_OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "Match system", icon: Desktop },
];

/**
 * Log out and backup/export are visually complete but inert -- Cloudflare
 * Access and D1 aren't provisioned yet (see docs/TASK_LIST.md section 1), so
 * wiring real behavior here would fake a backend that doesn't exist. Theme is
 * the one setting that's fully live, via ThemeContext.
 */
export function SettingsScreen() {
  const { habits, updateHabit } = useHabits();
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = useState<Tab>("appearance");

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">Settings</h1>

      <div role="tablist" aria-label="Settings sections" className="mt-[22px] flex gap-6">
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={`settings-tab-${value}`}
            aria-selected={tab === value}
            aria-controls={`settings-panel-${value}`}
            onClick={() => setTab(value)}
            className={`border-b-2 pb-2 font-mono text-xs tracking-[0.1em] uppercase ${
              tab === value ? "border-accent text-ink" : "border-hairline text-label"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "appearance" && (
        <section
          id="settings-panel-appearance"
          role="tabpanel"
          aria-labelledby="settings-tab-appearance"
          className="mt-[34px] pb-[34px]"
        >
          <SectionLabel>Theme</SectionLabel>
          <ul className="mt-1">
            {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
              const selected = theme === value;
              return (
                <li key={value} className="border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => setTheme(value)}
                    aria-pressed={selected}
                    className="flex min-h-12 w-full items-center gap-3.5 py-3.5 text-left"
                  >
                    <Icon size={18} weight={selected ? "bold" : "regular"} className="shrink-0 text-ink" />
                    <span className="flex-1 text-[18px] leading-[23px] text-ink">{label}</span>
                    {selected && <Check size={17} weight="bold" className="shrink-0 text-accent" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {tab === "habits" && (
        <section
          id="settings-panel-habits"
          role="tabpanel"
          aria-labelledby="settings-tab-habits"
          className="mt-[34px] pb-[34px]"
        >
          <SectionLabel>Reminders</SectionLabel>
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
      )}

      {tab === "account" && (
        <section
          id="settings-panel-account"
          role="tabpanel"
          aria-labelledby="settings-tab-account"
          className="mt-[34px] pb-[34px]"
        >
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
        </section>
      )}
    </div>
  );
}
