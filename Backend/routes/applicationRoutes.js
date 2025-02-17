import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { submitApplication, getApplications, updateApplicationStatus } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", protect, submitApplication);
router.get("/", protect, getApplications);
router.put("/:id", protect, authorizeRoles("agent", "admin"), updateApplicationStatus);

export default router;
