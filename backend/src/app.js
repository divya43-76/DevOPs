import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "PathFinder API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

