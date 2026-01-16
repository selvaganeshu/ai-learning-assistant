import { saveQuizAttemp } from "../controllers/quizAttempController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect,saveQuizAttemp);

export default router;