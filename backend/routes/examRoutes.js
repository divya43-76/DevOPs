import express from "express";
import {
  getExams,
  recommendExams,
  createExam,
  deleteExam,
} from "../controllers/examController.js";
import { protect, authorizeRoles, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getExams);
router.get("/recommend", authMiddleware, recommendExams);
router.post("/", protect, authorizeRoles("admin"), createExam);
router.delete("/:id", protect, authorizeRoles("admin"), deleteExam);

export default router;

