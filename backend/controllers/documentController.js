import Document from "../models/Document.js";
import Flashcard from "../models/Flashcard.js";
import extractTextFromPDF from "../utils/pdfExtractor.js";
import fs from "fs";
import path from "path";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Please upload a document",
      });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: "Please provide a title for the document",
      });
    }

    const document = await Document.create({
      title,
      filePath: req.file.path,
      fileName: req.file.filename,
      fileSize: req.file.size,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const documents = await Document.find({ userId }).lean();
    const documentIds = documents.map((doc) => doc._id);

    const flashcardCounts = await Flashcard.aggregate([
      {
        $match: {
          userId: req.user._id,
          documentId: { $in: documentIds },
        },
      },
      {
        $group: {
          _id: "$documentId",
          count: { $sum: 1 },
        },
      },
    ]);

    const flashcardCountMaps = {};
    flashcardCounts.forEach((item) => {
      flashcardCountMaps[item._id.toString()] = item.count;
    });

    const result = documents.map((doc) => ({
      ...doc,
      flashcardCount: flashcardCountMaps[doc._id.toString()] || 0,
      quizCount: 0,
    }));
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(`error : ${error}`);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    //ownership check
    if (document.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this document",
      });
    }

    const filePath = path.resolve(document.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await document.deleteOne();

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error(`error : ${error}`);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    if (document.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to download this document",
      });
    }

    const filePath = path.resolve(document.filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: "File not found on server",
      });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename =${document.fileName}`
    );
    res.setHeader("Content-type", "application/pdf");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error(`error : ${error}`);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const extractDocumentText = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    if (document.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: "Authorization failed",
      });
    }

    const text = await extractTextFromPDF(document.filePath);

    res.status(200).json({
      success: true,
      data: {
        text,
      },
    });
  } catch (error) {
    console.error(`error : ${error}`);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
