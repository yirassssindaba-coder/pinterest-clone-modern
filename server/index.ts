import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { setupAuth, registerAuthRoutes } from "./auth.js";
import { registerRoutes } from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupAuth(app);
registerAuthRoutes(app);
registerRoutes(app);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/{*splat}", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  }
});

app.listen(PORT, process.env.HOST || "0.0.0.0", () => {
  console.log(`Pinterest Clone running on http://${process.env.HOST || "0.0.0.0"}:${PORT}`);
});
