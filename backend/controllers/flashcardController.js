import Document from "../models/Document.js";
import Flashcard from "../models/Flashcard.js";
import extractTextFromPDF from "../utils/pdfExtractor.js";
import chunkText from "../utils/textChunker.js";
import { generateFlashcardsFromText } from "../utils/flashcardGenerator.js";


export const generateFlashcards = async (req,res)=>{
    try{
        const document = await Document.findById(req.params.id);
        if(!document){
            return res.status(404).json({
                success : false,
                error : "Document not found"
            })
        }
        if(document.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success : false,
                error : "Authorization failed"
            })
        }
        const text = await extractTextFromPDF(document.filePath);
        const chunks = chunkText(text);
        const flashcards = [];
        for(const chunk of chunks.slice(0,1)){
         const cards = await generateFlashcardsFromText(chunk);
         
         for(const card of cards){
            flashcards.push(
                await Flashcard.create(
                    {
                        userId : req.user._id,
                        documentId : document._id,
                        question : card.question,
                        answer : card.answer
                    }
                )
            )
         }

        }
        res.status(201).json({
            success : true,
            count : flashcards.length,
            data : flashcards
        })
    }catch(error){
        console.error(`error : ${error.message}`);
        res.status(500).json({
            error : "Flashcard generation failed"
        })
    }
}

export const getFlashcards = async(req,res)=>{
    try{
        const flashcards = await Flashcard.find({
            userId : req.user._id,
            documentId : req.params.documentId
        }).sort({createdAt : -1});

        if (flashcards.length === 0) {
            return res.status(200).json({
            success: true,
            message: "No flashcards available",
            data: [],
            });
        }
        res.status(200).json({
            success : true,
            count : flashcards.length,
            data : flashcards
        })
    }catch(error){
        console.error(`error : ${error.message}`);
        res.status(500).json({
            success : false,
            error : "get Flashcard Failed"
        })
    }
}