import QuizAttempt from "../models/QuizAttempt.js";
import Quiz from "../models/Quiz.js";
export const saveQuizAttemp = async (req,res)=>{
    try{
        const {documentId,score} = req.body;

        const quiz = await Quiz.findOne({
            userId : req.user._id,
            documentId
        })

        if(!quiz){
            return res.status(404).json({
                success : false,
                error : "Quiz not found"
            })
        }
        const attempt = await QuizAttempt.create({
            userId : req.user._id,
            documentId,
            score,
            totalQuestions : quiz.questions.length
        });
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