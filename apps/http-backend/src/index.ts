import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

// Load .env from monorepo root (../../.env)
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import { JWT_SECRET, PORT } from "@repo/backend-common";
import jwt from "jsonwebtoken";
import cors from "cors";
// Add this to verify JWT_SECRET is loaded
console.log('JWT_SECRET loaded:', JWT_SECRET ? '✅ Present' : '❌ Missing');
console.log('PORT:', PORT);

import bcrypt from "bcrypt";
const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/authRoutes";
import chatRoutes  from "./routes/chatRoutes";
app.use("/api/v1", authRoutes);
app.use("/api/v1", chatRoutes);
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome to Backend API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
