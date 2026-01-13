import { generateQuiz } from "../controllers/quizController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:documentId/generate",protect,generateQuiz);

export default router;