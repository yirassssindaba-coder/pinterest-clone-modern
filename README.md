<div align="center">

<!-- Animated Wave Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&height=210&color=0:16a34a,100:22c55e&text=Pinterest%20Clone&fontSize=56&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=TypeScript%20•%20Express%20•%20Drizzle%20+%20Postgres%20•%20Modern%20UI&descAlignY=58" />

<!-- Typing SVG -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=3000&pause=700&color=16A34A&center=true&vCenter=true&width=780&lines=TypeScript • Express • Drizzle + Postgres • Modern UI;Fast setup • Clean API • PowerShell-friendly;FreeCodeCamp-ready (modern README)" />

<!-- Badges -->
![node](https://img.shields.io/badge/node-%3E%3D18-16a34a?logo=node.js&logoColor=white) ![express](https://img.shields.io/badge/express-API-0ea5e9?logo=express&logoColor=white) ![fcc](https://img.shields.io/badge/freeCodeCamp-ready-0f172a?logo=freecodecamp&logoColor=white) ![windows](https://img.shields.io/badge/windows-powershell-2563eb?logo=windows&logoColor=white)
</div>

---

## Overview

**📌 Pinterest Clone: modern TypeScript + Express + Postgres (Drizzle) 🐘. Auth sessions, boards API, responsive UI ⚡.**

---

## Features

- TypeScript server with Express (ESM) + API routing
- PostgreSQL via Drizzle ORM (schema in `shared/schema.ts`)
- Session-based auth (connect-pg-simple)
- Static SPA UI in `/public` with API prefix `/api/*`
- PowerShell-friendly setup and scripts

---

## Tech Stack

- TypeScript
- Node.js
- Express
- PostgreSQL
- Drizzle ORM
- tsx

---

## API Routes

- `GET / (SPA)`
- `GET /api/* (REST endpoints)`
- `GET /api/login | /api/logout | /api/auth/user`

---

## Quick Start

### Windows PowerShell

```powershell
cd "pinterest-clone-modern"
Copy-Item .env.example .env
notepad .env  # set DATABASE_URL + SESSION_SECRET
npm install

# Push DB schema (one-time / when schema changes)
npm run db:push

# Run dev server
npm run dev
```

---

## Environment Variables

Create `.env` from `.env.example` (or `sample.env`) and edit values:

```env
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/pinterest_clone
SESSION_SECRET=change-me
PORT=5000
HOST=0.0.0.0
```

---

## Scripts

- `npm run dev` — Watch server with tsx
- `npm run dev:win` — Watch server (PowerShell explicit)
- `npm run start` — Run server (non-watch)
- `npm run build` — TypeScript build
- `npm run db:push` — Push Drizzle schema to Postgres

---

## Troubleshooting

- `DATABASE_URL must be set` → ensure `.env` exists and has DATABASE_URL (server & drizzle config load dotenv).
- If `drizzle-kit` not found, run `npm install` first, or use `npx drizzle-kit push`.
- `password authentication failed` → wrong Postgres password in DATABASE_URL.

---

## Project Structure

```text
pinterest-clone-modern/
  server/
  shared/
  public/
  drizzle.config.ts
  package.json
```

---

## License

MIT
