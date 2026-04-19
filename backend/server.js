import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";

import cloudinaryConfig from "./configs/cloudinary.js";
import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import webhookRoutes from "./routes/webhook.js";
import fs from "fs";

const app = express();


if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// -------------------- MIDDLEWARE --------------------
app.use(cors());


// ⚠️ webhook BEFORE json
app.use("/api/webhook", webhookRoutes);

app.use(express.json());

// Clerk auth
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  })
);

// -------------------- CONFIGS --------------------
cloudinaryConfig();

// -------------------- ROUTES --------------------
app.get("/", (req, res) => {
  res.send("🚀 AI SaaS Backend Running...");
});

app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);

// -------------------- GLOBAL ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});