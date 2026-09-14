import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  PencilSimpleIcon,
  PlusCircleIcon,
  TrashSimpleIcon,
  ProhibitIcon,
  FloppyDiskIcon,
} from "@phosphor-icons/react";
import { useGuides } from "../state/GuidesContext";
import type { Guide } from "../types/guide";

type Draft = { title: string; category: string; body: string };
const EMPTY_DRAFT: Draft = { title: "", category: "", body: "" };
type Sort = "newest" | "title";

/**
 * List rather than a card grid -- a grid would pull in the "card" surface
 * this system deliberately avoids ("rules, not cards"). Filter by category,
 * sort newest/A-Z, inline add/edit/delete per the shared list convention.
 */
export function GuidesScreen() {
  const { guides, addGuide, updateGuide, deleteGuide } = useGuides();
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("newest");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [isAdding, setIsAdding] = useState(false);

  const categories = useMemo(() => ["All", ...new Set(guides.map((g) => g.category))], [guides]);

  const visible = useMemo(() => {
    const filtered = category === "All" ? guides : guides.filter((g) => g.category === category);
    return sort === "title" ? [...filtered].sort((a, b) => a.title.localeCompare(b.title)) : filtered;
  }, [guides, category, sort]);

  function startEdit(guide: Guide) {
    setIsAdding(false);
    setEditingId(guide.id);
    setDraft({ title: guide.title, category: guide.category, body: guide.body });
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
    setDraft(EMPTY_DRAFT);
  }

  function saveEdit() {
    if (!draft.title.trim()) return cancelEdit();
    if (isAdding) {
      addGuide(draft.title.trim(), draft.category.trim(), draft.body.trim());
    } else if (editingId) {
      updateGuide(editingId, { title: draft.title.trim(), category: draft.category.trim() || "Uncategorized", body: draft.body.trim() });
    }
    cancelEdit();
  }

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">Guides</h1>

      <div className="mt-[22px] flex flex-wrap gap-x-5 gap-y-2">
        {categories.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setCategory(value)}
            className={`border-b-2 pb-1 font-mono text-xs tracking-[0.1em] uppercase ${
              category === value ? "border-accent text-ink" : "border-hairline text-label"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-3.5 flex gap-4">
        <button
          type="button"
          onClick={() => setSort("newest")}
          className={`font-mono text-xs ${sort === "newest" ? "text-accent-text" : "text-label"}`}
        >
          Newest
        </button>
        <button
          type="button"
          onClick={() => setSort("title")}
          className={`font-mono text-xs ${sort === "title" ? "text-accent-text" : "text-label"}`}
        >
          A–Z
        </button>
      </div>

      {visible.length === 0 && !isAdding && <p className="mt-[26px] text-[18px] text-body">No results found.</p>}

      <ul className="mt-[18px]">
        {visible.map((guide) =>
          editingId === guide.id ? (
            <li key={guide.id} className="border-b border-hairline py-3.5">
              <GuideEditForm draft={draft} onChange={setDraft} onSave={saveEdit} onCancel={cancelEdit} />
              <button
                type="button"
                onClick={() => {
                  deleteGuide(guide.id);
                  cancelEdit();
                }}
                aria-label="Delete guide"
                className="mt-2 flex items-center gap-1.5 font-mono text-xs text-accent-text"
              >
                <TrashSimpleIcon size={22} weight="duotone" />
              </button>
            </li>
          ) : (
            <li key={guide.id} className="flex min-h-12 items-center gap-3.5 border-b border-hairline py-3.5">
              <Link to={`/guides/${guide.id}`} className="min-w-0 flex-1">
                <div className="text-[18px] leading-[23px] text-ink">{guide.title}</div>
                <div className="mt-0.5 font-mono text-xs text-label">
                  {guide.category} · {guide.updatedLabel}
                </div>
              </Link>
              <button
                type="button"
                onClick={() => startEdit(guide)}
                aria-label={`Edit ${guide.title}`}
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
          <GuideEditForm draft={draft} onChange={setDraft} onSave={saveEdit} onCancel={cancelEdit} isNew />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setDraft(EMPTY_DRAFT);
          }}
          aria-label="Add guide"
          className="flex min-h-12 items-center gap-3.5 border-b border-hairline py-3.5 text-left"
        >
          <PlusCircleIcon size={22} weight="fill" className="text-accent" />
        </button>
      )}
    </div>
  );
}

function GuideEditForm({
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
        value={draft.title}
        onChange={(event) => onChange({ ...draft, title: event.target.value })}
        placeholder="Guide title"
        className="field-input w-full text-[18px] text-ink"
      />
      <input
        type="text"
        value={draft.category}
        onChange={(event) => onChange({ ...draft, category: event.target.value })}
        placeholder="Category"
        className="field-input w-full font-mono text-xs text-label"
      />
      <textarea
        value={draft.body}
        onChange={(event) => onChange({ ...draft, body: event.target.value })}
        placeholder="Guide content"
        rows={3}
        className="field-input w-full resize-none text-[15px] leading-[23px] text-body"
      />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSave}
          aria-label={isNew ? "Add guide" : "Save guide"}
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
