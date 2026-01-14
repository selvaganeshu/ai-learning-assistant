import { generateQuizzesFromFlashcards } from "../utils/quizGenerator.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";

export const generateQuiz = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({
      userId: req.user._id,
      documentId: req.params.documentId,
    });
    if (flashcards.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No Flashcards length is Zero",
      });
    }
    await Quiz.deleteMany({
      userId: req.user._id,
      documentId: req.params.id,
    });

    const quizData = await generateQuizzesFromFlashcards(flashcards);

    const quizzes = await Quiz.create({
      userId: req.user._id,
      documentId: req.params.documentId,
      questions: quizData, 
    });

    res.status(201).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    console.error(`error : ${error.message}`);
    res.status(500).json({
      success: false,
      error: "Failed to generate quiz",
    });
  }
};


export const getQuizByDocument = async(req,res)=>{
  try{
    const quiz = await Quiz.findOne({
      userId : req.user._id,
      documentId : req.params.documentId
    });
    if(!quiz){
      return res.status(200).json({
        success : true,
        data : null
      })
    }
    res.status(200).json({
      success : true,
      data : quiz
    })
  }catch(error){
    console.error(`error : ${error.message}`);
    res.status(500).json({
      success : false,
      error : "Failed to fetch quiz"
    })
  }
}
