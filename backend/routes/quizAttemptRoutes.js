import { saveQuizAttempt,getQuizAttempt,getBestQuizScore } from "../controllers/quizAttemptController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/best",protect,getBestQuizScore);

router.post("/:documentId",protect,saveQuizAttempt);
router.get("/:documentId",protect,getQuizAttempt);


export default router;