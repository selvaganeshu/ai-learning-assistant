import { uploadDocument,getDocuments,deleteDocument,downloadDocument,extractDocumentText} from "../controllers/documentController.js";
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
router.get("/", protect, getDocuments);
router.delete("/:id",protect,deleteDocument);
router.get("/:id/download",protect,downloadDocument);
router.get("/:id/extract",protect,extractDocumentText);

export default router;