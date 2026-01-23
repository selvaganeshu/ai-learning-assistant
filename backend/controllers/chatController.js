import Chat from "../models/Chat.js";
import Document from "../models/Document.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apikey : process.env.GEMINI_API_KEY
})

export const chatWithDocument = async (req,res)=>{
    try{
        const {documentId} = req.params;
        const {message} = req.body;
        const userId = req.user._id;

        const document = await Document.findOne({
            _id : documentId,
            userId
        })

        if(!document || !document.pdfText){
            return res.status(404).json({
                success : false,
                error : "Document or extracted text not found"
            })
        }

        const context = document.pdfText.substring(0,15000);

        const prompt = `
        You are an AI tutor.

        Answer the user's question using ONLY the context below.
        

        CONTEXT:
        ${context}

        QUESTION:
        ${message}`;

        const reponse = await ai.models.generateContent({
            model : "gemini-2.5-flash-lite",
            contents : prompt
        })

        const answer = reponse.candidates[0].content.parts[0].text;

        await Chat.create([
            {
            userId,
            documentId,
            role : "user",
            message : answer
            },
            {
                userId,
                documentId,
                role : "assistant",
                message : answer
            }
        ])

        res.status(200).json({
            success : true,
            data : answer
        })
    }catch(error){
        console.error(`error : ${error}`);
        res.status(500).json({
            success : false,
            error : "Chat Failed"
        })
    }
}

export const getChatHistory = async(req,res)=>{
    try{
        const {documentId} = req.params;

        const userId = req.user._id;

        const chats = await Chat.find({
            userId,
            documentId
        }).sort({createdAt : 1});

        res.status(200).json({
            success : true,
            data : chats
        })
    }catch(error){
        console.error(`error : ${error}`);
        res.status(500).json({
            success : false,
            error : "Fetching Chat History Failed"
        })
    }
}