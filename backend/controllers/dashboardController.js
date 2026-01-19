import Document from "../models/Document.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";

export const getDashboardData = async(req,res)=>{
    try{
        const userId = req.user._id;

        const documentCount = await Document.countDocuments({userId});

        const flashCardCount = await Flashcard.countDocuments({userId});

        const quizCount = await Quiz.countDocuments({userId});

        res.status(200).json({
            success : true,
            data : {
                documentCount,
                flashCardCount,
                quizCount
            }
        })
    }
    catch(error){
        console.log(`error : ${error}`);
        res.status(500).json({
            success : false,
            error : "Server Error"
        })
    }
}