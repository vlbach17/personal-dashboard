import { CheckIcon, SquareIcon } from "@phosphor-icons/react";
import type { Habit } from "../../types/habit";
import { SectionLabel } from "../layout/SectionLabel";

interface HabitsSectionProps {
  habits: Habit[];
  onToggle: (id: string) => void;
}

export function HabitsSection({ habits, onToggle }: HabitsSectionProps) {
  const doneCount = habits.filter((habit) => habit.doneToday).length;

  return (
    <section className="px-[26px] pt-[34px]">
      <SectionLabel>
        Habits / selfcare · <span className="text-accent-text">{doneCount} of {habits.length}</span>
      </SectionLabel>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="border-b border-hairline">
            <button
              type="button"
              onClick={() => onToggle(habit.id)}
              aria-pressed={habit.doneToday}
              className="flex min-h-12 w-full items-center gap-3.5 py-3.5 text-left"
            >
              {habit.doneToday ? (
                <CheckIcon size={22} weight="bold" className="shrink-0 text-accent" />
              ) : (
                <SquareIcon size={22} className="shrink-0" style={{ color: "var(--unchecked-icon)" }} />
              )}
              <span
                className={`text-[18px] leading-[23px] ${
                  habit.doneToday ? "text-done line-through decoration-2 decoration-accent" : "text-ink"
                }`}
              >
                {habit.label}
              </span>
              <span className="ml-auto shrink-0 font-mono text-xs text-data">{habit.schedule}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
