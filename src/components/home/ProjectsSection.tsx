import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import { SectionLabel } from "../layout/SectionLabel";

interface ProjectsSectionProps {
  /** Ordered by recency; index 0 gets the accent rule. */
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="px-[26px] pt-[34px]">
      <SectionLabel>Projects</SectionLabel>
      <ul className="mt-3.5 flex flex-col gap-[18px]">
        {projects.map((project, index) => {
          const isMostRecent = index === 0;
          const latest = project.log[project.log.length - 1];
          return (
            <li
              key={project.id}
              className="flex flex-col gap-[5px] border-l-[3px] pl-3.5"
              style={{ borderColor: isMostRecent ? "var(--accent)" : "var(--project-rule-inactive)" }}
            >
              <Link to={`/projects/${project.id}`} className="flex items-baseline gap-2.5">
                <span className="text-[19px] leading-[25px] font-semibold text-ink">{project.name}</span>
                <span className="ml-auto shrink-0 font-mono text-xs text-label">{latest.timestamp}</span>
              </Link>
              <p className="text-[15px] leading-[23px] text-pretty text-body">{latest.note}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
