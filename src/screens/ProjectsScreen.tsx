import { useState } from "react";
import { Link } from "react-router-dom";
import { PencilSimple, Plus, Trash, X } from "@phosphor-icons/react";
import { useProjects } from "../state/ProjectsContext";
import type { Project } from "../types/project";

type Status = Project["status"];
type Draft = { name: string; status: Status };

/**
 * Active vs. Someday, no due-date pressure on Someday. Add/rename/move/
 * delete are inline (one pencil icon, per the shared list convention); the
 * running "where I left off" log itself is only editable from the detail
 * view at /projects/:id.
 */
export function ProjectsScreen() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [tab, setTab] = useState<Status>("active");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>({ name: "", status: tab });
  const [isAdding, setIsAdding] = useState(false);

  const visible = projects.filter((project) => project.status === tab);

  function startEdit(project: Project) {
    setIsAdding(false);
    setEditingId(project.id);
    setDraft({ name: project.name, status: project.status });
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
  }

  function saveEdit() {
    if (!draft.name.trim()) return cancelEdit();
    if (isAdding) {
      addProject(draft.name.trim(), draft.status);
    } else if (editingId) {
      updateProject(editingId, { name: draft.name.trim(), status: draft.status });
    }
    cancelEdit();
  }

  return (
    <div className="flex flex-1 flex-col px-[26px] pt-[26px]">
      <h1 className="text-[28px] leading-[1.2] font-semibold text-ink">Projects</h1>

      <div className="mt-[22px] flex gap-6">
        {(["active", "someday"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setTab(value);
              cancelEdit();
            }}
            className={`border-b-2 pb-2 font-mono text-xs tracking-[0.1em] uppercase ${
              tab === value ? "border-accent text-ink" : "border-hairline text-label"
            }`}
          >
            {value === "active" ? "Active" : "Someday"}
          </button>
        ))}
      </div>

      {visible.length === 0 && !isAdding && (
        <p className="mt-[34px] text-[18px] text-body">
          {tab === "active" ? "No active projects." : "Nothing in Someday."}
        </p>
      )}

      <ul className="mt-[26px] flex flex-col gap-[18px]">
        {visible.map((project, index) => {
          const isMostRecent = tab === "active" && index === 0;
          const latest = project.log[project.log.length - 1];
          return (
            <li
              key={project.id}
              className="flex flex-col gap-[5px] border-l-[3px] pl-3.5"
              style={{ borderColor: isMostRecent ? "var(--accent)" : "var(--project-rule-inactive)" }}
            >
              {editingId === project.id ? (
                <ProjectEditForm draft={draft} onChange={setDraft} onSave={saveEdit} onCancel={cancelEdit} />
              ) : (
                <>
                  <div className="flex items-baseline gap-2.5">
                    <Link to={`/projects/${project.id}`} className="text-[19px] leading-[25px] font-semibold text-ink">
                      {project.name}
                    </Link>
                    {latest && (
                      <span className="ml-auto shrink-0 font-mono text-xs text-label">{latest.timestamp}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => startEdit(project)}
                      aria-label={`Edit ${project.name}`}
                      className="shrink-0 text-ink"
                    >
                      <PencilSimple size={16} />
                    </button>
                  </div>
                  <p className="text-[15px] leading-[23px] text-pretty text-body">
                    {latest ? latest.note : "No log entries yet."}
                  </p>
                </>
              )}
              {editingId === project.id && (
                <button
                  type="button"
                  onClick={() => {
                    deleteProject(project.id);
                    cancelEdit();
                  }}
                  className="flex items-center gap-1.5 font-mono text-xs text-accent-text"
                >
                  <Trash size={14} /> Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {isAdding ? (
        <div className="mt-[18px] border-l-[3px] pl-3.5" style={{ borderColor: "var(--project-rule-inactive)" }}>
          <ProjectEditForm draft={draft} onChange={setDraft} onSave={saveEdit} onCancel={cancelEdit} isNew />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setDraft({ name: "", status: tab });
          }}
          className="mt-[18px] flex min-h-12 items-center gap-3.5 text-left"
        >
          <Plus size={17} weight="bold" className="text-accent" />
          <span className="text-[18px] leading-[23px] text-ink">Add project</span>
        </button>
      )}
    </div>
  );
}

function ProjectEditForm({
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
        value={draft.name}
        onChange={(event) => onChange({ ...draft, name: event.target.value })}
        placeholder="Project name"
        className="border-b border-hairline bg-transparent py-1 text-[18px] text-ink focus:border-ink focus:outline-none"
      />
      <div className="flex gap-4">
        {(["active", "someday"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange({ ...draft, status: value })}
            className={`font-mono text-xs tracking-[0.1em] uppercase ${
              draft.status === value ? "text-accent-text" : "text-label"
            }`}
          >
            {value === "active" ? "Active" : "Someday"}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button type="button" onClick={onSave} className="font-mono text-xs text-accent-text">
          {isNew ? "Add" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-1 font-mono text-xs text-label">
          <X size={12} /> Cancel
        </button>
      </div>
    </div>
  );
}
