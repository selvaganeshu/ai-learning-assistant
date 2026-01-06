import { uploadDocument } from "../controllers/documentController.js";
import express from "express";
import upload from "../config/multer.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("document"),
  uploadDocument
);


export default router;