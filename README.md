# NIMIT BHULKU - Leaderboard

A premium, fully responsive leaderboard web app built with React, Vite, Tailwind CSS v4, React Router, Framer Motion, React Icons, and Recharts.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── assets/
├── components/      # Navbar, Sidebar, Podium, Cards, Table, Modal, Toasts, etc.
├── layouts/         # MainLayout (public site), AdminLayout (sidebar)
├── pages/
│   ├── Teams/
│   ├── Yuvaks/
│   ├── Report/
│   ├── Rulebook/
│   └── Admin/       # Dashboard, Teams, Yuvaks, Activities, Leaderboard, Reports, Settings
├── hooks/           # useAppData (global state), useToast
├── utils/           # api.js — data-access layer, swap-ready for a real backend
├── data/            # dummyData.js — 6 teams, 160 Yuvaks, activities
├── styles/
├── App.jsx
└── main.jsx
```

## Key behavior

- **Team points are never stored.** Every team's total is calculated live by summing the points of its Yuvaks (`src/hooks/useAppData.jsx`). Editing a Yuvak's points anywhere in the Admin Dashboard instantly updates every leaderboard, podium, and chart in the app.
- **Settings → Admin.** Click "Settings" in the navbar and enter the password `saral0369` to unlock `/admin`. This is a frontend-only check — there is no real authentication or backend.
- **Frontend only.** All data lives in React state, seeded from `src/data/dummyData.js`. The `src/utils/api.js` layer is structured so a future backend can be wired in by editing that one file, without touching any components.

## Admin password

```
saral0369
```
