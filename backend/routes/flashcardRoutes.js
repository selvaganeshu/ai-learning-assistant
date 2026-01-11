import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generateFlashcards,getFlashcards } from "../controllers/flashcardController.js";
const router = express.Router();

router.post("/:id/generate", protect, generateFlashcards);
router.get("/:documentId",protect,getFlashcards);
export default router;
