import { createContext, useContext, useState, type ReactNode } from "react";
import type { Project } from "../types/project";
import { mockProjects } from "../data/mockProjects";

interface ProjectsContextValue {
  projects: Project[];
  addProject: (name: string, status: Project["status"]) => void;
  updateProject: (id: string, patch: Partial<Pick<Project, "name" | "status">>) => void;
  deleteProject: (id: string) => void;
  appendLogEntry: (id: string, note: string) => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Home's preview, the Projects list, and each project's detail view all read/write the same projects. */
export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  function addProject(name: string, status: Project["status"]) {
    setProjects((current) => [{ id: makeId("project"), name, status, log: [] }, ...current]);
  }

  function updateProject(id: string, patch: Partial<Pick<Project, "name" | "status">>) {
    setProjects((current) => current.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function deleteProject(id: string) {
    setProjects((current) => current.filter((p) => p.id !== id));
  }

  /** Appending a log entry is "touching" the project, so it moves to the front (most recent). */
  function appendLogEntry(id: string, note: string) {
    setProjects((current) => {
      const touched = current.find((p) => p.id === id);
      if (!touched) return current;
      const updated: Project = {
        ...touched,
        log: [...touched.log, { id: makeId("log"), timestamp: "just now", note }],
      };
      return [updated, ...current.filter((p) => p.id !== id)];
    });
  }

  return (
    <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject, appendLogEntry }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
}
