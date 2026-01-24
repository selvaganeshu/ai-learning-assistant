import QuizAttempt from '../models/QuizAttempt.js';
import Document from "../models/Document.js";

export const getUserActivity = async (req, res) => {
    try{
        const userId = req.user._id;

        const quizAttempts = await QuizAttempt.find({userId})
        .sort({createdAt : -1})
        .limit(3)
        .select("score totalQuestions createdAt");

        const documents = await Document.find({userId})
        .sort({createdAt : -1})
        .limit(3)
        .select("title createdAt");

        const activity = [
            ...documents.map((d)=>(
                {
                    type : 'document',
                    text : `uploaded document ${d.title}`,
                    createdAt : d.createdAt
                }
            )),
            ...quizAttempts.map((q)=>({
                type : 'quiz',
                text : `Scored ${q.score} out of ${q.totalQuestions} in quiz ${q.title}`,
                createdAt : q.createdAt
            }))
        ].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));


        res.status(200).json({
            success : true,
            data : activity.slice(0,5)
        })

    } catch (error) {
        console.error('Error fetching user activity:', error);
        res.status(500).json({
            success : false,
             message: 'Internal server error' 
            });
    }
}