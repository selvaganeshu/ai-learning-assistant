import { getUserActivity } from "../controllers/activityController.js";
import protect from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get('/',protect,getUserActivity);

export default router;