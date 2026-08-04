import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppDataProvider } from "./hooks/useAppData";
import { ToastProvider } from "./hooks/useToast";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import TeamsPage from "./pages/Teams/TeamsPage";
import YuvaksPage from "./pages/Yuvaks/YuvaksPage";
import ReportPage from "./pages/Report/ReportPage";
import RulebookPage from "./pages/Rulebook/RulebookPage";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminTeams from "./pages/Admin/AdminTeams";
import AdminYuvaks from "./pages/Admin/AdminYuvaks";
import AdminActivities from "./pages/Admin/AdminActivities";
import AdminLeaderboard from "./pages/Admin/AdminLeaderboard";
import AdminRulebook from "./pages/Admin/AdminRulebook";
import AdminReports from "./pages/Admin/AdminReports";
import AdminSettings from "./pages/Admin/AdminSettings";

export default function App() {
  return (
    <AppDataProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/teams" replace />} />

            <Route element={<MainLayout />}>
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/yuvaks" element={<YuvaksPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/rulebook" element={<RulebookPage />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="teams" element={<AdminTeams />} />
              <Route path="yuvaks" element={<AdminYuvaks />} />
              <Route path="activities" element={<AdminActivities />} />
              <Route path="leaderboard" element={<AdminLeaderboard />} />
              <Route path="rulebook" element={<AdminRulebook />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppDataProvider>
  );
}
