import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { TEAMS, YUVAKS, ACTIVITIES, CATEGORY_POINTS, RULEBOOK_POINTS, RULEBOOK_SECTIONS } from "../data/dummyData";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [teams, setTeams] = useState(TEAMS);
  const [yuvaks, setYuvaks] = useState(YUVAKS);
  const [activities, setActivities] = useState(ACTIVITIES);
  const [rulebookPoints, setRulebookPoints] = useState(RULEBOOK_POINTS);
  const [rulebookSections, setRulebookSections] = useState(RULEBOOK_SECTIONS);

  // Team totals are ALWAYS derived, never stored, so any points edit
  // anywhere in the app instantly ripples to every leaderboard & chart.
  const teamsWithPoints = useMemo(() => {
    return teams
      .map((team) => {
        const members = yuvaks.filter((y) => y.teamId === team.id);
        const totalPoints = members.reduce((sum, y) => sum + y.points, 0);
        return { ...team, members: members.length, totalPoints };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((t, i) => ({ ...t, rank: i + 1 }));
  }, [teams, yuvaks]);

  const teamMap = useMemo(() => new Map(teams.map((t) => [t.id, t])), [teams]);

  const yuvaksWithTeam = useMemo(() => {
    return yuvaks
      .map((y) => ({ ...y, team: teamMap.get(y.teamId) }))
      .sort((a, b) => b.points - a.points)
      .map((y, i) => ({ ...y, rank: i + 1 }));
  }, [yuvaks, teamMap]);

  const reportStats = useMemo(() => {
    const totalPoints = yuvaksWithTeam.reduce((sum, y) => sum + y.points, 0);
    return {
      totalTeams: teamsWithPoints.length,
      totalYuvaks: yuvaksWithTeam.length,
      totalPoints,
      averagePoints: yuvaksWithTeam.length ? Math.round(totalPoints / yuvaksWithTeam.length) : 0,
      highestTeam: teamsWithPoints[0],
      highestScorer: yuvaksWithTeam[0],
    };
  }, [teamsWithPoints, yuvaksWithTeam]);

  const updateYuvakPoints = useCallback((yuvakId, newPoints) => {
    setYuvaks((prev) => prev.map((y) => (y.id === yuvakId ? { ...y, points: Number(newPoints) || 0 } : y)));
  }, []);

  const addYuvak = useCallback((yuvak) => {
    setYuvaks((prev) => [...prev, { id: `yuvak-${Date.now()}`, points: 0, ...yuvak }]);
  }, []);

  const deleteYuvak = useCallback((yuvakId) => {
    setYuvaks((prev) => prev.filter((y) => y.id !== yuvakId));
  }, []);

  const addTeam = useCallback((team) => {
    setTeams((prev) => [...prev, { id: `team-${Date.now()}`, color: "#F97316", ...team }]);
  }, []);

  const updateTeam = useCallback((teamId, patch) => {
    setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, ...patch } : t)));
  }, []);

  const deleteTeam = useCallback((teamId) => {
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
    setYuvaks((prev) => prev.filter((y) => y.teamId !== teamId));
  }, []);

  const addActivity = useCallback((activity) => {
    setActivities((prev) => [...prev, { id: `activity-${Date.now()}`, ...activity }]);
  }, []);

  const deleteActivity = useCallback((activityId) => {
    setActivities((prev) => prev.filter((a) => a.id !== activityId));
  }, []);

  // --- Rulebook mutations ---

  const addRulebookPoint = useCallback((point) => {
    setRulebookPoints((prev) => [...prev, { id: `rp-${Date.now()}`, ...point }]);
  }, []);

  const updateRulebookPoint = useCallback((id, patch) => {
    setRulebookPoints((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deleteRulebookPoint = useCallback((id) => {
    setRulebookPoints((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addRulebookSection = useCallback((section) => {
    setRulebookSections((prev) => [...prev, { id: `rs-${Date.now()}`, icon: "book", bullets: [], ...section }]);
  }, []);

  const updateRulebookSection = useCallback((id, patch) => {
    setRulebookSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const deleteRulebookSection = useCallback((id) => {
    setRulebookSections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const value = {
    teams: teamsWithPoints,
    yuvaks: yuvaksWithTeam,
    activities,
    categoryPoints: CATEGORY_POINTS,
    reportStats,
    rulebookPoints,
    rulebookSections,
    updateYuvakPoints,
    addYuvak,
    deleteYuvak,
    addTeam,
    updateTeam,
    deleteTeam,
    addActivity,
    deleteActivity,
    addRulebookPoint,
    updateRulebookPoint,
    deleteRulebookPoint,
    addRulebookSection,
    updateRulebookSection,
    deleteRulebookSection,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
