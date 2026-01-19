import { saveQuizAttempt,getQuizAttempt,getBestQuizScore,getQuizProgress} from "../controllers/quizAttemptController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/best",protect,getBestQuizScore);
router.get("/progress",protect,getQuizProgress);
router.post("/:documentId",protect,saveQuizAttempt);
router.get("/:documentId",protect,getQuizAttempt);


export default router;