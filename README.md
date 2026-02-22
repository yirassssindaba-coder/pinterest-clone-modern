<div align="center">

<!-- Animated Wave Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&height=210&color=0:16a34a,100:22c55e&text=Pinterest%20Clone%20Modern&fontSize=56&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=TypeScript%20•%20Express%20•%20Drizzle%20+%20Postgres%20•%20Modern%20UI&descAlignY=58" />

<!-- Typing SVG -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=3000&pause=700&color=16A34A&center=true&vCenter=true&width=780&lines=Fullstack+TypeScript+%E2%80%A2+Express+API+%E2%80%A2+Drizzle+%2B+Postgres;Session-based+auth+%E2%80%A2+Clean+structure+%E2%80%A2+PowerShell-friendly;Ready+to+extend+into+boards%2C+pins%2C+and+profiles" />

<!-- Badges -->
![typescript](https://img.shields.io/badge/typescript-5.x-2563eb?logo=typescript&logoColor=white)
![express](https://img.shields.io/badge/express-API-0ea5e9?logo=express&logoColor=white)
![postgres](https://img.shields.io/badge/postgresql-db-2563eb?logo=postgresql&logoColor=white)
![drizzle](https://img.shields.io/badge/drizzle-orm-0f172a)
![windows](https://img.shields.io/badge/windows-powershell-2563eb?logo=windows&logoColor=white)
</div>

---

## Overview

📌 **Pinterest Clone Modern** is a fullstack TypeScript starter: Express server + Drizzle ORM on Postgres, session auth, and a static SPA UI in `/public`.

---

## Features

- TypeScript server with Express (ESM)
- PostgreSQL via Drizzle ORM (`shared/schema.ts`)
- Session-based auth (`connect-pg-simple`)
- SPA UI served from `/public` with API under `/api/*`
- Friendly scripts for Windows PowerShell

---

## Quick Start

### 1) Configure `.env`

```powershell
cd "pinterest-clone-modern"
Copy-Item .env.example .env
notepad .env
```

### 2) Install & migrate

```powershell
npm install
npm run db:push
```

### 3) Run (dev)

```powershell
npm run dev:win
```

Open:
- `http://127.0.0.1:5000`

---

## Environment Variables

```env
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/pinterest_clone
SESSION_SECRET=change-me
PORT=5000
# Fix for Windows if you ever see listen ENOTSUP
HOST=127.0.0.1
```

---

## Scripts

- `npm run dev` — watch mode (tsx)
- `npm run dev:win` — watch mode (PowerShell)
- `npm run start` — run server (no watch)
- `npm run db:push` — push Drizzle schema
- `npm run build` — TypeScript build

---

## Troubleshooting

- **`drizzle-kit` not found** → run `npm install` first, or use `npx drizzle-kit push`.
- **`password authentication failed`** → update `DATABASE_URL` password.
- **`database does not exist`** → create the DB first (Postgres).
- **`listen ENOTSUP` on Windows** → set `HOST=127.0.0.1` in `.env`.

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
