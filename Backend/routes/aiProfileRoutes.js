import express from "express";
import { getProfileMatches } from "../controllers/aiProfileController.js";

const router = express.Router();
router.post("/", getProfileMatches);

export default router;
