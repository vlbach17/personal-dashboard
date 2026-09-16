import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { HomeScreen } from "./screens/HomeScreen";
import { HabitsScreen } from "./screens/HabitsScreen";
import { CaptureScreen } from "./screens/CaptureScreen";
import { ProjectsScreen } from "./screens/ProjectsScreen";
import { ProjectDetailScreen } from "./screens/ProjectDetailScreen";
import { NotesScreen } from "./screens/NotesScreen";
import { NoteDetailScreen } from "./screens/NoteDetailScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { HabitsProvider } from "./state/HabitsContext";
import { ProjectsProvider } from "./state/ProjectsContext";
import { NotesProvider } from "./state/NotesContext";
import { CapturesProvider } from "./state/CapturesContext";
import { ThemeProvider } from "./state/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <HabitsProvider>
        <ProjectsProvider>
          <CapturesProvider>
            <NotesProvider>
              <BrowserRouter>
                <AppShell>
                  <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/habits" element={<HabitsScreen />} />
                    <Route path="/capture" element={<CaptureScreen />} />
                    <Route path="/projects" element={<ProjectsScreen />} />
                    <Route path="/projects/:id" element={<ProjectDetailScreen />} />
                    <Route path="/notes" element={<NotesScreen />} />
                    <Route path="/notes/:id" element={<NoteDetailScreen />} />
                    <Route path="/settings" element={<SettingsScreen />} />
                  </Routes>
                </AppShell>
              </BrowserRouter>
            </NotesProvider>
          </CapturesProvider>
        </ProjectsProvider>
      </HabitsProvider>
    </ThemeProvider>
  );
}

export default App;
