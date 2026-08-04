// Thin data-access layer. Every screen reads through these functions instead
// of importing dummyData directly, so swapping in a real API later means
// editing only this file.

import { TEAMS, YUVAKS, ACTIVITIES, CATEGORY_POINTS } from "../data/dummyData";

let _teams = TEAMS;
let _yuvaks = YUVAKS;
let _activities = ACTIVITIES;

export function getRawTeams() {
  return _teams;
}

export function getRawYuvaks() {
  return _yuvaks;
}

export function getActivities() {
  return _activities;
}

export function getCategoryPoints() {
  return CATEGORY_POINTS;
}

// Team totals are NEVER stored — always derived from member points.
export function getTeamsWithPoints() {
  return _teams.map((team) => {
    const members = _yuvaks.filter((y) => y.teamId === team.id);
    const totalPoints = members.reduce((sum, y) => sum + y.points, 0);
    return {
      ...team,
      members: members.length,
      totalPoints,
    };
  }).sort((a, b) => b.totalPoints - a.totalPoints)
    .map((t, i) => ({ ...t, rank: i + 1 }));
}

export function getYuvaksWithTeam() {
  const teamMap = new Map(_teams.map((t) => [t.id, t]));
  return _yuvaks
    .map((y) => ({ ...y, team: teamMap.get(y.teamId) }))
    .sort((a, b) => b.points - a.points)
    .map((y, i) => ({ ...y, rank: i + 1 }));
}

export function getReportStats() {
  const teams = getTeamsWithPoints();
  const yuvaks = getYuvaksWithTeam();
  const totalPoints = yuvaks.reduce((sum, y) => sum + y.points, 0);
  const highestTeam = teams[0];
  const highestScorer = yuvaks[0];
  return {
    totalTeams: teams.length,
    totalYuvaks: yuvaks.length,
    totalPoints,
    averagePoints: Math.round(totalPoints / yuvaks.length),
    highestTeam,
    highestScorer,
    teams,
  };
}

// --- Mutations (local state only, mirrors future PATCH/POST calls) ---

export function updateYuvakPoints(yuvakId, newPoints) {
  _yuvaks = _yuvaks.map((y) => (y.id === yuvakId ? { ...y, points: newPoints } : y));
  return _yuvaks;
}

export function addYuvak(yuvak) {
  _yuvaks = [..._yuvaks, { id: `yuvak-${Date.now()}`, ...yuvak }];
  return _yuvaks;
}

export function deleteYuvak(yuvakId) {
  _yuvaks = _yuvaks.filter((y) => y.id !== yuvakId);
  return _yuvaks;
}

export function addTeam(team) {
  _teams = [..._teams, { id: `team-${Date.now()}`, ...team }];
  return _teams;
}

export function updateTeam(teamId, patch) {
  _teams = _teams.map((t) => (t.id === teamId ? { ...t, ...patch } : t));
  return _teams;
}

export function deleteTeam(teamId) {
  _teams = _teams.filter((t) => t.id !== teamId);
  return _teams;
}

export function addActivity(activity) {
  _activities = [..._activities, { id: `activity-${Date.now()}`, ...activity }];
  return _activities;
}

export function deleteActivity(activityId) {
  _activities = _activities.filter((a) => a.id !== activityId);
  return _activities;
}
