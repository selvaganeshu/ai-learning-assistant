import Document from "../models/Document.js";

export const getDashboardData = async(req,res)=>{
    try{
        const userId = req.user._id;

        const documentCount = await Document.countDocuments({userId});

        const flashCardCount = 0;
        const quizCount = 0;

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