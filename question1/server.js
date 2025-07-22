// {
// 	"email": "pratibhasinghh13@gmail.com",
// 	"name": "pratibha singh",
// 	"rollNo": "22bk1a6696",
// 	"accessCode": "vpJgsZ",
// 	"clientID": "bdc0b3d0-be38-43e2-b682-477b4a5f8bf0",
// 	"clientSecret": "FHkHJMxbfTTXhryz"
// }
// =========================
// question1/server.js
// =========================

import express from "express";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import { logger } from "./middleware/logger.js";
import { authorize } from "./middleware/auth.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(logger); // Custom logging
app.use(authorize); // Pre-authorization middleware

app.use("/api", urlRoutes); // All routes under /api

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
