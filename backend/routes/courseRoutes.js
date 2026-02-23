import express from "express";
import {
  getCourses,
  getRecommendedCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleBookmarkCourse,
} from "../controllers/courseController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/recommend", protect, getRecommendedCourses);

router.post("/", protect, authorizeRoles("admin"), createCourse);
router.put("/:id", protect, authorizeRoles("admin"), updateCourse);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCourse);

router.post("/:id/bookmark", protect, toggleBookmarkCourse);

export default router;

