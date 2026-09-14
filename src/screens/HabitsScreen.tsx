import { useState } from "react";
import { Plus, TrashSimpleIcon, X, FloppyDiskIcon } from "@phosphor-icons/react";
import { PencilIcon } from "@phosphor-icons/react";
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
                className="mt-2 flex items-center gap-1.5 font-mono text-xs text-accent-text"
              >
                <TrashSimpleIcon size={14} weight="duotone" /> Delete
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
                <PencilIcon size={18} weight="duotone" />
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
          className="flex min-h-12 items-center gap-3.5 border-b border-hairline py-3.5 text-left"
        >
          <Plus size={17} weight="bold" className="text-accent" />
          <span className="text-[18px] leading-[23px] text-ink">New habit</span>
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
        className="border-b border-hairline bg-transparent py-1 text-[18px] text-ink focus:border-ink focus:outline-none"
      />
      <input
        type="text"
        value={draft.schedule}
        onChange={(event) => onChange({ ...draft, schedule: event.target.value })}
        placeholder="Schedule, e.g. 07:40 or all day"
        className="border-b border-hairline bg-transparent py-1 font-mono text-xs text-data focus:border-ink focus:outline-none"
      />
      <div className="flex items-center gap-4">
        <button type="button" onClick={onSave} className="font-mono text-xs text-accent-text">
          <FloppyDiskIcon size={14} weight="duotone" />
          {isNew ? "Add" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-1 font-mono text-xs text-label">
          <X size={12} /> Cancel
        </button>
      </div>
    </div>
  );
}
