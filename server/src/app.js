import express from "express";
import securityMiddleware from "./middlewares/security.middleware.js";
import GoogleMiddleware from "./middlewares/googleOauth.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import galleryRoutes from "./modules/gallery/gallery.routes.js";
export default function createApp() {
  const app = express();

  securityMiddleware(app);
  GoogleMiddleware();

  app.use("/api/user", authRoutes);
  app.use("/api/v1/gallery", galleryRoutes);


  app.use(errorHandler);
  return app;
}
