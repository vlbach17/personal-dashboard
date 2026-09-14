import { useState } from "react";
import {
  PlusCircleIcon,
  TrashSimpleIcon,
  ProhibitIcon,
  FloppyDiskIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import { useHabits } from "../state/HabitsContext";
import type { Habit } from "../types/habit";

type Draft = { label: string; schedule: string };

const EMPTY_DRAFT: Draft = { label: "", schedule: "" };

/**
 * Habit management (not the daily checklist -- that's Home, sharing the same
 * roster via HabitsContext). Add, rename, change the schedule text, and
 * delete, all inline, per the "one edit icon, same treatment everywhere"
 * convention. No reminder scheduling wired up yet since push notifications
 * and Cloudflare Cron aren't built.
 */
export function HabitsScreen() {
  const { habits, addHabit, updateHabit, deleteHabit } = useHabits();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [isAdding, setIsAdding] = useState(false);

  function startEdit(habit: Habit) {
    setIsAdding(false);
    setEditingId(habit.id);
    setDraft({ label: habit.label, schedule: habit.schedule });
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
    setDraft(EMPTY_DRAFT);
  }

  function saveEdit() {
    if (!draft.label.trim()) return cancelEdit();
    if (isAdding) {
      addHabit(draft.label.trim(), draft.schedule.trim());
    } else if (editingId) {
      updateHabit(editingId, { label: draft.label.trim(), schedule: draft.schedule.trim() || "—" });
    }
    cancelEdit();
  }

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">Habits</h1>

      {habits.length === 0 && !isAdding && (
        <p className="mt-[34px] text-[18px] text-body">No habits added yet.</p>
      )}

      <ul className="mt-[26px]">
        {habits.map((habit) =>
          editingId === habit.id ? (
            <li key={habit.id} className="border-b border-hairline py-3.5">
              <HabitEditForm draft={draft} onChange={setDraft} onSave={saveEdit} onCancel={cancelEdit} />
              <button
                type="button"
                onClick={() => {
                  deleteHabit(habit.id);
                  cancelEdit();
                }}
                aria-label="Delete habit"
                className="mt-2 flex items-center gap-1.5 font-mono text-xs text-accent-text"
              >
                <TrashSimpleIcon size={22} weight="duotone" />
              </button>
            </li>
          ) : (
            <li key={habit.id} className="flex min-h-12 items-center gap-3.5 border-b border-hairline py-3.5">
              <span className="flex-1 text-[18px] leading-[23px] text-ink">{habit.label}</span>
              <span className="shrink-0 font-mono text-xs text-data">{habit.schedule}</span>
              <button
                type="button"
                onClick={() => startEdit(habit)}
                aria-label={`Edit ${habit.label}`}
                className="shrink-0 text-ink"
              >
                <PencilSimpleIcon size={22} weight="duotone" />
              </button>
            </li>
          ),
        )}
      </ul>

      {isAdding ? (
        <div className="border-b border-hairline py-3.5">
          <HabitEditForm draft={draft} onChange={setDraft} onSave={saveEdit} onCancel={cancelEdit} isNew />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setDraft(EMPTY_DRAFT);
          }}
          aria-label="Add habit"
          className="flex min-h-12 items-center gap-3.5 border-b border-hairline py-3.5 text-left"
        >
          <PlusCircleIcon size={22} weight="fill" className="text-accent" />
        </button>
      )}
    </div>
  );
}

function HabitEditForm({
  draft,
  onChange,
  onSave,
  onCancel,
  isNew = false,
}: {
  draft: Draft;
  onChange: (draft: Draft) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <input
        autoFocus
        type="text"
        value={draft.label}
        onChange={(event) => onChange({ ...draft, label: event.target.value })}
        placeholder="Habit name"
        className="field-input w-full text-[18px] text-ink"
      />
      <input
        type="text"
        value={draft.schedule}
        onChange={(event) => onChange({ ...draft, schedule: event.target.value })}
        placeholder="Schedule, e.g. 07:40 or all day"
        className="field-input w-full font-mono text-xs text-data"
      />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSave}
          aria-label={isNew ? "Add habit" : "Save habit"}
          className="font-mono text-xs text-accent-text"
        >
          {isNew ? <PlusCircleIcon size={22} weight="fill" /> : <FloppyDiskIcon size={22} weight="duotone" />}
        </button>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel"
          className="flex items-center gap-1 font-mono text-xs text-label"
        >
          <ProhibitIcon size={22} weight="duotone" />
        </button>
      </div>
    </div>
  );
}
