// Dummy data layer. Structured so it can be swapped for a real API later
// without changing anything in components (see utils/api.js).

const MENTORS = [
  "Krupa Shah", "Devansh Patel", "Rutvik Mehta", "Sanya Joshi",
  "Ishaan Trivedi", "Aarohi Desai",
];

const TEAM_NAMES = [
  "Team Radiance",
  "Team Momentum",
  "Team Zenith",
  "Team Vanguard",
  "Team Ember",
  "Team Horizon",
];

const FIRST_NAMES = [
  "Rahul", "Jay", "Amit", "Kunal", "Dev", "Aryan", "Vivaan", "Reyansh",
  "Krishna", "Ishaan", "Aditya", "Rohan", "Yash", "Parth", "Nirav",
  "Harsh", "Meet", "Vansh", "Dhruv", "Om", "Kabir", "Shaurya", "Arnav",
  "Vihaan", "Ansh", "Raj", "Manan", "Neel", "Karan", "Ronit", "Samar",
  "Tanish", "Pratik", "Yug", "Aaryan", "Bhavya", "Chirag", "Deep",
  "Eshan", "Falgun", "Gaurav", "Hardik", "Ishan", "Jash", "Kush",
  "Lakshya", "Mihir", "Naman", "Omkar", "Pranav", "Qasim", "Rudra",
  "Sahil", "Tarun", "Umang", "Varun", "Wiren", "Yashvi", "Zubin",
];

const LAST_NAMES = [
  "Shah", "Patel", "Mehta", "Trivedi", "Desai", "Joshi", "Gandhi",
  "Parekh", "Thakkar", "Vyas", "Modi", "Chauhan", "Sheth", "Bhatt",
  "Kapadia", "Dave", "Rana", "Solanki", "Pandya", "Raval",
];

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(19830369);

function pick(arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function buildTeams() {
  return TEAM_NAMES.map((teamName, i) => ({
    id: `team-${i + 1}`,
    teamName,
    mentor: MENTORS[i % MENTORS.length],
    color: ["#F97316", "#E8B94D", "#4ade80", "#f87171", "#38bdf8", "#f472b6"][i],
  }));
}

function buildYuvaks(teams, count = 160) {
  const yuvaks = [];
  const usedNames = new Set();
  for (let i = 0; i < count; i++) {
    let name;
    do {
      name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
    } while (usedNames.has(name) && usedNames.size < FIRST_NAMES.length * LAST_NAMES.length);
    usedNames.add(name + i);
    const team = teams[i % teams.length];
    const base = 2000 + Math.floor(rand() * 28000);
    yuvaks.push({
      id: `yuvak-${i + 1}`,
      name,
      teamId: team.id,
      points: base,
    });
  }
  return yuvaks;
}

export const TEAMS = buildTeams();
export const YUVAKS = buildYuvaks(TEAMS, 160);

export const ACTIVITY_TITLES = [
  "Morning Assembly Participation",
  "Scripture Recitation Contest",
  "Community Seva Drive",
  "Sports Meet Relay",
  "Quiz Competition",
  "Cultural Performance",
  "Elocution Contest",
  "Cleanliness Drive",
  "Group Discussion Round",
  "Talent Showcase",
];

export const ACTIVITIES = ACTIVITY_TITLES.map((title, i) => ({
  id: `activity-${i + 1}`,
  title,
  points: 500 + i * 250,
  date: new Date(2026, 0, 5 + i * 4).toISOString().slice(0, 10),
}));

export const CATEGORY_POINTS = [
  { category: "Sports", points: 184000 },
  { category: "Cultural", points: 156500 },
  { category: "Academics", points: 132000 },
  { category: "Seva", points: 121500 },
  { category: "Discipline", points: 98000 },
];

export const RULEBOOK_POINTS = [
  { id: "rp-1", activity: "1st Place - Sports", points: "1000 pts" },
  { id: "rp-2", activity: "2nd Place - Sports", points: "700 pts" },
  { id: "rp-3", activity: "3rd Place - Sports", points: "500 pts" },
  { id: "rp-4", activity: "1st Place - Cultural", points: "900 pts" },
  { id: "rp-5", activity: "2nd Place - Cultural", points: "600 pts" },
  { id: "rp-6", activity: "Quiz Winner", points: "800 pts" },
  { id: "rp-7", activity: "Elocution - Top 3", points: "400–700 pts" },
  { id: "rp-8", activity: "Attendance (per day)", points: "50 pts" },
];

export const RULEBOOK_SECTIONS = [
  {
    id: "rs-1",
    title: "General Rules",
    icon: "book",
    bullets: [
      "Every Yuvak must be registered under exactly one team before the event begins.",
      "Points are awarded only by authorized mentors or event coordinators.",
      "Team totals are calculated automatically as the sum of every member's points — no manual overrides.",
      "Disputes on scoring must be raised within 24 hours of the activity.",
      "Unsportsmanlike conduct may result in a point deduction at the organizers' discretion.",
    ],
  },
  {
    id: "rs-2",
    title: "Bonus Rules",
    icon: "gift",
    bullets: [
      "Perfect attendance across the full event grants a one-time 200 point bonus.",
      "Teams that participate in every category earn a 5% bonus on their final total.",
      "Early registration bonus: 100 points per Yuvak, applied automatically.",
    ],
  },
  {
    id: "rs-3",
    title: "Important Notes",
    icon: "alert",
    bullets: [
      "This leaderboard reflects live data and may update at any time during the event.",
      "Contact your team mentor for any correction requests before the results are finalized.",
      "Final standings are locked once the closing ceremony begins.",
    ],
  },
];

