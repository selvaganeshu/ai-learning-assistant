import { chatWithDocument } from "../controllers/chatController.js";
import protect from "../middleware/authMiddleware.js"
import express from "express";

const router = express.Router();

router.post("/:documentId",protect,chatWithDocument);

export default router;