import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  getScholarships,
  addScholarship,
  applyForScholarship,
} from "../controllers/scholarshipController.js";

const router = express.Router();

// ✅ Route to Create a Scholarship (Admins Only)
router.post("/", protect, authorizeRoles("admin"), addScholarship);

// ✅ Route to Get All Scholarships (Open to All Users)
router.get("/", getScholarships);

// ✅ Route to Apply for a Scholarship (Students Only)
router.post("/apply/:scholarshipId", protect, authorizeRoles("student"), applyForScholarship);

export default router;
