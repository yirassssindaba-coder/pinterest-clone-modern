<div align="center">

<!-- Animated Wave Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&height=210&color=0:16a34a,100:22c55e&text=Secure%20Multiplayer%20Game&fontSize=56&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Real-time%20Socket.IO%20Game%20•%20Security%20Headers%20•%20FCC%20InfoSec&descAlignY=58" />

<!-- Typing SVG -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=3000&pause=700&color=16A34A&center=true&vCenter=true&width=780&lines=Real-time+Socket.IO+game+%E2%80%A2+secure+headers+%E2%80%A2+tests+%E2%9C%85;Fast+setup+%E2%80%A2+Clean+server+%E2%80%A2+PowerShell-friendly;FreeCodeCamp+InfoSec+project+ready" />

<!-- Badges -->
![node](https://img.shields.io/badge/node-%3E%3D18-16a34a?logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/express-API-0ea5e9?logo=express&logoColor=white)
![socketio](https://img.shields.io/badge/socket.io-realtime-0f172a?logo=socketdotio&logoColor=white)
![windows](https://img.shields.io/badge/windows-powershell-2563eb?logo=windows&logoColor=white)
</div>

---

## Overview

🎮 **Secure Multiplayer Game** is a real-time Socket.IO game server with security headers enabled (Helmet) and a Mocha test suite (FCC InfoSec project).

---

## Quick Start

### Windows PowerShell

```powershell
cd "secure-multiplayer-game-modern"

npm install
Copy-Item .env.example .env -ErrorAction SilentlyContinue

npm start
```

Open:
- `http://localhost:3000`

---

## Environment Variables

Optional `.env`:

```env
PORT=3000
```

---

## Testing

- Windows PowerShell:
```powershell
npm run test:win
```

---

## Scripts

- `npm start` — run server
- `npm run dev` — watch mode
- `npm test` — tests (POSIX env syntax)
- `npm run test:win` — tests on Windows

---

## Troubleshooting

- **Port busy** → change `PORT` in `.env`.
- If you see random console errors from Chrome extensions on `localhost`, try Incognito or disable extensions.

---

## Project Structure

```text
secure-multiplayer-game-modern/
  server.js
  routes/
  public/
  tests/
  views/
```

---

## License

MIT
