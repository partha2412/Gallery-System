import express from "express";
import securityMiddleware from "./middlewares/security.middleware.js";
import GoogleMiddleware from "./middlewares/googleOauth.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import galleryRoutes from "./modules/gallery/gallery.routes.js";
import mongoose from "mongoose";
// import logger f0rom "./config/logger.js";
export default function createApp() {
  const app = express();

  securityMiddleware(app);
  GoogleMiddleware();

  app.get("/health", async (req, res) => {
    try {
      const dbState = mongoose.connection.readyState;

      if (dbState !== 1) {
        return res.status(503).json({
          status: "unhealthy",
          server: "ok",
          database: "down"
        });
      }

      res.status(200).json({
        status: "healthy",
        server: "ok",
        database: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      res.status(503).json({
        status: "unhealthy",
        error: error.message
      });
    }
  });

  app.use("/api/user", authRoutes);
  app.use("/api/v1/gallery", galleryRoutes);


  app.use(errorHandler);
  return app;
}
