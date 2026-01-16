import quizAttempt from "../models/QuizAttempt.js";

export const saveQuizAttemp = async (req,res)=>{
    try{
        const {documentId,score,totalQuestions} = req.body;

        const attempt = await quizAttempt.create({
            userId : req.user._id,
            documentId,
            score,
            totalQuestions
        })

        res.status(201).json({
            success : true,
            data : attempt
        })
    }catch(error){
        console.error(`error : ${error.message}`);
        res.status(500).json({
            success : false,
            error : "Failed to save quiz score"
        })
    }
}