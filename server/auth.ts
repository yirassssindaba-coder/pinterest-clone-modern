import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool, db } from "./db.js";
import { users, type User } from "../shared/schema.js";
import { eq } from "drizzle-orm";
import * as client from "openid-client";

const PgSession = connectPgSimple(session);

declare global {
  namespace Express {
    interface User {
      claims: {
        sub: string;
        email?: string;
        first_name?: string;
        last_name?: string;
        profile_image_url?: string;
      };
    }
  }
}

declare module "express-session" {
  interface SessionData {
    user?: Express.User;
    code_verifier?: string;
    state?: string;
  }
}

let oidcConfig: client.Configuration | null = null;

async function getOidcConfig(): Promise<client.Configuration> {
  if (!oidcConfig) {
    const clientId = process.env.REPLIT_DEPLOYMENT
      ? process.env.REPL_ID!
      : "development";
    
    oidcConfig = await client.discovery(
      new URL("https://replit.com"),
      clientId
    );
  }
  return oidcConfig;
}

export function setupAuth(app: Express) {
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "sessions",
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "pinterest-clone-secret-key-dev",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    })
  );
}

async function upsertUser(claims: Express.User["claims"]): Promise<User> {
  const existingUser = await db.select().from(users).where(eq(users.id, claims.sub)).limit(1);
  
  if (existingUser.length > 0) {
    const [updated] = await db
      .update(users)
      .set({
        email: claims.email,
        firstName: claims.first_name,
        lastName: claims.last_name,
        profileImageUrl: claims.profile_image_url,
      })
      .where(eq(users.id, claims.sub))
      .returning();
    return updated;
  }

  const [newUser] = await db
    .insert(users)
    .values({
      id: claims.sub,
      email: claims.email,
      firstName: claims.first_name,
      lastName: claims.last_name,
      profileImageUrl: claims.profile_image_url,
    })
    .returning();
  return newUser;
}

export function registerAuthRoutes(app: Express) {
  app.get("/api/login", async (req, res) => {
    try {
      const config = await getOidcConfig();
      const host = req.get("host") || "";
      const protocol = host.includes("localhost") ? "http" : "https";
      const callbackUrl = `${protocol}://${host}/api/callback`;
      
      const code_verifier = client.randomPKCECodeVerifier();
      const code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
      const state = client.randomState();
      
      req.session.code_verifier = code_verifier;
      req.session.state = state;
      
      const authUrl = client.buildAuthorizationUrl(config, {
        redirect_uri: callbackUrl,
        scope: "openid email profile",
        code_challenge,
        code_challenge_method: "S256",
        state,
      });
      
      res.redirect(authUrl.href);
    } catch (error) {
      console.error("Login error:", error);
      res.redirect("/?error=login_failed");
    }
  });

  app.get("/api/callback", async (req, res) => {
    try {
      const config = await getOidcConfig();
      const host = req.get("host") || "";
      const protocol = host.includes("localhost") ? "http" : "https";
      const callbackUrl = `${protocol}://${host}/api/callback`;
      const currentUrl = new URL(req.url, `${protocol}://${host}`);
      
      const tokens = await client.authorizationCodeGrant(
        config,
        currentUrl,
        {
          pkceCodeVerifier: req.session.code_verifier,
          expectedState: req.session.state,
        }
      );
      
      const claims = tokens.claims();
      
      if (claims && claims.sub) {
        const user = {
          claims: {
            sub: claims.sub as string,
            email: claims.email as string | undefined,
            first_name: (claims as any).first_name as string | undefined,
            last_name: (claims as any).last_name as string | undefined,
            profile_image_url: claims.picture as string | undefined,
          },
        };
        
        await upsertUser(user.claims);
        req.session.user = user;
        
        delete req.session.code_verifier;
        delete req.session.state;
      }
      
      res.redirect("/");
    } catch (error) {
      console.error("Callback error:", error);
      res.redirect("/?error=auth_failed");
    }
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
      }
      res.redirect("/");
    });
  });

  app.get("/api/auth/user", (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
}
