import express from "express";
import {
  getExams,
  createExam,
  deleteExam,
} from "../controllers/examController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getExams);
router.post("/", protect, authorizeRoles("admin"), createExam);
router.delete("/:id", protect, authorizeRoles("admin"), deleteExam);

export default router;

