import type { Express } from "express";
import { db } from "./db.js";
import { images, users } from "../shared/schema.js";
import { eq, desc } from "drizzle-orm";
import { isAuthenticated } from "./auth.js";

export function registerRoutes(app: Express) {
  app.get("/api/images", async (req, res) => {
    try {
      const allImages = await db
        .select({
          id: images.id,
          url: images.url,
          title: images.title,
          createdAt: images.createdAt,
          userId: images.userId,
          userFirstName: users.firstName,
          userLastName: users.lastName,
          userProfileImage: users.profileImageUrl,
        })
        .from(images)
        .leftJoin(users, eq(images.userId, users.id))
        .orderBy(desc(images.createdAt));
      
      res.json(allImages);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  });

  app.get("/api/images/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userImages = await db
        .select({
          id: images.id,
          url: images.url,
          title: images.title,
          createdAt: images.createdAt,
          userId: images.userId,
        })
        .from(images)
        .where(eq(images.userId, userId))
        .orderBy(desc(images.createdAt));
      
      res.json(userImages);
    } catch (error) {
      console.error("Error fetching user images:", error);
      res.status(500).json({ error: "Failed to fetch user images" });
    }
  });

  app.get("/api/users/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.get("/api/my-images", isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.user!.claims.sub;
      const userImages = await db
        .select()
        .from(images)
        .where(eq(images.userId, userId))
        .orderBy(desc(images.createdAt));
      
      res.json(userImages);
    } catch (error) {
      console.error("Error fetching my images:", error);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  });

  app.post("/api/images", isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.user!.claims.sub;
      const { url, title } = req.body;

      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const [newImage] = await db
        .insert(images)
        .values({
          userId,
          url,
          title: title || null,
        })
        .returning();

      res.status(201).json(newImage);
    } catch (error) {
      console.error("Error creating image:", error);
      res.status(500).json({ error: "Failed to create image" });
    }
  });

  app.delete("/api/images/:id", isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.user!.claims.sub;
      const imageId = parseInt(req.params.id as string);

      const [image] = await db.select().from(images).where(eq(images.id, imageId));
      
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      if (image.userId !== userId) {
        return res.status(403).json({ error: "Not authorized to delete this image" });
      }

      await db.delete(images).where(eq(images.id, imageId));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });
}
