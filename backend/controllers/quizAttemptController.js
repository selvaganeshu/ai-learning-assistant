import QuizAttempt from "../models/QuizAttempt.js";
import Quiz from "../models/Quiz.js";
export const saveQuizAttempt = async (req,res)=>{
    try{
        const documentId = req.params.documentId;
        const {score} =req.body; 
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
        res.status(200).json({
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

export const getQuizAttempt = async(req,res)=>{
    try{
        const {documentId} = req.params;

        const attempts = await QuizAttempt.find({
            userId : req.user._id,
            documentId,
        }).sort({createdAt : -1})

        res.status(200).json({
            success : true,
            data : attempts
        })
    }catch(error){
        console.error(`error : ${error.message}`);
        res.status(500).json({
            success : false,
            error : "Failed to save quiz score"
        })
    }
}