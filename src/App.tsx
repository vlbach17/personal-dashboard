import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { HomeScreen } from "./screens/HomeScreen";
import { HabitsScreen } from "./screens/HabitsScreen";
import { CaptureScreen } from "./screens/CaptureScreen";
import { ProjectsScreen } from "./screens/ProjectsScreen";
import { ProjectDetailScreen } from "./screens/ProjectDetailScreen";
import { GuidesScreen } from "./screens/GuidesScreen";
import { GuideDetailScreen } from "./screens/GuideDetailScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { HabitsProvider } from "./state/HabitsContext";
import { ProjectsProvider } from "./state/ProjectsContext";
import { GuidesProvider } from "./state/GuidesContext";

function App() {
  return (
    <HabitsProvider>
      <ProjectsProvider>
        <GuidesProvider>
          <BrowserRouter>
            <AppShell>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/habits" element={<HabitsScreen />} />
                <Route path="/capture" element={<CaptureScreen />} />
                <Route path="/projects" element={<ProjectsScreen />} />
                <Route path="/projects/:id" element={<ProjectDetailScreen />} />
                <Route path="/guides" element={<GuidesScreen />} />
                <Route path="/guides/:id" element={<GuideDetailScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
              </Routes>
            </AppShell>
          </BrowserRouter>
        </GuidesProvider>
      </ProjectsProvider>
    </HabitsProvider>
  );
}

export default App;
