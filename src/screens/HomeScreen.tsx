import { Masthead } from "../components/home/Masthead";
import { HabitsSection } from "../components/home/HabitsSection";
import { ProjectsSection } from "../components/home/ProjectsSection";
import { ShortcutsSection } from "../components/home/ShortcutsSection";
import { useHabits } from "../state/HabitsContext";
import { useProjects } from "../state/ProjectsContext";

export function HomeScreen() {
  const { habits, toggleDoneToday } = useHabits();
  const { projects } = useProjects();
  const activeProjects = projects.filter((project) => project.status === "active");

  return (
    <div className="flex flex-1 flex-col pb-[34px] md:pb-0">
      <Masthead />
      <HabitsSection habits={habits} onToggle={toggleDoneToday} />
      <ProjectsSection projects={activeProjects} />
      <ShortcutsSection />
    </div>
  );
}
